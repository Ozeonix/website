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

  it("deprecated routes and quick actions components are completely removed", () => {
    const removedRoutes = ["pay.jsx", "partner-program.jsx", "auth.jsx"];
    for (const file of removedRoutes) {
      const fullPath = path.join(rootDir, "src", "routes", file);
      assert.strictEqual(fs.existsSync(fullPath), false, `Deprecated route ${file} must not exist`);
    }

    const navActionsPath = path.join(rootDir, "src", "components", "NavActionsDropdown.jsx");
    assert.strictEqual(
      fs.existsSync(navActionsPath),
      false,
      "NavActionsDropdown.jsx component must not exist",
    );

    const navbarPath = path.join(rootDir, "src", "components", "Navbar.jsx");
    const navbarContent = fs.readFileSync(navbarPath, "utf-8");
    assert.strictEqual(
      navbarContent.includes("NavActionsDropdown"),
      false,
      "Navbar must not import or render NavActionsDropdown",
    );
    assert.strictEqual(
      navbarContent.includes('to="/pay"'),
      false,
      'Navbar must not link to "/pay"',
    );
    assert.ok(
      navbarContent.includes("<LanguageSwitcher />"),
      "Navbar must render LanguageSwitcher",
    );
  });

  it("NotFoundComponent does not duplicate Navbar or Footer", () => {
    const rootPath = path.join(rootDir, "src", "routes", "__root.jsx");
    const rootContent = fs.readFileSync(rootPath, "utf-8");

    // Extract NotFoundComponent block
    const notFoundMatch = rootContent.match(/function NotFoundComponent\(\)\s*\{([\s\S]*?)\n\}/);
    assert.ok(notFoundMatch, "NotFoundComponent must be defined in __root.jsx");
    const notFoundBody = notFoundMatch[1];

    assert.strictEqual(
      notFoundBody.includes("<Navbar"),
      false,
      "NotFoundComponent must not render <Navbar /> directly to avoid duplicate navigation",
    );
    assert.strictEqual(
      notFoundBody.includes("<Footer"),
      false,
      "NotFoundComponent must not render <Footer /> directly to avoid duplicate footers",
    );
  });
});
