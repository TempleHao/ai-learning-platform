# Deep Dive 07：RAG、Memory 与 Knowledge Systems

## 核心框架

模型参数知识 ≠ 当前 Context ≠ 外部知识 / Memory。

RAG 负责从已有知识源检索证据；Memory 负责跨任务保存状态和经验；Context Engineering 负责决定当前调用真正看见什么。

## RAG Pipeline

Ingest → Chunk → Index → Retrieve → Rerank → Generate。

检索失败常见原因：没取到、取错、取旧、取太多、越权、回答超证据。

## Retrieval

Chunking / Semantic Search / Keyword Search / Metadata Filtering / Reranking 共同决定质量。成熟系统通常是 Hybrid Retrieval。

## Memory

Memory 不等同于知识库。它更适合保存用户偏好、项目状态、历史决策、失败经验等长期状态，并 Just-in-Time 读取。

## Context Budget

长期稳定规则、当前检索证据、Working State、Persistent Memory 应分层，不把所有内容永远塞进 Context Window。

## Governance

企业知识系统必须处理 ACL / Identity、Version、Provenance、Retention、Audit。

## Eval

至少拆成 Retrieval Eval 与 Answer Eval。

## Lab

构建 30–100 份真实文档的可信知识库，准备至少 30 个真实问题，分别测 Retrieval 与 Answer，并加入 Metadata 权限过滤与版本更新。

## Sources

Lewis et al. RAG; OpenAI File Search; Anthropic Memory Tool / Context Engineering; NVIDIA Enterprise RAG.
