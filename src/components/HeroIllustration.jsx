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

// Exact alignment geometry centered to the laptop image (906 x 515 coordinate space)
const ORBIT_GEOMETRY = {
  cx: 445,
  cy: 265,
  rx: 290,
  ry: 135,
  rot: -10 * (Math.PI / 180), // -10 degrees matching laptop 3D tilt
  // Inner ring
  rxInner: 190,
  ryInner: 88,
};

function getEllipsePoint(theta, rx, ry) {
  const { cx, cy, rot } = ORBIT_GEOMETRY;
  const cosRot = Math.cos(rot);
  const sinRot = Math.sin(rot);
  const x0 = rx * Math.cos(theta);
  const y0 = ry * Math.sin(theta);
  const x = cx + x0 * cosRot - y0 * sinRot;
  const y = cy + x0 * sinRot + y0 * cosRot;
  return { x, y };
}

export default function HeroIllustration() {
  const containerRef = useRef(null);
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const mouseRafId = useRef(null);

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

  // Continuous 3D Orbital Canvas Rendering Loop (Runs at silky 60/120fps)
  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    const backCtx = backCanvas.getContext("2d");
    const frontCtx = frontCanvas.getContext("2d");
    if (!backCtx || !frontCtx) return;

    let animId;
    let startTime = performance.now();

    const draw = (now) => {
      const elapsed = (now - startTime) / 1000; // in seconds
      const speed = prefersReducedMotion ? 0 : 0.65; // ~9.6s full 360deg revolution
      const thetaMain = elapsed * speed;
      const thetaFollower = thetaMain + Math.PI; // 180deg opposite
      const thetaInner = -elapsed * speed * 1.25; // counter-clockwise inner

      // Clear both canvases
      backCtx.clearRect(0, 0, 906, 515);
      frontCtx.clearRect(0, 0, 906, 515);

      const { cx, cy, rx, ry, rot, rxInner, ryInner } = ORBIT_GEOMETRY;
      const dashOffset = prefersReducedMotion ? 0 : -elapsed * 35;

      // --- Helper to draw an ellipse arc ---
      const drawArc = (ctx, rX, rY, startAngle, endAngle, strokeStyle, lineWidth, dash) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, rX, rY, 0, startAngle, endAngle);
        ctx.setLineDash(dash);
        ctx.lineDashOffset = dashOffset;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.restore();
      };

      // --- Helper to draw a glowing orbiting satellite ---
      const drawSatellite = (ctx, theta, rX, rY, color, radius, glow) => {
        const pt = getEllipsePoint(theta, rX, rY);
        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = glow;
        ctx.fill();

        // Outer soft pulse halo
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle =
          color === "#ea580c"
            ? "rgba(234, 88, 12, 0.25)"
            : color === "#38bdf8"
              ? "rgba(56, 189, 248, 0.25)"
              : "rgba(0, 169, 130, 0.25)";
        ctx.fill();
        ctx.restore();
      };

      // 1. BACK ORBIT ARCS (Passes BEHIND laptop screen: theta from PI to 2*PI)
      drawArc(backCtx, rx, ry, Math.PI, Math.PI * 2, "rgba(234, 88, 12, 0.35)", 1.4, [8, 10]);
      drawArc(
        backCtx,
        rxInner,
        ryInner,
        Math.PI,
        Math.PI * 2,
        "rgba(56, 189, 248, 0.28)",
        1.1,
        [4, 8],
      );

      // 2. FRONT ORBIT ARCS (Sweeps IN FRONT of laptop keyboard: theta from 0 to PI)
      drawArc(frontCtx, rx, ry, 0, Math.PI, "rgba(234, 88, 12, 0.75)", 1.8, [8, 10]);
      drawArc(frontCtx, rxInner, ryInner, 0, Math.PI, "rgba(56, 189, 248, 0.55)", 1.3, [4, 8]);

      // 3. CONTINUOUS ROTATING SATELLITES (Assigned to back or front canvas based on position)
      const satellites = [
        { theta: thetaMain, rx, ry, color: "#ea580c", radius: 5, glow: 16 },
        { theta: thetaFollower, rx, ry, color: "#38bdf8", radius: 4.5, glow: 14 },
        { theta: thetaInner, rx: rxInner, ry: ryInner, color: "#00A982", radius: 4, glow: 12 },
      ];

      satellites.forEach((sat) => {
        // sin(theta) > 0 means Y is in bottom half (front, in front of keyboard)
        const isFront = Math.sin(sat.theta % (Math.PI * 2)) > 0;
        const targetCtx = isFront ? frontCtx : backCtx;
        drawSatellite(targetCtx, sat.theta, sat.rx, sat.ry, sat.color, sat.radius, sat.glow);
      });

      // 4. CONNECTION TRAILS TO 4 SERVICE CARDS (Drawn on front canvas)
      frontCtx.save();
      frontCtx.setLineDash([4, 6]);
      frontCtx.lineDashOffset = prefersReducedMotion ? 0 : -elapsed * 25;
      frontCtx.lineWidth = 1.3;

      // To Card 1 (Top-Left)
      frontCtx.beginPath();
      frontCtx.moveTo(330, 215);
      frontCtx.quadraticCurveTo(240, 160, 180, 110);
      frontCtx.strokeStyle = "rgba(56, 189, 248, 0.4)";
      frontCtx.stroke();

      // To Card 2 (Bottom-Left)
      frontCtx.beginPath();
      frontCtx.moveTo(280, 310);
      frontCtx.quadraticCurveTo(220, 300, 160, 275);
      frontCtx.strokeStyle = "rgba(234, 88, 12, 0.45)";
      frontCtx.stroke();

      // To Card 3 (Top-Right)
      frontCtx.beginPath();
      frontCtx.moveTo(560, 200);
      frontCtx.quadraticCurveTo(650, 155, 730, 110);
      frontCtx.strokeStyle = "rgba(96, 165, 250, 0.4)";
      frontCtx.stroke();

      // To Card 4 (Bottom-Right)
      frontCtx.beginPath();
      frontCtx.moveTo(610, 310);
      frontCtx.quadraticCurveTo(675, 330, 735, 340);
      frontCtx.strokeStyle = "rgba(0, 169, 130, 0.45)";
      frontCtx.stroke();
      frontCtx.restore();

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [prefersReducedMotion]);

  // Smooth mousemove parallax handler using requestAnimationFrame
  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const rawX = (e.clientX - rect.left) / rect.width;
      const rawY = (e.clientY - rect.top) / rect.height;

      const nx = Math.max(-1, Math.min(1, (rawX - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, (rawY - 0.5) * 2));

      if (mouseRafId.current) cancelAnimationFrame(mouseRafId.current);
      mouseRafId.current = requestAnimationFrame(() => {
        const tiltX = -ny * 4.5;
        const tiltY = nx * 5.5;
        setMousePos({ x: nx, y: ny, tiltX, tiltY });
        setIsHovered(true);
      });
    },
    [prefersReducedMotion],
  );

  // Smooth reset on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (mouseRafId.current) cancelAnimationFrame(mouseRafId.current);
    mouseRafId.current = requestAnimationFrame(() => {
      setMousePos({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
      setIsHovered(false);
    });
  }, []);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (mouseRafId.current) cancelAnimationFrame(mouseRafId.current);
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

      {/* 2. BACK ORBIT CANVAS (Passes BEHIND the laptop screen) */}
      <canvas
        ref={backCanvasRef}
        width={906}
        height={515}
        className="oz-hero-illus__canvas oz-hero-illus__canvas--back"
        aria-hidden="true"
      />

      {/* 3. AMBIENT FLOATING DUST PARTICLES */}
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

      {/* 5. FRONT ORBIT CANVAS (Sweeps IN FRONT OF the laptop keyboard & body) */}
      <canvas
        ref={frontCanvasRef}
        width={906}
        height={515}
        className="oz-hero-illus__canvas oz-hero-illus__canvas--front"
        aria-hidden="true"
      />

      {/* 6. INDEPENDENT FLOATING GLASS SERVICE CARDS */}
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
