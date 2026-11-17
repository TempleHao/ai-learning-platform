# Deep Dive 10 · AI for Science / Physical AI

Reviewed: 2026-10-08

科学 AI 应区分模型预测、实验验证、复现与产业化。AlphaFold 3 预测生物分子复合物结构；GNoME 预测材料候选。预测成果不能直接当作已验证产品。

机器人闭环包括感知、规划、策略、控制与反馈。World Model 用于环境预测；Sim-to-Real 仍需真实测试。自动驾驶应明确 ODD、人工接管和安全责任。

## Lab 12

选一个科学工具或实体智能项目，提交 2–4 页机会尽调：非 AI 基线、3 个一手来源、3 个可证伪假设、5 个失败场景、3 个实测指标、成本模型、风险边界与 Go / No-Go 决策。

## Sources

- https://www.nature.com/articles/s41586-024-07487-w
- https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/
- https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/
- https://waymo.com/blog/shorts/safetydata-september26/

## 成本口径预演（2026-11-17）

虚构仓储案例：每月尝试6000次，成功率92%，接管率8%，成功5520次、失败480次。月折旧6666.67元，运行9000元，维保3000元，接管9600元，失败损失5760元，总成本34026.67元，每个验收任务6.16元。相同任务口径的人工基线为9元。若成功率降至80%、接管率升至20%，总成本57066.67元，4800次验收，单位成本11.89元。接管后成功仍计入成功；接管费与失败损失须定义为互不重复的增量费用。安全门槛独立于成本。

独立练习：保持其余默认值，将成功率改为85%、接管率改为15%。计算成功数、总成本及单位成本，再判断是否值得继续试点。

参考答案：5100次、47466.67元、9.31元；成本高于9元基线，应缩小范围或重新设计流程，并独立验证安全。
