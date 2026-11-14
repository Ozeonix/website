import { createFileRoute, Link } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  ShoppingCart,
  Truck,
  Dumbbell,
  CreditCard,
  Film,
  GraduationCap,
  CalendarDays,
  UtensilsCrossed,
  HeartPulse,
  ArrowRight,
} from "lucide-react";

const INDUSTRY_HIGHLIGHTS = [
  {
    slug: "e-commerce",
    label: "E-commerce",
    Icon: ShoppingCart,
    tagline: "Online stores that convert",
    desc: "Custom storefronts, multi-vendor marketplaces and mobile commerce apps that load fast and keep customers returning.",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "E-commerce store with shopping experience",
  },
  {
    slug: "on-demand",
    label: "On-demand",
    Icon: Truck,
    tagline: "Uber-style apps, done right",
    desc: "Delivery, taxi, home-services and rental apps with live tracking, smart dispatch and in-app payments.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    imgAlt: "On-demand delivery and service application",
  },
  {
    slug: "fitness",
    label: "Fitness",
    Icon: Dumbbell,
    tagline: "Software for gyms, coaches & studios",
    desc: "Class bookings, membership management, trainer scheduling and community features for fitness businesses.",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Fitness gym management and booking application",
  },
  {
    slug: "payments",
    label: "Payments",
    Icon: CreditCard,
    tagline: "Fintech flows built to clear compliance",
    desc: "Wallets, subscriptions, split payouts, KYC flows and reconciliation systems built for auditors and users alike.",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Payment and fintech application interface",
  },
  {
    slug: "entertainment",
    label: "Entertainment",
    Icon: Film,
    tagline: "Streaming, media & fan platforms",
    desc: "OTT, podcasts, live streams, fan communities and creator dashboards built for smooth playback and scalable content ops.",
    img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Media streaming and entertainment platform",
  },
  {
    slug: "education",
    label: "Education",
    Icon: GraduationCap,
    tagline: "LMS, coaching & school platforms",
    desc: "School ERP, LMS, parent apps and student portals — connected, not siloed. For coaching centres to multi-branch institutes.",
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Education management and learning platform",
  },
  {
    slug: "event",
    label: "Event",
    Icon: CalendarDays,
    tagline: "Ticketing & event management",
    desc: "End-to-end event platforms with ticketing, QR check-in, attendee apps, sponsor management and post-event analytics.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Event management and ticketing system",
  },
  {
    slug: "restaurant",
    label: "Restaurant",
    Icon: UtensilsCrossed,
    tagline: "POS, online ordering & delivery",
    desc: "One system for the counter, kitchen, delivery driver and customer's phone — with reports the owner can read.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Restaurant POS and food ordering application",
  },
  {
    slug: "health",
    label: "Health",
    Icon: HeartPulse,
    tagline: "Clinics, EHR & telehealth",
    desc: "Appointment booking, patient records, prescriptions and telehealth for clinics, hospitals and healthcare providers.",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    imgAlt: "Healthcare clinic management and EHR system",
  },
];

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve — Ozeonix Infinity" },
      {
        name: "description",
        content:
          "We build custom software for e-commerce, education, health, fitness, restaurants, events, fintech and more. Explore the industries we serve.",
      },
      { property: "og:title", content: "Industries We Serve — Ozeonix Infinity" },
      {
        property: "og:description",
        content: "Industries we serve with custom software, CRM and ERP solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix.com/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ozeonix.com/industries" }],
  }),
  component: Industries,
});

function Industries() {
  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label="Industries Ozeonix Infinity serves">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Who we work with</span>
                <h1>Industries We Serve — 9 verticals, one careful way of building.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  From a single-classroom coaching centre to a multi-chain restaurant — the pattern
                  is the same: understand how the business actually runs, then design software that
                  fits it. Not the other way round.
                </p>
                <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Discuss your project <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/services" className="oz-btn oz-btn--outline">
                    Our Services
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="oz-section" aria-label="Industry verticals with detail pages">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">Our Verticals</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Specialized solutions for every sector.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-3">
            {INDUSTRY_HIGHLIGHTS.map(({ slug, label, Icon, tagline, desc, img, imgAlt }, i) => (
              <Reveal key={slug} index={i % 3}>
                <Link
                  to="/industries/$slug"
                  params={{ slug }}
                  style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                  aria-label={`Explore ${label} solutions`}
                >
                  <article
                    className="oz-card"
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                      <img
                        src={img}
                        alt={imgAlt}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.4s ease",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to bottom, transparent 55%, rgba(10,12,30,0.65) 100%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: 14,
                          left: 14,
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: "var(--oz-primary)",
                            color: "#fff",
                          }}
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: "#fff",
                          }}
                        >
                          {label}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "clamp(1rem, 2vw, 1.25rem)",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--oz-primary)",
                          display: "block",
                          marginBottom: 8,
                        }}
                      >
                        {tagline}
                      </strong>
                      <p style={{ margin: "0 0 16px", flex: 1 }}>{desc}</p>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--oz-primary)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        View solutions <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label="Start a project in your industry">
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow" style={{ color: "var(--oz-primary)" }}>
              Your industry, our expertise
            </span>
            <h2>Don't see your industry? We can still help.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              We've worked across 10+ verticals. If you don't see yours listed, tell us about your
              business — we'll figure out the right approach together.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Discuss your project <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="https://wa.me/9779769294624" className="oz-btn oz-btn--on-dark">
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
