# BeNice — GitHub Pages management proof of concept

This repository is a static, installable PWA for presenting the BeNice / Insights communication-translator concept. It runs entirely in the browser with a deterministic demonstration engine and 50 fictional CSV personas.

## Publish

Read `GITHUB-PAGES-SETUP.md`.

The repository root must directly contain `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `service-worker.js`, `.nojekyll`, `data/` and `icons/`.

## What this version demonstrates

- GitHub Pages-ready static deployment with no build step
- Installable desktop and mobile PWA
- English, Dutch, French and German interface and replies
- Sender and recipient selection from 50 fictional CSV profiles
- Full four-colour profile mix rather than a single label
- Dominant and secondary colour-energy reasoning
- Professional common-ground calculation between two styles
- Profile-aware message composition:
  - Cool Blue: information, evidence, exact scope and useful sources
  - Fiery Red: decision, action, ownership and deadline
  - Sunshine Yellow: involvement, possibilities and input
  - Earth Green: alignment, support and team impact
- “Improve before sending” advice, including documentation/URL prompts for Cool Blue profiles
- Sensitive-topic meeting recommendation and written fallback
- Local coach/routing demonstration
- CSV import, download and reset
- Screenshot preview without upload
- Offline application shell after first load

## Boundaries

- The rewrite engine is rule-based and deliberately not AI.
- Screenshot text is not interpreted.
- All bundled people are fictional.
- Imported CSV data is stored in the current browser’s local storage.
- There is no backend, analytics, SharePoint, Azure, Teams or external AI connection.
- This is communication guidance, not a psychometric assessment.

## Public-repository warning

Do not add real employee profiles, private screenshots or confidential messages to this public repository. Use fictional or specifically approved data only.

## Validation

```bash
node tests/validate.mjs
```
