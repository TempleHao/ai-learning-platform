const riskOpts=[...document.querySelectorAll('[data-risk]')],score=document.getElementById('riskScore'),advice=document.getElementById('riskAdvice');
const weights={autonomy:1,write:2,sensitive:1,scale:2,irreversible:2,highstakes:2};
function renderRisk(){
  const total=riskOpts.filter(x=>x.checked).reduce((s,x)=>s+weights[x.dataset.risk],0);
  let label='LOW',msg='保持基本日志、数据最小化和输出检查。';
  if(total>=7){label='CRITICAL';msg='不要直接全自动部署：需要最小权限、强校验、人类审批、完整日志、回滚/停止机制和专门红队测试。'}
  else if(total>=4){label='HIGH';msg='应加入权限隔离、结构化校验、明确审批点、回归 Eval 和异常停止条件。'}
  else if(total>=2){label='MEDIUM';msg='至少建立 Eval、敏感数据规则、工具白名单与可追踪日志。'}
  score.textContent=label;advice.textContent=msg;
}
riskOpts.forEach(x=>x.addEventListener('change',renderRisk));renderRisk();