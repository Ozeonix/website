import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  Users,
  Phone,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  FileText,
  Globe,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const FAQS = [
  {
    q: "Can you build a custom CRM for a growing business?",
    a: "Yes. We build CRM platforms with lead capture, follow-up reminders, quotations, invoices and sales pipelines tailored to your process.",
  },
  {
    q: "What makes a CRM better than spreadsheets for sales teams?",
    a: "A CRM automates follow-ups, tracks every customer interaction and gives the whole team a shared view of the pipeline. Fewer lost leads, faster closures.",
  },
  {
    q: "Can the CRM integrate with WhatsApp and SMS?",
    a: "Yes. We integrate with WhatsApp Business API, SMS gateways and email providers so your team can reach customers on the channels they already use.",
  },
  {
    q: "Is the CRM accessible on mobile?",
    a: "Yes — our CRM has a fully responsive web interface and optional Flutter mobile app so field sales teams stay connected on Android and iOS.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom CRM Solutions",
  provider: {
    "@type": "LocalBusiness",
    name: "Ozeonix Infinity",
    telephone: "+977-9769294624",
    url: "https://ozeonix.com",
    areaServed: "Worldwide",
  },
  serviceType: "CRM Software Development",
  description:
    "Custom CRM development with lead management, sales pipelines, invoicing and WhatsApp integration for growing teams.",
};

export const Route = createFileRoute("/services/crm-solutions")({
  head: () => ({
    meta: [
      { title: "Custom CRM Development | CRM Solutions | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Custom CRM software for lead management, sales pipelines, invoicing and team follow-ups. Request a free demo from Ozeonix Infinity.",
      },
      {
        property: "og:title",
        content: "Custom CRM Solutions | Ozeonix Infinity",
      },
      {
        property: "og:description",
        content:
          "Custom CRM software with lead management, sales pipelines and WhatsApp integration. Request a free demo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services/crm-solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/services/crm-solutions" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: CrmSolutions,
});

const FEATURES = [
  {
    Icon: Users,
    title: "Lead & Contact Management",
    desc: "Capture, assign and track leads from first call to final invoice. Never lose track of a prospect again.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Lead and contact management interface",
  },
  {
    Icon: Phone,
    title: "Follow-Up Automation",
    desc: "Scheduled reminders, WhatsApp messages and email sequences that keep deals moving without manual effort.",
    img: "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Automated follow-up and communication tools",
  },
  {
    Icon: BarChart3,
    title: "Sales Pipeline & Reports",
    desc: "Visual pipelines, revenue forecasts and team performance dashboards so management always has the full picture.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Sales pipeline analytics and reporting dashboard",
  },
  {
    Icon: ShieldCheck,
    title: "Quotations & Invoicing",
    desc: "Create professional quotes and invoices, track payment status and reduce manual back-and-forth with clients.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Quotation and invoice generation system",
  },
  {
    Icon: MessageSquare,
    title: "WhatsApp & SMS Integration",
    desc: "Reach customers on WhatsApp and SMS directly from the CRM. All conversations logged automatically.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    imgAlt: "WhatsApp and SMS integration for sales teams",
  },
  {
    Icon: FileText,
    title: "Document Management",
    desc: "Store contracts, proposals and client documents centrally — always findable, always version-controlled.",
    img: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Document management and storage system",
  },
];

const WHY_US = [
  "Built around your sales process, not a foreign template",
  "WhatsApp and SMS integration for customer follow-ups",
  "Mobile-friendly interface for field sales teams",
  "Role-based access: manager, executive, admin views",
  "Guided rollout, team training and ongoing support",
  "Secure cloud hosting with 99.9% uptime guarantee",
];

function CrmSolutions() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Custom CRM Solutions">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">CRM Solutions</span>
                <h1>Custom CRM Development for Growing Sales Teams</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We build tailored CRM platforms for sales teams, service businesses and
                  distributors — so every lead, customer conversation and next step stays visible
                  and nothing slips through the cracks.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Get a free demo <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a href="https://wa.me/9779769294624" className="oz-btn oz-btn--outline">
                    WhatsApp us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Hero Image */}
      <section className="oz-section oz-section--tight" aria-label="CRM overview">
        <div className="oz-container">
          <Reveal>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "21/8",
                boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
                alt="CRM dashboard with sales pipeline and customer management"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="oz-section" aria-label="CRM features">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Features</span>
            </Reveal>
            <Reveal index={1} as="h2">
              CRM features built for how you sell.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {FEATURES.map(({ Icon, title, desc, img, imgAlt }, i) => (
              <Reveal key={title} index={i % 3}>
                <article
                  className="oz-card"
                  style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                    <img
                      src={img}
                      alt={imgAlt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ padding: "clamp(1rem, 2vw, 1.25rem)", flex: 1 }}>
                    <span
                      className="oz-card__icon"
                      style={{ marginBottom: 10, background: "var(--oz-primary)", color: "#fff" }}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ marginTop: 0 }}>{title}</h3>
                    <p style={{ margin: 0 }}>{desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="oz-section oz-section--muted" aria-label="Why choose our CRM">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Why Us</span>
                <h2>Why growing sales teams choose us.</h2>
                <p className="oz-muted">
                  We don't sell you a generic platform. We understand your sales process first, then
                  build a CRM that fits it — not the other way around.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 12 }}>
                  {WHY_US.map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-primary)" }}
                        aria-hidden="true"
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
                  alt="Sales team collaborating with a CRM system"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="oz-section" aria-label="CRM frequently asked questions">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">FAQ</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Common CRM questions.
            </Reveal>
          </div>
          <div className="oz-faq">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i % 2}>
                <details>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Stop losing leads">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Close more deals
            </span>
            <h2>Stop losing leads. Start closing more deals.</h2>
            <p className="oz-muted" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              Get a custom CRM built around your actual sales process — not a template you have to
              bend yourself into.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Request a free demo <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="https://wa.me/9779769294624" className="oz-btn oz-btn--on-dark">
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
