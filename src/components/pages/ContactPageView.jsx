import React from "react";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { LuPhone, LuMail, LuMapPin, LuClock, LuMessageCircle } from "react-icons/lu";
import Reveal from "../Reveal.jsx";
import ProjectBriefForm from "../ProjectBriefForm.jsx";
import { useMarket } from "../../lib/market/MarketContext";

export default function ContactPageView() {
  const { currentMarket } = useMarket();

  return (
    <>
      <section
        className="oz-open"
        aria-label="Contact Ozeonix Infinity about custom software development"
      >
        <div className="oz-container">
          <Reveal>
            <span className="oz-open__index">{currentMarket.name} Market · Say hello</span>
            <h1>Let’s shape your next digital product.</h1>
            <div className="oz-quickrow">
              <span>
                WhatsApp{" "}
                <a
                  href={`https://wa.me/${currentMarket.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {currentMarket.whatsappDisplay}
                </a>
              </span>
              {currentMarket.address && (
                <span>
                  Office <strong>{currentMarket.address}</strong>
                </span>
              )}
              {!currentMarket.address && (
                <span>
                  Delivery <strong>Worldwide Engineering &amp; Client Consultation</strong>
                </span>
              )}
              <span>
                Replies{" "}
                <strong style={{ color: "var(--brand-orange, #ea580c)" }}>
                  within one business day
                </strong>
              </span>
            </div>
          </Reveal>
          <hr className="oz-open__rule" />
        </div>
      </section>

      <section className="oz-section oz-section--tight">
        <div className="oz-container">
          <div className="oz-split" style={{ alignItems: "start" }}>
            <Reveal>
              <div className="oz-card">
                <h2>Prefer to talk first?</h2>
                <p className="oz-muted">
                  A short call or WhatsApp chat is usually the fastest way to figure out if we’re a
                  good fit for your project and timeline.
                </p>
                <div className="oz-contact-actions">
                  <a
                    href={`https://wa.me/${currentMarket.whatsapp}?text=${encodeURIComponent(
                      `Hello Ozeonix Infinity, I would like to discuss a software project for ${currentMarket.name}.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oz-btn oz-btn--primary"
                    aria-label={`Message us on WhatsApp at ${currentMarket.whatsappDisplay}`}
                  >
                    <LuMessageCircle size={18} aria-hidden="true" style={{ marginRight: 6 }} />
                    Message on WhatsApp
                  </a>
                  {currentMarket.phone && (
                    <a
                      href={`tel:${currentMarket.phone.replace(/[^+\d]/g, "")}`}
                      className="oz-btn oz-btn--outline"
                      aria-label={`Call us at ${currentMarket.phone}`}
                    >
                      <LuPhone size={16} aria-hidden="true" style={{ marginRight: 6 }} />
                      Call {currentMarket.phone}
                    </a>
                  )}
                  <a
                    href={`mailto:${currentMarket.email}`}
                    className="oz-btn oz-btn--outline"
                    aria-label={`Email us at ${currentMarket.email}`}
                  >
                    <LuMail size={16} aria-hidden="true" style={{ marginRight: 6 }} />
                    {currentMarket.email}
                  </a>
                </div>

                <hr className="oz-divider" />

                <h3 style={{ fontSize: "1.1rem", marginBottom: 12, fontWeight: 700 }}>
                  Working Hours &amp; Response Times
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}
                  className="oz-muted"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <LuClock
                      size={16}
                      aria-hidden="true"
                      style={{ color: "var(--brand-orange)" }}
                    />
                    <span>Active Timezone: {currentMarket.timezone}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <LuClock
                      size={16}
                      aria-hidden="true"
                      style={{ color: "var(--brand-orange)" }}
                    />
                    <span>Direct engineering consultation 7 days a week</span>
                  </div>
                </div>

                <hr className="oz-divider" />

                <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>Follow along</h2>
                <div className="oz-social-links" aria-label="Social media profiles">
                  <a
                    href="https://www.linkedin.com/company/ozeonix-infinity"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Ozeonix Infinity on LinkedIn"
                    className="oz-social-link"
                  >
                    <FaLinkedinIn size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.instagram.com/ozeonix.infinity"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Ozeonix Infinity on Instagram"
                    className="oz-social-link"
                  >
                    <FaInstagram size={18} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.facebook.com/ozeonix.infinity"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Ozeonix Infinity on Facebook"
                    className="oz-social-link"
                  >
                    <FaFacebookF size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>

            <div className="oz-contact-form-wrap">
              <ProjectBriefForm formLocation="contact_page" heading={false} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
