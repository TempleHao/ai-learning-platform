# Deep Dive 04：Agent——从软件工具到数字劳动力

## 核心定义
Agent = 围绕目标，根据当前状态动态选择下一步行动、调用工具并根据结果继续执行的 AI 系统。

## Agent Anatomy
Goal / Context / Model / Tools / Memory & State / Loop / Eval / Guardrails。

## 自主性阶梯
Chat → Copilot → Workflow → Agent → Long-running Agent → Delegated Worker。

## Workflow vs Agent
能预定义流程时优先 Workflow；只有路径难穷举时才把更多决策权交给 Agent。成熟系统常用外层 Workflow + 内层 Agent。

## 可靠性
长任务由多个依赖步骤组成。即使单步成功率很高，总体任务成功率也会随步骤累积而下降，因此需要检查点、重试、恢复、预算与 human handoff。

## Tool / Computer Use
API / function tool 更结构化、可控；Computer Use 能覆盖无 API 遗留软件，但更脆弱，也更需要审批和状态验证。

## Memory
区分 Working / Episodic / Semantic / Business State，不把所有“记忆”都塞进模型上下文。

## Multi-Agent
只有当工具、权限、上下文或评测标准明显不同，才值得拆成多 Agent。

## Production Control Plane
Identity / Permission / Approval / Trace / Eval / Budget / Recovery / Audit。

## Agent Unit Economics
完全成本 = 模型与工具 + 人审 + 失败重做 + 集成与运维 + 错误外部性。

## Agent Economy
SaaS（卖工具）→ Copilot（卖增强生产率）→ Agent（卖任务）→ Outcome（卖结果）。
如果成立，AI 软件将从 IT 预算进入人工、BPO、外包和服务预算。

## 2026 Frontier
Stanford AI Index 2026：
- OSWorld 最佳 Agent 约 66.3%
- 88% 受访组织报告使用 AI
- 多数业务职能 Agent 部署仍处个位数

## Sources
OpenAI agent guide / Agents SDK / Computer Use / Guardrails; Anthropic Building Effective Agents; Stanford AI Index 2026.
