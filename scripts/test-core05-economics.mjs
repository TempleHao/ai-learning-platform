import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('site/chapters/05-business-future.html', 'utf8');
const notes = readFileSync('docs/chapters/05-business-future.md', 'utf8');
const contribution = (errorCost, count = 1000, retryCost = 0) => ({
  perTask: 20 - 2 - 1 - retryCost - 3 - errorCost - 2,
  monthly: (20 - 2 - 1 - 3 - errorCost - 2) * count,
});
assert.deepEqual(contribution(4), { perTask: 8, monthly: 8000 });
assert.deepEqual(contribution(13), { perTask: -1, monthly: -1000 });
assert.deepEqual(contribution(12), { perTask: 0, monthly: 0 });
assert.equal(20 - 2 - 1 - 0 - 3 - 2, 12);
assert.deepEqual(contribution(10, 1000, 2), { perTask: 0, monthly: 0 });
assert.ok(html.includes('重试 0 元（本例假设）'), 'retry cost assumption missing');
assert.ok(html.includes('重试成本降至 10 元/次') || html.includes('盈亏平衡错误损失降至 10 元/次'), 'retry cost sensitivity missing');
assert.ok(notes.includes('重试成本为 2 元'), 'notes missing retry sensitivity');
for (const phrase of ['商业判断的六项约束', '虚构假设', '1,000 次客服任务', '8,000 元', '−1,000 元', '12 元/次', '固定研发与获客成本']) {
  assert.ok(html.includes(phrase), 'Core 05 HTML missing: ' + phrase);
}
for (const phrase of ['分别评估客户价值', '1,000 次客服任务', '8,000 元', '−1,000 元', '12 元/次', '样本偏差']) {
  assert.ok(notes.includes(phrase), 'Core 05 notes missing: ' + phrase);
}
assert.ok(!html.includes('机会质量 ≈'), 'invalid opportunity multiplication remains in HTML');
assert.ok(!notes.includes('机会质量 ≈'), 'invalid opportunity multiplication remains in notes');
for (const id of ['economics', 'score', 'lab', 'check']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'missing/duplicate anchor ' + id);
  assert.ok(html.includes('href="#' + id + '"'), 'missing navigation ' + id);
}
assert.ok(html.includes('data-chapter="05"') && html.includes('data-lab="05"'), 'progress keys changed');
assert.ok(html.includes('src="../assets/chapter.js"'), 'chapter progress script removed');
for (const tag of ['section', 'article', 'nav', 'main']) {
  const opens = (html.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
  const closes = (html.match(new RegExp('</' + tag + '\\s*>', 'g')) || []).length;
  assert.equal(opens, closes, 'unbalanced ' + tag);
}
console.log('Core 05 unit economics, content alignment, navigation and progress compatibility passed.');
