const mmInputs=[...document.querySelectorAll('[data-mm-score]')];
function renderMM(){
  if(!mmInputs.length)return;
  const v={};mmInputs.forEach(i=>{v[i.dataset.mmScore]=Number(i.value);i.parentElement.querySelector('b').textContent=i.value});
  const multimodal=(v.handsfree+v.vision+v.conversation+v.latency)/20;
  const caution=(v.audit+v.privacy)/10;
  let mode,reason,badge;
  if(v.vision>=4 && v.conversation>=4){mode='Realtime Multimodal';badge='CAMERA + VOICE';reason='现场视觉和连续对话都很重要。优先考虑实时视觉 + 语音，但必须限制持续录制和环境隐私。';}
  else if(v.conversation>=4 && v.latency>=4 && v.audit<=3){mode='Native Realtime Voice';badge='LOW LATENCY';reason='自然对话和低延迟是核心。适合原生 speech-to-speech / realtime session。';}
  else if(v.conversation>=3 && v.audit>=4){mode='Chained Voice Pipeline';badge='AUDITABLE';reason='需要语音入口，但也需要可检查的中间文本和强审计，优先 ASR → Text Agent → TTS。';}
  else if(v.vision>=4){mode='Vision Copilot';badge='CAMERA / SCREEN';reason='视觉 Context 比连续语音更重要。优先图片 / 屏幕理解，语音可作为可选输入。';}
  else if(multimodal>.55 && caution<.75){mode='Text + Optional Voice';badge='BALANCED';reason='多模态有明显价值，但还不需要全实时。先从文字主界面 + 语音 / 图片按需输入开始。';}
  else{mode='Text-first';badge='KEEP IT SIMPLE';reason='当前任务对实时感知的增益有限，或审计 / 隐私要求较高。文字通常更便宜、可控、可搜索和可追溯。';}
  document.getElementById('mmMode').textContent=mode;document.getElementById('mmScore').textContent=badge;document.getElementById('mmReason').textContent=reason;
}
mmInputs.forEach(i=>i.addEventListener('input',renderMM));renderMM();
const labs=[...document.querySelectorAll('[data-mm-lab]')];
function renderLab(){let d=0;labs.forEach(b=>{const k='ai-learning-mm-lab-'+b.dataset.mmLab;b.checked=localStorage.getItem(k)==='1';if(b.checked)d++});const n=document.getElementById('mmLabProgress'),bar=document.getElementById('mmLabBar');if(n)n.textContent=d+' / '+labs.length;if(bar)bar.style.width=(d/labs.length*100)+'%'}
labs.forEach(b=>b.addEventListener('change',()=>{localStorage.setItem('ai-learning-mm-lab-'+b.dataset.mmLab,b.checked?'1':'0');renderLab()}));renderLab();