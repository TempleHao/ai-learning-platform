import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('site/chapters/03-capabilities-applications.html', 'utf8');
const notes = readFileSync('docs/chapters/03-capabilities-applications.md', 'utf8');
const source = readFileSync('site/assets/capability-economics.js', 'utf8');
const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');
for (const id of ['ladder','business','lab','check']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1);
  assert.ok(html.includes('href="#' + id + '"'));
}
for (const id of ['capAutoRate','capErrorRate','capAutoRateValue','capErrorRateValue','capBaselineCost','capAICost','capNetSavings','capCostExplanation']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'duplicate/missing ' + id);
}
for (const s of ['6.75%','10,600 元','14,600 元','Q5：','Q6：','自我确认','data-chapter="03"','data-lab="03"','04-application-expert.html','../assets/chapter.js','../assets/capability-economics.js']) assert.ok(html.includes(s), 'missing HTML concept ' + s);
for (const s of ['6.75%','12,100 元','分类导航','不自动判分']) assert.ok(notes.includes(s), 'notes mismatch ' + s);
assert.ok(workflow.includes('node scripts/test-core03-economics.mjs'));
assert.ok(!/localStorage|sessionStorage|document\\.cookie/.test(source), 'calculator must not touch saved progress');
for (const tag of ['section','article','nav','main','details']) {
  const opens=(html.match(new RegExp('<'+tag+'(?=\\s|>)','g'))||[]).length;
  const closes=(html.match(new RegExp('</'+tag+'\\s*>','g'))||[]).length;
  assert.equal(opens,closes,'unbalanced '+tag);
}
const ids = new Map();
function el(id) {
  if (!ids.has(id)) ids.set(id,{value:id==='capAutoRate'?'80':'5',textContent:'',handlers:{},addEventListener(type,handler){this.handlers[type]=handler;}});
  return ids.get(id);
}
vm.runInNewContext(source,{document:{getElementById:el}},{filename:'capability-economics.js'});
assert.match(el('capAICost').textContent,/10,600/);
assert.match(el('capNetSavings').textContent,/\+1,400/);
el('capErrorRate').value='10';el('capErrorRate').handlers.input();
assert.match(el('capAICost').textContent,/14,600/);
assert.match(el('capNetSavings').textContent,/2,600/);
el('capErrorRate').value='5';el('capAutoRate').value='50';el('capAutoRate').handlers.input();
assert.match(el('capAICost').textContent,/12,100/);
assert.match(el('capNetSavings').textContent,/100/);
el('capAutoRate').value='80';el('capErrorRate').value='0';el('capErrorRate').handlers.input();
assert.match(el('capAICost').textContent,/6,600/);
assert.match(el('capNetSavings').textContent,/5,400/);
console.log('Core 03: unit economics, DOM scenarios, content sync, progress isolation passed.');
