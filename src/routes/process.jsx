import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  MessageSquare,
  Map,
  Paintbrush2,
  Code2,
  FlaskConical,
  ClipboardCheck,
  Rocket,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Development Process - Ozeonix Infinity" },
      {
        name: "description",
        content:
          "A calm, predictable path from discovery to launch and beyond. Eight clear steps - no surprises, no radio silence.",
      },
      { property: "og:title", content: "Our Development Process - Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Eight steps from idea to live product. Transparent, collaborative, on time.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/process" }],
  }),
  component: Process,
});

const STEPS = [
  {
    s: "01",
    t: "Discovery & Consultation",
    d: "We begin by understanding your business, goals, target audience and requirements in depth. No assumptions - just good questions.",
    Icon: MessageSquare,
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Team conducting a discovery and consultation meeting",
  },
  {
    s: "02",
    t: "Planning & Strategy",
    d: "Detailed roadmap, feature list, tech stack selection, timelines and milestones. You approve everything before a single line of code is written.",
    Icon: Map,
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Project planning session with roadmap and strategy",
  },
  {
    s: "03",
    t: "UI/UX Design",
    d: "Intuitive, responsive and accessible interfaces - wireframes first, then high-fidelity mockups. You see the product before it's built.",
    Icon: Paintbrush2,
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Designer working on UI/UX wireframes and mockups",
  },
  {
    s: "04",
    t: "Development",
    d: "Scalable, secure and high-performance engineering with regular check-ins. You get progress updates at every milestone, never at the end.",
    Icon: Code2,
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Developer writing clean, production-ready code",
  },
  {
    s: "05",
    t: "Testing & QA",
    d: "Cross-device and cross-browser testing for functionality, security and performance. We test so you don't have to discover issues after launch.",
    Icon: FlaskConical,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    imgAlt: "QA testing on multiple devices and browsers",
  },
  {
    s: "06",
    t: "Client Review",
    d: "We present the completed solution and refine it based on your feedback. This is your project - we iterate until it's exactly right.",
    Icon: ClipboardCheck,
    img: "https://images.unsplash.com/photo-1664575198308-3959904fa430?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Client review and feedback session",
  },
  {
    s: "07",
    t: "Deployment & Launch",
    d: "We configure domains, hosting, SSL and databases for a smooth, monitored launch. Your product goes live - no surprises.",
    Icon: Rocket,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Product deployment and launch monitoring",
  },
  {
    s: "08",
    t: "Maintenance & Support",
    d: "Ongoing security updates, performance optimization, bug fixes and feature enhancements. We're a long-term partner, not a one-time vendor.",
    Icon: LifeBuoy,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Ongoing maintenance and customer support",
  },
];

const PRINCIPLES = [
  "You always know which step we're on and what's next",
  "No surprises - changes are discussed before they happen",
  "Regular updates via WhatsApp, email or video calls",
  "We ask for your feedback at every milestone",
  "Clear timelines set before development begins",
  "We don't hand off and disappear - we stay involved",
];

function Process() {
  return (
    <>
      {/* Hero */}
      <section
        className="oz-open"
        aria-label="How a project actually runs at Ozeonix Infinity"
      >
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">How a project actually runs</span>
                <h1>
                  Eight clear steps from "we should build something" to a live, supported product.
                </h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  No mystery, no radio silence. You always know which step we're on, what's next,
                  and what we need from you to keep moving.
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Start a project <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/services" className="oz-btn oz-btn--outline">
                    Our Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Process Steps Grid */}
      <section className="oz-section" aria-label="Development process steps">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">The Process</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Every project follows the same calm, predictable path.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-2" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            {STEPS.map(({ s, t, d, Icon, img, imgAlt }, i) => (
              <Reveal key={s} index={i % 2}>
                <article
                  className="oz-card"
                  style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}
                >
                  <div style={{ position: "relative", aspectRatio: "16 / 7", overflow: "hidden" }}>
                    <img
                      src={img}
                      alt={imgAlt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: "var(--oz-primary)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: "0.78rem",
                        letterSpacing: "0.08em",
                        padding: "4px 10px",
                        borderRadius: 6,
                      }}
                    >
                      Step {s}
                    </div>
                  </div>
                  <div style={{ padding: "clamp(1rem, 2vw, 1.5rem)" }}>
                    <span
                      className="oz-card__icon"
                      style={{ marginBottom: 12, background: "var(--oz-primary)", color: "#fff" }}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ marginTop: 0 }}>{t}</h3>
                    <p style={{ margin: 0 }}>{d}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="oz-section oz-section--muted" aria-label="Our working principles">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">How We Work</span>
                <h2>Transparent collaboration at every step.</h2>
                <p className="oz-muted">
                  We believe the best projects happen when clients are informed and involved - not
                  kept waiting. These are the principles we follow on every engagement.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 12 }}>
                  {PRINCIPLES.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-primary)" }}
                        aria-hidden="true"
                      />
                      <span>{p}</span>
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
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaborating transparently on a software project"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Start your project today">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Ready to begin?
            </span>
            <h2>Let's walk through your project together.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              A free 30-minute discovery call is all it takes. No commitment, no pressure - just an
              honest conversation about what you need.
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
                Book a discovery call <ArrowRight size={16} aria-hidden="true" />
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
