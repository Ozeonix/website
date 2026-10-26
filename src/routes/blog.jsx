import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Ozeonix Infinity" },
      { name: "description", content: "Insights on building modern websites, apps and business software." },
      { property: "og:title", content: "Blog — Ozeonix Infinity" },
      { property: "og:description", content: "Insights on building modern websites, apps and business software." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/blog" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/blog" },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { t: "Why every school needs a modern ERP", d: "How digital operations reduce administrative overhead and improve parent engagement.", tag: "ERP" },
  { t: "Designing CRM workflows that people actually use", d: "Small design choices that meaningfully increase sales team adoption.", tag: "CRM" },
  { t: "Choosing between a website and a web app", d: "A practical framework for small businesses evaluating their next move.", tag: "Web" },
  { t: "Flutter in 2026 — where cross-platform is winning", d: "Real-world tradeoffs from projects across education and retail.", tag: "Mobile" },
  { t: "SEO for real businesses, not blogs", d: "Foundations that move the needle for service-based companies.", tag: "SEO" },
  { t: "Preparing your business for AI automation", d: "Where to start, what to measure, and how to avoid the hype.", tag: "AI" },
];

function Blog() {
  const [featured, ...rest] = POSTS;
  return (
    <>
      <section className="oz-open" aria-label="Short reads from the team — what we’re learning while we build.">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">Journal</span>
            <h1>Short reads from the team — what we’re learning while we build.</h1>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <Reveal>
            <div className="oz-featured">
              <div>
                <span className="oz-badge">{featured.tag} · Latest</span>
                <h2>{featured.t}</h2>
                <p className="oz-muted">{featured.d}</p>
                <p style={{ marginTop: 16, fontSize: "0.85rem", color: "var(--oz-primary)", fontWeight: 600 }}>Coming soon</p>
              </div>
              <div className="oz-featured__aside">
                <p className="oz-muted" style={{ margin: 0 }}>
                  We’re preparing the first full essay right now. Want it in your inbox when it lands?
                  WhatsApp us and we’ll add you to the shortlist.
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
                  <p style={{ marginTop: 12, fontSize: "0.8rem", color: "var(--oz-primary)", fontWeight: 600 }}>Coming soon</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
