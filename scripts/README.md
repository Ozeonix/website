# Performance checks

Repeatable Lighthouse audit for image loading, lazy-loading, and Core Web Vitals.

```bash
bun run perf                       # audit local dev (http://localhost:8080)
bun run perf https://ozeonix.com   # audit any URL
PERF_MIN=0.9 bun run perf:ci       # fail if score < 0.9 (for CI gates)
```

Reports are written to `reports/lighthouse-<host>-<timestamp>.{html,json}` (gitignored).

The console output highlights the four image-related audits that matter for
this project:

- **Modern formats (WebP/AVIF)** — the `<ResponsiveImage>` component serves
  AVIF → WebP → JPEG via `<picture>`.
- **Responsive srcset sizing** — every image ships a width ladder (400 → 1600)
  plus a `sizes` attribute so mobile downloads the smallest sufficient asset.
- **Offscreen lazy-loading** — below-the-fold images use
  `loading="lazy" decoding="async"`. The above-the-fold nav logo uses
  `fetchpriority="high"` instead.
- **Image compression** — the local logo is optimized (12 KB PNG); remote
  images use `q=70` via Unsplash's on-the-fly optimizer.

## Preventing layout shift (CLS = 0)

All images have explicit `width`/`height` attributes and live inside a
container with a fixed `aspect-ratio` (see `.oz-card__media`). Never render
an `<img>` without dimensions or a sized wrapper.
