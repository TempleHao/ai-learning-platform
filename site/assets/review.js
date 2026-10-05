const terms=[
['AI','人工智能','总类','让机器完成通常需要智能能力的任务或产生影响环境的预测、建议、决策与行动。'],
['ML','Machine Learning','方法','让系统从数据中学习规律，减少对人工编写规则的依赖。'],
['Deep Learning','深度学习','方法','以多层神经网络进行表示学习的一大类机器学习方法。'],
['Neural Network','神经网络','原理','由大量参数化计算单元组成的函数结构，通过训练调整权重。'],
['Parameter','参数','原理','模型内部可被训练调整的数值；单个参数无法对应成一条独立事实。'],
['Weight','权重','原理','神经网络参数的一类，决定输入信号在计算中的影响大小。'],
['Training','训练','原理','根据数据、目标函数与优化算法反复更新模型参数。'],
['Inference','推理/推断','原理','参数基本固定后，对新输入运行模型得到输出。'],
['Loss','损失函数','原理','衡量模型预测与训练目标之间差距的数值目标。'],
['Gradient','梯度','原理','描述参数微小变化会让 Loss 如何变化，为优化提供方向。'],
['Backprop','反向传播','原理','高效计算深层网络各参数梯度的方法。'],
['Optimizer','优化器','原理','利用梯度更新参数的算法，如 SGD、Adam 等。'],
['Token','Token','语言模型','模型处理文本时使用的离散单位，不一定等于一个字或一个词。'],
['Tokenizer','分词器','语言模型','把原始文本转换为 Token ID 序列的规则或模型。'],
['Embedding','向量表示','语言模型','把离散对象映射到连续高维向量空间。'],
['Context Window','上下文窗口','语言模型','一次推理中模型能够接收和处理的 Token 范围。'],
['Transformer','Transformer','架构','以 Attention 为核心的序列建模架构，适合并行和规模化训练。'],
['Attention','注意力','架构','让当前位置根据相关性从其他位置动态聚合信息。'],
['Q/K/V','Query / Key / Value','架构','Attention 中用于匹配“想找什么/提供什么线索/传递什么信息”的三类表示。'],
['Residual','残差连接','架构','把层输入直接加到输出，帮助深层网络信息和梯度传播。'],
['MLP','多层感知机/前馈层','架构','对表示进行非线性特征变换的网络模块。'],
['Pretraining','预训练','训练','在大规模数据上学习广泛模式和基础能力的训练阶段。'],
['SFT','监督微调','训练','用带目标答案/指令的数据进一步塑造模型行为。'],
['RLHF','人类反馈强化学习','训练','用人类偏好信号帮助模型学习更符合期望的回答行为。'],
['Foundation Model','基础模型','模型','在大规模数据上预训练、可适配多种下游任务的模型。'],
['LLM','大语言模型','模型','主要处理和生成语言/Token 序列的大规模基础模型。'],
['Multimodal','多模态','能力','统一或协同处理文本、图像、音频、视频等多种模态。'],
['Diffusion','扩散模型','模型','通过学习逐步去噪过程生成图像等数据的一类生成模型。'],
['Scaling Law','Scaling Law','研究','描述模型规模、数据和计算与性能/Loss 之间经验规律的关系。'],
['MoE','Mixture of Experts','架构','通过路由只激活部分专家参数，以扩大总参数而控制单次计算。'],
['Distillation','蒸馏','效率','让较小模型学习较大模型输出或内部知识，以压缩成本。'],
['Quantization','量化','效率','降低权重/激活数值精度，以减少显存和推理计算。'],
['Prompt','提示词','运用','当前调用中告诉模型任务、约束、输入和输出要求的指令。'],
['Context Engineering','上下文工程','运用','设计模型当前能看到的全部信息、状态、示例、证据和工具反馈。'],
['RAG','检索增强生成','系统','先从外部知识库检索证据，再把证据放入 Context 让模型生成。'],
['Vector Database','向量数据库','系统','存储与检索向量表示的系统，常用于语义检索与 RAG。'],
['Structured Output','结构化输出','系统','要求模型按照固定 Schema 产生 JSON 等可被程序稳定消费的结果。'],
['Tool Use','工具调用','系统','让模型通过搜索、计算器、数据库、API 等外部工具获取信息或执行动作。'],
['Workflow','工作流','系统','由人预先定义主要步骤和分支的 AI 编排流程。'],
['Agent','智能体','系统','围绕目标动态选择下一步行动、调用工具、观察并继续执行的系统。'],
['Memory','记忆','系统','让系统保存并在未来调用用户、任务或环境状态；它与模型参数属于不同层级。'],
['Eval','评测','工程','用代表真实任务的测试集和成功标准衡量系统质量与回归。'],
['Benchmark','基准','工程','用于标准化比较模型或系统能力的数据集和测试规则。'],
['Hallucination','幻觉','风险','模型生成流畅但事实错误、无依据或虚构内容。'],
['Prompt Injection','提示注入','安全','恶意输入试图让模型忽略原规则、泄露信息或执行越权动作。'],
['Guardrail','安全护栏','安全','通过规则、模型、权限、校验和审批限制系统行为。'],
['Fine-tuning','微调','训练','在已有模型基础上继续训练以适配特定任务或行为。'],
['Test-time Compute','推理时计算','研究','在回答阶段增加搜索、思考、验证或采样计算预算以提升结果。'],
['GPU','图形处理器','硬件','高度并行的计算芯片，成为深度学习训练与推理的重要基础。'],
['HBM','高带宽内存','硬件','提供高带宽数据传输的内存，AI 加速器的重要性能与供应链环节。'],
['Latency','延迟','工程','一次请求从发出到得到结果所需时间。'],
['Throughput','吞吐量','工程','单位时间内系统能够处理的请求、Token 或任务数量。']
];

