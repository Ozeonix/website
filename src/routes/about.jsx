import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ozeonix Infinity" },
      { name: "description", content: "Ozeonix Infinity helps startups, institutions and businesses build a strong digital presence." },
      { property: "og:title", content: "About — Ozeonix Infinity" },
      { property: "og:description", content: "Ozeonix Infinity helps startups, institutions and businesses build a strong digital presence." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/about" },
    ],
  }),
  component: About,
});

const VALUES = [
  { t: "Innovation", d: "We create modern solutions that solve real business challenges through creativity and technology." },
  { t: "Customer Success", d: "Our clients' growth is our priority. We build solutions that deliver measurable value." },
  { t: "Quality", d: "Every website, application, CRM and ERP system is developed with care for performance and usability." },
  { t: "Integrity", d: "We operate with honesty, transparency and professionalism in every project." },
  { t: "Continuous Improvement", d: "We constantly learn, adapt and improve to deliver the best possible solutions." },
  { t: "Collaboration", d: "We work closely with our clients to transform their ideas into successful digital products." },
  { t: "Accessibility", d: "Professional technology should be available to businesses of every size." },
  { t: "Reliability", d: "Long-term partnerships built on consistent, dependable delivery." },
];

function About() {
  return (
    <>
      <section className="oz-open" aria-label="Our Story">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Shape The Thought. Power Tomorrow</span>
                <h1>A small studio building software small businesses can actually rely on.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  We started Ozeonix Infinity because most small businesses and institutions have great ideas
                  but end up with fragile websites and half-finished software. We wanted to change that — one
                  well-crafted project at a time.
                </p>
                <div className="oz-open__meta">
                  <span><strong>25+</strong> projects shipped</span>
                  <span><strong>20+</strong> happy clients</span>
                  <span><strong>10+</strong> industries</span>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section oz-section--tight" aria-label="Our Story">
        <div className="oz-container">
          <div className="oz-split">
            <Reveal>
              <div>
                <span className="oz-eyebrow">Our Story</span>
                <h2>Founded on a simple belief.</h2>
                <p className="oz-muted">
                  Every business — whether a startup, educational institution or local enterprise — deserves
                  professional digital tools that enable growth, efficiency and long-term success.
                </p>
                <p className="oz-muted">
                  We started with the services businesses need most: professional websites, mobile apps, CRM
                  systems, ERP for educational institutions, UI/UX design and digital portfolios. As we grow,
                  we continue to expand our expertise and deliver more advanced technology solutions.
                </p>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div className="oz-card">
                <h3>Why we started</h3>
                <p className="oz-muted">
                  Many small businesses and educational institutions have great potential but lack access to
                  affordable, professional digital solutions. We bridge this gap with modern, user-friendly
                  and scalable software.
                </p>
                <hr className="oz-divider" />
                <h3>Our Mission</h3>
                <p className="oz-muted">Empower startups, small businesses and institutions with innovative digital solutions that simplify operations and support sustainable growth.</p>
                <h3>Our Vision</h3>
                <p className="oz-muted">Become a trusted technology company known for reliable software, modern digital experiences and innovative business solutions.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--muted" aria-label="Core Values">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal><span className="oz-eyebrow">Core Values</span></Reveal>
            <Reveal index={1} as="h2">What guides our work.</Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} index={i % 4}>
                <div className="oz-card">
                  <span className="oz-card__icon">◇</span>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="oz-section" aria-label="Let’s build what’s next.">
        <div className="oz-container">
          <Reveal>
            <div className="oz-cta">
              <div>
                <h2>Let’s build what’s next.</h2>
                <p>Tell us about your project and we’ll respond within one business day.</p>
              </div>
              <div className="oz-cta__actions">
                <Link to="/contact" className="oz-btn oz-btn--accent">Discuss your project</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
