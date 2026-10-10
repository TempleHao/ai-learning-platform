import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve('site');
const errors = [];
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p); else files.push(p);
  }
}
walk(root);
for (const file of files) {
  const ext = path.extname(file);
  if (!['.html', '.js', '.json', '.css'].includes(ext)) continue;
  const body = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  if (ext === '.js') {
    try { execFileSync('node', ['--check', file], { stdio: 'pipe' }); }
    catch { errors.push(rel + ': JavaScript syntax error'); }
  }
  if (ext === '.json') {
    try { JSON.parse(body); } catch (e) { errors.push(rel + ': JSON ' + e.message); }
  }
  if (ext === '.css') {
    const opens = (body.match(/\{/g) || []).length;
    const closes = (body.match(/\}/g) || []).length;
    if (opens !== closes) errors.push(rel + ': CSS brace imbalance');
  }
  if (ext !== '.html') continue;
  for (const tag of ['section', 'article', 'nav', 'main']) {
    const opens = (body.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
    const closes = (body.match(new RegExp('</' + tag + '\\s*>', 'g')) || []).length;
    if (opens !== closes) errors.push(rel + ': unmatched <' + tag + '> ' + opens + '/' + closes);
  }
  for (const match of body.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:[a-z]+:|\/\/|#)/i.test(url)) continue;
    const clean = url.split(/[?#]/)[0];
    if (!clean || clean.includes('${')) continue;
    const target = clean.startsWith('/ai-learning-platform/')
      ? path.join(root, clean.slice('/ai-learning-platform/'.length))
      : path.resolve(path.dirname(file), clean);
    const resolved = fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
    if (!resolved.startsWith(root + path.sep) && resolved !== root) {
      errors.push(rel + ': link escapes site ' + url);
    } else if (!fs.existsSync(resolved)) {
      errors.push(rel + ': missing local target ' + url);
    }
  }
}
if (errors.length) {
  console.error('Site validation failed (' + errors.length + '):\n' + errors.join('\n'));
  process.exitCode = 1;
} else console.log('Site validation passed: ' + files.length + ' files scanned.');
