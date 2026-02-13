# Release Checklist

## 1) Functional Validation
- Run `npm ci`.
- Run `ASTRO_TELEMETRY_DISABLED=1 npm run check`.
- Run `npm run check:content`.
- Run `ASTRO_TELEMETRY_DISABLED=1 npm run build`.
- Run `npm run preview` and verify key pages load:
  - `/`
  - `/modules`
  - `/modules/debugging-css-specificity`
  - `/modules/css-grid-vs-flexbox`
  - `/modules/html-accessibility-wcag`

## 2) Accessibility Spot Checks
- Keyboard-only navigation from header through module content.
- Skip link visible and functional on focus.
- Focus indicators visible on links, form controls, and buttons.
- Progressbar updates after marking module complete/incomplete.
- Demo controls announce feedback text where applicable.

## 3) Responsive & Visual Checks
- Verify layout at `320px`, `768px`, and desktop widths.
- Confirm card grids wrap cleanly and text does not overflow.
- Validate all module visual assets load and include alt text.
- Verify no overlapping controls in interactive demos.

## 4) Content Consistency
- Confirm all 14 modules are `status: complete`.
- Confirm each module includes:
  - core explanation
  - code examples
  - note section (implementation/tooling/incident)
  - case study
  - visual asset

## 5) Deployment Readiness
- Netlify: uses `netlify.toml` with `dist` publish directory.
- Vercel: uses `vercel.json` with static `dist` output.
- CI workflow passes on main branch before deployment.
