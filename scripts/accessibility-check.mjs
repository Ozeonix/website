#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const WIDTHS = [360, 390, 768, 1024];
const ROUTES = ["/", "/services", "/contact", "/pay", "/design-tokens"];
const failures = [];
const results = [];

await mkdir("reports", { recursive: true });
const browser = await chromium.launch(process.env.CI ? {} : { executablePath: "/bin/chromium" });

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();

  for (const path of ROUTES) {
    await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 30_000 });
    await page.evaluate(async () => { await document.fonts?.ready; });
    const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = axe.violations.filter((item) => ["critical", "serious"].includes(item.impact));
    const structural = await page.evaluate(() => {
      const visible = (element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.visibility !== "hidden" && style.display !== "none" && rect.width > 0 && rect.height > 0;
      };
      const missingImageReservation = [...document.images]
        .filter(visible)
        .filter((image) => !(image.width > 0 && image.height > 0) && !image.closest("[style*='aspect-ratio'], [class*='aspect-'], .oz-card__media, .oz-process-hero"))
        .map((image) => image.currentSrc || image.src);
      const undersized = [...document.querySelectorAll("button, summary, a.oz-btn, .oz-nav__toggle, .oz-whatsapp")]
        .filter(visible)
        .map((element) => ({ label: element.getAttribute("aria-label") || element.textContent?.trim().slice(0, 60), rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.width < 44 || rect.height < 44)
        .map(({ label, rect }) => `${label || "unnamed"} (${Math.round(rect.width)}x${Math.round(rect.height)})`);
      return {
        missingImageReservation,
        undersized,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });

    const routeFailures = [
      ...serious.map((item) => `${item.impact}: ${item.id} — ${item.help}`),
      ...structural.missingImageReservation.map((src) => `critical: image has no reserved size — ${src}`),
      ...structural.undersized.map((label) => `serious: undersized tap target — ${label}`),
      ...(structural.horizontalOverflow ? ["serious: document has horizontal overflow"] : []),
    ];
    if (routeFailures.length) failures.push(...routeFailures.map((message) => `${width}px ${path}: ${message}`));
    results.push({ width, path, violations: axe.violations, ...structural, passed: routeFailures.length === 0 });
  }
  await context.close();
}

// Explicit keyboard flows that static ARIA scans cannot validate.
const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
const page = await desktop.newPage();
await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
const company = page.getByRole("button", { name: "Company" });
await company.focus();
await page.keyboard.press("ArrowDown");
const firstCompanyItem = page.locator("#nav-menu-company [role='menuitem']").first();
await firstCompanyItem.waitFor({ state: "visible" });
await page.waitForFunction(() => document.activeElement?.matches("#nav-menu-company [role='menuitem']"));
if (!(await firstCompanyItem.evaluate((element) => element === document.activeElement))) failures.push("desktop header: ArrowDown did not focus the first menu item");
await page.keyboard.press("Escape");
if (!(await company.evaluate((element) => element === document.activeElement))) failures.push("desktop header: Escape did not restore trigger focus");

await page.setViewportSize({ width: 390, height: 900 });
const menuButton = page.getByRole("button", { name: "Toggle menu" });
await menuButton.click();
await page.getByRole("dialog").waitFor({ state: "visible" });
if (!(await page.getByRole("dialog").isVisible())) failures.push("mobile header: navigation dialog did not open");
await page.keyboard.press("Escape");
if (await page.getByRole("dialog").isVisible().catch(() => false)) failures.push("mobile header: Escape did not close navigation dialog");
await page.waitForFunction(() => document.activeElement?.getAttribute("aria-label") === "Toggle menu");
if (!(await menuButton.evaluate((element) => element === document.activeElement))) failures.push("mobile header: focus did not return to menu trigger");

await page.goto(`${BASE_URL}/pay`, { waitUntil: "networkidle" });
const packageTab = page.getByRole("tab", { name: "Service packages" });
await packageTab.focus();
await page.keyboard.press("ArrowRight");
await page.waitForFunction(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.includes("Custom / invoice amount"));
if ((await page.getByRole("tab", { name: "Custom / invoice amount" }).getAttribute("aria-selected")) !== "true") failures.push("payment tabs: ArrowRight did not select the next tab");

await desktop.close();
await browser.close();

const report = { baseUrl: BASE_URL, widths: WIDTHS, routes: ROUTES, passed: failures.length === 0, failures, results };
await writeFile("reports/accessibility-summary.json", JSON.stringify(report, null, 2));

console.log(`Accessibility audit: ${results.length} route/viewport checks`);
if (failures.length) {
  console.error(`\n${failures.length} prioritized failure(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("✓ No critical/serious WCAG, keyboard, image-reservation, overflow, or tap-target regressions.");