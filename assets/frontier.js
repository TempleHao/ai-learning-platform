const btns=[...document.querySelectorAll('[data-radar]')];
const grid=document.getElementById('radarGrid');
const statusBox=document.getElementById('radarStatus');
let signals=[],active='all',meta=null;

function daysBetween(a,b){return Math.floor((new Date(b)-new Date(a))/(1000*60*60*24))}
function ageLabel(reviewed,interval){
  const now=new Date().toISOString().slice(0,10);
  const age=daysBetween(reviewed,now);
  if(age>interval)return {text:`已超过复核周期 ${age-interval} 天`,cls:'stale'};
  if(age>interval*0.75)return {text:`接近复核期限 · 已 ${age} 天`,cls:'due'};
  return {text:`数据复核正常 · ${age} 天前审阅`,cls:'fresh'};
}
function card(s){
  return `<article data-domain="${s.domain}">
    <div class="radar-meta"><b>${s.label}</b><span>${s.period}</span></div>
    <h2>${s.title}</h2><strong>${s.value}</strong>
    <p>${s.summary}</p>
    <small><b>为什么重要：</b>${s.why}</small>
    <small><b>下次看：</b>${s.watch}</small>
    <a href="${s.source_url}" target="_blank" rel="noreferrer">${s.source_name} ↗</a>
  </article>`;
}
function render(){
  const list=signals.filter(s=>active==='all'||s.domain===active);
  grid.innerHTML=list.map(card).join('');
  const st=ageLabel(meta.reviewed_at,meta.review_interval_days);
  statusBox.className='radar-status '+st.cls;
  statusBox.innerHTML=`<b>${st.text}</b><span>Last reviewed: ${meta.reviewed_at} · ${signals.length} signals · 默认每 ${meta.review_interval_days} 天复核</span>`;
}
btns.forEach(btn=>btn.addEventListener('click',()=>{btns.forEach(b=>b.classList.toggle('active',b===btn));active=btn.dataset.radar;render()}));
fetch('data.json').then(r=>r.json()).then(d=>{meta=d;signals=d.signals||[];render()}).catch(()=>{grid.innerHTML='<p class="radar-error">Frontier 数据加载失败，请查看 GitHub 数据文件。</p>'});