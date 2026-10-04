const toc=document.getElementById('chapterToc');
document.getElementById('chapterMenu')?.addEventListener('click',()=>toc.classList.toggle('open'));
document.querySelectorAll('.chapter-toc nav a').forEach(a=>a.addEventListener('click',()=>toc.classList.remove('open')));
const sections=[...document.querySelectorAll('.chapter-section[id],.chapter-hero[id]')],links=[...document.querySelectorAll('.chapter-toc nav a')];
const ob=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+v.target.id));},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.2,.5]});
sections.forEach(s=>ob.observe(s));
const ch=document.body.dataset.chapter||'unknown',doneKey=`ai-learning-ch${ch}-done`;
const status=document.getElementById('chapterStatus'),btn=document.getElementById('completeChapter'),lab=document.querySelector('[data-lab]');
function render(){const done=localStorage.getItem(doneKey)==='1';if(status)status.textContent=done?'已完成':'未完成';if(btn)btn.textContent=done?'取消完成':'标记本章完成';if(lab){const key=`ai-learning-lab${lab.dataset.lab}`;lab.checked=localStorage.getItem(key)==='1'}}
render();
btn?.addEventListener('click',()=>{localStorage.setItem(doneKey,localStorage.getItem(doneKey)==='1'?'0':'1');document.querySelector('.toc-progress')?.classList.add('complete-flash');setTimeout(()=>document.querySelector('.toc-progress')?.classList.remove('complete-flash'),850);render()});
lab?.addEventListener('change',()=>localStorage.setItem(`ai-learning-lab${lab.dataset.lab}`,lab.checked?'1':'0'));
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
