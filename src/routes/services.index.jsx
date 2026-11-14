import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  Code2,
  Smartphone,
  Building2,
  Palette,
  Sparkles,
  Cloud,
  Plug,
  Server,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Custom Software, CRM & ERP Development Services",
  provider: {
    "@type": "Organization",
    name: "Ozeonix Infinity",
    url: "https://ozeonix.com",
  },
  areaServed: "Worldwide",
  serviceType: "Software Development",
  description:
    "Custom websites, Flutter mobile apps, CRM systems, ERP solutions, UI/UX design, cloud deployment and AI-ready automation for ambitious businesses and institutions.",
};

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Custom Software Development Services | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Explore custom CRM, ERP, LMS, website, mobile app and cloud development services from Ozeonix Infinity.",
      },
      { property: "og:title", content: "Custom Software Development Services | Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Custom CRM, ERP, LMS, website, mobile app and cloud development services.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(SERVICE_JSONLD),
      },
    ],
  }),
  component: Services,
});

const GROUPS = [
  {
    title: "Core Development",
    Icon: Code2,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Custom website and web application development",
    items: [
      "Custom Website Development",
      "Business & Corporate Websites",
      "Portfolio & Landing Pages",
      "E-Commerce Websites",
      "Custom Web Applications",
    ],
  },
  {
    title: "Mobile Apps",
    Icon: Smartphone,
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Flutter mobile app development for iOS and Android",
    items: [
      "Flutter App Development",
      "Android App Development",
      "iOS App Development",
      "Cross-Platform Applications",
    ],
  },
  {
    title: "Business Software",
    Icon: Building2,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    imgAlt: "CRM, ERP and business software development",
    items: [
      "Customer Relationship Management (CRM)",
      "Enterprise Resource Planning (ERP)",
      "School / College / Institute Management",
      "HRMS",
      "Inventory Management",
    ],
  },
  {
    title: "UI/UX & Branding",
    Icon: Palette,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    imgAlt: "UI/UX design and brand identity creation",
    items: [
      "UI/UX Design",
      "Responsive Web Design",
      "Mobile App UI",
      "Dashboards",
      "Wireframing & Prototyping",
      "Brand Identity",
    ],
  },
  {
    title: "AI & Intelligent Solutions",
    Icon: Sparkles,
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
    imgAlt: "AI-powered business solutions and automation",
    items: [
      "AI-Powered Business Solutions",
      "AI Chatbots",
      "AI Automation & Integration",
      "Intelligent Document Processing",
      "AI Workflow Automation",
    ],
  },
  {
    title: "SaaS Products",
    Icon: Cloud,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    imgAlt: "SaaS platform and cloud product development",
    items: [
      "Custom SaaS Development",
      "Multi-Tenant Platforms",
      "Subscription Software",
      "SaaS Consulting",
    ],
  },
  {
    title: "API & Backend",
    Icon: Plug,
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    imgAlt: "REST API development and third-party integrations",
    items: [
      "REST API Development",
      "Third-Party Integrations",
      "Payment Gateways",
      "Auth & Authorization",
      "Database Design",
    ],
  },
  {
    title: "Cloud & DevOps",
    Icon: Server,
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Cloud deployment and DevOps infrastructure",
    items: [
      "Cloud Deployment",
      "Server Setup",
      "Domain & Hosting",
      "CI/CD Pipelines",
      "Performance & Security",
    ],
  },
  {
    title: "Digital Growth",
    Icon: TrendingUp,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "SEO, performance optimization and digital marketing",
    items: [
      "SEO",
      "Performance Optimization",
      "Maintenance & Support",
      "Website Redesign",
      "Migration",
      "Analytics",
    ],
  },
];

const SPECIALIZED = [
  {
    t: "ERP Development",
    d: "Custom ERP solutions for manufacturing, retail and growing businesses.",
    to: "/services/erp-development",
    label: "Explore ERP",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Custom ERP development for businesses",
  },
  {
    t: "CRM Solutions",
    d: "Sales-focused CRM software for lead management and customer growth.",
    to: "/services/crm-solutions",
    label: "Explore CRM",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    imgAlt: "CRM platform for sales teams",
  },
  {
    t: "LMS Platforms",
    d: "Digital learning platforms for schools, colleges, institutes and training teams.",
    to: "/services/lms-platforms",
    label: "Explore LMS",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "LMS platform for educational institutions",
  },
];

function Services() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Custom Software Development Services">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">What we do</span>
                <h1>Custom Software Development Services</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  Tell us the outcome you need. We assemble the right mix of web, mobile, software,
                  design and infrastructure — no package deals, no wasted budget.
                </p>
                <div className="oz-open__meta">
                  <span>
                    <strong>9</strong> capability groups
                  </span>
                  <span>
                    <strong>40+</strong> individual services
                  </span>
                  <span>
                    <strong>10+</strong> industries served
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Services Grid */}
      <section className="oz-section" aria-label="All service capability groups">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Capabilities</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Nine capability groups. One team.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {GROUPS.map(({ title, Icon, img, imgAlt, items }, i) => (
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
                  <div style={{ padding: "clamp(1rem, 2vw, 1.25rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span
                      className="oz-card__icon"
                      style={{ marginBottom: 10, background: "var(--oz-primary)", color: "#fff" }}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ marginTop: 0 }}>{title}</h3>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gap: 7,
                        flex: 1,
                      }}
                    >
                      {items.map((it) => (
                        <li
                          key={it}
                          style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
                        >
                          <CheckCircle2
                            size={15}
                            strokeWidth={2}
                            style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-primary)" }}
                            aria-hidden="true"
                          />
                          <span style={{ fontSize: "0.875rem" }}>{it}</span>
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

      {/* Specialized Services */}
      <section className="oz-section oz-section--muted" aria-label="Specialized service pages">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Specialized</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Dedicated pages for our most requested services.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {SPECIALIZED.map(({ t, d, to, label, img, imgAlt }, i) => (
              <Reveal key={t} index={i % 3}>
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
                  <div
                    style={{
                      padding: "clamp(1.25rem, 2vw, 1.5rem)",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ marginTop: 0 }}>{t}</h3>
                    <p style={{ flex: 1 }}>{d}</p>
                    <Link to={to} className="oz-btn oz-btn--primary" style={{ marginTop: 16, alignSelf: "flex-start" }}>
                      {label} <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Start a project with Ozeonix">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Let's build together
            </span>
            <h2>Tell us what you need. We'll figure out the rest.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              A free 30-minute call is all it takes. No commitment, no pressure — just an honest
              conversation about what you want to build.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Start a project <ArrowRight size={16} aria-hidden="true" />
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
