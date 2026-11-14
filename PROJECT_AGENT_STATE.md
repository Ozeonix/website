# Ozeonix Infinity — Project Agent State

## 1. Purpose and Authority

This file serves as a compact, persistent working checkpoint for AI agents and developers across development sessions.

- **Authority**: This document is an operational summary and fast navigation aid. It does **not** supersede [AGENTS.md](AGENTS.md) (governing rules) or [docs/design-system.md](docs/design-system.md) (canonical design tokens).
- **Usage**: Future agents should read this file first to obtain immediate context without running recursive repository scans.

---

## 2. Verified Technology Stack

_All entries confirmed via `package.json`, `vite.config.ts`, and `tsconfig.json`:_

- **Framework**: TanStack Start (`@tanstack/react-start: 1.168.60`, `@tanstack/react-router: 1.170.41`) with full-stack SSR and server functions.
- **Runtime & Bundler**: Vite 6 (`vite: ^6.3.5` via `@tanstack/react-start/plugin/vite`), Node.js (ESM).
- **Core Library**: React 19 (`react: ^19.2.0`, `react-dom: ^19.2.0`), TypeScript 5.8 (`target: ES2022`, bundler resolution).
- **Styling Architecture**:
  - Centralized manual CSS design tokens in [src/styles.css](src/styles.css).
  - Tailwind CSS v4 (`@tailwindcss/vite: ^4.2.1`) using `@theme` block referencing canonical tokens.
  - No arbitrary inline colors or conflicting utility frameworks.
- **UI & Primitives**: Radix UI (`@radix-ui/react-*`), Lucide React (`lucide-react`), Embla Carousel (`embla-carousel-react`), Recharts (`recharts`), Sonner (`sonner`).
- **Validation & Data**: Zod (`zod: ^3.24.2`), React Hook Form (`react-hook-form: ^7.71.2`), TanStack Query (`@tanstack/react-query: ^5.101.1`).
- **Backend & Integrations**: Supabase (`@supabase/supabase-js: ^2.110.0`), eSewa payment integration (`src/lib/esewa.server.ts`), transactional emails via managed service (`notify.ozeonix.com`).

---

## 3. Architecture Guardrails

- **Preserve SSR Boundaries**: Maintain TanStack Start route conventions in `src/routes/`. Keep client-only hooks out of initial SSR evaluation and use `createServerFn` for server-side logic.
- **File-Based Routing**: All public, legal, authenticated, and service pages adhere to TanStack Router file-based conventions.
- **Lead Capture Consistency**: All client lead forms (homepage, contact, modals) must share `ProjectBriefForm` and its unified Zod schema.
- **Corporate Kinetic Card & Motion**: Use solid surfaces (`.oz-card`), compact corners, and `Reveal` component transitions with `prefers-reduced-motion` fallbacks.
- **Tactile Accessibility**: All interactive controls require minimum 44px tap targets, visible WCAG focus rings (`var(--focus-ring)`), and semantic HTML.

---

## 4. Canonical Design System & Brand Precedence

Documented in [docs/design-system.md](docs/design-system.md) and declared in [src/styles.css](src/styles.css):

