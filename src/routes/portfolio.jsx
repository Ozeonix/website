import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { ExternalLink, ArrowRight, Layers, Smartphone, Building2, Palette, Sparkles } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Our Work | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Selected work and demo builds by Ozeonix Infinity — ERP systems, CRM platforms, mobile apps, websites and more.",
      },
      { property: "og:title", content: "Portfolio — Ozeonix Infinity" },
      { property: "og:description", content: "Selected work and demo builds by Ozeonix Infinity." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/portfolio" }],
  }),
  component: Portfolio,
});

const FEATURED = {
  t: "School Management ERP",
  tag: "ERP · Demo",
  d: "A comprehensive school management system covering students, attendance, fees, exams, staff and parent communication — built to feel calm and fast even with hundreds of moving parts.",
  tech: ["Flutter", "Node.js", "REST API", "PostgreSQL"],
  img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
  imgAlt: "School management ERP dashboard interface on a laptop",
};

const PROJECTS = [
  {
    t: "College ERP Platform",
    tag: "ERP",
    d: "Full-cycle college management: admissions, academics, faculty, finance and administration in one unified platform.",
    tech: "Flutter · API · PostgreSQL",
    img: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=600&q=80",
    imgAlt: "College ERP platform administration dashboard",
    Icon: Building2,
  },
  {
    t: "Business CRM Platform",
    tag: "CRM",
    d: "Leads, sales pipelines, invoices, follow-ups and customer support — everything a growing sales team needs.",
    tech: "Flutter · Cloud DB",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    imgAlt: "CRM platform with sales pipeline and analytics",
    Icon: Layers,
  },
  {
    t: "Corporate Website",
    tag: "Web",
    d: "Responsive, SEO-optimized corporate presence with high-performance page load, structured data and a smooth contact flow.",
    tech: "React · SEO · TanStack",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Modern corporate website on desktop and mobile",
    Icon: Palette,
  },
  {
    t: "Mobile Applications",
    tag: "Mobile",
    d: "Cross-platform apps with consistent, high-performance UX on Android and iOS from a single Flutter codebase.",
    tech: "Flutter · iOS · Android",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Flutter mobile applications on iOS and Android devices",
    Icon: Smartphone,
  },
  {
    t: "Portfolio Websites",
    tag: "Web",
    d: "Elegant, memorable portfolios for creators, freelancers and studios that convert visitors into clients.",
    tech: "React · Animations",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Creative portfolio website design",
    Icon: Palette,
  },
  {
    t: "Custom Web Applications",
    tag: "SaaS",
    d: "Business apps that automate processes, improve team efficiency and scale as the company grows.",
    tech: "Full-stack · React · Node",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Custom web application dashboard and analytics",
    Icon: Sparkles,
  },
  {
    t: "UI/UX Design Projects",
    tag: "Design",
    d: "Interfaces for websites, apps, dashboards and enterprise software — crafted for clarity, usability and brand consistency.",
    tech: "Figma · Design Systems",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    imgAlt: "UI/UX design mockups and design systems",
    Icon: Palette,
  },
];

function Portfolio() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Ozeonix Infinity portfolio">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">Selected work</span>
            <h1>Projects we've built — and a few we built to show what's possible.</h1>
          </Reveal>
        </div>
      </section>

      {/* Featured Project */}
      <section className="oz-section oz-section--tight" aria-label="Featured project">
        <div className="oz-container">
          <Reveal>
            <article
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: "var(--surface, var(--background))",
                border: "1px solid var(--border)",
                boxShadow: "0 24px 56px -16px rgba(15,23,42,0.14)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 0,
                }}
              >
                <div style={{ position: "relative", aspectRatio: "16/7", overflow: "hidden" }}>
                  <img
                    src={FEATURED.img}
                    alt={FEATURED.imgAlt}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to right, rgba(10,12,30,0.65) 0%, transparent 60%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 24,
                      left: 24,
                      right: "40%",
                      color: "#fff",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "var(--oz-primary)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        marginBottom: 10,
                      }}
                    >
                      {FEATURED.tag} · Featured
                    </span>
                    <h2 style={{ margin: 0, color: "#fff", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}>
                      {FEATURED.t}
                    </h2>
                  </div>
                </div>
                <div style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}>
                  <p style={{ color: "var(--oz-muted-foreground)", maxWidth: 640, margin: 0 }}>
                    {FEATURED.d}
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {FEATURED.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "1px solid var(--border)",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--oz-primary)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <Link to="/contact" className="oz-btn oz-btn--primary">
                      Request a walkthrough <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Project Grid */}
      <section className="oz-section oz-section--tight" aria-label="All projects">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">More Work</span>
            </Reveal>
            <Reveal index={1} as="h2">
              More projects across web, mobile and software.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {PROJECTS.map((p, i) => {
              const Icon = p.Icon;
              return (
                <Reveal key={p.t} index={i % 3}>
                  <article
                    className="oz-card"
                    style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      <img
                        src={p.img}
                        alt={p.imgAlt}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "rgba(0,0,0,0.65)",
                          backdropFilter: "blur(4px)",
                          color: "#fff",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          padding: "3px 9px",
                          borderRadius: 6,
                        }}
                      >
                        {p.tag}
                      </div>
                    </div>
                    <div style={{ padding: "clamp(1rem, 2vw, 1.25rem)", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span className="oz-card__icon" style={{ marginBottom: 10 }} aria-hidden="true">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <h3 style={{ marginTop: 0 }}>{p.t}</h3>
                      <p style={{ flex: 1 }}>{p.d}</p>
                      <span
                        style={{
                          marginTop: 12,
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "var(--oz-primary)",
                        }}
                      >
                        {p.tech}
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Start your project">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Your project could be next
            </span>
            <h2>Let's build something great together.</h2>
            <p className="oz-muted" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              Tell us what you need. We'll review your requirements and come back with an honest
              proposal within 48 hours.
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
