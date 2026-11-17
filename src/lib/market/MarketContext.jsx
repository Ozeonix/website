import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  MARKETS,
  getMarketConfig,
  normalizeMarketCode,
  isValidMarketCode,
} from "../../config/markets";
import {
  getMarketCookie,
  setMarketCookie,
  detectClientFallbackMarket,
} from "../../services/CountryDetectionService";

const MarketContext = createContext(null);

export function MarketProvider({ children, routeMarket }) {
  const [activeMarketCode, setActiveMarketCode] = useState(() => {
    if (routeMarket && isValidMarketCode(routeMarket)) {
      return normalizeMarketCode(routeMarket);
    }
    const cookieMarket = getMarketCookie();
    if (cookieMarket) {
      return cookieMarket;
    }
    return "GLOBAL";
  });

  // Sync if routeMarket prop changes
  useEffect(() => {
    if (routeMarket && isValidMarketCode(routeMarket)) {
      const normalized = normalizeMarketCode(routeMarket);
      setActiveMarketCode(normalized);
      setMarketCookie(normalized);
    }
  }, [routeMarket]);

  // Client-side fallback detection on mount if no cookie is set and no routeMarket
  useEffect(() => {
    if (!routeMarket && typeof window !== "undefined") {
      const existingCookie = getMarketCookie();
      if (!existingCookie) {
        const detected = detectClientFallbackMarket();
        if (detected !== "GLOBAL") {
          setActiveMarketCode(detected);
        }
      }
    }
  }, [routeMarket]);

  const switchMarket = useCallback((targetMarket) => {
    const normalized = normalizeMarketCode(targetMarket);
    setActiveMarketCode(normalized);
    setMarketCookie(normalized);

    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname;
    const search = window.location.search || "";
    const hash = window.location.hash || "";

    // Parse whether current path is market-prefixed
    const prefixMatch = currentPath.match(/^\/(np|in|global)(\/.*)?$/i);
    const targetPrefix = `/${normalized.toLowerCase()}`;

    let newPath = currentPath;
    if (prefixMatch) {
      const remainder = prefixMatch[2] || "";
      newPath = `${targetPrefix}${remainder}`;
    } else {
      // Current path is root or subpage like /about, /pricing, /contact, /services
      if (currentPath === "/" || currentPath === "") {
        newPath = targetPrefix;
      } else {
        newPath = `${targetPrefix}${currentPath}`;
      }
    }

    // Clean up double slashes if any
    newPath = newPath.replace(/\/+/g, "/");
    window.location.href = `${newPath}${search}${hash}`;
  }, []);

  const getLocalizedPath = useCallback(
    (path, targetMarket) => {
      const code = targetMarket ? normalizeMarketCode(targetMarket) : activeMarketCode;
      const targetPrefix = `/${code.toLowerCase()}`;

      // Clean input path
      const cleanPath = path.startsWith("/") ? path : `/${path}`;

      // If already prefixed with another market, strip it
      const stripped = cleanPath.replace(/^\/(np|in|global)/i, "");

      if (!stripped || stripped === "/") {
        return targetPrefix;
      }

      return `${targetPrefix}${stripped}`.replace(/\/+/g, "/");
    },
    [activeMarketCode],
  );

  const currentMarket = useMemo(() => {
    return getMarketConfig(activeMarketCode);
  }, [activeMarketCode]);

  const value = useMemo(
    () => ({
      marketCode: activeMarketCode,
      currentMarket,
      switchMarket,
      getLocalizedPath,
      isNepal: activeMarketCode === "NP",
      isIndia: activeMarketCode === "IN",
      isGlobal: activeMarketCode === "GLOBAL",
    }),
    [activeMarketCode, currentMarket, switchMarket, getLocalizedPath],
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    // Return safe fallback if used outside Provider
    return {
      marketCode: "GLOBAL",
      currentMarket: MARKETS.GLOBAL,
      switchMarket: () => {},
      getLocalizedPath: (p) => p,
      isNepal: false,
      isIndia: false,
      isGlobal: true,
    };
  }
  return context;
}