- **Theme**: Orange & Neutral Education/Institute Theme with subtle Cyan/Blue geometric accents.
- **Primary Brand (`orange-600` / `#ea580c`)**: Primary CTA buttons (`.oz-btn--primary`, `.btn-primary`), key headings, active link highlights.
- **Primary Hover (`orange-700` / `#c2410c`)**: Hover state for buttons and links.
- **Brand Accent / Bar (`orange-500` / `#f97316`)**: Announcement tickers, badge accents, logo border, focus ring (`var(--focus-ring)`).
- **Brand Deep (`orange-800` / `#9a3412`)**: Prominent logo text, bold title headings.
- **Brand Surface / Tint (`orange-50` / `#fff7ed`, `orange-100` / `#ffedd5`)**: Active tab backgrounds, soft hover highlight states.
- **Secondary Accent (`blue-300` / `#93c5fd`, `blue-600` / `#2563eb`)**: Decorative SVGs, secondary badges.
- **Glow / Shadow Accent (`indigo-600` / `#4f46e5`)**: Subtle glow shadows (`rgba(79, 70, 229, 0.4)`).
- **Surfaces & Neutrals**: Light Background (`#f9fafb` / `#ffffff`), Dark Background (`#1f2937` / `#111827`), Light Text (`#111827` / `#374151`), Dark Text (`#f3f4f6` / `#d1d5db`), Borders (`#e5e7eb` / `#374151`).
- **Precedence Hierarchy & External Skills**:
  - Binding precedence rule established in [.agents/rules/brand-precedence.md](.agents/rules/brand-precedence.md).
  - Ozeonix Infinity canonical tokens strictly override any external skill recommendations, third-party palettes, or arbitrary hex values.
  - Vendored suites:
    - UI/UX Pro Max suite: [.agents/skills/ui-ux-pro-max/](.agents/skills/ui-ux-pro-max/), `banner-design/`, `brand/`, `design/`, `design-system/`, `slides/`, and `ui-styling/` pinned to upstream commit `28b3b8dee8c976df4fa3e94aed4e092ad43fcb03`.
    - UI Skills suite: `baseline-ui/`, `component-canvas/`, `create-canvas/`, `create-design-md/`, `fixing-accessibility/`, `fixing-metadata/`, `fixing-motion-performance/`, `improve-ui/`, `ui-skills/`, and `ui-skills-root/` pinned to upstream repository `https://github.com/ibelick/ui-skills.git` at commit `97dea9e747ea94d5671ef1468cbb8f9bd5f32542`.
    - Pinned status tracked via `.upstream-lock.json` in each skill directory.
  - Sibling skills governance: External scripts (in `brand/`, `design-system/`, `ui-styling/`) must never be run to generate tokens or override Ozeonix styles; local `brand-design-system` remains authoritative.

---

## 5. Important Project Locations

- `AGENTS.md`: Permanent agent rules and mandatory design system compliance.
- `PROJECT_AGENT_STATE.md`: Operational checkpoint (this file).
- `docs/design-system.md`: Single source of truth for color tokens, typography scales, spacing, and component states.
- `.agents/rules/brand-precedence.md`: Precedence rules binding brand tokens above external skill suggestions.
- `.agents/skills/brand-design-system/SKILL.md`: Persistent agent skill enforcing brand rules.
- `.agents/skills/`: Workspace agent skills including local `brand-design-system`, vendored UI/UX Pro Max suite, and vendored UI Skills suite (`baseline-ui`, `component-canvas`, `create-canvas`, `create-design-md`, `fixing-accessibility`, `fixing-metadata`, `fixing-motion-performance`, `improve-ui`, `ui-skills`, `ui-skills-root`).
- `.agents/rules/`: Workspace agent behavioral rules.
- `src/styles.css`: Central stylesheet containing `:root` variables and Tailwind `@theme` mappings.
- `src/routes/`: Route definitions, layouts, and page views.
- `src/components/`: Shared UI components (`Reveal.tsx`, `AccessibleTabs.jsx`, `ProjectBriefForm.tsx`, etc.).
- `src/lib/`: Server functions, email templates, payment gateways, and utilities.
- `scripts/`: Audit scripts for accessibility (`a11y:check`), visual regression (`visual`), GPU animations (`gpu:check`), and Lighthouse performance (`perf`).
- `.ozeonix/plan/`: Historical milestone specs and architectural decisions.
- `roadmap.md`: High-level feature roadmap and status checklist.

---

## 6. Verification Command Index

_All commands verified directly from `package.json`:_

