import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/design-tokens")({
  head: () => ({
    meta: [
      { title: "Design Tokens Reference | Ozeonix Infinity" },
      { name: "description", content: "Internal visual reference for Ozeonix Infinity responsive spacing, borders, icons, controls and typography." },
      { property: "og:title", content: "Design Tokens Reference | Ozeonix Infinity" },
      { property: "og:description", content: "Responsive design-token reference for the Ozeonix Infinity interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DesignTokensPage,
});

const SPACES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const TYPE = ["h1", "h2", "h3", "h4", "body", "small", "lead"];

function DesignTokensPage() {
  return (
    <section className="oz-section oz-token-page" aria-labelledby="token-page-title">
      <div className="oz-container oz-app-stack">
        <header className="oz-token-intro">
          <span className="oz-eyebrow">Internal reference</span>
          <h1 id="token-page-title">Responsive design tokens</h1>
          <p className="oz-muted">Live samples from the same spacing, border, icon, control and typography values used across the site.</p>
        </header>

        <section className="oz-token-section" aria-labelledby="type-scale-title">
          <h2 id="type-scale-title">Typography</h2>
          <div className="oz-token-type-list">
            {TYPE.map((token) => (
              <div className="oz-token-type" key={token}>
                <code>--oz-fs-{token}</code>
                <p className={`oz-token-type--${token}`}>Ozeonix builds practical software for growing businesses.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="oz-token-section" aria-labelledby="space-scale-title">
          <h2 id="space-scale-title">Spacing and padding</h2>
          <div className="oz-token-grid">
            {SPACES.map((token) => (
              <div className="oz-token-swatch" key={token}>
                <code>--oz-space-{token}</code>
                <span className={`oz-token-space oz-token-space--${token}`} aria-hidden="true" />
              </div>
            ))}
          </div>
        </section>

        <section className="oz-token-section" aria-labelledby="surface-scale-title">
          <h2 id="surface-scale-title">Borders and radii</h2>
          <div className="oz-token-grid">
            {[["Small", "sm"], ["Default", "base"], ["Large", "lg"]].map(([label, token]) => (
              <div className={`oz-token-surface oz-token-radius--${token}`} key={token}>
                <strong>{label}</strong>
                <code>{token === "base" ? "--oz-radius" : `--oz-radius-${token}`}</code>
              </div>
            ))}
          </div>
        </section>

        <section className="oz-token-section" aria-labelledby="control-scale-title">
          <h2 id="control-scale-title">Icons and controls</h2>
          <div className="oz-token-control-row">
            <span className="oz-token-icon oz-token-icon--small" aria-label="Small icon size">Aa</span>
            <span className="oz-token-icon" aria-label="Default icon size">Aa</span>
            <span className="oz-token-icon oz-token-icon--large" aria-label="Large icon size">Aa</span>
            <button type="button" className="oz-btn oz-btn--primary">44px minimum control</button>
          </div>
        </section>
      </div>
    </section>
  );
}