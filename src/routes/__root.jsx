import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { reportOzeonixError } from "../lib/ozeonix-error-reporting";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PageTranslator from "../components/PageTranslator.jsx";
import WhatsAppButton from "../components/WhatsAppButton.jsx";
import { LanguageProvider } from "../lib/i18n/LanguageContext";
import { applyRevealConfig } from "../lib/revealConfig";
import { captureReferralCode } from "../lib/referral.js";

function NotFoundComponent() {
  return (
    <>
      <Navbar />
      <section className="oz-section">
        <div className="oz-container oz-center">
          <span className="oz-eyebrow">404</span>
          <h1>We couldn’t find that page</h1>
          <p className="oz-muted">The link may be broken, or the page may have moved.</p>
          <a href="/" className="oz-btn oz-btn--primary" style={{ marginTop: 16 }}>Go home</a>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportOzeonixError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <Navbar />
      <section className="oz-section">
        <div className="oz-container oz-center">
          <span className="oz-eyebrow">Something went wrong</span>
          <h1>This page didn’t load</h1>
          <p className="oz-muted">You can try again, or head back to the homepage.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 16 }}>
            <button
              className="oz-btn oz-btn--primary"
              onClick={() => { router.invalidate(); reset(); }}
            >
              Try again
            </button>
            <a href="/" className="oz-btn oz-btn--outline">Go home</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

const GTM_ID = "GTM-PSSFZGTQ";
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ozeonix Infinity",
  url: "https://ozeonix.com",
  logo: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
  description:
    "Ozeonix Infinity builds custom CRM, ERP, LMS, websites and mobile apps for ambitious businesses and institutions.",
  slogan: "Shape The Thought. Power Tomorrow",
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    telephone: "+977-7483509984",
    availableLanguage: ["English", "Nepali", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/ozeonix-infinity",
    "https://www.instagram.com/ozeonix.infinity",
    "https://www.facebook.com/ozeonix.infinity",
  ],
};

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ozeonix Infinity | Custom CRM, ERP, LMS, Web & Mobile Development" },
      {
        name: "description",
        content:
          "Ozeonix Infinity designs and develops custom CRM, ERP, LMS, websites and mobile apps for businesses, schools and growing teams. Shape The Thought. Power Tomorrow.",
      },
      {
        name: "keywords",
        content:
          "custom software development, CRM development, ERP software, learning management systems, website development, mobile app development, Flutter development, e-commerce platforms, POS software, HRMS software, business automation, Ozeonix Infinity",
      },
      { name: "author", content: "Ozeonix Infinity" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "Ozeonix Infinity | Shape The Thought. Power Tomorrow" },
      { property: "og:description", content: "Custom CRM, ERP, LMS, website and mobile app development for businesses, schools and growing teams." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_NP" },
      { property: "og:site_name", content: "Ozeonix Infinity" },
      { property: "og:url", content: "https://ozeonix.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ozeonix Infinity | Shape The Thought. Power Tomorrow" },
      { name: "twitter:description", content: "Custom CRM, ERP, LMS, websites and mobile apps built around the way your team works." },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap",
      },
    ],
    scripts: [
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(ORGANIZATION_JSONLD),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => { applyRevealConfig(); captureReferralCode(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <a href="#main-content" className="oz-skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
        <PageTranslator />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

