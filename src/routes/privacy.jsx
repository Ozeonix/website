import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Ozeonix Infinity" },
      { name: "description", content: "How Ozeonix Infinity collects, uses and protects your information." },
      { property: "og:title", content: "Privacy Policy — Ozeonix Infinity" },
      { property: "og:description", content: "How Ozeonix Infinity collects, uses and protects your information." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/privacy" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <header className="oz-legalhead">
        <div className="oz-container">
          <div className="oz-legalhead__row">
            <h1>Privacy Policy</h1>
            <span className="oz-legalhead__meta">Legal · Last updated January 2026</span>
          </div>
        </div>
      </header>
      <section className="oz-section oz-section--tight" aria-label="Information We Collect">
        <div className="oz-container oz-prose" style={{ maxWidth: 820 }}>
          <p>This Privacy Policy describes how Ozeonix Infinity collects, uses and protects information you provide when using our website and services.</p>
          <h2>Information We Collect</h2>
          <p>We collect information you voluntarily provide through contact forms, project inquiries and communications, including name, email, phone, company and message details.</p>
          <h2>How We Use Information</h2>
          <p>We use the information to respond to your inquiries, deliver requested services, improve our offerings and communicate about your project.</p>
          <h2>Data Protection</h2>
          <p>We follow reasonable technical and organizational measures to protect information against loss, misuse and unauthorized access.</p>
          <h2>Third Parties</h2>
          <p>We do not sell your personal information. We may share limited information with trusted service providers strictly to deliver our services.</p>
          <h2>Your Rights</h2>
          <p>You may request access, correction or deletion of your personal information by contacting us at any time.</p>
          <h2>Contact</h2>
          <p>For privacy questions, contact us via WhatsApp at +977-7483509984.</p>
        </div>
      </section>
    </>
  );
}
