// Core 01 教学用成本敏感性实验；不读写学习进度或本机存储。
const rejectCost = document.getElementById('falseRejectCost');
const missedLoss = document.getElementById('missedFraudLoss');
const rejectLabel = document.getElementById('falseRejectCostValue');
const missedLabel = document.getElementById('missedFraudLossValue');
const costs = document.getElementById('routeCostResult');
const choice = document.getElementById('routeChoiceResult');
function updateRouteChoice() {
  if (!rejectCost || !missedLoss || !rejectLabel || !missedLabel || !costs || !choice) return;
  const C = Number(rejectCost.value);
  const L = Number(missedLoss.value);
  const rule = 40 * L + 300 * C + 2000;
  const model = 20 * L + 500 * C + 8000;
  rejectLabel.textContent = C + ' 元';
  missedLabel.textContent = L + ' 元';
  costs.textContent = '规则方案：' + rule.toLocaleString('zh-CN') + ' 元；统计模型：' + model.toLocaleString('zh-CN') + ' 元。';
  choice.textContent = rule === model ? '当前假设：两方案总损失相同。' : '当前假设：' + (rule < model ? '规则方案' : '统计模型') + '总损失更低。';
}
rejectCost?.addEventListener('input', updateRouteChoice);
missedLoss?.addEventListener('input', updateRouteChoice);
updateRouteChoice();
