import React, { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import Reveal from "../Reveal.jsx";
import ResponsiveImage from "../ResponsiveImage.jsx";
import ProjectBriefForm from "../ProjectBriefForm.jsx";
import HeroIllustration from "../HeroIllustration.jsx";
import TechnologiesSection from "../TechnologiesSection.jsx";
import { useMarket } from "../../lib/market/MarketContext";
import processTeam480 from "../../assets/process-team-480.webp";
import processTeam768 from "../../assets/process-team-768.webp";
import processTeam1024 from "../../assets/process-team-1024.webp";
import processDesignSprint from "../../assets/process-design-sprint.webp";
import processCodeQuality from "../../assets/process-code-quality.webp";

import {
  Rocket,
  Users,
  Building2,
  ShieldCheck,
  MapPin,
  Compass,
  ClipboardList,
  PenTool,
  Code2,
  TestTube2,
  LifeBuoy,
  CheckCircle2,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  MonitorSmartphone,
  GraduationCap,
  Boxes,
  ShoppingBag,
  Activity,
  Briefcase,
  TrendingUp,
  Sparkles,
  HelpCircle,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

export const PORTFOLIO = [
  {
    t: "School Management System",
    tag: "ERP · Demo",
    d: "Students, attendance, fees, exams, staff and parent communication.",
    tech: "Flutter · Node · REST",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
  },
  {
    t: "College ERP Platform",
    tag: "ERP · Demo",
    d: "Admissions, academics, faculty, finance and administration.",
    tech: "Flutter · API · DB",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    t: "Business CRM Platform",
    tag: "CRM · Demo",
    d: "Leads, sales pipelines, invoices, follow-ups and support.",
    tech: "Flutter · Cloud DB",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80",
  },
  {
    t: "Corporate Website",
    tag: "Web",
    d: "Responsive, SEO-friendly corporate presence with contact flow.",
    tech: "React · SEO",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    t: "Portfolio Websites",
    tag: "Web",
    d: "Elegant portfolios for creators, freelancers and studios.",
    tech: "React · CMS",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    t: "Custom Web Applications",
    tag: "SaaS",
    d: "Business apps that automate processes and improve efficiency.",
    tech: "Full-stack",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
];

export const PROCESS = [
  {
    s: "01",
    t: "Discovery",
    d: "We learn your business, users and goals before writing a single line.",
    Icon: Compass,
    dur: "3–5 days",
    tags: ["Requirements Spec", "Architecture Map", "Risk Audit"],
  },
  {
    s: "02",
    t: "Planning",
    d: "A clear roadmap with scope, timeline, milestones and stack.",
    Icon: ClipboardList,
    dur: "1 week",
    tags: ["Milestone Sprints", "Tech Selection", "Fixed Budget"],
  },
  {
    s: "03",
    t: "UI/UX Design",
    d: "Wireframes and polished interfaces built for real usability.",
    Icon: PenTool,
    dur: "1–2 weeks",
    tags: ["Figma Prototype", "Design Tokens", "Design Review"],
  },
  {
    s: "04",
    t: "Development",
    d: "Scalable, secure engineering with regular check-ins.",
    Icon: Code2,
    dur: "4–10 weeks",
    tags: ["Clean Codebase", "Weekly Demos", "CI/CD Pipeline"],
  },
  {
    s: "05",
    t: "Testing & QA",
    d: "Cross-device, cross-browser, performance and accessibility.",
    Icon: TestTube2,
    dur: "1 week",
    tags: ["Security Audit", "Lighthouse 95+", "WCAG A11y"],
  },
  {
    s: "06",
    t: "Launch & Support",
    d: "Deployment, monitoring, maintenance and continuous improvement.",
    Icon: LifeBuoy,
    dur: "Ongoing",
    tags: ["Cloud Deploy", "Zero Downtime", "SLA Warranty"],
  },
];

export const STATS = [
  { n: "25+", l: "Projects Completed", Icon: Rocket },
  { n: "20+", l: "Happy Clients", Icon: Users },
  { n: "10+", l: "Industries Served", Icon: Building2 },
  { n: "99.9%", l: "System Uptime", Icon: ShieldCheck },
];

export const FAQS = [
  {
    q: "What software solution is best for a growing business?",
    a: "The right solution fits your workflow rather than forcing a generic template. We build reliable CRM and ERP systems around your operations, team and growth goals.",
  },
  {
    q: "Do you build custom CRM and ERP software?",
    a: "Yes. We design custom CRM and ERP platforms covering inventory, accounting, sales pipelines and HR, with workflows shaped around each business.",
  },
  {
    q: "Can you build a Learning Management System for a school or college?",
    a: "Absolutely. We build scalable LMS platforms with student tracking, content delivery, exam modules, attendance and parent communication.",
  },
  {
    q: "Do you develop mobile apps for businesses?",
    a: "Yes. We build responsive, cross-platform Android and iOS applications with Flutter and modern web technologies.",
  },
  {
    q: "Why choose Ozeonix Infinity for a custom software project?",
    a: "You work directly with the product team from discovery through launch, with clear milestones, practical communication and ongoing support.",
  },
  {
    q: "How do I get started with a project?",
    a: "Send us your requirements via WhatsApp or the contact form. We'll schedule a short discovery call, share a written proposal with timeline and pricing, and begin work once you approve it.",
  },
];

export const LOCAL_SERVICES = [
  {
    t: "Custom ERP Solutions for Growing Businesses",
    d: "We help growing businesses digitize operations through custom ERP software that connects inventory, accounting, purchasing, HR and reporting.",
    proof: "Structured rollout, team training and dependable post-launch support.",
  },
  {
    t: "Scalable Learning Management Systems (LMS) for Educational Institutions",
    d: "Modern LMS platforms for schools and colleges - student tracking, digital content delivery, online exams, attendance and parent communication, built around each institution’s workflow.",
    proof:
      "Designed with local teachers and administrators so daily academic operations actually get easier, not harder.",
  },
  {
    t: "Tailored CRM Platforms to Accelerate Sales Growth",
    d: "CRM systems built around how your team actually sells - lead capture, follow-up reminders, quotations, invoices and pipeline reporting, tuned to local market sales processes.",
    proof: "Integrations with WhatsApp, SMS gateways and the payment providers your team uses.",
  },
  {
    t: "Full-Stack Web and Mobile App Development for Modern Digital Businesses",
    d: "High-performance websites and cross-platform apps built with React, Node.js, Firebase and Flutter - focused on speed, SEO and a great experience on any device.",
    proof: "Every project is delivered with direct access to the team designing and building it.",
  },
];

export const TRUST_INDUSTRIES = [
  { label: "Schools & Colleges", icon: GraduationCap },
  { label: "Retail & Inventory", icon: ShoppingBag },
  { label: "Healthcare", icon: Activity },
  { label: "Professional Services", icon: Briefcase },
  { label: "Growing SMEs", icon: TrendingUp },
];

export const QUICK_LINKS = [
  {
    to: "/services/crm-solutions",
    title: "CRM systems",
    desc: "Convert and retain more customers",
    icon: Users,
  },
  {
    to: "/services/erp-development",
    title: "ERP platforms",
    desc: "Connect finance, people and operations",
    icon: Boxes,
  },
  {
    to: "/services/lms-platforms",
    title: "LMS solutions",
    desc: "Modern learning for schools and teams",
    icon: GraduationCap,
  },
  {
    to: "/services",
    title: "Web & mobile",
    desc: "Fast experiences on every screen",
    icon: MonitorSmartphone,
  },
];

export default function HomePageView() {
  const { currentMarket, getLocalizedPath } = useMarket();

  // Slow-device / data-saver graceful fallback: mark <html> so animations pause.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const saveData = conn?.saveData === true;
    const slowNet = conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType);
    const lowMem = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2;
    if (saveData || slowNet || lowMem) root.classList.add("oz-lite");
    return () => root.classList.remove("oz-lite");
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="oz-hero oz-home-hero" aria-labelledby="hero-heading">
        <div className="oz-container">
          <div className="oz-home-hero__grid">
            <div className="oz-home-hero__copy">
              <Reveal>
                <span className="oz-eyebrow">{currentMarket.heroTagline}</span>
              </Reveal>
              <Reveal index={1} as="h1" id="hero-heading" className="oz-home-hero__title">
                Ozeonix Infinity builds <span>business software that fits how you work.</span>
              </Reveal>
              <Reveal index={2}>
                <p className="oz-hero__lead">{currentMarket.heroSubtitle}</p>
              </Reveal>
              <Reveal index={3}>
                <div className="oz-hero__actions">
                  <Link to={getLocalizedPath("/contact")} className="oz-btn oz-btn--primary">
                    Discuss your project <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                  <Link to="/portfolio" className="oz-btn oz-btn--outline">
                    View selected work
                  </Link>
                </div>
              </Reveal>
              <Reveal index={4}>
                <dl
                  className="oz-home-hero__proof"
                  aria-label="Ozeonix Infinity service highlights"
                >
                  <div>
                    <dt>Direct</dt>
                    <dd>Access to senior product team</dd>
                  </div>
                  <div>
                    <dt>Custom</dt>
                    <dd>Built around your workflow</dd>
                  </div>
                  <div>
                    <dt>Market-Tuned</dt>
                    <dd>{currentMarket.name} currency &amp; standards</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            <div className="oz-home-hero__visual" aria-hidden="true">
              <Reveal index={2} direction="right">
                <HeroIllustration />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST AND QUICK LINKS */}
      <section className="oz-home-trust" aria-label="Industries and capabilities">
        <div className="oz-container">
          <Reveal>
            <div className="oz-home-trust__header">
              <span className="oz-home-trust__eyebrow">
                <Sparkles size={13} className="oz-home-trust__sparkle" aria-hidden="true" />
                <span>
                  Built for ambitious teams across industries in {currentMarket.region} &amp;
                  globally
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="oz-home-trust__items" role="list" aria-label="Industries we serve">
              {TRUST_INDUSTRIES.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label} className="oz-home-trust__pill" role="listitem">
                    <span className="oz-home-trust__pill-icon" aria-hidden="true">
                      <IconComponent size={15} />
                    </span>
                    <span className="oz-home-trust__pill-text">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <nav className="oz-home-quicklinks" aria-label="Featured solutions">
            {QUICK_LINKS.map((link, idx) => {
              const IconComp = link.icon;
              return (
                <Reveal key={link.to} index={idx} as="div" className="oz-home-quicklink-slot">
                  <Link to={link.to} className="oz-home-quicklink-card">
                    <div className="oz-home-quicklink__icon-box" aria-hidden="true">
                      <IconComp size={20} />
                    </div>
                    <div className="oz-home-quicklink__content">
                      <strong className="oz-home-quicklink__title">{link.title}</strong>
                      <small className="oz-home-quicklink__desc">{link.desc}</small>
                    </div>
                    <div className="oz-home-quicklink__arrow" aria-hidden="true">
                      <ArrowRight size={17} />
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </nav>
        </div>
      </section>

      {/* LOCAL SEO SERVICES */}
      <section className="oz-section oz-home-solutions" aria-label="Software development services">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Our capabilities</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Software development built around your ambition.
            </Reveal>
          </div>
          <div className="oz-home-solutions__grid">
            {LOCAL_SERVICES.map((s, i) => (
              <Reveal key={s.t} index={i % 2}>
                <article className="oz-card oz-home-solution">
                  <span className="oz-home-solution__number">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <p className="oz-home-solution__proof">
                    <strong>Practical fit</strong>
                    {s.proof}
                  </p>
                  <Link to="/services" className="oz-home-solution__link">
                    Explore this capability <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="oz-section oz-section--muted oz-home-work" aria-label="Portfolio">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Portfolio</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Digital products your customers and teams can rely on.
            </Reveal>
          </div>
          <div className="oz-home-work__grid">
            {PORTFOLIO.slice(0, 3).map((p, i) => (
              <Reveal key={p.t} index={i % 3}>
                <article className="oz-card oz-card--media">
                  <div className="oz-card__media" aria-hidden="true">
                    <ResponsiveImage
                      src={p.img}
                      alt=""
                      width={800}
                      height={500}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="oz-card__body">
                    <span
                      className="oz-badge"
                      style={{ alignSelf: "flex-start", marginBottom: 12 }}
                    >
                      {p.tag}
                    </span>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: "0.8rem",
                        color: "var(--oz-primary)",
                        fontWeight: 600,
                      }}
                    >
                      {p.tech}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="oz-section oz-process-section" aria-label="Development Process">
        <div className="oz-process-bg-glow" aria-hidden="true" />
        <div className="oz-container" style={{ position: "relative" }}>
          <div className="oz-process-grid">
            {/* LEFT COLUMN: Header, Process Steps (Icon-Boxes), Guarantees & Action CTA */}
            <div className="oz-process-content-col">
              <div className="oz-process-head">
                <Reveal>
                  <span className="oz-eyebrow">Development Process</span>
                </Reveal>
                <Reveal index={1} as="h2" className="oz-process-main-title">
                  A calm, predictable path from idea to launch.
                </Reveal>
                <Reveal index={2}>
                  <p className="oz-process-lead">
                    Our proven six-step framework combines agile velocity with enterprise rigor,
                    enabling greater efficiency, agility, and transparency across custom CRM, ERP,
                    and modern enterprise software.
                  </p>
                </Reveal>
              </div>

              {/* 6 Step Icon-Boxes */}
              <ol className="oz-process-steps-list">
                {PROCESS.map((p, i) => {
                  const I = p.Icon;
                  return (
                    <Reveal key={p.s} index={i % 3} as="li">
                      <article className="oz-process-step">
                        <div className="oz-process-step-icon-wrap" aria-hidden="true">
                          <span className="oz-process-icon-circle">
                            <I size={22} strokeWidth={2} />
                          </span>
                        </div>
                        <div className="oz-process-step-content">
                          <div className="oz-process-step-meta">
                            <span className="oz-process-step-num">Step {p.s}</span>
                            <span className="oz-process-step-dur">
                              <Clock size={13} aria-hidden="true" />
                              {p.dur}
                            </span>
                          </div>
                          <h3 className="oz-process-step-title">{p.t}</h3>
                          <p className="oz-process-step-desc">{p.d}</p>
                          {p.tags && p.tags.length > 0 && (
                            <div className="oz-process-tags" aria-label={`Deliverables for ${p.t}`}>
                              {p.tags.map((tag) => (
                                <span key={tag} className="oz-process-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ol>

              {/* Guarantees & Lead CTA Button */}
              <Reveal>
                <div className="oz-process-content-footer">
                  <ul className="oz-process-guarantees" aria-label="Process guarantees">
                    <li className="oz-process-guarantee-item">
                      <CheckCircle2
                        size={16}
                        className="oz-process-guarantee-icon"
                        aria-hidden="true"
                      />
                      <span>Milestone-based delivery with fixed scopes</span>
                    </li>
                    <li className="oz-process-guarantee-item">
                      <CheckCircle2
                        size={16}
                        className="oz-process-guarantee-icon"
                        aria-hidden="true"
                      />
                      <span>Direct communication with senior engineers</span>
                    </li>
                    <li className="oz-process-guarantee-item">
                      <CheckCircle2
                        size={16}
                        className="oz-process-guarantee-icon"
                        aria-hidden="true"
                      />
                      <span>Comprehensive documentation &amp; post-launch warranty</span>
                    </li>
                  </ul>

                  <Link
                    to={getLocalizedPath("/contact")}
                    className="oz-btn oz-btn--primary oz-process-lead-btn"
                  >
                    Discuss your project
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: Layered Multi-Image Showcase Collage & Stats */}
            <div className="oz-process-showcase-col">
              <Reveal>
                <div className="oz-process-sticky">
                  {/* Layered Image Composition */}
                  <div className="oz-process-collage">
                    {/* Primary Anchor / Base Image */}
                    <div className="oz-process-collage__main">
                      <ResponsiveImage
                        src={processTeam1024}
                        alt="Ozeonix Infinity software engineering team collaborating on project architecture"
                        width={1024}
                        height={1280}
                        widths={[480, 768, 1024]}
                        srcSet={`${processTeam480} 480w, ${processTeam768} 768w, ${processTeam1024} 1024w`}
                        sizes="(max-width: 900px) calc(100vw - 2rem), (max-width: 1280px) 44vw, 520px"
                        pictureClassName="oz-process-picture"
                        className="oz-process-image"
                      />
                      <div className="oz-process-hero-overlay" aria-hidden="true" />
                      <div className="oz-process-hero-badge">
                        <span className="oz-process-pulse-dot" aria-hidden="true" />
                        Structured Delivery
                      </div>
                      <div className="oz-process-hero-caption">
                        <h3 className="oz-process-hero-title">Engineering Discipline</h3>
                        <p className="oz-process-hero-desc">
                          A proven six-step framework used across custom CRM, ERP, and enterprise
                          web solutions.
                        </p>
                      </div>
                    </div>

                    {/* Absolute Floating Card 1: UI/UX & Architecture Sprint */}
                    <div className="oz-process-collage__float oz-process-collage__float--top">
                      <div className="oz-process-float-card">
                        <div className="oz-process-float-img-wrap">
                          <img
                            src={processDesignSprint}
                            alt="UI/UX design tokens and architecture prototyping"
                            loading="lazy"
                            width={800}
                            height={533}
                            className="oz-process-float-img"
                          />
                          <div className="oz-process-float-overlay" />
                        </div>
                      </div>
                    </div>

                    {/* Absolute Floating Card 2: Code Quality & CI/CD */}
                    <div className="oz-process-collage__float oz-process-collage__float--bottom">
                      <div className="oz-process-float-card">
                        <div className="oz-process-float-img-wrap">
                          <img
                            src={processCodeQuality}
                            alt="Clean code engineering and automated CI/CD pipeline"
                            loading="lazy"
                            width={800}
                            height={533}
                            className="oz-process-float-img"
                          />
                          <div className="oz-process-float-overlay" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Stat Tiles */}
                  <div className="oz-process-stats">
                    <div className="oz-process-stat-tile">
                      <div className="oz-process-stat-val">6</div>
                      <div className="oz-process-stat-lbl">Structured Phases</div>
                    </div>
                    <div className="oz-process-stat-tile">
                      <div className="oz-process-stat-val">2×</div>
                      <div className="oz-process-stat-lbl">Weekly Sprint Demos</div>
                    </div>
                    <div className="oz-process-stat-tile">
                      <div className="oz-process-stat-val">100%</div>
                      <div className="oz-process-stat-lbl">Code &amp; IP Ownership</div>
                    </div>
                    <div className="oz-process-stat-tile">
                      <div className="oz-process-stat-val">Zero</div>
                      <div className="oz-process-stat-lbl">Surprise Scope Creep</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom Process CTA Banner */}
          <Reveal>
            <div className="oz-process-cta">
              <div className="oz-process-cta-left">
                <div className="oz-process-cta-icon" aria-hidden="true">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="oz-process-cta-title">
                    Ready to turn your vision into a clear, predictable plan?
                  </h4>
                  <p className="oz-process-cta-sub">
                    Get an actionable roadmap, timeline, and fixed quote within 48 hours.
                  </p>
                </div>
              </div>
              <Link to={getLocalizedPath("/contact")} className="oz-btn oz-btn--primary">
                Start Your Project
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <TechnologiesSection />

      {/* STATISTICS */}
      <section className="oz-section oz-section--dark" aria-label="By the Numbers">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">By the Numbers</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Growing with every <span className="oz-text-accent">successful delivery.</span>
            </Reveal>
          </div>
          <div className="oz-stats">
            {STATS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <Reveal key={s.l} index={i}>
                  <div className="oz-stat">
                    <span className="oz-stat__icon">
                      <Icon size={28} strokeWidth={2} />
                    </span>
                    <strong>{s.n}</strong>
                    <span>{s.l}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="oz-section oz-section--muted oz-section-faq" aria-label="FAQ">
        <div className="oz-container oz-container--narrow">
          <div className="oz-section-head oz-faq-header">
            <Reveal>
              <span className="oz-faq-eyebrow">
                <HelpCircle size={14} aria-hidden="true" />
                <span>FAQ &amp; Knowledge Base</span>
              </span>
            </Reveal>
            <Reveal index={1} as="h2">
              Answers to common questions.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-faq-header__desc">
                Everything you need to know about our software engineering workflow, custom CRM
                &amp; ERP platforms, LMS solutions, and engagement model.
              </p>
            </Reveal>
          </div>
          <div className="oz-faq-stack">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i % 3}>
                <details className="oz-faq-card" open={i === 0}>
                  <summary className="oz-faq-card__trigger">
                    <div className="oz-faq-card__left">
                      <span className="oz-faq-card__index" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="oz-faq-card__q">{f.q}</span>
                    </div>
                    <span className="oz-faq-card__chevron" aria-hidden="true">
                      <ChevronDown size={18} />
                    </span>
                  </summary>
                  <div className="oz-faq-card__content">
                    <div className="oz-faq-card__divider" aria-hidden="true" />
                    <p className="oz-faq-card__ans">{f.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal index={1}>
            <div className="oz-faq-help">
              <div className="oz-faq-help__left">
                <div className="oz-faq-help__icon-box" aria-hidden="true">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="oz-faq-help__title">Have a question not listed here?</h4>
                  <p className="oz-faq-help__desc">
                    Talk directly with our software engineering leads. Get an honest scope,
                    timeline, and estimate.
                  </p>
                </div>
              </div>
              <div className="oz-faq-help__actions">
                <a
                  href={`https://wa.me/${currentMarket.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oz-faq-btn-wa"
                >
                  <img
                    src="/assets/whatsapp-icon.png"
                    alt=""
                    aria-hidden="true"
                    width="18"
                    height="18"
                  />
                  <span>WhatsApp Us</span>
                </a>
                <Link to={getLocalizedPath("/contact")} className="oz-faq-btn-contact">
                  <span>Project Brief</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="oz-section oz-section--muted"
        id="contact"
        style={{ position: "relative", overflow: "hidden" }}
        aria-label="Contact"
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(60% 50% at 15% 10%, color-mix(in oklab, var(--oz-primary) 12%, transparent), transparent 60%), radial-gradient(50% 40% at 90% 90%, color-mix(in oklab, var(--oz-primary) 10%, transparent), transparent 60%)",
          }}
        />
        <div className="oz-container" style={{ position: "relative" }}>
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Contact</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Let’s start a conversation.
            </Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 620, margin: "12px auto 0" }}>
                Tell us about your project - CRM, ERP, LMS, website or mobile app. We usually reply
                within a business day.
              </p>
            </Reveal>
          </div>

          <div className="oz-contact-grid">
            {/* LEFT: Info panel */}
            <Reveal>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  padding: 28,
                  borderRadius: 20,
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--oz-primary) 92%, #000) 0%, color-mix(in oklab, var(--oz-primary) 70%, #000) 100%)",
                  color: "#fff",
                  boxShadow:
                    "0 20px 50px -20px color-mix(in oklab, var(--oz-primary) 55%, transparent)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: -60,
                    right: -60,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -80,
                    left: -40,
                    width: 260,
                    height: 260,
                    borderRadius: "50%",
                    background: "rgba(0,0,0,0.15)",
                  }}
                />

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    alignSelf: "flex-start",
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.15)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4ade80",
                      boxShadow: "0 0 0 4px rgba(74,222,128,0.25)",
                    }}
                  />
                  Direct conversation
                </span>

                <h3
                  style={{
                    color: "#fff",
                    margin: "6px 0 4px",
                    position: "relative",
                    fontSize: 26,
                    lineHeight: 1.2,
                  }}
                >
                  Talk directly to a product engineer.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, position: "relative" }}>
                  No sales script. Get an honest scope, timeline and price for your custom software.
                </p>

                <div style={{ display: "grid", gap: 12, marginTop: 18, position: "relative" }}>
                  {[
                    {
                      Icon: MessageCircle,
                      label: "WhatsApp",
                      value: currentMarket.whatsappDisplay,
                      href: `https://wa.me/${currentMarket.whatsapp}`,
                    },
                    currentMarket.phone
                      ? {
                          Icon: Phone,
                          label: "Call us",
                          value: currentMarket.phone,
                          href: `tel:${currentMarket.phone.replace(/[^+\d]/g, "")}`,
                        }
                      : {
                          Icon: Mail,
                          label: "Email desk",
                          value: currentMarket.email,
                          href: `mailto:${currentMarket.email}`,
                        },
                    {
                      Icon: MapPin,
                      label: "Presence",
                      value: currentMarket.address || "Worldwide Engineering & Client Support",
                    },
                    { Icon: Clock, label: "Response", value: "Usually within one business day" },
                  ].map(({ Icon, label, value, href }) => {
                    const body = (
                      <>
                        <span
                          style={{
                            display: "grid",
                            placeItems: "center",
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            background: "rgba(255,255,255,0.15)",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} />
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: 11,
                              letterSpacing: 0.6,
                              textTransform: "uppercase",
                              opacity: 0.75,
                            }}
                          >
                            {label}
                          </span>
                          <span style={{ fontWeight: 600, wordBreak: "break-word" }}>{value}</span>
                        </span>
                      </>
                    );
                    return href ? (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                          padding: 12,
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.08)",
                          color: "#fff",
                          textDecoration: "none",
                          transition: "background 0.2s",
                        }}
                      >
                        {body}
                      </a>
                    ) : (
                      <div
                        key={label}
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "center",
                          padding: 12,
                          borderRadius: 14,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      >
                        {body}
                      </div>
                    );
                  })}
                </div>

                <a
                  href={`https://wa.me/${currentMarket.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "14px 18px",
                    borderRadius: 12,
                    background: "#fff",
                    color: "var(--oz-primary)",
                    fontWeight: 700,
                    textDecoration: "none",
                    position: "relative",
                    boxShadow: "0 10px 25px -10px rgba(0,0,0,0.35)",
                  }}
                >
                  Chat on WhatsApp <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal index={1}>
              <ProjectBriefForm formLocation="homepage" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
