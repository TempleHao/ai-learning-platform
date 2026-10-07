# Deep Dive 09：Inference Economics / Model Routing

## 核心命题

生产级 AI 系统追求的是满足质量门槛后的最优经济组合。模型选择必须同时服从任务质量、延迟目标、风险边界和单位任务成本。

## 1. 成本单位

单次任务成本由模型输入、缓存输入、模型输出、工具调用、基础设施、人工复核和失败返工共同构成：

`C_task = Σ model calls + tools + infrastructure + review + expected error cost`

仅比较“每百万 Token 价格”会漏掉调用次数、输出长度、失败重试和人工接管。

## 2. 三个约束

- **Quality gate**：先用真实任务 Eval 定义最低可接受质量。
- **Latency SLO**：同时记录 TTFT、完整响应时间和 P95 / P99 尾延迟。
- **Risk tier**：高影响任务需要更强模型、验证器或人工审批。

## 3. 路由策略

1. **静态分工**：按任务类型固定模型。
2. **规则路由**：按输入长度、模态、语言、风险和时限选择路径。
3. **分类器路由**：用轻量分类器预测任务难度。
4. **级联升级**：先运行低成本路径，未通过验证再升级。
5. **高价值双检**：高风险任务使用生成模型 + 独立检查器，必要时人工审批。

路由策略必须通过离线 Eval 和线上观测共同验证。升级率过高通常意味着首选模型或路由规则设置不合理。

## 4. Token Economics

输入 Token、输出 Token、推理 Token、上下文增长和多轮重放都会改变成本。应优先：

- 删除无效上下文；
- 限制无价值长输出；
- 把稳定前缀放在 Prompt 前部以提高缓存复用；
- 对长会话进行摘要、压缩或外部状态管理；
- 记录每类任务的 Token 分布，关注 P95，而非只看平均数。

## 5. Cache / Batch / Flex / Background

- **Prompt Cache**：复用稳定前缀，降低重复输入的延迟和价格。
- **Batch**：适合 Eval、分类、Embedding、离线抽取等可等待任务。
- **Flex / 低优先级处理**：用更慢或不稳定的服务等级换取成本下降。
- **Background job**：把长推理与实时交互解耦，前台返回任务状态。

这些机制改变的是服务方式，不会自动修复质量问题。

## 6. 单位经济性

建议同时跟踪：

- 每次请求模型成本；
- 每个成功任务成本；
- 每位付费用户月度 AI 成本；
- 毛利率；
- 失败返工与人工接管成本；
- 路由升级率、缓存命中率、Batch 覆盖率；
- 成本、质量与延迟的 P50 / P95。

`Cost per accepted task = total variable cost / accepted tasks`

## 7. Lab 11

为一个真实 AI 应用建立模型路由与成本基准：

1. 收集至少 50 个真实任务，按难度与风险分层；
2. 选择两种以上模型或推理档位；
3. 定义质量门槛与延迟 SLO；
4. 记录 Token、缓存、延迟、错误与人工接管；
5. 比较“全量强模型”与“路由方案”；
6. 运行回归测试，确认节省成本没有突破质量边界；
7. 输出路由规则、结果表、失败案例和下一轮决策。

## Sources

- OpenAI Cost optimization
- OpenAI Prompt caching
- OpenAI Batch API
- OpenAI Flex processing
- OpenAI Latency optimization
- OpenAI Model selection
- RouteLLM: Learning to Route LLMs with Preference Data (Ong et al., 2024)