const quizzes=[
{q:'为什么“LLM ⊂ AI”成立，而“Agent ⊂ LLM”不成立？',o:['Agent 一定比 LLM 大','Agent 是系统架构，可能使用 LLM、工具和其他组件','LLM 不能用于 Agent','Agent 只属于机器人'],a:1,e:'LLM 是模型类别；Agent 是围绕目标持续行动的系统形态，常以 LLM 为核心，但其本质是由模型、工具和状态组成的系统架构。'},
{q:'下面哪一种最能说明“模型与产品处在不同层级”？',o:['模型必须有 UI','真实产品还需要数据、权限、工作流、Eval 和成本控制','产品不能使用基础模型','模型不能联网'],a:1,e:'商业价值发生在整个系统，而非模型一层。'},
{q:'Backprop 最准确的作用是什么？',o:['直接存储知识','高效计算梯度','生成 Token','压缩模型'],a:1,e:'反向传播负责梯度计算；优化器再利用梯度更新参数。'},
{q:'什么时候 RAG 最有价值？',o:['只是改写文案','知识会更新且需要来源','任何任务都必须用','只为了让 Prompt 更长'],a:1,e:'RAG 适合外部知识、私有资料、实时更新和需要证据来源的任务。'},
{q:'固定且高风险的企业流程，通常应该优先选择什么？',o:['完全自主 Agent','确定性 Workflow + 必要模型步骤','只写长 Prompt','无日志自动执行'],a:1,e:'稳定流程更适合确定性编排，便于测试、权限控制与审计。'},
{q:'为什么搜索/推荐是 AI 商业史的重要案例？',o:['它们是 AGI','窄预测在巨大规模上也能创造巨大经济价值','它们不需要数据','它们完全没有错误'],a:1,e:'不需要通用智能，只要高频决策上的微小提升被规模放大，就能形成巨大价值。'},
{q:'“模型吞噬风险”指什么？',o:['模型损坏服务器','基础模型未来原生提供应用当前收费的功能','模型参数减少','模型无法升级'],a:1,e:'薄功能层最容易被底层模型或平台直接商品化。'},
{q:'以下哪项最可能形成较强 AI 应用壁垒？',o:['一段 Prompt','单页聊天 UI','专有数据 + 工作流 + 反馈闭环','换一个模型名称'],a:2,e:'越靠近真实业务数据、系统记录、权限和结果责任，通常越不容易被复制。'},
{q:'为什么 Agent 风险通常高于普通聊天？',o:['Agent 字数更多','它能把错误输出变成真实外部行动','Agent 没有模型','Agent 不使用 Context'],a:1,e:'权限和自主行动把错误半径从“文本不对”放大到真实状态变化。'},
{q:'风险半径公式里，哪个因素会显著放大同一模型的风险？',o:['字体大小','不可逆权限与部署规模','模型名称','回答语气'],a:1,e:'自主性、权限、规模、不可逆性会决定错误能造成多大真实影响。'},
{q:'Attention 的 Q/K/V 最好的直觉是什么？',o:['问题/知识/答案数据库','想找什么/提供什么匹配线索/真正传递的信息','训练/测试/部署','CPU/GPU/HBM'],a:1,e:'Q 与 K 决定匹配权重，再加权汇总 V。'},
{q:'Scaling Laws 给产业最重要的信号是什么？',o:['参数越多永远最好','性能与模型/数据/计算存在较可预测的经验趋势','算法不再重要','训练数据可以固定不变'],a:1,e:'Scaling Laws 提供了投入规模与性能改善之间可预测趋势，但 Chinchilla 等又强调数据与模型配比。'},
{q:'为什么 MoE 能让总参数和单次计算量部分脱钩？',o:['删除全部参数','每个输入只激活部分专家','完全不用 GPU','只处理短文本'],a:1,e:'稀疏路由让不同 Token 只经过部分专家网络。'},
{q:'一个 AI 系统上线前最重要的“可持续改进基础”是什么？',o:['漂亮 Demo','统一 Eval 测试集','最长 Prompt','最多 Agent'],a:1,e:'没有 Eval，就不能判断模型、Prompt、RAG 或工作流修改是提升还是回归。'},
{q:'AI 商业机会为什么要研究电力和数据中心？',o:['AI 不需要软件','训练与推理最终受物理算力、供电、冷却和建设约束','电力等于模型参数','只有机器人用电'],a:1,e:'AI 规模化最终会传导到数据中心、电网、冷却和能源供应。'}
];

