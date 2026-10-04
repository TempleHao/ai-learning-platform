const chapters=[
  {id:'00',title:'第 0 章 · AI 世界全地图',href:'chapters/00-world-map.html'},
  {id:'01',title:'第 1 章 · AI 技术路线战争',href:'chapters/01-history-routes.html'},
  {id:'02',title:'第 2 章 · 模型为什么能学会东西',href:'chapters/02-how-models-learn.html'},
  {id:'03',title:'第 3 章 · AI 能力地图与应用演进',href:'chapters/03-capabilities-applications.html'},
  {id:'04',title:'第 4 章 · AI 运用层专家方法论',href:'chapters/04-application-expert.html'},
  {id:'05',title:'第 5 章 · AI 商业机会与未来情景',href:'chapters/05-business-future.html'},
  {id:'06',title:'第 6 章 · AI 风险与治理地图',href:'chapters/06-risk-governance.html'}
];
const list=document.getElementById('progressList');
function read(id,type){return localStorage.getItem(`ai-learning-${type}${id}-done`)==='1'||localStorage.getItem(`ai-learning-${type}${id}`)==='1'}
function render(){
  let chDone=0,labDone=0;
  list.innerHTML=chapters.map((c,i)=>{
    const cDone=localStorage.getItem(`ai-learning-ch${c.id}-done`)==='1';
    const lDone=localStorage.getItem(`ai-learning-lab${c.id}`)==='1';
    if(cDone)chDone++;if(lDone)labDone++;
    return `<a class="progress-row" href="${c.href}"><span>${String(i).padStart(2,'0')}</span><div><b>${c.title}</b><small>Chapter ${cDone?'✓ 已完成':'○ 未完成'} · Lab ${lDone?'✓ 已完成':'○ 未完成'}</small></div><i>${cDone?'DONE':'OPEN'} →</i></a>`;
  }).join('');
  document.getElementById('chapterCount').textContent=`${chDone} / ${chapters.length}`;
  document.getElementById('labCount').textContent=`${labDone} / ${chapters.length}`;
  document.getElementById('overallPercent').textContent=Math.round((chDone+labDone)/(chapters.length*2)*100)+'%';
}
document.getElementById('resetProgress')?.addEventListener('click',()=>{
  if(!confirm('确定重置当前浏览器里的章节与 Lab 进度吗？'))return;
  chapters.forEach(c=>{localStorage.removeItem(`ai-learning-ch${c.id}-done`);localStorage.removeItem(`ai-learning-lab${c.id}`)});
  render();
});
render();