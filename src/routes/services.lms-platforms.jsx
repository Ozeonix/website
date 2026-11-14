import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  MessageCircle,
  Video,
  Award,
  Users,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const FAQS = [
  {
    q: "Can you build an LMS for a school, college or training team?",
    a: "Yes. We build scalable learning platforms for schools, colleges, coaching institutes and workplace training, with multilingual and payment integrations.",
  },
  {
    q: "What features are included in your LMS platforms?",
    a: "Student enrollment, attendance, digital content delivery, online exams, gradebooks, parent communication, fee tracking and progress reports — all in one platform.",
  },
  {
    q: "How is an LMS different from a school ERP?",
    a: "An LMS focuses on teaching and learning — content, exams, progress tracking. A school ERP handles broader administration like admissions, fees, transport and library. We can combine both into one integrated platform.",
  },
  {
    q: "Can students access the LMS on mobile?",
    a: "Yes — our LMS has a fully responsive web interface and optional Flutter mobile app so students and teachers stay connected from any device.",
  },
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

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LMS Development for Schools, Colleges and Teams",
  provider: {
    "@type": "LocalBusiness",
    name: "Ozeonix Infinity",
    telephone: "+977-9769294624",
    url: "https://ozeonix.com",
    areaServed: "Worldwide",
  },
  serviceType: "LMS Software Development",
  description:
    "LMS development for schools, colleges and teams, with digital classrooms, exams, attendance and communication tools.",
};

export const Route = createFileRoute("/services/lms-platforms")({
  head: () => ({
    meta: [
      { title: "LMS Development for Schools, Colleges & Teams | Ozeonix Infinity" },
      {
        name: "description",
        content:
          "Custom LMS development with digital classrooms, exams, attendance and parent communication. Request a free demo from Ozeonix Infinity.",
      },
      {
        property: "og:title",
        content: "LMS Development for Schools, Colleges & Teams | Ozeonix Infinity",
      },
      {
        property: "og:description",
        content:
          "LMS platforms with digital content, exams, attendance and communication. Request a free demo.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/services/lms-platforms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/services/lms-platforms" }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: LmsPlatforms,
});

const FEATURES = [
  {
    Icon: BookOpen,
    title: "Digital Content Delivery",
    desc: "Share notes, videos, assignments and resources in structured, easy-to-navigate courses.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Digital learning content delivery platform",
  },
  {
    Icon: ClipboardList,
    title: "Exams & Assessments",
    desc: "Online quizzes, timed exams, automatic grading and detailed result analytics for every student.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Online exam and assessment management system",
  },
  {
    Icon: GraduationCap,
    title: "Student Management",
    desc: "Enrollment, attendance tracking, academic progress and comprehensive report card generation.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Student management and progress tracking",
  },
  {
    Icon: MessageCircle,
    title: "Parent Communication",
    desc: "Automated progress updates, school notices and direct messaging between teachers and parents.",
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Parent and teacher communication portal",
  },
  {
    Icon: Video,
    title: "Live Classes & Webinars",
    desc: "Integrated live class scheduling with Zoom or Jitsi — with recording, attendance and replay.",
    img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Live online classes and webinar integration",
  },
  {
    Icon: Award,
    title: "Certificates & Badges",
    desc: "Automated certificate generation and digital badges to recognize and motivate learner achievement.",
    img: "https://images.unsplash.com/photo-1569533086760-99470c35b6e5?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Digital certificates and achievement badges",
  },
];

const WHY_US = [
  "Designed with teachers, administrators, learners and parents in mind",
  "Multilingual content and interface support",
  "Optimized for mobile devices and lower-bandwidth connections",
  "Optional integrated fee, transport and library modules",
  "Guided rollout, training and ongoing support",
  "Secure cloud hosting with automatic backups",
];

function LmsPlatforms() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="LMS Platform Development">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">LMS Platforms</span>
                <h1>LMS Development for Schools, Colleges and Training Teams</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We build modern Learning Management Systems that bring digital classrooms, exams,
                  attendance and parent communication together — in one intuitive platform your
                  entire institution can use from day one.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Get a free demo <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a href="https://wa.me/9779769294624" className="oz-btn oz-btn--outline">
                    WhatsApp us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Hero Image */}
      <section className="oz-section oz-section--tight" aria-label="LMS overview">
        <div className="oz-container">
          <Reveal>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "21/8",
                boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80"
                alt="Students and teachers using a modern Learning Management System"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features Grid */}
      <section className="oz-section" aria-label="LMS features">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Features</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Everything your institution needs to teach online.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {FEATURES.map(({ Icon, title, desc, img, imgAlt }, i) => (
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
                  <div style={{ padding: "clamp(1rem, 2vw, 1.25rem)", flex: 1 }}>
                    <span
                      className="oz-card__icon"
                      style={{ marginBottom: 10, background: "var(--oz-primary)", color: "#fff" }}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ marginTop: 0 }}>{title}</h3>
                    <p style={{ margin: 0 }}>{desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="oz-section oz-section--muted" aria-label="Why choose our LMS">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Why Us</span>
                <h2>Built for modern educators.</h2>
                <p className="oz-muted">
                  We've built LMS platforms for small coaching centres and large institutions alike.
                  The difference is always in the details — the right workflows for your teachers,
                  not generic ones.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0", display: "grid", gap: 12 }}>
                  {WHY_US.map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2
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
                  aspectRatio: "4/3",
                  boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
                  alt="Students engaged in online learning on a modern LMS platform"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="oz-section" aria-label="LMS frequently asked questions">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">FAQ</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Common LMS questions.
            </Reveal>
          </div>
          <div className="oz-faq">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} index={i % 2}>
                <details>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Ready to digitize your classrooms?">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow" style={{ color: "var(--oz-primary)" }}>
              Digitize your classrooms
            </span>
            <h2>Ready to take your teaching online?</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              Get an LMS tailored for your school, college or training team. We'll walk you through
              a live demo and answer all your questions before you commit to anything.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Request a free demo <ArrowRight size={16} aria-hidden="true" />
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
