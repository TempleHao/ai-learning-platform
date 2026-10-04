const sliders=[...document.querySelectorAll('[data-score]')],scoreEl=document.getElementById('opportunityScore'),textEl=document.getElementById('scoreText');
function renderScore(){
  const v={};
  sliders.forEach(s=>{v[s.dataset.score]=+s.value;s.parentElement.querySelector('b').textContent=s.value});
  const positive=v.value+v.workflow+v.data+v.distribution;
  const negative=v.absorb+v.execution;
  const raw=(positive*1.35-negative*.7);
  const score=Math.max(0,Math.min(100,Math.round((raw+4)/27*100)));
  scoreEl.textContent=score;
  textEl.textContent=score>=75?'结构上很有吸引力，但仍需验证市场规模、团队与价格。':score>=55?'存在机会，但至少有一两个关键壁垒或执行问题需要验证。':score>=35?'更像需要谨慎验证的机会，可能受模型商品化或执行成本挤压。':'当前结构偏弱：价值捕获、壁垒或执行难度可能不支持长期利润。';
}
sliders.forEach(s=>s.addEventListener('input',renderScore));renderScore();