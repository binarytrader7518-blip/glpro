// IndexNow submitter for eng-glpro.vercel.app
// Usage after each deploy:  node scripts/indexnow.mjs            (submits only new/changed sitemap URLs)
//                           node scripts/indexnow.mjs --all      (submits every sitemap URL)
// Reads the LIVE sitemap, hashes each page's HTML, and submits only URLs whose content changed
// since the last run (state kept in .indexnow-state.json). Deleted URLs (in state but gone from
// the sitemap) are submitted too, so search engines re-crawl and see the 404.
import fs from 'node:fs'; import crypto from 'node:crypto';
const HOST = 'eng-glpro.vercel.app';
const ORIGIN = `https://${HOST}`;
const KEY = fs.readFileSync(new URL('../key.txt', import.meta.url), 'utf8').trim();
const KEY_LOCATION = `${ORIGIN}/key.txt`;
const STATE = new URL('../.indexnow-state.json', import.meta.url);
const all = process.argv.includes('--all');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function get(url) { const r = await fetch(url, { redirect: 'manual' }); return { status: r.status, text: await r.text() }; }

const key = await get(KEY_LOCATION);
if (key.status !== 200 || key.text.trim() !== KEY) { console.error(`Key file check failed (${key.status}). Deploy key.txt first.`); process.exit(1); }
console.log('Key file verified:', KEY_LOCATION);

const sm = await get(`${ORIGIN}/sitemap.xml`);
const urls = [...sm.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]).filter(u => u.startsWith(ORIGIN));
let state = {}; try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch {}
const next = {}; const changed = [];
for (const u of urls) {
  const r = await get(u);
  if (r.status !== 200) { console.warn('Skipping (status', r.status, '):', u); continue; }
  if (/<meta name="robots" content="noindex/i.test(r.text)) { console.warn('Skipping noindex:', u); continue; }
  const h = crypto.createHash('sha256').update(r.text).digest('hex');
  next[u] = h; if (all || state[u] !== h) changed.push(u);
}
for (const u of Object.keys(state)) if (!(u in next)) changed.push(u); // deleted pages
if (!changed.length) { console.log('Nothing changed; no submission sent.'); process.exit(0); }

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: changed });
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body });
    console.log(`IndexNow response: HTTP ${r.status} for ${changed.length} URL(s)`);
    if (r.status === 200 || r.status === 202) { fs.writeFileSync(STATE, JSON.stringify(next, null, 2)); console.log('Accepted (received, not a guarantee of indexing).'); process.exit(0); }
    if (r.status === 400 || r.status === 403 || r.status === 422) { console.error('Rejected; check key/host/URLs.', await r.text()); process.exit(1); }
  } catch (e) { console.warn('Request error:', e.message); }
  await sleep(2000 * attempt);
}
console.error('IndexNow submission failed after 3 attempts.'); process.exit(1);
