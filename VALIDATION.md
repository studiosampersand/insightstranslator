# Validation report

Validated on 2026-07-14.

## Passed

- JavaScript syntax check with Node.js
- All DOM IDs referenced by `app.js` exist in `index.html`
- All local HTML asset references exist
- CSV parser accepts the bundled file
- Exactly 50 fictional profiles are present
- Every profile’s four percentages total 100
- Common-ground, recipient-weighted, sender-weighted and neutral blends total 100
- Dominant-colour ranking and topic detection tests
- Dutch language-detection test
- English, Dutch, French and German message lines are included
- GitHub Pages root structure and `.nojekyll` are present
- No external JavaScript, font, API or analytics dependency
- No real employee data is included

Run the repeatable logic checks with:

```bash
node tests/validate.mjs
```
