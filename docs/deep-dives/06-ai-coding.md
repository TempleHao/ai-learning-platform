# Deep Dive 06：AI Coding、Vibe Coding 与软件工程新范式

## 核心命题

AI Coding 已从 autocomplete / chat 发展到 agentic software engineering。人的瓶颈逐步从“亲手写代码”迁移到任务定义、Context、验收、Review、权限和架构。

## 成熟度阶梯

1. Autocomplete
2. Chat Coding
3. Vibe Coding
4. Agentic Coding
5. Parallel Agents
6. AI-native Software Factory

## Vibe Coding

优势：自然语言变接口、反馈周期短、探索成本下降、长尾软件变得经济可行。

风险：需求漂移、上下文丢失、重复实现、隐性回归、安全债务、不可解释技术债。

## Agent-friendly Repository

- README / Mission
- AGENTS.md / Instructions
- 架构图 / 目录说明
- Tests / Lint / Typecheck / Eval
- Issues / ADR / Changelog

## Spec-first

Goal → Constraints → Acceptance → Plan → Execute。

## Testing

测试在 Agent 时代不仅是质量工具，也是机器可读取的验收语言。

## Human Review

AI 更适合执行；人更适合需求、架构、风险、异常、体验与最终责任。

## Security

随着 Agent 获得 Shell、数据库、云和生产环境权限，核心问题变为限制 blast radius。

## Parallel Agents

并行 Agent 将新瓶颈推向任务拆解、Context、测试、Review、冲突合并和成本治理。

## 非程序员 Builder

重点学习系统感：前后端、数据、API、状态、权限、测试、日志、版本控制。

## Lab

把一个真实 Repo 改造成 Agent-ready，并让 Coding Agent 在明确 Spec 和自动验收下完成一个真实 Issue。

## Sources

OpenAI Codex 2026; Anthropic Claude Code 2026; GitHub Copilot Agent Mode; SWE-bench Verified.
