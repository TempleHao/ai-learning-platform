import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('site/chapters/00-world-map.html', 'utf8');
const notes = readFileSync('docs/chapters/00-world-map.md', 'utf8');
for (const id of ['hierarchy', 'taxonomy-drill', 'frontier', 'lab', 'check']) {
  assert.equal((html.match(new RegExp('id="' + id + '"', 'g')) || []).length, 1, 'missing/duplicate anchor: ' + id);
  assert.ok(html.includes('href="#' + id + '"'), 'missing chapter navigation: ' + id);
}
for (const phrase of ['AI ⊃ ML ⊃ DL', 'Foundation Model', '梯度提升树', '人工审批', '66.3%', '12%', '88%', '2026-10-31', 'Q4：']) {
  assert.ok(html.includes(phrase), 'missing lesson concept: ' + phrase);
}
for (const phrase of ['AI ⊃ Machine Learning ⊃ Deep Learning', 'Foundation Model', '梯度提升树', '66.3%', '2026-10-31']) {
  assert.ok(notes.includes(phrase), 'notes out of sync: ' + phrase);
}
assert.ok(!/<div class="h-fm">/.test(html), 'foundation model should not appear as a strict nested DL subset');
assert.ok(html.includes('data-chapter="00"') && html.includes('data-lab="00"'), 'existing progress keys changed');
assert.ok(html.includes('src="../assets/chapter.js"'), 'chapter progress script removed');
assert.ok(html.includes('01-history-routes.html'), 'next chapter link removed');
assert.ok(html.includes('https://crfm.stanford.edu/2021/10/18/reflections.html'), 'missing primary foundation-model source');
assert.ok(html.includes('https://hai.stanford.edu/ai-index/2026-ai-index-report'), 'missing primary index source');
for (const tag of ['section', 'article', 'nav', 'main']) {
  const opens = (html.match(new RegExp('<' + tag + '(?=[\\s>])', 'g')) || []).length;
  const closes = (html.match(new RegExp('</' + tag + '\\s*>', 'g')) || []).length;
  assert.equal(opens, closes, 'unbalanced ' + tag);
}
console.log('Core 00 taxonomy: conceptual boundary, anchors, sources, notes, progress and navigation checks passed.');
