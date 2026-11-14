import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Globe, ChevronDown, CreditCard, MessageSquare } from "lucide-react";
import { LANGUAGES, useLang } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher({ className = "", showActions = false }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[LANGUAGES.findIndex((item) => item.code === lang)]?.focus();
  }, [open, lang]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const onOptionKeyDown = (event, index) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    const next =
      event.key === "ArrowDown"
        ? index + 1
        : event.key === "ArrowUp"
          ? index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? LANGUAGES.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    optionRefs.current[(next + LANGUAGES.length) % LANGUAGES.length]?.focus();
  };

  return (
    <div className={`oz-lang ${className}`} ref={ref} data-no-translate="true">
      <button
        ref={triggerRef}
        type="button"
        className="oz-lang__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <Globe size={14} strokeWidth={2.2} />
        <span>{current.short}</span>
        <ChevronDown size={12} strokeWidth={2.4} />
      </button>
      {open ? (
        <ul className="oz-lang__menu" role="menu">
          {showActions && (
            <li className="oz-lang__section-title" role="presentation">
              Languages
            </li>
          )}
          {LANGUAGES.map((l) => (
            <li key={l.code} role="none">
              <button
                ref={(element) => {
                  optionRefs.current[LANGUAGES.indexOf(l)] = element;
                }}
                type="button"
                role="menuitem"
                aria-selected={l.code === lang}
                className={l.code === lang ? "is-active" : ""}
                tabIndex={open ? 0 : -1}
                onKeyDown={(event) => onOptionKeyDown(event, LANGUAGES.indexOf(l))}
                onClick={() => {
                  setLang(l.code);
                  close();
                }}
              >
                <span className="oz-lang__code">{l.short}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
          {showActions && (
            <>
              <li className="oz-lang__divider" role="separator" />
              <li className="oz-lang__section-title" role="presentation">
                Quick Links
              </li>
              <li role="none">
                <Link
                  to="/pay"
                  className="oz-lang__action-item"
                  role="menuitem"
                  onClick={close}
                >
                  <CreditCard size={15} className="oz-lang__action-icon" aria-hidden="true" />
                  <span>Pay online</span>
                </Link>
              </li>
              <li role="none">
                <Link
                  to="/contact"
                  className="oz-lang__action-item oz-lang__action-item--primary"
                  role="menuitem"
                  onClick={close}
                >
                  <MessageSquare size={15} className="oz-lang__action-icon" aria-hidden="true" />
                  <span>Discuss your project</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      ) : null}
    </div>
  );
}
