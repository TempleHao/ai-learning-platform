// Teaching model: monthly accounting period. No vendor-specific pricing assumptions.
(() => {
  const ids=['phyCapex','phyMonths','phyAttempts','phySuccess','phyRun','phyFixed','phyTakeover','phyHuman','phyFailure','phyBaseline'];
  const fields=ids.map(id=>document.getElementById(id));
  if(fields.some(el=>!el)) return;
  const out=id=>document.getElementById(id);
  const money=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:2,minimumFractionDigits:2});
  const count=n=>n.toLocaleString('zh-CN',{maximumFractionDigits:0});
  function render(){
    const [capex,months,attempts,success,run,fixed,takeover,human,failure,baseline]=fields.map(el=>Number(el.value));
    const valid=fields.every(el=>el.value.trim()!=='' && Number.isFinite(Number(el.value))) &&
      [capex,run,fixed,human,failure,baseline].every(n=>n>=0) &&
      months>=1 && attempts>=1 && success>=0 && success<=100 && takeover>=0 && takeover<=100;
    const accepted=attempts*success/100;
    if(!valid || accepted===0){
      for(const id of ['phyAccepted','phyTotal','phyUnit','phyDelta']) out(id).textContent='—';
      out('phyNote').textContent=valid?'成功任务为 0，无法计算单位成本。':'请填写有效的非负数；月数与任务数至少为 1，比例介于 0–100%。';
      return;
    }
    const depreciation=capex/months;
    const operating=attempts*run;
    const intervention=attempts*takeover/100*human;
    const failures=(attempts-accepted)*failure;
    const total=depreciation+operating+fixed+intervention+failures;
    const unit=total/accepted;
    const delta=baseline===0?null:(unit/baseline-1)*100;
    out('phyAccepted').textContent=count(accepted);
    out('phyTotal').textContent=money(total);
    out('phyUnit').textContent=money(unit);
    out('phyDelta').textContent=delta===null?'基线为 0':(delta>0?'+':'')+delta.toFixed(1)+'%';
    out('phyNote').textContent='月折旧 '+money(depreciation)+' 元 · 接管 '+money(intervention)+' 元 · 失败损失 '+money(failures)+' 元。'+(delta!==null && delta>0?' 当前假设下自动化成本高于基线。':' 请结合真实数据、风险和安全要求判断。');
  }
  fields.forEach(el=>el.addEventListener('input',render));
  render();
})();
