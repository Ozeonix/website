# Ozeonix Infinity Correction Plan

## Goal
Strengthen credibility, lead conversion, navigation, search foundations, payment safety, and long-term maintainability without disrupting the current responsive design or brand system.

## Phase 1 — Immediate corrections
- Consolidate the homepage and Contact page lead forms into one reusable form and one validation model.
- Keep Budget as a free-text field with clear currency guidance and align all fields with the existing neumorphic Contact-page styling.
- Correct the Services menu so CRM, ERP, and LMS open their dedicated pages; remove misleading duplicate destinations.
- Simplify Partners navigation and only expose a personal dashboard after authentication.
- Standardize the primary CTA wording to “Discuss your project.”
- Remove duplicate homepage FAQ structured data.
- Temporarily remove the empty Blog from primary navigation, search indexing, sitemap, and AI-readable page listings while preserving the page for future articles.
- Prevent payment, authenticated, design-token, and preview pages from search indexing and remove transactional pages from the sitemap.
- Replace misleading automatically-current sitemap dates with stable content dates.
- Remove placeholder or time-sensitive claims that cannot be verified, including the fake-looking Search Console value and temporary quarter messaging.

## Phase 2 — Trust and conversion
- Rework Portfolio presentation so demo work is clearly separated from real client work.
- Add reusable case-study and testimonial sections ready for verified client content.
- Clarify live, planned, and future offerings on Products.
- Add consistent trust messaging to Contact and Payment without inventing customers, ratings, certifications, or results.
- Add branded social-sharing images and route-level sharing metadata.

## Phase 3 — Security and reliability
- Replace per-server-memory contact throttling with durable rate limiting.
- Add abuse protection to payment creation, verification, and partner lead submission.
- Add a payment confirmation step, sensible amount limits, and clearer provider/error guidance.
- Require a meaningful invoice reference for manual invoice payments.
- Verify private payment data and provider responses remain administrator-only.
- Document data retention and deletion expectations in the privacy copy.

## Phase 4 — Search and multilingual architecture
- Run the current-project SEO foundations scan and resolve confirmed issues.
- Correct organization/service structured data and add breadcrumb navigation/schema to deep pages.
- Improve contextual links between industry and service pages.
- Prepare canonical URLs for migration to an owned domain.
- Either create crawlable language-specific pages with language-alternate tags or clearly position translation as an on-page convenience.

## Phase 5 — Quality automation and cleanup
- Extend accessibility and visual coverage to payment, FAQ, blog, partner, auth, and industry-detail pages.
- Add tests for payment signatures, payment status reconciliation, contact submissions, and referral attribution.
- Add lint, type checking, and test enforcement to continuous integration.
- Move large inline visual rules into shared design classes and gradually convert high-risk JavaScript screens to typed files.

## Validation
- Verify at mobile, tablet, and desktop widths with no overflow or element overlap.
- Run type checking, accessibility checks, metadata stability checks, and relevant browser flows.
- Confirm visible keyboard focus, mobile menu behavior, form validation, contact submission, and payment preparation.
- Confirm every public content page has unique title, description, Open Graph metadata, canonical URL, and appropriate indexing rules.

## Inputs needed for later phases
- Real client names, approved testimonials, product screenshots, and measurable outcomes for case studies.
- An owned website domain for canonical migration and reliable email sending.
- The genuine Search Console verification value, if verification is desired.

Implementation will begin with Phase 1 because it provides the greatest immediate improvement without requiring external content or credentials.
