# AI Learning OS · Roadmap

Last reviewed: 2026-10-28

## 终极目标

从 AI 初学者成长为 **AI 运用层专家**：不仅知道模型和术语，而且能设计 AI 工作流、构建系统、判断商业价值、理解基础设施与风险，并根据新证据持续修正判断。

## 学习能力阶梯

### Level 0 · 建立地图
能解释 AI、ML、DL、Transformer、LLM、Multimodal、RAG、Agent、Robotics 的关系。

### Level 1 · 理解技术演进
用路线竞争、算法 / 数据 / 算力 / 工程约束变化解释 AI 历史，年份只作为转折坐标。

### Level 2 · 成为高阶使用者
掌握任务拆解、Context Engineering、文件、检索、结构化输出、工具、Eval、AI Coding 与实时多模态交互。

### Level 3 · 成为 Builder
能够设计 API、RAG、Memory、Tool、Workflow、Agent、Coding Agent、Voice / Realtime、权限、安全、Eval 与成本控制。

### Level 4 · 形成商业判断
能判断真实需求、AI 增益、数据 / 工作流 / 分发壁垒、单位经济性、利润池和基础模型吞噬风险。

### Level 5 · 组织与社会判断
理解 AI-native Organization、就业结构、责任、治理、风险和社会影响。

### Level 6 · 持续跟踪前沿
用 Frontier Radar、案例、年度报告和一手资料更新技术 / 商业 / 风险判断。

---

## 当前版本 · v0.18（Pages 构建成功，浏览器验收待完成）

### Core · 已完成
- 00 AI 世界全地图
- 01 AI 技术路线战争
- 02 模型为什么能学会东西
- 03 AI 能力地图与应用演进
- 04 AI 运用层专家方法论
- 05 AI 商业机会与未来情景
- 06 AI 风险与治理地图
- 07 未来情景与领先信号
- 08 风险与治理深化

### Deep Dive · 已发布
1. Neural Networks / Transformer / Scaling
2. Route Wars / AI Winter
3. AI Profit Pools
4. Agent Economy
5. AI-native Organization
6. AI Coding / Vibe Coding
7. RAG / Memory / Knowledge Systems
8. Multimodal / Voice / Realtime AI
9. Inference Economics / Model Routing
10. AI for Science / Robotics / Physical AI

### Practice · 已发布
- 12 个 Lab Track
- 20 个应用 / 失败案例
- Review / 术语 / 综合题
- 节点级“继续探索”
- 中文优先延伸阅读
- Learning Dashboard

### Frontier · 已发布
- Capability
- Agent / Robotics
- Economy
- Infrastructure
- Health / Science
- Risk / Governance
- 90 天 Fresh / Due / Stale 复核机制
- Snapshot + CHANGELOG

---

## v0.17 · Inference Economics / Model Routing · 已完成

已发布：
- Quality Gate / Latency SLO / Total Cost 三重约束
- 静态分工、规则、分类器、级联升级、高价值双检五级路由
- Small / Large / Reasoning Model 分工方法
- Cache / Batch / Flex / Background jobs
- Token economics 与上下文增长控制
- 单位任务成本、毛利、人工接管与错误损失
- 交互式路由成本计算器
- Lab 11：为真实 AI 应用建立模型路由与成本基准

## v0.18 · AI for Science / Robotics / Physical AI · Pages 构建成功，浏览器验收待完成

2026-10-24：PR #13 已合并 main（eb7e7e0），六项自动检查通过，Pages 构建和部署成功（Actions 40016502601）；修复 Lab 12 在其他页面清除本地进度时的状态刷新，并补充实际脚本回归测试。剩余：浏览器及移动端人工交互验收。

2026-10-17：PR #11 已合并至 main（710d348），集成 Deep Dive 10、Physical AI 成本计算器、Lab 12、Dashboard 40 节点、首页入口和资源库。

2026-10-18：修复 Lab Track 和 Dashboard 的跨标签页学习进度刷新，统一首页与文档版本标识。

2026-10-20：开发分支补齐章节页与章内 Lab 的跨标签页刷新，Node 模拟测试通过；相关改动于 10 月 24 日合并并完成 Pages 部署。

