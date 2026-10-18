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
  const ids = ['coreList', 'deepDiveList', 'trackLabList', 'coreCount', 'deepCount', 'trackCount', 'overallPercent', 'resetProgress'];
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
  storage.setItem('ai-learning-tracklab-12', '1');
  listeners.storage({ key: 'ai-learning-tracklab-12' });
  assert.equal(nodes.trackCount.textContent, '1 / 12');
  assert.match(nodes.trackLabList.innerHTML, /labs\/lab12\.html/);
  listeners['resetProgress:click']();
  assert.equal(nodes.trackCount.textContent, '0 / 12');
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
  assert.equal(bar.style.width, (100 / 12) + '%');
}

dashboardTest();
labTrackTest();
console.log('Progress sync regression tests passed (Dashboard + Lab Track).');
