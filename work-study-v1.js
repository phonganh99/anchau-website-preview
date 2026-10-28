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
document.querySelectorAll('[data-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice('Trang “'+a.textContent.trim()+'” sẽ được triển khai sau khi trang chủ được phê duyệt. Liên kết đã được dự kiến trong cấu trúc WordPress.');}));
document.querySelectorAll('[data-pending]').forEach(b=>b.addEventListener('click',()=>notice(b.dataset.pending)));
document.querySelector('.close-notice').onclick=()=>closeDialog(document.querySelector('#notice-dialog'));
document.querySelectorAll('#consult-dialog form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.querySelector('.form-status').textContent='Đã kiểm tra giao diện form. Thông tin chưa được gửi hoặc lưu; chưa có lịch hẹn nào được xác nhận.';}));


// Bản demo chỉ để duyệt bố cục. Không gửi hoặc lưu dữ liệu người dùng.
const tabs = [...document.querySelectorAll('[data-tab]')];
tabs.forEach(button => button.addEventListener('click', () => {
  const target = button.dataset.tab;
  tabs.forEach(tab => { const selected = tab === button; tab.classList.toggle('active', selected); tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelectorAll('.tab-panel').forEach(panel => { const selected = panel.id === `panel-${target}`; panel.classList.toggle('active', selected); panel.hidden = !selected; });
}));

const tablist=document.querySelector('#work-study-v1 [role="tablist"]');
tabs.forEach((tab,i)=>{tab.tabIndex=i===0?0:-1;tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();tabs[n].click();tabs[n].focus();});});
// TODO CRM endpoint. Never send/store personal information in this review build.
document.querySelector('#consult-demo').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#work-study-v1 .form-feedback').textContent='Đây là bản demo giao diện: thông tin chưa được gửi hoặc lưu. Form sẽ được kết nối CRM khi thiết kế được duyệt.';});

// School photographs remain excluded pending permission; approved local images render in HTML.
