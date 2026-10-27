import { useState } from "react";
import { Link } from "@tanstack/react-router";
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
      <div className="oz-container oz-footer__content">
        {/* Top Header Row — Logo + Branding + Interactive Social Circles */}
        <div className="oz-footer__header">
          <div className="oz-footer__header-brand">
            <img
              className="oz-brand__logo oz-brand__logo--footer oz-footer__header-logo"
              src={logoAsset.url}
              alt="Ozeonix Infinity"
              width={1774}
              height={887}
              decoding="async"
            />
            <div className="oz-footer__header-text">
              <h3 className="oz-footer__header-title">Ozeonix Infinity</h3>
              <p className="oz-footer__header-subtitle">Shape The Thought. Power Tomorrow</p>
            </div>
          </div>

          <div className="oz-footer__socials" aria-label="Ozeonix Infinity social profiles">
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
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
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
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.282.292 2.394 1.272 3.374.98.98 2.092 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.282-.059 2.394-.292 3.374-1.272.98-.98 1.213-2.092 1.272-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.282-.292-2.394-1.272-3.374-.98-.98-2.092-1.213-3.374-1.272C15.668.013 15.259 0 12 0z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/9777483509984"
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
              href="tel:+9777483509984"
              aria-label="Call +977-7483509984"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.43-3.9-6.82-6.82l1.97-1.57c.27-.27.35-.65.24-1.01A11.36 11.36 0 018.64 4c0-.55-.45-1-1-1H4.15c-.55 0-1 .45-1 1 0 9.39 7.63 17.02 17.02 17.02.55 0 1-.45 1-1v-3.64c0-.55-.45-1-1-1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="oz-footer__grid oz-footer__grid--4col">
          {/* Column 1: Quick Links */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Quick Links
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="oz-footer__nav-list">
                <li>
                  <Link to="/" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Careers
                  </Link>
                </li>
                <li>
                  <Link to="/partner-program" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Partner Program
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Partner Login
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 2: Solutions */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Solutions
            </h4>
            <ul className="oz-footer__nav-list">
              <li>
                <Link to="/services" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Products
                </Link>
              </li>
              <li>
                <Link to="/industries" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Industries
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services/crm-solutions" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> CRM Systems
                </Link>
              </li>
              <li>
                <Link to="/services/erp-development" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> ERP Platforms
                </Link>
              </li>
              <li>
                <Link to="/services/lms-platforms" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> LMS Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Contact Us
            </h4>
            <div className="oz-footer__contact-items">
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">📍</span>
                <span className="oz-footer__contact-text">
                  Siddharthanagar, Bhairahawa, Rupandehi, Nepal
                </span>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">📞</span>
                <a href="tel:+9777483509984" className="oz-footer__contact-link">
                  +977-7483509984
                </a>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">💬</span>
                <a
                  href="https://wa.me/9777483509984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oz-footer__contact-link"
                >
                  WhatsApp: +977-7483509984
                </a>
              </div>
            </div>

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
              <span className="oz-footer__dot">●</span> Stay Updated
            </h4>
            <p className="oz-footer__newsletter-desc">
              Subscribe to product updates, engineering insights, and tech releases from Ozeonix
              Infinity.
            </p>

            {subscribed ? (
              <div className="oz-footer__subscribed-msg" role="status">
                <span className="oz-footer__subscribed-icon">✓</span> Thank you! You’re on the list.
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
                    ✉️
                  </span>
                </div>
                <button type="submit" className="oz-btn oz-btn--primary oz-footer__submit-btn">
                  🚀 Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="oz-footer__bottom">
          <p className="oz-footer__copyright">
            © {year} <span className="oz-footer__brand-strong">Ozeonix Infinity</span>. All rights
            reserved.
          </p>
          <div className="oz-footer__legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
