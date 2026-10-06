import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createEsewaPayment, listServicePackages } from "@/lib/payments.functions";
import { getReferralCode } from "@/lib/referral";
import { trackConversion, trackEvent } from "@/lib/analytics.js";
import AccessibleTabs from "@/components/AccessibleTabs.jsx";

export const Route = createFileRoute("/pay")({
  head: () => ({
    meta: [
      { title: "Pay Online with eSewa | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Pay for website, CRM, ERP or LMS packages online with eSewa, or settle a custom project invoice securely in Rupees.",
      },
      { property: "og:title", content: "Pay Online with eSewa — Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Buy a website package or pay a project invoice securely with eSewa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/pay" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/pay" }],
  }),
  loader: () => listServicePackages(),
  component: PayPage,
  errorComponent: () => (
    <section className="oz-section">
      <div className="oz-container">
        <h1>Payments are unavailable right now</h1>
        <p className="oz-muted">Please try again in a moment or contact us on WhatsApp.</p>
      </div>
    </section>
  ),
  notFoundComponent: () => (
    <section className="oz-section">
      <div className="oz-container"><h1>Page not found</h1></div>
    </section>
  ),
});

function money(n) {
  return `Rs ${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function PayPage() {
  const packages = Route.useLoaderData() || [];
  const startPayment = useServerFn(createEsewaPayment);
  const [mode, setMode] = useState("package");
  const [slug, setSlug] = useState(packages[0]?.slug || "");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [referral, setReferral] = useState("");

  useEffect(() => { setReferral(getReferralCode()); }, []);

  const selected = useMemo(() => packages.find((p) => p.slug === slug), [packages, slug]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const res = await startPayment({
        data: {
          purpose: mode === "package" ? "package" : "invoice",
          package_slug: mode === "package" ? slug : "",
          amount: mode === "invoice" ? Number(amount || 0) : undefined,
          payer_name: String(fd.get("payer_name") || "").trim(),
          payer_email: String(fd.get("payer_email") || "").trim(),
          payer_phone: String(fd.get("payer_phone") || "").trim(),
          note: String(fd.get("note") || "").trim(),
          referral_code: referral || "",
        },
      });

      trackConversion("payment_start", {
        purpose: mode === "package" ? "package" : "invoice",
        package_slug: mode === "package" ? slug : null,
        provider: "esewa",
      });

      // Hand off to eSewa with the exact server-signed fields.
      const form = document.createElement("form");
      form.method = "POST";
      form.action = res.formAction;
      Object.entries(res.fields).forEach(([k, v]) => {
        const el = document.createElement("input");
        el.type = "hidden";
        el.name = k;
        el.value = v;
        form.appendChild(el);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err?.message || "Could not start the payment. Please try again.");
      setBusy(false);
    }
  };

  const input = { width: "100%", minHeight: 48, padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", fontSize: 16 };
  const card = { border: "1px solid rgba(0,0,0,0.16)", borderRadius: 16, padding: 20, background: "#fff" };

  return (
    <section className="oz-section oz-app-page oz-pay-page" aria-label="Online payment">
      <div className="oz-container oz-app-stack">
        <header>
          <span className="oz-eyebrow">Secure checkout</span>
          <h1 style={{ margin: "6px 0 8px" }}>Pay online with eSewa</h1>
          <p className="oz-muted" style={{ maxWidth: 640 }}>
            Choose a ready-made package or pay a custom project invoice. Payments are confirmed directly with eSewa
            before we mark your order as complete.
          </p>
        </header>

        <AccessibleTabs label="Payment type" value={mode} onChange={setMode} className="oz-segment-row">
          {[["package", "Service packages"], ["invoice", "Custom / invoice amount"]].map(([key, label]) => (
            <button
              key={key}
              type="button"
              value={key}
              className={`oz-btn ${mode === key ? "oz-btn--primary" : "oz-btn--outline"}`}
            >
              {label}
            </button>
          ))}
        </AccessibleTabs>

        {mode === "package" && (
          <div className="oz-grid oz-grid-3">
            {packages.map((p) => {
              const active = p.slug === slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => {
                    setSlug(p.slug);
                    trackEvent("package_select", { package_slug: p.slug, package_name: p.name, price: p.price });
                  }}
                  aria-pressed={active}
                  style={{
                    ...card,
                    textAlign: "left",
                    cursor: "pointer",
                    borderColor: active ? "var(--oz-accent)" : "rgba(0,0,0,0.16)",
                    borderWidth: active ? 2 : 1,
                  }}
                >
                  <h2 style={{ margin: 0, fontSize: 19 }}>{p.name}</h2>
                  <p style={{ margin: "8px 0", fontSize: 26, fontWeight: 800 }}>{money(p.price)}</p>
                  <p className="oz-muted" style={{ margin: 0, fontSize: 14 }}>{p.description}</p>
                  <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: 14 }}>
                    {(Array.isArray(p.features) ? p.features : []).map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </button>
              );
            })}
          </div>
        )}

        <form onSubmit={submit} className="oz-app-card oz-app-form" style={card}>
          <h2 style={{ margin: 0, fontSize: 19 }}>
            {mode === "package"
              ? `Paying for: ${selected?.name || "select a package"} ${selected ? `— ${money(selected.price)}` : ""}`
              : "Invoice payment"}
          </h2>

          {mode === "invoice" && (
            <label style={{ display: "grid", gap: 6 }}>
              <span>Amount in Rupees *</span>
              <input
                style={input}
                type="number"
                min="100"
                step="1"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 15000"
              />
            </label>
          )}

          <div className="oz-auto-grid">
            <label style={{ display: "grid", gap: 6 }}><span>Your name *</span><input name="payer_name" style={input} required /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Email *</span><input name="payer_email" type="email" style={input} required /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Phone / WhatsApp</span><input name="payer_phone" style={input} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Reference / note</span><input name="note" style={input} placeholder="Invoice number or project name" /></label>
          </div>

          {referral && (
            <p className="oz-muted" style={{ margin: 0, fontSize: 14 }}>Referral code applied: <strong>{referral}</strong></p>
          )}
          {error && <p role="alert" style={{ color: "#dc2626", margin: 0 }}>{error}</p>}

          <div className="oz-form-actions">
            <button type="submit" className="oz-btn oz-btn--primary" disabled={busy || (mode === "package" && !slug)}>
              {busy ? "Redirecting to eSewa…" : "Continue to eSewa"}
            </button>
            <Link to="/contact" className="oz-btn oz-btn--outline">Talk to us first</Link>
          </div>
          <p className="oz-muted" style={{ margin: 0, fontSize: 13 }}>
            You will be taken to eSewa to complete the payment. We never see or store your eSewa credentials.
          </p>
        </form>
      </div>
    </section>
  );
}
