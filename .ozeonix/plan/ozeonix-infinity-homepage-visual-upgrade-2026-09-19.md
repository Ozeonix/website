# Ozeonix Infinity Homepage Visual Upgrade

## Goal
Create an original, premium software-agency homepage inspired by the clarity and conversion flow of the reference site, while preserving Ozeonix Infinity’s identity, local Nepal positioning, content, accessibility, and working features.

## What will change
- Rebuild the opening section around a responsive product-interface collage representing CRM, ERP, LMS, websites, and mobile apps.
- Simplify the opening message and action hierarchy so visitors immediately understand the offer and next step.
- Refine the trust strip and featured solutions into stronger visual proof near the top of the page.
- Consolidate or reduce weaker/repetitive homepage sections, retaining the content most likely to impress customers: solutions, selected work, measurable proof, process, testimonials, FAQ, and contact.
- Upgrade solution and portfolio cards with crisp borders, compact radii, stronger image hierarchy, and restrained desktop-only emphasis.
- Strengthen the final contact banner and transition into the existing project inquiry form.
- Preserve the current navbar, payments, partner links, forms, translations, SEO content, analytics, and backend behavior.

## Responsive design
- Use fluid typography, spacing, image, icon, border, and control sizing from 360px through wide desktop.
- Let the product collage become a stable vertical composition on phones instead of shrinking the desktop arrangement.
- Use single-column mobile sections, two-column tablet layouts where space permits, and asymmetrical desktop grids without horizontal overflow.
- Maintain at least 44px touch targets, visible focus states, readable contrast, reserved image dimensions, and reduced-motion support.

## Technical details
- Modify `src/routes/index.jsx` and the homepage-related rules in `src/styles.css` only unless a small reusable presentation component is clearly beneficial.
- Replace hardcoded homepage visual values with existing or new semantic tokens.
- Keep the existing `Reveal` system lightweight and avoid wave effects or costly continuous animations.
- Keep route metadata and structured data stable while ensuring headings remain semantic.
- Verify the result at 360, 390, 768, 1024, 1280, and 1536px, then run the existing accessibility and visual checks and inspect current build diagnostics.

## Scope boundary
This refresh will use the reference site only for general information hierarchy and pacing. It will not copy its code, images, branding, text, exact card styling, or layout proportions.
