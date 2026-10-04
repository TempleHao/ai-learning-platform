# 第 5 章：从 Prompt 用户到 AI 系统设计者

成熟度路线：
Prompt → Context Engineering → RAG → Tool Use → Workflow → Agent → Eval → Guardrails → Cost / Routing。

核心判断：
AI 运用层专家不是更会写 Prompt，而是能够把模型能力转化为可重复业务结果。

工程原则：
- 缺事实时用检索，不靠 Prompt 硬猜
- 精确计算和实时状态交给工具
- 步骤明确时优先 Workflow
- 路径动态时再引入 Agent
- 没有 Eval 就无法做工程迭代
- 高风险动作使用最小权限、人审、日志与回滚
- 成熟系统需要考虑单位经济性和模型路由

Lab：
把一个真实工作任务改造成包含输入、上下文、工具、Eval 和权限边界的 AI Workflow。
