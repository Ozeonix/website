import React from "react";
import { Link } from "@tanstack/react-router";
import { LuCheck, LuArrowRight, LuShieldCheck, LuSparkles, LuClock, LuCode } from "react-icons/lu";
import { useMarket } from "../../lib/market/MarketContext";
import { MARKETS, MARKET_CODES } from "../../config/markets";
import Reveal from "../Reveal";

export default function PricingPageView() {
  const { currentMarket, marketCode, switchMarket, getLocalizedPath } = useMarket();

  return (
    <div className="oz-pricing-page">
      {/* Hero Section */}
      <section
        className="oz-section oz-pricing-hero"
        style={{ paddingTop: "120px", paddingBottom: "60px" }}
      >
        <div className="oz-container oz-center">
          <Reveal>
            <span
              className="oz-eyebrow"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <LuSparkles size={14} aria-hidden="true" />
              <span>
                {currentMarket.name} Market ({currentMarket.currency}) · Transparent Pricing
              </span>
            </span>
          </Reveal>

          <Reveal index={1}>
            <h1 className="oz-title" style={{ maxWidth: "800px", margin: "16px auto" }}>
              Predictable investments for <span>world-class digital products.</span>
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="oz-muted" style={{ maxWidth: "640px", margin: "0 auto 32px" }}>
              No hidden retainers, no mystery markups. Every engagement includes complete source
              code ownership, responsive UI/UX, enterprise architecture, and a dedicated post-launch
              engineering warranty.
            </p>
          </Reveal>

          {/* Regional Market Switcher Pills */}
          <Reveal index={3}>
            <div
              className="oz-pricing-market-tabs"
              role="tablist"
              aria-label="Select pricing currency and region"
              style={{
                display: "inline-flex",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "30px",
                padding: "4px",
                gap: "4px",
                marginBottom: "40px",
              }}
            >
              {MARKET_CODES.map((code) => {
                const item = MARKETS[code];
                const isActive = code === marketCode;
                return (
                  <button
                    key={code}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => switchMarket(code)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "24px",
                      border: "none",
                      backgroundColor: isActive ? "var(--brand-orange, #ea580c)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease-out",
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ opacity: isActive ? 0.9 : 0.6, fontSize: "12px" }}>
                      ({item.currencySymbol})
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="oz-section" style={{ paddingTop: 0, paddingBottom: "80px" }}>
        <div className="oz-container">
          <div
            className="oz-pricing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
              alignItems: "stretch",
            }}
          >
            {currentMarket.pricingTiers.map((tier, idx) => {
              const isPopular = Boolean(tier.badge);
              return (
                <Reveal key={tier.name} index={idx + 1} className="oz-pricing-card-wrap">
                  <div
                    className={`oz-card oz-card--pricing ${isPopular ? "is-featured" : ""}`}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      padding: "36px 30px",
                      borderRadius: "16px",
                      border: isPopular
                        ? "2px solid var(--brand-orange, #ea580c)"
                        : "1px solid var(--border)",
                      backgroundColor: "var(--surface)",
                      boxShadow: isPopular
                        ? "0 10px 30px -5px rgba(234, 88, 12, 0.15), 0 0 20px rgba(79, 70, 229, 0.1)"
                        : "0 2px 20px 0px rgba(72, 86, 100, 0.08)",
                      transform: isPopular ? "translateY(-6px)" : "none",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    }}
                  >
                    {isPopular && (
                      <div
                        style={{
                          position: "absolute",
                          top: "-13px",
                          right: "24px",
                          backgroundColor: "var(--brand-orange, #ea580c)",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          padding: "4px 12px",
                          borderRadius: "12px",
                        }}
                      >
                        {tier.badge}
                      </div>
                    )}

                    <div style={{ marginBottom: "20px" }}>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "8px" }}>
                        {tier.name}
                      </h3>
                      <p className="oz-muted" style={{ fontSize: "14px", minHeight: "42px" }}>
                        {tier.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        margin: "16px 0 28px",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-primary)" }}
                      >
                        {tier.price}
                      </span>
                      <span className="oz-muted" style={{ fontSize: "14px" }}>
                        / {tier.period}
                      </span>
                    </div>

                    <div style={{ flex: 1, marginBottom: "32px" }}>
                      <h4
                        style={{
                          fontSize: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "var(--text-muted, #64748b)",
                          marginBottom: "14px",
                        }}
                      >
                        Included Features
                      </h4>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {tier.features.map((feat) => (
                          <li
                            key={feat}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              fontSize: "14px",
                              lineHeight: 1.45,
                            }}
                          >
                            <span
                              style={{
                                color: "var(--brand-orange, #ea580c)",
                                display: "inline-flex",
                                marginTop: "2px",
                              }}
                            >
                              <LuCheck size={16} aria-hidden="true" />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={getLocalizedPath("/contact")}
                      className={`oz-btn ${isPopular ? "oz-btn--primary" : "oz-btn--outline"}`}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{tier.cta}</span>
                      <LuArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Section */}
      <section
        className="oz-section"
        style={{
          backgroundColor: "var(--surface-tint, rgba(0, 0, 0, 0.02))",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="oz-container">
          <div className="oz-section-head oz-center">
            <Reveal>
              <span className="oz-eyebrow">The Ozeonix Commitment</span>
            </Reveal>
            <Reveal index={1} as="h2">
              Engineering integrity built into every contract.
            </Reveal>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "40px",
            }}
          >
            <Reveal index={1}>
              <div
                className="oz-card"
                style={{ padding: "28px", borderRadius: "12px", background: "var(--surface)" }}
              >
                <div style={{ color: "var(--brand-orange)", marginBottom: "12px" }}>
                  <LuShieldCheck size={28} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                  100% IP & Code Ownership
                </h3>
                <p className="oz-muted" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                  You retain full legal ownership of your repositories, databases, design tokens,
                  and infrastructure keys.
                </p>
              </div>
            </Reveal>

            <Reveal index={2}>
              <div
                className="oz-card"
                style={{ padding: "28px", borderRadius: "12px", background: "var(--surface)" }}
              >
                <div style={{ color: "var(--brand-orange)", marginBottom: "12px" }}>
                  <LuClock size={28} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                  Milestone-Based Billing
                </h3>
                <p className="oz-muted" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                  Transparent sprint payments tied to verifiable staging milestones. Never pay for
                  unverified delivery.
                </p>
              </div>
            </Reveal>

            <Reveal index={3}>
              <div
                className="oz-card"
                style={{ padding: "28px", borderRadius: "12px", background: "var(--surface)" }}
              >
                <div style={{ color: "var(--brand-orange)", marginBottom: "12px" }}>
                  <LuCode size={28} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}>
                  Production SLA Warranty
                </h3>
                <p className="oz-muted" style={{ fontSize: "14px", lineHeight: 1.5 }}>
                  Every project includes comprehensive post-launch warranty, covering bug fixes,
                  performance monitoring, and security.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
