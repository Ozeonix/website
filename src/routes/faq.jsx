import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { useState } from "react";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Frequently Asked Questions | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Answers to common questions about Ozeonix Infinity's web, mobile, CRM, ERP and LMS development services, process and pricing.",
      },
      { property: "og:title", content: "FAQ — Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Answers to common questions about our services, process and technology.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/faq" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
    ],
  }),
  component: FAQ,
});

const FAQ_CATEGORIES = [
  {
    label: "Services",
    faqs: [
      {
        q: "What services does Ozeonix Infinity provide?",
        a: "Custom websites, Flutter mobile apps, CRM systems, ERP solutions for schools and colleges, UI/UX design, portfolios, business software and AI-powered solutions.",
      },
      {
        q: "Which industries do you serve?",
        a: "Schools, colleges, startups, SMEs, healthcare, retail, hospitality, real estate, restaurants, fitness, events and many others across Nepal and internationally.",
      },
      {
        q: "Do you build custom software?",
        a: "Yes — every solution is tailored to your business requirements, workflows and future growth plans. We don't use off-the-shelf templates for core functionality.",
      },
      {
        q: "Do you develop mobile applications?",
        a: "Yes — high-performance cross-platform apps built with Flutter for both Android and iOS from a single codebase.",
      },
      {
        q: "Can you redesign my existing website?",
        a: "Absolutely. We modernize existing sites for improved design, performance, security and user experience — with or without changing the underlying technology.",
      },
      {
        q: "Do you provide ERP and CRM solutions?",
        a: "Yes — we develop fully customized ERP and CRM systems tailored to institutions, businesses and organizations of any size.",
      },
    ],
  },
  {
    label: "Process & Quality",
    faqs: [
      {
        q: "Will my website be mobile-friendly?",
        a: "Every website we build is fully responsive across desktops, tablets and phones. Mobile-first design is our default approach.",
      },
      {
        q: "How long does a project take?",
        a: "Timelines depend on scope and complexity. After understanding your requirements, we share a detailed timeline before development begins — typically 4–16 weeks for most projects.",
      },
      {
        q: "What technologies do you use?",
        a: "We use modern frameworks including Flutter, React, Node.js, Firebase, MySQL, PostgreSQL, REST APIs and major cloud platforms like AWS and GCP.",
      },
      {
        q: "Can you integrate third-party services?",
        a: "Yes — payment gateways (eSewa, Khalti, Stripe), email marketing, maps, analytics, authentication, CRM integrations and other third-party APIs.",
      },
      {
        q: "Do you offer website maintenance and support?",
        a: "Yes — ongoing maintenance, security updates, performance optimization, bug fixes and feature enhancements. We're a long-term partner.",
      },
    ],
  },
  {
    label: "Pricing & Partnership",
    faqs: [
      {
        q: "How do I get started?",
        a: "Contact us with your project requirements. We'll schedule a free 30-minute discovery call, discuss your goals and provide a detailed proposal within 48 hours.",
      },
      {
        q: "Do you work with startups and small businesses?",
        a: "Yes — we love helping startups and small businesses build a strong digital presence with scalable, cost-effective solutions that grow with them.",
      },
      {
        q: "Can you help my business grow online?",
        a: "We create professional digital solutions that strengthen your online presence, improve user experience and help attract and retain more customers.",
      },
      {
        q: "Do you sign NDAs and contracts?",
        a: "Yes — we provide a clear contract before every project, covering scope, timeline, payment terms and intellectual property. NDAs are available on request.",
      },
      {
        q: "Why should I choose Ozeonix Infinity?",
        a: "Modern technology, user-focused design, scalable architecture, transparent communication and dedicated long-term support. We treat every project as if it were our own.",
      },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid var(--border)",
        background: "var(--surface, var(--background))",
        overflow: "hidden",
        transition: "box-shadow 0.2s ease",
        boxShadow: open ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "clamp(1rem, 2vw, 1.25rem)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
          fontFamily: "inherit",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: 1.4 }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            color: "var(--oz-primary)",
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            padding: "0 clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.25rem)",
            color: "var(--oz-muted-foreground)",
            lineHeight: 1.7,
            fontSize: "0.95rem",
          }}
        >
          <p style={{ margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

function FAQ() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Frequently Asked Questions">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Before you write to us</span>
                <h1>Frequently Asked Questions</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  Quick answers to the questions we hear most often. If yours isn't here, reach out
                  — we reply within a few hours.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a
                    href="https://wa.me/9779769294624"
                    className="oz-btn oz-btn--primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
                  </a>
                  <Link to="/contact" className="oz-btn oz-btn--outline">
                    Send a message
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* FAQ Categories */}
      {FAQ_CATEGORIES.map((cat, ci) => (
        <section
          key={cat.label}
          className={`oz-section oz-section--tight${ci % 2 === 1 ? " oz-section--muted" : ""}`}
          aria-label={`${cat.label} questions`}
        >
          <div className="oz-container" style={{ maxWidth: 860 }}>
            <Reveal>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 24,
                }}
              >
                <span className="oz-eyebrow" style={{ margin: 0 }}>
                  {cat.label}
                </span>
              </div>
            </Reveal>
            <div style={{ display: "grid", gap: 12 }}>
              {cat.faqs.map((f, fi) => (
                <Reveal key={f.q} index={fi % 3}>
                  <FaqItem q={f.q} a={f.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Still have questions?">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              Still have questions?
            </span>
            <h2>We're happy to answer anything.</h2>
            <p className="oz-muted" style={{ maxWidth: 480, margin: "12px auto 0" }}>
              Reach out via WhatsApp, email or our contact form. We reply within a few hours on
              business days.
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
                Contact us <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="https://wa.me/9779769294624" className="oz-btn oz-btn--on-dark">
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
