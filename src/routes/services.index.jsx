import { createFileRoute } from "@tanstack/react-router";
import ServicesPageView from "../components/pages/ServicesPageView.jsx";
import { buildCanonicalLink, buildHreflangLinks } from "../lib/seo";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software, CRM & ERP Development Services",
  provider: {
    "@type": "Organization",
    name: "Ozeonix Infinity",
    url: "https://ozeonix.com",
  },
  areaServed: "Worldwide",
  serviceType: "Software Development",
  description:
    "Custom websites, Flutter mobile apps, CRM systems, ERP solutions, UI/UX design, cloud deployment and AI-ready automation for ambitious businesses and institutions.",
};

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Custom Software Development Services | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Explore custom CRM, ERP, LMS, website, mobile app and cloud development services from Ozeonix Infinity.",
      },
      { property: "og:title", content: "Custom Software Development Services | Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Custom CRM, ERP, LMS, website, mobile app and cloud development services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [buildCanonicalLink("/services"), ...buildHreflangLinks("/services")],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SERVICE_JSONLD),
      },
    ],
  }),
  component: ServicesPageView,
});
