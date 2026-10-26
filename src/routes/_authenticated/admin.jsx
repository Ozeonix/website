import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth.jsx";
import { listContactLeads } from "@/lib/referrals.functions";
import AccessibleTabs from "@/components/AccessibleTabs.jsx";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Referral Management | Ozeonix Infinity" },
      { name: "description", content: "Approve leads, set project value and commission, and mark partner payouts as paid." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPanel,
});

const STATUSES = ["new", "approved", "won", "lost", "rejected"];
const SOURCES = ["link", "manual"];

function money(n) {
  return `\u20b9${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

function downloadCsv(filename, columns, rows) {
  const escapeCell = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [
    columns.map((c) => escapeCell(c.label)).join(","),
    ...rows.map((r) => columns.map((c) => escapeCell(c.value(r))).join(",")),
  ].join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function AdminPanel() {
  const { isAdmin, loading: authLoading, user } = useAuth();
  const [tab, setTab] = useState("referrals");
  const [rows, setRows] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [payouts, setPayouts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsError, setLeadsError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchLeads = useServerFn(listContactLeads);

  // Filters
  const [fStatus, setFStatus] = useState("all");
  const [fPayout, setFPayout] = useState("all");
  const [fSource, setFSource] = useState("all");
  const [fPartner, setFPartner] = useState("all");
  const [fFrom, setFFrom] = useState("");
  const [fTo, setFTo] = useState("");
  const [fSearch, setFSearch] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [r, p, po] = await Promise.all([
      supabase.from("referrals").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, full_name, email, referral_code, phone, payout_details"),
      supabase.from("payouts").select("*").order("created_at", { ascending: false }),
    ]);
    if (r.error) setError(r.error.message);
    setRows(r.data ?? []);
    setProfiles(Object.fromEntries((p.data ?? []).map((x) => [x.id, x])));
    setPayouts(po.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (user) load(); }, [user, load]);

  useEffect(() => {
    if (!user || !isAdmin || tab !== "leads" || leads.length) return;
    fetchLeads({ data: {} })
      .then((d) => setLeads(d ?? []))
      .catch((e) => setLeadsError(e?.message || "Could not load contact leads."));
  }, [user, isAdmin, tab, leads.length, fetchLeads]);

  const patch = async (id, values) => {
    setError("");
    const { error: err } = await supabase.from("referrals").update(values).eq("id", id);
    if (err) { setError(err.message); return; }
    load();
  };

  const partnerLabel = useCallback(
    (id) => {
      const p = profiles[id];
      return p?.full_name || p?.email || id;
    },
    [profiles],
  );

  const filtered = useMemo(() => {
    const q = fSearch.trim().toLowerCase();
    return rows.filter((r) => {
      if (fStatus !== "all" && r.status !== fStatus) return false;
      if (fPayout !== "all" && r.payout_status !== fPayout) return false;
      if (fSource !== "all" && r.source !== fSource) return false;
      if (fPartner !== "all" && r.partner_id !== fPartner) return false;
      if (fFrom && new Date(r.created_at) < new Date(`${fFrom}T00:00:00`)) return false;
      if (fTo && new Date(r.created_at) > new Date(`${fTo}T23:59:59`)) return false;
      if (q) {
        const hay = [r.client_name, r.client_email, r.client_company, r.requirements, partnerLabel(r.partner_id), profiles[r.partner_id]?.referral_code]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, fStatus, fPayout, fSource, fPartner, fFrom, fTo, fSearch, partnerLabel, profiles]);

  const filteredTotals = useMemo(() => ({
    count: filtered.length,
    projectValue: filtered.reduce((s, r) => s + Number(r.project_value || 0), 0),
    commission: filtered.reduce((s, r) => s + Number(r.commission_amount || 0), 0),
    unpaid: filtered
      .filter((r) => r.payout_status !== "paid")
      .reduce((s, r) => s + Number(r.commission_amount || 0), 0),
  }), [filtered]);

  const exportReferrals = () => {
    downloadCsv(
      `referrals-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        { label: "Date", value: (r) => new Date(r.created_at).toISOString().slice(0, 10) },
        { label: "Client", value: (r) => r.client_name },
        { label: "Email", value: (r) => r.client_email },
        { label: "Phone", value: (r) => r.client_phone || "" },
        { label: "Company", value: (r) => r.client_company || "" },
        { label: "Requirement", value: (r) => r.requirements || "" },
        { label: "Referral source", value: (r) => r.source },
        { label: "Partner", value: (r) => partnerLabel(r.partner_id) },
        { label: "Partner email", value: (r) => profiles[r.partner_id]?.email || "" },
        { label: "Referral code", value: (r) => profiles[r.partner_id]?.referral_code || "" },
        { label: "Status", value: (r) => r.status },
        { label: "Project value (INR)", value: (r) => Number(r.project_value || 0).toFixed(2) },
        { label: "Commission %", value: (r) => Number(r.commission_rate || 0).toFixed(2) },
        { label: "Commission amount (INR)", value: (r) => Number(r.commission_amount || 0).toFixed(2) },
        { label: "Payout status", value: (r) => r.payout_status },
        { label: "Paid at", value: (r) => (r.paid_at ? new Date(r.paid_at).toISOString().slice(0, 10) : "") },
        { label: "Admin notes", value: (r) => r.admin_notes || "" },
      ],
      filtered,
    );
  };

  const exportLeads = () => {
    downloadCsv(
      `contact-leads-${new Date().toISOString().slice(0, 10)}.csv`,
      [
        { label: "Date", value: (r) => new Date(r.created_at).toISOString().slice(0, 10) },
        { label: "Name", value: (r) => r.name },
        { label: "Email", value: (r) => r.email },
        { label: "Phone", value: (r) => r.phone || "" },
        { label: "Company", value: (r) => r.company || "" },
        { label: "Country", value: (r) => r.country || "" },
        { label: "City", value: (r) => r.city || "" },
        { label: "Requirements", value: (r) => r.requirements || "" },
        { label: "Start time", value: (r) => r.start_time || "" },
        { label: "Budget", value: (r) => r.budget || "" },
        { label: "Referral code", value: (r) => r.referral_code || "" },
        { label: "Referral source", value: (r) => (r.referral_code ? "partner link" : "direct") },
        { label: "Message", value: (r) => r.message || "" },
      ],
      leads,
    );
  };

  const addPayout = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const status = String(fd.get("status") || "pending");
    const payload = {
      partner_id: String(fd.get("partner_id") || ""),
      referral_id: String(fd.get("referral_id") || "") || null,
      amount: Number(fd.get("amount") || 0),
      method: String(fd.get("method") || "") || null,
      reference: String(fd.get("reference") || "") || null,
      note: String(fd.get("note") || "") || null,
      status,
      paid_at: status === "paid" ? new Date().toISOString() : null,
      created_by: user?.id ?? null,
    };
    if (!payload.partner_id || !payload.amount) {
      setError("Choose a partner and enter a payout amount.");
      return;
    }
    const { error: err } = await supabase.from("payouts").insert(payload);
    if (err) { setError(err.message); return; }
    if (payload.referral_id && status === "paid") {
      await supabase
        .from("referrals")
        .update({ payout_status: "paid", paid_at: payload.paid_at })
        .eq("id", payload.referral_id);
    }
    form.reset();
    load();
  };

  const setPayoutStatus = async (id, status, referralId) => {
    setError("");
    const paidAt = status === "paid" ? new Date().toISOString() : null;
    const { error: err } = await supabase.from("payouts").update({ status, paid_at: paidAt }).eq("id", id);
    if (err) { setError(err.message); return; }
    if (referralId) {
      await supabase.from("referrals").update({ payout_status: status, paid_at: paidAt }).eq("id", referralId);
    }
    load();
  };

  const payoutsByPartner = useMemo(() => {
    const map = new Map();
    for (const p of payouts) {
      if (!map.has(p.partner_id)) map.set(p.partner_id, []);
      map.get(p.partner_id).push(p);
    }
    return [...map.entries()];
  }, [payouts]);

  if (authLoading) return <section className="oz-section"><div className="oz-container"><p>Loading…</p></div></section>;

  if (!isAdmin) {
    return (
      <section className="oz-section">
        <div className="oz-container">
          <h1>Admin access required</h1>
          <p className="oz-muted">This area is limited to Ozeonix Infinity administrators.</p>
          <Link to="/partner" className="oz-btn oz-btn--primary">Back to partner dashboard</Link>
        </div>
      </section>
    );
  }

  const input = { minHeight: 44, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.2)", fontSize: 15, width: "100%" };
  const card = { border: "1px solid rgba(0,0,0,0.14)", borderRadius: 16, padding: 18, background: "#fff" };
  const th = { padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.12)", fontSize: 13, textAlign: "left" };
  const td = { padding: "10px 8px", borderBottom: "1px solid rgba(0,0,0,0.06)", fontSize: 14 };

  const tabs = [
    ["referrals", "Referrals"],
    ["leads", "Contact leads"],
    ["payouts", "Payouts"],
  ];

  return (
    <section className="oz-section oz-app-page oz-dashboard oz-admin-page" aria-label="Referral admin panel">
      <div className="oz-container oz-app-stack">
        <header>
          <span className="oz-eyebrow">Admin</span>
          <h1 style={{ margin: 0 }}>Referral, lead & payout management</h1>
        </header>

        <AccessibleTabs label="Admin sections" value={tab} onChange={setTab} className="oz-segment-row">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              value={key}
              className={`oz-btn ${tab === key ? "oz-btn--primary" : "oz-btn--outline"}`}
            >
              {label}
            </button>
          ))}
        </AccessibleTabs>

        {error && <p role="alert" style={{ color: "#dc2626" }}>{error}</p>}

        {tab === "referrals" && (
          <>
            <div style={{ ...card, display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Filters</h2>
              <div className="oz-admin-filter-grid">
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Status</span>
                  <select style={input} value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
                    <option value="all">All statuses</option>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Payout</span>
                  <select style={input} value={fPayout} onChange={(e) => setFPayout(e.target.value)}>
                    <option value="all">All payouts</option>
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Referral source</span>
                  <select style={input} value={fSource} onChange={(e) => setFSource(e.target.value)}>
                    <option value="all">All sources</option>
                    {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Partner</span>
                  <select style={input} value={fPartner} onChange={(e) => setFPartner(e.target.value)}>
                    <option value="all">All partners</option>
                    {Object.values(profiles).map((p) => (
                      <option key={p.id} value={p.id}>{p.full_name || p.email} {p.referral_code ? `(${p.referral_code})` : ""}</option>
                    ))}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>From</span>
                  <input style={input} type="date" value={fFrom} onChange={(e) => setFFrom(e.target.value)} />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>To</span>
                  <input style={input} type="date" value={fTo} onChange={(e) => setFTo(e.target.value)} />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, gridColumn: "span 2" }}>
                  <span>Search client, company or partner</span>
                  <input style={input} type="search" value={fSearch} onChange={(e) => setFSearch(e.target.value)} placeholder="e.g. Butwal Traders" />
                </label>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <button type="button" className="oz-btn oz-btn--accent" onClick={exportReferrals} disabled={filtered.length === 0}>
                  Export CSV ({filtered.length})
                </button>
                <button
                  type="button"
                  className="oz-btn oz-btn--outline"
                  onClick={() => { setFStatus("all"); setFPayout("all"); setFSource("all"); setFPartner("all"); setFFrom(""); setFTo(""); setFSearch(""); }}
                >
                  Reset filters
                </button>
                <span className="oz-muted" style={{ fontSize: 14 }}>
                  Project value {money(filteredTotals.projectValue)} · Commission {money(filteredTotals.commission)} · Unpaid {money(filteredTotals.unpaid)}
                </span>
              </div>
            </div>

            {loading ? <p className="oz-muted">Loading…</p> : filtered.length === 0 ? <p className="oz-muted">No referrals match these filters.</p> : (
              <div style={{ display: "grid", gap: 16 }}>
                {filtered.map((r) => {
                  const partner = profiles[r.partner_id];
                  return (
                    <article key={r.id} style={{ ...card, display: "grid", gap: 12 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
                        <div>
                          <h2 style={{ margin: 0, fontSize: 20 }}>{r.client_name}</h2>
                          <p className="oz-muted" style={{ margin: "4px 0 0", fontSize: 14 }}>
                            {r.client_email}{r.client_phone ? ` · ${r.client_phone}` : ""}{r.client_company ? ` · ${r.client_company}` : ""}
                          </p>
                          <p className="oz-muted" style={{ margin: "4px 0 0", fontSize: 14 }}>
                            Partner: <strong>{partner?.full_name || partner?.email || r.partner_id}</strong>
                            {partner?.referral_code ? ` (${partner.referral_code})` : ""} · Source: {r.source}
                          </p>
                          {r.requirements && <p style={{ margin: "6px 0 0", fontSize: 14 }}>Requirement: {r.requirements}</p>}
                          {r.notes && <p className="oz-muted" style={{ margin: "4px 0 0", fontSize: 14 }}>Notes: {r.notes}</p>}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ margin: 0, fontSize: 13 }} className="oz-muted">Commission</p>
                          <p style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{money(r.commission_amount)}</p>
                        </div>
                      </div>

                      <div className="oz-admin-control-grid">
                        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                          <span>Status</span>
                          <select style={input} value={r.status} onChange={(e) => patch(r.id, { status: e.target.value })}>
                            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </label>
                        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                          <span>Project value (₹)</span>
                          <input style={input} type="number" min="0" step="1" defaultValue={r.project_value}
                            onBlur={(e) => { const v = Number(e.target.value || 0); if (v !== Number(r.project_value)) patch(r.id, { project_value: v }); }} />
                        </label>
                        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                          <span>Commission %</span>
                          <input style={input} type="number" min="0" max="100" step="0.5" defaultValue={r.commission_rate}
                            onBlur={(e) => { const v = Number(e.target.value || 0); if (v !== Number(r.commission_rate)) patch(r.id, { commission_rate: v }); }} />
                        </label>
                        <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                          <span>Payout</span>
                          <select style={input} value={r.payout_status}
                            onChange={(e) => patch(r.id, { payout_status: e.target.value, paid_at: e.target.value === "paid" ? new Date().toISOString() : null })}>
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                          </select>
                        </label>
                      </div>

                      <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                        <span>Admin notes</span>
                        <textarea style={{ ...input, minHeight: 70 }} rows={2} defaultValue={r.admin_notes || ""}
                          onBlur={(e) => { if (e.target.value !== (r.admin_notes || "")) patch(r.id, { admin_notes: e.target.value }); }} />
                      </label>
                      {partner?.payout_details && (
                        <p className="oz-muted" style={{ margin: 0, fontSize: 13 }}>Partner payout details: {partner.payout_details}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

        {tab === "leads" && (
          <div style={{ ...card, display: "grid", gap: 14 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Contact form leads ({leads.length})</h2>
              <button type="button" className="oz-btn oz-btn--accent" onClick={exportLeads} disabled={leads.length === 0}>
                Export CSV
              </button>
            </div>
            {leadsError && <p role="alert" style={{ color: "#dc2626" }}>{leadsError}</p>}
            {leads.length === 0 && !leadsError ? <p className="oz-muted">Loading contact leads…</p> : (
              <div className="oz-table-scroll">
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
                  <thead>
                    <tr>{["Date", "Name", "Contact", "Location", "Requirement", "Budget", "Start", "Referral"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id}>
                        <td style={td}>{new Date(l.created_at).toLocaleDateString("en-IN")}</td>
                        <td style={td}><strong>{l.name}</strong>{l.company ? <><br /><span className="oz-muted" style={{ fontSize: 13 }}>{l.company}</span></> : null}</td>
                        <td style={td}>{l.email}{l.phone ? <><br />{l.phone}</> : null}</td>
                        <td style={td}>{[l.city, l.country].filter(Boolean).join(", ") || "—"}</td>
                        <td style={td}>{l.requirements || "—"}</td>
                        <td style={td}>{l.budget || "—"}</td>
                        <td style={td}>{l.start_time || "—"}</td>
                        <td style={td}>{l.referral_code ? `${l.referral_code} (partner link)` : "direct"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "payouts" && (
          <>
            <div style={{ ...card, display: "grid", gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Record a payout</h2>
              <form onSubmit={addPayout} className="oz-admin-payout-grid">
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Partner *</span>
                  <select name="partner_id" style={input} defaultValue="" required>
                    <option value="">Select partner…</option>
                    {Object.values(profiles).map((p) => (
                      <option key={p.id} value={p.id}>{p.full_name || p.email}</option>
                    ))}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Against referral (optional)</span>
                  <select name="referral_id" style={input} defaultValue="">
                    <option value="">Not linked</option>
                    {rows.map((r) => (
                      <option key={r.id} value={r.id}>{r.client_name} — {money(r.commission_amount)}</option>
                    ))}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Amount (₹) *</span>
                  <input name="amount" type="number" min="1" step="0.01" style={input} required />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Method</span>
                  <input name="method" style={input} placeholder="eSewa / bank transfer" />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Reference</span>
                  <input name="reference" style={input} placeholder="Transaction ID" />
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13 }}>
                  <span>Status</span>
                  <select name="status" style={input} defaultValue="pending">
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, gridColumn: "1 / -1" }}>
                  <span>Note</span>
                  <input name="note" style={input} />
                </label>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" className="oz-btn oz-btn--primary">Save payout</button>
                </div>
              </form>
            </div>

            {payoutsByPartner.length === 0 ? <p className="oz-muted">No payouts recorded yet.</p> : payoutsByPartner.map(([partnerId, list]) => {
              const paid = list.filter((x) => x.status === "paid").reduce((s, x) => s + Number(x.amount || 0), 0);
              const pending = list.filter((x) => x.status !== "paid").reduce((s, x) => s + Number(x.amount || 0), 0);
              return (
                <div key={partnerId} style={{ ...card, display: "grid", gap: 12 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0, fontSize: 17 }}>{partnerLabel(partnerId)}</h3>
                    <span className="oz-muted" style={{ fontSize: 14 }}>Paid {money(paid)} · Pending {money(pending)}</span>
                  </div>
                  <div className="oz-table-scroll">
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
                      <thead>
                        <tr>{["Date", "Amount", "Method", "Reference", "Status", "Action"].map((h) => <th key={h} style={th}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {list.map((p) => (
                          <tr key={p.id}>
                            <td style={td}>{new Date(p.paid_at || p.created_at).toLocaleDateString("en-IN")}</td>
                            <td style={{ ...td, fontWeight: 700 }}>{money(p.amount)}</td>
                            <td style={td}>{p.method || "—"}</td>
                            <td style={td}>{p.reference || "—"}</td>
                            <td style={td}>
                              <span style={{ color: p.status === "paid" ? "#16a34a" : "#b45309", fontWeight: 700, textTransform: "uppercase", fontSize: 13 }}>{p.status}</span>
                            </td>
                            <td style={td}>
                              <button
                                type="button"
                                className="oz-btn oz-btn--outline"
                                onClick={() => setPayoutStatus(p.id, p.status === "paid" ? "pending" : "paid", p.referral_id)}
                              >
                                Mark {p.status === "paid" ? "pending" : "paid"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
