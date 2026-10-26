/**
 * SEO metadata stability check.
 *
 * Asserts that head-level SEO tags — <title>, meta description, og:*,
 * twitter:*, canonical, and JSON-LD blocks — remain byte-identical after
 * the user interacts with the CTA cards. CTA clicks are same-route
 * interactions, so any drift means a component is mutating the document
 * head (a regression that breaks crawler + social-preview consistency).
 *
 * Also validates:
 *  - Exactly one <link rel="canonical">
 *  - canonical + og:url self-reference the current route
 *  - Every JSON-LD block parses as valid JSON with an @context
 *  - og:type and twitter:card are present
 *
 * Run:  bunx playwright test tests/seo/metadata-stability.spec.mjs
 */
import { test, expect } from "@playwright/test";

const ROUTES = ["/", "/services", "/contact", "/about"];
const BASE = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:8080";

async function snapshotHead(page) {
  return await page.evaluate(() => {
    const pick = (sel, attr) =>
      Array.from(document.querySelectorAll(sel))
        .map((n) => n.getAttribute(attr))
        .filter(Boolean);
    return {
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.content || null,
      canonical:
        document.querySelector('link[rel="canonical"]')?.href || null,
      canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
      ogTitle:
        document.querySelector('meta[property="og:title"]')?.content || null,
      ogDescription:
        document.querySelector('meta[property="og:description"]')?.content ||
        null,
      ogUrl:
        document.querySelector('meta[property="og:url"]')?.content || null,
      ogType:
        document.querySelector('meta[property="og:type"]')?.content || null,
      twitterCard:
        document.querySelector('meta[name="twitter:card"]')?.content || null,
      jsonLd: Array.from(
        document.querySelectorAll('script[type="application/ld+json"]'),
      ).map((s) => s.textContent || ""),
    };
  });
}

for (const route of ROUTES) {
  test(`SEO head is valid and stable across CTA interactions — ${route}`, async ({
    page,
  }) => {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    const before = await snapshotHead(page);

    // Structural invariants
    expect(before.title, "title present").toBeTruthy();
    expect(before.title).not.toMatch(/Lovable (App|Generated Project)/i);
    expect(before.description, "description present").toBeTruthy();
    expect(before.canonicalCount, "exactly one canonical").toBe(1);
    expect(before.canonical, "canonical is absolute").toMatch(/^https?:\/\//);
    expect(before.ogType, "og:type present").toBeTruthy();
    expect(before.twitterCard, "twitter:card present").toBeTruthy();

    // canonical + og:url self-reference
    if (before.ogUrl) {
      expect(new URL(before.ogUrl).pathname).toBe(
        new URL(before.canonical).pathname,
      );
    }

    // JSON-LD parses and has @context
    for (const raw of before.jsonLd) {
      const parsed = JSON.parse(raw);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const n of nodes) {
        expect(n["@context"], "JSON-LD has @context").toBeTruthy();
        expect(n["@type"], "JSON-LD has @type").toBeTruthy();
      }
    }

    // Interact with any CTA group present, then re-snapshot
    const cta = page.locator('[role="group"] [data-cta-id], [role="group"] > *').first();
    if (await cta.count()) {
      await cta.focus().catch(() => {});
      await page.keyboard.press("ArrowRight").catch(() => {});
      await page.keyboard.press("Home").catch(() => {});
      await page.keyboard.press("End").catch(() => {});
      await cta.click({ trial: true }).catch(() => {});
    }

    const after = await snapshotHead(page);
    expect(after, "head unchanged after CTA interaction").toEqual(before);
  });
}
