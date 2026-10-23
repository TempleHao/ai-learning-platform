const filterButtons=[...document.querySelectorAll('[data-cap-filter]')];
const capCards=[...document.querySelectorAll('[data-cap-group]')];
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.toggle('active',b===btn));
  const f=btn.dataset.capFilter;
  capCards.forEach(card=>card.classList.toggle('cap-hidden',f!=='all'&&card.dataset.capGroup!==f));
}));

const eras={
  rules:{title:'专家系统：把专家知识写进软件',value:'主要价值：复制稀缺专家判断。',why:'当知识边界明确时，规则系统可以非常强；但知识获取、更新与维护成本限制了扩张。',examples:'诊断、配置、工业规则、知识库。'},
  ranking:{title:'搜索 / 广告 / 推荐：预测成为互联网基础设施',value:'主要价值：提高匹配、点击、转化和留存。',why:'海量行为数据 + 高频在线反馈 + 可量化目标，非常适合机器学习持续优化。',examples:'搜索排序、CTR 预估、推荐、风控、反欺诈。'},
  perception:{title:'视觉 / 语音：机器开始直接理解非结构化世界',value:'主要价值：降低“把现实转成数据”的成本。',why:'深度学习减少手工特征工程，GPU 和大数据让图像、语音模型跨过可用阈值。',examples:'人脸/物体识别、语音转写、质检、辅助驾驶。'},
  gen:{title:'Foundation / GenAI：一个模型开始服务大量任务',value:'主要价值：降低内容和认知任务的边际生产成本。',why:'大规模预训练 + 自然语言界面，让新任务不再都需要专门训练模型。',examples:'写作、翻译、总结、图像生成、问答、代码生成。'},
  copilot:{title:'Copilot：AI 嵌入人已经工作的软件界面',value:'主要价值：提高高技能劳动者单位时间产出。',why:'AI 不再要求用户离开工作流去“问一个机器人”，而是直接读取当前上下文并协助。',examples:'IDE、办公套件、客服坐席、销售、分析。'},
  agent:{title:'Agent / Physical AI：从建议走向执行',value:'主要价值：减少流程执行和物理行动的人力成本。',why:'推理、工具调用、多模态和更长上下文开始组合成持续行动系统，但可靠性仍是核心瓶颈。',examples:'Computer-use Agent、自动化研究、自动驾驶、机器人。'}
};
const eraButtons=[...document.querySelectorAll('[data-era]')],detail=document.getElementById('eraDetail');
function renderEra(key){const e=eras[key];if(!e||!detail)return;detail.innerHTML=`<span>VALUE SHIFT</span><h3>${e.title}</h3><b>${e.value}</b><p>${e.why}</p><small>典型应用：${e.examples}</small>`;eraButtons.forEach(b=>b.classList.toggle('active',b.dataset.era===key))}
eraButtons.forEach(b=>b.addEventListener('click',()=>renderEra(b.dataset.era)));
renderEra('rules');