# Ozeonix Infinity — Brand Design System

## 1. Overview & Single Source of Truth

The official Ozeonix Infinity brand identity is built on three core colors:
- **Orange (`#FF6900`)**: Primary Action Color
- **Emerald Green (`#00A982`)**: Secondary Brand & Accent Color
- **Deep Navy (`#06294B`)**: Structural, Text & Dark Surface Color

All UI components, pages, forms, navigation, buttons, and layouts across the application must strictly adhere to these canonical tokens. Random hardcoded colors, unvetted gradients, and arbitrary utilities are strictly prohibited.

---

## 2. Canonical Brand Tokens (`:root`)

```css
:root {
  /* Official Brand Colors */
  --brand-orange: #FF6900;
  --brand-orange-hover: #E85F00;
  --brand-orange-light: #FFF0E5;

  --brand-green: #00A982;
  --brand-green-hover: #008F6E;
  --brand-green-light: #E6F7F2;

  --brand-navy: #06294B;
  --brand-navy-hover: #0A3B68;
  --brand-navy-light: #EAF0F7;

  /* Backgrounds and Surfaces */
  --background: #FFFFFF;
  --background-muted: #F4F7FA;
  --surface: #FFFFFF;
  --surface-hover: #F8FAFC;

  /* Text */
  --text-primary: #06294B;
  --text-secondary: #4B5563;
  --text-muted: #6B7280;
  --text-inverse: #FFFFFF;

  /* Borders and Focus */
  --border: #E5E7EB;
  --border-strong: #CBD5E1;
  --focus-ring: #FF6900;

  /* Semantic Colors — Keep Separate From Brand Colors */
  --success: #15803D;
  --warning: #B45309;
  --danger: #B91C1C;
  --info: #1D4ED8;

  /* Radius and Elevation */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  --shadow-sm: 0 1px 3px rgba(6, 41, 75, 0.06);
  --shadow-md: 0 4px 12px rgba(6, 41, 75, 0.08);
  --shadow-lg: 0 12px 32px rgba(6, 41, 75, 0.12);
}
```

---

## 3. Color Usage & Hierarchy

### Orange (`#FF6900`) — Primary Action
- **Primary CTA Buttons**: `.oz-btn--primary` uses `background: var(--brand-orange)` with text in `#FFFFFF`. Hover is `var(--brand-orange-hover)` (`#E85F00`).
- **Interactive Links**: Prominent action links and active tab/filter indicators.
- **Focus Indicators**: Visible WCAG-compliant keyboard focus rings: `outline: 2px solid var(--focus-ring); outline-offset: 2px`.
- **Accents**: Highlighting key conversion numbers or hero badges.
- *Rule*: Do not flood every heading or card border with orange; reserve it for primary interactive intent.

### Emerald Green (`#00A982`) — Secondary Brand
- **Secondary Accents**: Supporting visual accents, badges, tags, success metrics, growth indicators.
- **Subtle Highlights**: Light green tint surfaces (`var(--brand-green-light)`: `#E6F7F2`) for informational callouts.
- *Rule*: Do not use green as the primary button color across the entire site.

### Deep Navy (`#06294B`) — Structural Foundation
- **Headings & Body Typography**: Main headings (`h1`–`h6`), titles, and body-adjacent high-contrast text.
- **Navigation & Footer**: Primary structural chrome (`.oz-nav`, `.oz-footer`) and high-authority dark panels.
- **Secondary Buttons**: Outline or dark-solid secondary actions (`.oz-btn--secondary`, `.oz-btn--outline`).
- **Inverted Surfaces**: When Navy is the background, text must be `var(--text-inverse)` (`#FFFFFF`) with accessible contrast.

### White (`#FFFFFF`) & Light Gray (`#F4F7FA`) — Canvas
- **Primary Page Background**: Clean white `#FFFFFF`.
- **Alternating Sections**: `#F4F7FA` (`var(--background-muted)`).
- **Cards & Surfaces**: `#FFFFFF` with neutral border `#E5E7EB` (`var(--border)`) and elevation shadow `var(--shadow-sm)` or `var(--shadow-md)`.

### Semantic Colors
- **Success**: `#15803D` (paid status, verified checks, completed actions)
- **Warning**: `#B45309` (pending status, warnings, attention needed)
- **Danger**: `#B91C1C` (error states, validation alerts, rejected status)
- **Info**: `#1D4ED8` (neutral informational alerts)
- *Rule*: Never replace semantic error or warning indicators with brand colors.

---

## 4. Component Rules

| Component | Normal State | Hover / Focus State |
|---|---|---|
| **Primary Button** | `bg: var(--brand-orange)` / `color: #fff` | `bg: var(--brand-orange-hover)` / `shadow: var(--shadow-md)` |
| **Secondary Button** | `bg: transparent` / `color: var(--brand-navy)` / `border: var(--brand-navy)` | `bg: var(--brand-navy)` / `color: #fff` |
| **Accent Badge** | `bg: var(--brand-green-light)` / `color: var(--brand-green)` | — |
| **Input Fields** | `border: var(--border)` / `bg: var(--surface)` | `border: var(--brand-orange)` / `ring: var(--focus-ring)` |
| **Cards** | `bg: var(--surface)` / `border: var(--border)` | `border: var(--border-strong)` / `shadow: var(--shadow-md)` |
| **Navbar Links** | `color: var(--brand-navy)` | `color: var(--brand-orange)` |
| **Active Nav Link**| `color: var(--brand-orange)` / bottom indicator | — |

---

## 5. Prohibited Practices
1. **No arbitrary hex colors**: Never write `#22d3ee`, `#c084fc`, `#fee232`, or random hexes in inline styles or ad-hoc classes.
2. **No arbitrary gradients**: Gradients of unrelated colors (e.g. purple-to-cyan) are strictly prohibited.
3. **No logo recoloring**: Always use the official multi-color or white-text PNG brand logos as provided in `public/assets/`.
