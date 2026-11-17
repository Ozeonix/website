---
name: brand-design-system
description: Enforces the permanent canonical Ozeonix Infinity brand color system and UI standards across all components, pages, and styles.
---

# Brand Design System Skill - Ozeonix Infinity

## Mandate for Agents & Developers

Every UI modification, new feature, page, or component in this repository MUST strictly comply with the canonical design system tokens defined in [docs/design-system.md](file:///home/bhola-dev58/Ozeonix/ozeonix-website/docs/design-system.md).

### 1. Canonical Color Palette Breakdown

This project utilizes an **Orange & Neutral Education/Institute Theme with subtle Cyan/Blue geometric accents**:

| Role                     | Tailwind Class             | Hex Code              | Usage                                                     |
| :----------------------- | :------------------------- | :-------------------- | :-------------------------------------------------------- |
| **Primary Brand**        | `orange-600`               | `#ea580c`             | Primary CTA buttons, key headings, active link highlights |
| **Primary Hover**        | `orange-700`               | `#c2410c`             | Hover state for buttons and links                         |
| **Brand Accent / Bar**   | `orange-500`               | `#f97316`             | Announcement tickers, badge accents, logo border          |
| **Brand Deep**           | `orange-800`               | `#9a3412`             | Prominent logo text, bold title headings                  |
| **Brand Surface / Tint** | `orange-50` / `orange-100` | `#fff7ed` / `#ffedd5` | Active tab backgrounds, soft hover highlight states       |
| **Secondary Accent**     | `blue-300` / `blue-600`    | `#93c5fd` / `#2563eb` | Background decorative SVGs, secondary badges              |
| **Glow / Shadow Accent** | `indigo-600`               | `#4f46e5`             | Subtle glow shadows (`rgba(79, 70, 229, 0.4)`)            |
| **Light Background**     | `gray-50` / `white`        | `#f9fafb` / `#ffffff` | Page body background and card surfaces                    |
| **Dark Background**      | `gray-800` / `gray-900`    | `#1f2937` / `#111827` | Dark mode body and card surfaces                          |
| **Light Text**           | `gray-900` / `gray-700`    | `#111827` / `#374151` | High contrast headings and body text                      |
| **Dark Text**            | `gray-100` / `gray-300`    | `#f3f4f6` / `#d1d5db` | Dark mode text elements                                   |
| **Borders**              | `gray-200` / `gray-700`    | `#e5e7eb` / `#374151` | Subtle divider lines and card borders                     |

### 2. Implementation Rules for Agents

1. **Primary Buttons**: Always use `orange-600` (`#ea580c`, `.oz-btn--primary` or `.btn-primary`) with white text and `orange-700` (`#c2410c`) hover state.
2. **Secondary Buttons**: Use `.btn-secondary` or `.oz-btn--outline` with neutral borders and orange hover tints (`orange-50` / `#fff7ed`).
3. **Badges / Highlights**: Use `orange-500` (`#f97316`) for announcement bars or `blue-300`/`blue-600` (`#93c5fd`/`#2563eb`) for secondary accents.
4. **Cards**: Standard cards use `.card` or `.oz-card` with light background (`#ffffff` / `#f9fafb`) or dark background (`#1f2937` / `#111827`) with subtle border (`#e5e7eb` / `#374151`).
5. **No Random or Arbitrary Colors**: Do NOT write unapproved hex codes, arbitrary RGB values, or conflicting external Tailwind color utilities. Always use the specified palette tokens.
6. **Accessibility**: All interactive elements must maintain WCAG AA contrast (minimum 4.5:1 for normal text) and show visible focus rings with `var(--focus-ring)` (`#f97316` / `#ea580c`).
