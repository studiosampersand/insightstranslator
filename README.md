# InsightTranslator / BeNice · Teach Liz v0.9.0

This repository combines:

1. **GitHub Pages** — the public proof-of-concept interface.
2. **GitHub Actions** — conversation generation, review processing and evaluation.
3. **GitHub Models** — turn-by-turn synthetic workplace conversations.
4. **GitHub Issues** — human review submissions from the Teach Liz page.
5. **Pull requests** — controlled approval before generated conversations or review records enter the dataset.

## Important boundary

This GitHub proof of concept is only for fictional personas and synthetic workplace scenarios. Do not add real employee profiles, real HR information, real Teams messages, confidential project data or private communication to a public repository or public GitHub Pages site.

The instant **Rewrite** screen still uses the local alpha rule engine. GitHub Pages cannot safely contain a GitHub token, so it cannot call GitHub Models directly from the browser. Teach Liz uses GitHub Models through GitHub Actions instead.

## Start here

Read [`docs/GITHUB-SETUP.md`](docs/GITHUB-SETUP.md).
