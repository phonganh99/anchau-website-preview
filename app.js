const header=document.querySelector('header');
const syncHeader=()=>header.classList.toggle('sticky',scrollY>30);
addEventListener('scroll',syncHeader,{passive:true});
addEventListener('pageshow',syncHeader);
syncHeader();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');menu.textContent=open?'×':'☰';if(!open){document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
document.querySelector('.dropdown-toggle').addEventListener('click',e=>{const open=document.querySelector('.nav-group').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open);});
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('[data-slide]')];const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');let current=0,paused=reducedMotion.matches,hovered=false,focusPaused=false;
function show(i){current=(i+slides.length)%slides.length;document.body.dataset.banner=String(current+1);slides.forEach((s,j)=>{s.classList.toggle('active',j===current);s.setAttribute('aria-hidden',j!==current);s.inert=j!==current;});dots.forEach((d,j)=>d.setAttribute('aria-pressed',j===current));}
function pauseLabel(){document.querySelector('#pause').textContent=paused?'▷':'Ⅱ';document.querySelector('#pause').setAttribute('aria-label',paused?'Tiếp tục trình chiếu':'Tạm dừng trình chiếu');}pauseLabel();
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){paused=true;pauseLabel();}});
dots.forEach(d=>d.addEventListener('click',()=>show(Number(d.dataset.slide))));document.querySelector('#next').onclick=()=>show(current+1);document.querySelector('#prev').onclick=()=>show(current-1);document.querySelector('#pause').onclick=()=>{paused=!paused;pauseLabel();};
const hero=document.querySelector('.hero');hero.addEventListener('mouseenter',()=>hovered=true);hero.addEventListener('mouseleave',()=>hovered=false);hero.addEventListener('focusin',()=>focusPaused=true);hero.addEventListener('focusout',e=>{focusPaused=hero.contains(e.relatedTarget);});
setInterval(()=>{if(!paused&&!reducedMotion.matches&&!hovered&&!focusPaused&&!document.hidden&&!document.querySelector('dialog[open]'))show(current+1);},5500);
const openers=new WeakMap();function openDialog(d){openers.set(d,document.activeElement);d.showModal();document.body.classList.add('modal-open');}function closeDialog(d){d.close();}document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');openers.get(d)?.focus();});d.querySelector('.close-dialog').onclick=()=>closeDialog(d);d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
document.querySelectorAll('[data-consult]').forEach(b=>b.addEventListener('click',()=>{const d=document.querySelector('#consult-dialog');d.querySelector('form').reset();d.querySelector('.form-status').textContent='';d.querySelector('form').dataset.source=b.dataset.consult;document.querySelector('#context').textContent=b.dataset.consult;openDialog(d);}));
function notice(msg){document.querySelector('#notice-text').textContent=msg;openDialog(document.querySelector('#notice-dialog'));}
document.querySelectorAll('[data-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice('Bạn có thể truy cập mục “'+a.textContent.trim()+'” qua menu chính.');}));
document.querySelectorAll('[data-pending]').forEach(b=>b.addEventListener('click',()=>notice(b.dataset.pending)));
document.querySelector('.close-notice').onclick=()=>closeDialog(document.querySelector('#notice-dialog'));
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.querySelector('.form-status').textContent='Chưa thể gửi thông tin lúc này. Thông tin chưa được gửi hoặc lưu.';}));
