import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { revealConfig, REVEAL_PRESETS } from "@/lib/revealConfig";

/**
 * RevealGroup — sets a section-wide animation preset that all child
 * <Reveal> components inherit unless they pass their own `direction` prop.
 */
export const RevealContext = createContext({
  preset: revealConfig.defaultPreset,
  stepDelay: null,
  duration: null,
  debug: false,
});

export function useRevealContext() {
  return useContext(RevealContext);
}

export default function RevealGroup({
  preset = revealConfig.defaultPreset,
  stepDelay = null,
  duration = null,
  debug,
  as: Tag = "div",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const parent = useContext(RevealContext);
  const groupStyle = { ...style };
  if (stepDelay != null) groupStyle["--oz-reveal-step"] = `${stepDelay}s`;
  if (duration != null) groupStyle["--oz-reveal-duration"] = `${duration}s`;

  return (
    <RevealContext.Provider
      value={{
        preset,
        stepDelay: stepDelay ?? parent.stepDelay,
        duration: duration ?? parent.duration,
        debug: debug ?? parent.debug ?? revealConfig.debug,
      }}
    >
      <Tag className={className} style={groupStyle} {...rest}>
        {children}
      </Tag>
    </RevealContext.Provider>
  );
}

RevealGroup.propTypes = {
  preset: PropTypes.oneOf(REVEAL_PRESETS),
  stepDelay: PropTypes.number,
  duration: PropTypes.number,
  debug: PropTypes.bool,
};
