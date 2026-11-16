import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import {
  Briefcase,
  Code,
  Sparkles,
  Laptop,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Heart,
  ShieldCheck,
  Layers,
  Globe,
  Coffee,
  Send,
  Smartphone,
  Palette,
  Server,
} from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Open Positions - Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Explore remote-first software engineering, mobile development, and product design careers at Ozeonix Infinity. Build high-impact digital products with a craft-oriented team.",
      },
      { property: "og:title", content: "Careers & Open Positions - Ozeonix Infinity" },
      {
        property: "og:description",
        content:
          "Join Ozeonix Infinity. Remote-first flexibility, modern technology stack, high autonomy, and meaningful client products.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/careers" }],
  }),
  component: Careers,
});

const STATS = [
  { n: "100%", l: "Remote-first culture" },
  { n: "4+", l: "Open engineering roles" },
  { n: "Flexible", l: "Working hours" },
  { n: "Global", l: "Client impact" },
];

const CULTURE_PILLARS = [
  {
    title: "High Autonomy & Direct Impact",
    desc: "We stay lean on purpose. You won't be trapped writing tickets in a silo - you own architecture from conception to deployment, ship real software, and see client success firsthand.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80",
    alt: "Ozeonix Infinity engineers collaborating on a software architecture sprint",
  },
  {
    title: "Modern Engineering Craft",
    desc: "We work with modern tools: React 19, TypeScript, Flutter, Node.js, and cloud platforms. We care about semantic HTML, 60fps animations, accessible UI, and clean design tokens.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80",
    alt: "Developer writing clean modern software code on multi-display setup",
  },
  {
    title: "Respect for Focus & Balance",
    desc: "We believe great engineering requires uninterrupted focus, thoughtful asynchronous communication, sensible milestones, and genuine respect for personal life and wellbeing.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80",
    alt: "Remote team member working in a focused, comfortable workspace",
  },
];

const BENEFITS = [
  {
    title: "Competitive Compensation",
    desc: "Transparent salary based on skill, responsibility, and merit with performance bonuses.",
    icon: Sparkles,
  },
  {
    title: "Remote-First Flexibility",
    desc: "Work from home, a co-working space, or wherever you feel most inspired and productive.",
    icon: Globe,
  },
  {
    title: "Learning & Book Stipend",
    desc: "Annual budget for developer courses, technical books, workshops, and certifications.",
    icon: GraduationCap,
  },
  {
    title: "Tooling & Hardware Support",
    desc: "Top-tier developer subscriptions, IDE tooling, and hardware support to do your best work.",
    icon: Laptop,
  },
  {
    title: "Paid Time Off & Holidays",
    desc: "Generous vacation policy, festival holidays, and sick leave so you can recharge fully.",
    icon: Heart,
  },
  {
    title: "Direct Client & Product Ownership",
    desc: "Gain deep product strategy experience solving high-value problems for diverse industries.",
    icon: ShieldCheck,
  },
];

const ROLES = [
  {
    id: "frontend-engineer",
    title: "Frontend Engineer (React / TypeScript)",
    department: "Engineering",
    category: "engineering",
    type: "Full-time",
    location: "Remote (Global / South Asia)",
    experience: "2+ Years Experience",
    summary:
      "Build responsive, accessible, high-performance web applications and SaaS interfaces with React 19, TypeScript, and modern CSS architecture.",
    skills: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "CSS Architecture",
      "WCAG 2.1 AA",
      "Vite",
    ],
    responsibilities: [
      "Develop modular, maintainable UI components adhering to design tokens.",
      "Optimize web vitals, bundle size, and responsive layout across all breakpoints.",
      "Collaborate directly with designers to bring interactive interfaces to life.",
      "Integrate REST and GraphQL APIs with robust error handling and loading states.",
    ],
    datePosted: "2026-11-01",
  },
  {
    id: "flutter-developer",
    title: "Mobile Application Developer (Flutter)",
    department: "Mobile Engineering",
    category: "mobile",
    type: "Full-time",
    location: "Remote (Global / South Asia)",
    experience: "2+ Years Experience",
    summary:
      "Design and deploy production-grade cross-platform Android and iOS applications with smooth 60fps animations and resilient offline architecture.",
    skills: [
      "Flutter",
      "Dart",
      "State Management (BLoC/Riverpod)",
      "SQLite",
      "Push Notifications",
      "App Store / Play Store",
    ],
    responsibilities: [
      "Ship clean, robust Flutter code for mobile ERP, CRM, and on-demand platforms.",
      "Implement smooth gesture-driven animations and responsive multi-screen layouts.",
      "Build native device bridges, biometric authentication, and offline synchronization.",
      "Manage release pipelines for Google Play Store and Apple App Store.",
    ],
    datePosted: "2026-11-05",
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer (Node.js / Databases)",
    department: "Engineering",
    category: "engineering",
    type: "Full-time",
    location: "Remote (Global / South Asia)",
    experience: "3+ Years Experience",
    summary:
      "Architect secure, scalable APIs, database models, and cloud infrastructure for multi-tenant enterprise software and payment systems.",
    skills: ["Node.js", "TypeScript", "PostgreSQL", "Supabase", "REST / tRPC", "Redis", "Docker"],
    responsibilities: [
      "Design resilient relational database schemas, transactions, and row-level security.",
      "Build high-throughput backend services and secure webhook/payment handlers.",
      "Write automated integration tests and manage CI/CD deployment pipelines.",
      "Conduct security audits, data encryption, and performance tuning.",
    ],
    datePosted: "2026-11-08",
  },
  {
    id: "uiux-designer",
    title: "UI/UX Product Designer",
    department: "Design",
    category: "design",
    type: "Full-time / Contract",
    location: "Remote (Global / South Asia)",
    experience: "2+ Years Experience",
    summary:
      "Shape user journeys, high-fidelity prototypes, and design systems for enterprise web portals, SaaS platforms, and mobile apps.",
    skills: [
      "Figma",
      "Design Systems",
      "Design Tokens",
      "Wireframing",
      "User Research",
      "Prototyping",
    ],
    responsibilities: [
      "Create systematic UI specifications using structured color and spacing tokens.",
      "Produce interactive Figma prototypes for client presentation and developer handoff.",
      "Conduct user research to solve complex enterprise workflows and data dashboards.",
      "Ensure all interfaces meet strict WCAG accessibility and contrast standards.",
    ],
    datePosted: "2026-11-10",
  },
];

