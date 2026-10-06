import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Ozeonix Infinity" },
      { name: "description", content: "Selected work and demo builds by Ozeonix Infinity." },
      { property: "og:title", content: "Portfolio — Ozeonix Infinity" },
      { property: "og:description", content: "Selected work and demo builds by Ozeonix Infinity." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/portfolio" },
    ],
  }),
  component: Portfolio,
});

const ITEMS = [
  { t: "School Management System", tag: "ERP · Demo", d: "Students, attendance, fees, exams, staff and parent communication.", tech: "Flutter · Node · REST" },
  { t: "College ERP Platform", tag: "ERP · Demo", d: "Admissions, academics, faculty, finance and administration.", tech: "Flutter · API · DB" },
  { t: "Business CRM Platform", tag: "CRM · Demo", d: "Leads, sales pipelines, invoices, follow-ups and support.", tech: "Flutter · Cloud DB" },
  { t: "Corporate Website", tag: "Web", d: "Responsive, SEO-friendly corporate presence with contact flow.", tech: "React · SEO" },
  { t: "Portfolio Websites", tag: "Web", d: "Elegant portfolios for creators, freelancers and studios.", tech: "React" },
  { t: "Custom Web Applications", tag: "SaaS", d: "Business apps that automate processes and improve efficiency.", tech: "Full-stack" },
  { t: "Mobile Applications", tag: "Mobile", d: "Cross-platform apps with a consistent, high-performance UX.", tech: "Flutter" },
  { t: "UI/UX Design Projects", tag: "Design", d: "Interfaces for websites, apps, dashboards and enterprise software.", tech: "Figma · Systems" },
];

function Portfolio() {
  const [featured, ...rest] = ITEMS;
  return (
    <>
      <section className="oz-open" aria-label="A few things we’ve shipped — and a couple we built to show what’s possible.">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">Selected work</span>
            <h1>A few things we’ve shipped — and a couple we built to show what’s possible.</h1>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <Reveal>
            <div className="oz-featured">
              <div>
                <span className="oz-badge">{featured.tag} · Featured</span>
                <h2>{featured.t}</h2>
                <p className="oz-muted">{featured.d}</p>
                <p style={{ marginTop: 16, fontSize: "0.85rem", color: "var(--oz-primary)", fontWeight: 600 }}>{featured.tech}</p>
              </div>
              <div className="oz-featured__aside">
                <p className="oz-muted" style={{ margin: 0 }}>
                  Built as a demo build to show how a full ERP can feel calm and fast — even with hundreds of
                  moving parts. Ask us for a walkthrough.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-grid oz-grid-3">
            {rest.map((p, i) => (
              <Reveal key={p.t} index={i % 3}>
                <article className="oz-card">
                  <span className="oz-badge" style={{ alignSelf: "flex-start", marginBottom: 12 }}>{p.tag}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                  <p style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--oz-primary)", fontWeight: 600 }}>{p.tech}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
