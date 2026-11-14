import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { INDUSTRY_ITEMS } from "../components/Navbar.jsx";
import { CheckCircle2, ArrowRight } from "lucide-react";

const DETAILS = {
  "e-commerce": {
    tagline: "Online stores that convert",
    lead: "From a first Shopify launch to a custom multi-vendor marketplace — we build storefronts that load fast, rank on Google, and keep customers coming back.",
    heroImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "E-commerce store with shopping cart and product listings",
    solutions: [
      "Custom storefronts (React, Shopify, WooCommerce)",
      "Multi-vendor marketplaces with vendor dashboards",
      "Inventory, orders & fulfillment automation",
      "Payment gateways, coupons & loyalty programs",
      "SEO, analytics & abandoned-cart recovery",
    ],
    outcomes: ["Faster checkout", "Higher conversion", "Lower CAC"],
    featureImg: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Online shopping interface with product catalog",
    stats: [
      { n: "3x", l: "Average checkout speed improvement" },
      { n: "40%", l: "Increase in repeat purchases" },
      { n: "99.9%", l: "Uptime during peak seasons" },
    ],
  },
  "on-demand": {
    tagline: "Uber-style apps, done right",
    lead: "Delivery, taxi, home-services, rentals — the on-demand model is a solved pattern. We wire up the maps, tracking, dispatching and payments so you can focus on operations.",
    heroImg: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "On-demand delivery app with live tracking on mobile",
    solutions: [
      "Customer + provider + admin apps (Flutter)",
      "Live tracking with Google Maps / Mapbox",
      "Smart dispatch, surge pricing & scheduling",
      "In-app chat, ratings and re-order flows",
      "Wallet, tips and driver payouts",
    ],
    outcomes: ["Faster dispatch", "Repeat orders", "Operational control"],
    featureImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Delivery driver using on-demand service app",
    stats: [
      { n: "2 min", l: "Average dispatch time" },
      { n: "60%", l: "Reduction in missed orders" },
      { n: "4.8★", l: "Average app store rating" },
    ],
  },
  fitness: {
    tagline: "Software for gyms, coaches & studios",
    lead: "Bookings, membership renewals, workout plans and progress tracking — one branded app for your members and a clean admin for your team.",
    heroImg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Modern gym facility with fitness management app on screen",
    solutions: [
      "Class & PT bookings with capacity limits",
      "Membership plans, renewals & auto-billing",
      "Workout / diet plan builder with progress logs",
      "Trainer scheduling and check-in QR codes",
      "Community feed and challenges",
    ],
    outcomes: ["More renewals", "Less admin work", "Stronger community"],
    featureImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Fitness class booking and member management app",
    stats: [
      { n: "35%", l: "Increase in membership renewals" },
      { n: "80%", l: "Reduction in no-shows with reminders" },
      { n: "2hrs", l: "Saved per week on admin" },
    ],
  },
  payments: {
    tagline: "Fintech flows built to clear compliance",
    lead: "Wallets, subscriptions, split payouts, KYC — we build the parts of a payment product that regulators, auditors and users all care about.",
    heroImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Digital payment and fintech application interface",
    solutions: [
      "Wallet, top-up and P2P transfers",
      "Subscription billing & dunning",
      "Split payouts for marketplaces",
      "KYC / AML onboarding flows",
      "Ledger, reconciliation and reporting",
    ],
    outcomes: ["Audit-ready books", "Fewer failed payments", "Faster onboarding"],
    featureImg: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Mobile payment app with wallet and transaction history",
    stats: [
      { n: "99%", l: "Payment success rate" },
      { n: "2 min", l: "KYC completion time" },
      { n: "0", l: "Compliance violations on audit" },
    ],
  },
  entertainment: {
    tagline: "Streaming, media & fan platforms",
    lead: "OTT, podcasts, ticketed live streams, fan communities — media apps live and die by playback quality and content ops. We handle both.",
    heroImg: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Video streaming platform with content library",
    solutions: [
      "Video / audio streaming (HLS, DRM)",
      "Subscriptions, rentals and pay-per-view",
      "Creator dashboards and content moderation",
      "Recommendation feeds & watchlists",
      "Live streaming with chat and reactions",
    ],
    outcomes: ["Smoother playback", "Higher watch time", "Scalable content ops"],
    featureImg: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Media streaming on multiple devices and platforms",
    stats: [
      { n: "4K", l: "Streaming quality supported" },
      { n: "50ms", l: "Average playback start time" },
      { n: "99.5%", l: "CDN delivery uptime" },
    ],
  },
  education: {
    tagline: "LMS, coaching & school platforms",
    lead: "From a single coaching centre to a multi-branch institute, we build the ERP, LMS, parent app and student portal — connected, not siloed.",
    heroImg: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "School management system with student and teacher interface",
    solutions: [
      "School / college ERP with fees, attendance & exams",
      "LMS with video lessons, quizzes and certificates",
      "Parent, student and teacher mobile apps",
      "Admissions, enquiries and CRM",
      "Live classes with Zoom / Jitsi integration",
    ],
    outcomes: ["Better parent trust", "Less paperwork", "Higher enrolment"],
    featureImg: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Students and teachers using digital education platform",
    stats: [
      { n: "90%", l: "Reduction in manual paperwork" },
      { n: "25%", l: "Increase in enrolment inquiries" },
      { n: "98%", l: "Parent satisfaction with updates" },
    ],
  },
  event: {
    tagline: "Ticketing & event management",
    lead: "Concerts, conferences, weddings, meetups — we build the ticketing, check-in, and attendee experience end to end.",
    heroImg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Event management with ticketing and crowd at venue",
    solutions: [
      "Ticketing with tiered pricing and promo codes",
      "QR check-in, badges and on-site scanning",
      "Attendee app: agenda, speakers, networking",
      "Sponsor and exhibitor management",
      "Post-event analytics and lead capture",
    ],
    outcomes: ["Faster check-in", "Higher ticket sales", "Sponsor ROI"],
    featureImg: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Event ticketing app with QR code check-in system",
    stats: [
      { n: "5s", l: "Average QR check-in time" },
      { n: "30%", l: "Increase in advance ticket sales" },
      { n: "2x", l: "Faster gate entry vs manual" },
    ],
  },
  restaurant: {
    tagline: "POS, online ordering & delivery",
    lead: "One system for the counter, the kitchen, the delivery driver and the customer's phone — with reports the owner can actually read.",
    heroImg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Modern restaurant with POS system and food ordering",
    solutions: [
      "POS with KOT printing and table management",
      "Online ordering site + branded mobile app",
      "Delivery dispatch and rider tracking",
      "Menu, inventory and recipe costing",
      "Loyalty, offers and WhatsApp marketing",
    ],
    outcomes: ["More table turns", "Higher delivery orders", "Wastage control"],
    featureImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Restaurant kitchen display and food delivery tracking",
    stats: [
      { n: "20%", l: "Increase in table turn rate" },
      { n: "40%", l: "Reduction in food wastage" },
      { n: "3x", l: "Growth in online orders" },
    ],
  },
  health: {
    tagline: "Clinics, EHR & telehealth",
    lead: "Appointment booking, patient records, prescriptions and telehealth — we build the digital layer that makes a clinic run smoothly and patients feel cared for.",
    heroImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    heroImgAlt: "Healthcare clinic with digital patient management system",
    solutions: [
      "Appointment booking with reminders & rescheduling",
      "Electronic Health Records (EHR)",
      "Prescription & pharmacy management",
      "Telehealth / video consultation",
      "Billing, insurance and analytics",
    ],
    outcomes: ["No-show reduction", "Faster consultations", "Better patient records"],
    featureImg: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
    featureImgAlt: "Doctor using digital health records and patient management",
    stats: [
      { n: "60%", l: "Reduction in appointment no-shows" },
      { n: "15min", l: "Saved per consultation with EHR" },
      { n: "100%", l: "Patient data privacy compliance" },
    ],
  },
};

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const item = INDUSTRY_ITEMS.find((i) => i.slug === params.slug);
    const detail = DETAILS[params.slug];
    if (!item || !detail) throw notFound();
    return { item, detail };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { item, detail } = loaderData;
    return {
      meta: [
        { title: `${item.label} Software Solutions | Ozeonix Infinity` },
        {
          name: "description",
          content: `${detail.tagline} — ${detail.lead.slice(0, 140)}`,
        },
        { property: "og:title", content: `${item.label} Software Solutions | Ozeonix Infinity` },
        { property: "og:description", content: detail.tagline },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: `https://ozeonix.com/industries/${item.slug}`,
        },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: `https://ozeonix.com/industries/${item.slug}` },
      ],
    };
  },
  notFoundComponent: IndustryNotFound,
  errorComponent: ({ error, reset }) => (
    <section className="oz-section" aria-label="Error">
      <div className="oz-container">
        <p>An error occurred loading this page.</p>
        <button className="oz-btn" onClick={reset}>
          Retry
        </button>
      </div>
    </section>
  ),
  component: IndustryDetail,
});

