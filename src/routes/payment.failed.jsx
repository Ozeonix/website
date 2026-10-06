import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payment/failed")({
  head: () => ({
    meta: [
      { title: "Payment Cancelled | Ozeonix Infinity" },
      { name: "description", content: "Your eSewa payment was cancelled or could not be completed. You can safely try again." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Payment Cancelled — Ozeonix Infinity" },
      { property: "og:description", content: "The eSewa payment was cancelled. Nothing has been charged." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaymentFailed,
});

function PaymentFailed() {
  return (
    <section className="oz-section" aria-label="Payment cancelled">
      <div className="oz-container" style={{ display: "grid", gap: 16, maxWidth: 640 }}>
        <span className="oz-eyebrow">eSewa</span>
        <h1 style={{ margin: 0 }}>Payment cancelled</h1>
        <p>
          The payment was cancelled or could not be completed, so nothing has been charged. You can try again, or reach
          out and we will send you a payment link directly.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/pay" className="oz-btn oz-btn--primary">Try again</Link>
          <Link to="/contact" className="oz-btn oz-btn--outline">Discuss your project</Link>
        </div>
      </div>
    </section>
  );
}
