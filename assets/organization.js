const inputs=[...document.querySelectorAll('[data-delegate]')];
function renderDelegation(){
  if(!inputs.length)return;
  const v={};
  inputs.forEach(i=>{v[i.dataset.delegate]=Number(i.value);i.parentElement.querySelector('b').textContent=i.value});
  const positive=(v.structure+v.measurable+v.access)/15;
  const negative=(v.risk+v.exceptions+v.tacit)/15;
  const raw=Math.max(0,Math.min(1,0.5+(positive-negative)*0.75));
  const score=Math.round(raw*100);
  let mode,reason;
  if(score>=78 && v.risk<=3){mode='Agent / Workflow 托管';reason='结构和验收条件较好，风险也在可控范围。可以尝试让系统承担更多执行权，但仍要设置预算、检查点和异常接管。';}
  else if(score>=60){mode='Workflow + Agent';reason='适合部分动态决策，但不建议完全开放。用固定 Workflow 约束阶段，在局部节点让 Agent 选择路径。';}
  else if(score>=40){mode='Copilot + Human';reason='AI 可以显著辅助，但当前条件下更适合由人掌握最终决策与执行权。先做 Context、草稿、检索或分析增强。';}
  else{mode='Human-led';reason='错误、长尾或隐性知识占比太高。先改善数据、流程和验收机制，再考虑更高自动化。';}
  document.getElementById('delegationMode').textContent=mode;
  document.getElementById('delegationScore').textContent=score+' / 100';
  document.getElementById('delegationReason').textContent=reason;
}
inputs.forEach(i=>i.addEventListener('input',renderDelegation));
renderDelegation();