const HIRING_STEPS = [
  {
    step: "01",
    title: "Application Review",
    desc: "Submit your resume and portfolio or GitHub. We review your past projects and craftsmanship within 3 business days.",
  },
  {
    step: "02",
    title: "Introductory Chat",
    desc: "A relaxed 30-minute conversation to get to know each other, discuss your aspirations, and answer your questions about Ozeonix.",
  },
  {
    step: "03",
    title: "Practical Code Review",
    desc: "A real-world discussion around your past code or a short practical task. Zero trick questions or whiteboard trivia.",
  },
  {
    step: "04",
    title: "Offer & Onboarding",
    desc: "Clear, transparent offer package with roadmap details, team welcome, and everything needed to start smoothly.",
  },
];

function Careers() {
  const [filter, setFilter] = useState("all");

  const filteredRoles = filter === "all" ? ROLES : ROLES.filter((r) => r.category === filter);

  // Generate Google Jobs Schema
  const jobsSchema = {
    "@context": "https://schema.org",
    "@graph": ROLES.map((role) => ({
      "@type": "JobPosting",
      title: role.title,
      description: `${role.summary} Key responsibilities: ${role.responsibilities.join(", ")}. Requirements: ${role.skills.join(", ")}.`,
      identifier: {
        "@type": "PropertyValue",
        name: "Ozeonix Infinity",
        value: role.id,
      },
      datePosted: role.datePosted,
      employmentType: "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Ozeonix Infinity",
        sameAs: "https://ozeonix.com",
        logo: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
      },
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "Worldwide",
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          value: "Competitive",
          unitText: "MONTH",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsSchema) }}
      />

      {/* Hero Section */}
      <section
        className="oz-open"
        aria-label="Careers at Ozeonix Infinity: join our engineering and design team"
      >
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Careers at Ozeonix</span>
                <h1>Build software that matters. Grow with a craft-first team.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We are a focused technology studio engineering custom CRM, ERP, LMS, and web and
                  mobile applications. We keep our team small on purpose so every engineer and
                  designer has direct ownership, autonomy, and room to ship their finest work.
                </p>
                <div className="oz-open__meta">
                  {STATS.map((s) => (
                    <span key={s.l}>
                      <strong>{s.n}</strong> {s.l}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                  <a href="#open-roles" className="oz-btn oz-btn--primary">
                    View open roles <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <Link to="/about" className="oz-btn oz-btn--outline">
                    Our story & values
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Culture & Pillars Section */}
      <section className="oz-section oz-section--tight" aria-label="Our workplace culture">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Life at Ozeonix</span>
            </Reveal>
            <Reveal index={1} as="h2">
              How we build, collaborate, and grow together.
            </Reveal>
          </div>

          <div className="oz-grid oz-grid-3">
            {CULTURE_PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} index={i % 3}>
                <article
                  className="oz-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    overflow: "hidden",
                    padding: 0,
                  }}
                >
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}>
                    <img
                      src={pillar.image}
                      alt={pillar.alt}
                      width={700}
                      height={438}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "24px 20px 28px",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <h3 style={{ fontSize: "1.1875rem", marginBottom: 10 }}>{pillar.title}</h3>
                    <p
                      className="oz-muted"
                      style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6 }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks Grid */}
      <section className="oz-section oz-section--muted" aria-label="Benefits and perks">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Perks & Benefits</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Designed so you can focus on doing your best work.
            </Reveal>
          </div>

          <div className="oz-grid oz-grid-3">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} index={i % 3}>
                  <article className="oz-card" style={{ height: "100%" }}>
                    <span className="oz-card__icon" aria-hidden="true">
                      <Icon size={22} strokeWidth={1.8} />
                    </span>
                    <h3 style={{ fontSize: "1.125rem", margin: "14px 0 8px" }}>{benefit.title}</h3>
                    <p
                      className="oz-muted"
                      style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.55 }}
                    >
                      {benefit.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-roles" className="oz-section" aria-label="Current job openings">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Open Opportunities</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Find your next role at Ozeonix Infinity.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 640 }}>
                Explore open positions below. Every role is remote-first with flexible collaboration
                and real product impact.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 32,
              justifyContent: "flex-start",
            }}
          >
            {[
              { id: "all", label: `All Roles (${ROLES.length})` },
              { id: "engineering", label: "Engineering" },
              { id: "mobile", label: "Mobile" },
              { id: "design", label: "Design" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`oz-btn ${filter === tab.id ? "oz-btn--primary" : "oz-btn--outline"}`}
                style={{
                  padding: "8px 18px",
                  fontSize: "0.875rem",
                  minHeight: "38px",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Job Openings Grid */}
          <div style={{ display: "grid", gap: 20 }}>
            {filteredRoles.map((role, i) => (
              <Reveal key={role.id} index={i % 2}>
                <article
                  className="oz-card"
                  style={{
                    padding: "clamp(24px, 4vw, 32px)",
                    display: "grid",
                    gap: 18,
                    borderLeft: "4px solid var(--oz-primary)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                        <span className="oz-badge">{role.department}</span>
                        <span className="oz-badge" style={{ background: "var(--oz-surface)" }}>
                          {role.type}
                        </span>
                        <span className="oz-badge" style={{ background: "var(--oz-surface)" }}>
                          {role.location}
                        </span>
                      </div>
                      <h3 style={{ fontSize: "1.375rem", margin: "4px 0" }}>{role.title}</h3>
                      <span className="oz-muted" style={{ fontSize: "0.875rem" }}>
                        Experience: {role.experience}
                      </span>
                    </div>

                    <a
                      href={`mailto:careers@ozeonix.com?subject=Application for ${encodeURIComponent(role.title)}`}
                      className="oz-btn oz-btn--primary"
                      style={{ flexShrink: 0 }}
                    >
                      Apply for this role <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>

                  <p
                    className="oz-muted"
                    style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6 }}
                  >
                    {role.summary}
                  </p>

                  {/* Responsibilities */}
                  <div>
                    <h4 style={{ fontSize: "0.9375rem", marginBottom: 8, fontWeight: 600 }}>
                      What you will work on:
                    </h4>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "grid",
                        gap: 8,
                      }}
                    >
                      {role.responsibilities.map((resp) => (
                        <li
                          key={resp}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            fontSize: "0.875rem",
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{
                              flexShrink: 0,
                              marginTop: 2,
                              color: "var(--oz-primary)",
                            }}
                            aria-hidden="true"
                          />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills tags */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingTop: 8 }}>
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                          padding: "4px 10px",
                          borderRadius: 6,
                          background: "var(--oz-surface, #f9fafb)",
                          border: "1px solid var(--oz-border, #e5e7eb)",
                          color: "var(--oz-text, #374151)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="oz-section oz-section--tight" aria-label="Our hiring process">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Transparent Process</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Our four-step hiring journey.
            </Reveal>
          </div>

          <div className="oz-grid oz-grid-4">
            {HIRING_STEPS.map((step, i) => (
              <Reveal key={step.step} index={i % 4}>
                <article className="oz-card" style={{ height: "100%" }}>
                  <span
                    className="oz-badge"
                    style={{
                      alignSelf: "flex-start",
                      marginBottom: 14,
                      fontWeight: 700,
                      background: "var(--brand-orange-50, #fff7ed)",
                      color: "var(--brand-orange, #ea580c)",
                      border: "1px solid rgba(234, 88, 12, 0.2)",
                    }}
                  >
                    Step {step.step}
                  </span>
                  <h3 style={{ fontSize: "1.125rem", marginBottom: 8 }}>{step.title}</h3>
                  <p
                    className="oz-muted"
                    style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.55 }}
                  >
                    {step.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Section CTA */}
      <section className="oz-section oz-section--dark" aria-label="Open application">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">Don't See Your Role?</span>
          </Reveal>
          <Reveal index={1} as="h2">
            We are always excited to meet exceptional engineers & designers.
          </Reveal>
          <Reveal index={2}>
            <p className="oz-muted" style={{ maxWidth: 640, margin: "16px auto 32px" }}>
              If you’re passionate about building reliable software, modern UI/UX, or high-scale
              backends, tell us about what you’ve built and how you’d like to contribute.
            </p>
          </Reveal>
          <Reveal index={3}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="mailto:careers@ozeonix.com?subject=Open Application - General Inquiries"
                className="oz-btn oz-btn--primary"
              >
                Send open application <Send size={16} aria-hidden="true" />
              </a>
              <Link to="/portfolio" className="oz-btn oz-btn--on-dark">
                Explore our projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
