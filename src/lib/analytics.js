// Lightweight analytics helper for the GTM dataLayer already loaded in __root.jsx.
// Safe to import in any browser code; no-op on the server.

function getViewport() {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 640) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

/**
 * Push any event to window.dataLayer. Fails silently if dataLayer is missing.
 * @param {string} event
 * @param {Record<string, unknown>} [payload]
 */
export function trackEvent(event, payload = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      viewport: getViewport(),
      page_path: window.location?.pathname ?? null,
      ...payload,
    });
  } catch {
    // ignore analytics errors
  }
}

/**
 * Push a conversion event (lead, payment start, partner signup).
 * @param {string} name
 * @param {Record<string, unknown>} [payload]
 */
export function trackConversion(name, payload = {}) {
  trackEvent("conversion", { conversion_name: name, ...payload });
}

/**
 * Push a CTA event to window.dataLayer. Fails silently if dataLayer is missing.
 * @param {"cta_impression"|"cta_click"} event
 * @param {{cta_id?: string, cta_label?: string, selected?: boolean, extra?: Record<string, unknown>}} payload
 */
export function trackCTA(event, payload = {}) {
  trackEvent(event, {
    cta_id: payload.cta_id ?? null,
    cta_label: payload.cta_label ?? null,
    cta_selected: payload.selected ?? false,
    ...(payload.extra || {}),
  });
}