const tabs=[...document.querySelectorAll('[data-tab]')],panels=[...document.querySelectorAll('.review-panel')];
tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.toggle('active',x===t));panels.forEach(p=>p.classList.toggle('active',p.id==='panel-'+t.dataset.tab));if(t.dataset.tab==='wrong')renderWrong()}));

const grid=document.getElementById('glossaryGrid'),search=document.getElementById('glossarySearch'),count=document.getElementById('termCount');
function renderTerms(){const q=(search.value||'').trim().toLowerCase();const arr=terms.filter(t=>t.join(' ').toLowerCase().includes(q));count.textContent=arr.length+' / '+terms.length;grid.innerHTML=arr.map(t=>`<article><div><b>${t[0]}</b><span>${t[2]}</span></div><h3>${t[1]}</h3><p>${t[3]}</p></article>`).join('')||'<p class="empty">没有匹配术语。</p>'}
search.addEventListener('input',renderTerms);renderTerms();

let qi=0;const card=document.getElementById('quizCard'),prog=document.getElementById('quizProgress');
function wrongSet(){return new Set(JSON.parse(localStorage.getItem('ai-learning-wrong-quiz')||'[]'))}
function saveWrong(set){localStorage.setItem('ai-learning-wrong-quiz',JSON.stringify([...set]))}
function renderQuiz(){const q=quizzes[qi];prog.textContent=(qi+1)+' / '+quizzes.length;card.innerHTML=`<span>QUESTION ${String(qi+1).padStart(2,'0')}</span><h2>${q.q}</h2><div class="quiz-options">${q.o.map((x,i)=>`<button data-opt="${i}">${String.fromCharCode(65+i)}. ${x}</button>`).join('')}</div><div class="quiz-explain" id="quizExplain"></div>`;card.querySelectorAll('[data-opt]').forEach(b=>b.addEventListener('click',()=>{const pick=+b.dataset.opt,ok=pick===q.a;card.querySelectorAll('[data-opt]').forEach((x,i)=>{x.disabled=true;x.classList.toggle('correct',i===q.a);x.classList.toggle('wrong',i===pick&&!ok)});const s=wrongSet();if(ok)s.delete(qi);else s.add(qi);saveWrong(s);document.getElementById('quizExplain').innerHTML=`<b>${ok?'✓ 正确':'✕ 错误'}</b><p>${q.e}</p>`; }))}
document.getElementById('prevQuiz').addEventListener('click',()=>{qi=(qi-1+quizzes.length)%quizzes.length;renderQuiz()});document.getElementById('nextQuiz').addEventListener('click',()=>{qi=(qi+1)%quizzes.length;renderQuiz()});renderQuiz();

function renderWrong(){const s=[...wrongSet()];const el=document.getElementById('wrongList');el.innerHTML=s.length?s.map(i=>`<article><span>Q${i+1}</span><div><b>${quizzes[i].q}</b><p>${quizzes[i].e}</p></div><button data-review="${i}">复习</button></article>`).join(''):'<p class="empty">当前没有错题。';el.querySelectorAll('[data-review]').forEach(b=>b.addEventListener('click',()=>{qi=+b.dataset.review;tabs.find(x=>x.dataset.tab==='quiz').click();renderQuiz()}))}
document.getElementById('clearWrong').addEventListener('click',()=>{localStorage.removeItem('ai-learning-wrong-quiz');renderWrong()});