2026-10-19：核实 2026-10-18 [Pages 部署](https://github.com/TempleHao/ai-learning-platform/actions/runs/39138427172) 成功，上传与部署步骤均通过；新增 Physical AI 计算器、40 节点导航回归测试及 Deep Dive 10 节点级继续探索。

2026-10-21：PR #13 的 Actions 运行 39531480131 已通过 verify：静态检查、站内链接、学习进度与章节同步、Physical AI 计算器、v0.18 集成测试；PR 的部署作业按预期跳过。

2026-10-22：发现 Dashboard 的 Lab 01–11 入口只跳到列表顶部；开发分支增加实验锚点、精准导航与集成断言，随后在 CI 中通过验证并于 10 月 24 日发布。

发布验收状态：PR #13 已合并，部署前自动检查通过，Pages 新构建成功。剩余真实浏览器与移动端人工交互验收。

目标：补齐“软件智能走向科学发现和物理世界”的长期路线。

计划：
- AlphaFold / Biology / Chemistry / Materials
- World Models
- Robotics stack
- Simulation → Real world gap
- Autonomous driving
- Embodied AI
- 商业化周期与资本强度
- Lab：Physical AI / Science opportunity teardown

## 2026-10-24 · Scheme 1 品牌系统（已合并，已部署）

- 统一流线型 A 标志、AI Learning OS 字标、SVG 浏览器图标及页面入口。
- 网站深色视觉配色与蓝—青—紫渐变标志统一；首页、课程、实验与工具页保持品牌一致性。
- 新增覆盖全部 HTML 页面与公共资源引用的品牌自动回归检查；保留 40 节点及现有进度键。
- PR #14 已合并（de6e3e1），GitHub Actions 40022270852 验证与 Pages 部署均成功。后续继续桌面和手机端真实视觉验收。

## 2026-10-24 · 网站角标与浏览器图标一致性修复

- 顶部角标、浏览器标签、iOS 主屏幕图标统一到已确认的方案 1 图形；独立的透明图标资源避免旧 SVG 和贴底板效果。
- 防止旧 JavaScript 缓存再次插入黑底角标；兼容 32 个页面与移动端导航。
- 图标路径、像素、透明度、旧角标清理和站内链接进入自动检查；PR 合并与部署以 GitHub Actions 结果为准。

## 2026-10-24 · Scheme 1 视觉还原修复（已合并、已部署）

- 参考图原始丝带标志透明化，所有可见品牌位统一图片素材；彻底移除深色底板悬浮贴图。
- 首页重做字标与英文标语组合，缩小图标与页面留白偏差。
- 32 个页面的品牌资源、缓存更新、课程进度、链接及其他回归检查通过；PR #15 已合并（2743067），Pages 发布作业 40024942348 成功。桌面 / 390px 手机布局已做本地试渲染，线上真实设备仍可继续视觉验收。

## 2026-10-24 · v0.18 学习进度可靠性维护

- Dashboard 增加本地 JSON 备份与恢复入口，允许在换设备或清理浏览器数据前迁移 40 个节点的完成状态。
- 导入前明确提示覆盖，使用节点白名单校验文件，不影响其他站点数据；同标签页导入后立即刷新 Dashboard。
- 增加自动化回归测试并纳入 Pages 发布前验证；不增加课程节点或提升正式版本。[PR #17](https://github.com/TempleHao/ai-learning-platform/pull/17) 已合并（e346dec），[main 的 Actions 40054414831](https://github.com/TempleHao/ai-learning-platform/actions/runs/40054414831) 验证与 Pages 部署均成功；真实浏览器和移动端下载 / 导入验收仍待完成。

## 2026-10-27 · 本机阅读书签与续学闭环
- 2026-10-26 已完成按章节完成键进入第一未完成章节的首页入口。
- 本轮为 Core 与 Deep Dive 新增最近阅读小节书签，首页分设“继续上次阅读”与“下一未完成章”，并覆盖异常数据与禁用存储回退。
- 书签只保存小节锚点（非像素级滚动位置），不增加或更改 40 节点计数；重置学习进度会清除书签。
- 2026-10-28：新增 JSON v2 书签备份迁移（兼容旧 v1）、导入书签一致性策略及恶意数据回归测试；[PR #22](https://github.com/TempleHao/ai-learning-platform/pull/22) 已合并，[Actions 40617724248](https://github.com/TempleHao/ai-learning-platform/actions/runs/40617724248) 验证与 Pages 部署成功。
- 未完成：真实桌面 / 移动端交互验收、跨设备自动同步、课程事实与外链全面审校。

## v0.19 · Content Audit

2026-10-31 Core 00 概念边界审校：把 AI ⊃ ML ⊃ DL 的方法包含关系与基础模型/LLM 的交叉分类分开解释，增加四个模型—系统诊断案例和 12 分钟练习验收；2026 AI Index 的 OSWorld、家庭机器人与组织采用率注明各自口径及原始来源。新增 Node 静态回归并接入 verify，保留 v0.18/40 节点、完成键、书签与 JSON v1/v2。真实浏览器和移动端验收仍待完成；发布以 main deploy 成功为准。

2026-10-30 Core 02 深度审校：以既有 Mini Lab 的五组样本、学习率 0.08 为基准，新增可复算的首步梯度（−12）、权重（−0.04）和损失（8.3232），并用训练集零误差但测试预测分歧的反例解释泛化。补充按时间切分商户拒付数据、标签延迟和数据泄漏的迁移练习；同步 docs/chapters/02 源稿、课程目录及 Node 回归，纳入 verify。维持 v0.18/40 节点及进度键；真实浏览器与其余 Core 章节的逐课审校仍待完成。部署状态以本次 PR 合并后的 main workflow 为准。

目标：停止扩张，系统审校。

2026-10-29 本机存储异常审校（PR #23 已合并，Pages 已部署）：修复首页章内 Lab 复选框在 Local Storage 被禁用时中断后续续学入口初始化，以及课程完成控件在读取/写入被拒绝时缺少可靠反馈的问题。补充模拟拒绝读取与写入的自动回归；不修改学习节点、完成键、书签或备份格式。PR #23 通过 verify（run 40879066691），合并提交 153ff9b 的 main verify / deploy 均成功（run 40879133281）；真实浏览器验收仍待完成。

2026-10-26 导航无障碍修复：首页和 Core / Deep Dive 课程移动菜单增加键盘焦点隔离、ARIA 展开状态、Escape 返回焦点与响应式恢复；新增自动回归测试并纳入部署前验证。真实手机 / 屏幕阅读器验收仍待完成，合并和 Pages 上线以 Actions 为准。

2026-10-25 发布流程补强：主分支部署曾遇 GitHub ID Token 请求超时，重试触发同名 Pages artifact 冲突；工作流已改为按运行尝试编号命名 artifact。需要核实修复后的 Pages 部署作业，不将 CI 成功等同于上线。

2026-10-25 首轮进度页审校：增加 9 个章内 Lab 独立完成计数，统一 40 节点口径；改善 Dashboard 手机端字号、布局、对比度、触控与键盘焦点，并将断言加入现有 CI。属于 v0.18 维护和 v0.19 审校准备，完整内容审校、真实设备验收尚未完成。

- 核心概念重复 / 冲突检查
- 事实与数据来源复核
- 失效链接检查
- 中文资源质量筛选
- 页面导航一致性
- 移动端可读性
- 无障碍与语义 HTML
- 版本号 / 计数 / 状态统一

## v1.0 · First Complete Learning Loop

首个完整版本完成标准：

1. Core 00–08 内容审校完成
2. Deep Dive 第一批体系完整
3. Lab 能形成连续作品集
4. Learning Dashboard 能覆盖主干、深化、实战
5. 每个关键节点有继续探索
6. Frontier Radar 有可持续更新机制
7. 所有页面导航 / 品牌 / 移动端统一
8. 无明显死链、过时状态和版本漂移
9. README / ROADMAP / Learning System 与线上状态一致
10. 学习者可以从 0 开始，仅靠网站完成一轮系统学习
