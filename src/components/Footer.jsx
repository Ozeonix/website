import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Phone, Mail, Check } from "lucide-react";
import logoAsset from "../assets/ozeonix-infinity-footer-logo.png.asset.json";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="oz-footer oz-footer--upgraded">
      {/* Dynamic Wave Vector Background */}
      <div className="oz-footer__bg" aria-hidden="true">
        <div className="oz-footer__bg-glow oz-footer__bg-glow--tr" />
        <div className="oz-footer__bg-glow oz-footer__bg-glow--bl" />
        <svg
          className="oz-footer__bg-lines"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="oz-footer-wire-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6900" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#FF6900" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#FFA040" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FF6900" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <g
            fill="none"
            stroke="url(#oz-footer-wire-grad)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.6"
          >
            <path d="M40 285 C350 285 780 180 1160 30" />
            <path d="M40 285 C350 285 780 185 1160 42" />
            <path d="M40 285 C350 285 780 190 1160 54" />
            <path d="M40 285 C350 285 780 195 1160 66" />
            <path d="M40 285 C350 285 780 200 1160 78" />
            <path d="M40 285 C350 285 780 205 1160 90" />
            <path d="M40 285 C350 285 780 210 1160 102" />
            <path d="M40 285 C350 285 780 215 1160 114" />
            <path d="M40 285 C350 285 780 220 1160 126" />
            <path d="M40 285 C350 285 780 225 1160 138" />
            <path d="M40 285 C350 285 780 230 1160 150" />
            <path d="M40 285 C350 285 780 235 1160 162" />
            <path d="M40 285 C350 285 780 240 1160 174" />
            <path d="M40 285 C350 285 780 245 1160 186" />
            <path d="M40 285 C350 285 780 250 1160 198" />
            <path d="M40 285 C350 285 780 255 1160 210" />
            <path d="M40 285 C350 285 780 260 1160 222" />
            <path d="M40 285 C350 285 780 265 1160 234" />
            <path d="M40 285 C350 285 780 270 1160 246" />
            <path d="M40 285 C350 285 780 275 1160 258" />
          </g>
        </svg>
      </div>

      <div className="oz-container oz-footer__content">
        {/* Top Header Row — Logo Only (No Redundant Text) + Social Circles */}
        <header className="oz-footer__header">
          <div className="oz-footer__header-brand">
            <Link to="/" aria-label="Ozeonix Infinity Home" className="oz-footer__logo-link">
              <img
                className="oz-brand__logo oz-brand__logo--footer oz-footer__header-logo"
                src={logoAsset.url}
                alt="Ozeonix Infinity"
                width={1774}
                height={887}
                decoding="async"
              />
            </Link>
          </div>

          <nav className="oz-footer__socials" aria-label="Social media profiles">
            <a
              href="https://www.facebook.com/ozeonix.infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 13.5h2.5l1-4H14v-2c0-1.03.36-1.5 1.5-1.5h2V2.14c-.88-.12-1.78-.18-2.67-.18-2.73 0-4.33 1.66-4.33 4.54v3H8v4h2.5v10h3.5v-10z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/ozeonix-infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.37 9.74v-8.37H5.1v8.37h2.73z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ozeonix.infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.282.292 2.394 1.272 3.374.98.98 2.092 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.282-.059 2.394-.292 3.374-1.272.98-.98 1.213-2.092 1.272-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.282-.292-2.394-1.272-3.374-.98-.98-2.092-1.213-3.374-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a
              href="https://wa.me/9779769294624"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.271-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516-.175-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.078 2.909 1.228 3.11.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.721.229 1.377.197 1.895.12.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.577-.35zm-5.452 7.618c-2.17 0-4.202-.58-5.962-1.59l-.427-.247-4.431 1.162 1.183-4.32-.278-.442c-1.121-1.788-1.714-3.87-1.714-6.003 0-6.175 5.025-11.2 11.2-11.2 2.991 0 5.803 1.165 7.918 3.28 2.115 2.116 3.28 4.927 3.28 7.92 0 6.176-5.024 11.2-11.2 11.2z" />
              </svg>
            </a>
            <a
              href="tel:+9779769294624"
              aria-label="Call +977-9769294624"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.25 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
          </nav>
        </header>

        {/* 4 Columns Grid */}
        <div className="oz-footer__grid oz-footer__grid--4col">
          {/* Column 1: Quick Links */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot" aria-hidden="true" /> Quick Links
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="oz-footer__nav-list">
                <li>
                  <Link to="/" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Careers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/partner-program" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Partner Program</span>
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Partner Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 2: Solutions */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot" aria-hidden="true" /> Solutions
            </h4>
            <nav aria-label="Solutions">
              <ul className="oz-footer__nav-list">
                <li>
                  <Link to="/services" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link to="/industries" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Industries</span>
                  </Link>
                </li>
                <li>
                  <Link to="/portfolio" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>Portfolio</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/crm-solutions" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>CRM Systems</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/erp-development" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>ERP Platforms</span>
                  </Link>
                </li>
                <li>
                  <Link to="/services/lms-platforms" className="oz-footer__nav-link">
                    <ChevronRight size={13} className="oz-footer__arrow" aria-hidden="true" />
                    <span>LMS Solutions</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot" aria-hidden="true" /> Contact Us
            </h4>
            <address className="oz-footer__contact-items">
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">
                  <MapPin size={16} aria-hidden="true" />
                </span>
                <span className="oz-footer__contact-text">
                  Siddharthanagar, Bhairahawa, Rupandehi, Nepal
                </span>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">
                  <Phone size={16} aria-hidden="true" />
                </span>
                <a href="tel:+9779769294624" className="oz-footer__contact-link">
                  +977-9769294624
                </a>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">
                  <img
                    src="/assets/whatsapp-icon.png"
                    alt=""
                    aria-hidden="true"
                    width="18"
                    height="18"
                    className="oz-footer__contact-img"
                  />
                </span>
                <span className="oz-footer__contact-label">WhatsApp:</span>
                <a
                  href="https://wa.me/9779769294624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oz-footer__contact-link"
                >
                  +977-9769294624
                </a>
              </div>
            </address>

            <h5 className="oz-footer__sub-title">Office &amp; Support</h5>
            <ul className="oz-footer__hours-list">
              <li className="oz-footer__hours-item">
                <span>Mon – Sun</span>
                <span className="oz-footer__hours-val">24/7 Available</span>
              </li>
              <li className="oz-footer__hours-item">
                <span>Direct Support</span>
                <span className="oz-footer__hours-val">Product Team</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot" aria-hidden="true" /> Stay Updated
            </h4>
            <p className="oz-footer__newsletter-desc">
              Subscribe to product updates, engineering insights, and tech releases from Ozeonix
              Infinity.
            </p>

            {subscribed ? (
              <div className="oz-footer__subscribed-msg" role="status">
                <Check size={16} className="oz-footer__subscribed-icon" aria-hidden="true" />
                <span>Thank you! You’re on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="oz-footer__form">
                <div className="oz-footer__input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    aria-label="Your email address"
                    className="oz-footer__input"
                  />
                  <span className="oz-footer__input-icon" aria-hidden="true">
                    <Mail size={16} />
                  </span>
                </div>
                <button type="submit" className="oz-btn oz-btn--primary oz-footer__submit-btn">
                  Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="oz-footer__bottom">
          <p className="oz-footer__copyright">
            © {year} <strong className="oz-footer__brand-strong">Ozeonix Infinity</strong>. All
            rights reserved.
          </p>
          <nav className="oz-footer__legal-links" aria-label="Legal">
            <Link to="/privacy" className="oz-footer__legal-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="oz-footer__legal-link">
              Terms &amp; Conditions
            </Link>
            <Link to="/refund" className="oz-footer__legal-link">
              Refund Policy
            </Link>
            <Link to="/cookies" className="oz-footer__legal-link">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
