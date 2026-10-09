# AI Learning OS

**从 AI 初学者到 AI 运用层专家的开放式学习系统。**

[在线学习平台](https://templehao.github.io/ai-learning-platform/) · [学习路线图](docs/ROADMAP.md) · [版本更新日志](CHANGELOG.md) · [内容与来源规范](docs/CONTENT_POLICY.md)

> 当前正式发布：**v0.17 · Inference Economics / Model Routing**（38 个可完成节点）。**v0.18 · AI for Science / Robotics / Physical AI 正在开发**；源稿与实验规范不代表网页已发布。请以线上页面和 CHANGELOG 为准。

## 项目是什么

AI Learning OS 是一个长期维护的中文 AI 学习项目。它把技术演进、模型能力、实际应用、系统构建、商业判断、未来趋势与风险治理连接成一条可执行的学习路径。课程以可验证的资料、可操作的实验和持续复盘为基础，帮助学习者建立独立判断和实践能力。

项目面向希望系统入门的学习者、AI 产品与业务人员、软件开发者、创业者，以及需要评估 AI 应用价值的决策者。无需先掌握完整的机器学习数学体系；技术深入程度随课程逐步提高。

## 学完之后能做什么

- 解释 AI、机器学习、深度学习、Transformer、LLM、RAG、Agent 与多模态系统的关系和局限。
- 根据任务选择模型、工具、工作流与评测方法，识别幻觉、成本、延迟和权限风险。
- 设计并验证一个具备检索、工具调用、记忆、评测和成本控制的 AI 应用原型。
- 用需求、护城河、单位经济性、基础设施和监管因素评估商业机会。
- 阅读一手研究和产品文档，区分事实、解释、假设和情景推演。

## 学习体系

| 模块 | 内容 | 已发布 |
| --- | --- | --- |
| Core | AI 全地图、技术路线、学习机制、能力与应用、方法论、商业、未来和风险 | 9 章 |
| Core Labs | 随核心章节完成的基础实验 | 9 个 |
| Deep Dive | Transformer、路线竞争、利润池、Agent、组织、AI Coding、RAG、多模态、推理经济学 | 9 个 |
| Lab Track | 从应用设计到系统评估的专项实践 | 11 关 |
| Cases | 成功与失败案例，训练迁移判断 | 20 个 |
| Review | 术语、综合题与知识复盘 | 50+ 术语、15 道综合题 |
| Frontier Radar | 能力、Agent / Robotics、经济、基础设施、科学与治理信号 | 持续更新 |

**可完成节点总数：9 Core + 9 Core Labs + 9 Deep Dive + 11 Lab Track = 38。** 案例、术语与雷达信号单独统计，避免重复计数。

## 建议学习顺序

1. **建立地图**：从 Core 00 开始，完成核心章节及配套实验。
2. **深化理解**：结合 Deep Dive 掌握模型、系统和商业分析框架。
3. **形成作品**：按 Lab Track 实施真实任务，记录输入、方法、验收标准、结果和失败点。
4. **训练判断**：研究案例，完成 Review，回看自己的结论。
5. **持续更新**：定期检查 Frontier Radar 与一手来源，修正过时认识。

可以从 [在线学习平台](https://templehao.github.io/ai-learning-platform/) 直接开始；学习进度以网站实际支持的功能为准。

## 当前进度与下一阶段

**v0.17 已发布**：模型路由、推理成本、缓存、Batch、延迟约束、单位经济性计算器，以及 Lab 11。

**v0.18 开发中**：AI for Science、World Models、Robotics、Physical AI、仿真到现实的差距、商业化分析和 Lab 12。研究源稿已入库；在线课程、交互组件和全站接线仍待完成。

**v0.19 规划中**：全站事实、来源、文风、导航、移动端、无障碍和版本一致性审校。

**v1.0 目标**：学习者可以仅依靠网站完成从入门到实战、评测与复盘的首轮完整学习闭环。

详细里程碑与验收标准：[docs/ROADMAP.md](docs/ROADMAP.md)。

## 内容如何保持可信

- **Stable**：基础原理、历史与长期有效的工程知识。
- **Frontier**：快速变化的模型、价格、能力、商业和监管信号，附日期与来源，默认 90 天复核。
- **Lab**：以实际输入、工具、验收、结果、失败和改进记录学习过程。
- 优先引用原始论文、标准、官方技术文档及原始数据；区分 Fact、Interpretation、Hypothesis 和 Scenario。
- 中文表达追求教材和工程文档的清晰度，避免空泛口号和模板式对比句。

完整标准：[docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md)。

## 版本与更新记录

项目采用语义清晰的里程碑版本号。**只有内容实际发布、入口接通并完成必要检查后，才提升正式版本**；开发中源稿不会提前计入已发布节点。

- [CHANGELOG.md](CHANGELOG.md)：面向读者的已完成更新、修复和纠错记录。
- [docs/ROADMAP.md](docs/ROADMAP.md)：当前开发状态、后续方向与完成标准。
- [GitHub Commits](https://github.com/TempleHao/ai-learning-platform/commits/main/)：每次代码与文档变更的实际记录。
- [GitHub Actions](https://github.com/TempleHao/ai-learning-platform/actions)：构建与部署状态。
- [GitHub Pages](https://templehao.github.io/ai-learning-platform/)：正式可访问内容。

维护约定：每次发布同步检查 README 当前版本、CHANGELOG、ROADMAP、网站入口、节点数量与 Pages 构建；开发阶段的实质变更也记录在 CHANGELOG，明确标注未发布状态。

## 仓库结构

- `site/`：GitHub Pages 学习界面与交互资源。
- `docs/`：课程源稿、研究资料、学习系统与工程规范。
- `docs/frontier/`：前沿信号历史快照。
- `CHANGELOG.md`：项目更新历史。
- `docs/ROADMAP.md`：路线图与版本状态。
- `docs/CONTENT_POLICY.md`：事实、来源、文风与版本规则。

## 反馈与参与

欢迎通过 [Issues](https://github.com/TempleHao/ai-learning-platform/issues) 报告事实错误、失效链接、学习障碍或提出课程建议。反馈时请提供页面链接、问题描述、可复现步骤（如适用）以及参考来源。涉及前沿能力和价格的数据，建议附官方资料及核验日期。

本项目持续建设中；课程内容供学习与研究参考，具体商业或工程决策仍需结合实际验证。

---

**Project owner:** TempleHao  
**Built collaboratively with ChatGPT.**
