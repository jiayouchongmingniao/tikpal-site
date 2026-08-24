// Validate home/common i18n JSON files: schema parity, valid JSON, brand/URL preservation.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', 'src', 'content');
const LANGS = ['en', 'zh', 'ja', 'ko', 'de', 'es', 'it'];
const errors = [];

function load(group) {
  const out = {};
  for (const lang of LANGS) {
    const p = join(root, group, 'i18n', `${lang}.json`);
    try {
      out[lang] = JSON.parse(readFileSync(p, 'utf8'));
    } catch (e) {
      errors.push(`[${group}/${lang}] invalid JSON: ${e.message}`);
    }
  }
  return out;
}

function schemaOf(value, path = '') {
  if (Array.isArray(value)) return `[${path}]array:${value.length}(${value.map((v, i) => schemaOf(v, `${path}[${i}]`)).join('|')})`;
  if (value !== null && typeof value === 'object')
    return `{${Object.keys(value).sort().map((k) => `${k}:${schemaOf(value[k], path ? `${path}.${k}` : k)}`).join(',')}}`;
  return typeof value;
}

function collectKeys(value, path = '', acc = []) {
  if (Array.isArray(value)) {
    value.forEach((v, i) => collectKeys(v, `${path}[${i}]`, acc));
    return acc;
  }
  if (value !== null && typeof value === 'object') {
    for (const k of Object.keys(value)) collectKeys(value[k], path ? `${path}.${k}` : k, acc);
    return acc;
  }
  acc.push(path);
  return acc;
}

// Values that must stay untranslated (identical across languages)
const URL_RE = /https?:\/\/\S+/g;
const BRAND_TERMS = ['Tikpal', '$129', 'IP65', 'AMOLED', 'Notion', 'Xmind', 'Forest Green', 'Desktop System', 'Reference System', 'Bass Extended System', 'Kickstarter', 'Discord', 'KEF LSX II', 'Plaud'];

function checkPreservation(group, data) {
  const en = data.en;
  if (!en) return;
  const enKeys = collectKeys(en);
  for (const lang of LANGS.slice(1)) {
    const other = data[lang];
    if (!other) continue;
    for (const key of enKeys) {
      const get = (obj, p) => p.split(/\.|\[|\]/).filter(Boolean).reduce((o, k) => (o == null ? undefined : o[k]), obj);
      const enVal = get(en, key);
      const trVal = get(other, key);
      if (typeof enVal !== 'string') continue;
      if (key.endsWith('href') || key.endsWith('src')) {
        if (trVal !== enVal) errors.push(`[${group}/${lang}] ${key} changed: ${trVal}`);
      }
      const urls = enVal.match(URL_RE);
      if (urls && typeof trVal === 'string') {
        for (const u of urls) if (!trVal.includes(u)) errors.push(`[${group}/${lang}] ${key} missing URL ${u}`);
      }
      for (const term of BRAND_TERMS) {
        if (enVal.includes(term) && typeof trVal === 'string' && !trVal.includes(term)) {
          errors.push(`[${group}/${lang}] ${key} brand term translated/lost: "${term}"`);
        }
      }
    }
  }
}

const GROUPS = [
  'home', 'common', 'room', 'app', 'privacy', 'terms', 'about', 'support', 'faq', 'voice', 'compare',
  'ai-note-taker', 'ai-memory', 'voice-recorder-for-ideas', 'voice-to-task', 'voice-to-email',
  'voice-to-calendar', 'plaud-alternative', 'compare-ai-voice-recorders', 'use-cases-creators',
];

for (const group of GROUPS) {
  const data = load(group);
  const enSchema = data.en ? schemaOf(data.en) : null;
  for (const lang of LANGS.slice(1)) {
    if (!data[lang] || !enSchema) continue;
    const s = schemaOf(data[lang]);
    if (s !== enSchema) {
      const enKeys = new Set(collectKeys(data.en));
      const trKeys = new Set(collectKeys(data[lang]));
      const missing = [...enKeys].filter((k) => !trKeys.has(k));
      const extra = [...trKeys].filter((k) => !enKeys.has(k));
      errors.push(`[${group}/${lang}] schema mismatch. missing: ${missing.join(', ') || '—'}; extra: ${extra.join(', ') || '—'}`);
    }
  }
  checkPreservation(group, data);
}

if (errors.length) {
  console.error(`FAIL: ${errors.length} issue(s)`);
  errors.forEach((e) => console.error('  - ' + e));
  process.exit(1);
}
console.log(`OK: ${GROUPS.length} groups × ${LANGS.length} langs — schema parity & URL/asset/brand preservation verified.`);
