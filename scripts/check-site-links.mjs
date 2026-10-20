import fs from 'node:fs';
import path from 'node:path';

const root = 'site';
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filename = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) walk(filename);
    else if (entry.isFile()) files.push(filename);
  }
}
walk(root);
const known = new Set(files);
const pages = new Map(files.filter(p => p.endsWith('.html')).map(p => [p, fs.readFileSync(p, 'utf8')]));
const ids = new Map([...pages].map(([p, html]) => [p, [...html.matchAll(/\\bid\\s*=\\s*["']([^"']+)["']/g)].map(m => m[1])]));
const errors = [];
let checked = 0;
for (const [page, html] of pages) {
  const ownIds = ids.get(page);
  for (const id of new Set(ownIds)) if (ownIds.filter(x => x === id).length > 1) errors.push(page + ': duplicate id #' + id);
  for (const [, raw] of html.matchAll(/\\b(?:href|src)\\s*=\\s*["']([^"']+)["']/gi)) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\\/\\/)/i.test(raw)) continue;
    const [withoutFragment, fragment] = raw.split('#');
    const relative = withoutFragment.split('?')[0];
    if (!relative && !fragment) continue;
    let target;
    if (relative.startsWith('/ai-learning-platform/')) target = path.posix.join(root, relative.slice('/ai-learning-platform/'.length));
    else if (relative === '/ai-learning-platform') target = 'site/index.html';
    else if (relative.startsWith('/')) { errors.push(page + ': unexpected root URL ' + raw); continue; }
    else target = relative ? path.posix.normalize(path.posix.join(path.posix.dirname(page), relative)) : page;
    if (relative.endsWith('/') || (known.has(target + '/index.html') && !known.has(target))) target = path.posix.join(target, 'index.html');
    checked++;
    if (!known.has(target)) { errors.push(page + ': missing ' + raw + ' -> ' + target); continue; }
    if (fragment && target.endsWith('.html') && pages.has(target) && !ids.get(target).includes(decodeURIComponent(fragment))) {
      errors.push(page + ': missing anchor ' + raw);
    }
  }
}
if (errors.length) {
  console.error(errors.join('\\n'));
  process.exitCode = 1;
} else {
  console.log('Site link audit passed: ' + pages.size + ' HTML pages, ' + checked + ' internal references.');
}
