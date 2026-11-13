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
- **Eyebrow Pill**: `< / > TECHNOLOGIES` in brand orange with circular `< / >` bracket icon and speech bubble tail pointing downwards toward "dependable.".
- **Heading & Doodle Accents**: "Modern, proven, <span class="oz-tech-title__accent">dependable.</span>" with 3-line orange radiating sunburst spark on top-left of "Modern".
- **Pills Layout (Dual Responsive Rows)**:
  - Row 1 (9 pills): React (cyan atom), Next.js (black circle with N), Node.js (green hexagon with JS), Flutter (blue origami bird), MongoDB (green leaf), PostgreSQL (elephant head logo), Firebase (3-facet flame), AWS (dark logo with orange smile), Docker (blue whale).
  - Row 2 (3 pills): Kubernetes (blue helm), REST APIs (solid blue cloud with white gear), AI (blue microchip with pins and bold "AI").
- **Backdrop Art**: Organic curved orange quadrant blooms on top-left and bottom-right corners, subtle masked dot matrices, and sweeping wave line across the background.
- **Responsiveness**: Desktop shows 9 items on row 1 and 3 centered on row 2; smoothly wraps on tablets and mobile with balanced spacing and zero horizontal overflow.

### C. Trust & Capabilities Quicklinks (`src/routes/index.jsx` & `src/styles.css`)
- **Header**: Eyebrow badge `Built for ambitious teams across industries` with `Sparkles` icon and brand orange tint.
- **Industry Pills**: Tactile capsule pills for Schools & Colleges (`GraduationCap`), Retail & Inventory (`ShoppingBag`), Healthcare (`Activity`), Professional Services (`Briefcase`), and Growing SMEs (`TrendingUp`).
- **Capability Cards**: 4 responsive cards (CRM systems, ERP platforms, LMS solutions, Web & mobile) featuring dedicated 44px icon badges, clean typography, forward-sliding arrows on hover, and animated bottom accent progress line.
- **Grid Layout**: 4 columns on desktop, 2 columns on tablet, 1 column on mobile.

### D. Upgraded Modern Dark Footer (`src/components/Footer.jsx` & `src/styles.css`)
- **Logo Presentation**: Clean, official white-text horizontal logo image only (redundant text removed).
- **Navigation Bullets / Arrows**: Dedicated semantic `ChevronRight` icons permanently visible with vibrant orange styling (`#f97316`) that glide forward smoothly on link hover.
- **Compact Spacing & Strong Typography**: Tightened padding and margins, increased link weight (`600`) and column header weight (`750`) with high-contrast text (`rgba(255, 255, 255, 0.9)`).
- **Kinetic Wave Vector Background**: 20-path parabolic energy fan originating bottom-left and fanning out top-right (`viewBox="0 0 1200 320"`, `preserveAspectRatio="none"`).
- **Opacity Tuning**: Group opacity at `0.6` (60%), CSS lines base opacity `0.36`, gentle breathing pulse (`0.30`–`0.44`).
- **Social Media Buttons**: Circular 44px buttons (`.oz-footer__social-btn`) with dead-centered vector glyphs (Facebook, LinkedIn, Instagram, WhatsApp, Phone).
- **Hover Contrast**: Specificity-locked hover state (`background-color: #ea580c !important; color: #ffffff !important;`) ensuring white icons remain crisp over orange on hover without being covered.

### D. Lead Capture Form (`src/components/ProjectBriefForm.jsx`)
- Accessible semantic `<fieldset>` and `<legend>` structure.
- Consistent Zod validation on both homepage and `/contact` page.

### E. Cloudinary Image Delivery & Storage System
- **Cloud Name**: `ds3gjhrob` (configured across `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_CLOUD_NAME`, and `CLOUDINARY_CLOUD_NAME`).
- **Client Utilities (`src/lib/cloudinary.js`)**:
  - `getCloudinaryUrl(publicIdOrUrl, options)`: automatic modern format delivery (`f_auto`), smart lossy compression (`q_auto`), dynamic responsive width limits (`w_800,c_limit`), and Cloudinary fetch URL proxy for remote assets.
  - `buildCloudinarySrcSet(publicIdOrUrl, widths, options)`: generates multi-breakpoint srcset strings (320w to 1920w).
- **Server SDK (`src/lib/cloudinary.server.js`)**:
  - Authenticated server-side uploads via `uploadToCloudinary()` and deletions via `deleteFromCloudinary()`.
- **Components**:
  - `<CloudinaryImage />` (`src/components/CloudinaryImage.jsx`): plug-and-play picture tag delivery with AVIF, WebP, and fallback sources.
  - `<ResponsiveImage />` (`src/components/ResponsiveImage.jsx`): enhanced to automatically detect and optimize Cloudinary images alongside Unsplash.


