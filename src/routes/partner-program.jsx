import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/partner-program")({
  head: () => ({
    meta: [
      { title: "Referral Partner Program — Earn 10% | Ozeonix Infinity" },
      { name: "description", content: "Join the Ozeonix Infinity partner program. Refer clients needing websites, apps, CRM, ERP or LMS and earn 10% commission per project." },
      { property: "og:title", content: "Referral Partner Program — Earn 10% | Ozeonix Infinity" },
      { property: "og:description", content: "Create a free partner profile, share your referral link and earn 10% commission on every project your client signs." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/partner-program" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/partner-program" }],
  }),
  component: PartnerProgram,
});

const STEPS = [
  { s: "01", t: "Create your partner profile", d: "Sign up free with email or Google. You instantly get a unique referral code and link." },
  { s: "02", t: "Bring us a client", d: "Share your link, or add the client's details straight into your dashboard as a lead." },
  { s: "03", t: "We close and deliver", d: "Our team reviews the lead, quotes the client and delivers the project end to end." },
  { s: "04", t: "You earn 10%", d: "Once the project value is confirmed, your 10% commission shows in your dashboard and is paid out." },
];

const FAQS = [
  { q: "How much commission do I earn per referral?", a: "You earn 10% of the confirmed project value by default. For larger or long-term deals, our team may agree a higher rate with you before the project starts." },
  { q: "Who can join the partner program?", a: "Freelancers, agencies, consultants, students and business owners can join from anywhere and grow their network with Ozeonix Infinity." },
  { q: "How do you know the client came from me?", a: "Every partner gets a unique referral link. Any contact form submitted through that link is tagged to you automatically. You can also submit the lead manually from your dashboard." },
  { q: "When is the commission paid?", a: "After the client's project value is confirmed and payment is received, we mark your commission as paid and transfer it to the payout details saved in your profile." },
];

function PartnerProgram() {
  return (
    <>
      <section className="oz-open" aria-label="Partner program: earn 10% commission for every client you refer">
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">Partner Program</span>
            <h1>Refer a client. Earn 10% commission on every project.</h1>
            <p className="oz-muted" style={{ maxWidth: 720 }}>
              Build your own client network with Ozeonix Infinity. Create a free partner profile, find businesses
              that need a website, mobile app, CRM, ERP or LMS — and earn 10% of every project you bring in.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
              <Link to="/auth" className="oz-btn oz-btn--accent">Become a partner</Link>
              <Link to="/contact" className="oz-btn oz-btn--outline">Talk to us first</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <Reveal as="h2">How the program works</Reveal>
          <div className="oz-grid oz-grid-4" style={{ marginTop: 20 }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.s} index={i % 4}>
                <article className="oz-card">
                  <span className="oz-badge" style={{ alignSelf: "flex-start", marginBottom: 12 }}>{s.s}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <Reveal as="h2">Partner program FAQs</Reveal>
          <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
            {FAQS.map((f) => (
              <details key={f.q} className="oz-card" style={{ padding: 18 }}>
                <summary style={{ fontWeight: 700, cursor: "pointer" }}>{f.q}</summary>
                <p style={{ marginTop: 10 }}>{f.a}</p>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>
    </>
  );
}