- **Type Check**: `npx tsc --noEmit`
- **Linting**: `npm run lint` (`eslint .`)
- **Formatting**: `npm run format` (`prettier --write .`)
- **Production Build**: `npm run build` (`vite build`)
- **Development Build**: `npm run build:dev` (`vite build --mode development`)
- **Accessibility Audit**: `npm run a11y:check` (`node scripts/accessibility-check.mjs`)
- **Visual Regression Check**: `npm run visual` (`node scripts/visual-check.mjs`)
- **Visual Baseline Update**: `npm run visual:update` (`node scripts/visual-check.mjs --update`)
- **GPU Animation Check**: `npm run gpu:check` (`node scripts/gpu-animation-check.mjs`)
- **Performance Audit**: `npm run perf` (`node scripts/lighthouse.mjs`)
- **Performance CI**: `npm run perf:ci` (`PERF_MIN=0.85 node scripts/lighthouse.mjs`)
- **Skill Upstream Check**: `npm run skill:check` (`node scripts/check-skill-updates.mjs`) — strictly read-only check comparing pinned commit against GitHub upstream; never installs updates (manual human review required).

> **Constraint Reminder**: Never execute `npm run dev` or launch long-running local servers.

---

## 7. Current Work and Next Steps

- **Active Task**: Full website UI/UX overhaul completed across all 13+ inner pages, solution routes, and dynamic industry landing pages.
- **Recently Completed**:
  - Full UI/UX redesign of Core Information Pages (`about.jsx`, `process.jsx`, `faq.jsx`, `portfolio.jsx`, `products.jsx`).
  - Full UI/UX redesign of Service Detail Pages (`services.index.jsx`, `services.crm-solutions.jsx`, `services.erp-development.jsx`, `services.lms-platforms.jsx`).
  - Full UI/UX redesign of Industry Hub & Detail Template (`industries.jsx`, `industries.$slug.jsx` supporting all 9 industries: e-commerce, entertainment, payments, event, on-demand, restaurant, fitness, education, health).
  - Full UI/UX redesign of Partner Program and Partner Auth Portal (`partner-program.jsx`, `auth.jsx`) with clean split layouts, realistic imagery, and preserved auth flows.
  - Verification: `npm run lint` passing (0 errors), `npm run build` passing cleanly for client & server.
  - Decoupled platform-specific dependencies and established standalone SSR build.
  - Complete brand color system audit & refactor across styles, email templates, error pages, and routes.
  - Consolidation of agent customization directory (`.agents/`).
  - Phase 1: Established persistent agent checkpoint (`PROJECT_AGENT_STATE.md`).
  - Phase 2: Safely vendored UI/UX Pro Max skill under `.agents/skills/ui-ux-pro-max/`.
  - Phase 3: Created binding precedence hierarchy in `.agents/rules/brand-precedence.md`.
  - Phase 4: Implemented read-only upstream checker (`scripts/check-skill-updates.mjs`) and `npm run skill:check`.
  - Phase 5: Final evidence-based verification and audit across Phases 1–4 completed.
- **Pending Roadmap Milestones** (from `roadmap.md`):
  - Phase 2: Strengthen portfolio presentation, product clarity, social sharing metadata, and trust content.
  - Phase 3: Harden contact, referral, and payment abuse protection.
  - Phase 4: Improve technical SEO, internal linking, domain readiness, and localization architecture.
  - Phase 5: Expand automated test coverage and reduce duplicated presentation code.
- **Items Not Yet Verified**:
  - Live client testimonials and verified customer case studies (pending client content collection per plan notes).

---

## 8. Agent Workflow & Operational Rules

1. **Targeted Inspection First**: Never scan the entire directory tree. Check specific files (`PROJECT_AGENT_STATE.md`, `AGENTS.md`, `package.json`, `docs/design-system.md`) before searching.
2. **Reuse Existing Patterns**: Check `src/styles.css` and existing components before introducing any new CSS class, variable, or pattern.
3. **Strict Scope Discipline**: Make only the minimal changes requested by the user. Do not reformat unrelated files or install unvetted dependencies.
4. **Execution Boundaries**: Never run local dev servers (`npm run dev`). Use static build (`npm run build`) and type check (`npx tsc --noEmit`) for verification.
5. **Push Protocol**: Never run `git push` directly; always print the push command in chat for user confirmation.

---

## 9. Checkpoint Maintenance

Future agents must update this document when:

- New milestones or phases are started or completed.
- Build scripts, dependencies, or toolchains are added or modified.
- Architectural guidelines or important design-system rules are updated.
  _Keep this document concise, actionable, and free of conversational transcripts or duplicate rules._
