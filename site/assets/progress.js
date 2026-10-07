const core=[
  {id:'00',title:'第 0 章 · AI 世界全地图',href:'chapters/00-world-map.html'},
  {id:'01',title:'第 1 章 · AI 技术路线战争',href:'chapters/01-history-routes.html'},
  {id:'02',title:'第 2 章 · 模型为什么能学会东西',href:'chapters/02-how-models-learn.html'},
  {id:'03',title:'第 3 章 · AI 能力地图与应用演进',href:'chapters/03-capabilities-applications.html'},
  {id:'04',title:'第 4 章 · AI 运用层专家方法论',href:'chapters/04-application-expert.html'},
  {id:'05',title:'第 5 章 · AI 商业机会与未来情景',href:'chapters/05-business-future.html'},
  {id:'06',title:'第 6 章 · AI 风险与治理地图',href:'chapters/06-risk-governance.html'},
  {id:'07',title:'第 7 章 · 未来情景与领先信号',href:'chapters/07-future-scenarios.html'},
  {id:'08',title:'第 8 章 · 风险与治理深化',href:'chapters/08-risk-governance.html'}
];
const deep=[
  {id:'deep01',n:'D01',title:'神经网络、Transformer 与 Scaling',href:'deep-dives/01-neural-transformer.html'},
  {id:'deep02',n:'D02',title:'AI 路线战争、寒冬与复兴',href:'deep-dives/02-route-wars-winters.html'},
  {id:'deep03',n:'D03',title:'AI 利润池、商品化与商业机会',href:'deep-dives/03-ai-profit-pools.html'},
  {id:'deep04',n:'D04',title:'Agent：从软件工具到数字劳动力',href:'deep-dives/04-agent-economy.html'},
  {id:'deep05',n:'D05',title:'AI-native Organization',href:'deep-dives/05-ai-native-organization.html'},
  {id:'deep06',n:'D06',title:'AI Coding、Vibe Coding 与软件工程',href:'deep-dives/06-ai-coding.html'},
  {id:'deep07',n:'D07',title:'RAG、Memory 与 Knowledge Systems',href:'deep-dives/07-knowledge-systems.html'},
  {id:'deep08',n:'D08',title:'Multimodal、Voice 与 Realtime AI',href:'deep-dives/08-multimodal-realtime.html'},
  {id:'deep09',n:'D09',title:'Inference Economics 与 Model Routing',href:'deep-dives/09-inference-economics.html'}
];
const track=[
  ['01','Context Engineering 对比实验'],['02','Structured Output'],['03','可信 RAG 知识库'],['04','Tool + Workflow'],
  ['05','Eval 回归测试'],['06','Agent：观察—行动—检查'],['07','Capstone：发布真实 AI 产品'],
  ['08','AI Coding：Agent-ready Repo'],['09','Knowledge Systems：企业 RAG'],['10','Multimodal / Realtime Assistant'],
  ['11','Inference Economics：模型路由与成本基准']
];

function isCoreDone(id){return localStorage.getItem(`ai-learning-ch${id}-done`)==='1'}
function isCoreLabDone(id){return localStorage.getItem(`ai-learning-lab${id}`)==='1'}
function isDeepDone(id){return localStorage.getItem(`ai-learning-ch${id}-done`)==='1'}
function isTrackDone(id){return localStorage.getItem(`ai-learning-tracklab-${id}`)==='1'}

function render(){
  let coreDone=0,coreLabDone=0,deepDone=0,trackDone=0;
  document.getElementById('coreList').innerHTML=core.map((c,i)=>{
    const cd=isCoreDone(c.id),ld=isCoreLabDone(c.id);if(cd)coreDone++;if(ld)coreLabDone++;
    return `<a class="progress-row ${cd&&ld?'done':''}" href="${c.href}"><span>${c.id}</span><div><b>${c.title}</b><small>阅读 ${cd?'✓':'○'} · 章内 Lab ${ld?'✓':'○'}</small></div><i>${cd&&ld?'COMPLETE':'OPEN'} →</i></a>`;
  }).join('');

  document.getElementById('deepDiveList').innerHTML=deep.map(d=>{
    const done=isDeepDone(d.id);if(done)deepDone++;
    return `<a class="progress-row ${done?'done':''}" href="${d.href}"><span>${d.n}</span><div><b>${d.title}</b><small>${done?'✓ 已完成':'○ 未完成'} · 可按主题选择学习</small></div><i>${done?'DONE':'OPEN'} →</i></a>`;
  }).join('');

  document.getElementById('trackLabList').innerHTML=track.map(([id,title])=>{
    const done=isTrackDone(id);if(done)trackDone++;
    return `<a class="progress-row ${done?'done':''}" href="labs/"><span>L${id}</span><div><b>${title}</b><small>${done?'✓ 已完成':'○ 未完成'} · 独立实战产物</small></div><i>${done?'DONE':'BUILD'} →</i></a>`;
  }).join('');

  document.getElementById('coreCount').textContent=`${coreDone} / ${core.length}`;
  document.getElementById('deepCount').textContent=`${deepDone} / ${deep.length}`;
  document.getElementById('trackCount').textContent=`${trackDone} / ${track.length}`;
  const total=core.length+core.length+deep.length+track.length;
  const done=coreDone+coreLabDone+deepDone+trackDone;
  document.getElementById('overallPercent').textContent=Math.round(done/total*100)+'%';
}
document.getElementById('resetProgress')?.addEventListener('click',()=>{
  if(!confirm('确定重置当前浏览器里的全部学习进度吗？包括核心章节、Deep Dive 和 Lab Track。'))return;
  core.forEach(c=>{localStorage.removeItem(`ai-learning-ch${c.id}-done`);localStorage.removeItem(`ai-learning-lab${c.id}`)});
  deep.forEach(d=>localStorage.removeItem(`ai-learning-ch${d.id}-done`));
  track.forEach(([id])=>localStorage.removeItem(`ai-learning-tracklab-${id}`));
  render();
});
render();