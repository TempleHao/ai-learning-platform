import assert from 'node:assert/strict';
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
console.log('v0.18 integration checks passed: 40 nodes, links, Lab 12 and exploration.');
