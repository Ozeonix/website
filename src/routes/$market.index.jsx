import { createFileRoute } from "@tanstack/react-router";
import HomePageView from "../components/pages/HomePageView.jsx";
import { buildMarketHead } from "../lib/seo";
import { normalizeMarketCode, isValidMarketCode } from "../config/markets";

export const Route = createFileRoute("/$market/")({
  head: ({ params }) => {
    const market = params?.market;
    const marketCode = isValidMarketCode(market) ? normalizeMarketCode(market) : "GLOBAL";
    return buildMarketHead({
      path: `/${params?.market || "global"}`,
      marketCode,
    });
  },
  component: HomePageView,
});

