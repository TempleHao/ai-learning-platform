import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const data = new Map(), listeners = {};
const status = { textContent: '' };
const button = { textContent: '', addEventListener: (event, cb) => { listeners['button:' + event] = cb; } };
const lab = { dataset: { lab: '03' }, checked: false, addEventListener: () => {} };
const document = {
  body: { dataset: { chapter: '03' }, appendChild: () => {} },
  getElementById: id => ({ chapterStatus: status, completeChapter: button })[id] ?? null,
  querySelectorAll: () => [],
  querySelector: selector => selector === '[data-lab]' ? lab : (
    selector === '.global-corner-logo' || selector.startsWith('script[') ? {} : null
  )
};
const localStorage = {
  getItem: key => data.get(key) ?? null,
  setItem: (key, value) => data.set(key, String(value)),
  removeItem: key => data.delete(key)
};
vm.runInNewContext(fs.readFileSync('site/assets/chapter.js', 'utf8'), {
  document, localStorage,
  window: { addEventListener: (event, cb) => { listeners[event] = cb; } },
  IntersectionObserver: class { observe() {} }
});
assert.equal(status.textContent, '未完成');
localStorage.setItem('ai-learning-ch03-done', '1');
localStorage.setItem('ai-learning-lab03', '1');
listeners.storage({ key: 'ai-learning-ch03-done' });
assert.equal(status.textContent, '已完成');
assert.equal(lab.checked, true);
localStorage.removeItem('ai-learning-ch03-done');
localStorage.removeItem('ai-learning-lab03');
listeners.storage({ key: null });
assert.equal(status.textContent, '未完成');
assert.equal(lab.checked, false);
console.log('Chapter progress synchronization checks passed.');