function IndustryNotFound() {
  return (
    <section className="oz-section" aria-label="Industry not found">
      <div className="oz-container">
        <h1>Industry not found</h1>
        <p>
          We couldn't find that industry. <Link to="/industries">See all industries</Link>.
        </p>
      </div>
    </section>
  );
}

function IndustryDetail() {
  const { item, detail } = Route.useLoaderData();
  const Icon = item.Icon;

  return (
    <>
      {/* Hero */}
      <section className="oz-open" aria-label={`${item.label} solutions`}>
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Industries · {item.label}</span>
                <h1>{detail.tagline}</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">{detail.lead}</p>
                <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <Link to="/contact" className="oz-btn oz-btn--primary">
                    Start a project <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <Link to="/industries" className="oz-btn oz-btn--outline">
                    All Industries
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      {/* Hero Image */}
      <section className="oz-section oz-section--tight" aria-label={`${item.label} overview`}>
        <div className="oz-container">
          <Reveal>
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "21/8",
                boxShadow: "0 24px 56px -16px rgba(15,23,42,0.22)",
              }}
            >
              <img
                src={detail.heroImg}
                alt={detail.heroImgAlt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats Row */}
      <section className="oz-section oz-section--tight oz-section--muted" aria-label="Key outcomes">
        <div className="oz-container">
          <div className="oz-grid oz-grid-3">
            {detail.stats.map((s, i) => (
              <Reveal key={s.l} index={i % 3}>
                <div className="oz-card" style={{ textAlign: "center", padding: "clamp(1.5rem, 3vw, 2rem)" }}>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      fontWeight: 800,
                      color: "var(--oz-primary)",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {s.n}
                  </strong>
                  <span style={{ fontSize: "0.9rem", color: "var(--oz-muted-foreground)" }}>
                    {s.l}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions + Outcomes */}
      <section className="oz-section" aria-label={`What we build for ${item.label}`}>
        <div className="oz-container">
          <div className="oz-grid oz-grid-2" style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
            <Reveal>
              <article className="oz-card" style={{ height: "100%" }}>
                <span
                  className="oz-card__icon"
                  style={{ marginBottom: "var(--oz-space-3)", background: "var(--oz-primary)", color: "#fff" }}
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h2 style={{ marginTop: 0 }}>
                  What we build for {item.label.toLowerCase()}
                </h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                  {detail.solutions.map((s) => (
                    <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        style={{ flexShrink: 0, marginTop: 2, color: "var(--brand-green, #00A982)" }}
                        aria-hidden="true"
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal index={1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1rem, 2vw, 1.5rem)", height: "100%" }}>
                <article className="oz-card">
                  <h2 style={{ marginTop: 0 }}>Outcomes you can expect</h2>
                  <div style={{ display: "grid", gap: 12, marginBottom: "var(--oz-space-5)" }}>
                    {detail.outcomes.map((o) => (
                      <div
                        key={o}
                        style={{
                          padding: "14px 16px",
                          borderRadius: 12,
                          background: "var(--oz-surface-2, rgba(0,0,0,0.04))",
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "var(--oz-primary)",
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                        <strong>{o}</strong>
                      </div>
                    ))}
                  </div>
                  <p style={{ color: "var(--oz-muted-foreground)", margin: 0 }}>
                    Every {item.label.toLowerCase()} build starts with a free 30-minute discovery
                    call so we can size the work honestly before quoting.
                  </p>
                </article>
                <div
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    aspectRatio: "16/9",
                    boxShadow: "0 16px 40px -12px rgba(15,23,42,0.18)",
                    flex: 1,
                    minHeight: 160,
                  }}
                >
                  <img
                    src={detail.featureImg}
                    alt={detail.featureImgAlt}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="oz-section oz-section--muted" aria-label="Explore other industries">
        <div className="oz-container">
          <div className="oz-section-head">
            <Reveal>
              <span className="oz-eyebrow">More Verticals</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Explore other industries.
            </Reveal>
          </div>
          <div className="oz-grid oz-grid-4">
            {INDUSTRY_ITEMS.filter((i) => i.slug !== item.slug).map((i, idx) => {
              const OtherIcon = i.Icon;
              return (
                <Reveal key={i.slug} index={idx % 4}>
                  <Link
                    to="/industries/$slug"
                    params={{ slug: i.slug }}
                    className="oz-card oz-card--industry"
                    style={{
                      textAlign: "center",
                      padding: 20,
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    aria-label={`Explore ${i.label} solutions`}
                  >
                    <span className="oz-card__icon" style={{ margin: "0 auto var(--oz-space-3)" }} aria-hidden="true">
                      <OtherIcon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 style={{ fontSize: "0.95rem", margin: 0 }}>{i.label}</h3>
                    <p style={{ fontSize: "0.78rem", color: "var(--oz-muted-foreground)", margin: "6px 0 0" }}>
                      {i.d}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="oz-section oz-section--dark" aria-label={`Start a ${item.label} project`}>
        <div className="oz-container oz-center">
          <Reveal>
            <span className="oz-eyebrow">
              {item.label} · Ready to build?
            </span>
            <h2>Let's talk about your {item.label.toLowerCase()} project.</h2>
            <p className="oz-muted" style={{ maxWidth: 500, margin: "12px auto 0" }}>
              A free 30-minute discovery call. We'll understand your needs, propose the right
              solution and quote you honestly before any work begins.
            </p>
            <div
              style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}
            >
              <Link to="/contact" className="oz-btn oz-btn--primary">
                Start a project <ArrowRight size={16} aria-hidden="true" />
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
