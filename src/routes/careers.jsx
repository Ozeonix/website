import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Ozeonix Infinity" },
      { name: "description", content: "Join Ozeonix Infinity and help build the future of business software." },
      { property: "og:title", content: "Careers — Ozeonix Infinity" },
      { property: "og:description", content: "Join Ozeonix Infinity and help build the future of business software." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/careers" },
    ],
  }),
  component: Careers,
});

const OPENINGS = [
  { role: "Frontend Engineer", type: "Full-time · Remote", d: "React, modern CSS, accessibility and performance-first thinking." },
  { role: "Flutter Developer", type: "Full-time · Remote", d: "Cross-platform mobile apps with clean architecture and testing." },
  { role: "UI/UX Designer", type: "Full-time · Remote", d: "Design systems, user research, prototypes and delightful interfaces." },
  { role: "Backend Engineer", type: "Full-time · Remote", d: "Node.js, APIs, databases, and secure cloud deployments." },
];

function Careers() {
  return (
    <>
      <section className="oz-open" aria-label="Small team. Real projects. Room to do your best work.">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">We’re hiring · {OPENINGS.length} roles</span>
            <h1>Small team. Real projects. Room to do your best work.</h1>
            <p className="oz-open__lead" style={{ marginTop: 16, maxWidth: 640 }}>
              We keep the team small on purpose. That means you own real work end-to-end, ship it to real users,
              and hear their feedback directly. If that sounds like your kind of place, take a look below.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-grid oz-grid-2">
            {OPENINGS.map((o, i) => (
              <Reveal key={o.role} index={i % 2}>
                <article className="oz-card">
                  <span className="oz-badge" style={{ alignSelf: "flex-start", marginBottom: 12 }}>{o.type}</span>
                  <h3>{o.role}</h3>
                  <p>{o.d}</p>
                  <Link to="/contact" className="oz-btn oz-btn--outline" style={{ alignSelf: "flex-start", marginTop: 16 }}>Apply</Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
