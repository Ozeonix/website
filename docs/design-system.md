# Ozeonix Infinity - Brand Design System

## 1. Overview & Single Source of Truth

This project utilizes an **Orange & Neutral Education/Institute Theme with subtle Cyan/Blue geometric accents**:

| Role                     | Tailwind Class             | Hex Code              | Usage                                                     |
| :----------------------- | :------------------------- | :-------------------- | :-------------------------------------------------------- |
| **Primary Brand**        | `orange-600`               | `#ea580c`             | Primary CTA buttons, key headings, active link highlights |
| **Primary Hover**        | `orange-700`               | `#c2410c`             | Hover state for buttons and links                         |
| **Brand Accent / Bar**   | `orange-500`               | `#f97316`             | Announcement tickers, badge accents, logo border          |
| **Brand Deep**           | `orange-800`               | `#9a3412`             | Prominent logo text, bold institution/company title       |
| **Brand Surface / Tint** | `orange-50` / `orange-100` | `#fff7ed` / `#ffedd5` | Active tab backgrounds, soft hover highlight states       |
| **Secondary Accent**     | `blue-300` / `blue-600`    | `#93c5fd` / `#2563eb` | Background decorative SVGs, secondary badges              |
| **Glow / Shadow Accent** | `indigo-600`               | `#4f46e5`             | Subtle glow shadows (`rgba(79, 70, 229, 0.4)`)            |
| **Light Background**     | `gray-50` / `white`        | `#f9fafb` / `#ffffff` | Page body background and card surfaces                    |
| **Dark Background**      | `gray-800` / `gray-900`    | `#1f2937` / `#111827` | Dark mode body and card surfaces                          |
| **Light Text**           | `gray-900` / `gray-700`    | `#111827` / `#374151` | High contrast headings and body text                      |
| **Dark Text**            | `gray-100` / `gray-300`    | `#f3f4f6` / `#d1d5db` | Dark mode text elements                                   |
| **Borders**              | `gray-200` / `gray-700`    | `#e5e7eb` / `#374151` | Subtle divider lines and card borders                     |

All UI components, pages, forms, navigation, buttons, and layouts across the application must strictly adhere to these canonical tokens. Random hardcoded colors, unvetted gradients, and arbitrary utilities are strictly prohibited.

---

## 2. Canonical Brand Tokens (`:root`)

```css
:root {
  /* Brand Orange Scale */
  --brand-orange-50: #fff7ed;
  --brand-orange-100: #ffedd5;
  --brand-orange-200: #fed7aa;
  --brand-orange-500: #f97316;
  --brand-orange: #ea580c; /* orange-600 Primary Brand */
  --brand-orange-hover: #c2410c; /* orange-700 Primary Hover */
  --brand-orange-deep: #9a3412; /* orange-800 Brand Deep */
  --brand-orange-light: #fff7ed; /* orange-50 Surface Tint */

  /* Secondary Accent (Blue/Cyan) */
  --accent-blue-light: #93c5fd; /* blue-300 Decorative SVGs */
  --accent-blue: #2563eb; /* blue-600 Secondary Badges */
  --accent-blue-default: #3b82f6;

  /* Glow / Shadow Accent */
  --accent-glow: #4f46e5; /* indigo-600 */
  --shadow-glow: 0 4px 20px -2px rgba(79, 70, 229, 0.4);

  /* Backgrounds and Surfaces */
  --background: #f9fafb; /* gray-50 Light Background */
  --background-muted: #f3f4f6;
  --surface: #ffffff; /* white Card Surface */
  --surface-hover: #fff7ed; /* soft hover highlight */
  --background-dark: #111827; /* gray-900 Dark Body */
  --surface-dark: #1f2937; /* gray-800 Dark Surface */

  /* Text */
  --text-primary: #111827; /* gray-900 High Contrast */
  --text-secondary: #374151; /* gray-700 Body Text */
  --text-muted: #6b7280;
  --text-inverse: #ffffff;
  --text-dark-primary: #f3f4f6; /* gray-100 */
  --text-dark-secondary: #d1d5db; /* gray-300 */

  /* Borders and Focus */
  --border: #e5e7eb; /* gray-200 */
  --border-strong: #cbd5e1;
  --border-dark: #374151; /* gray-700 */
  --focus-ring: #f97316; /* orange-500 */

  /* Semantic Colors */
  --success: #15803d;
  --warning: #b45309;
  --danger: #b91c1c;
  --info: #1d4ed8;

  /* Radius and Elevation */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: rgba(72, 86, 100, 0.1) 0px 2px 20px 0px;
  --shadow-md: rgba(0, 0, 0, 0.1) 0px 0px 25px 0px;
  --shadow-lg: 0 12px 32px rgba(17, 24, 39, 0.12);

  /* Canonical Motion Tokens (20 Tokens System) */
  --duration-fast-all: all;
  --duration-fast-transform: transform;
  --duration-fast-none: none;
  --duration-base-ease-out: 0.2s ease-out;
  --duration-base-ease-in-out: 0.3s ease-in-out;
  --duration-base: 0.3s;
  --duration-base-opacity: opacity 0.3s;
  --duration-slow-400: 0.4s;
  --duration-slow-500: 0.5s;
  --duration-slow-cursor: 0.5s infinite alternate moveCursor1;
  --duration-slow-600: 0.6s;
  --duration-slow-reveal: opacity 1s ease-in-out, transform 1s ease-in-out;
  --duration-slow-reveal-02: opacity 1s ease-in-out 0.2s, transform 1s ease-in-out 0.2s;
  --duration-slow-reveal-03: opacity 1s ease-in-out 0.3s, transform 1s ease-in-out 0.3s;
  --duration-slow-reveal-04: opacity 1s ease-in-out 0.4s, transform 1s ease-in-out 0.4s;
  --duration-slow-reveal-05: opacity 1s ease-in-out 0.5s, transform 1s ease-in-out 0.5s;
  --duration-slow-reveal-06: opacity 1s ease-in-out 0.6s, transform 1s ease-in-out 0.6s;
  --duration-slow-reveal-07: opacity 1s ease-in-out 0.7s, transform 1s ease-in-out 0.7s;
  --duration-slow-reveal-08: opacity 1s ease-in-out 0.8s, transform 1s ease-in-out 0.8s;
  --duration-slow-reveal-09: opacity 1s ease-in-out 0.9s, transform 1s ease-in-out 0.9s;
  --card-transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.2s ease-out, background-color 0.3s ease;
}
```

