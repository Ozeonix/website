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
  Boxes,
  Truck,
  Store,
  Stethoscope,
  Layers,
  Clock,
  Database,
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
    a: "Yes - we integrate with payment gateways, accounting software, e-commerce platforms and third-party APIs. Migration from spreadsheets is also fully supported.",
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
    desc: "Real-time stock levels, multi-warehouse tracking, low-stock triggers, and automated reorder purchase requests.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Organized warehouse with digital inventory management racks",
  },
  {
    Icon: Factory,
    title: "Production & Manufacturing",
    desc: "Multi-level BOMs, work orders, shop-floor capacity planning, and raw material allocation schedules.",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Modern precision manufacturing assembly line and industrial equipment",
  },
  {
    Icon: TrendingUp,
    title: "Sales & Billing",
    desc: "Quotations, tax invoices, customer ledgers, credit terms, and GST/VAT compliant reporting ready for audits.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Financial documents, invoices, and accounting calculation sheets",
  },
  {
    Icon: Users,
    title: "HR & Payroll",
    desc: "Biometric attendance integration, leave management, overtime calculations, payroll slips, and employee records.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Corporate business team conducting HR onboarding and payroll review",
  },
  {
    Icon: BarChart3,
    title: "Financial Analytics & BI",
    desc: "Interactive P&L statements, balance sheets, departmental cost centers, and automated cash-flow projections.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Real-time business intelligence and financial reporting charts on monitor",
  },
  {
    Icon: ClipboardList,
    title: "Procurement & Vendors",
    desc: "Purchase requisitions, vendor quotation comparisons, multi-tier approval flows, and scheduled supplier payments.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Procurement manager reviewing supply chain manifests and freight shipments",
  },
];

const INDUSTRY_SOLUTIONS = [
  {
    title: "Manufacturing & Industrial",
    badge: "Production First",
    desc: "Manage raw materials, machine capacity, bill of materials (BOM), and factory floor work-orders from a central command center.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Automated robotic precision manufacturing facility",
    highlights: ["Multi-tier Bill of Materials", "Shop-floor machine schedules", "Batch scrap & QA logs"],
    Icon: Factory,
  },
  {
    title: "Retail & Multi-Branch POS",
    badge: "Omnichannel Sync",
    desc: "Connect physical store points of sale with central warehouse inventory, price updates, and unified customer purchase histories.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Modern retail storefront with integrated digital point-of-sale",
    highlights: ["Real-time multi-store sync", "Fast barcode billing", "Customer loyalty ledger"],
    Icon: Store,
  },
  {
    title: "Wholesale & Logistics",
    badge: "Supply Chain",
    desc: "Control high-volume container shipments, palletized warehouse dispatch, dynamic price tiers, and delivery driver fleets.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Logistics distribution warehouse with commercial freight operations",
    highlights: ["Dispatch route tracking", "Bulk volume pricing rules", "Vendor credit limit controls"],
    Icon: Truck,
  },
  {
    title: "Healthcare & Pharmaceuticals",
    badge: "Compliance Ready",
    desc: "Safeguard drug batch expiry dates, patient prescription records, supplier narcotics compliance, and insurance invoicing.",
    img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Pharmaceutical dispensary and healthcare supply management",
    highlights: ["Batch expiry early alerts", "Doctor commission tracking", "Strict audit trails"],
    Icon: Stethoscope,
  },
];

const IMPLEMENTATION_STEPS = [
  {
    step: "01",
    title: "Workflow Audit & Discovery",
    duration: "Weeks 1–2",
    desc: "We analyze your spreadsheets, invoices, department handoffs, and approval rules before writing a single line of code.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Strategy workshop mapping business workflows and ERP requirements",
  },
  {
    step: "02",
    title: "Custom Engineering & Migration",
    duration: "Weeks 3–8",
    desc: "We build role-tailored modules, clean and migrate legacy historical records, and integrate third-party payment and tax APIs.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Engineers developing custom software architecture and database models",
  },
  {
    step: "03",
    title: "Pilot Testing & Staff Training",
    duration: "Weeks 9–11",
    desc: "Hands-on guided training workshops with your team; simulated operations run parallel with your existing workflow to guarantee comfort.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Team participating in ERP hands-on training and testing session",
  },
  {
    step: "04",
    title: "Go-Live & Dedicated SLA Support",
    duration: "Week 12+",
    desc: "Zero-downtime cutover switch, automated encrypted cloud backups, ongoing security updates, and direct WhatsApp engineer support.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Production launch monitoring with real-time operational uptime",
  },
];

