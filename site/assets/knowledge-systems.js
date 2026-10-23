const ragInputs=[...document.querySelectorAll('[data-rag-score]')];
function renderRagScore(){
  if(!ragInputs.length)return;
  const v={};ragInputs.forEach(i=>{v[i.dataset.ragScore]=Number(i.value);i.parentElement.querySelector('b').textContent=i.value});
  const score=Math.round((v.retrieval+v.freshness+v.metadata+v.provenance+v.faithfulness+v.eval)/30*100);
  let mode,reason;
  const min=Object.entries(v).sort((a,b)=>a[1]-b[1])[0][0];
  const names={retrieval:'检索命中率',freshness:'文档新鲜度',metadata:'Metadata / 权限',provenance:'来源追踪',faithfulness:'答案忠实度',eval:'Eval'};
  if(score>=82){mode='Production Knowledge Layer';reason='整体基础较成熟。下一步重点看规模、延迟、成本、权限审计和持续数据质量。';}
  else if(score>=65){mode='Reliable RAG';reason='已经能支撑真实工作，但最弱项是「'+names[min]+'」。先补这个瓶颈，比盲目换更强模型更有效。';}
  else if(score>=42){mode='Prototype RAG';reason='适合内部试用和低风险问答，但距离托管业务流程还有明显差距。当前优先修「'+names[min]+'」。';}
  else{mode='Search Demo';reason='系统更像“能搜到一点东西的聊天 Demo”。先建立真实问题集、正确证据标注和权限 / 版本治理。';}
  document.getElementById('ragMode').textContent=mode;document.getElementById('ragScore').textContent=score+' / 100';document.getElementById('ragReason').textContent=reason;
}
ragInputs.forEach(i=>i.addEventListener('input',renderRagScore));renderRagScore();
const labs=[...document.querySelectorAll('[data-knowledge-lab]')];
function renderKnowledgeLab(){let d=0;labs.forEach(b=>{const k='ai-learning-knowledge-lab-'+b.dataset.knowledgeLab;b.checked=localStorage.getItem(k)==='1';if(b.checked)d++});const n=document.getElementById('knowledgeLabProgress'),bar=document.getElementById('knowledgeLabBar');if(n)n.textContent=d+' / '+labs.length;if(bar)bar.style.width=(d/labs.length*100)+'%'}
labs.forEach(b=>b.addEventListener('change',()=>{localStorage.setItem('ai-learning-knowledge-lab-'+b.dataset.knowledgeLab,b.checked?'1':'0');renderKnowledgeLab()}));renderKnowledgeLab();