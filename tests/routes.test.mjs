import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Route Files & Structured Data Integrity", () => {
  const rootDir = process.cwd();

  const requiredRoutes = [
    "services.erp-development.jsx",
    "services.crm-solutions.jsx",
    "services.lms-platforms.jsx",
    "services.index.jsx",
    "careers.jsx",
    "industries.jsx",
    "industries.$slug.jsx",
    "about.jsx",
    "contact.jsx",
    "process.jsx",
    "products.jsx",
    "portfolio.jsx",
    "faq.jsx",
  ];

  it("all primary inner page routes exist in src/routes", () => {
    for (const file of requiredRoutes) {
      const fullPath = path.join(rootDir, "src", "routes", file);
      assert.ok(fs.existsSync(fullPath), `Route file src/routes/${file} must exist`);
    }
  });

  it("ERP development route includes structured JSON-LD data and photographic cards", () => {
    const erpPath = path.join(rootDir, "src", "routes", "services.erp-development.jsx");
    const content = fs.readFileSync(erpPath, "utf-8");

    assert.ok(content.includes("SERVICE_JSONLD"), "Must include SERVICE_JSONLD");
    assert.ok(content.includes("FAQ_JSONLD"), "Must include FAQ_JSONLD");
    assert.ok(content.includes("MODULES"), "Must define MODULES array");
    assert.ok(content.includes("INDUSTRY_SOLUTIONS"), "Must define INDUSTRY_SOLUTIONS array");
    assert.ok(content.includes("IMPLEMENTATION_STEPS"), "Must define IMPLEMENTATION_STEPS array");
  });

  it("Careers route includes Google Jobs schema and culture pillars", () => {
    const careersPath = path.join(rootDir, "src", "routes", "careers.jsx");
    const content = fs.readFileSync(careersPath, "utf-8");

    assert.ok(content.includes("JobPosting"), "Must define JobPosting schema for Google Jobs");
    assert.ok(content.includes("CULTURE_PILLARS"), "Must define CULTURE_PILLARS");
    assert.ok(content.includes("BENEFITS"), "Must define BENEFITS with imagery");
  });
});
