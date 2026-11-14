import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Users,
  Briefcase,
  Building2,
  GraduationCap,
  Sparkles,
  Laptop,
} from "lucide-react";

export const Route = createFileRoute("/partner-program")({
  head: () => ({
    meta: [
      { title: "Referral Partner Program — Earn 10% Commission | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Join the Ozeonix Infinity partner program. Refer clients needing websites, apps, CRM, ERP or LMS and earn 10% commission on every verified project.",
      },
      { property: "og:title", content: "Referral Partner Program — Earn 10% | Ozeonix Infinity" },
      {
        property: "og:description",
        content:
          "Create a free partner profile, share your referral link and earn 10% commission on every project your client signs.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/partner-program" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/partner-program" }],
  }),
  component: PartnerProgram,
});

const STATS = [
  { n: "10%", l: "Commission per project" },
  { n: "$0", l: "Zero signup fee" },
  { n: "48h", l: "Prompt payout window" },
  { n: "100%", l: "Transparent tracking" },
];

const STEPS = [
  {
    s: "01",
    t: "Create partner profile",
    d: "Sign up free in under 2 minutes. Receive your unique referral tracking link and immediate access to your partner portal.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    alt: "Professional workspace with laptop for partner registration",
  },
  {
    s: "02",
    t: "Introduce or submit a lead",
    d: "Share your link with contacts or register your client lead directly into your dashboard so it is locked to your account.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    alt: "Business team discussing client project requirements",
  },
  {
    s: "03",
    t: "We quote, build and deliver",
    d: "Our senior technical team prepares the proposal, conducts technical discovery and executes the project end to end.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    alt: "Software development team engineering high performance applications",
  },
  {
    s: "04",
    t: "Get paid 10% cash commission",
    d: "Once client milestone payments are received, your 10% commission is confirmed and transferred straight to your account.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    alt: "Financial growth dashboard and transparent payout records",
  },
];

const COMMISSION_TIERS = [
  {
    type: "Modern Business Website",
    deal: "$1,200 – $2,500",
    payout: "$120 – $250",
    desc: "Responsive web presence, SEO foundation, and content management.",
  },
  {
    type: "Custom Mobile App / SaaS MVP",
    deal: "$3,500 – $7,000",
    payout: "$350 – $700",
    desc: "Cross-platform Flutter app or responsive web SaaS application.",
  },
  {
    type: "School or Institutional ERP",
    deal: "$6,000 – $12,000",
    payout: "$600 – $1,200",
    desc: "Complete campus management, fee automation, and student portal.",
  },
  {
    type: "Enterprise Custom Software",
    deal: "$12,000 – $25,000+",
    payout: "$1,200 – $2,500+",
    desc: "Tailored business software, API integrations, and cloud infrastructure.",
  },
];

const PARTNER_BENEFITS = [
  "No technical experience required — our team handles 100% of the architecture and development.",
  "Real-time partner dashboard to monitor lead status from submitted to signed and paid.",
  "Automated referral attribution: any contact form submitted via your link is permanently tagged to you.",
  "Co-selling collateral, product demo links, and proposal assistance to help close prospects.",
  "Reliable payouts via direct bank transfer, Wise, PayPal, or local digital wallets.",
  "Dedicated partner success manager reachable on WhatsApp and email for fast answers.",
];

const PERSONAS = [
  {
    t: "Freelancers & Designers",
    d: "Expand your offerings by referring backend, app, and enterprise development without hiring staff.",
    Icon: Laptop,
  },
  {
    t: "Digital & Ad Agencies",
    d: "Offer custom software, web platforms, and mobile apps to your existing marketing client base.",
    Icon: Building2,
  },
  {
    t: "Business Consultants",
    d: "Provide end-to-end digital transformation for clients needing modern ERP, CRM, and automation.",
    Icon: Briefcase,
  },
  {
    t: "Tech Leaders & Alumni",
    d: "Monetize your professional network by connecting startups and organizations with proven engineers.",
    Icon: GraduationCap,
  },
];

const FAQS = [
  {
    q: "How much commission do I earn per referral?",
    a: "You earn 10% of the confirmed project contract value by default. For enterprise deals or multi-phase enterprise partnerships, customized commission tiers can be arranged in advance.",
  },
  {
    q: "Who is eligible to join the partner program?",
    a: "Anyone can join — freelancers, agency founders, business consultants, marketing specialists, and professionals globally. There are zero upfront costs or registration fees.",
  },
  {
    q: "How do you track that a client originated from me?",
    a: "Every registered partner receives a unique referral code and URL. Leads who inquire through that URL are automatically associated with your partner ID in our system. You can also manually add prospective client details in your partner portal.",
  },
  {
    q: "When and how are commissions paid out?",
    a: "Commissions are approved once the client's invoice payment clears. We disburse funds within 48 business hours via direct bank wire, Wise, PayPal, or local settlement methods depending on your country.",
  },
  {
    q: "Do I have to handle technical calls or project scoping?",
    a: "Not at all. Once you introduce the client, our senior technical advisors lead the discovery sessions, architectural planning, and proposal presentations. You are welcome to participate or stay completely hands-off.",
  },
];

function PartnerProgram() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="oz-open"
        aria-label="Partner program: earn 10% commission for every client you refer"
      >
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Partner Program</span>
                <h1>Refer a client. Earn 10% commission on every signed project.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  Turn your professional network into recurring income. Introduce companies needing
                  world-class websites, mobile apps, CRM, ERP, or LMS platforms — and earn 10% of
                  every project contract value we close.
                </p>
                <div className="oz-open__meta">
                  {STATS.map((s) => (
                    <span key={s.l}>
                      <strong>{s.n}</strong> {s.l}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <Link to="/auth" className="oz-btn oz-btn--primary">
                    Become a partner <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="oz-btn oz-btn--outline">
                    Talk to our team
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* 4-Step Process with Realistic Images */}
      <section className="oz-section oz-section--tight" aria-label="How the program works">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">How It Works</span>
            </Reveal>
            <Reveal index={1} as="h2">
              A simple, four-step journey to your first payout.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.s} index={i % 4}>
                <article
                  className="oz-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                    padding: 0,
                  }}
                >
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden", position: "relative" }}>
                    <img
                      src={s.img}
                      alt={s.alt}
                      width={600}
                      height={375}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <span
                      className="oz-badge"
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backdropFilter: "blur(8px)",
                        background: "rgba(255, 255, 255, 0.92)",
                        fontWeight: 700,
                      }}
                    >
                      Step {s.s}
                    </span>
                  </div>
                  <div style={{ padding: "20px 20px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>{s.t}</h3>
                    <p className="oz-muted" style={{ margin: 0, fontSize: "0.9375rem" }}>
                      {s.d}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Earnings & Partner Benefits Split */}
      <section className="oz-section oz-section--muted" aria-label="Commission potential and benefits">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Earnings Potential</span>
                <h2>Real earnings on typical project values.</h2>
                <p className="oz-muted" style={{ marginBottom: 20 }}>
                  Here is what your 10% commission looks like across our most common client scopes:
                </p>
                <div style={{ display: "grid", gap: 12 }}>
                  {COMMISSION_TIERS.map((tier) => (
                    <div
                      key={tier.type}
                      className="oz-card"
                      style={{
                        padding: "16px 20px",
                        background: "var(--oz-background)",
                        borderLeft: "3px solid var(--oz-primary)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 4,
                        }}
                      >
                        <h4 style={{ margin: 0, fontSize: "1rem" }}>{tier.type}</h4>
                        <span
                          style={{
                            fontWeight: 700,
                            color: "var(--oz-primary)",
                            fontSize: "1.0625rem",
                          }}
                        >
                          You earn {tier.payout}
                        </span>
                      </div>
                      <p className="oz-muted" style={{ margin: 0, fontSize: "0.875rem" }}>
                        Typical project value: <strong>{tier.deal}</strong> — {tier.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div
                className="oz-card"
                style={{
                  padding: "32px 28px",
                  background: "var(--oz-background)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    color: "var(--oz-primary)",
                    fontWeight: 600,
                  }}
                >
                  <Sparkles size={20} aria-hidden="true" />
                  <span>Partner Advantages</span>
                </div>
                <h3 style={{ fontSize: "1.375rem", marginBottom: 16 }}>
                  Why professionals recommend Ozeonix Infinity.
                </h3>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "grid",
                    gap: 14,
                  }}
                >
                  {PARTNER_BENEFITS.map((b) => (
                    <li
                      key={b}
                      style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                    >
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: 3, color: "var(--oz-primary)" }}
                        aria-hidden="true"
                      />
                      <span style={{ fontSize: "0.9375rem" }}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--oz-border, rgba(0,0,0,0.08))" }}>
                  <Link
                    to="/auth"
                    className="oz-btn oz-btn--primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Start earning 10% now
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Personas / Who is this for */}
      <section className="oz-section" aria-label="Who can join our referral program">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Ideal Partners</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Built for professionals who work with expanding businesses.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {PERSONAS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <Reveal key={p.t} index={i % 4}>
                  <article className="oz-card" style={{ height: "100%" }}>
                    <span className="oz-card__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ fontSize: "1.125rem", margin: "14px 0 8px" }}>{p.t}</h3>
                    <p className="oz-muted" style={{ margin: 0, fontSize: "0.9375rem" }}>
                      {p.d}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="oz-section oz-section--tight" aria-label="Partner program FAQs">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Frequently Asked Questions</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Everything you need to know about partnering with us.
            </Reveal>
          </div>
          <div style={{ marginTop: 24, display: "grid", gap: 14, maxWidth: 840, marginInline: "auto" }}>
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="oz-card"
                style={{
                  padding: "20px 24px",
                  cursor: "pointer",
                  borderRadius: 14,
                }}
              >
                <summary style={{ fontWeight: 600, fontSize: "1.0625rem" }}>{f.q}</summary>
                <p className="oz-muted" style={{ marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="oz-section oz-section--dark" aria-label="Join partner program">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow" style={{ color: "var(--brand-orange-300, #fdba74)" }}>
              Join the Network
            </span>
          </Reveal>
          <Reveal index={1} as="h2">
            Ready to turn your client recommendations into income?
          </Reveal>
          <Reveal index={2}>
            <p className="oz-muted" style={{ maxWidth: 640, margin: "16px auto 32px" }}>
              Sign up in minutes, get your personal tracking link, and earn 10% on every client
              software project signed.
            </p>
          </Reveal>
          <Reveal index={3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/auth" className="oz-btn oz-btn--primary">
                Create your partner account <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="oz-btn oz-btn--on-dark">
                Have questions? Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