const WHY_US_POINTS = [
  {
    title: "Tailored to Your Terminology",
    desc: "We adapt fields, statuses, and reporting structures to your industry language - no forcing your team into generic foreign templates.",
  },
  {
    title: "Granular Role-Based Permissions",
    desc: "Separate access tiers for executives, branch managers, warehouse staff, and accountants with tamper-evident audit logs.",
  },
  {
    title: "Complete Data Migration",
    desc: "We safely clean, format, and transfer your legacy Excel sheets, Tally, or outdated software records into your new database.",
  },
  {
    title: "Cross-Device Web & Mobile",
    desc: "Lightweight, responsive PWA architecture accessible on desktop monitors, tablets, and smartphones without complex installations.",
  },
  {
    title: "High-Availability Cloud Hosting",
    desc: "Daily automated off-site backups, SSL encryption, redundant failover, and a guaranteed 99.9% application uptime SLA.",
  },
  {
    title: "Direct WhatsApp & Phone Support",
    desc: "No outsourced call center queues. You get immediate, priority access to the engineers who architected your platform.",
  },
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
                  business - inventory, production, sales, HR and finance - in one clean, manageable
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

      {/* Hero Image Banner */}
      <section className="oz-section oz-section--tight" aria-label="ERP overview banner">
        <div className="oz-container">
          <Reveal>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                aspectRatio: "21/9",
                boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                background: "var(--background-dark, #111827)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
                alt="Modern enterprise ERP system monitoring operational data, inventory turnover and live KPIs"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(17,24,39,0.1) 0%, rgba(17,24,39,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "clamp(1rem, 2.5vw, 1.75rem)",
                  left: "clamp(1rem, 2.5vw, 1.75rem)",
                  right: "clamp(1rem, 2.5vw, 1.75rem)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  color: "#ffffff",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "rgba(234, 88, 12, 0.9)",
                      marginBottom: 6,
                    }}
                  >
                    Enterprise Platform
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)",
                      fontWeight: 650,
                      color: "#ffffff",
                    }}
                  >
                    Unified Operations, Supply Chain & Financial Command
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    background: "rgba(17,24,39,0.7)",
                    backdropFilter: "blur(8px)",
                    padding: "8px 14px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e",
                      }}
                    />
                    Live Sync
                  </span>
                  <span style={{ opacity: 0.6 }}>|</span>
                  <span>Role-Based Access</span>
                  <span style={{ opacity: 0.6 }}>|</span>
                  <span>99.9% SLA</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="oz-section" aria-label="ERP modules">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Connected Modules</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Every core module your business needs, seamlessly integrated.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 650, margin: "12px auto 0" }}>
                Eliminate disconnected spreadsheets and siloed tools. Every department shares a single,
                real-time source of truth.
              </p>
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {MODULES.map(({ Icon, title, desc, img, imgAlt }, i) => (
              <Reveal key={title} index={i % 3}>
                <article
                  className="oz-card"
                  style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
                    <img
                      src={img}
                      alt={imgAlt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(17, 24, 39, 0.75)",
                        backdropFilter: "blur(6px)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      }}
                      aria-hidden="true"
                    >
                      <Icon size={18} strokeWidth={2} />
                    </div>
                  </div>
                  <div style={{ padding: "clamp(1.2rem, 2vw, 1.5rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: "1.15rem" }}>{title}</h3>
                    <p style={{ margin: 0, color: "var(--text-secondary, #374151)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                      {desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="oz-section oz-section--muted" aria-label="ERP solutions by industry">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Industry Architectures</span>
            </Reveal>
            <Reveal index={1} as="h2">
              ERP systems tailored for how your sector operates.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 640, margin: "12px auto 0" }}>
                A generic template won't cut it. We configure logic, tax structures, and shop-floor flows
                customized for your business reality.
              </p>
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-2" style={{ gap: "clamp(1.5rem, 2.5vw, 2rem)" }}>
            {INDUSTRY_SOLUTIONS.map(({ title, badge, desc, img, imgAlt, highlights, Icon }, i) => (
              <Reveal key={title} index={i % 2}>
                <article
                  className="oz-card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    border: "1px solid var(--border, #e5e7eb)",
                  }}
                >
                  <div style={{ aspectRatio: "16/8", overflow: "hidden", position: "relative" }}>
                    <img
                      src={img}
                      alt={imgAlt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        background: "rgba(17, 24, 39, 0.8)",
                        backdropFilter: "blur(6px)",
                        color: "#fff",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {badge}
                    </div>
                  </div>
                  <div style={{ padding: "clamp(1.25rem, 2.2vw, 1.6rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "var(--brand-orange-50, #fff7ed)",
                          color: "var(--brand-orange, #ea580c)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={2} />
                      </span>
                      <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{title}</h3>
                    </div>
                    <p style={{ margin: "0 0 16px", color: "var(--text-secondary, #374151)", fontSize: "0.93rem", lineHeight: 1.6 }}>
                      {desc}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "auto 0 0",
                        display: "grid",
                        gap: 8,
                        borderTop: "1px solid var(--border, #e5e7eb)",
                        paddingTop: 14,
                      }}
                    >
                      {highlights.map((h) => (
                        <li key={h} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", fontWeight: 550 }}>
                          <CheckCircle2 size={16} strokeWidth={2.2} style={{ color: "var(--brand-orange, #ea580c)", flexShrink: 0 }} aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="oz-section" aria-label="ERP implementation methodology">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Zero Business Disruption</span>
            </Reveal>
            <Reveal index={1} as="h2">
              A structured 4-phase rollout built for smooth team adoption.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 660, margin: "12px auto 0" }}>
                Most ERP projects stall because staff are overwhelmed. We run parallel pilots, migrate
                all legacy data, and train your departments hand-in-hand.
              </p>
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {IMPLEMENTATION_STEPS.map(({ step, title, duration, desc, img, imgAlt }, i) => (
              <Reveal key={step} index={i}>
                <article
                  className="oz-card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    borderRadius: "var(--oz-radius, 12px)",
                  }}
                >
                  <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                    <img
                      src={img}
                      alt={imgAlt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        background: "var(--brand-orange, #ea580c)",
                        color: "#fff",
                        fontFamily: "var(--oz-font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: 6,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      }}
                    >
                      Phase {step}
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        background: "rgba(17, 24, 39, 0.8)",
                        backdropFilter: "blur(6px)",
                        color: "#fff",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {duration}
                    </span>
                  </div>
                  <div style={{ padding: "clamp(1rem, 1.5vw, 1.25rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: "1.05rem" }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--text-secondary, #374151)", lineHeight: 1.55 }}>
                      {desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Ozeonix Infinity */}
      <section className="oz-section oz-section--muted" aria-label="Why choose our ERP engineering">
        <div className="oz-container">
          <div className="oz-split" style={{ alignItems: "center" }}>
            <Reveal>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4/3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                  alt="Enterprise business engineering team planning custom software architecture"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "auto 16px 16px 16px",
                    background: "rgba(17, 24, 39, 0.88)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 12,
                    padding: "14px 18px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    textAlign: "center",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", fontSize: "1.35rem", color: "var(--brand-orange, #ea580c)" }}>
                      99.9%
                    </strong>
                    <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>Uptime SLA Guarantee</span>
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "1.35rem", color: "var(--brand-orange, #ea580c)" }}>
                      100%
                    </strong>
                    <span style={{ fontSize: "0.75rem", opacity: 0.85 }}>Your Data Ownership</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <span className="oz-eyebrow">Why Us</span>
                <h2>Enterprise software that respects how your team actually works.</h2>
                <p className="oz-muted">
                  Off-the-shelf ERP platforms charge steep per-user license fees while forcing your company
                  to bend into rigid workflows. We engineer the exact software you need - owned completely by you.
                </p>
                <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
                  {WHY_US_POINTS.map(({ title, desc }) => (
                    <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <CheckCircle2
                        size={19}
                        strokeWidth={2.2}
                        style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-primary, #ea580c)" }}
                        aria-hidden="true"
                      />
                      <div>
                        <strong style={{ display: "block", fontSize: "0.95rem", color: "var(--text-primary, #111827)" }}>
                          {title}
                        </strong>
                        <p style={{ margin: "2px 0 0", fontSize: "0.88rem", color: "var(--text-secondary, #4b5563)", lineHeight: 1.5 }}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
              Common questions about custom ERP development.
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
            <span className="oz-eyebrow">
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
