import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root='site';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const html=walk(root).filter(file=>file.endsWith('.html'));
const mark=fs.readFileSync('site/assets/brand/logo-mark.svg','utf8');
const icon=fs.readFileSync('site/assets/brand/app-icon.svg','utf8');
assert.match(mark,/viewBox="0 0 256 256"/);
for(const id of ['left','right','fold'])assert.ok(mark.includes('id="'+id+'"'),'Missing SVG gradient '+id);
assert.match(icon,/<rect[^>]+fill="#0B1428"/);
for(const file of html){
  const source=fs.readFileSync(file,'utf8');
  assert.match(source,/<link[^>]+rel="icon"[^>]+app-icon\.svg/,'Missing Scheme 1 favicon: '+file);
  assert.doesNotMatch(source,/favicon-64\.png|logo-header\.webp/,'Old brand image: '+file);
  if(source.includes('class="chapter-brand"'))
    assert.match(source,/class="chapter-brand"[^>]*><img[^>]+logo-mark\.svg/,'Chapter icon missing: '+file);
}
const siteFiles=walk(root).filter(file=>/\.(html|css|js)$/.test(file));
for(const file of siteFiles){
 const source=fs.readFileSync(file,'utf8');
 assert.doesNotMatch(source,/favicon-64\.png|logo-header\.webp/,'Stale brand reference: '+file);
}
assert.match(fs.readFileSync('site/assets/styles.css','utf8'),/--accent:#79dfff/);
console.log('Scheme 1 branding OK: '+html.length+' HTML pages, unified mark and favicon.');
