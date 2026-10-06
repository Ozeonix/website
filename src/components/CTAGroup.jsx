import { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from "react";
import { trackCTA } from "../lib/analytics";

/**
 * CTAGroup — wraps one or more CTA cards with:
 *  - role="group" + aria-label
 *  - Roving tabindex (arrow keys, Home/End) between children
 *  - Selected child gets aria-current="true" + .is-selected → 70% opacity token
 *  - Fires cta_impression (IntersectionObserver ≥50%) and cta_click via GTM dataLayer
 *
 * Children must be single JSX elements (typically the .oz-cta card <div>). Each
 * child should have a stable `data-cta-id` prop for analytics; falls back to index.
 */
export default function CTAGroup({
  children,
  ariaLabel = "Call to action",
  defaultSelectedIndex = 0,
}) {
  const items = useMemo(() => Children.toArray(children).filter(isValidElement), [children]);
  const [selected, setSelected] = useState(
    Math.min(Math.max(defaultSelectedIndex, 0), Math.max(items.length - 1, 0)),
  );
  const refs = useRef([]);
  refs.current = [];

  const setRef = (el, i) => {
    if (el) refs.current[i] = el;
  };

  const focusIndex = (i) => {
    const next = (i + items.length) % items.length;
    setSelected(next);
    const el = refs.current[next];
    if (el && typeof el.focus === "function") el.focus();
  };

  const onKeyDown = (e) => {
    if (items.length <= 1) return;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusIndex(selected + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusIndex(selected - 1);
        break;
      case "Home":
        e.preventDefault();
        focusIndex(0);
        break;
      case "End":
        e.preventDefault();
        focusIndex(items.length - 1);
        break;
      default:
        break;
    }
  };

  // Impression tracking: fire once per card when ≥50% visible.
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const seen = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
          const el = entry.target;
          const id = el.getAttribute("data-cta-id") || el.getAttribute("aria-label") || "cta";
          if (seen.has(id)) continue;
          seen.add(id);
          trackCTA("cta_impression", {
            cta_id: id,
            cta_label: el.getAttribute("aria-label") || null,
            selected: el.getAttribute("aria-current") === "true",
          });
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [items.length]);

  const onClickCapture = (i) => (e) => {
    const target = e.target;
    // Only track meaningful clicks (link/button inside the card, or the card itself).
    const actionable =
      target.closest?.("a, button") || target === refs.current[i];
    if (!actionable) return;
    const el = refs.current[i];
    if (!el) return;
    trackCTA("cta_click", {
      cta_id: el.getAttribute("data-cta-id") || el.getAttribute("aria-label") || "cta",
      cta_label:
        actionable.getAttribute?.("aria-label") ||
        actionable.textContent?.trim() ||
        el.getAttribute("aria-label"),
      selected: el.getAttribute("aria-current") === "true",
    });
    setSelected(i);
  };

  return (
    <div role="group" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {items.map((child, i) => {
        const isSel = i === selected;
        const existingClass = child.props.className || "";
        const hasSelectedClass = /(^|\s)is-selected(\s|$)/.test(existingClass);
        const nextClass = isSel
          ? hasSelectedClass
            ? existingClass
            : `${existingClass} is-selected`.trim()
          : existingClass.replace(/(^|\s)is-selected(\s|$)/g, " ").trim();
        return cloneElement(child, {
          key: child.key ?? i,
          ref: (el) => setRef(el, i),
          tabIndex: isSel ? 0 : -1,
          "aria-current": isSel ? "true" : undefined,
          className: nextClass,
          onClick: (e) => {
            child.props.onClick?.(e);
            onClickCapture(i)(e);
          },
          onFocus: (e) => {
            child.props.onFocus?.(e);
            setSelected(i);
          },
        });
      })}
    </div>
  );
}
