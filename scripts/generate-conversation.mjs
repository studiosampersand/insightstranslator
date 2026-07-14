import fs from 'node:fs/promises';
import { callGitHubModel } from './github-models.mjs';
import { cleanModelText, dominantEnergy, loadPersonas, readJson, slugify, writeJson } from './lib.mjs';

const env = process.env;
const model = env.MODEL || 'openai/gpt-4.1';
const language = env.LANGUAGE || 'nl';
const tension = env.TENSION || 'normaal';
const turns = Math.max(4, Math.min(16, Number(env.TURNS || 8)));
const scenarioId = env.SCENARIO_ID || 'project-delay';
const participantIds = String(env.PARTICIPANT_IDS || 'P014,P003,P039').split(',').map(v => v.trim()).filter(Boolean);
const titleOverride = String(env.TITLE || '').trim();
const objectiveOverride = String(env.OBJECTIVE || '').trim();

const [personas, scenarios, corePrompt, guidance] = await Promise.all([
  loadPersonas(),
  readJson('data/scenarios.json', []),
  fs.readFile('prompts/agent-core.md', 'utf8'),
  readJson('prompts/energy-guidance.json', {})
]);

const participants = participantIds.map(id => personas.find(p => p.id === id)).filter(Boolean);
if (participants.length < 2) throw new Error('Choose at least two valid participant IDs from data/personas.csv.');
const scenario = scenarios.find(item => item.id === scenarioId) || scenarios[0];
if (!scenario) throw new Error('No scenario found in data/scenarios.json.');

const messages = [];
for (let turn = 1; turn <= turns; turn++) {
  const speaker = participants[(turn - 1) % participants.length];
  const dominant = dominantEnergy(speaker);
  const transcript = messages.length
    ? messages.map(m => `${m.speakerName}: ${m.text}`).join('\n')
    : '(nog geen berichten)';
  const system = `${corePrompt}\n\nParticipant:\n- Name: ${speaker.name}\n- Role: ${speaker.role}\n- Colour mix: Cool Blue ${speaker.cool_blue}%, Fiery Red ${speaker.fiery_red}%, Sunshine Yellow ${speaker.sunshine_yellow}%, Earth Green ${speaker.earth_green}%\n- Dominant energy: ${dominant}\n- Style needs: ${(guidance[dominant]?.needs || []).join(', ')}\n- Style risks to keep realistic but controlled: ${(guidance[dominant]?.risks || []).join(', ')}`;
  const user = `Language: ${language}\nTension: ${tension}\nScenario: ${scenario.description}\nObjective: ${objectiveOverride || scenario.defaultObjective}\n\nConversation so far:\n${transcript}\n\nWrite turn ${turn} as ${speaker.name}. Respond to what has actually been said.`;
  const raw = await callGitHubModel({
    token: env.GITHUB_TOKEN,
    model,
    messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
    temperature: tension === 'hoog' ? 0.9 : 0.72,
    maxTokens: 250
  });
  messages.push({
    id: `m${turn}`,
    turn,
    speakerId: speaker.id,
    speakerName: speaker.name,
    text: cleanModelText(raw)
  });
}

const now = new Date();
const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const id = `${stamp.toLowerCase()}-${slugify(titleOverride || scenario.title)}`;
const title = titleOverride || `${scenario.title} · ${participants.map(p => p.name.split(' ')[0]).join(', ')}`;
const publicParticipants = participants.map(p => ({
  id: p.id, name: p.name, role: p.role,
  cool_blue: p.cool_blue, fiery_red: p.fiery_red,
  sunshine_yellow: p.sunshine_yellow, earth_green: p.earth_green
}));
const conversation = {
  id, title, scenarioId: scenario.id, scenario: scenario.description,
  objective: objectiveOverride || scenario.defaultObjective,
  language, tension, generatedAt: now.toISOString(), generatedBy: 'github-models', model,
  participants: publicParticipants, messages
};
const file = `data/conversations/${id}.json`;
await writeJson(file, conversation);
const index = await readJson('data/conversations/index.json', []);
index.unshift({
  id, title, scenarioId: scenario.id, language, tension,
  generatedAt: now.toISOString(), messageCount: messages.length, path: `./${file}`
});
await writeJson('data/conversations/index.json', index.slice(0, 100));
console.log(JSON.stringify({ id, file, title, messages: messages.length }, null, 2));
