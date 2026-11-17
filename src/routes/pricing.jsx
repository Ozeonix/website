import { createFileRoute } from "@tanstack/react-router";
import PricingPageView from "../components/pages/PricingPageView.jsx";
import { buildMarketHead } from "../lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () =>
    buildMarketHead({
      path: "/pricing",
      title: "Pricing & Engagement Plans | Ozeonix Infinity",
      description:
        "Transparent software development pricing across Nepal, India, and global markets. Fixed scopes, milestone billing, and dedicated post-launch support.",
    }),
  component: PricingPageView,
});
