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

    // Card application & noticeable interaction
    assert.ok(content.includes("--card-transition"), "Must define --card-transition");
    assert.ok(content.includes(".oz-card"), "Must style .oz-card");
    assert.ok(
      content.includes("transform: translateY(-6px)"),
      "Cards must have visible -6px elevation on hover",
    );
    assert.ok(
      content.includes(".oz-card:hover img"),
      "Card images must have hover zoom transition",
    );
    assert.ok(
      content.includes("transition: transform 0.4s ease-in-out"),
      "Card images must use duration-slow 0.4s",
    );
    assert.ok(
      content.includes(".oz-grid > .oz-reveal:nth-child(1)"),
      "Staggered reveal tokens must match grid reveal children",
    );
  });

  it("navigation bar is fixed to the viewport and does not scroll away", () => {
    const cssPath = path.join(rootDir, "src", "styles.css");
    const content = fs.readFileSync(cssPath, "utf-8");

    assert.ok(content.includes("position: fixed"), "Navbar must be position fixed");
    assert.ok(content.includes("--oz-nav-height"), "Must define --oz-nav-height");
    assert.ok(content.includes("main#main-content"), "Must offset main content below fixed navbar");
    assert.ok(
      content.includes("padding-top: var(--oz-nav-height"),
      "Main content must have padding-top offset",
    );
  });

  it("upgrades development process section with icon-box layout and multi-image collage", () => {
    const homePath = path.join(rootDir, "src", "components", "pages", "HomePageView.jsx");
    const homeContent = fs.readFileSync(homePath, "utf-8");

    assert.ok(
      homeContent.includes("oz-process-content-col"),
      "Must define oz-process-content-col for process steps",
    );
    assert.ok(
      homeContent.includes("oz-process-showcase-col"),
      "Must define oz-process-showcase-col for visual collage",
    );
    assert.ok(
      homeContent.includes("oz-process-collage"),
      "Must render oz-process-collage with multi-image showcase",
    );
    assert.ok(
      homeContent.includes("processDesignSprint"),
      "Must include processDesignSprint asset in collage",
    );
    assert.ok(
      homeContent.includes("processCodeQuality"),
      "Must include processCodeQuality asset in collage",
    );
    assert.ok(
      homeContent.includes("oz-process-icon-circle"),
      "Must render circular icon badges for process steps",
    );

    const cssPath = path.join(rootDir, "src", "styles.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");
    assert.ok(cssContent.includes(".oz-process-collage"), "CSS must style .oz-process-collage");
    assert.ok(
      cssContent.includes(".oz-process-collage__float"),
      "CSS must style floating collage cards",
    );
    assert.ok(
      cssContent.includes(".oz-process-icon-circle"),
      "CSS must style .oz-process-icon-circle",
    );
  });
});
