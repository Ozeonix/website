#!/usr/bin/env node
/**
 * GPU-friendly animation + a11y + reduced-motion + save-data regression check.
 *
 * Runs across multiple viewports (360, 390, 768, 1024) and asserts:
 *   1. Wave SVGs are decorative (aria-hidden, focusable=false, no role, no <title>/<desc>).
 *   2. Wave <g> groups animate transform only; <path> children have no animation.
 *   3. Hero .oz-hero__bg uses transform-only animation with will-change:transform.
 *   4. prefers-reduced-motion fully disables wave/hero animations (animation-name: none).
 *   5. Save-data / low deviceMemory / slow effectiveType adds `.oz-lite` and freezes animations.
 *   6. Captures hero + wave-section screenshots per viewport into reports/gpu/current/,
 *      and if reports/gpu/baseline/ exists, compares byte length + SHA to flag regressions.
 *
 * PREVIEW_URL env overrides http://localhost:8080
 */
import { chromium } from "playwright";
import { mkdirSync, existsSync, writeFileSync, readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const BASE = process.env.PREVIEW_URL || "http://localhost:8080";
const PAGES = ["/", "/services"];
const VIEWPORTS = [
  { name: "360", width: 360, height: 780, isMobile: true },
  { name: "390", width: 390, height: 844, isMobile: true },
  { name: "768", width: 768, height: 1024, isMobile: false },
  { name: "1024", width: 1024, height: 900, isMobile: false },
];

const OUT_DIR = "reports/gpu";
const CUR_DIR = join(OUT_DIR, "current");
const BASE_DIR = join(OUT_DIR, "baseline");
mkdirSync(CUR_DIR, { recursive: true });

const failures = [];
const record = (scope, msg) => failures.push(`[${scope}] ${msg}`);

const sha = (buf) => createHash("sha256").update(buf).digest("hex").slice(0, 16);

// ---------- Assertions ----------

async function assertDecorativeWaves(page, scope) {
  const svgs = await page.$$eval(".oz-wavelines", (els) =>
    els.map((el) => ({
      ariaHidden: el.getAttribute("aria-hidden"),
      role: el.getAttribute("role"),
      focusable: el.getAttribute("focusable"),
      hasTitle: !!el.querySelector("title"),
      hasDesc: !!el.querySelector("desc"),
      hasAriaLabel: el.hasAttribute("aria-label") || el.hasAttribute("aria-labelledby"),
    })),
  );
  for (const [i, s] of svgs.entries()) {
    if (s.ariaHidden !== "true") record(scope, `wave svg #${i} missing aria-hidden="true"`);
    if (s.focusable !== "false") record(scope, `wave svg #${i} missing focusable="false"`);
    if (s.role && s.role !== "presentation" && s.role !== "none")
      record(scope, `wave svg #${i} has non-decorative role=${s.role}`);
    if (s.hasTitle || s.hasDesc || s.hasAriaLabel)
      record(scope, `wave svg #${i} has SR-visible label/title/desc`);
  }
}

async function assertGpuAnimations(page, scope) {
  const groups = await page.$$eval(".oz-wavelines__g", (els) =>
    els.map((el) => {
      const cs = getComputedStyle(el);
      return { animationName: cs.animationName, willChange: cs.willChange };
    }),
  );
  for (const [i, g] of groups.entries()) {
    if (!/oz-wave-slide/.test(g.animationName))
      record(scope, `wave <g> #${i} anim=${g.animationName} (expected oz-wave-slide)`);
    if (!/transform/.test(g.willChange))
      record(scope, `wave <g> #${i} will-change=${g.willChange} (expected transform)`);
  }
  const pathAnims = await page.$$eval(".oz-wavelines path", (els) =>
    els.map((el) => getComputedStyle(el).animationName).filter((n) => n && n !== "none"),
  );
  if (pathAnims.length)
    record(scope, `wave <path> animations found (${pathAnims.join(",")}) — must live on <g>`);
}

async function assertHeroBg(page, scope) {
  const bg = await page
    .$eval(".oz-hero__bg", (el) => {
      const cs = getComputedStyle(el);
      return {
        animationName: cs.animationName,
        willChange: cs.willChange,
        transform: cs.transform,
      };
    })
    .catch(() => null);
  if (!bg) return record(scope, ".oz-hero__bg not found");
  if (!/oz-hero-drift/.test(bg.animationName)) record(scope, `hero bg anim=${bg.animationName}`);
  if (!/transform/.test(bg.willChange)) record(scope, `hero bg will-change=${bg.willChange}`);
}

async function assertAllAnimationsStopped(page, scope) {
  const running = await page.evaluate(() => {
    const nodes = document.querySelectorAll(".oz-wavelines__g, .oz-hero__bg");
    return Array.from(nodes)
      .map((el) => ({
        cls: el.getAttribute("class") || "",
        name: getComputedStyle(el).animationName,
        transform: getComputedStyle(el).transform,
      }))
      .filter((r) => r.name && r.name !== "none");
  });
  if (running.length) {
    record(
      scope,
      `${running.length} animation(s) still running: ${running.map((r) => `${r.cls}=${r.name}`).join("; ")}`,
    );
  }
  // Sanity: transforms should still resolve (static translate3d(0,0,0) or matrix).
  const transformsMissing = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".oz-wavelines__g, .oz-hero__bg"))
      .filter((el) => getComputedStyle(el).transform === "none")
      .map((el) => el.getAttribute("class")),
  );
  if (transformsMissing.length)
    record(scope, `elements with no transform baseline: ${transformsMissing.join(", ")}`);
}

