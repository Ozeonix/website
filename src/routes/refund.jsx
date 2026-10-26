import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Ozeonix Infinity" },
      { name: "description", content: "Refund policy for Ozeonix Infinity services." },
      { property: "og:title", content: "Refund Policy — Ozeonix Infinity" },
      { property: "og:description", content: "Refund policy for Ozeonix Infinity services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/refund" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/refund" },
    ],
  }),
  component: Refund,
});

function Refund() {
  return (
    <>
      <header className="oz-legalhead">
        <div className="oz-container">
          <div className="oz-legalhead__row">
            <h1>Refund Policy</h1>
            <span className="oz-legalhead__meta">Legal · Last updated January 2026</span>
          </div>
        </div>
      </header>
      <section className="oz-section oz-section--tight" aria-label="Milestone-Based Payments">
        <div className="oz-container oz-prose" style={{ maxWidth: 820 }}>
          <p>We are committed to delivering high-quality work. Because our services are custom and delivered against defined milestones, the following applies.</p>
          <h2>Milestone-Based Payments</h2>
          <p>Refunds are considered for work not yet started. Once a milestone has been delivered or accepted, it is non-refundable.</p>
          <h2>Requesting a Refund</h2>
          <p>To request a refund, contact us within 7 days of the payment along with the reason. We will review and respond within a reasonable timeframe.</p>
          <h2>Non-Refundable Items</h2>
          <p>Third-party costs (hosting, domains, licenses, paid APIs, subscriptions) are non-refundable once purchased.</p>
        </div>
      </section>
    </>
  );
}
