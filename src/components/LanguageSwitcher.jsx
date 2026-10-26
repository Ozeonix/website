import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { LANGUAGES, useLang } from "@/lib/i18n/LanguageContext";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
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
    const next = event.key === "ArrowDown" ? index + 1 : event.key === "ArrowUp" ? index - 1 : event.key === "Home" ? 0 : event.key === "End" ? LANGUAGES.length - 1 : null;
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
        aria-haspopup="listbox"
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
        <ul className="oz-lang__menu" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                ref={(element) => { optionRefs.current[LANGUAGES.indexOf(l)] = element; }}
                type="button"
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? "is-active" : ""}
                tabIndex={l.code === lang ? 0 : -1}
                onKeyDown={(event) => onOptionKeyDown(event, LANGUAGES.indexOf(l))}
                onClick={() => { setLang(l.code); close(); }}
              >
                <span className="oz-lang__code">{l.short}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
