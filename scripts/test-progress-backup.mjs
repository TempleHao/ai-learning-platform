import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('site/assets/progress-backup.js', 'utf8');
const readingKey = 'ai-learning-last-read-v1';
const bookmark = {
  path: 'deep-dives/10-ai-science-physical.html', section: 'robotics', at: Date.now() - 1000
};
const store = new Map([
  ['ai-learning-ch00-done', '1'],
  ['ai-learning-tracklab-12', '1'],
  [readingKey, JSON.stringify(bookmark)],
  ['unrelated-setting', 'keep']
]);
const elements = {};
for (const id of ['exportProgress', 'importProgress', 'importProgressFile', 'backupStatus']) {
  elements[id] = {
    textContent: '', value: '', files: [], listeners: {},
    addEventListener(type, fn) { this.listeners[type] = fn; },
    click() { return this.listeners.click?.(); }
  };
}
let downloaded, confirmation = true, pickerOpened = false, failNextWrite = false;
const dispatched = [];
elements.importProgressFile.click = () => { pickerOpened = true; };
const document = {
  getElementById: id => elements[id],
  createElement: () => ({ click() {}, remove() {} }),
  body: { appendChild() {} }
};
class BlobMock { constructor(parts, options) { this.parts = parts; this.type = options.type; } }
vm.runInNewContext(source, {
  document,
  localStorage: {
    getItem: key => store.get(key) ?? null,
    setItem: (key, value) => {
      if (failNextWrite && key === readingKey) {
        failNextWrite = false;
        throw Error('Simulated quota failure');
      }
      store.set(key, String(value));
    },
    removeItem: key => store.delete(key)
  },
  window: { dispatchEvent: event => dispatched.push(event.type) },
  Event: class { constructor(type) { this.type = type; } },
  Blob: BlobMock,
  URL: { createObjectURL(blob) { downloaded = blob; return 'blob:test'; }, revokeObjectURL() {} },
  Date, JSON, Set, Map,
  setTimeout: callback => callback(),
  confirm: () => confirmation
});

elements.exportProgress.click();
const backup = JSON.parse(downloaded.parts.join(''));
assert.equal(backup.schema, 'ai-learning-progress/v2');
assert.deepEqual([...backup.completed].sort(), ['ai-learning-ch00-done', 'ai-learning-tracklab-12']);
assert.deepEqual(backup.reading, bookmark, 'valid Deep Dive 10 bookmark exported');
assert.match(elements.backupStatus.textContent, /2 \/ 40/);
elements.importProgress.click();
assert.equal(pickerOpened, true);

async function importFile(data, size = 100) {
  const target = elements.importProgressFile;
  target.files = [{ size, text: async () => typeof data === 'string' ? data : JSON.stringify(data) }];
  target.value = 'chosen.json';
  await target.listeners.change({ target });
  assert.equal(target.value, '', 'same file can be selected again');
}

// New format: completion nodes and reading position migrate together.
await importFile({ schema: backup.schema, completed: ['ai-learning-tracklab-11'], reading: bookmark });
assert.equal(store.has('ai-learning-ch00-done'), false);
assert.equal(store.has('ai-learning-tracklab-12'), false);
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.deepEqual(JSON.parse(store.get(readingKey)), bookmark);
assert.equal(store.get('unrelated-setting'), 'keep');
assert.deepEqual(dispatched, ['ai-learning-progress-updated']);
assert.match(elements.backupStatus.textContent, /阅读书签已恢复/);

// Untrusted URLs, malformed anchors, and future timestamps must never be imported.
for (const badReading of [
  { ...bookmark, path: 'https://example.invalid/' },
  { ...bookmark, section: 'x"><script' },
  { ...bookmark, at: Date.now() + 172800000 },
  { ...bookmark, extra: 'not allowed' }
]) {
  await importFile({ schema: backup.schema, completed: [], reading: badReading });
  assert.equal(store.get('ai-learning-tracklab-11'), '1');
  assert.deepEqual(JSON.parse(store.get(readingKey)), bookmark);
  assert.match(elements.backupStatus.textContent, /恢复失败/);
}
await importFile({ schema: backup.schema, completed: ['unrelated-setting'], reading: null });
await importFile({ schema: backup.schema, completed: ['ai-learning-tracklab-11', 'ai-learning-tracklab-11'], reading: null });
await importFile({ schema: backup.schema, completed: [], reading: undefined });
assert.equal(store.get('ai-learning-tracklab-11'), '1');

// Cancel preserves both completion and bookmark.
confirmation = false;
await importFile({ schema: backup.schema, completed: [], reading: null });
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.deepEqual(JSON.parse(store.get(readingKey)), bookmark);
assert.match(elements.backupStatus.textContent, /已取消/);
confirmation = true;

// A failed bookmark write must roll back all 40 completion keys and bookmark.
failNextWrite = true;
await importFile({ schema: backup.schema, completed: ['ai-learning-ch01-done'], reading: bookmark });
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.equal(store.has('ai-learning-ch01-done'), false);
assert.deepEqual(JSON.parse(store.get(readingKey)), bookmark);
assert.match(elements.backupStatus.textContent, /存储写入失败/);

// Old v1 backup remains usable and clears the stale local bookmark.
await importFile({ schema: 'ai-learning-progress/v1', completed: ['ai-learning-tracklab-12'] });
assert.equal(store.get('ai-learning-tracklab-12'), '1');
assert.equal(store.has('ai-learning-tracklab-11'), false);
assert.equal(store.has(readingKey), false);
assert.match(elements.backupStatus.textContent, /阅读书签已清除/);

// No-bookmark v2 roundtrip is valid.
elements.exportProgress.click();
const withoutBookmark = JSON.parse(downloaded.parts.join(''));
assert.equal(withoutBookmark.reading, null);
await importFile(withoutBookmark);
assert.equal(store.get(readingKey), undefined);
await importFile({ schema: backup.schema, completed: [], reading: null }, 100001);
assert.equal(store.get('ai-learning-tracklab-12'), '1');
assert.equal(dispatched.length, 3, 'only three successful imports dispatch refresh');
console.log('Progress backup checks passed: v2 bookmark, v1 compatibility, validation, rollback, cancel, size guard.');
