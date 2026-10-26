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

document.querySelectorAll('[data-progress]').forEach(box => {
  const key = `ai-learning-${box.dataset.progress}`;
  box.checked = localStorage.getItem(key) === '1';
  box.addEventListener('change', () => localStorage.setItem(key, box.checked ? '1' : '0'));
});




// 首页继续学习：沿用 Dashboard 已有的完成键，不覆盖或迁移学习记录。
const resumeLink = document.getElementById('resumeLearning');
const resumeHint = document.getElementById('resumeHint');
if (resumeLink) {
  const chapters = [
    ['00','00-world-map'],['01','01-history-routes'],['02','02-how-models-learn'],
    ['03','03-capabilities-applications'],['04','04-application-expert'],
    ['05','05-business-future'],['06','06-risk-governance'],
    ['07','07-future-scenarios'],['08','08-risk-governance']
  ];
  function updateResumeLearning() {
    try {
      const next = chapters.find(([id]) =>
        localStorage.getItem('ai-learning-ch' + id + '-done') !== '1');
      if (!next) {
        resumeLink.href = 'progress.html';
        resumeLink.textContent = '核心章节已完成 · 查看学习进度 →';
        if (resumeHint) resumeHint.textContent = '9 个核心章节已完成，可继续 Deep Dive 和专项实验。';
        return;
      }
      const completed = chapters.filter(([id]) =>
        localStorage.getItem('ai-learning-ch' + id + '-done') === '1').length;
      resumeLink.href = 'chapters/' + next[1] + '.html';
      resumeLink.textContent = completed ? '继续学习 · 第 ' + Number(next[0]) + ' 章 →' : '开始学习 · 第 0 章 →';
      if (resumeHint) resumeHint.textContent = completed
        ? '本机已完成 ' + completed + '/9 个核心章节；从下一未完成章节继续。'
        : '本机尚无已完成的核心章节记录。完成章节后会自动更新入口。';
    } catch (error) {
      // 隐私模式或浏览器禁用存储时仍保留静态入口。
      if (resumeHint) resumeHint.textContent = '当前浏览器无法读取本地学习进度。';
    }
  }
  updateResumeLearning();
  window.addEventListener('storage', updateResumeLearning);
  window.addEventListener('pageshow', updateResumeLearning);
}
