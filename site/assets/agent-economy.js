function pct(x){return (x*100).toFixed(x>0.995?2:1)+'%'}
const stepSuccess=document.getElementById('stepSuccess');
const stepCount=document.getElementById('stepCount');
function renderReliability(){
  if(!stepSuccess||!stepCount)return;
  const p=Number(stepSuccess.value)/100,n=Number(stepCount.value),total=Math.pow(p,n);
  document.getElementById('stepSuccessVal').textContent=Number(stepSuccess.value).toFixed(1)+'%';
  document.getElementById('stepCountVal').textContent=n;
  document.getElementById('agentTotalSuccess').textContent=pct(total);
  document.getElementById('reliabilityFill').style.width=(total*100)+'%';
  const exp=document.getElementById('reliabilityExplain');
  exp.textContent=`如果每一步都必须成功，${n} 步连续任务的简化成功率约为 ${pct(total)}。也就是说，大约每 100 次任务中有 ${Math.round(100*(1-total))} 次至少有一步失败。`;
}
stepSuccess?.addEventListener('input',renderReliability);
stepCount?.addEventListener('input',renderReliability);
renderReliability();

const ids=['humanMinutes','taskVolume','hourlyCost','agentRunCost','reviewMinutes','agentSuccess'];
function money(v){return '¥'+Math.round(v).toLocaleString('zh-CN')}
function renderEconomics(){
  const hm=Number(document.getElementById('humanMinutes')?.value||0);
  const vol=Number(document.getElementById('taskVolume')?.value||0);
  const wage=Number(document.getElementById('hourlyCost')?.value||0);
  const run=Number(document.getElementById('agentRunCost')?.value||0);
  const review=Number(document.getElementById('reviewMinutes')?.value||0);
  const success=Number(document.getElementById('agentSuccess')?.value||0)/100;
  const base=(hm/60)*wage*vol;
  const reviewCost=(review/60)*wage*vol;
  const compute=run*vol;
  const failureRedo=(1-success)*(hm/60)*wage*vol;
  const agent=reviewCost+compute+failureRedo;
  const saving=base-agent,rate=base>0?saving/base:0;
  document.getElementById('agentSuccessVal').textContent=Math.round(success*100)+'%';
  document.getElementById('baselineCost').textContent=money(base);
  document.getElementById('agentCost').textContent=money(agent);
  document.getElementById('monthlySaving').textContent=(saving>=0?'':'−')+money(Math.abs(saving)).replace('¥','¥');
  document.getElementById('savingRate').textContent=(rate*100).toFixed(1)+'%';
  const text=rate>0.5?'在这些假设下，Agent 的经济性很强；下一步重点应验证成功率、人审需求和隐藏运维成本。':rate>0?'在这些假设下有正向节省，但空间不算巨大；可靠性或人审稍有恶化就可能吃掉收益。':'在这些假设下并不比纯人工便宜。不要因为“能自动化”就强行部署 Agent。';
  document.getElementById('econExplain').textContent=text;
}
ids.forEach(id=>document.getElementById(id)?.addEventListener('input',renderEconomics));
renderEconomics();