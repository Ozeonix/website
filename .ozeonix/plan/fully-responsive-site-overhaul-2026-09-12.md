# Fully responsive site overhaul

## Goal
Make every public page and dashboard feel intentionally designed from small phones through tablets, laptops, desktops, and wide screens. Responsiveness will cover typography, spacing, borders, controls, imagery, icons, logos, navigation, forms, tables, and fixed elements—not only flex and grid behavior.

## What will change

### 1. Build one fluid responsive foundation
- Consolidate the overlapping mobile rules into a clear mobile-first scale for 360px, 390px, 768px, 1024px, 1280px, and wide desktop layouts.
- Add reusable fluid tokens for page gutters, section spacing, card padding, gaps, heading/body sizes, radii, borders, control heights, icons, and logos.
- Use `clamp()`, `minmax()`, intrinsic sizing, and content-safe widths so dimensions grow smoothly rather than jumping abruptly.
- Keep Roboto and the existing Ozeonix colors, including the `#fbbc04` hero accent.

### 2. Refine shared navigation and fixed controls
- Make the desktop navbar fit without crowding, with a controlled transition to the mobile menu before links collide.
- Scale the brand logo, label, navigation text, buttons, dropdowns, and language selector by screen size.
- Keep the app-style bottom navigation on phones, refine its icon/label sizing, and prevent it from covering content.
- Coordinate the WhatsApp button with bottom navigation and safe-area insets at every supported width.

### 3. Make every content pattern responsive
- Standardize fluid page openers, section headings, cards, grids, stats, timelines, CTA bands, badges, and FAQ rows.
- Refine the homepage hero, process section, marketing illustration, portfolio media, and technology strips with stable aspect ratios and proportional sizing.
- Replace fragile one-off dimensions in the main page with responsive classes where they affect layout.
- Ensure long headings, translated text, emails, phone numbers, and button labels wrap cleanly without clipping.

### 4. Improve forms and dashboard layouts
- Use a mobile-first form grid with full-width controls on phones and balanced columns when space allows.
- Scale field labels, inputs, dropdowns, text areas, validation messages, and submit buttons consistently.
- Make partner/admin filters and summary rows reflow cleanly.
- Keep data tables usable through contained horizontal scrolling where a true table is necessary, without causing page-level overflow.

### 5. Responsive media and interaction details
- Give images and illustrations responsive width, height, object-fit, and aspect-ratio rules.
- Scale icons and logos with dedicated size tokens while preserving minimum touch targets.
- Reduce decorative effects and hover movement on touch devices; retain reduced-motion behavior.
- Keep border thickness, radii, shadows, and focus rings visually balanced across screen sizes.

### 6. Validate visually and technically
- Check representative public pages plus contact, payment, partner, and admin views at 360, 390, 768, 1024, 1280, and 1536px.
- Test for horizontal overflow, clipped text, overlapping fixed controls, undersized tap targets, broken grids, and unstable image sizing.
- Verify the current preview build and responsive screenshots before completion.

## Technical details
- Primary work will be in the shared stylesheet, with targeted class cleanup in shared navigation/footer and pages containing heavy inline sizing.
- Existing content, business logic, SEO metadata, analytics, payment handling, and form behavior will remain unchanged.
- Existing semantic tokens will remain authoritative; new responsive values will be expressed as reusable tokens rather than duplicated page-specific numbers.
