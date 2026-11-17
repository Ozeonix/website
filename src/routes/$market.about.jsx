import { createFileRoute } from "@tanstack/react-router";
import AboutPageView from "../components/pages/AboutPageView.jsx";
import { buildMarketHead } from "../lib/seo";
import { normalizeMarketCode, isValidMarketCode } from "../config/markets";

export const Route = createFileRoute("/$market/about")({
  head: ({ params }) => {
    const market = params?.market;
    const marketCode = isValidMarketCode(market) ? normalizeMarketCode(market) : "GLOBAL";
    return buildMarketHead({
      path: `/${params?.market || "global"}/about`,
      marketCode,
      title: `About Us | Ozeonix Infinity - ${marketCode === "NP" ? "Nepal" : marketCode === "IN" ? "India" : "International"}`,
      description:
        "Ozeonix Infinity is a technology studio helping startups, institutions, and growing businesses transform ideas into reliable digital products.",
    });
  },
  component: AboutPageView,
});
