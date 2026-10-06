import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { GraduationCap, BookOpen, ClipboardList, MessageCircle, CheckCircle } from "lucide-react";

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
    telephone: "+977-7483509984",
    url: "https://ozeonix-infinity.ozeonix.app",
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
      { name: "description", content: "Custom LMS development with digital classrooms, exams, attendance and parent communication. Request a free demo." },
      { property: "og:title", content: "LMS Development for Schools, Colleges & Teams | Ozeonix Infinity" },
      { property: "og:description", content: "LMS platforms with digital content, exams, attendance and communication. Request a free demo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/services/lms-platforms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/services/lms-platforms" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(SERVICE_JSONLD) },
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: LmsPlatforms,
});

const FEATURES = [
  { icon: BookOpen, title: "Digital Content Delivery", desc: "Share notes, videos, assignments and resources in structured courses." },
  { icon: ClipboardList, title: "Exams & Assessments", desc: "Online quizzes, exams, automatic grading and detailed result analytics." },
  { icon: GraduationCap, title: "Student Management", desc: "Enrollment, attendance, progress tracking and report cards." },
  { icon: MessageCircle, title: "Parent Communication", desc: "Automated updates, notices and direct messaging between teachers and parents." },
];

function LmsPlatforms() {
  return (
    <>
      <section className="oz-open" aria-label="Features">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">LMS Platforms</span>
                <h1>LMS Development for Schools, Colleges and Teams</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We build modern Learning Management Systems for schools, colleges, coaching institutes and teams—combining
                  digital classrooms, exams, attendance and communication in one intuitive platform.
                </p>
                <div className="oz-open__actions">
                  <Link to="/contact" className="oz-btn oz-btn--accent">Get a free demo</Link>
                  <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--outline">WhatsApp us</a>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section" aria-label="Features">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Features</span></Reveal>
            <Reveal index={1} as="h2">Everything your institution needs.</Reveal>
          </div>
          <div className="oz-grid oz-grid-2">
            {FEATURES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.title} index={i % 2}>
                  <article className="oz-card">
                    <span className="oz-card__icon" style={{ background: "var(--oz-primary)", color: "var(--oz-primary-foreground)" }}>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--muted" aria-label="Why us">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Why us</span></Reveal>
            <Reveal index={1} as="h2">Built for modern educators.</Reveal>
          </div>
          <Reveal>
            <ul className="oz-checklist">
              <li>Designed with teachers, administrators, learners and parents in mind</li>
              <li>Multilingual content and interface support</li>
              <li>Optimized for mobile devices and lower-bandwidth connections</li>
              <li>Optional integrated fee, transport and library modules</li>
              <li>Guided rollout, training and ongoing support</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="oz-section" aria-label="FAQ">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">FAQ</span></Reveal>
            <Reveal index={1} as="h2">Common LMS questions.</Reveal>
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

      <section className="oz-section oz-section--dark" aria-label="Ready to digitize your classrooms?">
        <div className="oz-container oz-center">
          <Reveal>
            <h2>Ready to digitize your classrooms?</h2>
            <p className="oz-muted">Get an LMS tailored for your school, college or training team.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
              <Link to="/contact" className="oz-btn oz-btn--accent">Request a free demo</Link>
              <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--on-dark">WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
