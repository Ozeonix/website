import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Ozeonix Infinity" },
      { name: "description", content: "Terms and conditions for using Ozeonix Infinity services." },
      { property: "og:title", content: "Terms & Conditions — Ozeonix Infinity" },
      { property: "og:description", content: "Terms and conditions for using Ozeonix Infinity services." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/terms" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <header className="oz-legalhead">
        <div className="oz-container">
          <div className="oz-legalhead__row">
            <h1>Terms &amp; Conditions</h1>
            <span className="oz-legalhead__meta">Legal · Last updated January 2026</span>
          </div>
        </div>
      </header>
      <section className="oz-section oz-section--tight" aria-label="Services">
        <div className="oz-container oz-prose" style={{ maxWidth: 820 }}>
          <p>By accessing our website or engaging our services, you agree to be bound by the following terms.</p>
          <h2>Services</h2>
          <p>We provide website development, mobile app development, CRM, ERP, UI/UX design and related services under agreed proposals.</p>
          <h2>Payment</h2>
          <p>Payment terms are defined per project in the signed proposal. Invoices are due as specified.</p>
          <h2>Intellectual Property</h2>
          <p>Upon full payment, project deliverables belong to the client, except for pre-existing tools, frameworks and libraries used to build the solution.</p>
          <h2>Confidentiality</h2>
          <p>We treat all information shared during the engagement as confidential.</p>
          <h2>Limitation of Liability</h2>
          <p>Our liability is limited to the fees paid for the specific project. We are not liable for indirect or consequential damages.</p>
          <h2>Contact</h2>
          <p>Questions? Reach us on WhatsApp at +977-7483509984.</p>
        </div>
      </section>
    </>
  );
}
