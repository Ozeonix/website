import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";
import {
  School, GraduationCap, Landmark, BookOpen, Presentation,
  Rocket, Building2, Briefcase, Store, ShoppingCart,
  UtensilsCrossed, Hotel, Stethoscope, HeartPulse, Pill,
  Home, HardHat, Factory, Truck, Plane,
  Banknote, Calculator, Scale, HandHeart, Building,
  CalendarDays, Dumbbell, Scissors, User, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Ozeonix Infinity" },
      { name: "description", content: "We serve schools, colleges, startups, SMEs, healthcare, retail, hospitality, real estate and more." },
      { property: "og:title", content: "Industries — Ozeonix Infinity" },
      { property: "og:description", content: "Industries we serve with custom software, CRM and ERP solutions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/industries" },
    ],
  }),
  component: Industries,
});

const LIST = [
  { name: "Schools", Icon: School },
  { name: "Colleges", Icon: GraduationCap },
  { name: "Universities", Icon: Landmark },
  { name: "Educational Institutions", Icon: BookOpen },
  { name: "Coaching Centers", Icon: Presentation },
  { name: "Startups", Icon: Rocket },
  { name: "Small & Medium Businesses", Icon: Building2 },
  { name: "Corporate Enterprises", Icon: Briefcase },
  { name: "Retail Stores", Icon: Store },
  { name: "E-Commerce", Icon: ShoppingCart },
  { name: "Restaurants & Cafés", Icon: UtensilsCrossed },
  { name: "Hotels & Hospitality", Icon: Hotel },
  { name: "Healthcare Clinics", Icon: Stethoscope },
  { name: "Hospitals", Icon: HeartPulse },
  { name: "Pharmacies", Icon: Pill },
  { name: "Real Estate", Icon: Home },
  { name: "Construction", Icon: HardHat },
  { name: "Manufacturing", Icon: Factory },
  { name: "Logistics", Icon: Truck },
  { name: "Travel & Tourism", Icon: Plane },
  { name: "Financial Services", Icon: Banknote },
  { name: "Chartered Accountants", Icon: Calculator },
  { name: "Law Firms", Icon: Scale },
  { name: "NGOs", Icon: HandHeart },
  { name: "Government", Icon: Building },
  { name: "Event Management", Icon: CalendarDays },
  { name: "Fitness Centers", Icon: Dumbbell },
  { name: "Salons & Spas", Icon: Scissors },
  { name: "Freelancers", Icon: User },
  { name: "Personal Brands", Icon: Sparkles },
];

function Industries() {
  return (
    <>
      <section className="oz-open">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Who we work with</span>
                <h1>Industries We Serve — {LIST.length} kinds of businesses, one careful way of building.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <p className="oz-open__lead">
                From a single-classroom coaching centre to a multi-branch retail chain — the pattern is the same:
                understand how the business really runs, then design software that fits it, not the other way round.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-grid oz-grid-4">
            {LIST.map(({ name, Icon }, i) => (
              <Reveal key={name} index={i % 4}>
                <div className="oz-card oz-card--industry" style={{ textAlign: "center", padding: 24 }}>
                  <span className="oz-card__icon" style={{ margin: "0 auto var(--oz-space-3)" }}>
                    <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 style={{ fontSize: "1rem", margin: 0 }}>{name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
