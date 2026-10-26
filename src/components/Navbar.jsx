import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown, ShoppingCart, Truck, Dumbbell, CreditCard, Film,
  GraduationCap, CalendarDays, UtensilsCrossed, HeartPulse,
} from "lucide-react";
import logoAsset from "../assets/ozeonix-infinity-nav-logo.png.asset.json";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { useAuth } from "../hooks/useAuth.jsx";

export const INDUSTRY_ITEMS = [
  { slug: "e-commerce",    label: "E-commerce",    Icon: ShoppingCart,    d: "Online stores & marketplaces" },
  { slug: "on-demand",     label: "On-demand",     Icon: Truck,           d: "Delivery & booking apps" },
  { slug: "fitness",       label: "Fitness",       Icon: Dumbbell,        d: "Gyms, trainers & wellness" },
  { slug: "payments",      label: "Payments",      Icon: CreditCard,      d: "Wallets & fintech flows" },
  { slug: "entertainment", label: "Entertainment", Icon: Film,            d: "Streaming, media & events" },
  { slug: "education",     label: "Education",     Icon: GraduationCap,   d: "Schools, LMS & coaching" },
  { slug: "event",         label: "Event",         Icon: CalendarDays,    d: "Ticketing & event platforms" },
  { slug: "restaurant",    label: "Restaurant",    Icon: UtensilsCrossed, d: "POS, ordering & delivery" },
  { slug: "health",        label: "Health",        Icon: HeartPulse,      d: "Clinics, EHR & telehealth" },
];

