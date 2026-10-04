const attn={
 '银行':'“银行”本身可能指金融机构，也可能出现在与“河岸”同形词的语境中。模型需要结合周围 Token 消除歧义。',
 '河边':'“河边”提供强空间语义，帮助后续“桥”等词建立场景关系。',
 '它':'处理“它”时，模型会综合前文实体和后文谓词；Attention 权重不是固定规则，而是由当前表示动态计算。',
 '桥':'“桥”会与河流、位置等语义形成关联，并影响句子整体表示。'
};
const attnBtns=[...document.querySelectorAll('[data-attn]')],attnRes=document.getElementById('attentionResult');
function renderAttn(k){attnBtns.forEach(b=>b.classList.toggle('active',b.dataset.attn===k));attnRes.innerHTML=`<b>关注 “${k}” 时：</b><span>${attn[k]}</span>`}
attnBtns.forEach(b=>b.addEventListener('click',()=>renderAttn(b.dataset.attn)));renderAttn('它');

const blocks={
 attention:'Self-Attention：让每个 Token 汇聚上下文中与当前表示相关的信息。',
 mlp:'MLP / Feed-forward：对每个位置的表示做非线性变换，增加表达和特征组合能力。',
 residual:'Residual：把输入直接加回输出，为深层网络提供更顺畅的信息与梯度路径。',
 norm:'Normalization：控制激活尺度，帮助训练稳定。现代 Transformer 的具体 Norm 位置可能不同。'
};
const blockBtns=[...document.querySelectorAll('[data-block]')],blockOut=document.getElementById('blockExplain');
function renderBlock(k){blockBtns.forEach(b=>b.classList.toggle('active',b.dataset.block===k));blockOut.textContent=blocks[k]}
blockBtns.forEach(b=>b.addEventListener('click',()=>renderBlock(b.dataset.block)));renderBlock('attention');