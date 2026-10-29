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
// Storage-denied browsers must still render chapter content and resources.
const deniedStatus = { textContent: '' };
const deniedButton = { disabled: false, addEventListener() {} };
const deniedLab = { dataset: { lab: '03' }, disabled: false, checked: true, addEventListener() {} };
const deniedDocument = {
  body: { dataset: { chapter: '03' }, appendChild() {} },
  getElementById: id => ({ chapterStatus: deniedStatus, completeChapter: deniedButton })[id] ?? null,
  querySelectorAll: () => [],
  querySelector: selector => selector === '[data-lab]' ? deniedLab : (
    selector.startsWith('script[') ? {} : null
  )
};
vm.runInNewContext(fs.readFileSync('site/assets/chapter.js', 'utf8'), {
  document: deniedDocument,
  localStorage: { getItem() { throw Error('Storage blocked'); }, setItem() { throw Error('Storage blocked'); } },
  window: { location: { pathname: '/ai-learning-platform/chapters/03-capabilities-applications.html', hash: '' }, addEventListener() {} },
  IntersectionObserver: class { observe() {} }, Date
});
assert.match(deniedStatus.textContent, /无法读取/);
assert.equal(deniedButton.disabled, true);
assert.equal(deniedLab.disabled, true);

// A quota failure after an initially readable state must not claim completion.
const quotaStatus = { textContent: '' };
const quotaButton = { disabled: false, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; } };
const quotaLab = { dataset: { lab: '03' }, checked: false, addEventListener() {} };
vm.runInNewContext(fs.readFileSync('site/assets/chapter.js', 'utf8'), {
  document: {
    ...deniedDocument,
    getElementById: id => ({ chapterStatus: quotaStatus, completeChapter: quotaButton })[id] ?? null,
    querySelector: selector => selector === '[data-lab]' ? quotaLab : (
      selector.startsWith('script[') ? {} : null
    )
  },
  localStorage: { getItem: () => null, setItem() { throw Error('Quota denied'); } },
  window: { location: { pathname: '/ai-learning-platform/chapters/03-capabilities-applications.html', hash: '' }, addEventListener() {} },
  IntersectionObserver: class { observe() {} }, Date
});
quotaButton.listeners.click();
assert.match(quotaStatus.textContent, /保存失败/);
assert.equal(quotaButton.textContent, '标记本章完成');

console.log('Chapter progress synchronization checks passed, including denied read/write.');
