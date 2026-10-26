# Responsive images, keyboard access, and design-token reference

## Goal
Eliminate avoidable image layout shift, make every navigation and form flow fully keyboard-operable, standardize mobile tap targets, add automated accessibility coverage, and provide a small visual reference for the responsive design tokens already used by the site.

## What will change

### 1. Responsive image delivery
- Strengthen the shared responsive-image component with validated intrinsic dimensions, reserved aspect ratio, lazy loading by default, async decoding, and accurate `srcset`/`sizes` output for supported remote images.
- Correct the React image-priority attribute and keep the first-view logo eager while below-fold logos and content images remain lazy.
- Audit every image and picture usage so wrappers reserve space, meaningful content has useful alternative text, decorative media stays silent, and mobile cropping uses deliberate `object-fit`/`object-position` rules.

### 2. Complete keyboard interaction
- Rebuild desktop navigation menus as explicit keyboard-controlled menus: Enter/Space opens, Arrow keys move through items, Escape closes and restores focus, and focus cannot disappear into hidden content.
- Make the mobile menu behave as an accessible modal drawer using the existing accessible dialog primitives, including focus containment, Escape close, close-on-navigation, and focus return.
- Upgrade the language selector and tab-style controls with correct focus movement, Home/End behavior, selected state, and stable focus order.
- Verify all forms retain logical DOM order, associated labels, first-invalid-field focus, readable error announcements, and visible focus indicators.

### 3. Consistent tap targets and focus styling
- Add shared control-size tokens for minimum 44×44px targets, compact inline-link exceptions, and icon-control sizing.
- Apply those tokens consistently to header links, menu items, bottom navigation, buttons, form controls, tabs, summaries, and floating controls.
- Keep focus rings visible against light, dark, yellow, and fixed-navigation backgrounds, including forced-colors mode.

### 4. Automated accessibility audit
- Add a Playwright accessibility check using axe plus custom keyboard, focus-order, ARIA, image-reservation, and tap-target assertions.
- Run public representative routes at 360, 390, 768, and 1024px widths and include the check in CI.
- Produce a machine-readable report and a concise prioritized summary grouped into critical, warning, and informational findings.

### 5. Design-token reference page
- Add a small `/design-tokens` page showing the live spacing, padding, border, radius, icon, control, and responsive typography scales.
- Render samples directly from the same CSS variables used by production components so the reference cannot drift from the site.
- Mark the page `noindex` and include complete route metadata without adding it to public marketing navigation.

### 6. Validation
- Check representative pages with keyboard-only navigation and automated accessibility scans.
- Verify no horizontal overflow, clipped focus rings, undersized controls, missing labels, image dimension gaps, or unexpected mobile cropping at 360, 390, 768, and 1024px.
- Confirm the preview build remains healthy and report any residual findings that require content or third-party changes.

## Technical details
- Changes will stay in shared components, global design tokens, the new reference route, audit scripts, and CI configuration.
- Existing copy, SEO strategy, payment logic, referral workflows, analytics events, and visual brand will remain unchanged.
- Existing accessible dialog primitives will handle modal focus trapping rather than custom focus-management code.
