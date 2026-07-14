import fs from 'node:fs/promises';
import path from 'node:path';
import { callGitHubModel } from './github-models.mjs';
import { cleanModelText, writeJson } from './lib.mjs';

const dir = 'data/approved-examples';
const files = (await fs.readdir(dir)).filter(name => name.endsWith('.json')).slice(0, Number(process.env.MAX_CASES || 10));
const results = [];
for (const file of files) {
  const example = JSON.parse(await fs.readFile(path.join(dir, file), 'utf8'));
  const prompt = `Evaluate this human-corrected workplace rewrite. Return JSON only with integer scores 0-100 for meaningPreservation, professionalism, profileFit and nonAggression, plus a short note.\n\nOriginal: ${example.originalText}\nApproved rewrite: ${example.approvedRewrite}\nReason: ${example.reason}\nLabels: ${(example.labels || []).join(', ')}`;
  const raw = await callGitHubModel({
    token: process.env.GITHUB_TOKEN,
    model: process.env.MODEL || 'openai/gpt-4.1',
    messages: [
      { role: 'system', content: 'You are a strict communication-quality evaluator. Return valid JSON only. Do not include chain-of-thought.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.1,
    maxTokens: 300
  });
  const cleaned = cleanModelText(raw).replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  try { results.push({ exampleId: example.id, ...JSON.parse(cleaned) }); }
  catch { results.push({ exampleId: example.id, error: 'Model did not return valid JSON', raw: cleaned.slice(0, 500) }); }
}
const report = { generatedAt: new Date().toISOString(), model: process.env.MODEL || 'openai/gpt-4.1', count: results.length, results };
await writeJson('reports/latest-evaluation.json', report);
console.log(JSON.stringify(report, null, 2));
