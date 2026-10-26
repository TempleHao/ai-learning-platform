import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function node() {
  const classes = new Set();
  const listeners = {};
  return {
    inert: false, attributes: {}, listeners, focused: false,
    classList: {
      contains: name => classes.has(name),
      toggle: (name, force) => {
        const on = force === undefined ? !classes.has(name) : force;
        if (on) classes.add(name); else classes.delete(name);
        return on;
      },
      remove: name => classes.delete(name)
    },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, fn) { listeners[name] = fn; },
    focus() { this.focused = true; },
    click() { listeners.click?.(); }
  };
}
function media(initial = true) {
  return {
    matches: initial, listeners: {},
    addEventListener(name, fn) { this.listeners[name] = fn; },
    resize(matches) { this.matches = matches; this.listeners.change?.(); }
  };
}
function testHome() {
  const sidebar = node(), button = node(), link = node(), mq = media();
  const documentListeners = {};
  const document = {
    getElementById: id => ({sidebar, menuBtn: button})[id] ?? null,
    querySelectorAll: selector => selector === '.nav-link' ? [link] : [],
    addEventListener: (name, fn) => { documentListeners[name] = fn; }
  };
  vm.runInNewContext(fs.readFileSync('site/assets/app.js', 'utf8'), {
    document, window: {matchMedia: () => mq},
    IntersectionObserver: class {observe() {}},
    localStorage: {getItem: () => null}
  });
  assert.equal(sidebar.inert, true, 'Closed mobile home navigation is not tabbable');
  assert.equal(button.attributes['aria-expanded'], 'false');
  button.click();
  assert.equal(sidebar.inert, false);
  assert.equal(sidebar.classList.contains('open'), true);
  assert.equal(button.attributes['aria-expanded'], 'true');
  link.click();
  assert.equal(sidebar.inert, true, 'Navigation link closes drawer');
  button.click();
  documentListeners.keydown({key: 'Escape'});
  assert.equal(button.focused, true, 'Escape returns focus to trigger');
  assert.equal(button.attributes['aria-expanded'], 'false');
  mq.resize(false);
  assert.equal(sidebar.inert, false, 'Desktop navigation remains keyboard-accessible');
}
function testChapter() {
  const toc = node(), button = node(), link = node(), mq = media();
  const documentListeners = {};
  const document = {
    body: {dataset: {}},
    getElementById: id => ({chapterToc: toc, chapterMenu: button})[id] ?? null,
    querySelectorAll: selector => selector === '.chapter-toc nav a' ? [link] : [],
    querySelector: () => null,
    addEventListener: (name, fn) => { documentListeners[name] = fn; }
  };
  vm.runInNewContext(fs.readFileSync('site/assets/chapter.js', 'utf8'), {
    document, window: {matchMedia: () => mq, addEventListener() {}},
    localStorage: {getItem: () => null},
    IntersectionObserver: class {observe() {}}
  });
  assert.equal(toc.inert, true, 'Closed mobile chapter table of contents is not tabbable');
  assert.equal(button.attributes['aria-controls'], 'chapterToc');
  button.click();
  assert.equal(toc.inert, false);
  assert.equal(button.attributes['aria-expanded'], 'true');
  link.click();
  assert.equal(toc.inert, true, 'Chapter anchor closes drawer');
  button.click();
  documentListeners.keydown({key: 'Escape'});
  assert.equal(button.focused, true);
  assert.equal(button.attributes['aria-expanded'], 'false');
  mq.resize(false);
  assert.equal(toc.inert, false, 'Desktop chapter TOC remains keyboard-accessible');
}
testHome();
testChapter();
console.log('Mobile navigation checks passed: inert, ARIA, links, Escape, focus and desktop resize.');
