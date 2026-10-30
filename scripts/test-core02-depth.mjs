import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('site/chapters/02-how-models-learn.html', 'utf8');
const notes = readFileSync('docs/chapters/02-how-models-learn.md', 'utf8');
const source = readFileSync('site/assets/fundamentals.js', 'utf8');

for (const id of ['worked-gradient', 'generalization']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'duplicate or missing section ' + id);
  assert.ok(html.includes('href="#' + id + '"'), 'missing TOC link for ' + id);
}
for (const snippet of ['8.3232', '−0.04', '−12', '训练集', '验证集', '测试集', '数据泄漏', 'Q5：', 'Q6：']) {
  assert.ok(html.includes(snippet), 'missing lesson content: ' + snippet);
}
assert.ok(notes.includes('8.3232') && notes.includes('泛化'), 'source notes out of sync');
assert.ok(html.includes('data-chapter="02"') && html.includes('data-lab="02"'), 'progress identifiers changed');
assert.ok(html.includes('src="../assets/chapter.js"') && html.includes('src="../assets/fundamentals.js"'), 'chapter scripts changed');

const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, { textContent: '', innerHTML: '', style: {}, handlers: {}, addEventListener(type, callback) { this.handlers[type] = callback; } });
  return elements.get(id);
}
const context = { document: { getElementById: element } };
vm.runInNewContext(source, context, { filename: 'fundamentals.js' });
assert.equal(element('weightVal').textContent, '-1.000');
assert.equal(element('lossVal').textContent, '18.0000');
element('trainOne').handlers.click();
assert.equal(element('weightVal').textContent, '-0.040');
assert.equal(element('lossVal').textContent, '8.3232');
element('resetTrain').handlers.click();
assert.equal(element('lossVal').textContent, '18.0000');
element('trainTwenty').handlers.click();
assert.ok(Number(element('lossVal').textContent) < 0.01, '20 steps should approach optimum');

const xs = [1, 2, 3];
const modelA = x => 2 * x;
const modelB = x => 2 * x + (x - 1) * (x - 2);
assert.deepEqual(xs.slice(0, 2).map(modelA), xs.slice(0, 2).map(modelB));
assert.equal(modelA(3), 6);
assert.equal(modelB(3), 8);
const largeStepW = -1 - 0.5 * (-12);
assert.equal(largeStepW, 5);
assert.equal(2 * (largeStepW - 2) ** 2, 18);

console.log('Core 02 depth: lesson anchors, source sync, actual Mini Lab math and generalization examples passed.');
