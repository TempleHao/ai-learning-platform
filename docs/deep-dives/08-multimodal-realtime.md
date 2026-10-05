# Deep Dive 08：Multimodal / Voice / Realtime AI

## 核心命题

AI 正从回合制文字聊天，演化为持续感知、实时语音、视觉理解、屏幕操作和后台工具协作的交互系统。

## 多模态

Text / Image / Audio / Video / Screen / Sensor 属于不同的信息空间，各自携带不同结构和时间特征。

## Voice

两条主要架构：
- Chained: ASR → LLM → TTS
- Native speech-to-speech

## Realtime

关键能力：
- Full duplex
- Barge-in
- Low first-audio latency
- Conversation state
- Tool / backend delegation

## Video

难点：抽帧、时间连续性、事件判断、长期 Memory、主动发言策略。

## Computer Use

Screenshot → Locate → Decide → Act → Verify。

## Interface Shift

Voice / Camera / Screen / Ambient AI 降低“输入 Prompt”的成本，让更多现实场景进入 AI。

## Latency

Realtime 产品中，First Audio Latency / RTT / Jitter / Barge-in / Tool Latency 都直接影响“智能感”。

## Safety

持续音视频会扩大 Privacy / Identity / Action / Retention 风险。

## Lab 10

构建真实实时多模态助手，比较文字版与多模态版的完成率、时间与体验。

## Sources

OpenAI Realtime API; GPT-Live; Voice agents; OpenAI low-latency voice engineering; Stanford AI Index 2026.
