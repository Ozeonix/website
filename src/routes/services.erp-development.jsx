import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  Factory,
  Warehouse,
  TrendingUp,
  Users,
  BarChart3,
  ClipboardList,
  ShieldCheck,
  Settings,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

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
  {
    q: "Can the ERP integrate with our existing tools?",
    a: "Yes — we integrate with payment gateways, accounting software, e-commerce platforms and third-party APIs. Migration from spreadsheets is also fully supported.",
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
    telephone: "+977-9769294624",
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
      { title: "Custom ERP Development | ERP Solutions | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Ozeonix Infinity builds custom ERP solutions for manufacturing, retail and growing businesses. Streamline operations with a free consultation.",
      },
      {
        property: "og:title",
        content: "Custom ERP Development | Ozeonix Infinity",
      },
      {
        property: "og:description",
        content:
          "Custom ERP development for manufacturing, retail and growing businesses. Streamline inventory, accounting and HR.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services/erp-development" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/services/erp-development" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: ErpDevelopment,
});

const MODULES = [
  {
    Icon: Warehouse,
    title: "Inventory & Stock",
    desc: "Real-time stock levels, purchase orders, vendors and warehouse tracking with low-stock alerts.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Inventory and warehouse management system",
  },
  {
    Icon: Factory,
    title: "Production & Manufacturing",
    desc: "BOMs, work orders, raw-material planning and production schedules for smooth factory operations.",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Production planning and manufacturing management",
  },
  {
    Icon: TrendingUp,
    title: "Sales & Billing",
    desc: "Quotations, invoices, payment tracking and GST/VAT-ready reports that satisfy any auditor.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Sales and billing management with invoices",
  },
  {
    Icon: Users,
    title: "HR & Payroll",
    desc: "Attendance, leave management, payroll calculation and employee records all in one place.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
    imgAlt: "HR and payroll management system",
  },
  {
    Icon: BarChart3,
    title: "Financial Reporting",
    desc: "Profit & loss, balance sheet, cash flow and custom reports that give management real insight.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Financial reporting and analytics dashboard",
  },
  {
    Icon: ClipboardList,
    title: "Purchase Management",
    desc: "Purchase requisitions, supplier comparison, approval workflows and payment scheduling.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Purchase and procurement management system",
  },
];

const WHY_US = [
  "Tailored to your industry, terminology and reporting needs",
  "Role-based access: owner, manager, staff, accountant",
  "Data migration from spreadsheets and legacy systems",
  "Mobile-ready web interface — no app installation needed",
  "Guided rollout with staff training and support",
  "Cloud-hosted with daily backups and 99.9% uptime",
];

function ErpDevelopment() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Custom ERP Development">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">ERP Development</span>
                <h1>Custom ERP Systems for Manufacturing, Retail & Growing Businesses</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We build enterprise resource planning systems that connect every part of your
                  business — inventory, production, sales, HR and finance — in one clean, manageable
                  platform.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Get a free consultation <ArrowRight size={16} aria-hidden="true" />
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
      <section className="oz-section oz-section--tight" aria-label="ERP overview">
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
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="Modern ERP system managing business operations and analytics"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="oz-section" aria-label="ERP modules">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">ERP Modules</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Every module your business needs, connected.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {MODULES.map(({ Icon, title, desc, img, imgAlt }, i) => (
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
      <section className="oz-section oz-section--muted" aria-label="Why choose our ERP">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                  alt="Business team using an ERP system to manage operations"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <span className="oz-eyebrow">Why Us</span>
                <h2>ERP that works for your team on day one.</h2>
                <p className="oz-muted">
                  We've seen what happens when businesses adopt ERPs that weren't built for them —
                  unused modules, workarounds and frustrated staff. We build the other kind.
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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="oz-section" aria-label="ERP frequently asked questions">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">FAQ</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Common ERP questions.
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
      <section className="oz-section oz-section--dark" aria-label="Get a custom ERP built for your business">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow" style={{ color: "var(--oz-primary)" }}>
              Ready to streamline?
            </span>
            <h2>Get a custom ERP built for your business.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              A free consultation is the first step. We'll listen to how your business runs, propose
              the right modules, and quote you honestly before anything is built.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Book a free consultation <ArrowRight size={16} aria-hidden="true" />
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
