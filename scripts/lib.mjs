import fs from 'node:fs/promises';
import path from 'node:path';

export const ENERGY_KEYS = ['cool_blue','fiery_red','sunshine_yellow','earth_green'];

export function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (c === '"' && quoted && next === '"') { cell += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((c === '\n' || c === '\r') && !quoted) {
      if (c === '\r' && next === '\n') i++;
      row.push(cell);
      if (row.some(v => v.trim())) rows.push(row);
      row = []; cell = '';
    } else cell += c;
  }
  row.push(cell);
  if (row.some(v => v.trim())) rows.push(row);
  return rows;
}

export async function loadPersonas(file = 'data/personas.csv') {
  const text = await fs.readFile(file, 'utf8');
  const raw = parseCsv(text.trim());
  const headers = raw.shift().map(v => v.trim());
  return raw.map(values => Object.fromEntries(headers.map((h, i) => [h, (values[i] || '').trim()])))
    .filter(row => row.id && row.name)
    .map(row => {
      for (const key of ENERGY_KEYS) row[key] = Number(row[key]);
      return row;
    });
}

export function dominantEnergy(persona) {
  return [...ENERGY_KEYS].sort((a, b) => persona[b] - persona[a])[0];
}

export function slugify(value) {
  return String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70) || 'conversation';
}

export function cleanModelText(value) {
  return String(value || '').trim().replace(/^```(?:text|markdown)?\s*/i, '').replace(/\s*```$/, '').replace(/^['"]|['"]$/g, '').trim();
}

export async function readJson(file, fallback) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch { return fallback; }
}

export async function writeJson(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2) + '\n', 'utf8');
}
