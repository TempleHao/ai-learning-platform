import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root='site';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const pages=walk(root).filter(file=>file.endsWith('.html'));
const mark=fs.readFileSync('site/assets/brand/logo-mark.svg','utf8');
const icon=fs.readFileSync('site/assets/brand/app-icon.svg','utf8');
const artwork=fs.readFileSync('site/assets/brand/logo-scheme1.webp');
const css=fs.readFileSync('site/assets/styles.css','utf8');
const home=fs.readFileSync('site/index.html','utf8');
assert.equal(icon,mark,'Favicon must use the identical transparent ribbon mark');
assert.match(mark,/viewBox="0 0 990 864"/);
assert.match(mark,/id="bridge"/);
assert.match(mark,/id="face"/);
assert.match(mark,/id="right-base"/);
assert.doesNotMatch(mark,/<rect|fill="#0B1428"|fill="#0b1428"/,'No dark tile is allowed in the SVG artwork');
assert.equal(artwork.toString('ascii',0,4),'RIFF','Reference artwork must be a WebP');
assert.equal(artwork.toString('ascii',8,12),'WEBP');
assert.ok(artwork.length>4000,'Transparent reference artwork is unexpectedly small');
assert.ok((artwork[20]&0x10)!==0,'Reference WebP must contain alpha transparency');
assert.match(home,/class="hero-brand-lockup"/);
assert.match(home,/LEARN TODAY\. BUILD TOMORROW\./);
assert.match(home,/logo-scheme1\.webp/);
assert.match(css,/\.global-corner-logo\{display:none!important\}/);
assert.match(css,/\.hero-brand-lockup img/);
let visiblyBranded=0;
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 assert.match(html,/<link[^>]+rel="icon"[^>]+app-icon\.svg/,'Transparent favicon missing: '+file);
 assert.match(html,/styles\.css\?rev=20261024b/,'Current brand stylesheet missing: '+file);
 assert.doesNotMatch(html,/favicon-64\.png|logo-header\.webp/,'Legacy brand references: '+file);
 assert.doesNotMatch(html,/<img[^>]+src="[^"]*\/(?:app-icon\.svg|logo-mark\.svg)"/,'Old visible logo: '+file);
 if(!file.endsWith('/labs.html')){
   assert.match(html,/<img[^>]+src="[^"]*\/assets\/brand\/logo-scheme1\.webp"/,'Original transparent brand art missing: '+file);
   visiblyBranded++;
 }
 if(html.includes('class="chapter-brand"'))
   assert.match(html,/class="chapter-brand"[^>]*><img[^>]+logo-scheme1\.webp/,'Chapter navigation artwork missing: '+file);
}
for(const file of ['site/assets/app.js','site/assets/chapter.js','site/assets/brand.js']){
 const js=fs.readFileSync(file,'utf8');
 assert.doesNotMatch(js,/ensureGlobalCornerLogo|appendChild\(a\).*corner|app-icon\.svg/,'Old injected black badge: '+file);
}
assert.equal(pages.length,32,'Site page count changed unexpectedly');
assert.equal(visiblyBranded,31,'Unexpected number of branded views');
console.log('Scheme 1 faithful branding passed: '+pages.length+' pages, transparent reference artwork, no dark tiles, typography and cache refresh.');
