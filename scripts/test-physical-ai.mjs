import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Keep the model deterministic: these are the teaching defaults in Deep Dive 10.
const defaults = {
  phyCapex: '240000', phyMonths: '36', phyAttempts: '6000',
  phySuccess: '92', phyRun: '1.5', phyFixed: '3000',
  phyTakeover: '8', phyHuman: '20', phyFailure: '12', phyBaseline: '9'
};
const outputs = ['phyAccepted', 'phyTotal', 'phyUnit', 'phyDelta', 'phyNote'];
const listeners = {};
const nodes = Object.fromEntries([
  ...Object.entries(defaults).map(([id, value]) => [id, {
    value,
    addEventListener: (event, callback) => { listeners[id + ':' + event] = callback; }
  }]),
  ...outputs.map(id => [id, { textContent: '' }])
]);

vm.runInNewContext(
  fs.readFileSync('site/assets/physical-ai.js', 'utf8'),
  { document: { getElementById: id => nodes[id] } }
);

assert.equal(nodes.phyAccepted.textContent, '5,520');
assert.equal(nodes.phyTotal.textContent, '34,026.67');
assert.equal(nodes.phyUnit.textContent, '6.16');
assert.equal(nodes.phyDelta.textContent, '-31.5%');

nodes.phySuccess.value = '0';
listeners['phySuccess:input']();
assert.equal(nodes.phyUnit.textContent, '—');
assert.match(nodes.phyNote.textContent, /成功任务为 0/);

nodes.phySuccess.value = '101';
listeners['phySuccess:input']();
assert.match(nodes.phyNote.textContent, /比例介于 0–100%/);

nodes.phySuccess.value = '92';
nodes.phyBaseline.value = '0';
listeners['phyBaseline:input']();
assert.equal(nodes.phyDelta.textContent, '基线为 0');

nodes.phyMonths.value = '0';
listeners['phyMonths:input']();
assert.equal(nodes.phyTotal.textContent, '—');

console.log('Physical AI calculator regression tests passed.');
