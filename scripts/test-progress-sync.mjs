import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function makeStorage() {
  const items = new Map();
  return {
    getItem: key => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, String(value)),
    removeItem: key => items.delete(key)
  };
}

function dashboardTest() {
  const storage = makeStorage();
  const listeners = {};
  const ids = ['coreList', 'deepDiveList', 'trackLabList', 'coreCount', 'coreLabCount', 'deepCount', 'trackCount', 'overallPercent', 'resetProgress'];
  const nodes = Object.fromEntries(ids.map(id => [id, {
    innerHTML: '', textContent: '',
    addEventListener: (event, callback) => { listeners[id + ':' + event] = callback; }
  }]));
  const context = {
    localStorage: storage,
    document: { getElementById: id => nodes[id] },
    window: { addEventListener: (event, callback) => { listeners[event] = callback; } },
    confirm: () => true
  };
  vm.runInNewContext(fs.readFileSync('site/assets/progress.js', 'utf8'), context);
  assert.equal(nodes.trackCount.textContent, '0 / 12');
  assert.equal(nodes.coreCount.textContent, '0 / 9');
  assert.equal(nodes.coreLabCount.textContent, '0 / 9');
  storage.setItem('ai-learning-lab00', '1');
  listeners.storage({ key: 'ai-learning-lab00' });
  assert.equal(nodes.coreLabCount.textContent, '1 / 9', 'Core Lab completion is visible separately');
  assert.equal(nodes.overallPercent.textContent, '3%', 'Core Lab contributes one of 40 nodes');
  storage.setItem('ai-learning-tracklab-12', '1');
  listeners.storage({ key: 'ai-learning-tracklab-12' });
  assert.equal(nodes.trackCount.textContent, '1 / 12');
  assert.match(nodes.trackLabList.innerHTML, /labs\/lab12\.html/);
  storage.setItem('ai-learning-tracklab-11', '1');
  listeners['ai-learning-progress-updated']();
  assert.equal(nodes.trackCount.textContent, '2 / 12', 'same-tab import refreshes Dashboard');
  storage.setItem('ai-learning-last-read-v1', '{\"path\":\"chapters/00-world-map.html\"}');
  listeners['resetProgress:click']();
  assert.equal(storage.getItem('ai-learning-last-read-v1'), null, 'reset clears last-read bookmark');
  assert.equal(nodes.trackCount.textContent, '0 / 12');
  assert.equal(nodes.coreLabCount.textContent, '0 / 9', 'Reset clears Core Lab count');
  assert.equal(nodes.overallPercent.textContent, '0%', 'Reset clears overall progress');
}

function labTrackTest() {
  const storage = makeStorage();
  const listeners = {};
  const progress = { textContent: '' };
  const bar = { style: { width: '' } };
  const labs = Array.from({ length: 12 }, (_, index) => {
    const box = { checked: false, addEventListener: () => {} };
    return {
      dataset: { trackLab: String(index + 1).padStart(2, '0') },
      querySelector: () => box,
      classList: { toggle: () => {} },
      box
    };
  });
  const context = {
    localStorage: storage,
    document: {
      querySelectorAll: () => labs,
      getElementById: id => id === 'trackProgress' ? progress : bar
    },
    window: { addEventListener: (event, callback) => { listeners[event] = callback; } }
  };
  vm.runInNewContext(fs.readFileSync('site/assets/labs.js', 'utf8'), context);
  assert.equal(progress.textContent, '0 / 12');
  storage.setItem('ai-learning-tracklab-12', '1');
  listeners.storage({ key: 'ai-learning-tracklab-12' });
  assert.equal(progress.textContent, '1 / 12');
  assert.equal(labs[11].box.checked, true);
  assert.equal(bar.style.width, (1 / 12 * 100) + '%');
}

function dashboardReadabilityTest() {
  const html = fs.readFileSync('site/progress.html', 'utf8');
  const css = fs.readFileSync('site/assets/progress.css', 'utf8');
  assert.match(html, /id="coreLabCount">0 \/ 9/);
  assert.match(html, /aria-label="40 个学习节点的完成统计"/);
  assert.match(css, /grid-template-columns:repeat\(5,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:760px\).*?repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /\.progress-row b\{font-size:15px/);
  assert.match(css, /\.progress-row small\{font-size:13px/);
  assert.match(css, /\.progress-row:focus-visible/);
}

dashboardTest();
labTrackTest();
dashboardReadabilityTest();
console.log('Progress sync and Dashboard readability tests passed (40 nodes, Core Labs, mobile and focus).');
