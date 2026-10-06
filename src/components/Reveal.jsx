import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useRevealContext } from "./RevealGroup";
import { revealConfig, REVEAL_PRESETS, REVEAL_DIRECTIONS } from "@/lib/revealConfig";

/**
 * Reveal — scroll-triggered animation.
 *
 * Direction resolution (highest priority first):
 *   1. `direction` prop
 *   2. `preset` from the nearest <RevealGroup>/<RevealProvider>
 *   3. `revealConfig.defaultPreset`
 */
export default function Reveal({
  children,
  index = 0,
  direction,
  debug,
  as: Tag = "div",
  className = "",
  style = {},
  ...rest
}) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const group = useRevealContext();
  const debugOn = debug ?? group.debug ?? revealConfig.debug;

  const preset = direction || group.preset || revealConfig.defaultPreset;
  const dir = preset === "auto" ? (index % 2 === 0 ? "left" : "right") : preset;
  const stepDelay = group.stepDelay ?? revealConfig.stepDelay;
  const duration = group.duration ?? revealConfig.duration;
  const delay = index * stepDelay;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    setMounted(true);
    if (debugOn) {
      // eslint-disable-next-line no-console
      console.debug("[Reveal]", { index, preset, direction: dir, delay: `${delay}s`, duration: `${duration}s` });
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = [
    "oz-reveal",
    `oz-reveal--${dir}`,
    mounted ? "js-reveal" : "",
    visible ? "is-visible" : "",
    debugOn ? "oz-reveal--debug" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      className={cls}
      style={{ "--oz-reveal-delay": `calc(${index} * var(--oz-reveal-step, 0.12s))`, ...style }}
      {...rest}
    >
      {children}
      {debugOn ? (
        <span className="oz-reveal-debug" aria-hidden="true">
          {dir} · d={delay.toFixed(2)}s · dur={Number(duration).toFixed(2)}s
        </span>
      ) : null}
    </Tag>
  );
}

Reveal.propTypes = {
  index: PropTypes.number,
  direction: PropTypes.oneOf(REVEAL_DIRECTIONS),
  debug: PropTypes.bool,
};

// Re-export presets for convenience.
export { REVEAL_PRESETS, REVEAL_DIRECTIONS };
