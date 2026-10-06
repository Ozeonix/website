import { createFileRoute } from "@tanstack/react-router";
import Reveal from "../components/Reveal.jsx";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Ozeonix Infinity" },
      { name: "description", content: "ERP, CRM, HRMS, POS and AI products built by Ozeonix Infinity." },
      { property: "og:title", content: "Products — Ozeonix Infinity" },
      { property: "og:description", content: "ERP, CRM, HRMS, POS and AI products built by Ozeonix Infinity." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ozeonix-infinity.ozeonix.app/products" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://ozeonix-infinity.ozeonix.app/products" },
    ],
  }),
  component: Products,
});

const GROUPS = [
  { g: "Educational Solutions", items: ["School ERP", "College ERP", "Institute Management", "Student Information System (SIS)", "LMS", "Attendance", "Fees", "Exam & Results", "Library", "Hostel", "Transport"] },
  { g: "Business Management", items: ["CRM", "ERP", "HRMS", "Inventory", "Payroll", "Project Management", "Document Management", "Asset Management"] },
  { g: "Retail & Commerce", items: ["POS System", "Billing & Invoicing", "Retail Management", "E-Commerce Platform", "Order Management"] },
  { g: "Healthcare (Planned)", items: ["Hospital Management", "Clinic Management", "Pharmacy Management", "Appointment Booking"] },
  { g: "Hospitality (Planned)", items: ["Hotel Management", "Restaurant Management", "Table Reservation"] },
  { g: "AI & Automation (Future)", items: ["AI Business Assistant", "AI Customer Support Chatbot", "AI Document Processing", "AI Workflow Automation", "AI Analytics"] },
];

function Products() {
  return (
    <>
      <section className="oz-open" aria-label="Products &amp; Software Suites — Ready-to-tailor CRM, ERP &amp; LMS platforms.">
        <div className="oz-container">
          <div className="oz-open__grid">
            <Reveal>
              <div>
                <span className="oz-open__index">Six suites, one platform</span>
                <h1>Products &amp; Software Suites — Ready-to-tailor CRM, ERP &amp; LMS platforms.</h1>
              </div>
            </Reveal>
            <Reveal index={1}>
              <div>
                <p className="oz-open__lead">
                  These are the platforms we build and rebuild for our clients. Each one starts from a proven base
                  and gets tailored to your team’s vocabulary, workflows and reports.
                </p>
                <div className="oz-open__meta">
                  <span><strong>3</strong> live suites</span>
                  <span><strong>3</strong> in planning</span>
                </div>
              </div>
            </Reveal>
          </div>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-grid oz-grid-2">
            {GROUPS.map((g, i) => (
              <Reveal key={g.g} index={i % 2}>
                <article className="oz-card">
                  <span className="oz-tag" style={{ alignSelf: "flex-start", marginBottom: 12 }}>Suite {String(i + 1).padStart(2, "0")}</span>
                  <h3>{g.g}</h3>
                  <ul className="oz-list" style={{ margin: 0, paddingLeft: 18 }}>
                    {g.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
