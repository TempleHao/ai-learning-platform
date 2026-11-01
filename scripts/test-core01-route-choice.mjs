import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('site/chapters/01-history-routes.html', 'utf8');
const notes = readFileSync('docs/chapters/01-history-routes.md', 'utf8');
const source = readFileSync('site/assets/route-choice.js', 'utf8');
for (const id of ['question', 'decision', 'lab', 'check']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'missing/duplicate section ' + id);
  assert.ok(html.includes('href="#' + id + '"'), 'missing chapter TOC link ' + id);
}
for (const phrase of ['分类边界', '34,000 元', '38,000 元', 'C = 20 元', 'Q5：', 'Q6：', '教学假设']) {
  assert.ok(html.includes(phrase), 'missing lesson concept: ' + phrase);
}
for (const phrase of ['40L + 300C + 2,000', '20L + 500C + 8,000', 'C=20', '进度保护']) {
  assert.ok(notes.includes(phrase), 'source notes out of sync: ' + phrase);
}
for (const id of ['falseRejectCost', 'missedFraudLoss', 'routeCostResult', 'routeChoiceResult']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'missing/duplicate experiment control ' + id);
}
assert.ok(html.includes('data-chapter="01"') && html.includes('data-lab="01"'), 'progress keys changed');
assert.ok(html.includes('src="../assets/chapter.js"') && html.includes('src="../assets/route-choice.js"'), 'required scripts missing');
assert.ok(html.includes('02-how-models-learn.html'), 'next chapter link missing');
assert.ok(!/localStorage|sessionStorage|document\.cookie/.test(source), 'experiment must not modify learning data');
for (const tag of ['section', 'article', 'nav', 'main', 'details']) {
  const opens = (html.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
  const closes = (html.match(new RegExp('</' + tag + '\\s*>', 'g')) || []).length;
  assert.equal(opens, closes, 'unbalanced ' + tag);
}
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    value: id === 'falseRejectCost' ? '40' : '500', textContent: '', handlers: {},
    addEventListener(type, handler) { this.handlers[type] = handler; }
  });
  return elements.get(id);
}
vm.runInNewContext(source, { document: { getElementById: element } }, { filename: 'route-choice.js' });
assert.match(element('routeCostResult').textContent, /34,000.*38,000/);
assert.match(element('routeChoiceResult').textContent, /规则方案/);
element('falseRejectCost').value = '10';
element('falseRejectCost').handlers.input();
assert.match(element('routeCostResult').textContent, /25,000.*23,000/);
assert.match(element('routeChoiceResult').textContent, /统计模型/);
element('falseRejectCost').value = '20';
element('falseRejectCost').handlers.input();
assert.match(element('routeChoiceResult').textContent, /相同/);
element('falseRejectCost').value = '40';
element('missedFraudLoss').value = '1000';
element('missedFraudLoss').handlers.input();
assert.match(element('routeCostResult').textContent, /54,000.*48,000/);
assert.match(element('routeChoiceResult').textContent, /统计模型/);
console.log('Core 01: chapter anchors, source sync, learning state isolation and live cost experiment passed.');
