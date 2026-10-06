import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import ProjectBriefForm from "../components/ProjectBriefForm.jsx";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ozeonix Infinity — Start Your Software Project" },
      { name: "description", content: "Contact Ozeonix Infinity for custom CRM, ERP, LMS, website and mobile app development. Get a free consultation for your next digital product." },
      { property: "og:title", content: "Contact Ozeonix Infinity — Start Your Software Project" },
      { property: "og:description", content: "Get a free consultation for custom CRM, ERP, LMS, website and mobile app development." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/contact" },
    ],
  }),
  component: Contact,
});


function Contact() {
  return (
    <>
      <section className="oz-open" aria-label="Contact Ozeonix Infinity about custom software development">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">Say hello</span>
            <h1>Let’s shape your next digital product.</h1>
            <div className="oz-quickrow">
              <span>WhatsApp <a href="https://wa.me/9777483509984">+977 74835 09984</a></span>
              <span>Office <strong>Siddharthanagar, Bhairahawa, Rupandehi, Nepal</strong></span>
              <span>Replies <strong style={{ color: "var(--oz-primary)" }}>within one business day</strong></span>
            </div>
          </Reveal>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-split" style={{ alignItems: "start" }}>
            <Reveal>
              <div className="oz-card">
                <h2>Prefer to talk first?</h2>
                <p className="oz-muted">A short call or WhatsApp chat is usually the fastest way to figure out if we’re a good fit.</p>
                <div className="oz-contact-actions">
                  <a href="https://wa.me/9777483509984" className="oz-btn oz-btn--accent" aria-label="Message us on WhatsApp at +977 74835 09984">Message on WhatsApp</a>
                  <a href="tel:+9777483509984" className="oz-btn oz-btn--outline" aria-label="Call us at +977 74835 09984">Call +977-7483509984</a>
                </div>
                <hr className="oz-divider" />
                <h2>Follow along</h2>
                <p className="oz-muted">LinkedIn · Instagram · Facebook</p>
              </div>
            </Reveal>

            <Reveal index={1}>
              <ProjectBriefForm formLocation="contact_page" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
