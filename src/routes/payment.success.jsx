import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { verifyEsewaPayment } from "@/lib/payments.functions";

export const Route = createFileRoute("/payment/success")({
  head: () => ({
    meta: [
      { title: "Payment Confirmation | Ozeonix Infinity" },
      { name: "description", content: "Your eSewa payment result and reference number for Ozeonix Infinity services." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Payment Confirmation — Ozeonix Infinity" },
      { property: "og:description", content: "eSewa payment confirmation for Ozeonix Infinity services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PaymentSuccess,
});

function money(n) {
  return `Rs ${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function PaymentSuccess() {
  const verify = useServerFn(verifyEsewaPayment);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    verify({
      data: {
        data: params.get("data") || "",
        transaction_uuid: params.get("transaction_uuid") || "",
      },
    })
      .then(setResult)
      .catch((err) => setError(err?.message || "We could not confirm this payment."));
  }, [verify]);

  const heading = !result
    ? "Confirming your payment…"
    : result.state === "complete"
      ? "Payment received. Thank you!"
      : result.state === "pending"
        ? "Payment is still being confirmed"
        : "Payment not completed";

  return (
    <section className="oz-section" aria-label="Payment result">
      <div className="oz-container" style={{ display: "grid", gap: 16, maxWidth: 680 }}>
        <span className="oz-eyebrow">eSewa</span>
        <h1 style={{ margin: 0 }}>{heading}</h1>

        {error && <p role="alert" style={{ color: "#dc2626" }}>{error}</p>}

        {result?.state === "complete" && (
          <div style={{ border: "1px solid rgba(0,0,0,0.14)", borderRadius: 16, padding: 20, background: "#fff" }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>{money(result.amount)}</p>
            <p className="oz-muted" style={{ margin: "8px 0 0", fontSize: 14 }}>
              Reference: <strong>{result.transactionUuid}</strong>
              {result.refId ? <> · eSewa ref: <strong>{result.refId}</strong></> : null}
            </p>
            <p style={{ margin: "12px 0 0" }}>
              Our team will email you a receipt and next steps. Keep this reference for your records.
            </p>
          </div>
        )}

        {(result?.state === "pending" || result?.state === "failed" || result?.state === "unknown") && (
          <p>{result.message}{result.transactionUuid ? ` Reference: ${result.transactionUuid}.` : ""}</p>
        )}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link to="/" className="oz-btn oz-btn--primary">Back to home</Link>
          <Link to="/pay" className="oz-btn oz-btn--outline">Make another payment</Link>
          <Link to="/contact" className="oz-btn oz-btn--outline">Contact support</Link>
        </div>
      </div>
    </section>
  );
}
