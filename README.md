# AI Learning OS

**从 AI 初学者到 AI 运用层专家的开放式学习系统。**

[在线学习平台](https://templehao.github.io/ai-learning-platform/) · [学习路线图](docs/ROADMAP.md) · [版本更新日志](CHANGELOG.md) · [内容与来源规范](docs/CONTENT_POLICY.md)

> 当前版本：**v0.18 · AI for Science / Robotics / Physical AI**（40 个学习节点）。2026-10-28 的 [GitHub Pages 发布](https://github.com/TempleHao/ai-learning-platform/actions/runs/40617724248) 已成功，自动回归检查通过；真实浏览器和移动端验收仍待完成。

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
| Deep Dive | Transformer、路线竞争、利润池、Agent、组织、AI Coding、RAG、多模态、推理经济学、科学 AI 与实体智能 | 10 个 |
| Lab Track | 从应用设计到系统评估的专项实践 | 12 关 |
| Cases | 成功与失败案例，训练迁移判断 | 20 个 |
| Review | 术语、综合题与知识复盘 | 50+ 术语、15 道综合题 |
| Frontier Radar | 能力、Agent / Robotics、经济、基础设施、科学与治理信号 | 持续更新 |

**可完成节点总数：9 Core + 9 Core Labs + 10 Deep Dive + 12 Lab Track = 40。** 案例、术语与雷达信号单独统计，避免重复计数。

**Pages 部署重试修复（2026-10-25）**：本次 Dashboard 修改已通过 PR 验证；首次主分支发布在 GitHub Pages 身份令牌请求阶段超时，重试又遇到同一 workflow run 内重复的 `github-pages` artifact。部署工作流现按 `github.run_attempt` 为每次尝试分配独立的上传与部署 artifact 名称，避免重试时发生同名冲突。以最新 Actions 的 `deploy` 结果判断是否已上线。

**Dashboard 计数与可读性（2026-10-25 维护）**：学习进度页分别展示 9 核心章节、9 章内 Lab、10 Deep Dive、12 专项 Lab 的完成数，整体百分比按 40 个节点计算。移动端统计卡片改为响应式排列，正文、状态文字和键盘焦点更易辨认；学习数据结构与完成键保持不变。真实手机浏览器的视觉与交互验收仍待完成。

**进度备份与迁移（2026-10-28）**：Learning Dashboard 的 JSON v2 备份包含 40 个学习节点的完成状态及可选最近阅读小节，兼容旧版 v1 进度文件。导入前会确认覆盖本机完成状态与书签；v1 没有书签，恢复时会清除原有书签以避免误导。文件不会上传服务器，换设备时需手动导出、导入。

**本机存储异常保护（2026-10-29，已合并并部署）**：首页章内 Lab 复选框与课程完成控件在浏览器拒绝读取或写入 Local Storage 时提供明确的禁用或失败提示，避免误报完成；阅读正文与静态课程入口仍可使用。原有 40 节点键和 JSON v1/v2 备份格式保持不变。

**本机学习记忆（2026-10-27）**：Core 00–08 与 Deep Dive 01–10 自动记录最近阅读的课程和小节（本地书签）；首页分别提供“继续上次阅读”和“下一未完成章”，没有书签时按既有完成记录选择下一章。书签保存在当前浏览器，可随新版 JSON 备份手动迁移，不改变 40 个完成节点。重置本机全部进度时会清除书签。浏览器禁用存储时保留静态课程入口。书签定位到小节，不保证精确到段落或滚动像素；跨设备同步与真实手机验收仍待完成。

## 建议学习顺序

1. **建立地图**：从 Core 00 开始，完成核心章节及配套实验。
2. **深化理解**：结合 Deep Dive 掌握模型、系统和商业分析框架。
3. **形成作品**：按 Lab Track 实施真实任务，记录输入、方法、验收标准、结果和失败点。
4. **训练判断**：研究案例，完成 Review，回看自己的结论。
5. **持续更新**：定期检查 Frontier Radar 与一手来源，修正过时认识。

可以从 [在线学习平台](https://templehao.github.io/ai-learning-platform/) 直接开始；学习进度以网站实际支持的功能为准。

## 品牌视觉 · 方案 1

2026-10-24 角标专项修复：浏览器标签改用从方案 1 原始图形制作的 **64px 透明 PNG**（`favicon-scheme1-v3.png`），iPhone 主屏幕采用 **180px 专用图标**（`apple-touch-scheme1-v3.png`）。全站 32 页使用新的文件名避免沿用旧缓存；页面右上角加入同一原图的 **透明标志**，移除可能由旧脚本产生的黑底角标。新增逐页检查和角标挂载回归测试，不改动课程内容、学习记录或原有进度键。



2026-10-24 品牌复核：旧版矢量图与确认稿的丝带折叠结构存在偏差，且部分 JavaScript 仍额外插入带底板的悬浮角标。新版直接从已确认的方案 1 原稿提取透明底主体图形，存为 `site/assets/brand/logo-scheme1.webp`（作为全站可见 Logo），保留 `logo-mark.svg` 和同内容的 `app-icon.svg` 作为无底板矢量备用 / 浏览器标签图标。首页采用参考方案的横向 AI Learning OS 字标及 `LEARN TODAY. BUILD TOMORROW.` 标语。取消悬浮黑底徽标，为 HTML、样式表和图标资源增加新的资源地址，降低浏览器旧缓存影响。**仅更新视觉，不改变现有课程、数据或完成状态。** [PR #15](https://github.com/TempleHao/ai-learning-platform/pull/15) 已合并，[GitHub Pages 发布](https://github.com/TempleHao/ai-learning-platform/actions/runs/40024942348) 的全站校验与部署均成功；本地桌面与 390px 手机布局试渲染无横向溢出，线上仍可继续细化视觉体验。

## 当前进度与下一阶段

**v0.17 历史版本**：模型路由、推理成本、缓存、Batch、延迟约束、单位经济性计算器，以及 Lab 11。

**v0.18 已部署（浏览器验收待完成）**：Deep Dive 10、Physical AI 成本计算器、Lab 12、40 节点 Dashboard、分层延伸阅读及跨标签页进度同步均已发布。2026-10-24，PR #13 合并至主分支，包含 Lab 01–11 精准导航、部署前自动检查和课程进度修复；随后补齐 Lab 12 在其他标签页清空学习进度时的同步修复。[Pages 构建与部署](https://github.com/TempleHao/ai-learning-platform/actions/runs/40054414831) 已成功，真实浏览器和移动端人工验收仍待完成。

**v0.19 内容深度审校（2026-10-31）**：Core 00《AI 世界全地图》修正基础模型与大语言模型的交叉分类，新增四例分类诊断和明确的学习验收标准；核对 Stanford CRFM 与 2026 AI Index 原始来源，补充三项前沿指标的任务、样本与口径边界。新增 Core 00 自动内容/导航/进度键回归检查，维持 v0.18 / 40 节点。真实浏览器验收待完成。

**v0.19 内容深度审校（2026-10-30）**：Core 02《模型为什么能学会东西》增加与网页训练器完全对应的梯度下降手算、学习率过大反例、训练/验证/测试划分及数据泄漏诊断；新增 Node 算例回归并纳入 PR / main verify。该改动不增加学习节点，不修改本地进度或 JSON 备份格式。是否正式上线以本次 main 的 Pages deploy 为准。

**v0.19 审校进行中**：已补充 Dashboard 计数 / 移动端可读性，以及首页和 Core / Deep Dive 移动导航的键盘、ARIA 和焦点管理回归测试；事实、来源、文风、全站无障碍及真实设备验收仍待完成。导航修复合并与部署以 Actions 结果为准。

**v1.0 目标**：学习者可以仅依靠网站完成从入门到实战、评测与复盘的首轮完整学习闭环。

详细里程碑与验收标准：[docs/ROADMAP.md](docs/ROADMAP.md)。

## 内容如何保持可信

- **Stable**：基础原理、历史与长期有效的工程知识。
- **Frontier**：快速变化的模型、价格、能力、商业和监管信号，附日期与来源，默认 90 天复核。
- **Lab**：以实际输入、工具、验收、结果、失败和改进记录学习过程。
- 优先引用原始论文、标准、官方技术文档及原始数据；区分 Fact、Interpretation、Hypothesis 和 Scenario。
- 中文表达追求教材和工程文档的清晰度，避免空泛口号和模板式对比句。

完整标准：[docs/CONTENT_POLICY.md](docs/CONTENT_POLICY.md)。

## 本地回归检查

仓库根目录需要 Node.js 22 或更新版本。部署前可以运行：

```bash
node scripts/test-progress-sync.mjs
node scripts/test-reading-memory.mjs
node scripts/test-mobile-navigation.mjs
node scripts/test-progress-backup.mjs
node scripts/test-physical-ai.mjs
node scripts/test-v018-integration.mjs
node scripts/check-site-links.mjs
node scripts/test-branding.mjs
```

这些脚本分别检查学习进度、移动导航键盘与焦点、JSON 备份与恢复、Physical AI 成本模型、40 节点集成（含 Lab 12 跨标签页清空进度的回归测试）和站内链接。自动校验已接入 GitHub Pages 部署前的验证步骤；真实浏览器与移动端仍需单独验收。

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
