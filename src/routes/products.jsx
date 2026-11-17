import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  GraduationCap,
  Building2,
  Store,
  Stethoscope,
  Hotel,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products & Software Suites - Ozeonix Infinity" },
      {
        name: "description",
        content:
          "ERP, CRM, LMS, HRMS, POS and AI products built by Ozeonix Infinity - ready-to-tailor platforms for every business type.",
      },
      { property: "og:title", content: "Products & Software Suites - Ozeonix Infinity" },
      {
        property: "og:description",
        content: "ERP, CRM, HRMS, POS and AI products built by Ozeonix Infinity.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/products" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/products" }],
  }),
  component: Products,
});

const SUITES = [
  {
    g: "Educational Solutions",
    Icon: GraduationCap,
    status: "live",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    imgAlt: "School and college ERP management system",
    desc: "Complete management platform for schools, colleges and coaching institutes covering every administrative and academic workflow.",
    items: [
      "School ERP",
      "College ERP",
      "Institute Management",
      "Student Information System (SIS)",
      "Learning Management System (LMS)",
      "Attendance Management",
      "Fees & Billing",
      "Exam & Results",
      "Library Management",
      "Hostel & Transport",
    ],
  },
  {
    g: "Business Management",
    Icon: Building2,
    status: "live",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Business CRM and ERP management dashboard",
    desc: "Powerful tools to manage your people, pipelines, inventory and operations - all from one unified platform.",
    items: [
      "CRM",
      "ERP",
      "HRMS",
      "Inventory Management",
      "Payroll",
      "Project Management",
      "Document Management",
      "Asset Management",
    ],
  },
  {
    g: "Retail & Commerce",
    Icon: Store,
    status: "live",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Retail POS and e-commerce management system",
    desc: "End-to-end retail and commerce tools - from the checkout counter to the online storefront and delivery management.",
    items: [
      "POS System",
      "Billing & Invoicing",
      "Retail Management",
      "E-Commerce Platform",
      "Order Management",
    ],
  },
  {
    g: "Healthcare",
    Icon: Stethoscope,
    status: "planned",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Healthcare hospital management system",
    desc: "Digital tools for clinics, hospitals and pharmacies to streamline patient care and administrative workflows.",
    items: [
      "Hospital Management",
      "Clinic Management",
      "Pharmacy Management",
      "Appointment Booking",
    ],
  },
  {
    g: "Hospitality",
    Icon: Hotel,
    status: "planned",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Hotel and restaurant management software",
    desc: "Hospitality management solutions for hotels, restaurants and service businesses to deliver memorable guest experiences.",
    items: ["Hotel Management", "Restaurant Management", "Table Reservation"],
  },
  {
    g: "AI & Automation",
    Icon: Sparkles,
    status: "future",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
    imgAlt: "AI-powered business automation and analytics",
    desc: "Next-generation AI tools to automate workflows, understand your data and serve customers intelligently - 24/7.",
    items: [
      "AI Business Assistant",
      "AI Customer Support Chatbot",
      "AI Document Processing",
      "AI Workflow Automation",
      "AI Analytics & Insights",
    ],
  },
];

const STATUS_LABELS = {
  live: { label: "Live", color: "var(--brand-green, #00A982)" },
  planned: { label: "Planned", color: "var(--oz-action, #2563eb)" },
  future: { label: "Coming Soon", color: "var(--oz-muted-foreground, #64748b)" },
};

function Products() {
  return (
    <>
      {/* Hero */}
      <section
        className="oz-open"
        aria-label="Ozeonix Infinity product suites"
      >
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Six suites, one platform</span>
                <h1>
                  Ready-to-tailor software suites for education, business, retail and beyond.
                </h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  These are the platforms we build and rebuild for our clients. Each one starts from
                  a proven base and gets tailored to your team's vocabulary, workflows and reports.
                </p>
                <div className="oz-open__meta">
                  <span>
                    <strong>3</strong> live suites
                  </span>
                  <span>
                    <strong>2</strong> in planning
                  </span>
                  <span>
                    <strong>1</strong> AI suite coming
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Product Grid */}
      <section className="oz-section" aria-label="All product suites">
        <div className="oz-container">
          <div className="oz-grid oz-grid-2" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {SUITES.map((suite, i) => {
              const Icon = suite.Icon;
              const statusInfo = STATUS_LABELS[suite.status];
              return (
                <Reveal key={suite.g} index={i % 2}>
                  <article
                    className="oz-card"
                    style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/8", overflow: "hidden" }}>
                      <img
                        src={suite.img}
                        alt={suite.imgAlt}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to bottom, transparent 50%, rgba(10,12,30,0.65) 100%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          right: 14,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: "rgba(0,0,0,0.6)",
                          backdropFilter: "blur(4px)",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: statusInfo.color,
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: statusInfo.color,
                          }}
                          aria-hidden="true"
                        />
                        {statusInfo.label}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "clamp(1.25rem, 2vw, 1.75rem)",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        className="oz-card__icon"
                        style={{ marginBottom: 12, background: "var(--oz-primary)", color: "#fff" }}
                        aria-hidden="true"
                      >
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                      <h3 style={{ marginTop: 0 }}>{suite.g}</h3>
                      <p style={{ color: "var(--oz-muted-foreground)", marginBottom: 16 }}>
                        {suite.desc}
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "grid",
                          gap: 8,
                          flex: 1,
                        }}
                      >
                        {suite.items.map((it) => (
                          <li
                            key={it}
                            style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
                          >
                            <CheckCircle2
                              size={16}
                              strokeWidth={2}
                              style={{
                                flexShrink: 0,
                                marginTop: 2,
                                color: "var(--oz-primary)",
                              }}
                              aria-hidden="true"
                            />
                            <span style={{ fontSize: "0.9rem" }}>{it}</span>
                          </li>
                        ))}
                      </ul>
                      {suite.status === "live" && (
                        <div style={{ marginTop: 20 }}>
                          <Link to="/contact" className="oz-btn oz-btn--primary" style={{ width: "100%" }}>
                            Request a demo <ArrowRight size={16} aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                      {suite.status === "planned" && (
                        <div style={{ marginTop: 20 }}>
                          <Link to="/contact" className="oz-btn oz-btn--outline" style={{ width: "100%" }}>
                            Join the waitlist
                          </Link>
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Our Products */}
      <section className="oz-section oz-section--muted" aria-label="Why choose our products">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Why Ozeonix Products</span>
                <h2>Built for real businesses, not demos.</h2>
                <p className="oz-muted">
                  Every product we offer has been designed through real client projects - not built
                  as a showcase. That means the edge cases are handled, the reports make sense, and
                  the support is real.
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "20px 0 0",
                    display: "grid",
                    gap: 12,
                  }}
                >
                  {[
                    "Tailored to your workflows and terminology",
                    "Responsive on mobile, tablet and desktop",
                    "Role-based access control built in",
                    "Offline-ready options for low-connectivity environments",
                    "Guided onboarding and staff training",
                    "Long-term maintenance and feature updates",
                  ].map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Zap
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
                  aspectRatio: "4 / 3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Team working with modern business software"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Request a product demo">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              See it in action
            </span>
            <h2>Request a live product demo.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              We'll walk you through the product that best fits your business, show you how it works,
              and answer all your questions - no sales pressure.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Request a demo <ArrowRight size={16} aria-hidden="true" />
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
