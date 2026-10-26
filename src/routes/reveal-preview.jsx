import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealProvider from "@/components/RevealProvider";
import { revealConfig, REVEAL_PRESETS } from "@/lib/revealConfig";

export const Route = createFileRoute("/reveal-preview")({
  head: () => ({
    meta: [
      { title: "Reveal Preview — Ozeonix Infinity" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: RevealPreviewPage,
});

function RevealPreviewPage() {
  const [nonce, setNonce] = useState(0);
  const [stepDelay, setStepDelay] = useState(revealConfig.stepDelay);
  const [duration, setDuration] = useState(revealConfig.duration);
  const [debug, setDebug] = useState(false);

  return (
    <RevealProvider stepDelay={stepDelay} duration={duration} debug={debug}>
      <section className="oz-section">
        <div className="oz-container">
          <span className="oz-eyebrow">Dev</span>
          <h1>Reveal presets preview</h1>
          <p className="oz-muted">
            Compare pacing across presets. Global defaults: step={revealConfig.stepDelay}s,
            duration={revealConfig.duration}s.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", margin: "16px 0 32px" }}>
            <label>step {stepDelay.toFixed(2)}s
              <input type="range" min="0" max="0.5" step="0.02" value={stepDelay}
                onChange={(e) => setStepDelay(Number(e.target.value))} style={{ marginLeft: 8 }} />
            </label>
            <label>duration {duration.toFixed(2)}s
              <input type="range" min="0.2" max="2" step="0.05" value={duration}
                onChange={(e) => setDuration(Number(e.target.value))} style={{ marginLeft: 8 }} />
            </label>
            <label>
              <input type="checkbox" checked={debug} onChange={(e) => setDebug(e.target.checked)} /> debug
            </label>
            <button className="oz-btn oz-btn--outline" onClick={() => setNonce((n) => n + 1)}>
              Replay animations
            </button>
          </div>

          {REVEAL_PRESETS.map((preset) => (
            <div key={`${preset}-${nonce}`} style={{ marginBottom: 48 }}>
              <h2 style={{ marginBottom: 12 }}>preset: {preset}</h2>
              <RevealGroup preset={preset}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Reveal
                      key={i}
                      index={i}
                      style={{
                        position: "relative",
                        padding: 20,
                        border: "1px solid var(--oz-border)",
                        borderRadius: "var(--oz-radius)",
                        background: "var(--oz-secondary)",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      #{i + 1}
                    </Reveal>
                  ))}
                </div>
              </RevealGroup>
            </div>
          ))}
        </div>
      </section>
    </RevealProvider>
  );
}
