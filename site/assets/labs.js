const labs=[...document.querySelectorAll('[data-track-lab]')];
function key(id){return 'ai-learning-tracklab-'+id}
function render(){
 let done=0;
 labs.forEach(lab=>{const box=lab.querySelector('input');box.checked=localStorage.getItem(key(lab.dataset.trackLab))==='1';lab.classList.toggle('done',box.checked);if(box.checked)done++});
 document.getElementById('trackProgress').textContent=`${done} / ${labs.length}`;
 document.getElementById('trackBar').style.width=(done/labs.length*100)+'%';
}
labs.forEach(lab=>lab.querySelector('input').addEventListener('change',e=>{localStorage.setItem(key(lab.dataset.trackLab),e.target.checked?'1':'0');render()}));render();