const scoreInputs=[...document.querySelectorAll('[data-coding-score]')];
function renderCodingScore(){
  if(!scoreInputs.length)return;
  const v={};
  scoreInputs.forEach(i=>{v[i.dataset.codingScore]=Number(i.value);i.parentElement.querySelector('b').textContent=i.value});
  const positive=(v.spec+v.tests+v.context+v.architecture+v.reversible)/25;
  const penalty=(v.risk-1)/4;
  const raw=Math.max(0,Math.min(1,positive*.88-penalty*.28+.12));
  const score=Math.round(raw*100);
  let mode,reason;
  if(score>=82){mode='Long-running Agent';reason='规格、验证和仓库 Context 已较成熟，可以把较完整的工程任务交给 Agent，并通过 PR / 测试 / Review 控制风险。';}
  else if(score>=65){mode='Agentic Coding';reason='适合让 Agent 跨文件执行任务，但要保留人工 Plan Review 和最终合并。优先继续补测试与仓库级 Context。';}
  else if(score>=42){mode='Guided Vibe Coding';reason='AI 很适合加速原型和局部功能，但复杂改动仍应由人拆任务、限制范围并逐步验收。';}
  else{mode='Human-led + Copilot';reason='当前项目缺少足够机器可读的验收和边界。先改善测试、文档、架构和回滚能力，再提高 Agent 自主权。';}
  document.getElementById('codingMode').textContent=mode;
  document.getElementById('codingScore').textContent=score+' / 100';
  document.getElementById('codingReason').textContent=reason;
}
scoreInputs.forEach(i=>i.addEventListener('input',renderCodingScore));renderCodingScore();

const labBoxes=[...document.querySelectorAll('[data-coding-lab]')];
function renderCodingLab(){
  let done=0;
  labBoxes.forEach(b=>{const k='ai-learning-coding-lab-'+b.dataset.codingLab;b.checked=localStorage.getItem(k)==='1';if(b.checked)done++});
  const n=document.getElementById('codingLabProgress'),bar=document.getElementById('codingLabBar');
  if(n)n.textContent=done+' / '+labBoxes.length;
  if(bar)bar.style.width=(done/labBoxes.length*100)+'%';
}
labBoxes.forEach(b=>b.addEventListener('change',()=>{localStorage.setItem('ai-learning-coding-lab-'+b.dataset.codingLab,b.checked?'1':'0');renderCodingLab()}));renderCodingLab();