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

  it("defines motion tokens and shadow tokens for card animations", () => {
    const cssPath = path.join(rootDir, "src", "styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    // Shadow tokens
    assert.ok(
      content.includes("rgba(72, 86, 100, 0.1) 0px 2px 20px 0px"),
      "Must define shadow-sm as rgba(72, 86, 100, 0.1) 0px 2px 20px 0px",
    );
    assert.ok(
      content.includes("rgba(0, 0, 0, 0.1) 0px 0px 25px 0px"),
      "Must define shadow-md as rgba(0, 0, 0, 0.1) 0px 0px 25px 0px",
    );

    // Motion tokens
    assert.ok(content.includes("--duration-fast-all"), "Must define duration-fast all");
    assert.ok(content.includes("--duration-fast-transform"), "Must define duration-fast transform");
    assert.ok(content.includes("--duration-fast-none"), "Must define duration-fast none");
    assert.ok(content.includes("--duration-base-ease-out"), "Must define duration-base ease-out");
    assert.ok(
      content.includes("--duration-base-ease-in-out"),
      "Must define duration-base ease-in-out",
    );
    assert.ok(content.includes("--duration-slow-reveal"), "Must define duration-slow reveal");
    assert.ok(content.includes("moveCursor1"), "Must define moveCursor1 keyframe animation");

    // Card application
    assert.ok(content.includes("--card-transition"), "Must define --card-transition");
    assert.ok(content.includes(".oz-card"), "Must style .oz-card");
  });
});
