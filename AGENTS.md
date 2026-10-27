# Ozeonix Infinity — Permanent Agent & Development Rules

> [!NOTE]
> **FAST SESSION RESUMPTION**:
> AI agents and developers should read [PROJECT_AGENT_STATE.md](PROJECT_AGENT_STATE.md) first for the compact working checkpoint of the tech stack, verification commands, and active milestones. Consult detailed source documents below and in `docs/` only when needed for specific implementation details.

> [!IMPORTANT]
> **MANDATORY BRAND DESIGN SYSTEM & UI/UX PRECEDENCE**:
> Future AI agents and developers MUST read and adhere to [docs/design-system.md](docs/design-system.md) and [.agents/rules/brand-precedence.md](.agents/rules/brand-precedence.md) before implementing or modifying any UI.
>
> 1. **Official Brand Palette**: Orange & Neutral Theme with subtle Cyan/Blue geometric accents:
>    - **Primary Brand (`orange-600` / `#ea580c`)**: Primary CTA buttons, key headings, active link highlights.
>    - **Primary Hover (`orange-700` / `#c2410c`)**: Hover state for buttons and links.
>    - **Brand Accent / Bar (`orange-500` / `#f97316`)**: Announcement tickers, badge accents, logo border, focus rings.
>    - **Brand Deep (`orange-800` / `#9a3412`)**: Prominent logo text, bold title headings.
>    - **Brand Surface / Tint (`orange-50` / `#fff7ed` & `orange-100` / `#ffedd5`)**: Active tab backgrounds, soft hover highlight states.
>    - **Secondary Accent (`blue-300` / `#93c5fd` & `blue-600` / `#2563eb`)**: Decorative SVGs, secondary badges.
>    - **Glow / Shadow Accent (`indigo-600` / `#4f46e5`)**: Subtle glow shadows (`rgba(79, 70, 229, 0.4)`).
>    - **Surfaces & Neutrals**: Light Background (`gray-50` / `#f9fafb`, white `#ffffff`), Dark Background (`gray-800` / `#1f2937`, `gray-900` / `#111827`), Light Text (`gray-900` / `#111827`, `gray-700` / `#374151`), Dark Text (`gray-100` / `#f3f4f6`, `gray-300` / `#d1d5db`), Borders (`gray-200` / `#e5e7eb`, `gray-700` / `#374151`).
> 2. **Single Source of Truth**: All UI colors must use the centralized design tokens defined in `src/styles.css` (`:root` tokens `--brand-orange`, `--brand-orange-hover`, `--brand-accent`, `--background`, `--surface`, `--text-primary`, `--border`, `--focus-ring`, etc.).
> 3. **No Random or Hardcoded Colors**: Arbitrary hex colors, raw RGB values, unvetted gradients, and random utilities are strictly prohibited across components and page styles. External skills (such as UI/UX Pro Max) must never override local brand tokens.
> 4. **New & Refactored Components**: Must reuse existing design tokens and semantic variables. Primary buttons must always use `orange-600` (`#ea580c`, `.oz-btn--primary` / `.btn-primary`), secondary actions use defined neutral/border tokens, and accents use `orange-500` or `blue-300/600`.
> 5. **Architecture Preservation**: Existing architecture, TanStack Start framework, file-based routing, API integrations, authentication, permissions, and business logic must be preserved unless an explicit change is necessary and justified.

## Architectural & Brand Guidelines

- **Logo Variants**: Use separate supplied logo variants: full-color (`ozeonix-infinity-nav-logo.png`) in navigation/structured data, white-text (`ozeonix-infinity-footer-logo.png`) in the dark footer, and icon-only for the favicon, so each placement retains clear contrast.
- **Positioning**: Position Ozeonix Infinity for a broad global market and keep Bhairahawa/Rupandehi only as factual contact information, not marketing or SEO targeting.
- **Motion & Cards**: Use the shared corporate kinetic card system and Reveal motion: solid surfaces, compact corners, subtle alternating entrances, and reduced-motion fallback for consistency and comfort.
- **Form Controls**: Keep forms clean, accessible, and tactile: light surface (`var(--surface)`), visible WCAG focus rings (`var(--focus-ring)`), and orange action submit buttons (`.oz-btn--primary`).
- **Lead Capture**: Use `ProjectBriefForm` and its shared Zod schema for both homepage and contact lead capture so fields, validation, and submission behavior remain consistent.
- **Transactional Notifications**: Send inquiry and referral emails only through registered managed templates with event-derived idempotency keys, so retries remain safe and delivery policy stays centralized.
