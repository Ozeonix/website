import PropTypes from "prop-types";
import { RevealContext } from "./RevealGroup";
import { revealConfig, mergeRevealConfig, revealCssVars, REVEAL_PRESETS } from "@/lib/revealConfig";

/**
 * RevealProvider — scope Reveal pacing & preset to a route or layout subtree.
 * Applies CSS custom properties on a wrapper element (not :root), so overrides
 * don't leak globally. Nested <Reveal>/<RevealGroup> inherit via context.
 */
export default function RevealProvider({
  preset,
  stepDelay,
  duration,
  easing,
  slideDistance,
  debug,
  as: Tag = "div",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const cfg = mergeRevealConfig({ stepDelay, duration, easing, slideDistance });
  const vars = revealCssVars(cfg);
  const resolvedPreset = preset || revealConfig.defaultPreset;

  return (
    <RevealContext.Provider
      value={{
        preset: resolvedPreset,
        stepDelay: cfg.stepDelay,
        duration: cfg.duration,
        debug: debug ?? revealConfig.debug,
      }}
    >
      <Tag className={className} style={{ ...vars, ...style }} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  );
}

RevealProvider.propTypes = {
  preset: PropTypes.oneOf(REVEAL_PRESETS),
  stepDelay: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  slideDistance: PropTypes.number,
  debug: PropTypes.bool,
};
