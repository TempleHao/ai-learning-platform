const toc=document.getElementById('chapterToc');
const chapterMenu=document.getElementById('chapterMenu');
const chapterMobile=window.matchMedia?.('(max-width:900px)');
function setChapterMenuOpen(open,restoreFocus=false){
  if(!toc||!chapterMenu)return;
  const expanded=Boolean(open&&(chapterMobile?.matches??true));
  toc.classList.toggle('open',expanded);
  toc.inert=Boolean(chapterMobile?.matches&&!expanded);
  chapterMenu.setAttribute('aria-controls','chapterToc');
  chapterMenu.setAttribute('aria-expanded',String(expanded));
  chapterMenu.setAttribute('aria-label',expanded?'关闭目录':'打开目录');
  if(restoreFocus)chapterMenu.focus();
}
if(toc&&chapterMenu){
  setChapterMenuOpen(false);
  chapterMenu.addEventListener('click',()=>setChapterMenuOpen(!toc.classList.contains('open')));
  document.querySelectorAll('.chapter-toc nav a').forEach(a=>a.addEventListener('click',()=>setChapterMenuOpen(false)));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&toc.classList.contains('open'))setChapterMenuOpen(false,true);
  });
  chapterMobile?.addEventListener?.('change',()=>setChapterMenuOpen(false));
}
// 本机阅读书签：独立于 40 个完成节点，保存最近阅读的章节和小节。
const readingKey = 'ai-learning-last-read-v1';
const pageMatch = window.location?.pathname?.match(/(?:^|\/)(chapters|deep-dives)\/([0-9]{2}-[a-z0-9-]+\.html)$/);
const readingPath = pageMatch ? pageMatch[1] + '/' + pageMatch[2] : null;
let recordedSection = '';
function saveReadingSection(section) {
  if (!readingPath || !section || !document.getElementById(section) || section === recordedSection) return;
  try {
    localStorage.setItem(readingKey, JSON.stringify({ path: readingPath, section, at: Date.now() }));
    recordedSection = section;
  } catch { /* 浏览器禁用存储时，课程仍可正常阅读。 */ }
}
function rememberHashSection() {
  const section = window.location?.hash?.slice(1);
  if (section && /^[a-z][a-z0-9-]{0,48}$/.test(section)) saveReadingSection(section);
}
rememberHashSection();
if (!recordedSection) saveReadingSection(document.querySelector('.chapter-hero[id]')?.id);
window.addEventListener('hashchange', rememberHashSection);

const sections=[...document.querySelectorAll('.chapter-section[id],.chapter-hero[id]')],links=[...document.querySelectorAll('.chapter-toc nav a')];
const ob=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;saveReadingSection(v.target.id);links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+v.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.2,.5]});
sections.forEach(s=>ob.observe(s));
const ch=document.body.dataset.chapter||'unknown',doneKey=`ai-learning-ch${ch}-done`;
const status=document.getElementById('chapterStatus'),btn=document.getElementById('completeChapter'),lab=document.querySelector('[data-lab]');
let progressReadable = true;
function readProgress(key) {
  try { return localStorage.getItem(key) === '1'; }
  catch { progressReadable = false; return false; }
}
function render() {
  const done = readProgress(doneKey);
  if (status) status.textContent = progressReadable ? (done ? '已完成' : '未完成') : '无法读取本机进度';
  if (btn) {
    btn.textContent = done ? '取消完成' : '标记本章完成';
    btn.disabled = !progressReadable;
    if (!progressReadable) btn.title = '当前浏览器无法保存学习进度';
  }
  if (lab) {
    lab.checked = readProgress(`ai-learning-lab${lab.dataset.lab}`);
    lab.disabled = !progressReadable;
    if (!progressReadable) lab.title = '当前浏览器无法保存学习进度';
  }
}
function progressWriteFailed() {
  if (status) status.textContent = '保存失败：本机存储不可用';
}
render();
btn?.addEventListener('click', () => {
  if (!progressReadable) return;
  try { localStorage.setItem(doneKey, readProgress(doneKey) ? '0' : '1'); }
  catch { progressWriteFailed(); return; }
  document.querySelector('.toc-progress')?.classList.add('complete-flash');
  setTimeout(() => document.querySelector('.toc-progress')?.classList.remove('complete-flash'), 850);
  render();
});
lab?.addEventListener('change', () => {
  if (!progressReadable) return;
  const key = `ai-learning-lab${lab.dataset.lab}`;
  try { localStorage.setItem(key, lab.checked ? '1' : '0'); }
  catch { lab.checked = readProgress(key); progressWriteFailed(); }
});
if(document.body.dataset.chapter && !document.querySelector('script[data-extension-resources]')){
  const resourceScript=document.createElement('script');
  resourceScript.src='/ai-learning-platform/assets/resources.js';
  resourceScript.dataset.extensionResources='1';
  document.body.appendChild(resourceScript);
}

if(document.body.dataset.chapter && !document.querySelector('script[data-explore-nodes]')){
  const exploreScript=document.createElement('script');
  exploreScript.src='/ai-learning-platform/assets/explore.js';
  exploreScript.dataset.exploreNodes='1';
  document.body.appendChild(exploreScript);
}




// Reflect progress changes from other browser tabs and storage resets.
window.addEventListener('storage', event => {
  const labKey = lab ? `ai-learning-lab${lab.dataset.lab}` : null;
  if (event.key === null || event.key === doneKey || (labKey && event.key === labKey)) render();
});
