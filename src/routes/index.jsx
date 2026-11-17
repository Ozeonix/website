import { createFileRoute } from "@tanstack/react-router";
import HomePageView, { FAQS } from "../components/pages/HomePageView.jsx";
import { buildCanonicalLink, buildHreflangLinks } from "../lib/seo";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ozeonix Infinity",
  url: "https://ozeonix.com",
  logo: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
  description:
    "Custom software development studio building CRM, ERP, LMS, websites and mobile apps for businesses and educational institutions.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  provider: {
    "@type": "Organization",
    name: "Ozeonix Infinity",
    image: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
    telephone: "+977-9769294624",
    url: "https://ozeonix.com",
    areaServed: "Worldwide",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["English", "Nepali", "Hindi"],
      telephone: "+977-9769294624",
    },
    sameAs: [
      "https://www.linkedin.com/company/ozeonix-infinity",
      "https://www.instagram.com/ozeonix.infinity",
      "https://www.facebook.com/ozeonix.infinity",
    ],
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom CRM, ERP, LMS, Web & Mobile Development | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Ozeonix Infinity builds custom CRM, ERP, LMS, websites and mobile apps for ambitious businesses and institutions. Shape Thought. Power Tomorrow.",
      },
      { property: "og:title", content: "Ozeonix Infinity | Shape Thought. Power Tomorrow" },
      {
        property: "og:description",
        content:
          "Custom CRM, ERP, LMS, website and mobile app solutions built around your goals. Discuss your project with Ozeonix Infinity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [buildCanonicalLink("/"), ...buildHreflangLinks("/")],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCALBUSINESS_JSONLD),
      },
    ],
  }),
  component: HomePageView,
});
