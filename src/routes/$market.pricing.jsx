import { createFileRoute } from "@tanstack/react-router";
import PricingPageView from "../components/pages/PricingPageView.jsx";
import { buildMarketHead } from "../lib/seo";
import { normalizeMarketCode, isValidMarketCode, getMarketConfig } from "../config/markets";

export const Route = createFileRoute("/$market/pricing")({
  head: ({ params }) => {
    const market = params?.market;
    const marketCode = isValidMarketCode(market) ? normalizeMarketCode(market) : "GLOBAL";
    const config = getMarketConfig(marketCode);
    return buildMarketHead({
      path: `/${params?.market || "global"}/pricing`,
      marketCode,
      title: `Software Development Pricing in ${config.currency} | Ozeonix Infinity - ${config.name}`,
      description: `Predictable, transparent software development pricing in ${config.currency} (${config.currencySymbol}). Milestone billing, full code ownership, and dedicated engineering warranties.`,
    });
  },
  component: PricingPageView,
});

