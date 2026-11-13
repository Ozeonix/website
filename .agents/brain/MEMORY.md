# Ozeonix Infinity — Project Memory & Brain (SSOT)

> **Persistent Agent Brain**: Maintained in `.agents/brain/` for instant session resumption without loss of context or repeated analysis.

---

## 1. Core Project Architecture

- **Framework**: TanStack Start (Full-Stack React + Vite SSR + File-Based Routing)
- **Styling**: Tailwind CSS v4 + Centralized Custom Design Tokens in `src/styles.css`
- **Component Primitives**: Radix UI + Lucide React icons
- **Form & Validation**: React Hook Form + Zod (`ProjectBriefForm.jsx` shared schema)
- **Email Service**: Resend transactional templates with idempotency keys
- **Asset Strategy**: Responsive WebP / JSON asset descriptors (`*.asset.json`)

---

## 2. Mandatory Behavioral & Engineering Rules

1. **NEVER Run Dev Server**: Never run `npm run dev` or launch any local server process under any circumstances.
2. **NEVER Push Directly**: Never execute `git push` via tool commands. Always print the exact push command in the chat response for the user to execute manually:
   ```bash
   git push origin main
   ```
3. **Strict Git Commit Rule**:
   Format: `<type>: <short description>`
   - Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `style`, `chore`, `build`, `ci`, `revert`.
   - Imperative tone, lowercase start, no ending period, no emojis, no mention of AI.
   - One logical change per commit.
4. **Verification Requirement**:
   Always run `npm run build` and `npm run lint` before committing any changes.

---

## 3. Brand Design System Standards

- **Primary Brand Orange**: `#ea580c` (`--brand-orange`, `orange-600`) — Primary CTAs, key headlines, active highlights.
- **Accent Orange**: `#f97316` (`--brand-orange-500`, `orange-500`) — Accents, badges, tickers, focus rings.
- **Brand Deep**: `#9a3412` (`orange-800`) — Prominent text / high contrast.
- **Brand Surface Tints**: `#fff7ed` (`orange-50`), `#ffedd5` (`orange-100`) — Soft active states.
- **Dark Canvas Surfaces**: `#07192d` to `#041220` (Dark Navy) — Upgraded Modern Dark Footer & dark sections.
- **Light Neutral Canvas**: `#f8fafc` / `#f9fafb` (Light Gray), `#ffffff` (White surface cards).
- **Secondary Accents**: `#38bdf8` (Cyan), `#60a5fa` (Blue), `#00A982` (Green).

---

## 4. Key Components Implemented & Maintained

### A. Right-Side Hero Ecosystem (`src/components/HeroIllustration.jsx`)
- Central floating laptop with 3D perspective tilt and ambient breathing ground shadow.
- Continuous dynamic dual-canvas orbital satellites (back orbit passes behind screen, front orbit sweeps over keyboard).
- 4 Independent floating glass service cards (AI & GenAI, Web & Mobile, Cloud & Scalable, Digital Growth) with physics-based mouse parallax.
- High-res asset: `/assets/ozeonix-infinity-hero-laptop.png`.

### B. Technologies Showcase (`src/components/TechnologiesSection.jsx`)
- Eyebrow pill: `< / > TECHNOLOGIES` in brand orange.
- Heading: "Modern, proven, dependable." with decorative 3-line orange spark.
- 12 Interactive technology pills: React, Next.js, Node.js, Flutter, MongoDB, PostgreSQL, Firebase, AWS, Docker, Kubernetes, REST APIs, AI.
- Adaptive responsive cluster layout with subtle ambient corner radial glows and masked dot-matrix backdrop.

### C. Upgraded Modern Dark Footer (`src/components/Footer.jsx` & `src/styles.css`)
- **Kinetic Wave Vector Background**: 20-path parabolic energy fan originating bottom-left and fanning out top-right (`viewBox="0 0 1200 320"`, `preserveAspectRatio="none"`).
- **Opacity Tuning**: Group opacity at `0.6` (60%), CSS lines base opacity `0.36`, gentle breathing pulse (`0.30`–`0.44`).
- **Social Media Buttons**: Circular 44px buttons (`.oz-footer__social-btn`) with dead-centered vector glyphs (Facebook, LinkedIn, Instagram, WhatsApp, Phone).
- **Hover Contrast**: Specificity-locked hover state (`background-color: #ea580c !important; color: #ffffff !important;`) ensuring white icons remain crisp over orange on hover without being covered.

### D. Lead Capture Form (`src/components/ProjectBriefForm.jsx`)
- Accessible semantic `<fieldset>` and `<legend>` structure.
- Consistent Zod validation on both homepage and `/contact` page.
