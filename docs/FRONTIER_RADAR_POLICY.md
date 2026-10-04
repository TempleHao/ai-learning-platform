# Frontier Radar 更新规范

Last reviewed: 2026-10-05

## 目的

Frontier Radar 只承载快速变化、会影响技术/商业/风险判断的信息。Stable Core 不依赖这些数字才能成立。

## 分类

- Capability
- Agent / Robotics
- Economy
- Infrastructure
- Health / Science
- Risk / Governance

## 每条信号必须包含

1. 日期 / 数据年份；
2. 当前值或事件；
3. 为什么重要；
4. 下一次应该观察什么；
5. 原始/权威来源。

## 更新频率

- 重大模型/政策/产业事件：事件驱动。
- 默认复核：90 天。
- 数据被新年度报告替代：更新主卡，并把旧值写入 CHANGELOG。
- 如果新数据会改变 Stable 结论：同时创建 GitHub Issue 修正文。

## 来源优先

论文 / 官方统计 / 监管 / 国际组织 / 公司一手披露 > 高质量二手研究 > 社区讨论。

## 当前基线日期

2026-10-05。
