import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Development Process — Ozeonix Infinity" },
      { name: "description", content: "A calm, predictable path from discovery to launch and support." },
      { property: "og:title", content: "Development Process — Ozeonix Infinity" },
      { property: "og:description", content: "A calm, predictable path from discovery to launch and support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/process" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/process" },
    ],
  }),
  component: Process,
});

const STEPS = [
  { s: "01", t: "Discovery & Consultation", d: "We begin by understanding your business, goals, target audience and requirements." },
  { s: "02", t: "Planning & Strategy", d: "Detailed roadmap, feature list, tech stack, timelines and milestones." },
  { s: "03", t: "UI/UX Design", d: "Intuitive, responsive interfaces with accessibility built in." },
  { s: "04", t: "Development", d: "Scalable, secure, high-performance engineering with regular check-ins." },
  { s: "05", t: "Testing & QA", d: "Cross-device and cross-browser testing for functionality, security and speed." },
  { s: "06", t: "Client Review", d: "Present the completed solution and refine based on your feedback." },
  { s: "07", t: "Deployment & Launch", d: "Configure domains, hosting and databases for a smooth launch." },
  { s: "08", t: "Maintenance & Support", d: "Ongoing updates, security patches, optimization and enhancements." },
];

function Process() {
  return (
    <>
      <section className="oz-open" aria-label="Eight small steps between “we should build something” and a live product.">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">How a project actually runs</span>
                <h1>Eight small steps between “we should build something” and a live product.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <p className="oz-open__lead">
                No mystery, no radio silence. You always know which step we’re on, what’s next, and what we need
                from you to keep moving.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container" style={{ maxWidth: 860 }}>
          <div className="oz-timeline">
            {STEPS.map((s, i) => (
              <Reveal key={s.s} index={i % 2}>
                <div className="oz-timeline__item">
                  <span className="oz-timeline__num">{s.s}</span>
                  <div className="oz-timeline__body">
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
