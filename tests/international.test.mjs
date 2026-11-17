import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  MARKETS,
  MARKET_CODES,
  isValidMarketCode,
  normalizeMarketCode,
  getMarketConfig,
} from "../src/config/markets.ts";
import { formatCurrency, getCurrencySymbol } from "../src/lib/currency.ts";
import { isCrawler, detectMarketFromHeaders } from "../src/services/CountryDetectionService.ts";
import {
  buildHreflangLinks,
  buildCanonicalLink,
  normalizePathWithoutMarket,
} from "../src/lib/seo.ts";

describe("International Multi-Market Configuration & Integrity", () => {
  it("defines all three core markets: NP, IN, and GLOBAL", () => {
    assert.deepEqual(MARKET_CODES, ["NP", "IN", "GLOBAL"]);
    assert.ok(MARKETS.NP, "NP market must exist");
    assert.ok(MARKETS.IN, "IN market must exist");
    assert.ok(MARKETS.GLOBAL, "GLOBAL market must exist");
  });

  it("strictly enforces truthful contact information per market", () => {
    // Nepal: verified phone and physical address in Janakpur
    assert.equal(MARKETS.NP.phone, "+977-9769294624");
    assert.ok(
      MARKETS.NP.address && MARKETS.NP.address.includes("Janakpur"),
      "Nepal address must be verified Janakpur location",
    );

    // India: truthful null values for unverified physical phone & address
    assert.equal(MARKETS.IN.phone, null, "India phone must be null unless verified");
    assert.equal(MARKETS.IN.address, null, "India address must be null unless verified");

    // Global: truthful null values for physical phone & address
    assert.equal(MARKETS.GLOBAL.phone, null, "Global phone must be null unless verified");
    assert.equal(MARKETS.GLOBAL.address, null, "Global address must be null unless verified");

    // All share central technical WhatsApp desk
    assert.equal(MARKETS.NP.whatsapp, "9779769294624");
    assert.equal(MARKETS.IN.whatsapp, "9779769294624");
    assert.equal(MARKETS.GLOBAL.whatsapp, "9779769294624");
  });

  it("assigns appropriate currencies, symbols and payment gateways", () => {
    assert.equal(MARKETS.NP.currency, "NPR");
    assert.equal(MARKETS.NP.currencySymbol, "रू");
    assert.equal(MARKETS.NP.paymentGateway, "esewa");

    assert.equal(MARKETS.IN.currency, "INR");
    assert.equal(MARKETS.IN.currencySymbol, "₹");
    assert.equal(MARKETS.IN.paymentGateway, "razorpay");

    assert.equal(MARKETS.GLOBAL.currency, "USD");
    assert.equal(MARKETS.GLOBAL.currencySymbol, "$");
  });

  it("includes three distinct, complete pricing tiers per market", () => {
    for (const code of MARKET_CODES) {
      const market = MARKETS[code];
      assert.equal(market.pricingTiers.length, 3, `${code} must have 3 pricing tiers`);
      for (const tier of market.pricingTiers) {
        assert.ok(tier.name, "Tier must have a name");
        assert.ok(tier.price, "Tier must have a price");
        assert.ok(tier.period, "Tier must have a period");
        assert.ok(tier.desc, "Tier must have a description");
        assert.ok(tier.features.length >= 4, "Tier must list at least 4 features");
        assert.ok(tier.cta, "Tier must have a CTA");
      }
    }
  });

  it("normalizes market codes correctly", () => {
    assert.equal(isValidMarketCode("NP"), true);
    assert.equal(isValidMarketCode("in"), true);
    assert.equal(isValidMarketCode("global"), true);
    assert.equal(isValidMarketCode("US"), false);

    assert.equal(normalizeMarketCode("NP"), "NP");
    assert.equal(normalizeMarketCode("nepal"), "NP");
    assert.equal(normalizeMarketCode("in"), "IN");
    assert.equal(normalizeMarketCode("INDIA"), "IN");
    assert.equal(normalizeMarketCode("global"), "GLOBAL");
    assert.equal(normalizeMarketCode("unknown"), "GLOBAL");

    assert.equal(getMarketConfig("np").code, "NP");
    assert.equal(getMarketConfig("in").code, "IN");
    assert.equal(getMarketConfig("unknown").code, "GLOBAL");
  });
});

