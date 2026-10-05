# CHANGELOG

## 2026-10-05 · Learning Dashboard + consistency audit
- 学习进度页升级为完整 Learning Dashboard
- 统一统计 9 Core + 9 Core Labs + 8 Deep Dives + 10 Lab Track，共 36 个完成节点
- 核心章节进度从早期 00–06 补齐到 00–08
- 清理所有章节 / Deep Dive 左上角的历史发行版本号，改为稳定语义标签
- 修复主页早期“第 0 章刚上线”遗留文案
- ROADMAP 与 Learning System 文档同步到 v0.16


## 2026-10-05 · v0.16 Multimodal / Voice / Realtime AI
- 新增 Deep Dive 08《Multimodal、Voice 与 Realtime AI》
- 系统拆解 Text / Image / Audio / Video / Screen / Sensor 六种模态
- 增加 Chained Voice、Realtime Session、Live + Backend 三种 Voice Agent 架构
- 补充 Full Duplex、Barge-in、WebRTC、延迟工程与持续视觉
- 新增交互式多模态架构选择器
- 新增 Lab 10：实时多模态助手
- 增加中文多模态视频与 OpenAI / Stanford 一手资料
- 首页 Lab Track 数量从历史残留 7 关统一校正到 10 关


## 2026-10-05 · v0.15 RAG / Memory / Knowledge Systems
- 新增 Deep Dive 07《RAG、Memory 与 Knowledge Systems》
- 区分模型参数知识、当前 Context、外部 Knowledge / Memory
- 补齐 RAG Pipeline、Hybrid Retrieval、Chunking、Metadata、Rerank、ACL / Version / Provenance
- 增加 Retrieval Eval vs Answer Eval
- 新增交互式 RAG 系统成熟度诊断
- 新增 Lab 09：可信知识库 / 企业 RAG
- 增加中文 RAG 课程与 OpenAI / Anthropic / NVIDIA / RAG 原论文延伸资料


## 2026-10-05 · v0.14 AI Coding / Vibe Coding
- 新增 Deep Dive 06《AI Coding、Vibe Coding 与软件工程新范式》
- 从 Autocomplete → Chat → Vibe Coding → Agentic Coding → Parallel Agents → AI-native Software Factory 建立成熟度阶梯
- 增加 Agent-ready Repo、Spec-first、Tests as machine acceptance、权限 / blast radius 等工程方法
- 新增交互式 Agent Readiness 评分器
- 新增 Lab 08：把真实 Repo 改造成 Agent-ready
- 增加中文 AI 编程视频、Codex / Claude Code / GitHub / SWE-bench 延伸资源


## 2026-10-05 · v0.13 AI-native Organization
- 新增 Deep Dive 05《AI-native Organization》
- 用“任务”而非“岗位”作为 AI 劳动影响分析单位
- 新增人 / Copilot / Workflow / Agent 委托矩阵
- 增加初级岗位悖论、管理半径、新角色与责任模型
- 增加企业四阶段 Agent-native 迁移路径
- 接入 Deep Dive 04、第 5 章、第 6 章、资源库与节点探索


## 2026-10-05 · v0.12 Agent Economy
- 新增 Deep Dive 04《Agent：从软件工具到数字劳动力》
- 新增 Agent Anatomy 与自主性阶梯
- 新增“长任务可靠性连乘”交互实验
- 新增 Agent 单位经济性计算器
- 增加 Computer Use、Memory、Multi-Agent、生产控制面
- 增加 SaaS → Copilot → Agent → Outcome 的商业演化框架
- 接入第 4 章、第 5 章、首页、延伸阅读与节点级继续探索


## 2026-10-05 · v0.11 Hypertext Learning
- 全站增加固定右上角 AI 品牌角标
- 新增节点级「继续探索」系统
- 关键知识点提供 20 分钟 / 2 小时 / 原典三档延伸路径
- 延伸资源以独立数据 `site/resources/explore-data.json` 维护
- 覆盖核心课程 00–08 与 3 个 Deep Dive 的关键节点


## 2026-10-05 · v0.10 Business Deep Dive
- 新增 Deep Dive 03《AI 利润池、商品化与商业机会》
- 增加基础设施稀缺、模型商品化、应用护城河与 AI-native Services 分析
- 加入 2026 商业信号：投资、企业采用、Agent 部署阶段
- 第 6 章与首页接入商业深化入口

## 2026-10-05 · Frontier Radar v1
- 建立独立 `site/frontier/data.json` 数据层
- Frontier 页面改为数据驱动渲染
- 加入 90 天默认复核周期
- 加入 Fresh / Due / Stale 自动状态
- 建立历史快照规范，旧值进入 `docs/frontier/`
- 当前基线覆盖 Capability、Agent / Robotics、Economy、Infrastructure、Health / Science、Risk / Governance

## 2026-10-04 · Learning System
- 完成 AI Learning OS 框架、核心章节、Lab、进度系统与 GitHub Pages 自动部署
