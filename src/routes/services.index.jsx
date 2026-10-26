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
      { name: "description", content: "Explore custom CRM, ERP, LMS, website, mobile app and cloud development services from Ozeonix Infinity." },
      { property: "og:title", content: "Custom Software Development Services | Ozeonix Infinity" },
      { property: "og:description", content: "Custom CRM, ERP, LMS, website, mobile app and cloud development services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/services" },
    ],
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
  { title: "Core Development", icon: Code2, accent: "var(--oz-primary)", items: ["Custom Website Development", "Business & Corporate Websites", "Portfolio & Landing Pages", "E-Commerce Websites", "Custom Web Applications"] },
  { title: "Mobile Apps", icon: Smartphone, accent: "var(--oz-action)", items: ["Flutter App Development", "Android App Development", "iOS App Development", "Cross-Platform Applications"] },
  { title: "Business Software", icon: Building2, accent: "var(--oz-accent)", items: ["Customer Relationship Management (CRM)", "Enterprise Resource Planning (ERP)", "School / College / Institute Management", "HRMS", "Inventory Management"] },
  { title: "UI/UX & Branding", icon: Palette, accent: "var(--oz-primary)", items: ["UI/UX Design", "Responsive Web Design", "Mobile App UI", "Dashboards", "Wireframing & Prototyping", "Brand Identity"] },
  { title: "AI & Intelligent Solutions", icon: Sparkles, accent: "var(--oz-action)", items: ["AI-Powered Business Solutions", "AI Chatbots", "AI Automation & Integration", "Intelligent Document Processing", "AI Workflow Automation"] },
  { title: "SaaS Products", icon: Cloud, accent: "var(--oz-accent)", items: ["Custom SaaS Development", "Multi-Tenant Platforms", "Subscription Software", "SaaS Consulting"] },
  { title: "API & Backend", icon: Plug, accent: "var(--oz-primary)", items: ["REST API Development", "Third-Party Integrations", "Payment Gateways", "Auth & Authorization", "Database Design"] },
  { title: "Cloud & DevOps", icon: Server, accent: "var(--oz-action)", items: ["Cloud Deployment", "Server Setup", "Domain & Hosting", "CI/CD Pipelines", "Performance & Security"] },
  { title: "Digital Growth", icon: TrendingUp, accent: "var(--oz-accent)", items: ["SEO", "Performance Optimization", "Maintenance & Support", "Website Redesign", "Migration", "Analytics"] },
];

function Services() {
  return (
    <>
      <section className="oz-open" aria-label="Software development services">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">01 — What we do</span>
                <h1>Custom Software Development Services</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  Instead of picking a package, tell us the outcome you want. We assemble the right mix from the
                  groups below — websites, apps, business software, design and the plumbing that keeps it all running.
                </p>
                <div className="oz-open__meta">
                  <span><strong>9</strong> capability groups</span>
                  <span><strong>40+</strong> individual services</span>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section oz-section--tight" aria-label="Specialized">
        <div className="oz-container">
          <div className="oz-svc-grid">
            {GROUPS.map((g, i) => {
              const Icon = g.icon;
              return (
                <Reveal key={g.title} index={i % 3}>
                  <article
                    className="oz-svc-card"
                    style={{ "--svc-accent": g.accent }}
                  >
                    <div className="oz-svc-card__head">
                      <span className="oz-svc-card__num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="oz-svc-card__icon" aria-hidden="true">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                    </div>
                    <h3 className="oz-svc-card__title">{g.title}</h3>
                    <ul className="oz-svc-card__list">
                      {g.items.map((it) => (
                        <li key={it}>
                          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="oz-svc-card__glow" aria-hidden="true" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="oz-section" aria-label="Specialized">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Specialized</span></Reveal>
            <Reveal index={1} as="h2">Dedicated service pages for our core offerings.</Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            <Reveal>
              <article className="oz-card">
                <h3>ERP Development</h3>
                <p>Custom ERP solutions for manufacturing, retail and growing businesses.</p>
                <Link to="/services/erp-development" className="oz-btn oz-btn--primary" style={{ marginTop: 12 }}>Explore ERP</Link>
              </article>
            </Reveal>
            <Reveal index={1}>
              <article className="oz-card">
                <h3>CRM Solutions</h3>
                <p>Sales-focused CRM software for lead management and customer growth.</p>
                <Link to="/services/crm-solutions" className="oz-btn oz-btn--primary" style={{ marginTop: 12 }}>Explore CRM</Link>
              </article>
            </Reveal>
            <Reveal index={2}>
              <article className="oz-card">
                <h3>LMS Platforms</h3>
                <p>Digital learning platforms for schools, colleges, institutes and teams.</p>
                <Link to="/services/lms-platforms" className="oz-btn oz-btn--primary" style={{ marginTop: 12 }}>Explore LMS</Link>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--muted">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <Reveal>
            <p className="oz-muted" style={{ textAlign: "center" }}>
              Ozeonix Infinity partners with ambitious organizations to shape ideas into secure, scalable digital products.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
