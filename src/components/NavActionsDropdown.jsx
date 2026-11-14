import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  CreditCard,
  MessageSquare,
  Globe,
  Check,
} from "lucide-react";
import { LANGUAGES, useLang } from "@/lib/i18n/LanguageContext";

export default function NavActionsDropdown({ className = "" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) {
      setLangOpen(false);
      return;
    }
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const closeAll = () => {
    setOpen(false);
    setLangOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAll();
    }
  };

  return (
    <div
      className={`oz-actions-dropdown ${className}`}
      ref={ref}
      onKeyDown={onKeyDown}
      data-no-translate="true"
    >
      <button
        ref={triggerRef}
        type="button"
        className={`oz-actions-trigger ${open ? "is-active" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Quick actions menu"
        onClick={() => setOpen((v) => !v)}
      >
        <Sparkles size={14} className="oz-actions-trigger-icon" aria-hidden="true" />
        <span>Quick Actions</span>
        <ChevronDown
          size={12}
          strokeWidth={2.4}
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
          }}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="oz-actions-menu" role="menu">
          {/* Primary CTA: Discuss your project */}
          <Link
            to="/contact"
            className="oz-actions-item oz-actions-item--primary"
            role="menuitem"
            onClick={closeAll}
          >
            <div className="oz-actions-item-left">
              <span className="oz-actions-item-icon">
                <MessageSquare size={15} aria-hidden="true" />
              </span>
              <span>Discuss your project</span>
            </div>
            <span className="oz-actions-item-badge">New</span>
          </Link>

          {/* Pay online */}
          <Link
            to="/pay"
            className="oz-actions-item"
            role="menuitem"
            onClick={closeAll}
          >
            <div className="oz-actions-item-left">
              <span className="oz-actions-item-icon">
                <CreditCard size={15} aria-hidden="true" />
              </span>
              <span>Pay online</span>
            </div>
            <ChevronRight size={13} style={{ opacity: 0.5 }} aria-hidden="true" />
          </Link>

          <div className="oz-actions-divider" role="separator" />

          {/* Sub-dropdown: Language */}
          <div className="oz-actions-submenu-wrap">
            <button
              type="button"
              className={`oz-actions-submenu-trigger ${langOpen ? "is-open" : ""}`}
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <div className="oz-actions-item-left">
                <span className="oz-actions-item-icon">
                  <Globe size={15} aria-hidden="true" />
                </span>
                <span>Language</span>
              </div>
              <span className="oz-actions-submenu-val">
                {current.label} ({current.short})
                <ChevronRight
                  size={13}
                  className="oz-actions-submenu-arrow"
                  style={{
                    transform: langOpen ? "rotate(90deg)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                  aria-hidden="true"
                />
              </span>
            </button>

            {langOpen && (
              <div className="oz-actions-sublist" role="menu" aria-label="Language options">
                {LANGUAGES.map((l) => {
                  const isActive = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      className={`oz-actions-subitem-btn ${isActive ? "is-active" : ""}`}
                      onClick={() => {
                        setLang(l.code);
                        closeAll();
                      }}
                    >
                      <span className="oz-actions-subitem-label">
                        {isActive && (
                          <Check size={12} strokeWidth={2.6} className="oz-actions-check" />
                        )}
                        {l.label}
                      </span>
                      <span className="oz-lang-pill">{l.short}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
