# Ozeonix Infinity — Permanent Agent & Development Rules

> [!IMPORTANT]
> **MANDATORY BRAND DESIGN SYSTEM COMPLIANCE**:
> Future AI agents and developers MUST read and adhere to [docs/design-system.md](file:///home/bhola-dev58/Ozeonix/ozeonix-website/docs/design-system.md) before implementing or modifying any UI.
>
> 1. **Official Brand Palette**: Orange `#FF6900` (primary action), Emerald Green `#00A982` (secondary brand / metrics / accents), and Deep Navy `#06294B` (structural base, headings, dark surfaces).
> 2. **Single Source of Truth**: All UI colors must use the centralized design tokens defined in `src/styles.css` (`:root` tokens `--brand-orange`, `--brand-green`, `--brand-navy`, `--background`, `--surface`, `--text-primary`, `--border`, `--focus-ring`, etc.).
> 3. **No Random or Hardcoded Colors**: Arbitrary hex colors, raw RGB values, unvetted gradients, and random utilities are strictly prohibited across components and page styles.
> 4. **New & Refactored Components**: Must reuse existing design tokens and semantic variables. Primary buttons must always use `--brand-orange` (`.oz-btn--primary`), secondary actions use `--brand-navy`, and accents/badges use `--brand-green`.
> 5. **Architecture Preservation**: Existing architecture, TanStack Start framework, file-based routing, API integrations, authentication, permissions, and business logic must be preserved unless an explicit change is necessary and justified.

## Architectural & Brand Guidelines

- **Logo Variants**: Use separate supplied logo variants: full-color (`ozeonix-infinity-nav-logo.png`) in navigation/structured data, white-text (`ozeonix-infinity-footer-logo.png`) in the dark footer, and icon-only for the favicon, so each placement retains clear contrast.
- **Positioning**: Position Ozeonix Infinity for a broad global market and keep Bhairahawa/Rupandehi only as factual contact information, not marketing or SEO targeting.
- **Motion & Cards**: Use the shared corporate kinetic card system and Reveal motion: solid surfaces, compact corners, subtle alternating entrances, and reduced-motion fallback for consistency and comfort.
- **Form Controls**: Keep forms clean, accessible, and tactile: light surface (`var(--surface)`), visible WCAG focus rings (`var(--focus-ring)`), and orange action submit buttons (`.oz-btn--primary`).
- **Lead Capture**: Use `ProjectBriefForm` and its shared Zod schema for both homepage and contact lead capture so fields, validation, and submission behavior remain consistent.
- **Transactional Notifications**: Send inquiry and referral emails only through registered managed templates with event-derived idempotency keys, so retries remain safe and delivery policy stays centralized.