// ---------- Runners ----------

async function runNormal(browser, path, vp) {
  const scope = `${path}@${vp.name}`;
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    deviceScaleFactor: vp.isMobile ? 2 : 1,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 20_000 });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});

  await assertDecorativeWaves(page, scope);
  await assertGpuAnimations(page, scope);
  if (path === "/") await assertHeroBg(page, scope);

  // Screenshot: hero on "/", first wave section on "/services"
  const target = path === "/" ? ".oz-hero" : ".oz-wavesection";
  const el = await page.$(target);
  if (el) {
    const buf = await el.screenshot({ animations: "disabled" });
    const file = join(CUR_DIR, `${path.replace(/\W+/g, "_") || "root"}_${vp.name}.png`);
    writeFileSync(file, buf);
  }
  await ctx.close();
}

async function runReducedMotion(browser, path, vp) {
  const scope = `${path}@${vp.name} [reduced-motion]`;
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    reducedMotion: "reduce",
    isMobile: vp.isMobile,
  });
  const page = await ctx.newPage();
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 20_000 });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  await assertAllAnimationsStopped(page, scope);
  await ctx.close();
}

async function runSaveData(browser, path, vp) {
  const scope = `${path}@${vp.name} [save-data]`;
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile,
    extraHTTPHeaders: { "Save-Data": "on" },
  });
  const page = await ctx.newPage();
  // Simulate low-end device: patch navigator.connection + deviceMemory before app scripts run.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "deviceMemory", { value: 1, configurable: true });
    Object.defineProperty(navigator, "connection", {
      value: {
        saveData: true,
        effectiveType: "2g",
        downlink: 0.3,
        rtt: 800,
        addEventListener() {},
        removeEventListener() {},
      },
      configurable: true,
    });
  });
  await page.goto(`${BASE}${path}`, { waitUntil: "load", timeout: 20_000 });
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
  // Give the useEffect a tick to add the class.
  await page
    .waitForFunction(() => document.documentElement.classList.contains("oz-lite"), {
      timeout: 3000,
    })
    .catch(() =>
      record(scope, "expected <html>.oz-lite class not applied under save-data/low-memory"),
    );
  await assertAllAnimationsStopped(page, scope);
  await ctx.close();
}

// ---------- Screenshot diff (byte + hash) ----------

function diffScreenshots() {
  if (!existsSync(BASE_DIR)) {
    console.log(
      `ℹ️  No baseline at ${BASE_DIR} — skipping visual diff. Copy reports/gpu/current to reports/gpu/baseline to set one.`,
    );
    return;
  }
  const baselineFiles = readdirSync(BASE_DIR).filter((f) => f.endsWith(".png"));
  for (const f of baselineFiles) {
    const cur = join(CUR_DIR, f);
    if (!existsSync(cur)) {
      record("visual", `missing current screenshot for baseline ${f}`);
      continue;
    }
    const b = readFileSync(join(BASE_DIR, f));
    const c = readFileSync(cur);
    if (sha(b) !== sha(c)) {
      const drift = Math.abs(b.length - c.length);
      const pct = (drift / b.length) * 100;
      // 5% byte drift tolerance for antialiasing noise across CI runs.
      if (pct > 5) record("visual", `${f} differs from baseline (${pct.toFixed(2)}% byte drift)`);
    }
  }
}

// ---------- Main ----------

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});
try {
  for (const path of PAGES) {
    for (const vp of VIEWPORTS) {
      await runNormal(browser, path, vp);
      await runReducedMotion(browser, path, vp);
      await runSaveData(browser, path, vp);
    }
  }
  diffScreenshots();
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(
    `❌ GPU animation check failed (${failures.length} issue${failures.length > 1 ? "s" : ""}):`,
  );
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(
  `✅ GPU animation check passed: ${PAGES.length} page(s) × ${VIEWPORTS.length} viewport(s) × 3 modes (normal, reduced-motion, save-data).`,
);
console.log(`   Screenshots: ${CUR_DIR}`);
