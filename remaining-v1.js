const header=document.querySelector('header');
const syncHeader=()=>header.classList.toggle('sticky',scrollY>30);
addEventListener('scroll',syncHeader,{passive:true});
addEventListener('pageshow',syncHeader);
syncHeader();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');menu.textContent=open?'×':'☰';if(!open){document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
document.querySelector('.dropdown-toggle').addEventListener('click',e=>{const open=document.querySelector('.nav-group').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open);});
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
const openers=new WeakMap();function openDialog(d){openers.set(d,document.activeElement);d.showModal();document.body.classList.add('modal-open');}function closeDialog(d){d.close();}document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');openers.get(d)?.focus();});d.querySelector('.close-dialog').onclick=()=>closeDialog(d);d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
document.querySelectorAll('[data-consult]').forEach(b=>b.addEventListener('click',()=>{const d=document.querySelector('#consult-dialog');d.querySelector('form').reset();d.querySelector('.form-status').textContent='';d.querySelector('form').dataset.source=b.dataset.consult;document.querySelector('#context').textContent=b.dataset.consult;openDialog(d);}));
function notice(msg){document.querySelector('#notice-text').textContent=msg;openDialog(document.querySelector('#notice-dialog'));}
document.querySelectorAll('[data-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice('Bạn có thể truy cập mục “'+a.textContent.trim()+'” qua menu chính.');}));
document.querySelectorAll('[data-pending]').forEach(b=>b.addEventListener('click',()=>notice(b.dataset.pending)));
document.querySelector('.close-notice').onclick=()=>closeDialog(document.querySelector('#notice-dialog'));
document.querySelectorAll('#consult-dialog form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.querySelector('.form-status').textContent='Chưa thể gửi thông tin lúc này. Thông tin chưa được gửi hoặc lưu.';}));



// Shared frontend consultation context; no network/storage backend.
document.querySelectorAll('[data-consult]').forEach(b=>b.addEventListener('click',()=>{
 const f=document.querySelector('#consult-dialog form');
 f.elements.lead_source.value=document.querySelector('#remaining-v1').dataset.source;
 f.elements.course_interest.value=b.dataset.interest||'';
 f.elements.program_interest.value='';
}));
document.querySelectorAll('.course-card').forEach(card=>card.addEventListener('click',e=>{
 if(!e.target.closest('button,a,input'))card.querySelector('[data-consult]').click();
}));
