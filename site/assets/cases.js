const btns=[...document.querySelectorAll('[data-case-filter]')],cards=[...document.querySelectorAll('[data-case]')];
btns.forEach(btn=>btn.addEventListener('click',()=>{
  btns.forEach(b=>b.classList.toggle('active',b===btn));
  const f=btn.dataset.caseFilter;
  cards.forEach(c=>c.classList.toggle('case-hidden',f!=='all'&&c.dataset.case!==f));
}));