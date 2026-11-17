import { createFileRoute } from "@tanstack/react-router";
import AboutPageView from "../components/pages/AboutPageView.jsx";
import { buildCanonicalLink, buildHreflangLinks } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Ozeonix Infinity is a technology studio helping startups, institutions and businesses transform ideas into reliable digital products.",
      },
      { property: "og:title", content: "About Us - Ozeonix Infinity" },
      {
        property: "og:description",
        content:
          "We build websites, mobile apps, CRM and ERP systems that businesses can actually rely on.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [buildCanonicalLink("/about"), ...buildHreflangLinks("/about")],
  }),
  component: AboutPageView,
});
