#!/usr/bin/env node
/**
 * Repeatable Lighthouse performance check.
 *
 * Usage:
 *   bun run perf                       # audits http://localhost:8080
 *   bun run perf https://yoursite.com  # audits any URL
 *
 * Output: reports/lighthouse-<slug>-<timestamp>.{html,json}
 * Fails (exit 1) if performance score < PERF_MIN (default 0.85) so this can
 * gate CI. Also prints Core Web Vitals + image byte savings so regressions in
 * lazy-loading, WebP/AVIF delivery, or srcset sizing are surfaced immediately.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:8080";
const PERF_MIN = Number(process.env.PERF_MIN ?? 0.85);

let chromePath = process.env.CHROME_PATH;
if (!chromePath) {
  try {
    chromePath = chromium.executablePath();
  } catch {
    // Fall back to chrome-launcher auto-detection
  }
}

const chrome = await launch({
  ...(chromePath ? { chromePath } : {}),
  chromeFlags: [
    "--headless=new",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--no-first-run",
    "--no-zygote",
  ],
});

let runnerResult;
try {
  runnerResult = await lighthouse(url, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: ["performance"],
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 1.75,
      disabled: false,
    },
    throttlingMethod: "simulate",
  });
} finally {
  await chrome.kill();
}

const lhr = runnerResult?.lhr;
if (!lhr) {
  console.error("\n❌ Lighthouse produced no results.");
  process.exit(1);
}

if (lhr.runtimeError) {
  console.error(
    `\n❌ Lighthouse runtime error [${lhr.runtimeError.code}]: ${lhr.runtimeError.message}`,
  );
}

const score = lhr.categories?.performance?.score ?? 0;
const audits = lhr.audits ?? {};

const slug = new URL(url).hostname.replace(/[^a-z0-9]/gi, "-") || "local";
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
await mkdir("reports", { recursive: true });
await writeFile(`reports/lighthouse-${slug}-${stamp}.html`, runnerResult.report[0]);
await writeFile(`reports/lighthouse-${slug}-${stamp}.json`, runnerResult.report[1]);

const lcpAudit = audits["largest-contentful-paint"];
const clsAudit = audits["cumulative-layout-shift"];
const tbtAudit = audits["total-blocking-time"];
const siAudit = audits["speed-index"];

const line = (label, v) => console.log(`  ${label.padEnd(28)} ${v}`);
console.log(`\nLighthouse — ${url}`);
line("Performance score", `${Math.round(score * 100)} / 100`);
line("LCP", lcpAudit?.displayValue ?? "—");
line("CLS", clsAudit?.displayValue ?? "—");
line("TBT", tbtAudit?.displayValue ?? "—");
line("Speed Index", siAudit?.displayValue ?? "—");

const imageAudits = [
  ["modern-image-formats", "Modern formats (WebP/AVIF)"],
  ["uses-responsive-images", "Responsive srcset sizing"],
  ["offscreen-images", "Offscreen lazy-loading"],
  ["efficient-animated-content", "Animated content"],
  ["uses-optimized-images", "Image compression"],
];
console.log("\nImage delivery:");
for (const [id, label] of imageAudits) {
  const a = audits[id];
  if (!a) continue;
  const kb = a.details?.overallSavingsBytes
    ? ` (save ${Math.round(a.details.overallSavingsBytes / 1024)} KB)`
    : "";
  line(label, `${a.score === 1 ? "pass" : "review"}${kb}`);
}

console.log(`\nReport saved to reports/lighthouse-${slug}-${stamp}.html`);

// -------- Per-audit thresholds --------
// Fail the build only when specific audits regress. Configure via env:
//   PERF_MIN            overall performance score floor (default 0.85)
//   CLS_MAX             max cumulative layout shift (default 0.1)
//   IMG_FORMATS_MIN     min score for modern-image-formats (default 0.9)
//   IMG_SIZING_MIN      min score for uses-responsive-images (default 0.9)
//   IMG_SAVINGS_MAX_KB  max potential savings per image audit in KB (default 50)
const CLS_MAX = Number(process.env.CLS_MAX ?? 0.1);
const IMG_FORMATS_MIN = Number(process.env.IMG_FORMATS_MIN ?? 0.9);
const IMG_SIZING_MIN = Number(process.env.IMG_SIZING_MIN ?? 0.9);
const IMG_SAVINGS_MAX_KB = Number(process.env.IMG_SAVINGS_MAX_KB ?? 50);

const failures = [];
const pct = (n) => Math.round(n * 100);

if (lhr.runtimeError) {
  failures.push(`Lighthouse runtime error [${lhr.runtimeError.code}]: ${lhr.runtimeError.message}`);
}

if (score < PERF_MIN) {
  failures.push(`Performance ${pct(score)} < min ${pct(PERF_MIN)}`);
}

const clsValue = Number(clsAudit?.numericValue ?? 0);
if (clsAudit && clsValue > CLS_MAX) {
  failures.push(`CLS ${clsValue.toFixed(3)} > max ${CLS_MAX}`);
}

const checkImageAudit = (id, label, minScore) => {
  const a = audits[id];
  if (!a) return;
  const auditScore = a.score ?? 0;
  const savingsKb = Math.round((a.details?.overallSavingsBytes ?? 0) / 1024);
  if (auditScore < minScore) {
    failures.push(`${label} score ${auditScore.toFixed(2)} < min ${minScore}`);
  }
  if (savingsKb > IMG_SAVINGS_MAX_KB) {
    failures.push(`${label} potential savings ${savingsKb} KB > max ${IMG_SAVINGS_MAX_KB} KB`);
  }
};

const formatsAudit = audits["modern-image-formats"];
const sizingAudit = audits["uses-responsive-images"];
checkImageAudit("modern-image-formats", "Modern image formats (AVIF/WebP)", IMG_FORMATS_MIN);
checkImageAudit("uses-responsive-images", "Responsive image sizing", IMG_SIZING_MIN);

// JSON summary consumed by the CI PR-comment step.
const summaryPayload = {
  url,
  passed: failures.length === 0,
  failures,
  thresholds: { PERF_MIN, CLS_MAX, IMG_FORMATS_MIN, IMG_SIZING_MIN, IMG_SAVINGS_MAX_KB },
  metrics: {
    performanceScore: score,
    lcp: lcpAudit?.displayValue ?? null,
    cls: clsValue,
    tbt: tbtAudit?.displayValue ?? null,
    speedIndex: siAudit?.displayValue ?? null,
  },
  imageAudits: {
    modernFormats: {
      score: formatsAudit?.score ?? null,
      savingsKb: Math.round((formatsAudit?.details?.overallSavingsBytes ?? 0) / 1024),
    },
    responsiveSizing: {
      score: sizingAudit?.score ?? null,
      savingsKb: Math.round((sizingAudit?.details?.overallSavingsBytes ?? 0) / 1024),
    },
  },
  reportPath: `reports/lighthouse-${slug}-${stamp}.html`,
};
await writeFile("reports/lighthouse-summary.json", JSON.stringify(summaryPayload, null, 2));

if (failures.length) {
  console.error("\n✗ Threshold regressions:");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `✓ Perf ${pct(score)} ≥ ${pct(PERF_MIN)} · CLS ${clsValue.toFixed(3)} ≤ ${CLS_MAX} · image format & sizing audits within thresholds.`,
);
