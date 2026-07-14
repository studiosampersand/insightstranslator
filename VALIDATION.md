# Validation report · v0.8.0

Validated on 14 July 2026.

## Passed

- `app.js` passes `node --check`.
- Required GitHub Pages and PWA files are present.
- CSV contains exactly 50 fictional personas.
- Every profile totals 100%.
- Every profile has one dominant energy above 50%.
- Desktop browser smoke test completed without console or page errors.
- Project-delay input produced a transformed reply that preserved `project` and `vrijdag`.
- Profile meter widths rendered visibly and proportionally; the first test profile rendered approximately 62%, 18%, 8% and 12%.
- Desktop page had no horizontal overflow at 1440 px.
- Mobile page had no horizontal overflow at 390 px.
- Sunshine Yellow test added a personal opener and invitation to contribute.
- Sensitive-conflict test displayed a direct-conversation recommendation.
- Service-worker cache version is `insightstranslator-v0.8.0`, which removes previous caches on activation.

## Prototype limitations

- Screenshot is preview-only; no OCR is claimed.
- The rewrite engine is deterministic and browser-based. It is substantially more contextual than canned templates, but the future internal agent remains necessary for unrestricted natural-language quality.
- Teams and email buttons in the public demo open generic Microsoft entry points because employee identifiers are intentionally not published.
