const samples=[[-2,-4],[-1,-2],[0,0],[1,2],[2,4]],lr=.08;let w=-1,step=0;
const wEl=document.getElementById('weightVal'),lossEl=document.getElementById('lossVal'),stepEl=document.getElementById('stepVal'),bar=document.getElementById('lossBar'),table=document.getElementById('sampleTable'),explain=document.getElementById('trainExplain');
function loss(){return samples.reduce((s,[x,y])=>s+(w*x-y)**2,0)/samples.length}
function grad(){return samples.reduce((s,[x,y])=>s+2*(w*x-y)*x,0)/samples.length}
function renderTrain(){const l=loss();wEl.textContent=w.toFixed(3);lossEl.textContent=l.toFixed(4);stepEl.textContent=step;bar.style.width=Math.min(100,l/18*100)+'%';table.innerHTML='<div><b>x</b><b>真实 y</b><b>预测 ŷ</b></div>'+samples.map(([x,y])=>`<div><span>${x}</span><span>${y}</span><span>${(w*x).toFixed(2)}</span></div>`).join('');const d=Math.abs(w-2);explain.textContent=d<.03?'参数已经非常接近真实规律 w = 2。模型“学会”了这个简单关系。':d<.4?'已经很接近了。Loss 越来越小。':'训练根据梯度持续调整 w，让预测向真实值靠近。'}
function train(n=1){for(let i=0;i<n;i++){w-=lr*grad();step++}renderTrain()}
document.getElementById('trainOne')?.addEventListener('click',()=>train(1));
document.getElementById('trainTwenty')?.addEventListener('click',()=>train(20));
document.getElementById('resetTrain')?.addEventListener('click',()=>{w=-1;step=0;renderTrain()});
renderTrain();