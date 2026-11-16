import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

describe("Brand Design System & CSS Invariants", () => {
  const rootDir = process.cwd();

  it("src/styles.css defines canonical brand orange and surface tokens", () => {
    const cssPath = path.join(rootDir, "src", "styles.css");
    assert.ok(fs.existsSync(cssPath), "src/styles.css must exist");
    const content = fs.readFileSync(cssPath, "utf-8");

    assert.ok(content.includes("--brand-orange"), "Must define --brand-orange token");
    assert.ok(content.includes("--brand-orange-hover"), "Must define --brand-orange-hover token");
    assert.ok(content.includes("--brand-orange-deep"), "Must define --brand-orange-deep token");
    assert.ok(content.includes("#ea580c"), "Primary brand must be #ea580c");
  });

  it("src/styles.css has no redundant font @import causing PostCSS warnings", () => {
    const cssPath = path.join(rootDir, "src", "styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    // All @import statements must be at the very top (before any rule statements)
    const lines = content.split("\n");
    const fontImportLine = lines.findIndex((l) => l.includes("@import url("));
    assert.equal(
      fontImportLine,
      -1,
      "Font @import in CSS should be avoided in favor of HTML link in __root.jsx",
    );
  });

  it("opener action buttons have 2px desktop gap and mobile center alignment", () => {
    const cssPath = path.join(rootDir, "src", "styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    assert.ok(content.includes(".oz-open__actions"), "Must define .oz-open__actions");
    assert.ok(content.includes("gap: 2px"), "Must have 2px gap on desktop");
    assert.ok(content.includes("justify-content: center"), "Must center buttons on mobile");
  });
});