describe("Currency Formatter Utility", () => {
  it("formats NPR, INR, and USD correctly", () => {
    const formattedNPR = formatCurrency(85000, "NPR");
    assert.ok(formattedNPR.includes("रू"), "Must include NPR symbol");
    assert.ok(formattedNPR.includes("85"), "Must include 85,000");

    const formattedINR = formatCurrency(65000, "INR");
    assert.ok(formattedINR.includes("₹"), "Must include INR symbol");
    assert.ok(formattedINR.includes("65"), "Must include 65,000");

    const formattedUSD = formatCurrency(1200, "USD");
    assert.ok(formattedUSD.includes("$"), "Must include USD symbol");
    assert.ok(
      formattedUSD.includes("1,200") || formattedUSD.includes("1200"),
      "Must include amount",
    );
  });

  it("returns currency symbols accurately", () => {
    assert.equal(getCurrencySymbol("NPR"), "रू");
    assert.equal(getCurrencySymbol("INR"), "₹");
    assert.equal(getCurrencySymbol("USD"), "$");
  });
});

describe("Country & Crawler Detection Service", () => {
  it("identifies search engine crawlers to protect SEO indexing", () => {
    assert.equal(
      isCrawler("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"),
      true,
    );
    assert.equal(
      isCrawler("Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)"),
      true,
    );
    assert.equal(isCrawler("ClaudeBot/1.0"), true);
    assert.equal(
      isCrawler("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"),
      false,
    );
  });

  it("extracts market from edge headers while bypassing crawlers", () => {
    assert.equal(detectMarketFromHeaders({ "cf-ipcountry": "NP" }), "NP");
    assert.equal(detectMarketFromHeaders({ "x-country-code": "IN" }), "IN");
    assert.equal(detectMarketFromHeaders({ "cf-ipcountry": "US" }), "GLOBAL");

    // Crawler must return null to prevent automatic redirection
    assert.equal(
      detectMarketFromHeaders({
        "cf-ipcountry": "NP",
        "user-agent": "Googlebot/2.1",
      }),
      null,
    );
  });
});

describe("International SEO & Hreflang Tags", () => {
  it("normalizes paths by stripping market prefixes", () => {
    assert.equal(normalizePathWithoutMarket("/"), "/");
    assert.equal(normalizePathWithoutMarket("/np"), "/");
    assert.equal(normalizePathWithoutMarket("/in/pricing"), "/pricing");
    assert.equal(normalizePathWithoutMarket("/global/about"), "/about");
  });

  it("generates reciprocal hreflang links for Nepal, India, Global and x-default", () => {
    const hreflangs = buildHreflangLinks("/services");
    assert.equal(hreflangs.length, 4);

    const np = hreflangs.find((h) => h.hrefLang === "en-NP");
    const ind = hreflangs.find((h) => h.hrefLang === "en-IN");
    const global = hreflangs.find((h) => h.hrefLang === "en");
    const xDefault = hreflangs.find((h) => h.hrefLang === "x-default");

    assert.equal(np?.href, "https://ozeonix.com/np/services");
    assert.equal(ind?.href, "https://ozeonix.com/in/services");
    assert.equal(global?.href, "https://ozeonix.com/global/services");
    assert.equal(xDefault?.href, "https://ozeonix.com/services");
  });

  it("generates valid canonical links", () => {
    assert.equal(buildCanonicalLink("/np/services").href, "https://ozeonix.com/np/services");
    assert.equal(buildCanonicalLink("/services").href, "https://ozeonix.com/services");
  });
});

