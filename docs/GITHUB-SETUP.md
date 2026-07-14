# GitHub setup — step by step

## 1. Upload the repository

Extract the ZIP and upload the **contents** to the root of the existing `insightstranslator` repository. The root must contain `index.html`, `teach.html`, `app.js`, `.github/`, `scripts/`, `prompts/` and `data/`.

## 2. Enable GitHub Pages through Actions

Open:

`Repository → Settings → Pages → Build and deployment → Source → GitHub Actions`

The workflow `.github/workflows/deploy-pages.yml` publishes only the browser application and synthetic conversation files. Prompts, reviews and internal workflow code are not copied into the Pages artifact.

## 3. Enable GitHub Models

Open:

`Repository → Settings → Models → Models in this repository → Enabled`

For an organization-owned repository, an organization or enterprise owner may also need to permit GitHub Models and the selected publisher/model.

## 4. Give Actions the required permissions

Open:

`Repository → Settings → Actions → General → Workflow permissions`

Select:

- **Read and write permissions**
- **Allow GitHub Actions to create and approve pull requests**

The workflows still declare the smallest job-level permissions they need.

## 5. Create the labels

Open:

`Actions → Set up Liz repository labels → Run workflow`

This creates:

- `liz-review`
- `needs-rewrite`
- `approved-example`

## 6. Generate a synthetic conversation

Open:

`Actions → Generate Liz conversation → Run workflow`

Choose:

- scenario;
- persona IDs from `data/personas.csv`;
- number of messages;
- language;
- tension;
- optional objective;
- model ID.

The workflow calls GitHub Models once per turn, stores the conversation as JSON, updates `data/conversations/index.json`, and opens a pull request. Review the conversation before merging.

After merge, the Pages deployment runs automatically and the conversation appears in **Teach Liz**.

## 7. Review a message

Open the published site and choose **Teach Liz**.

1. Select a conversation.
2. Select a message.
3. Mark it as good, not okay, or requiring a rewrite.
4. Add flags such as attacking or passive-aggressive.
5. Explain why.
6. Enter a better professional formulation.
7. Click **Submit as GitHub issue**.
8. Confirm and submit the prefilled issue on GitHub.

## 8. Convert the review into dataset files

The issue receives the `liz-review` label. The workflow `.github/workflows/process-review.yml`:

1. reads the JSON block from the issue;
2. creates a structured review file;
3. creates a candidate approved example when a rewrite was supplied;
4. opens a pull request;
5. posts the pull-request link back to the issue.

Review the pull request manually. Merging it accepts the example into the repository dataset.

## 9. Evaluate candidate examples

Open:

`Actions → Evaluate Liz examples → Run workflow`

The workflow uses GitHub Models as a judge and scores up to the selected number of candidate examples. The report is available as the `liz-evaluation-report` workflow artifact.

A model score is supporting evidence only. Human approval remains authoritative.

## 10. Tune Liz

Edit these files through reviewed pull requests:

- `prompts/agent-core.md` — how synthetic participants behave;
- `prompts/energy-guidance.json` — colour-energy communication needs and risks;
- `prompts/rewrite-system.md` — future rewrite-agent contract;
- `data/scenarios.json` — realistic but fictional scenarios;
- `data/approved-examples/` — human-corrected examples.

Do not automatically rewrite prompts after one review. Look for repeated patterns across multiple examples.

## Daily workflow

1. Generate 3–5 synthetic conversations.
2. Merge only useful conversations.
3. Review 10–20 individual comments in Teach Liz.
4. Submit reviews as issues.
5. Review and merge the generated dataset PRs.
6. Once a week, evaluate the candidate examples and update prompts deliberately.
