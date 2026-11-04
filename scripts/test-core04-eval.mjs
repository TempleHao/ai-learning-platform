import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('site/chapters/04-application-expert.html', 'utf8');
const notes = readFileSync('docs/chapters/04-application-expert.md', 'utf8');
const sample = { total: 100, evidenced: 80, insufficient: 20, A: { answered: 68, refused: 16 }, B: { answered: 72, refused: 10 } };
assert.equal(sample.evidenced + sample.insufficient, sample.total);
const metrics = ({ answered, refused }) => ({
  overall: (answered + refused) / sample.total,
  grounded: answered / sample.evidenced,
  refusal: refused / sample.insufficient,
});
assert.deepEqual(metrics(sample.A), { overall: 0.84, grounded: 0.85, refusal: 0.8 });
assert.deepEqual(metrics(sample.B), { overall: 0.82, grounded: 0.9, refusal: 0.5 });
assert.ok(metrics(sample.B).grounded > metrics(sample.A).grounded);
assert.ok(metrics(sample.A).overall > metrics(sample.B).overall);
for (const phrase of ['100 条客服问题', '68/80 = 85%', '72/80 = 90%', '16/20=80%', '10/20=50%', '抽样偏差', '拒答只在证据不足时计为正确']) {
  assert.ok(html.includes(phrase), 'Core 04 HTML missing: ' + phrase);
}
for (const phrase of ['100 条客服题', '68/80=85%', '72/80=90%', '16/20=80%', '10/20=50%', '抽样偏差']) {
  assert.ok(notes.includes(phrase), 'Core 04 notes missing: ' + phrase);
}
assert.ok(!html.includes('结果质量 ≈ 模型能力 ×'), 'invalid quality multiplication remains in HTML');
assert.ok(!notes.includes('结果质量 ≈ 模型能力 ×'), 'invalid quality multiplication remains in notes');
for (const id of ['eval', 'lab', 'check']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'missing/duplicate anchor ' + id);
  assert.ok(html.includes('href="#' + id + '"'), 'missing navigation ' + id);
}
assert.ok(html.includes('data-chapter="04"') && html.includes('data-lab="04"'), 'progress keys changed');
assert.ok(html.includes('src="../assets/chapter.js"'), 'chapter progress script removed');
for (const tag of ['section', 'article', 'nav', 'main']) {
  const opens = (html.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
  const closes = (html.match(new RegExp('</' + tag + '\\s*>', 'g')) || []).length;
  assert.equal(opens, closes, 'unbalanced ' + tag);
}
console.log('Core 04 evaluation denominators, source alignment, navigation and progress compatibility passed.');
