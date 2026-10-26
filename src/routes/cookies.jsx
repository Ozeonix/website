import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Ozeonix Infinity" },
      { name: "description", content: "How Ozeonix Infinity uses cookies on this website." },
      { property: "og:title", content: "Cookie Policy — Ozeonix Infinity" },
      { property: "og:description", content: "How Ozeonix Infinity uses cookies on this website." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/cookies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/cookies" },
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <>
      <header className="oz-legalhead">
        <div className="oz-container">
          <div className="oz-legalhead__row">
            <h1>Cookie Policy</h1>
            <span className="oz-legalhead__meta">Legal · Last updated January 2026</span>
          </div>
        </div>
      </header>
      <section className="oz-section oz-section--tight" aria-label="Essential Cookies">
        <div className="oz-container oz-prose" style={{ maxWidth: 820 }}>
          <p>This site uses a minimal set of cookies to keep the website working correctly and to help us understand how it is used.</p>
          <h2>Essential Cookies</h2>
          <p>Required for basic site functionality such as navigation and secure areas.</p>
          <h2>Analytics Cookies</h2>
          <p>Help us understand usage patterns so we can improve the site. These are anonymized where possible.</p>
          <h2>Managing Cookies</h2>
          <p>You can control cookies via your browser settings. Disabling essential cookies may affect site functionality.</p>
        </div>
      </section>
    </>
  );
}
