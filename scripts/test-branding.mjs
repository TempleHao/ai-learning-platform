import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const walk = dir => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = walk('site').filter(file => file.endsWith('.html'));
const mark = fs.readFileSync('site/assets/brand/logo-scheme1.webp');
const corner = fs.readFileSync('site/assets/brand/corner-scheme1-v3.webp');
assert.deepEqual(corner, mark, 'Corner icon must match original Scheme 1 artwork exactly');

const assertPng = (file, width, height) => {
  const image = fs.readFileSync(file);
  assert.equal(image.subarray(0,8).toString('hex'), '89504e470d0a1a0a','PNG signature: '+file);
  assert.equal(image.readUInt32BE(16), width, 'PNG width: '+file);
  assert.equal(image.readUInt32BE(20), height, 'PNG height: '+file);
  return image;
};
const favicon = assertPng('site/assets/brand/favicon-scheme1-v3.png',64,64);
assert.ok(favicon.includes(Buffer.from('tRNS')),'Favicon must retain transparent background');
assertPng('site/assets/brand/apple-touch-scheme1-v3.png',180,180);

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /rel="icon"[^>]+favicon-scheme1-v3\.png/,'New PNG tab icon missing: '+file);
  assert.match(html, /rel="apple-touch-icon"[^>]+apple-touch-scheme1-v3\.png/,'iOS icon missing: '+file);
  assert.match(html, /corner-brand-v3\.js\?v=20261024c/,'Transparent corner script missing: '+file);
  assert.doesNotMatch(html, /<link[^>]+rel="icon"[^>]+app-icon\.svg/,'Outdated SVG favicon: '+file);
  assert.doesNotMatch(html, /favicon-64\.png|logo-header\.webp/,'Old legacy branding: '+file);
  if (!file.endsWith('/labs.html')) assert.match(html, /logo-scheme1\.webp/,'Main artwork missing: '+file);
}
assert.equal(pages.length, 32);
const css = fs.readFileSync('site/assets/styles.css','utf8');
assert.match(css,/\.corner-brand-v3\{/);
assert.match(css,/\.global-corner-logo\{display:none!important\}/);

const source = fs.readFileSync('site/assets/corner-brand-v3.js','utf8');
const old = {removed: false, remove(){this.removed = true}};
const nodes = [];
const body = {appendChild(element){nodes.push(element)}};
const doc = {
  readyState: 'complete',
  body,
  querySelectorAll(selector){return selector === '.global-corner-logo' ? [old] : []},
  querySelector(selector){return selector === '.corner-brand-v3' ? nodes.find(x=>x.className === 'corner-brand-v3') : null},
  createElement(tag){return {tag,children:[],setAttribute(key,value){this[key]=value},appendChild(child){this.children.push(child)}}},
};
vm.runInNewContext(source, {document:doc});
assert.equal(old.removed,true,'Old black/tiled corner must be removed');
assert.equal(nodes.length,1,'Exactly one corner link is added');
assert.equal(nodes[0].children[0].src, '/ai-learning-platform/assets/brand/corner-scheme1-v3.webp');
assert.equal(nodes[0].href,'/ai-learning-platform/');
vm.runInNewContext(source,{document:doc});
assert.equal(nodes.length,1,'Mount is idempotent');
for(const file of ['site/assets/app.js','site/assets/chapter.js','site/assets/brand.js']){
  const js = fs.readFileSync(file,'utf8');
  assert.doesNotMatch(js,/ensureGlobalCornerLogo|appendChild\(a\).*corner/,'Legacy corner injection still present: '+file);
}
console.log('Brand corner/favicons OK: '+pages.length+' pages, native PNG favicon, iOS icon and original transparent mark.');
