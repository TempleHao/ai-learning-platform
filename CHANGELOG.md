# CHANGELOG

## 2026-10-26 · Mobile navigation keyboard and accessibility audit (v0.18 maintenance / v0.19)
- 修复首页与 Core / Deep Dive 课程的移动侧栏：收起时使用 inert 避免键盘焦点进入屏幕外链接；展开状态同步 aria-expanded / aria-controls / 按钮名称。
- 支持 Escape 关闭并将焦点返回菜单按钮，点击导航项关闭侧栏，屏幕尺寸变化时恢复桌面导航可访问性。
- 新增移动 / 桌面状态、键盘操作与焦点回归测试并接入 Pages 验证；40 个学习节点、进度键、课程内容和 v0.18 版本保持不变。合并与上线以 Actions 实际结果为准。

## 2026-10-25 · Pages deployment retry artifact fix
- PR #18 的静态检查与课程回归验证通过；main Actions 40152696463 首次部署失败，日志显示 GitHub Pages ID Token 请求超时，`id-token: write` 权限在 workflow 中已配置。
- 重试该 run 时产生两份同名 `github-pages` artifact，导致 `deploy-pages` 无法选择唯一工件；这与课程代码或内容检查无关。
- 修复 Pages 工作流：上传与部署使用 `github-pages-${{ github.run_attempt }}` 配对命名，使后续重试的工件可唯一识别。新版本是否成功部署以 GitHub Actions 实际结果为准。


## 2026-10-25 · Dashboard counts and mobile readability (v0.18 maintenance / v0.19 audit)
- 修复 Dashboard 仅展示 Core / Deep Dive / Track 三类数量、遗漏 9 个章内 Lab 独立计数的问题；现在四类完成数与 40 节点总百分比可相互核对。
- 调整进度页响应式统计卡片、阅读字号、文字对比度、按钮触控区域与键盘焦点；补充减少动画偏好支持。
- 扩展现有 CI 进度同步测试，覆盖章内 Lab 计数、40 节点百分比、重置和页面可读性标记。保留既有本地存储键和 v0.18 版本；实际 Pages 发布状态以 Actions 结果为准。


