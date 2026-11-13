import React, { useRef, useState, useEffect, useCallback } from "react";
import { Cpu, Code2, Cloud, TrendingUp } from "lucide-react";

/**
 * Service card definitions floating around the central laptop.
 * Preserves the exact 4 core services of Ozeonix Infinity:
 * 1. AI & GenAI Solutions
 * 2. Web & Mobile Development
 * 3. Cloud & Scalable Systems
 * 4. Digital Growth Solutions
 */
const CARDS = [
  {
    id: "ai-genai",
    title: "AI & GenAI Solutions",
    subtitle: "LLMs · Vision · RAG",
    tag: "Enterprise AI",
    Icon: Cpu,
    color: "#38bdf8", // Cyan accent
    accentBg: "rgba(56, 189, 248, 0.16)",
    borderColor: "rgba(56, 189, 248, 0.45)",
    glowColor: "rgba(56, 189, 248, 0.35)",
    className: "oz-hero-card--top-left",
    floatAnim: "oz-float-tl",
    depth: 1.35,
    statusDot: "#00A982",
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Development",
    subtitle: "React · Flutter · Cloud APIs",
    tag: "Full-Stack",
    Icon: Code2,
    color: "#ea580c", // Brand Orange
    accentBg: "rgba(234, 88, 12, 0.18)",
    borderColor: "rgba(234, 88, 12, 0.48)",
    glowColor: "rgba(234, 88, 12, 0.35)",
    className: "oz-hero-card--bottom-left",
    floatAnim: "oz-float-bl",
    depth: 1.15,
    statusDot: "#ea580c",
  },
  {
    id: "cloud-systems",
    title: "Cloud & Scalable Systems",
    subtitle: "AWS · Cloud-Native · DevOps",
    tag: "99.9% Uptime",
    Icon: Cloud,
    color: "#60a5fa", // Sky/Blue
    accentBg: "rgba(96, 165, 250, 0.16)",
    borderColor: "rgba(96, 165, 250, 0.42)",
    glowColor: "rgba(96, 165, 250, 0.32)",
    className: "oz-hero-card--top-right",
    floatAnim: "oz-float-tr",
    depth: 1.25,
    statusDot: "#38bdf8",
  },
  {
    id: "digital-growth",
    title: "Digital Growth Solutions",
    subtitle: "SEO · Conversion · Analytics",
    tag: "High ROI",
    Icon: TrendingUp,
    color: "#00A982", // Brand Green
    accentBg: "rgba(0, 169, 130, 0.18)",
    borderColor: "rgba(0, 169, 130, 0.45)",
    glowColor: "rgba(0, 169, 130, 0.32)",
    className: "oz-hero-card--bottom-right",
    floatAnim: "oz-float-br",
    depth: 1.45,
    statusDot: "#00A982",
  },
];

/**
 * 7 ambient micro-particles floating in the background with varied timings
 */
const PARTICLES = [
  { id: 1, top: "14%", left: "14%", size: 4, duration: "7.2s", delay: "0s", color: "#ea580c" },
  { id: 2, top: "26%", left: "40%", size: 3, duration: "8.8s", delay: "1.4s", color: "#38bdf8" },
  { id: 3, top: "66%", left: "16%", size: 3.5, duration: "6.9s", delay: "0.6s", color: "#00A982" },
  { id: 4, top: "12%", left: "80%", size: 4, duration: "9.2s", delay: "2.0s", color: "#ea580c" },
  { id: 5, top: "74%", left: "76%", size: 3, duration: "7.6s", delay: "1.2s", color: "#38bdf8" },
  { id: 6, top: "84%", left: "46%", size: 4.5, duration: "8.4s", delay: "0.4s", color: "#00A982" },
  { id: 7, top: "42%", left: "90%", size: 3, duration: "10.2s", delay: "2.6s", color: "#ea580c" },
];

