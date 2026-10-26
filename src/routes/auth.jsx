import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ozeonix } from "@/integrations/ozeonix";
import { trackConversion } from "@/lib/analytics.js";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Partner Login & Signup — Ozeonix Infinity Referral Program" },
      { name: "description", content: "Create your Ozeonix Infinity partner profile, refer clients and earn 10% commission on every project you bring in." },
      { property: "og:title", content: "Partner Login & Signup — Ozeonix Infinity" },
      { property: "og:description", content: "Sign in to your partner dashboard, track referred clients and your 10% commission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/partner", replace: true });
    });
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");
    setStatus("busy");
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/partner`,
            data: { full_name: fullName.trim(), phone: phone.trim() },
          },
        });
        if (err) throw err;
        trackConversion("partner_signup", { method: "email" });
        if (!data.session) {
          setNotice("Almost done — check your email and click the confirmation link to activate your partner profile.");
          setStatus("idle");
          return;
        }
        navigate({ to: "/partner" });
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (err) throw err;
        navigate({ to: "/partner" });
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const google = async () => {
    setError("");
    const result = await ozeonix.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result?.error) {
      setError(result.error.message || "Google sign-in failed.");
      return;
    }
    if (result?.redirected) return;
    navigate({ to: "/partner" });
  };

  const inputStyle = {
    width: "100%",
    minHeight: 48,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.2)",
    fontSize: 16,
  };

  return (
    <section className="oz-section oz-app-page oz-auth-page" aria-label="Partner login and signup">
      <div className="oz-container oz-auth-shell">
        <span className="oz-eyebrow">Partner Program</span>
        <h1 style={{ marginBottom: 8 }}>{mode === "signin" ? "Partner login" : "Create your partner profile"}</h1>
        <p className="oz-muted" style={{ marginBottom: 20 }}>
          Refer a client to Ozeonix Infinity and earn <strong>10% commission</strong> on each project they sign.
        </p>

        <button type="button" className="oz-btn oz-btn--outline" style={{ width: "100%", marginBottom: 16 }} onClick={google}>
          Continue with Google
        </button>

        <form onSubmit={submit} className="oz-app-form">
          {mode === "signup" && (
            <>
              <label style={{ display: "grid", gap: 6 }}>
                <span>Full name</span>
                <input style={inputStyle} value={fullName} onChange={(e) => setFullName(e.target.value)} required minLength={2} autoComplete="name" />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span>Phone / WhatsApp</span>
                <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
              </label>
            </>
          )}
          <label style={{ display: "grid", gap: 6 }}>
            <span>Email</span>
            <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Password</span>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </label>

          {error && <p role="alert" style={{ color: "#dc2626", fontSize: 14, margin: 0 }}>{error}</p>}
          {notice && <p role="status" style={{ color: "#166534", fontSize: 14, margin: 0 }}>{notice}</p>}

          <button className="oz-btn oz-btn--primary" type="submit" disabled={status === "busy"} style={{ width: "100%" }}>
            {status === "busy" ? "Please wait…" : mode === "signin" ? "Sign in" : "Create profile"}
          </button>
        </form>

        <p style={{ marginTop: 16, fontSize: 14 }}>
          {mode === "signin" ? "New partner? " : "Already a partner? "}
          <button
            type="button"
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); setNotice(""); }}
            style={{ background: "none", border: "none", color: "var(--oz-primary)", fontWeight: 700, cursor: "pointer", padding: 4 }}
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
        <p style={{ marginTop: 8, fontSize: 14 }}>
          <Link to="/partner-program">How the 10% commission works →</Link>
        </p>
      </div>
    </section>
  );
}
