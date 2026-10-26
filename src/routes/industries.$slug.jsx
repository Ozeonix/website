import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import { INDUSTRY_ITEMS } from "../components/Navbar.jsx";
import { CheckCircle2, ArrowRight } from "lucide-react";

const DETAILS = {
  "e-commerce": {
    tagline: "Online stores that convert",
    lead: "From a first Shopify launch to a custom multi-vendor marketplace — we build storefronts that load fast, rank on Google, and keep customers coming back.",
    solutions: [
      "Custom storefronts (Next.js, Shopify, WooCommerce)",
      "Multi-vendor marketplaces with vendor dashboards",
      "Inventory, orders & fulfillment automation",
      "Payment gateways, coupons & loyalty programs",
      "SEO, analytics & abandoned-cart recovery",
    ],
    outcomes: ["Faster checkout", "Higher conversion", "Lower CAC"],
  },
  "on-demand": {
    tagline: "Uber-style apps, done right",
    lead: "Delivery, taxi, home-services, rentals — the on-demand model is a solved pattern. We wire up the maps, tracking, dispatching and payments so you can focus on the operations.",
    solutions: [
      "Customer + provider + admin apps (Flutter)",
      "Live tracking with Google Maps / Mapbox",
      "Smart dispatch, surge pricing & scheduling",
      "In-app chat, ratings and re-order flows",
      "Wallet, tips and driver payouts",
    ],
    outcomes: ["Faster dispatch", "Repeat orders", "Operational control"],
  },
  "fitness": {
    tagline: "Software for gyms, coaches & studios",
    lead: "Bookings, membership renewals, workout plans and progress tracking — one branded app for your members and a clean admin for your team.",
    solutions: [
      "Class & PT bookings with capacity limits",
      "Membership plans, renewals & auto-billing",
      "Workout / diet plan builder with progress logs",
      "Trainer scheduling and check-in QR codes",
      "Community feed and challenges",
    ],
    outcomes: ["More renewals", "Less admin work", "Stronger community"],
  },
  "payments": {
    tagline: "Fintech flows built to clear compliance",
    lead: "Wallets, subscriptions, split payouts, KYC — we build the parts of a payment product that regulators, auditors and users all care about.",
    solutions: [
      "Wallet, top-up and P2P transfers",
      "Subscription billing & dunning",
      "Split payouts for marketplaces",
      "KYC / AML onboarding flows",
      "Ledger, reconciliation and reporting",
    ],
    outcomes: ["Audit-ready books", "Fewer failed payments", "Faster onboarding"],
  },
  "entertainment": {
    tagline: "Streaming, media & fan platforms",
    lead: "OTT, podcasts, ticketed live streams, fan communities — media apps live and die by playback quality and content ops. We handle both.",
    solutions: [
      "Video / audio streaming (HLS, DRM)",
      "Subscriptions, rentals and pay-per-view",
      "Creator dashboards and content moderation",
      "Recommendation feeds & watchlists",
      "Live streaming with chat and reactions",
    ],
    outcomes: ["Smoother playback", "Higher watch time", "Scalable content ops"],
  },
  "education": {
    tagline: "LMS, coaching & school platforms",
    lead: "From a single coaching centre to a multi-branch institute, we build the ERP, LMS, parent app and student portal — connected, not siloed.",
    solutions: [
      "School / college ERP with fees, attendance & exams",
      "LMS with video lessons, quizzes and certificates",
      "Parent, student and teacher mobile apps",
      "Admissions, enquiries and CRM",
      "Live classes with Zoom / Jitsi integration",
    ],
    outcomes: ["Better parent trust", "Less paperwork", "Higher enrolment"],
  },
  "event": {
    tagline: "Ticketing & event management",
    lead: "Concerts, conferences, weddings, meetups — we build the ticketing, check-in, and attendee experience end to end.",
    solutions: [
      "Ticketing with tiered pricing and promo codes",
      "QR check-in, badges and on-site scanning",
      "Attendee app: agenda, speakers, networking",
      "Sponsor and exhibitor management",
      "Post-event analytics and lead capture",
    ],
    outcomes: ["Faster check-in", "Higher ticket sales", "Sponsor ROI"],
  },
  "restaurant": {
    tagline: "POS, online ordering & delivery",
    lead: "One system for the counter, the kitchen, the delivery driver and the customer's phone — with reports the owner can actually read.",
    solutions: [
      "POS with KOT printing and table management",
      "Online ordering site + branded mobile app",
      "Delivery dispatch and rider tracking",
      "Menu, inventory and recipe costing",
      "Loyalty, offers and WhatsApp marketing",
    ],
    outcomes: ["More direct orders", "Lower food cost", "Repeat customers"],
  },
  "health": {
    tagline: "Clinics, hospitals & telehealth",
    lead: "Appointments, EHR, lab reports, teleconsults — we build healthcare software that respects patient privacy and doctor workflows.",
    solutions: [
      "Appointment booking with slot management",
      "EHR / EMR with prescription and lab reports",
      "Teleconsultation (video + chat)",
      "Pharmacy, billing and insurance claims",
      "Patient app for reports, refills and reminders",
    ],
    outcomes: ["Shorter wait times", "Better follow-ups", "Cleaner records"],
  },
};

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const item = INDUSTRY_ITEMS.find((i) => i.slug === params.slug);
    const detail = DETAILS[params.slug];
    if (!item || !detail) throw notFound();
    return { item, detail };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Industry not found — Ozeonix Infinity" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { item, detail } = loaderData;
    const title = `${item.label} Software Solutions — Ozeonix Infinity`;
    const description = detail.lead;
    const url = `https://ozeonix.com/industries/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        { rel: "canonical", href: url },
      ],
    };
  },
  component: IndustryDetail,
  notFoundComponent: IndustryNotFound,
  errorComponent: ({ reset }) => (
    <section className="oz-section" aria-label="Industry not found"><div className="oz-container"><p>Something went wrong loading this page.</p><button className="oz-btn" onClick={reset}>Retry</button></div></section>
  ),
});

function IndustryNotFound() {
  return (
    <section className="oz-section" aria-label="Industry not found">
      <div className="oz-container">
        <h1>Industry not found</h1>
        <p>We couldn't find that industry. <Link to="/industries">See all industries</Link>.</p>
      </div>
    </section>
  );
}

function IndustryDetail() {
  const { item, detail } = Route.useLoaderData();
  const Icon = item.Icon;

  return (
    <>
      <section className="oz-open" aria-label="Outcomes you can expect">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Industries · {item.label}</span>
                <h1>{detail.tagline}</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <p className="oz-open__lead">{detail.lead}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--tight" aria-label="Outcomes you can expect">
        <div className="oz-container">
          <div className="oz-grid oz-grid-2">
            <Reveal>
              <div className="oz-card oz-card--roomy">
                <span className="oz-card__icon" style={{ marginBottom: "var(--oz-space-3)" }}>
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h2 style={{ marginTop: 0 }}>What we build for {item.label.toLowerCase()}</h2>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                  {detail.solutions.map((s) => (
                    <li key={s} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2, color: "var(--oz-accent, #4f46e5)" }} aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal index={1}>
              <div className="oz-card oz-card--roomy">
                <h2 style={{ marginTop: 0 }}>Outcomes you can expect</h2>
                <div style={{ display: "grid", gap: 12, marginBottom: "var(--oz-space-5)" }}>
                  {detail.outcomes.map((o) => (
                    <div key={o} style={{ padding: "14px 16px", borderRadius: 12, background: "var(--oz-surface-2, rgba(255,255,255,0.04))" }}>
                      <strong>{o}</strong>
                    </div>
                  ))}
                </div>
                <p style={{ color: "var(--oz-muted)" }}>
                  Every {item.label.toLowerCase()} build starts with a free 30-minute discovery call
                  so we can size the work honestly before quoting.
                </p>
                <Link to="/contact" className="oz-btn oz-btn--accent" style={{ marginTop: 8 }}>
                  Start a project <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--tight" aria-label="Explore other industries">
        <div className="oz-container">
          <h2 style={{ marginBottom: "var(--oz-space-4)" }}>Explore other industries</h2>
          <div className="oz-grid oz-grid-4">
            {INDUSTRY_ITEMS.filter((i) => i.slug !== item.slug).map((i) => {
              const OtherIcon = i.Icon;
              return (
                <Link
                  key={i.slug}
                  to="/industries/$slug"
                  params={{ slug: i.slug }}
                  className="oz-card oz-card--industry"
                  style={{ textAlign: "center", padding: 20, textDecoration: "none" }}
                >
                  <span className="oz-card__icon" style={{ margin: "0 auto var(--oz-space-3)" }}>
                    <OtherIcon size={20} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: "0.95rem", margin: 0 }}>{i.label}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
