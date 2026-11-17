import { createFileRoute } from "@tanstack/react-router";
import ContactPageView from "../components/pages/ContactPageView.jsx";
import { buildMarketHead } from "../lib/seo";
import { normalizeMarketCode, isValidMarketCode, getMarketConfig } from "../config/markets";

export const Route = createFileRoute("/$market/contact")({
  head: ({ params }) => {
    const market = params?.market;
    const marketCode = isValidMarketCode(market) ? normalizeMarketCode(market) : "GLOBAL";
    const config = getMarketConfig(marketCode);
    return buildMarketHead({
      path: `/${params?.market || "global"}/contact`,
      marketCode,
      title: `Contact Ozeonix Infinity - ${config.name} Engineering Desk`,
      description: `Contact Ozeonix Infinity for custom software, CRM, ERP, and mobile app development in ${config.name}. Direct WhatsApp and engineering consultation.`,
    });
  },
  component: ContactPageView,
});
