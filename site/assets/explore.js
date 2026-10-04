if(!document.querySelector('link[data-explore-nodes]')){
  const l=document.createElement('link');
  l.rel='stylesheet';
  l.href='/ai-learning-platform/assets/explore.css';
  l.dataset.exploreNodes='1';
  document.head.appendChild(l);
}
const EXPLORE_BASE='/ai-learning-platform/';
function exploreItem(item){
  return `<a class="explore-link" href="${item.url}" target="_blank" rel="noreferrer">
    <span class="explore-depth">${item.depth}</span>
    <div><b>${item.title}</b><small>${item.type} · ${item.source}</small></div>
    <em>↗</em>
  </a>`;
}
async function renderExploreNodes(){
  const id=document.body.dataset.chapter;
  if(!id) return;
  try{
    const r=await fetch(EXPLORE_BASE+'resources/explore-data.json',{cache:'no-store'});
    if(!r.ok) throw new Error('explore data '+r.status);
    const data=await r.json();
    const nodes=data.nodes?.[id]||[];
    nodes.forEach(node=>{
      const section=document.getElementById(node.anchor);
      if(!section || section.querySelector('.explore-node')) return;
      const box=document.createElement('aside');
      box.className='explore-node';
      box.innerHTML=`
        <div class="explore-head">
          <div><span>CONTINUE EXPLORING</span><h3>继续探索 · ${node.topic}</h3></div>
          <button type="button" aria-expanded="false">展开</button>
        </div>
        <div class="explore-body">
          <div class="explore-links">${node.items.map(exploreItem).join('')}</div>
          <div class="explore-whys">${node.items.map(i=>`<p><b>${i.depth}</b>：${i.why}</p>`).join('')}</div>
        </div>`;
      const h2=section.querySelector('h2');
      let target=h2?.nextElementSibling;
      if(target && target.tagName==='P') target.insertAdjacentElement('afterend',box);
      else if(h2) h2.insertAdjacentElement('afterend',box);
      else section.prepend(box);
      const btn=box.querySelector('button');
      btn.addEventListener('click',()=>{
        const open=box.classList.toggle('open');
        btn.textContent=open?'收起':'展开';
        btn.setAttribute('aria-expanded',open?'true':'false');
      });
    });
  }catch(e){console.warn('explore nodes unavailable',e)}
}
renderExploreNodes();