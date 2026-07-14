# BeNice / InsightsTranslator — GitHub Pages proof of concept v0.7.0

A static, installable PWA for a management demonstration. It professionally rewrites the user’s actual draft, preserves concrete names, dates, project details and URLs where possible, and adapts the structure and framing to fictional Insights colour-energy profiles.

## What the demo now does

- Rewrites the text the user actually entered; it does not merely return a fixed scenario sentence.
- Removes unnecessarily aggressive, blaming or vague wording.
- Turns pressure and rhetorical questions into actionable professional questions where possible.
- Preserves concrete facts such as names, versions, dates, teams, document references and URLs.
- Applies the complete sender/recipient colour mix with professional common ground as the default.
- Cool Blue: facts, structure, scope, evidence, documentation and URL suggestions.
- Fiery Red: decision, next action, owner and deadline.
- Sunshine Yellow: personal opener, involvement and room for ideas when appropriate.
- Earth Green: alignment, support, impact on people and implementation reassurance.
- Shows separate “Improve before sending” advice without inventing facts, links, support or consensus.
- Recommends a Teams call, phone call or physical meeting for sensitive or complex topics, while still providing a written fallback.
- Includes Ask Liv routing examples for HaloPSA, HR/wagenpark (Maarten), CRM, DMS, projects, privacy and confidential support.
- Uses 50 fictional personas with one colour energy above 50% in every profile.
- Runs fully in the browser with no backend, analytics or external AI service.

## Publish to GitHub Pages

Read `GITHUB-PAGES-SETUP.md`.

Upload the extracted contents of this package to the root of the `insightstranslator` repository. Do not upload the ZIP itself and do not add one extra enclosing folder.

The repository root must directly contain:

```text
index.html
app.js
styles.css
manifest.webmanifest
service-worker.js
.nojekyll
data/
icons/
docs/
```

## Important prototype boundaries

- The local rewrite engine is deterministic and rule-based; it is not the future internal AI agent.
- It demonstrates content-preserving rewriting but cannot understand every possible sentence as deeply as the internal agent will.
- Screenshot text is not interpreted in this public build.
- All bundled persona data is fictional.
- GitHub Pages is public: do not upload real employee profiles, private screenshots or confidential messages.
- Ask Liv’s Teams and email actions are generic in this public build because no real employee UPN or email address is embedded.
- The HaloPSA button opens `https://horizon.carya.tools/auth`.

## Validation

```bash
node tests/validate.mjs
```
