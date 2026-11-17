# Ozeonix Infinity - Permanent Agent & Development Rules

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


## Icon Usage Rules (Mandatory)

- Always use icons from the existing `react-icons` library for all UI icons across the project.
- Never manually design, create, draw, or embed icons using inline SVG, SVG files, custom SVG markup, or hand-coded SVG components.
- Never use Unicode symbols or emojis as substitutes for professional UI icons.
- Before introducing an icon, check whether a suitable icon already exists in `react-icons`.
- Use the appropriate icon collection based on the requirement:
  - `react-icons/fa` – Font Awesome
  - `react-icons/lu` – Lucide
  - `react-icons/si` – Simple Icons (brands and technologies)
  - `react-icons/fi` – Feather Icons
  - `react-icons/md` – Material Design
- For social media and brand icons, prefer the appropriate official brand icon from `react-icons/si` or `react-icons/fa`.
- Maintain consistent icon sizing, stroke weight, alignment, spacing, and visual style throughout the application.
- Use reusable icon components where appropriate.
- Do not install another icon library if `react-icons` is already available.
- If `react-icons` is not installed, ask before adding it or use the project's existing dependency if available.
- If an exact icon is unavailable, select the closest suitable icon from `react-icons` rather than creating a custom SVG.

**Priority Rule:** `react-icons` is the exclusive preferred source for all icons. Do not create custom SVG icons under any circumstances unless explicitly instructed by the project owner.



## UI/UX Design, Responsive Layout & Accessibility Rules (Mandatory)

### 1. Professional UI/UX Design
- Always create modern, professional, visually appealing, and production-quality interfaces.
- Prioritize clean layouts, visual hierarchy, typography, spacing, alignment, and consistent design systems.
- Every page must have a clear visual structure and intuitive user experience.
- Avoid generic templates, unnecessary decorations, cluttered layouts, and inconsistent styling.
- Maintain consistent colors, typography, border radii, shadows, spacing, and component styles throughout the application.
- Design interfaces with a clear purpose and intuitive navigation.

### 2. Fully Responsive Design
- Every page, component, section, modal, form, navigation bar, and interactive element MUST be fully responsive.
- Support all screen sizes, including:
  - Small mobile phones (320px–375px)
  - Standard mobile phones (376px–480px)
  - Large mobile phones (481px–767px)
  - Tablets (768px–1023px)
  - Small laptops (1024px–1279px)
  - Desktops (1280px–1535px)
  - Large and ultra-wide screens (1536px+)
- Use mobile-first responsive development.
- Use CSS Grid, Flexbox, responsive units, and appropriate media queries.
- Avoid fixed widths and heights that cause overflow or break layouts.
- Use fluid typography, flexible containers, and responsive spacing.
- Images, videos, cards, tables, and other content must adapt to available screen space.
- Prevent horizontal scrolling, overlapping elements, clipped text, and broken layouts.
- Navigation menus must adapt appropriately to mobile and desktop screens.

### 3. Semantic HTML & Layout Structure
- Always use semantic HTML5 elements wherever appropriate.
- Prefer meaningful elements such as:
  - `<header>`
  - `<nav>`
  - `<main>`
  - `<section>`
  - `<article>`
  - `<aside>`
  - `<footer>`
  - `<form>`
  - `<button>`
- Maintain a logical heading hierarchy (H1 → H2 → H3).
- Use appropriate HTML elements according to their actual purpose.
- Avoid excessive use of generic `<div>` elements when semantic elements are more suitable.
- Ensure accessible labels, keyboard navigation, meaningful link text, and appropriate ARIA attributes when necessary.
- Never use clickable `<div>` or `<span>` elements when a semantic `<button>` or `<a>` is appropriate.

### 4. Responsive Testing & Quality Assurance
- Test every newly created or modified page at mobile, tablet, laptop, desktop, and ultra-wide resolutions.
- Check for horizontal overflow, alignment problems, text wrapping, spacing issues, and component breakage.
- Verify navigation, forms, buttons, dropdowns, modals, and other interactive elements on touch and desktop devices.
- Ensure responsive behavior works in both portrait and landscape orientations.
- Fix all identified responsive and visual issues before considering the task complete.

### 5. Development Priority
Always follow this priority:

1. Excellent user experience.
2. Consistent and professional visual design.
3. Mobile-first responsiveness.
4. Semantic HTML and accessibility.
5. Performance and maintainability.
6. Cross-device and cross-browser compatibility.

**Final Rule:** Never consider a UI task complete just because it looks correct on a desktop. Every interface must be visually polished, semantically structured, accessible, and fully responsive across different devices and screen sizes.