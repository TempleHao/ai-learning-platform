const RESOURCE_BASE='/ai-learning-platform/';
async function loadResourceData(){
  const r=await fetch(RESOURCE_BASE+'resources/data.json',{cache:'no-store'});
  if(!r.ok) throw new Error('resource data '+r.status);
  return r.json();
}
function resourceCard(item){
  const cls=(item.level||'').replace(/\s+/g,'-');
  return `<a class="resource-card" href="${item.url}" target="_blank" rel="noreferrer">
    <div class="resource-card-top"><span>${item.type}</span><i class="resource-level ${cls}">${item.level}</i></div>
    <h3>${item.title}</h3>
    <b>${item.source}</b>
    <p>${item.why}</p>
    <em>打开资源 ↗</em>
  </a>`;
}
async function renderChapterResources(){
  const id=document.body.dataset.chapter;
  if(!id) return;
  try{
    const data=await loadResourceData();
    const group=data.chapters?.[id];
    if(!group) return;
    const section=document.createElement('section');
    section.className='chapter-section extension-resources';
    section.id='extended-reading';
    section.innerHTML=`
      <div class="section-kicker">EXTENDED READING · 延伸阅读</div>
      <h2>如果你想继续往深处学</h2>
      <p class="resource-intro">${group.intro}</p>
      <div class="resource-priority"><span>选材原则</span><b>中文视听优先 · 一手资料优先 · 少而精</b><a href="${RESOURCE_BASE}resources/">查看完整资源库 →</a></div>
      <div class="resource-grid">${group.items.map(resourceCard).join('')}</div>
    `;
    const anchor=document.querySelector('.chapter-section.sources')||document.querySelector('.chapter-next');
    if(anchor) anchor.parentNode.insertBefore(section,anchor); else document.querySelector('.chapter-article')?.appendChild(section);
    const nav=document.querySelector('.chapter-toc nav');
    if(nav && !nav.querySelector('[href="#extended-reading"]')){
      const a=document.createElement('a');a.href='#extended-reading';a.textContent='↗ 延伸阅读';nav.appendChild(a);
    }
  }catch(e){console.warn('extension resources unavailable',e)}
}
async function renderResourceLibrary(){
  const root=document.getElementById('resourceLibrary');
  if(!root) return;
  try{
    const data=await loadResourceData();
    document.getElementById('resourceReviewed').textContent='LAST REVIEWED · '+data.reviewed_at;
    root.innerHTML=Object.entries(data.chapters).map(([id,g])=>`
      <section class="library-group" data-resource-group="${id}">
        <div class="library-group-head"><span>${id.toUpperCase()}</span><div><h2>${g.title}</h2><p>${g.intro}</p></div></div>
        <div class="resource-grid">${g.items.map(resourceCard).join('')}</div>
      </section>`).join('');
    const buttons=[...document.querySelectorAll('[data-resource-filter]')];
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      buttons.forEach(b=>b.classList.toggle('active',b===btn));
      const f=btn.dataset.resourceFilter;
      document.querySelectorAll('.library-group').forEach(g=>{
        const id=g.dataset.resourceGroup;
        const isDeep=id.startsWith('deep');
        g.hidden=!(f==='all'||(f==='core'&&!isDeep)||(f==='deep'&&isDeep));
      });
    }));
  }catch(e){root.innerHTML='<p class="resource-error">资源库加载失败，请稍后刷新。</p>'}
}
renderChapterResources();
renderResourceLibrary();