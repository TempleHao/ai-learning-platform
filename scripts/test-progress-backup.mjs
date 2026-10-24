import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync('site/assets/progress-backup.js', 'utf8');
const store = new Map([['ai-learning-ch00-done', '1'], ['ai-learning-tracklab-12', '1'], ['unrelated-setting', 'keep']]);
const elements = {};
for (const id of ['exportProgress', 'importProgress', 'importProgressFile', 'backupStatus']) {
  elements[id] = { textContent: '', value: '', files: [], listeners: {},
    addEventListener(type, fn) { this.listeners[type] = fn; },
    click() { return this.listeners.click?.(); } };
}
let downloaded, dispatched = [], confirmation = true, pickerOpened = false;
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
    setItem: (key, value) => store.set(key, value),
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
assert.equal(backup.schema, 'ai-learning-progress/v1');
assert.deepEqual([...backup.completed].sort(), ['ai-learning-ch00-done', 'ai-learning-tracklab-12']);
assert.match(elements.backupStatus.textContent, /2 \/ 40/);
elements.importProgress.click();
assert.equal(pickerOpened, true);

async function importFile(data, size = 100) {
  const target = elements.importProgressFile;
  target.files = [{ size, text: async () => typeof data === 'string' ? data : JSON.stringify(data) }];
  target.value = 'chosen.json';
  await target.listeners.change({ target });
  assert.equal(target.value, '', 'reselecting same file is possible');
}
await importFile({ schema: backup.schema, completed: ['ai-learning-tracklab-11'] });
assert.equal(store.has('ai-learning-ch00-done'), false);
assert.equal(store.has('ai-learning-tracklab-12'), false);
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.equal(store.get('unrelated-setting'), 'keep');
assert.deepEqual(dispatched, ['ai-learning-progress-updated']);
assert.match(elements.backupStatus.textContent, /恢复成功/);
await importFile({ schema: backup.schema, completed: ['unrelated-setting'] });
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.match(elements.backupStatus.textContent, /恢复失败/);
await importFile({ schema: backup.schema, completed: ['ai-learning-tracklab-11', 'ai-learning-tracklab-11'] });
assert.equal(store.get('ai-learning-tracklab-11'), '1');
confirmation = false;
await importFile({ schema: backup.schema, completed: [] });
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.match(elements.backupStatus.textContent, /已取消/);
confirmation = true;
await importFile({ schema: backup.schema, completed: [] }, 100001);
assert.equal(store.get('ai-learning-tracklab-11'), '1');
assert.equal(dispatched.length, 1);
console.log('Progress backup tests passed: export, restore, whitelist, cancellation and size guard.');
