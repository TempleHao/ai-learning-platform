import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const values = new Map();
const localStorage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, String(value)),
  removeItem: key => values.delete(key)
};
const readingKey = 'ai-learning-last-read-v1';
const listeners = {};
let onIntersection;
const sectionIds = ['start', 'science', 'world', 'robotics'];
const document = {
  body: { dataset: { chapter: 'deep10' }, appendChild() {} },
  getElementById: id => sectionIds.includes(id) ? { id } : null,
  querySelectorAll: selector => selector.includes('.chapter-section[id]') ?
    sectionIds.map(id => ({ id })) : [],
  querySelector: selector => selector === '.chapter-hero[id]' ? { id: 'start' } :
    selector.startsWith('script[') ? {} : null
};
const window = {
  location: { pathname: '/ai-learning-platform/deep-dives/10-ai-science-physical.html', hash: '' },
  addEventListener: (event, fn) => { listeners[event] = fn; }
};
vm.runInNewContext(fs.readFileSync('site/assets/chapter.js', 'utf8'), {
  document, window, localStorage, Date,
  IntersectionObserver: class {
    constructor(callback) { onIntersection = callback; }
    observe() {}
  }
});
let bookmark = JSON.parse(localStorage.getItem(readingKey));
assert.equal(bookmark.path, 'deep-dives/10-ai-science-physical.html');
assert.equal(bookmark.section, 'start', 'initial section is recorded without marking chapter complete');
assert.equal(localStorage.getItem('ai-learning-chdeep10-done'), null);
onIntersection([{ isIntersecting: true, intersectionRatio: 0.7, target: { id: 'science' } }]);
bookmark = JSON.parse(localStorage.getItem(readingKey));
assert.equal(bookmark.section, 'science');
window.location.hash = '#robotics';
listeners.hashchange();
assert.equal(JSON.parse(localStorage.getItem(readingKey)).section, 'robotics');

// 首页优先恢复上次阅读的小节，并保留独立的“下一未完成章”入口。
const resume = { href: '', textContent: '' };
const next = { href: '', textContent: '', hidden: true };
const hint = { textContent: '' };
const homeListeners = {};
const homeDocument = {
  getElementById: id => ({ resumeLearning: resume, nextChapterLink: next, resumeHint: hint })[id] ?? null,
  querySelectorAll: () => []
};
const homeWindow = {
  addEventListener: (event, fn) => { homeListeners[event] = fn; }
};
vm.runInNewContext(fs.readFileSync('site/assets/app.js', 'utf8'), {
  document: homeDocument, window: homeWindow, localStorage, Date,
  IntersectionObserver: class { observe() {} }
});
assert.equal(resume.href, 'deep-dives/10-ai-science-physical.html#robotics');
assert.match(resume.textContent, /继续上次阅读/);
assert.equal(next.href, 'chapters/00-world-map.html');
assert.equal(next.hidden, false);
localStorage.setItem('ai-learning-ch00-done', '1');
homeListeners.pageshow();
assert.equal(next.href, 'chapters/01-history-routes.html');
assert.match(hint.textContent, /1\/9/);

// 拒绝被篡改的外链、未发布页面和恶意片段。
localStorage.setItem(readingKey, JSON.stringify({
  path: 'https://attacker.invalid/', section: 'start', at: Date.now()
}));
homeListeners.storage({ key: readingKey });
assert.equal(resume.href, 'chapters/01-history-routes.html');
assert.equal(next.hidden, true);
localStorage.setItem(readingKey, JSON.stringify({
  path: 'chapters/01-history-routes.html', section: 'x"><script', at: Date.now()
}));
homeListeners.pageshow();
assert.equal(resume.href, 'chapters/01-history-routes.html');

// 所有核心章节完成且无有效书签时进入 Dashboard。
localStorage.removeItem(readingKey);
for (let i = 0; i < 9; i++) localStorage.setItem('ai-learning-ch' + String(i).padStart(2, '0') + '-done', '1');
homeListeners.pageshow();
assert.equal(resume.href, 'progress.html');
assert.equal(next.hidden, true);

// 禁用 localStorage 时首页仍可退化到静态入口，不会阻断阅读。
const denied = { getItem() { throw Error('Storage denied'); } };
vm.runInNewContext(fs.readFileSync('site/assets/app.js', 'utf8'), {
  document: homeDocument, window: { addEventListener() {} }, localStorage: denied, Date,
  IntersectionObserver: class { observe() {} }
});
assert.match(hint.textContent, /无法读取/);
console.log('Reading memory checks passed: section resume, fallback, allowlist, storage failure.');
