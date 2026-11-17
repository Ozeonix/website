import { getMarketConfig, type MarketCode } from "../config/markets.ts";

export interface HreflangLink {
  rel: "alternate";
  hrefLang: string;
  href: string;
}

export interface CanonicalLink {
  rel: "canonical";
  href: string;
}

const BASE_URL = "https://ozeonix.com";

/**
 * Normalizes a path by removing any /np, /in, or /global market prefix.
 */
export function normalizePathWithoutMarket(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const stripped = clean.replace(/^\/(np|in|global)/i, "");
  return stripped === "" ? "/" : stripped;
}

/**
 * Generates reciprocal hreflang links for a given path across NP, IN, GLOBAL, and x-default.
 */
export function buildHreflangLinks(path: string): HreflangLink[] {
  const norm = normalizePathWithoutMarket(path);
  const suffix = norm === "/" ? "" : norm;

  return [
    {
      rel: "alternate",
      hrefLang: "en-NP",
      href: `${BASE_URL}/np${suffix}`,
    },
    {
      rel: "alternate",
      hrefLang: "en-IN",
      href: `${BASE_URL}/in${suffix}`,
    },
    {
      rel: "alternate",
      hrefLang: "en",
      href: `${BASE_URL}/global${suffix}`,
    },
    {
      rel: "alternate",
      hrefLang: "x-default",
      href: `${BASE_URL}${norm}`,
    },
  ];
}

/**
 * Generates canonical link for a given route path.
 */
export function buildCanonicalLink(path: string): CanonicalLink {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return {
    rel: "canonical",
    href: `${BASE_URL}${clean}`,
  };
}

/**
 * Helper to build TanStack Router head configuration with international SEO metadata.
 */
export function buildMarketHead({
  path,
  marketCode,
  title,
  description,
}: {
  path: string;
  marketCode?: MarketCode;
  title?: string;
  description?: string;
}) {
  const market = marketCode ? getMarketConfig(marketCode) : null;
  const pageTitle = title || market?.metaTitle || "Ozeonix Infinity | Global Technology Company";
  const pageDesc =
    description || market?.metaDesc || "Custom CRM, ERP, web and mobile app development company.";
  const canonical = buildCanonicalLink(path);
  const hreflangs = buildHreflangLinks(path);

  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDesc },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical.href },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDesc },
    ],
    links: [canonical, ...hreflangs],
  };
}