---

## 3. Component Rules

| Component                                                   | Normal State                                                                     | Hover / Focus State                                          |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Primary Button** (`.oz-btn--primary`, `.btn-primary`)     | `bg: #ea580c` / `color: #ffffff`                                                 | `bg: #c2410c` / `shadow: 0 4px 12px rgba(234, 88, 12, 0.35)` |
| **Secondary Button** (`.btn-secondary`, `.oz-btn--outline`) | `bg: #ffffff` (dark: `#1f2937`) / `border: 2px solid #ea580c` / `color: #ea580c` | `bg: #fff7ed` (dark: `#374151`) / `color: #c2410c`           |
| **Standard Card** (`.card`, `.oz-card`)                     | `bg: #ffffff` (dark: `#1f2937`) / `border: 1px solid #e5e7eb` (dark: `#374151`) / `shadow: var(--shadow-sm)` | `shadow: var(--shadow-md)` / `transform: translateY(-6px)` / `border-color: rgba(234, 88, 12, 0.45)` |
| **Card Image Hover** (`.oz-card img`)                       | `transition: transform 0.4s ease-in-out`                                         | `transform: scale(1.05)` (duration-slow: 0.4s)              |
| **Fixed Navigation Bar** (`.oz-nav`)                        | `position: fixed; top: 0; width: 100%; z-index: 1000; bg: rgba(255,255,255,0.98)` / `backdrop-blur-md` | `is-scrolled`: elevated shadow (`0 4px 20px -2px rgba(17,24,39,0.08)`) |
| **Glassmorphism Effect** (`.glass-effect`)                  | `backdrop-blur-md` / `bg-white/10` / `border-white/20`                           | -                                                            |
| **Announcement / Badges**                                   | `bg: #fff7ed` / `color: #ea580c` / `border: 1px solid #fed7aa`                   | -                                                            |
| **Secondary Badges**                                        | `bg: #dbeafe` / `color: #2563eb`                                                 | -                                                            |
| **Input Fields**                                            | `border: #e5e7eb` / `bg: #ffffff`                                                | `border: #ea580c` / `ring: 2px solid #f97316`                |
| **Navigation Links**                                        | `color: #374151` (dark: `#f3f4f6`)                                               | `color: #ea580c`                                             |
| **Active Nav Link**                                         | `color: #ea580c` / bottom border                                                 | -                                                            |

---

## 5. Prohibited Practices

1. **No arbitrary hex colors**: Never write `#22d3ee`, `#c084fc`, `#fee232`, or random hexes in inline styles or ad-hoc classes.
2. **No arbitrary gradients**: Gradients of unrelated colors (e.g. purple-to-cyan) are strictly prohibited.
3. **No logo recoloring**: Always use the official multi-color or white-text PNG brand logos as provided in `public/assets/`.
