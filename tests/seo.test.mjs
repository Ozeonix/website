import { test, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("SEO & Search Engine Indexing", () => {
  const rootDir = process.cwd();

  it("sitemap.xml exists and includes all primary routes", () => {
    const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
    assert.ok(fs.existsSync(sitemapPath), "public/sitemap.xml must exist");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    assert.ok(content.includes("<urlset"), "Must be a valid XML urlset");
    assert.ok(
      content.includes("https://ozeonix.com/services/erp-development"),
      "Must include /services/erp-development",
    );
    assert.ok(
      content.includes("https://ozeonix.com/services/crm-solutions"),
      "Must include /services/crm-solutions",
    );
    assert.ok(
      content.includes("https://ozeonix.com/services/lms-platforms"),
      "Must include /services/lms-platforms",
    );
    assert.ok(content.includes("https://ozeonix.com/careers"), "Must include /careers");
    assert.ok(
      content.includes("https://ozeonix.com/industries/e-commerce"),
      "Must include industry slugs",
    );
  });

  it("robots.txt properly configured for Google and AI search engines", () => {
    const robotsPath = path.join(rootDir, "public", "robots.txt");
    assert.ok(fs.existsSync(robotsPath), "public/robots.txt must exist");
    const content = fs.readFileSync(robotsPath, "utf-8");

    assert.ok(
      content.includes("Sitemap: https://ozeonix.com/sitemap.xml"),
      "Must declare sitemap location",
    );
    assert.ok(content.includes("GPTBot"), "Must configure GPTBot directives");
    assert.ok(content.includes("ClaudeBot"), "Must configure ClaudeBot directives");
    assert.ok(content.includes("PerplexityBot"), "Must configure PerplexityBot directives");
  });

  it("llms.txt exists with structured context for LLM search engines", () => {
    const llmsPath = path.join(rootDir, "public", "llms.txt");
    assert.ok(fs.existsSync(llmsPath), "public/llms.txt must exist");
    const content = fs.readFileSync(llmsPath, "utf-8");

    assert.ok(content.includes("# Ozeonix Infinity"), "Must have header");
    assert.ok(content.includes("+977-9769294624"), "Must contain verified contact info");
  });
});
