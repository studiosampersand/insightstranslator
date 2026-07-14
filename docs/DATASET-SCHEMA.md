# Dataset schema

## Conversation

Stored in `data/conversations/<id>.json`.

- `id`, `title`, `scenarioId`, `scenario`, `objective`
- `language`, `tension`, `generatedAt`, `model`
- `participants[]` with fictional colour-energy values
- `messages[]` with `id`, `turn`, `speakerId`, `speakerName`, `text`

## Review

Stored in `data/reviews/` after issue processing.

- conversation and message identifiers
- original text
- human status and labels
- reason
- suggested rewrite
- speaker profile
- adaptation mode
- source issue and reviewer

## Candidate approved example

Stored in `data/approved-examples/` when a human supplies a better rewrite.

Candidate examples remain subject to pull-request review. Their `status` begins as `candidate`.
