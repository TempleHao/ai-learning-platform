# Frontier Radar 更新规范

Last reviewed: 2026-10-05

## 目的
Frontier Radar 只承载快速变化、会影响技术 / 商业 / 风险判断的信息。Stable Core 不依赖这些数字才能成立。

## 数据架构
前沿卡片不直接写死在 HTML。统一维护：
- `site/frontier/data.json`：当前有效信号
- `site/frontier/index.html`：展示壳
- `site/assets/frontier.js`：渲染、筛选与过期提示
- `docs/frontier/`：历史快照
- `CHANGELOG.md`：重大变化记录

每条 signal 必须包含：唯一 id、domain、数据时期、当前值/事件、summary、为什么重要、下一次观察点、原始/权威来源。

## 更新频率
- 重大模型 / 政策 / 产业事件：事件驱动
- 默认复核：90 天
- 页面根据 `reviewed_at` 自动显示 Fresh / Due / Stale
- 数据被新年度报告替代：更新主卡，并把旧值写入历史快照与 CHANGELOG
- 如果新数据会改变 Stable 结论：同时创建 GitHub Issue 修正文

## 来源优先
论文 / 官方统计 / 监管 / 国际组织 / 公司一手披露 > 高质量二手研究 > 社区讨论

## 当前基线日期
2026-10-05
