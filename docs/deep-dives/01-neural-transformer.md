# Deep Dive 01：神经网络、Transformer 与 Scaling

## 主线

线性单元 → 非线性 → 多层表示学习 → CNN/RNN/Transformer → Attention → Transformer Block → Scaling → MoE → 推理时计算 → 效率工程。

## 运用层需要掌握

- 参数共同构成函数表示，无法按“一个参数一条事实”理解。
- 非线性让多层网络真正获得复杂表达能力。
- 深度学习让特征逐步由模型自动学习。
- Attention 用 Q/K 匹配计算权重，再聚合 V。
- Transformer Block 可简化为 Attention、MLP、Residual、Normalization。
- Scaling Laws 使模型/数据/计算投入与性能之间出现可预测趋势。
- Chinchilla 强调模型大小与训练数据需要更合理配比。
- MoE 通过稀疏激活扩大总参数而控制单次计算。
- 推理时计算让复杂任务在回答阶段消耗更多算力。
- Distillation、Quantization、Routing 等决定推理经济性。

## Sources

ResNet; Attention Is All You Need; Scaling Laws; Chinchilla; Switch Transformer.
