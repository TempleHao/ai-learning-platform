import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const read = path => fs.readFileSync(path, 'utf8');
const dashboard = read('site/assets/progress.js');
const home = read('site/index.html');
const labTrack = read('site/labs/index.html');
const lab12 = read('site/labs/lab12.html');
const deep10 = read('site/deep-dives/10-ai-science-physical.html');
const explore = JSON.parse(read('site/resources/explore-data.json'));
const resources = JSON.parse(read('site/resources/data.json'));

const core = (dashboard.match(/\{id:'0[0-8]',title:/g) || []).length;
const deep = (dashboard.match(/\{id:'deep\d{2}',n:/g) || []).length;
const track = (labTrack.match(/data-track-lab="\d{2}"/g) || []).length;

assert.equal(core, 9, 'Core chapter count');
assert.equal(deep, 10, 'Deep Dive count');
assert.equal(track, 12, 'Lab Track count');
assert.equal(core * 2 + deep + track, 40, 'Dashboard node count');
assert.match(home, /deep-dives\/10-ai-science-physical\.html/);
assert.match(deep10, /\.\.\/labs\/lab12\.html/);
assert.match(lab12, /ai-learning-tracklab-12/);
assert.match(deep10, /\.\.\/assets\/explore\.js/);
assert.ok(resources.chapters.deep10?.items.length >= 3, 'Deep Dive 10 resource library');
const anchors = new Set((explore.nodes.deep10 || []).map(node => node.anchor));
for (const id of ['science', 'world', 'robotics']) {
  assert.ok(anchors.has(id), 'Missing Physical AI explore node: ' + id);
  assert.match(deep10, new RegExp('id="' + id + '"'));
}

// Dashboard rows must navigate directly to the selected Lab instead of the Lab Track top.
assert.ok(dashboard.includes("'labs/#lab'+id"), 'Dashboard must use Lab anchors');
for (let i = 1; i <= 11; i++) {
  const id = String(i).padStart(2, '0');
  assert.match(labTrack, new RegExp('data-track-lab="' + id + '" id="lab' + id + '"'));
}

 
// Exercise Lab 12's actual inline script: an external tab can clear all saved progress.
const lab12Script = [...lab12.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map(match => match[1]).find(source => source.includes('ai-learning-tracklab-12'));
assert.ok(lab12Script, 'Lab 12 completion script must be present');
const store = new Map();
const button = {
  textContent: '',
  setAttribute(name, value) { this[name] = value; },
  addEventListener(name, callback) { this[name] = callback; },
};
const state = {textContent: ''};
const listeners = {};
vm.runInNewContext(lab12Script, {
  document: {getElementById: id => id === 'lab12Done' ? button : id === 'lab12State' ? state : null},
  localStorage: {getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value)},
  window: {addEventListener: (name, callback) => { listeners[name] = callback; }},
});
assert.equal(state.textContent, '未完成', 'Lab 12 initial completion state');
store.set('ai-learning-tracklab-12', '1');
listeners.storage({key: 'ai-learning-tracklab-12'});
assert.match(state.textContent, /已完成/, 'Lab 12 recognizes another tab marking completion');
store.clear();
listeners.storage({key: null});
assert.equal(state.textContent, '未完成', 'Lab 12 handles another tab clearing all progress');
assert.equal(button['aria-pressed'], 'false', 'Lab 12 accessible completion state resets');
button.click();
assert.equal(store.get('ai-learning-tracklab-12'), '1', 'Lab 12 can mark completion after reset');

console.log('v0.18 integration checks passed: 40 nodes, links, Lab 12 and exploration.');