const MENUS = [
  { label: "Home", to: "/" },
  {
    label: "Company",
    children: [
      { to: "/about", label: "About Us", d: "Our mission, vision & team" },
      { to: "/process", label: "Our Process", d: "How we deliver projects" },
      { to: "/careers", label: "Careers", d: "Join our growing team" },
    ],
  },
  {
    label: "Services",
    children: [
      { to: "/services", label: "All Services", d: "Explore our capabilities" },
      { to: "/services/crm-solutions", label: "CRM Solutions", d: "Sales and customer platforms" },
      { to: "/services/erp-development", label: "ERP Development", d: "Connected business operations" },
      { to: "/services/lms-platforms", label: "LMS Platforms", d: "Learning for schools and teams" },
    ],
  },
  {
    label: "Industries",
    children: INDUSTRY_ITEMS.map((i) => ({
      to: "/industries/$slug",
      params: { slug: i.slug },
      label: i.label,
      d: i.d,
      Icon: i.Icon,
    })),
  },
  {
    label: "Solutions",
    children: [
      { to: "/industries", label: "All Industries", d: "Verticals we serve" },
      { to: "/products", label: "Products", d: "Ready-to-deploy platforms" },
      { to: "/portfolio", label: "Portfolio", d: "Selected work & demos" },
    ],
  },
  {
    label: "Resources",
    children: [
      { to: "/faq", label: "FAQ", d: "Common questions answered" },
    ],
  },
  {
    label: "Partners",
    children: [
      { to: "/partner-program", label: "Partner Program", d: "Earn 10% per referred project" },
      { to: "/auth", label: "Partner Login", d: "Sign in to your dashboard" },
    ],
  },
];

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [desktopMenu, setDesktopMenu] = useState(null);
  const menuRefs = useRef({});
  const triggerRefs = useRef({});
  const mobileToggleRef = useRef(null);

  useEffect(() => {
    const close = () => {
      setDesktopMenu(null);
      if (window.innerWidth >= 1120) setOpen(false);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const focusMenuItem = (label, index) => {
    const items = menuRefs.current[label] || [];
    items[(index + items.length) % items.length]?.focus();
  };

  const onMenuKeyDown = (event, label, index) => {
    const items = menuRefs.current[label] || [];
    if (event.key === "Escape") {
      event.preventDefault();
      setDesktopMenu(null);
      triggerRefs.current[label]?.focus();
    } else if (event.key === "ArrowDown") {
      event.preventDefault(); focusMenuItem(label, index + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); focusMenuItem(label, index - 1);
    } else if (event.key === "Home") {
      event.preventDefault(); focusMenuItem(label, 0);
    } else if (event.key === "End") {
      event.preventDefault(); focusMenuItem(label, items.length - 1);
    }
  };

  return (
    <header className="oz-nav">
      <div className="oz-container oz-nav__inner">
        <Link to="/" className="oz-brand oz-brand--logo" onClick={() => setOpen(false)} aria-label="Ozeonix Infinity home">
          <img className="oz-brand__logo" src={logoAsset.url} alt="Ozeonix Infinity" width={1774} height={887} decoding="async" fetchPriority="high" />
        </Link>

        <nav className="oz-navlinks" aria-label="Primary">
          {MENUS.map((m) => {
            const children = m.label === "Partners" && user
              ? [...m.children, { to: "/partner", label: "My Dashboard", d: "Referrals & commission" }]
              : m.children;
            return children ? (
              <div
                key={m.label}
                className={`oz-navitem ${desktopMenu === m.label ? "is-open" : ""}`}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setDesktopMenu(null);
                }}
              >
                <button
                  ref={(element) => { triggerRefs.current[m.label] = element; }}
                  className="oz-navitem__trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={desktopMenu === m.label}
                  aria-controls={`nav-menu-${m.label.toLowerCase()}`}
                  onClick={() => setDesktopMenu(desktopMenu === m.label ? null : m.label)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                      event.preventDefault();
                      setDesktopMenu(m.label);
                       const index = event.key === "ArrowDown" ? 0 : children.length - 1;
                      window.setTimeout(() => {
                        document.querySelectorAll(`#nav-menu-${m.label.toLowerCase()} [role="menuitem"]`)[index]?.focus();
                      }, 0);
                    } else if (event.key === "Escape") setDesktopMenu(null);
                  }}
                >
                  {m.label}
                  <ChevronDown size={14} strokeWidth={2.4} />
                </button>
                <div id={`nav-menu-${m.label.toLowerCase()}`} className="oz-dropdown" role="menu" aria-hidden={desktopMenu !== m.label}>
                  <div className="oz-dropdown__inner">
                     {children.map((c) => {
                      const Icon = c.Icon;
                      return (
                        <Link
                          key={c.label + (c.params?.slug ?? c.to)}
                          to={c.to}
                          params={c.params}
                          className="oz-dropdown__item"
                          role="menuitem"
                          tabIndex={desktopMenu === m.label ? 0 : -1}
                          ref={(element) => {
                            if (!menuRefs.current[m.label]) menuRefs.current[m.label] = [];
                             menuRefs.current[m.label][children.indexOf(c)] = element;
                          }}
                           onKeyDown={(event) => onMenuKeyDown(event, m.label, children.indexOf(c))}
                          onClick={() => setDesktopMenu(null)}
                        >
                          <span className="oz-dropdown__title">
                            {Icon ? <Icon size={14} strokeWidth={2} style={{ marginRight: 8, verticalAlign: "-2px" }} /> : null}
                            {c.label}
                          </span>
                          <span className="oz-dropdown__desc">{c.d}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={m.to}
                to={m.to}
                activeProps={{ className: "active" }}
                activeOptions={{ exact: m.to === "/" }}
              >
                {m.label}
              </Link>
            );
          })}
        </nav>

        <div className="oz-nav__right">
          <LanguageSwitcher />
          <Link to="/pay" className="oz-btn oz-btn--outline oz-nav__cta">
            Pay online
          </Link>
          <Link to="/contact" className="oz-btn oz-btn--accent oz-nav__cta">
            Discuss your project
          </Link>
        </div>

        <button
          ref={mobileToggleRef}
          className="oz-nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="oz-nav__mobile"
          aria-describedby="mobile-nav-description"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            mobileToggleRef.current?.focus();
          }}
        >
          <DialogTitle className="oz-sr-only">Site navigation</DialogTitle>
          <DialogDescription id="mobile-nav-description" className="oz-sr-only">Navigate Ozeonix Infinity pages and services.</DialogDescription>
          <div className="oz-container">
            <Link to="/" className="oz-brand oz-brand--logo oz-nav__mbrand" onClick={() => setOpen(false)} aria-label="Ozeonix Infinity home">
              <img className="oz-brand__logo" src={logoAsset.url} alt="Ozeonix Infinity" width={1774} height={887} loading="lazy" decoding="async" />
            </Link>
          {MENUS.map((m) => {
            const children = m.label === "Partners" && user
              ? [...m.children, { to: "/partner", label: "My Dashboard", d: "Referrals & commission" }]
              : m.children;
            return children ? (
              <div key={m.label} className="oz-nav__mgroup">
                <button
                  type="button"
                  className="oz-nav__mgroup-trigger"
                  onClick={() => setMobileGroup(mobileGroup === m.label ? null : m.label)}
                  aria-expanded={mobileGroup === m.label}
                >
                  {m.label}
                  <ChevronDown size={16} style={{ transform: mobileGroup === m.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {mobileGroup === m.label && (
                  <div className="oz-nav__mgroup-list">
                     {children.map((c) => (
                      <Link
                        key={c.label + (c.params?.slug ?? c.to)}
                        to={c.to}
                        params={c.params}
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={m.to} to={m.to} onClick={() => setOpen(false)}>
                {m.label}
              </Link>
            );
          })}
          <div className="oz-nav__mobile-language">
            <LanguageSwitcher />
          </div>
            <Link to="/pay" onClick={() => setOpen(false)} className="oz-btn oz-btn--outline oz-nav__mobile-cta">
              Pay online
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="oz-btn oz-btn--accent oz-nav__mobile-cta">
              Discuss your project
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
