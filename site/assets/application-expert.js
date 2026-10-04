const opts=[...document.querySelectorAll('[data-arch]')],stack=document.getElementById('archStack'),reason=document.getElementById('archReason');
function renderArch(){
  const on=new Set(opts.filter(x=>x.checked).map(x=>x.dataset.arch));
  const parts=['LLM'];
  const why=['基础生成/理解'];
  if(on.has('current')){parts.push('RAG / Search / Data');why.push('补充实时或私有知识')}
  if(on.has('machine')){parts.push('Structured Output');why.push('让结果可被程序稳定消费')}
  if(on.has('action')){parts.push('Tools / APIs');why.push('执行真实外部动作')}
  if(on.has('repeat')){parts.push('Deterministic Workflow');why.push('固定高频流程优先确定性编排')}
  if(on.has('dynamic')){parts.push('Agent Loop');why.push('让模型动态选择下一步')}
  if(on.has('highrisk')){parts.push('Validation + Human Approval');why.push('高错误代价需要校验与人工闸门')}
  parts.push('Eval');
  stack.innerHTML=parts.map((p,i)=>`<span>${i? '→ ':''}${p}</span>`).join('');
  reason.textContent='为什么：'+why.join('；')+'。无论哪种架构，都建议保留可重复的 Eval。';
}
opts.forEach(o=>o.addEventListener('change',renderArch));renderArch();