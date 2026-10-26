---
name: brand-design-system
description: Enforces the permanent canonical Ozeonix Infinity brand color system and UI standards across all components, pages, and styles.
---

# Brand Design System Skill — Ozeonix Infinity

## Mandate for Agents & Developers
Every UI modification, new feature, page, or component in this repository MUST strictly comply with the canonical design system tokens defined in [docs/design-system.md](file:///home/bhola-dev58/Ozeonix/ozeonix-website/docs/design-system.md).

### 1. Canonical Tokens
- **Primary Action (Orange)**:
  - Base: `#FF6900` (`var(--brand-orange)`)
  - Hover: `#E85F00` (`var(--brand-orange-hover)`)
  - Light Surface: `#FFF0E5` (`var(--brand-orange-light)`)
  - Focus Ring: `#FF6900` (`var(--focus-ring)`)
- **Secondary Brand & Accents (Emerald Green)**:
  - Base: `#00A982` (`var(--brand-green)`)
  - Hover: `#008F6E` (`var(--brand-green-hover)`)
  - Light Surface: `#E6F7F2` (`var(--brand-green-light)`)
- **Structural Base & Text (Deep Navy)**:
  - Base: `#06294B` (`var(--brand-navy)`)
  - Hover: `#0A3B68` (`var(--brand-navy-hover)`)
  - Light: `#EAF0F7` (`var(--brand-navy-light)`)
  - Text Primary: `#06294B` (`var(--text-primary)`)
- **Surfaces & Borders**:
  - Background: `#FFFFFF` (`var(--background)`)
  - Background Muted: `#F4F7FA` (`var(--background-muted)`)
  - Surface: `#FFFFFF` (`var(--surface)`)
  - Surface Hover: `#F8FAFC` (`var(--surface-hover)`)
  - Border: `#E5E7EB` (`var(--border)`)
  - Border Strong: `#CBD5E1` (`var(--border-strong)`)
- **Semantics**:
  - Success: `#15803D`
  - Warning: `#B45309`
  - Danger: `#B91C1C`
  - Info: `#1D4ED8`

### 2. Implementation Rules
1. **Primary Buttons**: Always use `.oz-btn--primary` which renders in `--brand-orange` with white text.
2. **Secondary Buttons**: Use `.oz-btn--outline` or `.oz-btn--secondary` styled with `--brand-navy`.
3. **Badges / Highlights**: Use `--brand-green` and `--brand-green-light` for positive, growth, or accent metrics.
4. **Typography**: All headings use `--brand-navy`. Body text uses `--text-primary` or `--text-secondary`.
5. **No Arbitrary Colors**: Do NOT write raw hex codes (`#xxx`), RGB values, or conflicting Tailwind color utilities. Always reference tokens via `var(--brand-...)` or semantic CSS variables.
6. **Accessibility**: All interactive elements must maintain WCAG AA contrast (minimum 4.5:1 for normal text) and show visible focus rings with `var(--focus-ring)`.
