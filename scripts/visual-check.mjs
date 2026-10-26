#!/usr/bin/env node
/**
 * Visual regression check — screenshots key pages with Playwright and
 * compares them to committed baselines using pixelmatch. Complements the
 * numeric Lighthouse CLS audit by catching visible layout shifts (fonts
 * loading late, images resizing, containers reflowing) that don't always
 * move the CLS number above the threshold.
 *
 * Usage:
 *   bun run visual                 # compare against tests/visual/baseline/
 *   bun run visual -- --update     # (re)generate baselines
 *   BASE_URL=http://localhost:8080 VISUAL_MAX_DIFF_RATIO=0.005 bun run visual
 *
 * Env:
 *   BASE_URL                default http://localhost:8080
 *   VISUAL_MAX_DIFF_RATIO   max fraction of mismatched pixels (default 0.002)
 *   VISUAL_PIXEL_THRESHOLD  per-pixel color threshold 0..1 (default 0.1)
 *
 * Output: tests/visual/current/*.png and tests/visual/diff/*.png (copied to
 * reports/visual/ by CI for artifact upload).
 */
import { mkdir, readFile, writeFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const MAX_DIFF_RATIO = Number(process.env.VISUAL_MAX_DIFF_RATIO ?? 0.002);
const PIXEL_THRESHOLD = Number(process.env.VISUAL_PIXEL_THRESHOLD ?? 0.1);
const UPDATE = process.argv.includes("--update");

// Key pages to snapshot. Add here as the site grows.
const PAGES = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "portfolio", path: "/portfolio" },
  { name: "industries", path: "/industries" },
  { name: "contact", path: "/contact" },
];

const VIEWPORT = { width: 1280, height: 900 };
const BASELINE_DIR = "tests/visual/baseline";
const CURRENT_DIR = "tests/visual/current";
const DIFF_DIR = "tests/visual/diff";

await mkdir(BASELINE_DIR, { recursive: true });
await rm(CURRENT_DIR, { recursive: true, force: true });
await rm(DIFF_DIR, { recursive: true, force: true });
await mkdir(CURRENT_DIR, { recursive: true });
await mkdir(DIFF_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
const page = await context.newPage();

const failures = [];
const summary = [];
const pageResults = [];

for (const { name, path } of PAGES) {
  const url = `${BASE_URL}${path}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  // Wait for fonts and defer any lazy image work that would otherwise land
  // mid-screenshot and produce false-positive diffs.
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForTimeout(500);

  const currentPath = `${CURRENT_DIR}/${name}.png`;
  await page.screenshot({ path: currentPath, fullPage: true, animations: "disabled" });
  const baselinePath = `${BASELINE_DIR}/${name}.png`;

  if (UPDATE || !existsSync(baselinePath)) {
    await cp(currentPath, baselinePath);
    summary.push(`  ${name.padEnd(12)} baseline ${UPDATE ? "updated" : "created"}`);
    pageResults.push({ name, path, status: UPDATE ? "baseline-updated" : "baseline-created", diffRatio: 0, diffImage: null });
    continue;
  }

  const baseline = PNG.sync.read(await readFile(baselinePath));
  const current = PNG.sync.read(await readFile(currentPath));
  if (baseline.width !== current.width || baseline.height !== current.height) {
    failures.push(
      `${name}: size mismatch (baseline ${baseline.width}x${baseline.height}, current ${current.width}x${current.height})`
    );
    await cp(currentPath, `${DIFF_DIR}/${name}.png`);
    pageResults.push({ name, path, status: "size-mismatch", diffRatio: 1, diffImage: `${DIFF_DIR}/${name}.png`, currentImage: currentPath, baselineImage: baselinePath });
    continue;
  }

  const { width, height } = baseline;
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(baseline.data, current.data, diff.data, width, height, {
    threshold: PIXEL_THRESHOLD,
  });
  const ratio = mismatched / (width * height);
  const ratioStr = (ratio * 100).toFixed(3) + "%";
  summary.push(`  ${name.padEnd(12)} diff ${ratioStr} (max ${(MAX_DIFF_RATIO * 100).toFixed(3)}%)`);
  const failed = ratio > MAX_DIFF_RATIO;
  let diffPath = null;
  if (failed) {
    diffPath = `${DIFF_DIR}/${name}.png`;
    await writeFile(diffPath, PNG.sync.write(diff));
    failures.push(`${name}: ${ratioStr} pixels changed > max ${(MAX_DIFF_RATIO * 100).toFixed(3)}%`);
  }
  pageResults.push({
    name, path,
    status: failed ? "failed" : "passed",
    diffRatio: ratio,
    diffImage: diffPath,
    currentImage: currentPath,
    baselineImage: baselinePath,
  });
}

await mkdir("reports", { recursive: true });
await writeFile("reports/visual-summary.json", JSON.stringify({
  baseUrl: BASE_URL,
  mode: UPDATE ? "update" : "compare",
  maxDiffRatio: MAX_DIFF_RATIO,
  passed: failures.length === 0,
  failures,
  pages: pageResults,
}, null, 2));


await browser.close();

console.log(`\nVisual check — ${BASE_URL}`);
for (const s of summary) console.log(s);

if (failures.length) {
  console.error("\n✗ Visual regressions:");
  for (const f of failures) console.error(`  - ${f}`);
  console.error(`\nDiff images: ${DIFF_DIR}/  ·  current: ${CURRENT_DIR}/`);
  console.error("If the change is intentional, regenerate baselines with: bun run visual:update");
  process.exit(1);
}
console.log("\n✓ No visual regressions.");
