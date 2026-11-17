import { createFileRoute } from "@tanstack/react-router";
import ServicesPageView from "../components/pages/ServicesPageView.jsx";
import { buildMarketHead } from "../lib/seo";
import { normalizeMarketCode, isValidMarketCode } from "../config/markets";

export const Route = createFileRoute("/$market/services")({
  head: ({ params }) => {
    const market = params?.market;
    const marketCode = isValidMarketCode(market) ? normalizeMarketCode(market) : "GLOBAL";
    return buildMarketHead({
      path: `/${params?.market || "global"}/services`,
      marketCode,
      title: `Custom Software Development Services | Ozeonix Infinity - ${marketCode === "NP" ? "Nepal" : marketCode === "IN" ? "India" : "International"}`,
      description:
        "Custom websites, Flutter mobile apps, cloud CRM platforms, institutional ERP systems, and modern SaaS architecture tailored to your market.",
    });
  },
  component: ServicesPageView,
});

