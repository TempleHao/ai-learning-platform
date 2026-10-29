const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = window.matchMedia?.('(max-width:760px)');

function setSidebarOpen(open, restoreFocus = false) {
  if (!sidebar || !menuBtn) return;
  const expanded = Boolean(open && (mobileNav?.matches ?? true));
  sidebar.classList.toggle('open', expanded);
  // The off-screen mobile navigation must not remain keyboard-focusable.
  sidebar.inert = Boolean(mobileNav?.matches && !expanded);
  menuBtn.setAttribute('aria-controls', 'sidebar');
  menuBtn.setAttribute('aria-expanded', String(expanded));
  menuBtn.setAttribute('aria-label', expanded ? '关闭导航' : '打开导航');
  if (restoreFocus) menuBtn.focus();
}

if (sidebar && menuBtn) {
  setSidebarOpen(false);
  menuBtn.addEventListener('click', () => setSidebarOpen(!sidebar.classList.contains('open')));
  document.querySelectorAll('.nav-link').forEach(link =>
    link.addEventListener('click', () => setSidebarOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
      setSidebarOpen(false, true);
    }
  });
  mobileNav?.addEventListener?.('change', () => setSidebarOpen(false));
}

const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-link')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach(l => l.classList.toggle('active', l.dataset.target === visible.target.id));
}, { rootMargin: '-25% 0px -55% 0px', threshold: [0, .2, .5] });
sections.forEach(s => observer.observe(s));

// Progress controls remain readable when storage is denied; do not imply a
// checkbox was saved if the browser rejected the write.
document.querySelectorAll('[data-progress]').forEach(box => {
  const key = `ai-learning-${box.dataset.progress}`;
  const unavailable = () => {
    box.disabled = true;
    box.title = '当前浏览器无法保存学习进度';
  };
  try { box.checked = localStorage.getItem(key) === '1'; }
  catch { box.checked = false; unavailable(); return; }
  box.addEventListener('change', () => {
    try { localStorage.setItem(key, box.checked ? '1' : '0'); }
    catch {
      try { box.checked = localStorage.getItem(key) === '1'; }
      catch { box.checked = false; }
      unavailable();
    }
  });
});




// 首页区分“上次阅读位置”与“下一未完成章节”，保留已有的 40 节点进度键。
const resumeLink = document.getElementById('resumeLearning');
const nextChapterLink = document.getElementById('nextChapterLink');
const resumeHint = document.getElementById('resumeHint');
if (resumeLink) {
  const chapters = [
    ['00','00-world-map'],['01','01-history-routes'],['02','02-how-models-learn'],
    ['03','03-capabilities-applications'],['04','04-application-expert'],
    ['05','05-business-future'],['06','06-risk-governance'],
    ['07','07-future-scenarios'],['08','08-risk-governance']
  ];
  const deepSlugs = [
    '01-neural-transformer','02-route-wars-winters','03-ai-profit-pools',
    '04-agent-economy','05-ai-native-organization','06-ai-coding',
    '07-knowledge-systems','08-multimodal-realtime',
    '09-inference-economics','10-ai-science-physical'
  ];
  const allowedPaths = new Set([
    ...chapters.map(([,slug]) => 'chapters/' + slug + '.html'),
    ...deepSlugs.map(slug => 'deep-dives/' + slug + '.html')
  ]);
  function getLastRead() {
    try {
      const item = JSON.parse(localStorage.getItem('ai-learning-last-read-v1') || 'null');
      if (!item || !allowedPaths.has(item.path) ||
          typeof item.section !== 'string' ||
          !/^[a-z][a-z0-9-]{0,48}$/.test(item.section) ||
          !Number.isFinite(item.at) || item.at < 0 || item.at > Date.now() + 86400000) return null;
      return item;
    } catch { return null; }
  }
  function updateResumeLearning() {
    try {
      const next = chapters.find(([id]) =>
        localStorage.getItem('ai-learning-ch' + id + '-done') !== '1');
      const completed = chapters.filter(([id]) =>
        localStorage.getItem('ai-learning-ch' + id + '-done') === '1').length;
      const last = getLastRead();
      if (last) {
        const coreIndex = chapters.findIndex(([,slug]) => last.path === 'chapters/' + slug + '.html');
        const deepIndex = deepSlugs.findIndex(slug => last.path === 'deep-dives/' + slug + '.html');
        const label = coreIndex >= 0 ? '第 ' + coreIndex + ' 章' : 'Deep Dive ' + String(deepIndex + 1).padStart(2, '0');
        resumeLink.href = last.path + '#' + last.section;
        resumeLink.textContent = '继续上次阅读 · ' + label + ' →';
        if (nextChapterLink) {
          nextChapterLink.hidden = false;
          nextChapterLink.href = next ? 'chapters/' + next[1] + '.html' : 'progress.html';
          nextChapterLink.textContent = next
            ? '下一未完成章 · 第 ' + Number(next[0]) + ' 章 →'
            : '查看学习进度 →';
        }
        if (resumeHint) resumeHint.textContent = '上次阅读：' + label + '（本机书签）；核心章节已完成 ' + completed + '/9。';
        return;
      }
      if (nextChapterLink) nextChapterLink.hidden = true;
      if (!next) {
        resumeLink.href = 'progress.html';
        resumeLink.textContent = '核心章节已完成 · 查看学习进度 →';
        if (resumeHint) resumeHint.textContent = '9 个核心章节已完成，可继续 Deep Dive 和专项实验。';
        return;
      }
      resumeLink.href = 'chapters/' + next[1] + '.html';
      resumeLink.textContent = completed ? '继续学习 · 第 ' + Number(next[0]) + ' 章 →' : '开始学习 · 第 0 章 →';
      if (resumeHint) resumeHint.textContent = completed
        ? '本机已完成 ' + completed + '/9 个核心章节；从下一未完成章节继续。'
        : '本机尚无阅读书签或已完成章节。打开课程后将自动记录阅读小节。';
    } catch {
      if (nextChapterLink) nextChapterLink.hidden = true;
      if (resumeHint) resumeHint.textContent = '当前浏览器无法读取本地学习进度。';
    }
  }
  updateResumeLearning();
  window.addEventListener('storage', updateResumeLearning);
  window.addEventListener('pageshow', updateResumeLearning);
}
