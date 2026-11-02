// Core 03: hypothetical per-ticket unit economics. No learning-state writes.
const autoRate = document.getElementById('capAutoRate');
const errorRate = document.getElementById('capErrorRate');
const baseline = document.getElementById('capBaselineCost');
const aiCost = document.getElementById('capAICost');
const savings = document.getElementById('capNetSavings');
const explanation = document.getElementById('capCostExplanation');
const autoValue = document.getElementById('capAutoRateValue');
const errorValue = document.getElementById('capErrorRateValue');
function renderCapabilityEconomics() {
  if (!autoRate || !errorRate || !baseline || !aiCost || !savings || !explanation || !autoValue || !errorValue) return;
  const p = Number(autoRate.value) / 100;
  const e = Number(errorRate.value) / 100;
  const labor = 1000 * (4 * p + 14 * (1 - p)); // 60 yuan/hour = 1 yuan/minute
  const model = 1000 * 0.6;
  const errorLoss = 1000 * p * e * 100;
  const total = labor + model + errorLoss;
  const delta = 12000 - total;
  const fmt = n => Math.round(n).toLocaleString('en-US');
  autoValue.textContent = autoRate.value + '%';
  errorValue.textContent = errorRate.value + '%';
  baseline.textContent = '12,000 元';
  aiCost.textContent = fmt(total) + ' 元';
  savings.textContent = (delta >= 0 ? '+' : '−') + fmt(Math.abs(delta)) + ' 元';
  explanation.textContent = '人工 ' + fmt(labor) + ' 元 + 模型 600 元 + 预期错误损失 ' + fmt(errorLoss) + ' 元；' + (delta >= 0 ? '相对全人工节省 ' : '相对全人工多支出 ') + fmt(Math.abs(delta)) + ' 元。';
}
if (autoRate && errorRate) {
  autoRate.addEventListener('input', renderCapabilityEconomics);
  errorRate.addEventListener('input', renderCapabilityEconomics);
  renderCapabilityEconomics();
}
