import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  Lightbulb,
  Users,
  ShieldCheck,
  Heart,
  TrendingUp,
  Handshake,
  Globe,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Ozeonix Infinity is a technology studio helping startups, institutions and businesses transform ideas into reliable digital products.",
      },
      { property: "og:title", content: "About Us — Ozeonix Infinity" },
      {
        property: "og:description",
        content:
          "We build websites, mobile apps, CRM and ERP systems that small businesses can actually rely on.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/about" }],
  }),
  component: About,
});

const VALUES = [
  {
    t: "Innovation",
    d: "We create modern solutions that solve real business challenges through creativity and technology.",
    Icon: Lightbulb,
  },
  {
    t: "Customer Success",
    d: "Our clients' growth is our priority. We build solutions that deliver measurable value.",
    Icon: TrendingUp,
  },
  {
    t: "Quality",
    d: "Every website, application, CRM and ERP system is built with care for performance and usability.",
    Icon: Star,
  },
  {
    t: "Integrity",
    d: "We operate with honesty, transparency and professionalism in every project.",
    Icon: ShieldCheck,
  },
  {
    t: "Collaboration",
    d: "We work closely with our clients to transform their ideas into successful digital products.",
    Icon: Handshake,
  },
  {
    t: "Continuous Improvement",
    d: "We constantly learn, adapt and improve to deliver the best possible solutions.",
    Icon: Heart,
  },
  {
    t: "Accessibility",
    d: "Professional technology should be available to businesses of every size, everywhere.",
    Icon: Globe,
  },
  {
    t: "Reliability",
    d: "Long-term partnerships built on consistent, dependable delivery and ongoing support.",
    Icon: Users,
  },
];

const STATS = [
  { n: "25+", l: "Projects shipped" },
  { n: "20+", l: "Happy clients" },
  { n: "10+", l: "Industries served" },
  { n: "3+", l: "Years of experience" },
];

const WHAT_WE_DO = [
  "Custom Website & Web App Development",
  "Flutter Mobile App Development (iOS & Android)",
  "CRM & ERP System Development",
  "School & College Management Systems",
  "UI/UX Design & Brand Identity",
  "AI-Powered Business Solutions",
  "Digital Marketing & SEO",
  "Cloud Deployment & Technical Support",
];

function About() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="About Ozeonix Infinity">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Shape Thought. Power Tomorrow.</span>
                <h1>A technology studio building software small businesses can actually rely on.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We started Ozeonix Infinity because most small businesses and institutions have
                  great ideas but end up with fragile websites and half-finished software. We wanted
                  to change that — one well-crafted project at a time.
                </p>
                <div className="oz-open__meta">
                  {STATS.map((s) => (
                    <span key={s.l}>
                      <strong>{s.n}</strong> {s.l}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Story + Image */}
      <section className="oz-section oz-section--tight" aria-label="Our story">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Our Story</span>
                <h2>Founded on a simple belief.</h2>
                <p className="oz-muted">
                  Every business — whether a startup, educational institution or local enterprise —
                  deserves professional digital tools that enable growth, efficiency and long-term
                  success.
                </p>
                <p className="oz-muted" style={{ marginTop: 16 }}>
                  We started with the services businesses need most: professional websites, mobile
                  apps, CRM systems, ERP for educational institutions, UI/UX design and digital
                  portfolios. As we grow, we continue to expand our expertise and deliver more
                  advanced technology solutions.
                </p>
                <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/services" className="oz-btn oz-btn--primary">
                    Our Services <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="oz-btn oz-btn--outline">
                    Work with us
                  </Link>
                </div>
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
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Ozeonix Infinity team collaborating on digital projects"
                  width={800}
                  height={600}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="oz-section oz-section--muted" aria-label="What we do">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                  alt="Developer working on modern software solutions"
                  width={800}
                  height={600}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <span className="oz-eyebrow">What We Do</span>
                <h2>Everything your business needs to grow digitally.</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 12 }}>
                  {WHAT_WE_DO.map((item) => (
                    <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-primary)" }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="oz-section" aria-label="Our values">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Our Values</span>
            </Reveal>
            <Reveal index={1} as="h2">
              The principles that guide every project.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {VALUES.map(({ t, d, Icon }, i) => (
              <Reveal key={t} index={i % 4}>
                <article className="oz-card">
                  <span className="oz-card__icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="oz-section oz-section--muted" aria-label="Our impact in numbers">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Our Impact</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Numbers that reflect our commitment.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {STATS.map((s, i) => (
              <Reveal key={s.l} index={i % 4}>
                <div
                  className="oz-card"
                  style={{ textAlign: "center", padding: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 800,
                      color: "var(--oz-primary)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {s.n}
                  </strong>
                  <span style={{ fontSize: "0.9rem", color: "var(--oz-muted-foreground)" }}>
                    {s.l}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Start a project with us">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Let's build together
            </span>
            <h2>Ready to start your next project?</h2>
            <p className="oz-muted" style={{ maxWidth: 520, margin: "12px auto 0" }}>
              Tell us about your business and what you need. We'll listen, suggest the right
              approach, and get to work.
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
