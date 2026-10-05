# 第 4 章：从会聊天到 AI 运用层专家

## 核心公式

结果质量 ≈ 模型能力 × 上下文质量 × 工具/数据质量 × 工作流设计 × Eval 与纠错。

## Task Anatomy

先拆：输入、认知任务、外部知识、行动、验收标准、错误代价。

## Prompt vs Context

Prompt 是当前指令。Context Engineering 管理模型在当前调用里能看到的全部信息：系统规则、用户状态、文件、检索、示例、工具反馈。

## RAG

RAG 将参数化模型与可更新、可引用的外部知识结合。它适合知识会变化或需要来源的场景，但检索本身也必须被评测。

## Structured Output

下游软件需要稳定 schema，尽量消除自然语言格式漂移。

## Tool Use

实时事实、精确计算、外部行动和专用模型应通过工具完成。模型负责判断与编排，工具负责真实世界能力。

## Workflow vs Agent

固定流程优先 deterministic workflow；路径难预先穷举的开放任务再使用 Agent。Agent 本质是目标 → 推理 → 行动 → 观察 → 继续的控制循环。

## Eval

至少评测格式正确、事实正确、任务成功和业务结果。每次模型/Prompt/RAG 更新都应跑同一套回归测试。

## Production

可靠性、权限、安全、延迟、成本、可观测性决定 Demo 能否进入生产。

## Lab

把一个高频真实工作设计成模型 + Context/RAG + Tool/Workflow + Eval 的系统。

## Sources

Lewis et al. 2020 RAG; Yao et al. ReAct; Schick et al. Toolformer; Liu et al. Lost in the Middle.
