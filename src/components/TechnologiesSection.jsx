import Reveal from "./Reveal.jsx";

const TECHNOLOGIES = [
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
        <circle cx="0" cy="0" r="2.05" fill="#087ea4" />
        <g stroke="#087ea4" strokeWidth="1" fill="none">
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
        <path fill="#539E43" d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2z" />
        <path
          fill="#FFFFFF"
          d="M12 5l6.5 3.8v7.5L12 20.1 5.5 16.3V8.8L12 5zm-1.5 10.5h-2v-5h2v5zm4.5-1c0 .6-.5 1-1 1h-2v-5h2c.6 0 1 .4 1 1v3z"
        />
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
          d="M19.7 11.2c-.3-1.6-1.5-2.9-3-3.4-.6-.2-1.3-.3-2-.3-1.4 0-2.8.5-3.8 1.4-.4-.3-.8-.5-1.3-.7C8.4 7.8 7 8 6 9c-.8.8-1.2 2-1.1 3.2.1 1.8 1.4 3.4 3.1 3.8.4.1.8.1 1.2.1v2.3c0 .6.4 1 1 1h1.5v-3.7c.4-.1.8-.3 1.2-.5 1 .7 2.2 1.1 3.5 1.1 2.2 0 4.1-1.4 4.8-3.5.2-.5.3-1 .3-1.6h-1.8z"
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
          d="M7.8 7.3c-.6-.4-1.4-.6-2.3-.6-1.7 0-2.8.9-2.8 2.3 0 1.4 1 2.2 2.5 2.2.8 0 1.7-.3 2.3-.8V12c-.7.4-1.7.6-2.6.6-2.5 0-4.1-1.5-4.1-3.9 0-2.3 1.8-3.9 4.4-3.9 1 0 2 .3 2.6.7v1.8zm4.3 5.1h-1.8V4.8h1.8v7.6zm8.8 0h-1.8l-1.6-5.4-1.6 5.4h-1.8l-2.4-7.6h1.9l1.4 5.3 1.6-5.3h1.8l1.6 5.3 1.4-5.3h1.9l-2.4 7.6z"
        />
        <path
          fill="#FF9900"
          d="M21.5 16.5c-2.8 2.1-6.8 3.2-10.4 3.2-5 0-9.4-1.9-12.8-5-.3-.3 0-.6.3-.4 3.7 2.1 8.2 3.4 12.8 3.4 3.2 0 6.8-.9 9.8-2.6.5-.3.8.2.3.4z"
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
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
          fill="rgba(37, 99, 235, 0.12)"
        />
        <circle cx="12" cy="13" r="2" fill="#2563EB" stroke="none" />
        <path d="M12 10v1m0 4v1m-3-3h1m4 0h1" stroke="#2563EB" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "AI",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="#ea580c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="16" height="16" x="4" y="4" rx="3" fill="rgba(234, 88, 12, 0.12)" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        <path d="M12 10v4m-2-2h4" stroke="#ea580c" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function TechnologiesSection() {
  return (
    <section className="oz-tech-section" aria-label="Technologies">
      {/* Soft Ambient Background Elements */}
      <div className="oz-tech-bg" aria-hidden="true">
        <div className="oz-tech-bg__glow oz-tech-bg__glow--tl" />
        <div className="oz-tech-bg__glow oz-tech-bg__glow--br" />
        <div className="oz-tech-bg__dots oz-tech-bg__dots--left" />
        <div className="oz-tech-bg__dots oz-tech-bg__dots--right" />
      </div>

      <div className="oz-container oz-tech-container">
        {/* Section Heading */}
        <div className="oz-tech-header">
          <Reveal>
            <div className="oz-tech-eyebrow">
              <span className="oz-tech-eyebrow__code" aria-hidden="true">
                &lt;/&gt;
              </span>
              <span>TECHNOLOGIES</span>
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

        {/* 12 Interactive Technology Pills Cluster */}
        <div className="oz-tech-cluster" role="list" aria-label="Core technological proficiencies">
          {TECHNOLOGIES.map((item, idx) => (
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
      </div>
    </section>
  );
}
