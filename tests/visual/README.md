# Visual regression baselines

CI screenshots each key page (see `PAGES` in `scripts/visual-check.mjs`) at
1280×900 and compares it against the PNG committed under `baseline/`. A run
fails if more than `VISUAL_MAX_DIFF_RATIO` of pixels changed — this catches
visible layout shifts (fonts loading late, images resizing, containers
reflowing) that don't always push the numeric Lighthouse CLS above threshold.

## Commands

```bash
bun run visual           # compare current preview against baselines
bun run visual:update    # regenerate baselines after intentional UI changes
```

The dev server (or `bun run preview` after `bun run build`) must be running
at `http://localhost:8080` — override with `BASE_URL=...`.

## When a PR fails visual check

1. Download the `perf-reports-*` artifact from the failing GitHub Actions run.
2. Open `visual/diff/<page>.png` — red pixels mark where the page moved.
3. If the change is intentional, run `bun run visual:update` locally and
   commit the updated files under `tests/visual/baseline/`.
4. If not, fix the layout shift (usually a missing `width`/`height`, missing
   `aspect-ratio`, or a font swap without `size-adjust`).

## Temporarily relaxing thresholds

Apply the `perf-relax` label to a PR. Lighthouse and visual thresholds
loosen for that PR only; reports still upload so regressions stay visible.
Remove the label before merging non-emergency work.
