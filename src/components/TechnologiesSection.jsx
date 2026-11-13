import Reveal from "./Reveal.jsx";

const ROW_1 = [
  {
    name: "React",
    icon: (
      <svg
        viewBox="-11.5 -10.23 23 20.46"
        width="22"
        height="22"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="11" fill="#000000" />
        <path d="M16.5 17.5L8.2 6.5H6.5V17.5H8V8.8L15.8 19.2c.4-.3.8-.6 1.2-1z" fill="#ffffff" />
        <rect x="13.8" y="6.5" width="1.5" height="8" fill="#ffffff" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path fill="#539E43" d="M12 1.5l9.5 5.5v10L12 22.5 2.5 17V7L12 1.5z" />
        <text
          x="12"
          y="15.2"
          fill="#ffffff"
          fontSize="9.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.3px"
        >
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "Flutter",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path fill="#02569B" d="M14.3 0L2.3 12 6 15.7 21.7 0h-7.4z" />
        <path fill="#0175C2" d="M14.3 11.1L7.4 18l3.7 3.7 3.2-3.2 6.4-6.4h-6.4z" />
        <path fill="#40C4FF" d="M14.3 21.7l3.7-3.7 3.7 3.7h-7.4z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path
          fill="#13AA52"
          d="M12 0C11.5 1.5 8 7 8 13c0 4.5 2.5 8.5 4 11 1.5-2.5 4-6.5 4-11 0-6-3.5-11.5-4-13z"
        />
        <path fill="#00684A" d="M12 0v24c1.5-2.5 4-6.5 4-11 0-6-3.5-11.5-4-13z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path
          fill="#336791"
          d="M19.8 11.2c-.3-1.6-1.5-2.9-3-3.4-.6-.2-1.3-.3-2-.3-1.4 0-2.8.5-3.8 1.4-.4-.3-.8-.5-1.3-.7C8.4 7.8 7 8 6 9c-.8.8-1.2 2-1.1 3.2.1 1.8 1.4 3.4 3.1 3.8.4.1.8.1 1.2.1v2.3c0 .6.4 1 1 1h1.5v-3.7c.4-.1.8-.3 1.2-.5 1 .7 2.2 1.1 3.5 1.1 2.2 0 4.1-1.4 4.8-3.5.2-.5.3-1 .3-1.6h-1.8z"
        />
        <path
          fill="#ffffff"
          d="M14.5 9.5c-.8 0-1.5.5-1.8 1.2-.2.5-.1 1.1.2 1.5.3.4.9.6 1.4.5.7-.1 1.2-.7 1.2-1.4 0-.8-.5-1.8-1-1.8z"
        />
      </svg>
    ),
  },
  {
    name: "Firebase",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path fill="#FFA000" d="M3.9 15.7L6.2 1.3c.1-.4.5-.5.8-.2l3.5 4.3-6.6 10.3z" />
        <path fill="#F57C00" d="M13.6 8.4l-2.6-5c-.2-.3-.7-.3-.8.1L3.9 15.7l9.7-7.3z" />
        <path
          fill="#FFCA28"
          d="M20.1 15.7l-2.2-13.8c-.1-.4-.5-.5-.8-.2L3.9 15.7l9.1 5.1c.6.4 1.4.4 2.1 0l5-5.1z"
        />
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="22" aria-hidden="true" focusable="false">
        <path
          fill="#232F3E"
          d="M6.2 8.5c-.5-.3-1.1-.4-1.8-.4-1.3 0-2.2.7-2.2 1.8 0 1.1.8 1.7 1.9 1.7.6 0 1.3-.2 1.8-.6V12c-.5.3-1.3.5-2 .5-2 0-3.3-1.2-3.3-3.1 0-1.8 1.4-3.1 3.5-3.1.8 0 1.6.2 2.1.5v1.6zm3.4 4.1H8.2V6.5h1.4v6.1zm7 0h-1.4l-1.3-4.3-1.3 4.3h-1.4l-1.9-6.1h1.5l1.1 4.2 1.3-4.2h1.4l1.3 4.2 1.1-4.2h1.5l-1.9 6.1z"
        />
        <path
          fill="#FF9900"
          d="M17.2 15.5c-2.2 1.7-5.4 2.5-8.3 2.5-4 0-7.5-1.5-10.2-4-.2-.2 0-.5.2-.3 3 1.7 6.6 2.7 10.2 2.7 2.6 0 5.4-.7 7.8-2.1.4-.2.6.2.3.4z"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path
          fill="#2496ED"
          d="M14 11h2v2h-2v-2zm-2.5 0h2v2h-2v-2zm-2.5 0h2v2H9v-2zm7.5 0h2v2h-2v-2zm-5-2.5h2v2h-2V8.5zm-2.5 0h2v2H9V8.5zm5 0h2v2h-2V8.5zm-2.5-2.5h2v2h-2V6zm-9 8.5c.4 3.3 3.1 5.9 6.4 5.9 5.3 0 9.7-3.7 10.4-8.8.8.1 1.9-.3 2.5-1.1-.7-.4-1.6-.4-2.2-.2-.5-1.4-1.7-2.3-3.2-2.3h-.7v3.2H2.5z"
        />
      </svg>
    ),
  },
];

