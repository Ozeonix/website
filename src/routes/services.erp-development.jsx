import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { Factory, Warehouse, TrendingUp, Users, CheckCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is the best ERP software for a growing business?",
    a: "The best ERP is built around your actual workflow. We connect inventory, accounting, purchasing, sales and HR with guided rollout and ongoing support.",
  },
  {
    q: "Can you build an ERP system for manufacturing or retail?",
    a: "Yes. We build ERP solutions for manufacturing, retail, wholesale and distribution, with modules for stock control, production planning, billing and reporting.",
  },
  {
    q: "How long does ERP development take?",
    a: "A focused ERP for a small or medium business typically takes 8–16 weeks from discovery to go-live, depending on modules, integrations and data migration needs.",
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
  name: "Custom ERP Development",
  provider: {
    "@type": "LocalBusiness",
    name: "Ozeonix Infinity",
    telephone: "+977-7483509984",
    url: "https://ozeonix.com",
    areaServed: "Worldwide",
  },
  serviceType: "ERP Software Development",
  description:
    "Custom ERP development for manufacturing, retail and growing businesses. Streamline inventory, accounting, HR and operations.",
};

export const Route = createFileRoute("/services/erp-development")({
  head: () => ({
    meta: [
      { title: "Custom ERP Development | Custom ERP Solutions | Ozeonix Infinity" },
      { name: "description", content: "Ozeonix Infinity builds custom ERP solutions for manufacturing, retail and growing businesses. Streamline operations with a free consultation." },
      { property: "og:title", content: "Custom ERP Development | Custom ERP Solutions | Ozeonix Infinity" },
      { property: "og:description", content: "Custom ERP development for manufacturing, retail and growing businesses. Streamline inventory, accounting and HR." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services/erp-development" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/services/erp-development" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: ErpDevelopment,
});

const MODULES = [
  { icon: Warehouse, title: "Inventory & Stock", desc: "Real-time stock levels, purchase orders, vendors and warehouse tracking." },
  { icon: Factory, title: "Production & Manufacturing", desc: "BOMs, work orders, raw-material planning and production schedules." },
  { icon: TrendingUp, title: "Sales & Billing", desc: "Quotations, invoices, payment tracking and GST/VAT-ready reports." },
  { icon: Users, title: "HR & Payroll", desc: "Attendance, leave, payroll and employee records in one place." },
];

function ErpDevelopment() {
  return (
    <>
      <section className="oz-open" aria-label="Modules">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">ERP Solutions</span>
                <h1>Custom ERP Development for Connected Operations</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We build tailored ERP solutions for manufacturing, retail and growing businesses—connecting inventory,
                  accounting, HR and operations in one dependable platform.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--accent">Get a free consultation</Link>
                  <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--outline">WhatsApp us</a>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section" aria-label="Modules">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Modules</span></Reveal>
            <Reveal index={1} as="h2">ERP modules built around your business.</Reveal>
          </div>
          <div className="oz-grid oz-grid-2">
            {MODULES.map((m, i) => {
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
            <Reveal index={1} as="h2">Why businesses choose Ozeonix Infinity.</Reveal>
          </div>
          <Reveal>
            <ul className="oz-checklist">
              <li>Structured rollout, training and ongoing support</li>
              <li>Custom-built around your workflow — not a forced generic template</li>
              <li>Clear support through direct communication and WhatsApp</li>
              <li>Integrations with local payment, SMS and WhatsApp gateways</li>
              <li>Scalable architecture that grows as your business expands</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="oz-section" aria-label="FAQ">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">FAQ</span></Reveal>
            <Reveal index={1} as="h2">Common ERP questions.</Reveal>
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

      <section className="oz-section oz-section--dark" aria-label="Ready to streamline your operations?">
        <div className="oz-container oz-center">
          <Reveal>
            <h2>Ready to streamline your operations?</h2>
            <p className="oz-muted">Tell us about your business and we’ll recommend the right ERP modules.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
              <Link to="/contact" className="oz-btn oz-btn--accent">Discuss your project</Link>
              <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--on-dark">WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
