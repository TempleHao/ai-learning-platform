# AI Learning OS · Learning System

Last reviewed: 2026-10-05

## 设计目标

这是一套持续循环的学习系统：

**建立地图 → 深化节点 → 动手构建 → 做题复盘 → 看真实案例 → 更新前沿判断 → 回到地图修正认知**

## 1. Core Path

Core 00–08 负责建立稳定知识骨架。

每章包含：
- 核心概念
- 技术 / 商业 / 风险视角
- Sources
- 章内 Lab
- 自测
- 完成状态
- 延伸阅读
- 节点级继续探索

完成章节只代表“第一遍读过”，不代表真正掌握。

## 2. Deep Dive

Deep Dive 用于把高价值节点向下钻。

特点：
- 不要求严格按编号学习
- 原理 + 工程 + 商业 / 风险
- 交互组件
- 一手来源
- 中文优先延伸资源
- 可独立标记完成

## 3. Lab Track

当前 10 关：

1. Context Engineering
2. Structured Output
3. RAG
4. Tool + Workflow
5. Eval
6. Agent
7. Capstone AI Product
8. AI Coding / Agent-ready Repo
9. Knowledge Systems / Trusted RAG
10. Multimodal / Realtime Assistant

每个 Lab 必须：
- 有真实问题
- 有 Baseline
- 有可验证产物
- 有失败记录
- 有 Eval / 验收标准
- 有复盘

## 4. Cases

案例库用于训练迁移判断。

分析公司时，统一拆解：
- 新增了什么能力
- 替代了什么成本
- 为什么当时可行
- 壁垒在哪里
- 为什么会失败 / 受限
- 是否可迁移到其他行业

## 5. Extended Reading

两层资源系统：

### Chapter Resources
每章末尾精选 3–6 个资源：
- 中文视频优先
- 一手资料优先
- 标注优先 / 进阶 / 原典

数据：
`site/resources/data.json`

### Continue Exploring
重要知识节点旁边按：
- 20 分钟
- 2 小时
- 原典 / 一手资料

提供下钻路径。

数据：
`site/resources/explore-data.json`

## 6. Frontier Radar

Stable Core 不跟热点跑。

快速变化的信息放在 Frontier：
- 能力
- Agent / Robotics
- 商业
- 基础设施
- Health / Science
- Risk / Governance

默认 90 天复核，并保留历史快照。

## 7. Review

Review 负责主动回忆和迁移检验，避免用重复阅读替代真正掌握。

目标：
- 用自己的话解释
- 比较相邻概念
- 判断真实场景
- 把新信息放回知识地图

## 8. Learning Dashboard

`site/progress.html` 使用当前浏览器 Local Storage，统一统计：

- 9 Core Chapters
- 9 Core Labs
- 8 Deep Dives
- 10 Lab Track

共 36 个当前可完成节点。

不上传个人学习数据。

## 完成标准

真正完成一个主题至少经过：

1. Read — 阅读
2. Explain — 用自己的话复述
3. Explore — 至少看一个下钻资源
4. Build — 做 Lab / 应用
5. Evaluate — 定义成功与失败
6. Review — 隔一段时间主动回忆
7. Update — 新证据出现后修正判断

这七步才构成 AI Learning OS 的完整学习循环。
