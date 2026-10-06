import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { Users, Phone, BarChart3, ShieldCheck, CheckCircle } from "lucide-react";

const FAQS = [
  {
    q: "Can you build a custom CRM for a growing business?",
    a: "Yes. We build CRM platforms with lead capture, follow-up reminders, quotations, invoices and sales pipelines tailored to your process.",
  },
  {
    q: "What makes a CRM better than spreadsheets for sales teams?",
    a: "A CRM automates follow-ups, tracks every customer interaction and gives the whole team a shared view of the pipeline. That means fewer lost leads and faster closures.",
  },
  {
    q: "Can the CRM integrate with WhatsApp and SMS?",
    a: "Yes. We integrate with WhatsApp Business API, SMS gateways and email providers so your team can reach customers on the channels they already use.",
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
    telephone: "+977-7483509984",
    url: "https://ozeonix-infinity.ozeonix.app",
    areaServed: "Worldwide",
  },
  serviceType: "CRM Software Development",
  description:
    "Custom CRM development with lead management, sales pipelines, invoicing and WhatsApp integration for growing teams.",
};

export const Route = createFileRoute("/services/crm-solutions")({
  head: () => ({
    meta: [
      { title: "Custom CRM Solutions | Custom CRM Development | Ozeonix Infinity" },
      { name: "description", content: "Custom CRM software for lead management, sales pipelines, invoicing and team follow-ups. Request a free demo from Ozeonix Infinity." },
      { property: "og:title", content: "Custom CRM Solutions | Custom CRM Development | Ozeonix Infinity" },
      { property: "og:description", content: "Custom CRM software with lead management, sales pipelines and WhatsApp integration. Request a free demo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/services/crm-solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/services/crm-solutions" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: CrmSolutions,
});

const FEATURES = [
  { icon: Users, title: "Lead & Contact Management", desc: "Capture, assign and track leads from first call to final invoice." },
  { icon: Phone, title: "Follow-Up Automation", desc: "Scheduled reminders, WhatsApp messages and email sequences that keep deals moving." },
  { icon: BarChart3, title: "Sales Pipeline & Reports", desc: "Visual pipelines, revenue forecasts and team performance dashboards." },
  { icon: ShieldCheck, title: "Quotations & Invoicing", desc: "Create professional quotes and invoices, track payments and reduce manual work." },
];

function CrmSolutions() {
  return (
    <>
      <section className="oz-open" aria-label="Features">
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
                  We build tailored CRM platforms for sales teams, service businesses and distributors—so every lead,
                  customer conversation and next step stays visible.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--accent">Get a free demo</Link>
                  <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--outline">WhatsApp us</a>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section" aria-label="Features">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Features</span></Reveal>
            <Reveal index={1} as="h2">CRM features built for how you sell.</Reveal>
          </div>
          <div className="oz-grid oz-grid-2">
            {FEATURES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} index={i % 2}>
                  <article className="oz-card">
                    <span className="oz-card__icon" style={{ background: "var(--oz-primary)", color: "var(--oz-primary-foreground)" }}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--muted" aria-label="Why us">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Why us</span></Reveal>
            <Reveal index={1} as="h2">Why growing sales teams choose us.</Reveal>
          </div>
          <Reveal>
            <ul className="oz-checklist">
              <li>Built around your sales process, not a foreign template</li>
              <li>WhatsApp and SMS integration for customer follow-ups</li>
              <li>Mobile-friendly interface for field sales teams</li>
              <li>Guided rollout, team training and ongoing support</li>
              <li>Secure cloud hosting with reliable uptime</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="oz-section" aria-label="FAQ">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">FAQ</span></Reveal>
            <Reveal index={1} as="h2">Common CRM questions.</Reveal>
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

      <section className="oz-section oz-section--dark" aria-label="Stop losing leads. Start closing more deals.">
        <div className="oz-container oz-center">
          <Reveal>
            <h2>Stop losing leads. Start closing more deals.</h2>
            <p className="oz-muted">Get a custom CRM built around your sales process.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
              <Link to="/contact" className="oz-btn oz-btn--accent">Request a free demo</Link>
              <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--on-dark">WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