describe("File Architecture & Routing Integrity", () => {
  const root = process.cwd();

  const expectedRegionalRoutes = [
    "src/routes/$market.jsx",
    "src/routes/$market.index.jsx",
    "src/routes/$market.about.jsx",
    "src/routes/$market.services.jsx",
    "src/routes/$market.contact.jsx",
  ];

  const expectedSharedViews = [
    "src/components/pages/HomePageView.jsx",
    "src/components/pages/AboutPageView.jsx",
    "src/components/pages/ServicesPageView.jsx",
    "src/components/pages/ContactPageView.jsx",
    "src/components/MarketSelector.jsx",
  ];

  it("contains all regional route files", () => {
    for (const rel of expectedRegionalRoutes) {
      assert.ok(fs.existsSync(path.join(root, rel)), `Route file ${rel} must exist`);
    }
  });

  it("ensures pricing routes and views have been completely removed", () => {
    const deletedFiles = [
      "src/routes/pricing.jsx",
      "src/routes/$market.pricing.jsx",
      "src/components/pages/PricingPageView.jsx",
    ];
    for (const rel of deletedFiles) {
      assert.strictEqual(fs.existsSync(path.join(root, rel)), false, `File ${rel} must be deleted`);
    }

    const navbarContent = fs.readFileSync(path.join(root, "src/components/Navbar.jsx"), "utf-8");
    assert.strictEqual(
      navbarContent.includes('"Pricing"') || navbarContent.includes("to: '/pricing'"),
      false,
      "Navbar must not have Pricing link",
    );
  });

  it("contains all shared reusable page views and UI selector", () => {
    for (const rel of expectedSharedViews) {
      assert.ok(fs.existsSync(path.join(root, rel)), `Component ${rel} must exist`);
    }
  });

  it("updates sitemaps to include all regional URLs and omit pricing", () => {
    const sitemapXml = fs.readFileSync(path.join(root, "public", "sitemap.xml"), "utf-8");
    assert.ok(sitemapXml.includes("https://ozeonix.com/np"), "Must include /np");
    assert.ok(sitemapXml.includes("https://ozeonix.com/in"), "Must include /in");
    assert.ok(sitemapXml.includes("https://ozeonix.com/global"), "Must include /global");
    assert.strictEqual(
      sitemapXml.includes("https://ozeonix.com/pricing"),
      false,
      "Must not include /pricing",
    );
    assert.strictEqual(
      sitemapXml.includes("https://ozeonix.com/np/pricing"),
      false,
      "Must not include /np/pricing",
    );
    assert.strictEqual(
      sitemapXml.includes("https://ozeonix.com/in/pricing"),
      false,
      "Must not include /in/pricing",
    );
    assert.strictEqual(
      sitemapXml.includes("https://ozeonix.com/global/pricing"),
      false,
      "Must not include /global/pricing",
    );
  });

  it("does not use flag emojis and enables Google Translate auto-suggestion", () => {
    // Assert no flag emojis in markets configuration
    for (const code of MARKET_CODES) {
      assert.strictEqual("flag" in MARKETS[code], false, `${code} should not define flag`);
    }

    const marketSelectorPath = path.join(root, "src/components/MarketSelector.jsx");
    const marketSelectorContent = fs.readFileSync(marketSelectorPath, "utf-8");
    assert.strictEqual(
      marketSelectorContent.includes("flag"),
      false,
      "MarketSelector must not use flags",
    );

    const rootPath = path.join(root, "src/routes/__root.jsx");
    const rootContent = fs.readFileSync(rootPath, "utf-8");
    assert.ok(
      rootContent.includes("google_translate_element"),
      "__root.jsx must include google_translate_element for auto-suggestion",
    );
    assert.ok(
      rootContent.includes("googleTranslateElementInit"),
      "__root.jsx must configure googleTranslateElementInit",
    );
  });
});
