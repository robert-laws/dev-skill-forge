# Deployment Guide

## Prerequisites
- Node.js 20+
- npm 10+

## Validate Before Deploy
1. `npm ci`
2. `ASTRO_TELEMETRY_DISABLED=1 npm run check`
3. `npm run check:content`
4. `ASTRO_TELEMETRY_DISABLED=1 npm run build`
5. Optional local preview: `npm run preview`

## Deploy to Netlify
- `netlify.toml` is already configured.
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

## Deploy to Vercel
- `vercel.json` is already configured.
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

## Deploy to GitHub Pages
- Workflow file: `.github/workflows/deploy.yml`
- Trigger: push to `main` (or manual run via workflow dispatch)
- Build uses:
  - `GITHUB_PAGES=true`
  - repo-aware Astro `base` path from `GITHUB_REPOSITORY`
- Deployment target: `actions/deploy-pages`

### Required GitHub repository settings
1. Open repository `Settings`.
2. Open `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Ensure default branch is the one you push (`main` in workflow).

## CI
- GitHub Actions workflow at `.github/workflows/ci.yml` runs:
  - `npm run check`
  - `npm run check:content`
  - `npm run build`

## Post-Deploy Smoke Test
- Verify routes:
  - `/`
  - `/modules`
  - `/modules/debugging-css-specificity`
  - `/modules/css-grid-vs-flexbox`
  - `/modules/html-accessibility-wcag`
- Verify module completion state toggles still work in browser localStorage.
- Verify demo interactivity and keyboard navigation.
