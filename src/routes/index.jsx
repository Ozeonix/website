import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import Reveal from "../components/Reveal.jsx";
import ResponsiveImage from "../components/ResponsiveImage.jsx";
import ProjectBriefForm from "../components/ProjectBriefForm.jsx";
import processTeam480 from "../assets/process-team-480.webp";
import processTeam768 from "../assets/process-team-768.webp";
import processTeam1024 from "../assets/process-team-1024.webp";

import { Rocket, Users, Building2, ShieldCheck, MapPin, Compass, ClipboardList, PenTool, Code2, TestTube2, LifeBuoy, CheckCircle2, MessageCircle, Phone, Clock, ArrowRight, MonitorSmartphone, GraduationCap, BarChart3, Boxes, Smartphone } from "lucide-react";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Custom CRM, ERP, LMS, Web & Mobile Development | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Ozeonix Infinity builds custom CRM, ERP, LMS, websites and mobile apps for ambitious businesses and institutions. Shape The Thought. Power Tomorrow.",
      },
      { property: "og:title", content: "Ozeonix Infinity | Shape The Thought. Power Tomorrow" },
      { property: "og:description", content: "Custom CRM, ERP, LMS, website and mobile app solutions built around your goals. Discuss your project with Ozeonix Infinity." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(LOCALBUSINESS_JSONLD),
      },
    ],
  }),
  component: Home,
});


