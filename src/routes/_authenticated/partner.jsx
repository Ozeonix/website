import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth.jsx";
import { REQUIREMENTS } from "@/lib/constants.js";
import { submitPartnerLead } from "@/lib/referrals.functions";

export const Route = createFileRoute("/_authenticated/partner")({
  head: () => ({
    meta: [
      { title: "Partner Dashboard — Ozeonix Infinity" },
      { name: "description", content: "Track referred clients, referral link and 10% commission earnings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PartnerDashboard,
});

const STATUS_COLORS = {
  new: "#6B7280",
  approved: "#1D4ED8",
  won: "#15803D",
  lost: "#B45309",
  rejected: "#B91C1C",
};

function money(n) {
  return `\u20b9${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function PartnerDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [payouts, setPayouts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const sendLead = useServerFn(submitPartnerLead);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const [p, r, po] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase.from("referrals").select("*").order("created_at", { ascending: false }),
      supabase.from("payouts").select("*").order("created_at", { ascending: false }),
    ]);
    if (p.error) setError(p.error.message);
    if (r.error) setError(r.error.message);
    setProfile(p.data ?? null);
    setReferrals(r.data ?? []);
    setPayouts(po.data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const totals = useMemo(() => {
    const won = referrals.filter((x) => x.status === "won");
    const openStatuses = ["new", "approved"];
    const paidOut = payouts
      .filter((x) => x.status === "paid")
      .reduce((s, x) => s + Number(x.amount || 0), 0);
    const earned = won.reduce((s, x) => s + Number(x.commission_amount || 0), 0);
    return {
      count: referrals.length,
      won: won.length,
      earned,
      expected: referrals
        .filter((x) => openStatuses.includes(x.status))
        .reduce((s, x) => s + Number(x.commission_amount || 0), 0),
      paid: paidOut,
      outstanding: Math.max(0, earned - paidOut),
    };
  }, [referrals, payouts]);

  const referralLink = profile?.referral_code
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/?ref=${profile.referral_code}`
    : "";

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const addReferral = async (e) => {
    e.preventDefault();
    setError("");
    setSaved("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      client_name: String(fd.get("client_name") || "").trim(),
      client_email: String(fd.get("client_email") || "").trim(),
      client_phone: String(fd.get("client_phone") || "").trim(),
      client_company: String(fd.get("client_company") || "").trim(),
      requirements: String(fd.get("requirements") || ""),
      notes: String(fd.get("notes") || "").trim(),
    };
    if (!payload.client_name || !payload.client_email) {
      setError("Client name and email are required.");
      return;
    }
    setSubmitting(true);
    try {
      await sendLead({ data: payload });
      form.reset();
      setSaved("Lead submitted. You and our team have been notified by email.");
      load();
    } catch (err) {
      setError(err?.message || "Could not submit the lead. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSaved("");
    const fd = new FormData(e.currentTarget);
    const { error: err } = await supabase
      .from("profiles")
      .update({
        full_name: String(fd.get("full_name") || ""),
        phone: String(fd.get("phone") || "") || null,
        company: String(fd.get("company") || "") || null,
        city: String(fd.get("city") || "") || null,
        country: String(fd.get("country") || "") || null,
        payout_details: String(fd.get("payout_details") || "") || null,
      })
      .eq("id", user.id);
    if (err) { setError(err.message); return; }
    setSaved("Profile updated.");
    load();
  };

  const input = { width: "100%", minHeight: 48, padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", fontSize: 16 };
  const card = { border: "1px solid rgba(0,0,0,0.14)", borderRadius: 16, padding: 20, background: "#fff" };

  return (
    <section className="oz-section oz-app-page oz-dashboard" aria-label="Partner dashboard">
      <div className="oz-container oz-app-stack">
        <header className="oz-dashboard-header">
          <div>
            <span className="oz-eyebrow">Partner Program</span>
            <h1 style={{ margin: 0 }}>Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
          </div>
          <div className="oz-dashboard-actions">
            {isAdmin && <Link to="/admin" className="oz-btn oz-btn--outline">Admin panel</Link>}
            <button type="button" className="oz-btn oz-btn--outline" onClick={signOut}>Sign out</button>
          </div>
        </header>

        {error && <p role="alert" style={{ color: "var(--danger, #B91C1C)" }}>{error}</p>}
        {saved && <p role="status" style={{ color: "var(--success, #15803D)" }}>{saved}</p>}

        <div className="oz-grid oz-grid-4">
          {[
            ["Total referrals", totals.count],
            ["Projects won", totals.won],
            ["Commission earned", money(totals.earned)],
            ["Expected (in pipeline)", money(totals.expected)],
            ["Commission paid out", money(totals.paid)],
            ["Awaiting payout", money(totals.outstanding)],
          ].map(([label, value]) => (
            <div key={label} style={card}>
              <p className="oz-muted" style={{ margin: 0, fontSize: 13 }}>{label}</p>
              <p style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 800 }}>{value}</p>
            </div>
          ))}
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Your referral link</h2>
          <p className="oz-muted">Share this link. Anyone who submits our contact form through it is tagged to you automatically.</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <code style={{ padding: "10px 12px", background: "rgba(0,0,0,0.06)", borderRadius: 8, wordBreak: "break-all" }}>{referralLink || "—"}</code>
            {referralLink && (
              <button type="button" className="oz-btn oz-btn--accent" onClick={() => navigator.clipboard?.writeText(referralLink)}>
                Copy link
              </button>
            )}
          </div>
          <p style={{ marginTop: 10, fontSize: 14 }}>Referral code: <strong>{profile?.referral_code || "—"}</strong></p>
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Submit a lead manually</h2>
          <form onSubmit={addReferral} className="oz-auto-grid">
            <label style={{ display: "grid", gap: 6 }}><span>Client name *</span><input name="client_name" style={input} required /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Client email *</span><input name="client_email" type="email" style={input} required /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Client phone</span><input name="client_phone" style={input} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Company</span><input name="client_company" style={input} /></label>
            <label style={{ display: "grid", gap: 6 }}>
              <span>Requirement</span>
              <select name="requirements" style={input} defaultValue="">
                <option value="">Select…</option>
                {REQUIREMENTS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <label style={{ display: "grid", gap: 6, gridColumn: "1 / -1" }}><span>Notes</span><textarea name="notes" rows={3} style={{ ...input, minHeight: 90 }} /></label>
            <div style={{ gridColumn: "1 / -1" }}>
              <button className="oz-btn oz-btn--primary" type="submit" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit lead"}
              </button>
            </div>
          </form>
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Your referrals</h2>
          {loading ? (
            <p className="oz-muted">Loading…</p>
          ) : referrals.length === 0 ? (
            <p className="oz-muted">No referrals yet. Share your link or submit a lead above.</p>
          ) : (
            <div className="oz-table-scroll">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    {["Client", "Requirement", "Source", "Status", "Project value", "Your 10%", "Payout"].map((h) => (
                      <th key={h} style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.12)", fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r) => (
                    <tr key={r.id}>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <strong>{r.client_name}</strong><br /><span className="oz-muted" style={{ fontSize: 13 }}>{r.client_email}</span>
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>{r.requirements || "—"}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>{r.source}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <span style={{ color: STATUS_COLORS[r.status], fontWeight: 700, fontSize: 13, textTransform: "uppercase" }}>{r.status}</span>
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{money(r.project_value)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>{money(r.commission_amount)} <span className="oz-muted" style={{ fontSize: 12 }}>({r.commission_rate}%)</span></td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>{r.payout_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Payout history</h2>
          {payouts.length === 0 ? (
            <p className="oz-muted">No payouts recorded yet. Commission is released once a referred project is marked won.</p>
          ) : (
            <div className="oz-table-scroll">
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    {["Date", "Amount", "Method", "Reference", "Status"].map((h) => (
                      <th key={h} style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.12)", fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((p) => (
                    <tr key={p.id}>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>
                        {new Date(p.paid_at || p.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontWeight: 700 }}>{money(p.amount)}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>{p.method || "—"}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>{p.reference || "—"}</td>
                      <td style={{ padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 }}>
                        <span style={{ color: p.status === "paid" ? "#15803D" : "#B45309", fontWeight: 700, textTransform: "uppercase", fontSize: 13 }}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>


        <div style={card}>
          <h2 style={{ marginTop: 0 }}>Your profile & payout details</h2>
          <form onSubmit={saveProfile} className="oz-auto-grid">
            <label style={{ display: "grid", gap: 6 }}><span>Full name</span><input name="full_name" style={input} defaultValue={profile?.full_name || ""} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Phone / WhatsApp</span><input name="phone" style={input} defaultValue={profile?.phone || ""} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Company</span><input name="company" style={input} defaultValue={profile?.company || ""} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>City</span><input name="city" style={input} defaultValue={profile?.city || ""} /></label>
            <label style={{ display: "grid", gap: 6 }}><span>Country</span><input name="country" style={input} defaultValue={profile?.country || ""} /></label>
            <label style={{ display: "grid", gap: 6, gridColumn: "1 / -1" }}>
              <span>Payout details (bank / eSewa / Khalti)</span>
              <textarea name="payout_details" rows={3} style={{ ...input, minHeight: 90 }} defaultValue={profile?.payout_details || ""} />
            </label>
            <div style={{ gridColumn: "1 / -1" }}>
              <button className="oz-btn oz-btn--primary" type="submit">Save profile</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
