import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ozeonix } from "@/integrations/ozeonix";
import { trackConversion } from "@/lib/analytics.js";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Partner Login & Signup — Ozeonix Infinity Referral Program" },
      {
        name: "description",
        content:
          "Create your Ozeonix Infinity partner profile, refer clients and earn 10% commission on every project you bring in.",
      },
      { property: "og:title", content: "Partner Login & Signup — Ozeonix Infinity" },
      {
        property: "og:description",
        content:
          "Sign in to your partner dashboard, track referred clients and your 10% commission.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const BENEFITS = [
  "Earn 10% cash commission on every signed client project",
  "Real-time partner dashboard to monitor lead milestones",
  "Zero engineering burden — our technical team handles 100% of delivery",
  "Prompt payouts via direct bank wire, Wise, or digital wallets",
];

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
          setNotice(
            "Almost done — check your email and click the confirmation link to activate your partner profile.",
          );
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
    padding: "12px 16px",
    borderRadius: 10,
    border: "1px solid var(--oz-border, rgba(0,0,0,0.16))",
    background: "var(--oz-background, #fff)",
    color: "var(--oz-text, #111827)",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  };

  return (
    <section
      className="oz-section oz-app-page oz-auth-page"
      aria-label="Partner login and signup"
      style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}
    >
      <div className="oz-container" style={{ maxWidth: 1080 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 64px -16px rgba(15, 23, 42, 0.2)",
            border: "1px solid var(--oz-border, rgba(0,0,0,0.1))",
            background: "var(--oz-background, #fff)",
          }}
        >
          {/* Left Panel: Brand & Benefits */}
          <div
            style={{
              position: "relative",
              padding: "clamp(32px, 5vw, 48px)",
              background: "linear-gradient(135deg, #0b1526 0%, #152540 100%)",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.18,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 999,
                  background: "rgba(234, 88, 12, 0.2)",
                  border: "1px solid rgba(234, 88, 12, 0.4)",
                  color: "#fdba74",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 24,
                }}
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>Partner Portal</span>
              </div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  lineHeight: 1.25,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                Turn your connections into consistent income.
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
              >
                Connect businesses with our senior software team. Whenever a client signs, you earn
                an immediate 10% commission with zero development responsibility.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 16,
                }}
              >
                {BENEFITS.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      fontSize: "0.9375rem",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{
                        flexShrink: 0,
                        marginTop: 2,
                        color: "var(--brand-orange, #ea580c)",
                      }}
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                marginTop: 40,
                paddingTop: 24,
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <ShieldCheck size={20} style={{ color: "#fdba74", flexShrink: 0 }} aria-hidden="true" />
              <span style={{ fontSize: "0.875rem", color: "rgba(255, 255, 255, 0.75)" }}>
                Encrypted sessions & guaranteed referral attribution
              </span>
            </div>
          </div>

          {/* Right Panel: Auth Form */}
          <div
            style={{
              padding: "clamp(32px, 5vw, 48px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span className="oz-eyebrow">
              {mode === "signin" ? "Account Access" : "Quick Registration"}
            </span>
            <h1 style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", marginBottom: 8 }}>
              {mode === "signin" ? "Partner Login" : "Create Partner Profile"}
            </h1>
            <p className="oz-muted" style={{ marginBottom: 24, fontSize: "0.9375rem" }}>
              {mode === "signin"
                ? "Sign in to track your referred clients, deals, and commission payouts."
                : "Register in under 2 minutes and start sharing your unique referral link."}
            </p>

            <button
              type="button"
              className="oz-btn oz-btn--outline"
              style={{
                width: "100%",
                marginBottom: 20,
                justifyContent: "center",
                fontWeight: 600,
              }}
              onClick={google}
            >
              Continue with Google
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
                color: "var(--oz-muted, #64748b)",
                fontSize: "0.8125rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              <span style={{ flexGrow: 1, height: 1, background: "var(--oz-border, rgba(0,0,0,0.1))" }} />
              <span>Or with email</span>
              <span style={{ flexGrow: 1, height: 1, background: "var(--oz-border, rgba(0,0,0,0.1))" }} />
            </div>

            <form onSubmit={submit} className="oz-app-form">
              {mode === "signup" && (
                <>
                  <label style={{ display: "grid", gap: 6, fontWeight: 500, fontSize: "0.875rem" }}>
                    <span>Full name</span>
                    <input
                      style={inputStyle}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder="e.g. Maya Sharma"
                    />
                  </label>
                  <label style={{ display: "grid", gap: 6, fontWeight: 500, fontSize: "0.875rem" }}>
                    <span>Phone / WhatsApp</span>
                    <input
                      style={inputStyle}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+977-9800000000"
                    />
                  </label>
                </>
              )}
              <label style={{ display: "grid", gap: 6, fontWeight: 500, fontSize: "0.875rem" }}>
                <span>Work or Personal Email</span>
                <input
                  style={inputStyle}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="name@domain.com"
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontWeight: 500, fontSize: "0.875rem" }}>
                <span>Password</span>
                <input
                  style={inputStyle}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="Minimum 6 characters"
                />
              </label>

              {error && (
                <p
                  role="alert"
                  style={{
                    color: "var(--danger, #b91c1c)",
                    fontSize: 14,
                    margin: "4px 0 0",
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "rgba(185, 28, 28, 0.08)",
                  }}
                >
                  {error}
                </p>
              )}
              {notice && (
                <p
                  role="status"
                  style={{
                    color: "var(--success, #15803d)",
                    fontSize: 14,
                    margin: "4px 0 0",
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "rgba(21, 128, 61, 0.08)",
                  }}
                >
                  {notice}
                </p>
              )}

              <button
                className="oz-btn oz-btn--primary"
                type="submit"
                disabled={status === "busy"}
                style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              >
                {status === "busy" ? "Please wait…" : mode === "signin" ? "Sign In to Dashboard" : "Create Partner Account"}
              </button>
            </form>

            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid var(--oz-border, rgba(0,0,0,0.08))",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: "0.875rem",
              }}
            >
              <p style={{ margin: 0 }}>
                {mode === "signin" ? "New to the program? " : "Already have a profile? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError("");
                    setNotice("");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--oz-primary, #ea580c)",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: "2px 4px",
                  }}
                >
                  {mode === "signin" ? "Create an account" : "Sign in"}
                </button>
              </p>
              <p style={{ margin: 0 }}>
                <Link
                  to="/partner-program"
                  style={{
                    color: "var(--oz-muted, #64748b)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  How the 10% commission program works <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