const PORTFOLIO = [
  { t: "School Management System", tag: "ERP · Demo", d: "Students, attendance, fees, exams, staff and parent communication.", tech: "Flutter · Node · REST", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" },
  { t: "College ERP Platform", tag: "ERP · Demo", d: "Admissions, academics, faculty, finance and administration.", tech: "Flutter · API · DB", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80" },
  { t: "Business CRM Platform", tag: "CRM · Demo", d: "Leads, sales pipelines, invoices, follow-ups and support.", tech: "Flutter · Cloud DB", img: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1200&q=80" },
  { t: "Corporate Website", tag: "Web", d: "Responsive, SEO-friendly corporate presence with contact flow.", tech: "React · SEO", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" },
  { t: "Portfolio Websites", tag: "Web", d: "Elegant portfolios for creators, freelancers and studios.", tech: "React · CMS", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80" },
  { t: "Custom Web Applications", tag: "SaaS", d: "Business apps that automate processes and improve efficiency.", tech: "Full-stack", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
];

const PROCESS = [
  { s: "01", t: "Discovery", d: "We learn your business, users and goals before writing a single line.", Icon: Compass, dur: "3–5 days" },
  { s: "02", t: "Planning", d: "A clear roadmap with scope, timeline, milestones and stack.", Icon: ClipboardList, dur: "1 week" },
  { s: "03", t: "UI/UX Design", d: "Wireframes and polished interfaces built for real usability.", Icon: PenTool, dur: "1–2 weeks" },
  { s: "04", t: "Development", d: "Scalable, secure engineering with regular check-ins.", Icon: Code2, dur: "4–10 weeks" },
  { s: "05", t: "Testing & QA", d: "Cross-device, cross-browser, performance and accessibility.", Icon: TestTube2, dur: "1 week" },
  { s: "06", t: "Launch & Support", d: "Deployment, monitoring, maintenance and continuous improvement.", Icon: LifeBuoy, dur: "Ongoing" },
];

const TECH = ["React", "Next.js", "Node.js", "Flutter", "MongoDB", "PostgreSQL", "Firebase", "AWS", "Docker", "Kubernetes", "REST APIs", "AI"];

const STATS = [
  { n: "25+", l: "Projects Completed", Icon: Rocket },
  { n: "20+", l: "Happy Clients", Icon: Users },
  { n: "10+", l: "Industries Served", Icon: Building2 },
  { n: "99.9%", l: "System Uptime", Icon: ShieldCheck },
];

const FAQS = [
  { q: "What software solution is best for a growing business?", a: "The right solution fits your workflow rather than forcing a generic template. We build reliable CRM and ERP systems around your operations, team and growth goals." },
  { q: "Do you build custom CRM and ERP software?", a: "Yes. We design custom CRM and ERP platforms covering inventory, accounting, sales pipelines and HR, with workflows shaped around each business." },
  { q: "Can you build a Learning Management System for a school or college?", a: "Absolutely. We build scalable LMS platforms with student tracking, content delivery, exam modules, attendance and parent communication." },
  { q: "Do you develop mobile apps for businesses?", a: "Yes. We build responsive, cross-platform Android and iOS applications with Flutter and modern web technologies." },
  { q: "Why choose Ozeonix Infinity for a custom software project?", a: "You work directly with the product team from discovery through launch, with clear milestones, practical communication and ongoing support." },
  { q: "How do I get started with a project?", a: "Send us your requirements via WhatsApp or the contact form. We'll schedule a short discovery call, share a written proposal with timeline and pricing, and begin work once you approve it." },
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

const LOCALBUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Ozeonix Infinity",
  url: "https://ozeonix.com",
  logo: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
  description:
    "Custom software development studio building CRM, ERP, LMS, websites and mobile apps for businesses and educational institutions.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Android, iOS",
  provider: {
    "@type": "Organization",
    name: "Ozeonix Infinity",
    image: "https://ozeonix.com/assets/ozeonix-infinity-nav-logo.png",
    telephone: "+977-7483509984",
    url: "https://ozeonix.com",
    areaServed: "Worldwide",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["English", "Nepali", "Hindi"],
      telephone: "+977-7483509984",
    },
    sameAs: [
      "https://www.linkedin.com/company/ozeonix-infinity",
      "https://www.instagram.com/ozeonix.infinity",
      "https://www.facebook.com/ozeonix.infinity",
    ],
  },
};

const LOCAL_SERVICES = [
  {
    t: "Custom ERP Solutions for Growing Businesses",
    d: "We help growing businesses digitize operations through custom ERP software that connects inventory, accounting, purchasing, HR and reporting.",
    proof: "Structured rollout, team training and dependable post-launch support.",
  },
  {
    t: "Scalable Learning Management Systems (LMS) for Educational Institutions",
    d: "Modern LMS platforms for schools and colleges — student tracking, digital content delivery, online exams, attendance and parent communication, built around each institution’s workflow.",
    proof: "Designed with local teachers and administrators so daily academic operations actually get easier, not harder.",
  },
  {
    t: "Tailored CRM Platforms to Accelerate Sales Growth",
    d: "CRM systems built around how your team actually sells — lead capture, follow-up reminders, quotations, invoices and pipeline reporting, tuned to local market sales processes.",
    proof: "Integrations with WhatsApp, SMS gateways and the payment providers your team uses.",
  },
  {
    t: "Full-Stack Web and Mobile App Development for Modern Digital Businesses",
    d: "High-performance websites and cross-platform apps built with React, Node.js, Firebase and Flutter — focused on speed, SEO and a great experience on any device.",
    proof: "Every project is delivered with direct access to the team designing and building it.",
  },
];


function Home() {
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
              <Reveal><span className="oz-eyebrow">Shape The Thought. Power Tomorrow</span></Reveal>
              <Reveal index={1} as="h1" id="hero-heading" className="oz-home-hero__title">
                Ozeonix Infinity builds <span>business software that fits how you work.</span>
              </Reveal>
              <Reveal index={2}>
                <p className="oz-hero__lead">
                  Custom CRM, ERP, LMS, websites and mobile apps shaped around your goals—from first idea to launch and long-term support.
                </p>
              </Reveal>
              <Reveal index={3}>
                <div className="oz-hero__actions">
                  <Link to="/contact" className="oz-btn oz-btn--accent">Discuss your project <ArrowRight size={18} aria-hidden="true" /></Link>
                  <Link to="/portfolio" className="oz-btn oz-btn--outline">View selected work</Link>
                </div>
              </Reveal>
              <Reveal index={4}>
                <dl className="oz-home-hero__proof" aria-label="Ozeonix Infinity service highlights">
                  <div><dt>Direct</dt><dd>Access to your product team</dd></div>
                  <div><dt>Custom</dt><dd>Built around your workflow</dd></div>
                  <div><dt>End-to-end</dt><dd>Design, build and support</dd></div>
                </dl>
              </Reveal>
            </div>

            <Reveal index={2}>
              <div className="oz-product-collage" aria-label="CRM, ERP, LMS and mobile application interface preview">
                <div className="oz-product-collage__desktop">
                  <div className="oz-product-collage__topbar"><span /><span /><span /><b>Ozeonix Business OS</b></div>
                  <div className="oz-product-collage__dashboard">
                    <aside aria-hidden="true"><span className="is-active" /><span /><span /><span /></aside>
                    <div className="oz-product-collage__main">
                      <div className="oz-product-collage__heading"><div><small>ERP overview</small><strong>Business performance</strong></div><span>Live</span></div>
                      <div className="oz-product-collage__metrics">
                        <div><small>Revenue</small><strong>Rs 8.4L</strong><em>+18.4%</em></div>
                        <div><small>Open leads</small><strong>148</strong><em>+12 today</em></div>
                        <div><small>Tasks</small><strong>32</strong><em>8 due</em></div>
                      </div>
                      <div className="oz-product-collage__chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
                    </div>
                  </div>
                </div>
                <div className="oz-product-collage__mobile" aria-hidden="true">
                  <span className="oz-product-collage__notch" />
                  <small>Good morning</small><strong>Learning dashboard</strong>
                  <div className="oz-product-collage__course"><GraduationCap size={18} /><span><b>Course progress</b><i /></span><em>76%</em></div>
                  <div className="oz-product-collage__mobile-grid"><span /><span /><span /><span /></div>
                </div>
                <div className="oz-product-collage__float oz-product-collage__float--crm"><BarChart3 size={20} /><span><small>CRM pipeline</small><strong>24 active deals</strong></span></div>
                <div className="oz-product-collage__float oz-product-collage__float--apps"><Smartphone size={20} /><span><small>Mobile apps</small><strong>Android &amp; iOS</strong></span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST AND QUICK LINKS */}
      <section className="oz-section--tight oz-trusted oz-home-trust" aria-label="Industries and capabilities">
        <div className="oz-container">
          <p className="oz-home-trust__label">Built for ambitious teams</p>
          <div className="oz-home-trust__items">
            {["Schools & Colleges", "Retail & Inventory", "Healthcare", "Professional Services", "Growing SMEs"].map((item) => <span key={item}>{item}</span>)}
          </div>
          <nav className="oz-home-quicklinks" aria-label="Featured solutions">
            <Link to="/services/crm-solutions"><Users size={20} /><span><strong>CRM systems</strong><small>Convert and retain more customers</small></span><ArrowRight size={18} /></Link>
            <Link to="/services/erp-development"><Boxes size={20} /><span><strong>ERP platforms</strong><small>Connect finance, people and operations</small></span><ArrowRight size={18} /></Link>
            <Link to="/services/lms-platforms"><GraduationCap size={20} /><span><strong>LMS solutions</strong><small>Modern learning for schools and teams</small></span><ArrowRight size={18} /></Link>
            <Link to="/services"><MonitorSmartphone size={20} /><span><strong>Web &amp; mobile</strong><small>Fast experiences on every screen</small></span><ArrowRight size={18} /></Link>
          </nav>
        </div>
      </section>

      {/* LOCAL SEO SERVICES */}
      <section className="oz-section oz-home-solutions" aria-label="Software development services">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Our capabilities</span></Reveal>
            <Reveal index={1} as="h2">Software development built around your ambition.</Reveal>
          </div>
          <div className="oz-home-solutions__grid">
            {LOCAL_SERVICES.map((s, i) => (
              <Reveal key={s.t} index={i % 2}>
                <article className="oz-card oz-home-solution">
                  <span className="oz-home-solution__number">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <p className="oz-home-solution__proof"><strong>Practical fit</strong>{s.proof}</p>
                  <Link to="/services" className="oz-home-solution__link">Explore this capability <ArrowRight size={16} aria-hidden="true" /></Link>
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
            <Reveal><span className="oz-eyebrow">Portfolio</span></Reveal>
            <Reveal index={1} as="h2">Digital products your customers and teams can rely on.</Reveal>
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
                    <span className="oz-badge" style={{ alignSelf: "flex-start", marginBottom: 12 }}>{p.tag}</span>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                    <p style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--oz-primary)", fontWeight: 600 }}>{p.tech}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="oz-section oz-section--muted" style={{ position: "relative", overflow: "hidden" }} aria-label="Development Process">
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "radial-gradient(600px 300px at 90% 0%, color-mix(in oklab, var(--oz-primary) 10%, transparent), transparent 60%), radial-gradient(500px 260px at 0% 100%, color-mix(in oklab, var(--oz-primary) 8%, transparent), transparent 60%)",
          }}
        />
        <div className="oz-container" style={{ position: "relative" }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Development Process</span></Reveal>
            <Reveal index={1} as="h2">A calm, predictable path from idea to launch.</Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gap: "clamp(24px, 4vw, 56px)",
              gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
              alignItems: "start",
            }}
            className="oz-process-grid"
          >
            {/* LEFT: image + intro */}
            <Reveal>
            <div className="oz-process-sticky">
                <div
                  className="oz-process-hero"
                  style={{
                    position: "relative",
                    borderRadius: 20,
                    overflow: "hidden",
                    boxShadow: "0 30px 60px -30px rgba(15, 23, 42, 0.35), 0 12px 24px -12px rgba(15, 23, 42, 0.2)",
                    aspectRatio: "4 / 5",
                    background: "var(--oz-primary)",
                  }}
                >
                  <ResponsiveImage
                    src={processTeam1024}
                    alt="Ozeonix Infinity software team collaborating on a project roadmap"
                    width={1024}
                    height={1280}
                    widths={[480, 768, 1024]}
                    srcSet={`${processTeam480} 480w, ${processTeam768} 768w, ${processTeam1024} 1024w`}
                    sizes="(max-width: 900px) calc(100vw - 2rem), (max-width: 1280px) 42vw, 500px"
                    pictureClassName="oz-process-picture"
                    className="oz-process-image"
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(180deg, transparent 40%, rgba(10, 12, 30, 0.75) 100%)",
                    }}
                  />
                  <div className="oz-process-hero-caption" style={{ position: "absolute", left: 20, right: 20, bottom: 20, color: "#fff" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.14)", backdropFilter: "blur(6px)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: "#22c55e", boxShadow: "0 0 0 4px rgba(34,197,94,0.25)" }} />
                      Structured delivery, from discovery to launch
                    </div>
                    <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.5, opacity: 0.92 }}>
                      A proven six-step delivery method used on every CRM, ERP and LMS project we ship.
                    </p>
                  </div>
                </div>

                <div className="oz-process-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                  <div style={{ padding: 14, borderRadius: 12, background: "var(--oz-card, #fff)", border: "1px solid color-mix(in oklab, var(--oz-primary) 12%, transparent)" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--oz-primary)" }}>6</div>
                    <div style={{ fontSize: 13, opacity: 0.75 }}>Structured phases</div>
                  </div>
                  <div style={{ padding: 14, borderRadius: 12, background: "var(--oz-card, #fff)", border: "1px solid color-mix(in oklab, var(--oz-primary) 12%, transparent)" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--oz-primary)" }}>2×</div>
                    <div style={{ fontSize: 13, opacity: 0.75 }}>Weekly demos</div>
                  </div>
                </div>

              </div>
            </Reveal>

            {/* RIGHT: timeline */}
              <div className="oz-process-timeline">
              <div
                aria-hidden
                className="oz-process-timeline-line"
                style={{
                  position: "absolute", left: 27, top: 8, bottom: 8, width: 2,
                  background: "linear-gradient(180deg, color-mix(in oklab, var(--oz-primary) 40%, transparent), color-mix(in oklab, var(--oz-primary) 10%, transparent))",
                  borderRadius: 2,
                }}
              />
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
                {PROCESS.map((p, i) => {
                  const I = p.Icon;
                  return (
                    <Reveal key={p.s} index={i % 3} as="li">
                      <article
                        className="oz-process-step"
                        style={{
                          position: "relative",
                          display: "grid",
                          gridTemplateColumns: "56px 1fr",
                          gap: 18,
                          padding: 20,
                          paddingLeft: 8,
                          borderRadius: 16,
                          background: "var(--oz-card, #fff)",
                          border: "1px solid color-mix(in oklab, var(--oz-primary) 10%, transparent)",
                          boxShadow: "0 10px 30px -20px rgba(15, 23, 42, 0.25)",
                          transition: "transform .2s ease, box-shadow .2s ease",
                        }}
                      >
                        <div
                          className="oz-process-step-icon"
                          style={{
                            width: 56, height: 56, borderRadius: 14,
                            display: "grid", placeItems: "center",
                            background: "linear-gradient(135deg, var(--oz-primary), color-mix(in oklab, var(--oz-primary) 70%, #000))",
                            color: "var(--oz-primary-foreground, #fff)",
                            boxShadow: "0 8px 20px -8px color-mix(in oklab, var(--oz-primary) 60%, transparent)",
                            position: "relative", zIndex: 1,
                          }}
                        >
                          <I size={24} strokeWidth={2} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", color: "var(--oz-primary)", opacity: 0.9 }}>STEP {p.s}</span>
                            <span style={{ height: 4, width: 4, borderRadius: 999, background: "currentColor", opacity: 0.3 }} />
                            <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "color-mix(in oklab, var(--oz-primary) 10%, transparent)", color: "var(--oz-primary)" }}>{p.dur}</span>
                          </div>
                          <h3 style={{ margin: "0 0 6px", fontSize: 20, lineHeight: 1.2 }}>{p.t}</h3>
                          <p style={{ margin: 0, opacity: 0.78, lineHeight: 1.55 }}>{p.d}</p>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ol>

              <Reveal>
                <div
                  className="oz-process-cta"
                  style={{
                    marginTop: 20, padding: 18, borderRadius: 16,
                    display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
                    background: "linear-gradient(135deg, var(--oz-primary), color-mix(in oklab, var(--oz-primary) 65%, #000))",
                    color: "var(--oz-primary-foreground, #fff)",
                  }}
                >
                  <CheckCircle2 size={22} />
                  <span style={{ fontWeight: 600 }}>Ready to turn your idea into a clear project plan?</span>
                  <Link to="/contact" style={{ marginLeft: "auto", padding: "10px 18px", borderRadius: 999, background: "#fff", color: "var(--oz-primary)", fontWeight: 700, textDecoration: "none" }}>
                    Discuss your project →
                  </Link>
                </div>
              </Reveal>
            </div>

          </div>
        </div>

      </section>

      {/* TECHNOLOGIES */}
      <section className="oz-section" aria-label="Technologies">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Technologies</span></Reveal>
            <Reveal index={1} as="h2">Modern, proven, dependable.</Reveal>
          </div>
          <div className="oz-logos">
            {TECH.map((t, i) => (
              <Reveal key={t} index={i % 6} as="span">{t}</Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="oz-section oz-section--dark" aria-label="By the Numbers">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">By the Numbers</span></Reveal>
            <Reveal index={1} as="h2">Growing with every successful delivery.</Reveal>
          </div>
          <div className="oz-stats">
            {STATS.map((s, i) => {
              const Icon = s.Icon;
              return (
                <Reveal key={s.l} index={i}>
                  <div className="oz-stat">
                    <span className="oz-stat__icon"><Icon size={28} strokeWidth={2} /></span>
                    <strong>{s.n}</strong>
                    <span>{s.l}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="oz-home-cta" aria-label="Start a software project">
        <div className="oz-container">
          <Reveal>
            <div className="oz-home-cta__inner">
              <div><span className="oz-eyebrow">Have a project in mind?</span><h2>Turn your business process into software that saves time.</h2><p>Share the challenge with our team. We will help you define the right first step.</p></div>
              <div className="oz-home-cta__actions"><Link to="/contact" className="oz-btn oz-btn--accent">Discuss your project <ArrowRight size={18} /></Link><a href="https://wa.me/9777483509984" className="oz-btn oz-btn--on-dark">Chat on WhatsApp</a></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="oz-section oz-section--muted" aria-label="FAQ">
        <div className="oz-container oz-container--narrow">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">FAQ</span></Reveal>
            <Reveal index={1} as="h2">Answers to common questions.</Reveal>
          </div>
          <div className="oz-faq">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i % 3}>
                <details>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="oz-section oz-section--muted" id="contact" style={{ position: "relative", overflow: "hidden" }} aria-label="Contact">
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(60% 50% at 15% 10%, color-mix(in oklab, var(--oz-primary) 12%, transparent), transparent 60%), radial-gradient(50% 40% at 90% 90%, color-mix(in oklab, var(--oz-primary) 10%, transparent), transparent 60%)",
          }}
        />
        <div className="oz-container" style={{ position: "relative" }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Contact</span></Reveal>
            <Reveal index={1} as="h2">Let’s start a conversation.</Reveal>
            <Reveal index={2}>
              <p className="oz-muted" style={{ maxWidth: 620, margin: "12px auto 0" }}>
                Tell us about your project — CRM, ERP, LMS, website or mobile app. We usually reply within a business day.
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
                  boxShadow: "0 20px 50px -20px color-mix(in oklab, var(--oz-primary) 55%, transparent)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div aria-hidden style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                <div aria-hidden style={{ position: "absolute", bottom: -80, left: -40, width: 260, height: 260, borderRadius: "50%", background: "rgba(0,0,0,0.15)" }} />

                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", padding: "6px 12px", borderRadius: 999, background: "rgba(255,255,255,0.15)", fontSize: 12, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase", position: "relative" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 4px rgba(74,222,128,0.25)" }} />
                  Direct conversation
                </span>

                <h3 style={{ color: "#fff", margin: "6px 0 4px", position: "relative", fontSize: 26, lineHeight: 1.2 }}>
                  Talk directly to a product engineer.
                </h3>
                <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, position: "relative" }}>
                  No sales script. Get an honest scope, timeline and price for your custom software.
                </p>

                <div style={{ display: "grid", gap: 12, marginTop: 18, position: "relative" }}>
                  {[
                    { Icon: MessageCircle, label: "WhatsApp", value: "+977-7483509984", href: "https://wa.me/9777483509984" },
                    { Icon: Phone, label: "Call us", value: "+977-7483509984", href: "tel:+9777483509984" },
                    { Icon: MapPin, label: "Address", value: "Siddharthanagar, Bhairahawa, Rupandehi, Nepal" },
                    { Icon: Clock, label: "Response", value: "Usually within one business day" },
                  ].map(({ Icon, label, value, href }) => {
                    const body = (
                      <>
                        <span style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", flexShrink: 0 }}>
                          <Icon size={18} />
                        </span>
                        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                          <span style={{ fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", opacity: 0.75 }}>{label}</span>
                          <span style={{ fontWeight: 600, wordBreak: "break-word" }}>{value}</span>
                        </span>
                      </>
                    );
                    return href ? (
                      <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.08)", color: "#fff", textDecoration: "none", transition: "background 0.2s" }}>
                        {body}
                      </a>
                    ) : (
                      <div key={label} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.08)" }}>
                        {body}
                      </div>
                    );
                  })}
                </div>

                <a
                  href="https://wa.me/9777483509984"
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
