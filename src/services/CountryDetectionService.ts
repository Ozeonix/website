import { normalizeMarketCode, type MarketCode } from "../config/markets.ts";

export const MARKET_COOKIE_NAME = "oz.market";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "facebot",
  "facebookexternalhit",
  "ia_archiver",
  "claudebot",
  "gptbot",
  "twitterbot",
  "linkedinbot",
  "applebot",
  "semrushbot",
  "ahrefsbot",
];

/**
 * Checks if the request User-Agent belongs to a search engine crawler or bot.
 */
export function isCrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

/**
 * Resolves a MarketCode from HTTP headers (Cloudflare, Vercel, AWS CloudFront, etc.).
 */
export function detectMarketFromHeaders(
  headers: Headers | Record<string, string | undefined>,
): MarketCode | null {
  const getHeader = (name: string): string | undefined => {
    if (typeof (headers as Headers).get === "function") {
      return (headers as Headers).get(name) || undefined;
    }
    const record = headers as Record<string, string | undefined>;
    return record[name] || record[name.toLowerCase()];
  };

  const userAgent = getHeader("user-agent");
  if (isCrawler(userAgent)) {
    return null; // Do not force geo-redirection for crawlers
  }

  const rawCountry =
    getHeader("cf-ipcountry") ||
    getHeader("x-vercel-ip-country") ||
    getHeader("cloudfront-viewer-country") ||
    getHeader("x-country-code") ||
    getHeader("x-geo-country");

  if (!rawCountry) return null;

  const country = rawCountry.trim().toUpperCase();
  if (country === "NP") return "NP";
  if (country === "IN") return "IN";
  return "GLOBAL";
}

/**
 * Reads the market preference cookie in browser or server cookie string.
 */
export function getMarketCookie(cookieHeader?: string): MarketCode | null {
  let cookies = "";
  if (typeof document !== "undefined") {
    cookies = document.cookie || "";
  } else if (cookieHeader) {
    cookies = cookieHeader;
  }

  if (!cookies) return null;

  const match = cookies.match(new RegExp(`(?:^|;\\s*)${MARKET_COOKIE_NAME}=([^;]*)`));
  if (match && match[1]) {
    const val = decodeURIComponent(match[1]);
    return normalizeMarketCode(val);
  }

  return null;
}

/**
 * Sets the market preference cookie in the browser.
 */
export function setMarketCookie(market: MarketCode): void {
  if (typeof document === "undefined") return;
  document.cookie = `${MARKET_COOKIE_NAME}=${market}; path=/; max-age=${ONE_YEAR_SECONDS}; SameSite=Lax`;
}

/**
 * Client-side heuristic using browser timezone when headers are not available.
 */
export function detectClientFallbackMarket(): MarketCode {
  if (typeof Intl === "undefined" || !Intl.DateTimeFormat) {
    return "GLOBAL";
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Kathmandu")) return "NP";
    if (tz.includes("Kolkata") || tz.includes("Calcutta")) return "IN";
  } catch {
    // ignore
  }

  return "GLOBAL";
}
