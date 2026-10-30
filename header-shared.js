/* Shared accessible dropdown controller for the two existing navigation groups. */
(()=>{'use strict';
const header=document.querySelector('body>header');if(!header||header.dataset.sharedHeader)return;header.dataset.sharedHeader='1';
const nav=header.querySelector('nav'),menu=header.querySelector('.menu-toggle');if(!nav||!menu)return;
const desktop=matchMedia('(min-width:1201px) and (hover:hover) and (pointer:fine)'),oldRoutes=new WeakSet();
const groups=[...header.querySelectorAll('.nav-group')].map(el=>({el,toggle:el.querySelector('.dropdown-toggle'),panel:el.querySelector('.dropdown'),timer:0})).filter(g=>g.toggle&&g.panel);
header.querySelectorAll('a[data-route]').forEach(a=>{if(/\/(ve-an-chau|chuong-trinh-du-hoc|kinh-nghiem-du-hoc|khoa-hoc|tin-tuc|lien-he)\//.test(a.pathname)){oldRoutes.add(a);a.removeAttribute('data-route');}});
function syncActive(){const current=location.pathname.replace(/\/$/,''),topic=new URLSearchParams(location.search).get('topic');
nav.querySelectorAll('a').forEach(a=>{a.removeAttribute('aria-current');const url=new URL(a.href),path=url.pathname.replace(/\/$/,''),key=url.searchParams.get('topic');if(key){if(path===current&&key===topic)a.setAttribute('aria-current','page');}else if(path===current||(a.closest('.nav-parent')&&current.startsWith(path+'/')))a.setAttribute('aria-current',path===current&&!topic?'page':'location');});}
syncActive();addEventListener('anchau:topic-change',syncActive);
function drop(g,open,dismiss=false){clearTimeout(g.timer);g.el.classList.toggle('ac-header-open',open);g.el.classList.remove('open');g.el.classList.toggle('ac-header-dismissed',!open&&dismiss);g.toggle.setAttribute('aria-expanded',String(open));g.panel.inert=!open;}
function open(g){groups.forEach(x=>drop(x,x===g,x!==g));}
function mobile(on){nav.classList.toggle('open',on);menu.setAttribute('aria-expanded',String(on));menu.setAttribute('aria-label',on?'Đóng menu':'Mở menu');menu.textContent=on?'×':'☰';if(!on)groups.forEach(g=>drop(g,false,true));}
header.addEventListener('click',e=>{const target=e.target.closest('button,a');if(!target)return;if(target===menu){e.preventDefault();e.stopImmediatePropagation();mobile(!nav.classList.contains('open'));return;}const g=groups.find(g=>g.toggle===target);if(g){e.preventDefault();e.stopImmediatePropagation();if(g.el.classList.contains('ac-header-open'))drop(g,false,true);else open(g);}else if(target.tagName==='A'){if(oldRoutes.has(target))e.stopImmediatePropagation();if(!desktop.matches)mobile(false);}},true);
groups.forEach(g=>{
 g.el.addEventListener('pointerenter',e=>{if(desktop.matches&&e.pointerType!=='touch')open(g);});
 g.el.addEventListener('pointerleave',()=>{if(desktop.matches){clearTimeout(g.timer);g.timer=setTimeout(()=>{if(!g.el.contains(document.activeElement))drop(g,false);},150);}});
 g.el.addEventListener('focusin',e=>{if(desktop.matches&&(!g.el.classList.contains('ac-header-dismissed')||!g.el.contains(e.relatedTarget)))open(g);});
 g.el.addEventListener('focusout',()=>{clearTimeout(g.timer);g.timer=setTimeout(()=>{if(!g.el.contains(document.activeElement)&&!(desktop.matches&&g.el.matches(':hover')))drop(g,false);},150);});
 drop(g,desktop.matches&&g.el.matches(':hover'));
});
document.addEventListener('keydown',e=>{if(e.key!=='Escape'||document.querySelector('dialog[open]'))return;const g=groups.find(g=>g.el.classList.contains('ac-header-open'));if(g){e.stopImmediatePropagation();drop(g,false,true);g.toggle.focus();}else if(nav.classList.contains('open')){e.stopImmediatePropagation();mobile(false);menu.focus();}},true);
document.addEventListener('pointerdown',e=>{if(!header.contains(e.target)){groups.forEach(g=>drop(g,false,true));if(!desktop.matches)mobile(false);}});
desktop.addEventListener('change',()=>mobile(false));
})();
