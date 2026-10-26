/**
 * Global Reveal configuration.
 * Change these values to fine-tune scroll-reveal pacing site-wide.
 * Applied as CSS custom properties on :root at app startup.
 */
export const revealConfig = {
  stepDelay: 0.07,
  duration: 0.56,
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  slideDistance: 36,
  defaultPreset: "auto",
  debug: false,
};

export const REVEAL_PRESETS = ["left", "right", "up", "fade", "auto"];
export const REVEAL_DIRECTIONS = ["left", "right", "up", "fade", "none", "auto"];

export function mergeRevealConfig(overrides = {}) {
  return { ...revealConfig, ...Object.fromEntries(Object.entries(overrides).filter(([, v]) => v != null)) };
}

export function revealCssVars(cfg) {
  const out = {};
  if (cfg.stepDelay != null) out["--oz-reveal-step"] = `${cfg.stepDelay}s`;
  if (cfg.duration != null) out["--oz-reveal-duration"] = `${cfg.duration}s`;
  if (cfg.easing != null) out["--oz-reveal-easing"] = cfg.easing;
  if (cfg.slideDistance != null) out["--oz-reveal-distance"] = `${cfg.slideDistance}px`;
  return out;
}

export function applyRevealConfig(cfg = revealConfig) {
  if (typeof document === "undefined") return;
  const r = document.documentElement.style;
  r.setProperty("--oz-reveal-step", `${cfg.stepDelay}s`);
  r.setProperty("--oz-reveal-duration", `${cfg.duration}s`);
  r.setProperty("--oz-reveal-easing", cfg.easing);
  r.setProperty("--oz-reveal-distance", `${cfg.slideDistance}px`);
}
