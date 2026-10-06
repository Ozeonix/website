// Referral code capture: /?ref=OZAB12CD is remembered for 60 days.
const KEY = "oz_ref_code";
const TTL_MS = 60 * 24 * 60 * 60 * 1000;

export function captureReferralCode() {
  if (typeof window === "undefined") return;
  try {
    const code = new URLSearchParams(window.location.search).get("ref");
    if (code && /^[A-Za-z0-9]{4,20}$/.test(code)) {
      localStorage.setItem(KEY, JSON.stringify({ code: code.toUpperCase(), t: Date.now() }));
    }
  } catch {
    /* ignore */
  }
}

export function getReferralCode() {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "";
    const { code, t } = JSON.parse(raw);
    if (!code || Date.now() - t > TTL_MS) return "";
    return code;
  } catch {
    return "";
  }
}
