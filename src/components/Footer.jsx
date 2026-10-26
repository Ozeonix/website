import { Link } from "@tanstack/react-router";
import logoAsset from "../assets/ozeonix-infinity-footer-logo.png.asset.json";


export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="oz-footer">
      <div className="oz-container">
        <div className="oz-footer__grid">
          <div className="oz-footer__brand">
            <img className="oz-brand__logo oz-brand__logo--footer" src={logoAsset.url} alt="Ozeonix Infinity" width={1774} height={887} decoding="async" />
            <p className="oz-footer__intro"><strong>Shape The Thought. Power Tomorrow</strong> — We build websites, apps, CRM and ERP solutions for modern businesses and institutions.</p>
            <address className="oz-footer__contact">
              <div><strong>WhatsApp</strong><a href="https://wa.me/9777483509984" aria-label="Chat on WhatsApp at +977 74835 09984">+977-7483509984</a></div>
              <div><strong>Call</strong><a href="tel:+9777483509984" aria-label="Call +977 74835 09984">+977-7483509984</a></div>
              <div><strong>Address</strong><span>Siddharthanagar, Bhairahawa, Rupandehi, Nepal</span></div>
              <div><strong>Hours</strong><span>24 Hours</span></div>
            </address>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/partner-program">Partner Program</Link>
            <Link to="/auth">Partner Login</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Solutions</h4>
            <Link to="/services">Services</Link>
            <Link to="/products">Products</Link>
            <Link to="/industries">Industries</Link>
            <Link to="/portfolio">Portfolio</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>

        <div className="oz-footer__bottom">
          <span>© {year} Ozeonix Infinity. All rights reserved.</span>
          <span className="oz-footer__founded"><i aria-hidden="true" />Made with care.</span>
        </div>
      </div>
    </footer>
  );
}
