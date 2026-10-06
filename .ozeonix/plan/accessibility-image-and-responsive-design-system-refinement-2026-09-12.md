# Accessibility, image, and responsive design-system refinement

## Goal
Make every page easier to read and operate, keep images stable on small screens, and replace inconsistent fixed sizing with shared fluid design tokens.

## What will change

### 1. Consolidate responsive design tokens
- Define one fluid scale for page gutters, section spacing, component gaps, card padding, borders, radii, controls, icons, and logos.
- Preserve Roboto, the Ozeonix palette, and the existing `#fbbc04` accent.
- Replace overlapping mobile-only overrides where shared tokens can provide smoother scaling.

### 2. Implement fluid typography
- Use `clamp()` tokens for body, small, lead, button, and heading sizes.
- Add fluid line-height and heading/paragraph spacing tokens so text remains compact on phones and comfortable on desktop.
- Keep long labels, translated text, and headings wrapping safely without clipping.

### 3. Improve accessibility
- Strengthen foreground/background contrast where current muted or translucent text is borderline.
- Standardize highly visible keyboard focus rings for links, buttons, form fields, menus, cards, and fixed bottom navigation.
- Ensure interactive controls and standalone links provide at least 44×44px touch areas on touch devices without inflating inline text links.

### 4. Optimize responsive images
- Make the shared responsive-image component handle local and remote images safely, with accurate `srcset`, `sizes`, dimensions, and decoding/loading behavior.
- Add stable image wrappers, intrinsic aspect ratios, and global max-width rules to reduce layout shift.
- Use deliberate `object-fit` and `object-position` behavior so meaningful content is not accidentally cropped on small screens.

### 5. Validate across screen sizes
- Check representative pages at 360, 390, 768, 1024, 1280, and 1536px.
- Verify keyboard focus visibility, touch-target dimensions, image sizing, contrast-sensitive areas, and horizontal overflow.
- Confirm the preview build remains healthy after the changes.

## Technical details
- Primary work will stay in the shared stylesheet and responsive image component, with small targeted markup changes only where an image needs explicit sizing information.
- Existing content, SEO metadata, forms, analytics, payment behavior, and animations will remain unchanged.