const ROW_2 = [
  {
    name: "Kubernetes",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path fill="#326CE5" d="M12 1.5l9 5.2v10.5L12 22.5l-9-5.2V6.7L12 1.5z" />
        <path
          fill="#FFFFFF"
          d="M12 4.2l6.8 3.9v7.8L12 19.8l-6.8-3.9V8.1L12 4.2zm0 2.4L7.5 9v6l4.5 2.6 4.5-2.6V9L12 6.6zm0 2.2l2.6 1.5v3L12 14.8l-2.6-1.5v-3L12 8.8z"
        />
        <circle cx="12" cy="11.8" r="1.3" fill="#326CE5" />
      </svg>
    ),
  },
  {
    name: "REST APIs",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <path
          d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
          fill="#2563EB"
        />
        <g fill="#ffffff">
          <circle cx="12" cy="13" r="2" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <path
            d="M12 9.5v1.2M12 15.3v1.2M8.5 13h1.2M14.3 13h1.2M9.5 10.5l.8.8M13.7 14.7l.8.8M9.5 15.5l.8-.8M13.7 11.3l.8-.8"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "AI",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
        <g stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round">
          <line x1="7" y1="1" x2="7" y2="4" />
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="17" y1="1" x2="17" y2="4" />
          <line x1="7" y1="20" x2="7" y2="23" />
          <line x1="12" y1="20" x2="12" y2="23" />
          <line x1="17" y1="20" x2="17" y2="23" />
          <line x1="1" y1="7" x2="4" y2="7" />
          <line x1="1" y1="12" x2="4" y2="12" />
          <line x1="1" y1="17" x2="4" y2="17" />
          <line x1="20" y1="7" x2="23" y2="7" />
          <line x1="20" y1="12" x2="23" y2="12" />
          <line x1="20" y1="17" x2="23" y2="17" />
        </g>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3.5"
          fill="#eff6ff"
          stroke="#2563EB"
          strokeWidth="1.5"
        />
        <text
          x="12"
          y="14.8"
          fill="#2563EB"
          fontSize="8.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          letterSpacing="-0.2px"
        >
          AI
        </text>
      </svg>
    ),
  },
];

export default function TechnologiesSection() {
  return (
    <section className="oz-tech-section" aria-label="Technologies">
      {/* Soft Ambient Background Elements */}
      <div className="oz-tech-bg" aria-hidden="true">
        <div className="oz-tech-bg__corner oz-tech-bg__corner--tl" />
        <div className="oz-tech-bg__corner oz-tech-bg__corner--br" />
        <div className="oz-tech-bg__dots oz-tech-bg__dots--left" />
        <div className="oz-tech-bg__dots oz-tech-bg__dots--right" />
        <svg
          className="oz-tech-bg__wave"
          viewBox="0 0 1440 340"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-40 260 C 220 280, 260 140, 560 180 C 860 220, 980 290, 1480 180"
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="oz-container oz-tech-container">
        {/* Section Heading */}
        <div className="oz-tech-header">
          <Reveal>
            <div className="oz-tech-eyebrow">
              <span className="oz-tech-eyebrow__code-circle" aria-hidden="true">
                <svg
                  viewBox="0 0 16 16"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="4.5 4 1.5 8 4.5 12" />
                  <polyline points="11.5 4 14.5 8 11.5 12" />
                  <line x1="9.5" y1="3" x2="6.5" y2="13" />
                </svg>
              </span>
              <span>TECHNOLOGIES</span>
              <svg
                className="oz-tech-eyebrow__tail"
                viewBox="0 0 12 8"
                width="12"
                height="8"
                aria-hidden="true"
              >
                <path d="M0 0 L10 0 C7 3, 5 7, 3 8 C4 5, 2 2, 0 0 Z" fill="#ea580c" />
              </svg>
            </div>
          </Reveal>

          <Reveal index={1} as="h2" className="oz-tech-title">
            <span className="oz-tech-spark" aria-hidden="true">
              <span className="oz-tech-spark__line" />
              <span className="oz-tech-spark__line" />
              <span className="oz-tech-spark__line" />
            </span>
            Modern, proven, <span className="oz-tech-title__accent">dependable.</span>
          </Reveal>

          <Reveal index={2} as="p" className="oz-tech-lead">
            Cutting-edge technologies to build scalable, secure and high-performance solutions.
          </Reveal>
        </div>

        {/* 12 Interactive Technology Pills in 2 Rows */}
        <div className="oz-tech-cluster" role="list" aria-label="Core technological proficiencies">
          <div className="oz-tech-row oz-tech-row--primary">
            {ROW_1.map((item, idx) => (
              <Reveal key={item.name} index={idx % 4} as="div" className="oz-tech-pill-slot">
                <div className="oz-tech-pill" role="listitem">
                  <span className="oz-tech-pill__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="oz-tech-pill__name">{item.name}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="oz-tech-row oz-tech-row--secondary">
            {ROW_2.map((item, idx) => (
              <Reveal key={item.name} index={idx % 3} as="div" className="oz-tech-pill-slot">
                <div className="oz-tech-pill" role="listitem">
                  <span className="oz-tech-pill__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="oz-tech-pill__name">{item.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
