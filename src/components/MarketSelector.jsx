import React, { useState, useRef, useEffect } from "react";
import { LuGlobe, LuChevronDown, LuCheck } from "react-icons/lu";
import { useMarket } from "../lib/market/MarketContext";
import { MARKETS, MARKET_CODES } from "../config/markets";

export default function MarketSelector({ variant = "navbar" }) {
  const { marketCode, switchMarket, currentMarket } = useMarket();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (code) => {
    setIsOpen(false);
    if (code !== marketCode) {
      switchMarket(code);
    }
  };

  const isFooter = variant === "footer";

  return (
    <div
      ref={dropdownRef}
      className={`oz-market-selector-wrapper ${isFooter ? "oz-market-selector--footer" : ""}`}
      onKeyDown={handleKeyDown}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        type="button"
        className="oz-market-selector-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select Region and Currency. Currently selected: ${currentMarket.name} (${currentMarket.currency})`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: isFooter ? "8px 14px" : "6px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: isFooter ? "var(--text-primary)" : "var(--text-primary)",
          backgroundColor: isFooter ? "var(--surface)" : "transparent",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.2s ease-out",
        }}
      >
        <span style={{ fontSize: "15px", lineHeight: 1 }} aria-hidden="true">
          {currentMarket.flag}
        </span>
        <span
          className="oz-market-selector-label"
          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
        >
          <span>{currentMarket.name}</span>
          <span style={{ opacity: 0.6, fontWeight: 500 }}>({currentMarket.currency})</span>
        </span>
        <LuChevronDown
          size={14}
          aria-hidden="true"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease-out",
            opacity: 0.7,
          }}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Available regional markets"
          className="oz-market-selector-menu"
          style={{
            position: "absolute",
            top: isFooter ? "auto" : "calc(100% + 6px)",
            bottom: isFooter ? "calc(100% + 6px)" : "auto",
            left: 0,
            zIndex: 1100,
            minWidth: "220px",
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            padding: "6px",
            margin: 0,
            listStyle: "none",
          }}
        >
          <li
            style={{
              padding: "6px 10px 4px 10px",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--text-muted, #64748b)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LuGlobe size={13} aria-hidden="true" />
            <span>Select Market & Currency</span>
          </li>

          {MARKET_CODES.map((code) => {
            const market = MARKETS[code];
            const isSelected = code === marketCode;

            return (
              <li key={code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(code)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: "6px",
                    backgroundColor: isSelected ? "var(--brand-orange-50, #fff7ed)" : "transparent",
                    color: isSelected ? "var(--brand-orange, #ea580c)" : "var(--text-primary)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: isSelected ? 700 : 500,
                    textAlign: "left",
                    transition: "background-color 0.15s ease-out",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "16px", lineHeight: 1 }}>{market.flag}</span>
                    <span>{market.name}</span>
                    <span
                      style={{
                        fontSize: "12px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: isSelected
                          ? "rgba(234, 88, 12, 0.15)"
                          : "var(--border, #e2e8f0)",
                        color: isSelected ? "var(--brand-orange, #ea580c)" : "inherit",
                        fontWeight: 600,
                      }}
                    >
                      {market.currency} ({market.currencySymbol})
                    </span>
                  </span>
                  {isSelected && (
                    <LuCheck
                      size={16}
                      aria-hidden="true"
                      style={{ color: "var(--brand-orange)" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