## 2026-10-24 · Local progress backup and restore (v0.18 maintenance)
- Learning Dashboard 增加本地进度 JSON 导出、导入与确认覆盖，解决清理浏览器数据或更换设备时难以迁移学习状态的问题；数据不上传服务器。
- 备份只包含已发布的 40 个节点完成状态，导入使用严格的版本与键白名单、大小限制和重复项检查，不改动无关 localStorage 项。
- 修复同标签页导入后 Dashboard 不会自动刷新的问题；增加导出、恢复、取消、恶意键与超大文件回归测试，纳入部署前 CI。
- 保持 v0.18、40 节点和既有学习进度键不变。[PR #17](https://github.com/TempleHao/ai-learning-platform/pull/17) 已合并（e346dec）；[Actions 40054414831](https://github.com/TempleHao/ai-learning-platform/actions/runs/40054414831) 的 verify 与 Pages deploy 均成功。真实浏览器和移动端导入 / 下载仍待人工验收。


## 2026-10-24 · Corner icon & favicon consistency correction
- Fix: browser tab used a separately drawn SVG favicon, visually different from the approved Scheme 1 logo. Replace with a transparent 64px PNG made from the same approved artwork.
- Add dedicated 180px iOS home-screen icon; use new filenames to avoid stale favicon caches.
- Restore a subtle transparent upper-right corner mark on all 32 pages. Remove old injected black badge if present; reserve header space on desktop and mobile to prevent overlap.
- Add regression coverage for icon image dimensions/transparency, page references, visual asset identity, and idempotent corner mounting. Preserve all learning and localStorage state.


## 2026-10-24 · Scheme 1 visual fidelity correction
- 按已确认的方案 1 原稿重新提取透明背景的彩色丝带 A 图形，取代与参考图形状不一致的前版可见 SVG；为网站全部页面统一真实参考图形。
- 重做首页品牌横向组合（字标、比例、间距、英文标语），删除首页、章节和工具页额外注入的深色底板悬浮 Logo。
- 浏览器图标与矢量备用资源改为透明背景，不再出现黑色矩形徽标；更新页面 CSS / 图标资源缓存版本，并新增防止品牌倒退的自动回归检查。
- 保留 v0.18 的 40 个学习节点及所有学习进度键；已用本地浏览器试渲染桌面与 390px 手机布局，无横向溢出。
- PR #15 已合并主分支（2743067）；[GitHub Actions 40024942348](https://github.com/TempleHao/ai-learning-platform/actions/runs/40024942348) 的所有回归检查及 GitHub Pages 部署均成功。


## 2026-10-24 · Scheme 1 brand refresh
- 采用选定的流线型 A Logo，建立蓝—青—紫渐变品牌识别系统；提供透明矢量标志与深色底板图标。
- 全站 32 个 HTML 页面使用统一浏览器图标，替换 Core、Deep Dive、Lab、Dashboard、Frontier、Review、Resources、Cases 及首页现有旧图标，补齐 Deep Dive 10 和 Lab 12 的品牌入口。
- 主界面配色由旧荧光绿改为深海军蓝与冰蓝 / 紫色，并统一导航、主要按钮、状态提示和移动端品牌尺寸。
- 新增 brand coverage 回归检查，接入 Pages 发布前验证；无新增课程节点、不提升版本号。
- [PR #14](https://github.com/TempleHao/ai-learning-platform/pull/14) 已合并至 main（de6e3e1），全量静态检查、站内链接、学习进度与品牌回归检查通过，[GitHub Pages 部署](https://github.com/TempleHao/ai-learning-platform/actions/runs/40022270852) 成功；真实桌面及手机浏览器外观细节仍待人工验收。


## 2026-10-24 · v0.18 integration release and Lab 12 state fix
- PR #13 已合并到 `main`（eb7e7e0），此前积压的 Physical AI 分层延伸阅读、Lab 导航、跨标签页进度刷新及部署前自动检查已纳入正式站点。
- 本次合并的 GitHub Actions 验证和 Pages 部署均成功（run 40016502601）。
- 修复 Lab 12 在其他标签页清除全部 `localStorage` 时没有重新渲染完成状态的问题；新增执行内联页面脚本的回归测试，覆盖跨标签页标记、清空与重新完成。
- 浏览器和移动端人工体验验收仍待完成；维持 v0.18，不增加课程节点。
- 更新 README 与 ROADMAP 中过期的「PR 待合并」「CI 尚未接入」「Pages 未部署」状态，确认 2026-10-24 最新回归与部署作业成功。

## 2026-10-22 · Lab Track deep links (development branch)
- 修复 Dashboard 中 Lab 01–11 全部跳转到实验列表顶部的问题；为每个实验添加独立锚点并补充回归断言。
- 变更位于 PR #13 开发分支；待 CI 复验、合并及 Pages 部署后才计入正式站点。

## 2026-10-21 · Release gate (development branch)
- Added CI verification for site structure, internal links, progress synchronization, Physical AI calculator and v0.18 integration.
- PR #13 verification passed on 2026-10-21 (Actions run 39531480131); deploy was correctly skipped for the pull request. Merge, main Pages deployment and browser testing remain pending.


## 2026-10-20 · Release gate
- 开发分支修复章节页与章内 Lab 的跨标签页刷新；独立 Node 模拟测试通过，尚未合并或部署。
- Added internal link audit script covering 32 HTML pages and 585 local references.
- Physical AI calculator, progress synchronization and 40-node integration logic checked; CI and browser tests remain pending.

## 2026-10-19 · v0.18 learning-path integration and release verification
- 为 Deep Dive 10 的科学预测、世界模型与机器人三处关键节点补齐「继续探索」，每处提供 20 分钟 / 2 小时 / 原典三档资料；核对 AlphaFold 3、GNoME、World Models、RT-2 与 Gemini Robotics 一手来源。
- 新增 Physical AI 成本计算器与 v0.18 导航、40 节点一致性回归测试脚本；保留原有进度同步测试。
- 核实 2026-10-18 GitHub Pages [部署记录](https://github.com/TempleHao/ai-learning-platform/actions/runs/39138427172)：对应 main 提交 53e6391，Upload static site 和 Deploy to GitHub Pages 均成功。线上浏览器交互与移动端仍未完成验收。
- 尝试将自动校验加入 Pages 工作流时，GitHub 写入工具返回安全检查阻断；未将 CI 接入计为已完成。

## 2026-10-18 · v0.18 integration follow-up (Pages verification pending)
- 修复 Lab Track 与 Learning Dashboard 跨标签页学习进度刷新；保留既有 Local Storage 键，不迁移或清除数据。
- 统一首页、Dashboard、Lab Track 与 README、ROADMAP 的 v0.18 状态和 40 节点说明。
- GitHub Pages 构建与真实浏览器验收仍待确认；静态检查接入部署工作流尚未完成。

## 2026-10-17 · v0.18 Physical AI / Science integration (merged; Pages verification pending)
- 开发分支 PR #11：接通 Deep Dive 10、Lab 12 独立实验、Lab Track 完成状态与 40 节点 Dashboard。
- 首页加入 Deep Dive 10 入口，Lab Track 调整为 12 关；课程与实验可相互跳转。
- 资源库增加 AlphaFold 3、GNoME、Genie 3、Gemini Robotics 1.5 的一手来源，Deep Dive 10 可加载对应延伸阅读。
- PR #11 已于 2026-10-17 合并至 main（710d348）；仍需核实 Pages 构建与浏览器交互验收。

## 2026-10-09 · Repository presentation and release documentation
- 重写 README：完整说明项目定位、适用人群、能力目标、学习路径、模块规模、仓库结构与反馈入口。
- 区分 v0.17 正式发布与 v0.18 开发中状态，提供版本、提交、Actions 与在线站点入口。
- 明确每次发布需同步 README / CHANGELOG / ROADMAP、节点计数和部署检查；本次为文档改进，不提升正式版本。

## 2026-10-07 · v0.17 Inference Economics / Model Routing
- 新增 Deep Dive 09《Inference Economics / Model Routing》
- 建立 Quality Gate / Latency SLO / Total Cost 的生产决策框架
- 增加静态分工、规则、分类器、级联升级与高价值双检五级路由
- 补齐 Token、Prompt Cache、Batch、Flex、异步任务与尾延迟
- 新增可编辑的模型路由与单位经济性计算器
- 新增 Lab 11：为真实 AI 应用建立模型路由与成本基准
- Learning Dashboard 更新为 9 Core + 9 Core Labs + 9 Deep Dives + 11 Lab Track，共 38 个节点
- 修复首页“地图构建期 / 25%”等历史阶段文案，统一版本与数量

## 2026-10-05 · Writing Style Audit
- 全站审校明显的生成式模板腔，重点清理“不是 X，而是 Y”“不只是 X，而是 Y”“重点不是……而是……”等高频对比句式
- 首页 Banner 改为更直接的品牌表达：把 AI 学成一套可以判断、构建与行动的认知系统
- Core、Deep Dive、Cases、Labs、Resources、Review 与源稿同步改为更直接的判断句、定义句和因果句
- 在 CONTENT_POLICY 新增长期文风规范，后续内容默认执行


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