export default function HeroIllustration() {
  const containerRef = useRef(null);
  const rafId = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect accessibility preference for reduced motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Smooth mousemove parallax handler using requestAnimationFrame
  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left) / rect.width;
      const rawY = (e.clientY - rect.top) / rect.height;

      // Map to normalized range [-1, 1]
      const nx = Math.max(-1, Math.min(1, (rawX - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, (rawY - 0.5) * 2));

      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        // Subtle 3D tilt angles: tiltX (pitch) clamped to ±4.5deg, tiltY (yaw) clamped to ±5.5deg
        const tiltX = -ny * 4.5;
        const tiltY = nx * 5.5;
        setMousePos({ x: nx, y: ny, tiltX, tiltY });
        setIsHovered(true);
      });
    },
    [prefersReducedMotion]
  );

  // Smooth reset on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setMousePos({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
      setIsHovered(false);
    });
  }, []);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`oz-hero-illus ${isHovered ? "is-hovered" : ""} ${
        prefersReducedMotion ? "prefers-reduced-motion" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Ozeonix Infinity enterprise SaaS platform with AI, Cloud, Web and Growth ecosystem"
    >
      {/* 1. AMBIENT MULTI-LAYER LIGHT GLOWS */}
      <div
        className="oz-hero-illus__glows"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10}px, 0)`,
          transition: isHovered
            ? "transform 0.15s ease-out"
            : "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
        aria-hidden="true"
      >
        <div className="oz-hero-illus__glow oz-hero-illus__glow--orange" />
        <div className="oz-hero-illus__glow oz-hero-illus__glow--cyan" />
        <div className="oz-hero-illus__glow oz-hero-illus__glow--green" />
        <div className="oz-hero-illus__glow oz-hero-illus__glow--center" />
      </div>

      {/* 2. CONNECTED ENERGY ORBIT & LIGHT TRAILS (SVG) */}
      <svg
        className="oz-hero-illus__orbit-svg"
        viewBox="0 0 906 515"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Main orbit gradient: Orange -> Cyan -> Green -> Orange */}
          <linearGradient id="ozOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.65" />
            <stop offset="70%" stopColor="#00A982" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.75" />
          </linearGradient>

          {/* Secondary inner orbit gradient */}
          <linearGradient id="ozInnerOrbitGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00A982" stopOpacity="0.4" />
          </linearGradient>

          {/* Glow filter for moving energy pulse */}
          <filter id="ozPulseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Curved connection gradients */}
          <linearGradient id="ozTrailTL" x1="60%" y1="70%" x2="10%" y2="20%">
            <stop offset="0%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ozTrailBL" x1="60%" y1="30%" x2="10%" y2="80%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ozTrailTR" x1="30%" y1="70%" x2="90%" y2="20%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="ozTrailBR" x1="30%" y1="30%" x2="90%" y2="80%">
            <stop offset="0%" stopColor="#00A982" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A982" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Orbit System tilted to match laptop 3D perspective */}
        <g transform="rotate(-8 453 260)">
          {/* Main elliptical energy orbit path */}
          <path
            id="ozMainOrbitPath"
            d="M 113,260 A 340,150 0 1,0 793,260 A 340,150 0 1,0 113,260"
            fill="none"
            stroke="url(#ozOrbitGrad)"
            strokeWidth="1.6"
            strokeDasharray="6 8"
            className="oz-orbit-dashed"
          />

          {/* Inner ambient energy ring */}
          <ellipse
            cx="453"
            cy="260"
            rx="215"
            ry="92"
            fill="none"
            stroke="url(#ozInnerOrbitGrad)"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            className="oz-orbit-dashed--rev"
          />

          {/* Moving Glowing Particle 1: Orange Energy Pulse */}
          {!prefersReducedMotion && (
            <circle r="4.5" fill="#ea580c" filter="url(#ozPulseGlow)">
              <animateMotion dur="13s" repeatCount="indefinite">
                <mpath href="#ozMainOrbitPath" />
              </animateMotion>
            </circle>
          )}

          {/* Moving Glowing Particle 2: Cyan Follower Pulse (offset by 6.5s) */}
          {!prefersReducedMotion && (
            <circle r="3.8" fill="#38bdf8" filter="url(#ozPulseGlow)">
              <animateMotion dur="13s" begin="-6.5s" repeatCount="indefinite">
                <mpath href="#ozMainOrbitPath" />
              </animateMotion>
            </circle>
          )}
        </g>

        {/* Interconnection Trails from Laptop Core to 4 Service Cards */}
        <g className="oz-hero-illus__trails">
          {/* Trail to Card 1 (Top-Left) */}
          <path
            d="M 370,205 Q 285,155 210,105"
            fill="none"
            stroke="url(#ozTrailTL)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            className="oz-flow-trail"
          />
          {/* Trail to Card 2 (Bottom-Left) */}
          <path
            d="M 345,305 Q 260,295 170,265"
            fill="none"
            stroke="url(#ozTrailBL)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            className="oz-flow-trail"
          />
          {/* Trail to Card 3 (Top-Right) */}
          <path
            d="M 535,195 Q 635,150 725,105"
            fill="none"
            stroke="url(#ozTrailTR)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            className="oz-flow-trail"
          />
          {/* Trail to Card 4 (Bottom-Right) */}
          <path
            d="M 555,310 Q 645,335 715,345"
            fill="none"
            stroke="url(#ozTrailBR)"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            className="oz-flow-trail"
          />
        </g>
      </svg>

      {/* 3. AMBIENT FLOATING PARTICLES */}
      <div className="oz-hero-illus__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`oz-hero-illus__particle oz-hero-illus__particle--${p.id}`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 4. CENTRAL 3D LAPTOP ECOSYSTEM WITH AMBIENT SHADOW */}
      <div
        className="oz-hero-illus__laptop-anchor"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `rotateX(${mousePos.tiltX * 0.75}deg) rotateY(${mousePos.tiltY * 0.75}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`,
          transition: isHovered
            ? "transform 0.12s ease-out"
            : "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Soft Ambient Ground Shadow that breathes with the laptop float height */}
        <div className="oz-hero-illus__laptop-shadow" aria-hidden="true" />

        {/* Central Laptop Image with continuous smooth vertical floating */}
        <div className="oz-hero-illus__laptop-float">
          <img
            src="/assets/ozeonix-infinity-hero-laptop.png"
            alt="Ozeonix Infinity central enterprise business software and analytics platform"
            className="oz-hero-illus__laptop-img"
            width="906"
            height="515"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* 5. INDEPENDENT FLOATING GLASS SERVICE CARDS */}
      <div className="oz-hero-illus__cards-layer" aria-label="Core service capabilities">
        {CARDS.map((card) => {
          const IconComponent = card.Icon;
          const parallaxX = prefersReducedMotion ? 0 : mousePos.x * 12 * card.depth;
          const parallaxY = prefersReducedMotion ? 0 : mousePos.y * 10 * card.depth;

          return (
            <div
              key={card.id}
              className={`oz-hero-illus__card-slot ${card.className}`}
              style={{
                transform: prefersReducedMotion
                  ? "none"
                  : `translate3d(${parallaxX}px, ${parallaxY}px, ${card.depth * 25}px)`,
                transition: isHovered
                  ? "transform 0.15s ease-out"
                  : "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              <div
                className={`oz-hero-illus__card ${card.floatAnim}`}
                style={{
                  "--card-glow": card.glowColor,
                  "--card-border": card.borderColor,
                }}
              >
                {/* Glowing Glass Icon Badge */}
                <div
                  className="oz-hero-illus__card-icon-badge"
                  style={{
                    backgroundColor: card.accentBg,
                    borderColor: card.borderColor,
                    color: card.color,
                  }}
                >
                  <IconComponent size={16} strokeWidth={2.2} />
                </div>

                {/* Card Information */}
                <div className="oz-hero-illus__card-content">
                  <div className="oz-hero-illus__card-header">
                    <span className="oz-hero-illus__card-title">{card.title}</span>
                    <span
                      className="oz-hero-illus__card-dot"
                      style={{ backgroundColor: card.statusDot }}
                      title="Live capability"
                    />
                  </div>
                  <div className="oz-hero-illus__card-sub-row">
                    <span className="oz-hero-illus__card-subtitle">{card.subtitle}</span>
                    <span
                      className="oz-hero-illus__card-tag"
                      style={{
                        borderColor: card.borderColor,
                        color: card.color,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

