import fs from 'node:fs/promises';
import { readJson, slugify, writeJson } from './lib.mjs';

const payload = JSON.parse(await fs.readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
const issue = payload.issue;
if (!issue) throw new Error('No issue payload found.');
const body = String(issue.body || '');
const match = body.match(/<!--\s*LIZ_REVIEW_JSON_START\s*-->[\s\S]*?```json\s*([\s\S]*?)\s*```[\s\S]*?<!--\s*LIZ_REVIEW_JSON_END\s*-->/i);
if (!match) throw new Error('No Liz review JSON block found in the issue body.');
let review;
try { review = JSON.parse(match[1]); }
catch (error) { throw new Error(`Invalid review JSON: ${error.message}`); }

for (const key of ['conversationId','messageId','status']) {
  if (!review[key]) throw new Error(`Review field ${key} is required.`);
}
review.issueNumber = issue.number;
review.issueUrl = issue.html_url;
review.reviewedBy = issue.user?.login || 'unknown';
review.receivedAt = new Date().toISOString();

const filename = `review-${issue.number}-${slugify(review.conversationId)}-${slugify(review.messageId)}.json`;
const reviewPath = `data/reviews/${filename}`;
await writeJson(reviewPath, review);
const index = await readJson('data/reviews/index.json', []);
index.unshift({
  issueNumber: issue.number,
  conversationId: review.conversationId,
  messageId: review.messageId,
  status: review.status,
  labels: review.labels || [],
  reviewedBy: review.reviewedBy,
  receivedAt: review.receivedAt,
  path: `./${reviewPath}`
});
await writeJson('data/reviews/index.json', index.slice(0, 500));

if (String(review.suggestedRewrite || '').trim()) {
  const example = {
    id: `issue-${issue.number}-${slugify(review.conversationId)}-${slugify(review.messageId)}`,
    sourceConversationId: review.conversationId,
    sourceMessageId: review.messageId,
    originalText: review.originalText || '',
    labels: review.labels || [],
    reason: review.reason || '',
    approvedRewrite: String(review.suggestedRewrite).trim(),
    speakerProfile: review.speakerProfile || null,
    recipientProfile: review.recipientProfile || null,
    adaptationMode: review.adaptationMode || 'common_ground',
    status: 'candidate',
    reviewedBy: review.reviewedBy,
    sourceIssue: issue.html_url,
    createdAt: review.receivedAt
  };
  await writeJson(`data/approved-examples/${example.id}.json`, example);
}
console.log(JSON.stringify({ reviewPath, issue: issue.number }, null, 2));
