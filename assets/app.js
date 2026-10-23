const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
menuBtn?.addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => sidebar.classList.remove('open'));
});

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

function ensureGlobalCornerLogo(){
  if(document.querySelector('.global-corner-logo')) return;
  const a=document.createElement('a');
  a.className='global-corner-logo';
  a.href='/ai-learning-platform/';
  a.setAttribute('aria-label','AI Learning OS 首页');
  a.innerHTML='<img src="/ai-learning-platform/assets/brand/favicon-64.png" alt="AI Learning OS" />';
  document.body.appendChild(a);
}
ensureGlobalCornerLogo();
