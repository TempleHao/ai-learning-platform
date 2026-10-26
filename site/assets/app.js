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


