import { createFileRoute } from "@tanstack/react-router";
import ContactPageView from "../components/pages/ContactPageView.jsx";
import { buildCanonicalLink, buildHreflangLinks } from "../lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ozeonix Infinity - Start Your Software Project" },
      {
        name: "description",
        content:
          "Contact Ozeonix Infinity for custom CRM, ERP, LMS, website and mobile app development. Get a free consultation for your next digital product.",
      },
      { property: "og:title", content: "Contact Ozeonix Infinity - Start Your Software Project" },
      {
        property: "og:description",
        content:
          "Get a free consultation for custom CRM, ERP, LMS, website and mobile app development.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [buildCanonicalLink("/contact"), ...buildHreflangLinks("/contact")],
  }),
  component: ContactPageView,
});
