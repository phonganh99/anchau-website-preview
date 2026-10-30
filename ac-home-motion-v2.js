/* Adapted from the approved Motion V2 reference; no content, links or assets replaced. */
(() => {
'use strict';
const main=document.querySelector('main#main');
if(!main||document.body.classList.contains('acv2-motion'))return;
// Do not stack with a previous Motion B/V2 integration.
if(document.querySelector('[data-acv2-reveal],.acv2-story-thread,[data-motion-b]'))return;
const pref=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(max-width:768px)');
const seen=new WeakSet();const targets=[];
let observer,routeObserver;
try {
 document.body.classList.add('acv2-motion');
 const progress=document.createElement('div');progress.className='acv2-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
 const thread=document.createElement('div');thread.className='acv2-thread';thread.setAttribute('aria-hidden','true');main.append(thread);
 const scenes=[...main.querySelectorAll(':scope>section')];
 scenes.slice(1).forEach((scene,i)=>{scene.classList.add('acv2-scene');const bridge=document.createElement('div');bridge.className='acv2-bridge';bridge.setAttribute('aria-hidden','true');bridge.innerHTML='<svg viewBox="0 0 550 80" preserveAspectRatio="none"><path d="M0 28C120 8 196 71 333 28S474 9 550 31"/><path d="M0 42C120 22 196 85 333 42S474 23 550 45"/></svg>';scene.prepend(bridge);});
 const groups=[
 ['#ve-an-chau .video-placeholder',-16],['#ve-an-chau > div:last-child',16],
 ['#chuong-trinh .section-heading',0],['#chuong-trinh .program',0],
 ['#kham-pha-ban-than .discovery-master-copy',0],['#kham-pha-ban-than .discovery-master-portrait',0],
 ['#lo-trinh .route-heading',0],['#lo-trinh .route-card',0],
 ['#van-phong .heading-row',0],['#van-phong .office',0],
 ['#tin-tuc .heading-row',0],['#tin-tuc .news-row',0],
 ['#tu-van > div',0],['body>footer .footer-grid>div',0]
 ];
 groups.forEach(([selector,x])=>document.querySelectorAll(selector).forEach((el,i)=>{targets.push(el);el.addEventListener('animationend',event=>{if(event.target===el&&event.animationName==='acv2-reveal')el.classList.remove('acv2-enter');});el.style.setProperty('--acv2-x',x+'px');el.style.setProperty('--acv2-delay',Math.min(i,7)*65+'ms');}));
 if('IntersectionObserver' in window){
  observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting||seen.has(target))return;seen.add(target);if(!pref.matches)target.classList.add('acv2-enter');observer.unobserve(target);}),{threshold:.08,rootMargin:'0px 0px -3% 0px'});
  targets.forEach(el=>observer.observe(el));
  routeObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('acv2-route-current',isIntersecting&&!pref.matches)),{rootMargin:'-20% 0px -20% 0px',threshold:.2});
  document.querySelectorAll('#lo-trinh .route-card').forEach(el=>routeObserver.observe(el));
 }
 // One compositor-only update per frame; no layout measurements in the scroll handler.
 let frame=0,range=Math.max(1,document.documentElement.scrollHeight-innerHeight);
 function paint(){frame=0;const value=Math.max(0,Math.min(1,scrollY/range));document.body.style.setProperty('--acv2-progress',String(value));}
 function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
 function measure(){range=Math.max(1,document.documentElement.scrollHeight-innerHeight);schedule();}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',measure,{passive:true});addEventListener('load',measure,{once:true});
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(main);
 pref.addEventListener('change',()=>{if(pref.matches)targets.forEach(el=>el.classList.remove('acv2-enter','acv2-route-current'));schedule();});
 mobile.addEventListener('change',measure);paint();
} catch(error) {
 // Enhancement failure must leave all existing content readable and clickable.
 observer?.disconnect();routeObserver?.disconnect();document.body.classList.remove('acv2-motion');
 document.querySelectorAll('.acv2-enter').forEach(el=>el.classList.remove('acv2-enter'));
}
})();
