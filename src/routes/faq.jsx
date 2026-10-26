import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "What services does Ozeonix Infinity provide?", a: "Custom websites, Flutter mobile apps, CRM systems, ERP solutions for schools and colleges, UI/UX design, portfolios and business software." },
    { q: "Which industries do you serve?", a: "Schools, colleges, startups, SMEs, healthcare, retail, hospitality, real estate and many others." },
    { q: "Do you build custom software?", a: "Yes — every solution is tailored to your business requirements, workflows and future growth plans." },
    { q: "Do you develop mobile applications?", a: "Yes — high-performance cross-platform apps built with Flutter for both Android and iOS." },
    { q: "Can you redesign my existing website?", a: "Absolutely. We modernize existing sites for improved design, performance, security and user experience." },
    { q: "Do you provide ERP and CRM solutions?", a: "Yes — we develop customized ERP and CRM systems tailored to institutions, businesses and organizations." },
    { q: "Will my website be mobile-friendly?", a: "Every website we build is fully responsive across desktops, tablets and phones." },
    { q: "Do you offer website maintenance and support?", a: "Yes — ongoing maintenance, security updates, performance optimization, bug fixes and feature enhancements." },
    { q: "Can you help my business grow online?", a: "We create professional digital solutions that strengthen your online presence and help attract more customers." },
    { q: "How long does a project take?", a: "Timelines depend on scope and complexity. After understanding your requirements, we share a detailed timeline before development begins." },
    { q: "What technologies do you use?", a: "We use modern frameworks including Flutter, React, Node.js, Firebase, MySQL, PostgreSQL, REST APIs and major cloud platforms." },
    { q: "Can you integrate third-party services?", a: "Yes — payment gateways, email, maps, analytics, authentication and other third-party APIs." },
    { q: "How do I get started?", a: "Contact us with your project requirements. We'll discuss your goals, recommend the best solution and provide a proposal." },
    { q: "Do you work with startups and small businesses?", a: "Yes — we love helping startups and small businesses build a strong digital presence with scalable, cost-effective solutions." },
    { q: "Why should I choose Ozeonix Infinity?", a: "Modern technology, user-focused design, scalable development, transparent communication and dedicated long-term support." },
  ].map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ozeonix Infinity" },
      { name: "description", content: "Answers to common questions about Ozeonix Infinity's services and process." },
      { property: "og:title", content: "FAQ — Ozeonix Infinity" },
      { property: "og:description", content: "Answers to common questions about Ozeonix Infinity's services and process." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/faq" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix.com/faq" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(FAQ_JSONLD),
      },
    ],
  }),
  component: FAQ,
});

const FAQS = [
  { q: "What services does Ozeonix Infinity provide?", a: "Custom websites, Flutter mobile apps, CRM systems, ERP solutions for schools and colleges, UI/UX design, portfolios and business software." },
  { q: "Which industries do you serve?", a: "Schools, colleges, startups, SMEs, healthcare, retail, hospitality, real estate and many others." },
  { q: "Do you build custom software?", a: "Yes — every solution is tailored to your business requirements, workflows and future growth plans." },
  { q: "Do you develop mobile applications?", a: "Yes — high-performance cross-platform apps built with Flutter for both Android and iOS." },
  { q: "Can you redesign my existing website?", a: "Absolutely. We modernize existing sites for improved design, performance, security and user experience." },
  { q: "Do you provide ERP and CRM solutions?", a: "Yes — we develop customized ERP and CRM systems tailored to institutions, businesses and organizations." },
  { q: "Will my website be mobile-friendly?", a: "Every website we build is fully responsive across desktops, tablets and phones." },
  { q: "Do you offer website maintenance and support?", a: "Yes — ongoing maintenance, security updates, performance optimization, bug fixes and feature enhancements." },
  { q: "Can you help my business grow online?", a: "We create professional digital solutions that strengthen your online presence and help attract more customers." },
  { q: "How long does a project take?", a: "Timelines depend on scope and complexity. After understanding your requirements, we share a detailed timeline before development begins." },
  { q: "What technologies do you use?", a: "We use modern frameworks including Flutter, React, Node.js, Firebase, MySQL, PostgreSQL, REST APIs and major cloud platforms." },
  { q: "Can you integrate third-party services?", a: "Yes — payment gateways, email, maps, analytics, authentication and other third-party APIs." },
  { q: "How do I get started?", a: "Contact us with your project requirements. We'll discuss your goals, recommend the best solution and provide a proposal." },
  { q: "Do you work with startups and small businesses?", a: "Yes — we love helping startups and small businesses build a strong digital presence with scalable, cost-effective solutions." },
  { q: "Why should I choose Ozeonix Infinity?", a: "Modern technology, user-focused design, scalable development, transparent communication and dedicated long-term support." },
];

function FAQ() {
  return (
    <>
      <section className="oz-open" aria-label="Frequently Asked Questions — Ozeonix Infinity.">
        <div className="oz-container" style={{ maxWidth: 820 }}>
          <Reveal>
            <span className="oz-open__index">Before you write to us</span>
            <h1>Frequently Asked Questions — Ozeonix Infinity.</h1>
            <p className="oz-open__lead" style={{ marginTop: 16 }}>
              A quick collection of the questions that come up most often. If yours isn’t here,
              WhatsApp us at <a href="https://wa.me/9777483509984" style={{ color: "var(--oz-primary)", fontWeight: 600 }}>+977 74835 09984</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container" style={{ maxWidth: 820 }}>
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
    </>
  );
}
