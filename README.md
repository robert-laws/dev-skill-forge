# Dev Skill Forge

Dev Skill Forge is a focused front-end learning site built around 14 real interview questions.

## Mission
Help learners build practical confidence in CSS systems, debugging workflows, accessibility, CMS customization, and professional engineering practices.

## Current Status
Step 1 through Step 5 are complete:
- Astro scaffold, routes, and all 14 module stubs are in place.
- Content schema now supports structured module data (workflow steps, key concepts, practice prompts, pitfalls, quiz, and reading links).
- Reusable module components are wired into the module layout.
- Progress tracking is live via localStorage with module completion toggles and progress summaries.
- Interactive demos are live for CSS specificity debugging, Grid vs Flexbox selection, and accessibility walkthrough checks.
- Quality pass completed: skip-link/main landmark improvements, reduced-motion handling, externalized/cached progress script, and a content consistency check script.
- Content deepening is complete: all 14 modules now include case studies, visual assets, and are marked `complete`.
- Release prep is complete: CI workflow, Netlify/Vercel deployment configs, robots policy, and a manual release checklist are in place.

## Tech Stack
- Astro
- MDX content collections
- Vanilla CSS and lightweight page-level interactivity

## Project Structure
- `src/pages/index.astro`: homepage
- `src/pages/modules/index.astro`: modules index
- `src/pages/modules/[slug].astro`: dynamic module route
- `src/content/config.ts`: module schema
- `src/content/modules/*.mdx`: 14 module entries
- `src/layouts/`: shared layouts
- `src/components/progress/`: progress tracker UI components
- `src/components/demos/`: interactive module demo components
- `src/styles/global.css`: global styles
- `docs/site-blueprint.md`: curriculum and implementation blueprint
- `docs/release-checklist.md`: final verification checklist before deployment
- `docs/deployment.md`: deployment and post-deploy smoke-test instructions

## Run Locally
1. `npm install`
2. `npm run dev`
3. Open the local Astro URL in your browser.

## Quality Checks
- `npm run check`
- `npm run check:content`
- `npm run build`

## Deployment
- Netlify config: `netlify.toml`
- Vercel config: `vercel.json`
- CI checks: `.github/workflows/ci.yml`
- GitHub Pages deploy workflow: `.github/workflows/deploy.yml`
- Deployment runbook: `docs/deployment.md`

## Next Step
Run the manual checks in `docs/release-checklist.md` and deploy to your chosen host.
