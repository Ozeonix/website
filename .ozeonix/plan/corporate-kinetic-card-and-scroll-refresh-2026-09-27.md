# Corporate kinetic card and scroll refresh

## Goal
Give the website’s repeated cards a stronger, more natural premium look and make them slide into place as visitors scroll.

## Changes
- Unify service, portfolio, process, statistic, and FAQ cards around solid white/navy surfaces, crisp borders, compact corners, restrained depth, and green/yellow accents.
- Strengthen card hierarchy with clearer icon containers, labels, headings, and spacing while preserving all existing content and links.
- Tune the shared scroll reveal so cards alternate gently from left and right on larger screens and rise vertically on phones.
- Use opacity and transform only, with short staggered timing, no bounce, no continuous movement, and a complete reduced-motion fallback.
- Keep the existing responsive layout, Roboto typography, logo palette, keyboard behavior, focus states, and 44px touch targets.

## Technical details
- Refine the shared card and reveal rules rather than adding separate animation systems.
- Remove conflicting inline presentation styles from homepage process cards where needed so the shared visual system remains consistent.
- Record the shared card-motion convention in the project guidance.

## Validation
- Check the homepage and representative interior card pages on phone and desktop widths.
- Verify scroll entrances, reduced motion, overflow, touch targets, keyboard focus, accessibility checks, and the current build signal.
