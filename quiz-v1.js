const header=document.querySelector('header');
const syncHeader=()=>header.classList.toggle('sticky',scrollY>30);
addEventListener('scroll',syncHeader,{passive:true});
addEventListener('pageshow',syncHeader);
syncHeader();
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Đóng menu':'Mở menu');menu.textContent=open?'×':'☰';if(!open){document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
document.querySelector('.dropdown-toggle').addEventListener('click',e=>{const open=document.querySelector('.nav-group').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open);});
addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰';document.querySelector('.nav-group').classList.remove('open');document.querySelector('.dropdown-toggle').setAttribute('aria-expanded','false');}});
const openers=new WeakMap();function openDialog(d){openers.set(d,document.activeElement);d.showModal();document.body.classList.add('modal-open');}function closeDialog(d){d.close();}document.querySelectorAll('#consult-dialog, #notice-dialog').forEach(d=>{d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');openers.get(d)?.focus();});d.querySelector('.close-dialog').onclick=()=>closeDialog(d);d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});});
document.querySelectorAll('[data-consult]').forEach(b=>b.addEventListener('click',()=>{const d=document.querySelector('#consult-dialog');d.querySelector('form').reset();d.querySelector('.form-status').textContent='';d.querySelector('form').dataset.source=b.dataset.consult;document.querySelector('#context').textContent=b.dataset.consult;openDialog(d);}));
function notice(msg){document.querySelector('#notice-text').textContent=msg;openDialog(document.querySelector('#notice-dialog'));}
document.querySelectorAll('[data-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();notice('Bạn có thể truy cập mục “'+a.textContent.trim()+'” qua menu chính.');}));
document.querySelectorAll('[data-pending]').forEach(b=>b.addEventListener('click',()=>notice(b.dataset.pending)));
document.querySelector('.close-notice').onclick=()=>closeDialog(document.querySelector('#notice-dialog'));
document.querySelectorAll('#consult-dialog form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();f.querySelector('.form-status').textContent='Chưa thể gửi thông tin lúc này. Thông tin chưa được gửi hoặc lưu.';}));



/* AN CHÂU — quiz demo V1. Question wording is DEMO ONLY; replace with the previously approved 25-question appendix before release. No storage or network requests. */
(() => {
  'use strict';
  const questions = [
    {kind:'pair', axis:'EI', text:'Khi tham gia một hoạt động mới, bạn thường muốn...', opts:[['Trao đổi cùng mọi người trước để có thêm năng lượng.','E'],['Tự tìm hiểu một lúc rồi mới chia sẻ ý kiến.','I']]},
    {kind:'pair', axis:'EI', text:'Sau một ngày bận rộn, điều gì giúp bạn thấy dễ chịu hơn?', opts:[['Có thời gian yên tĩnh để nạp lại năng lượng.','I'],['Gặp gỡ, trò chuyện cùng bạn bè.','E']]},
    {kind:'pair', axis:'EI', text:'Trong một buổi thảo luận, bạn có xu hướng...', opts:[['Nói thành ý tưởng trong lúc trao đổi.','E'],['Nghĩ kỹ rồi mới phát biểu.','I']]},
    {kind:'pair', axis:'SN', text:'Khi học một điều chưa quen, bạn thích bắt đầu bằng...', opts:[['Ví dụ cụ thể và cách làm từng bước.','S'],['Bức tranh tổng thể và các khả năng mới.','N']]},
    {kind:'pair', axis:'SN', text:'Trong một dự án, điều nào hấp dẫn bạn hơn?', opts:[['Tưởng tượng những hướng đi có thể xảy ra.','N'],['Nhìn rõ dữ liệu và việc cần làm ngay.','S']]},
    {kind:'pair', axis:'SN', text:'Khi nghe giải thích một chủ đề, bạn chú ý nhiều hơn đến...', opts:[['Chi tiết thực tế và điều có thể kiểm chứng.','S'],['Ý nghĩa và mối liên hệ phía sau câu chuyện.','N']]},
    {kind:'pair', axis:'TF', text:'Khi cùng nhóm đưa ra quyết định, bạn thường ưu tiên...', opts:[['Lý lẽ, tiêu chí và sự nhất quán.','T'],['Ảnh hưởng của lựa chọn đến những người liên quan.','F']]},
    {kind:'pair', axis:'TF', text:'Nếu bạn bè gặp khó khăn, phản ứng đầu tiên của bạn là...', opts:[['Lắng nghe cảm xúc và thể hiện sự đồng cảm.','F'],['Giúp phân tích vấn đề và tìm cách giải quyết.','T']]},
    {kind:'pair', axis:'TF', text:'Khi nhận góp ý về bài làm, bạn muốn nghe trước...', opts:[['Những điểm hợp lý, chưa hợp lý để cải thiện.','T'],['Cách góp ý tôn trọng cảm xúc và nỗ lực.','F']]},
    {kind:'pair', axis:'JP', text:'Trước một chuyến đi, bạn thường muốn...', opts:[['Lên lịch trình và chuẩn bị trước những việc quan trọng.','J'],['Chừa chỗ để thay đổi kế hoạch theo cảm hứng.','P']]},
    {kind:'pair', axis:'JP', text:'Khi làm bài tập dài ngày, bạn thấy thoải mái hơn nếu...', opts:[['Có thể linh hoạt thay đổi thứ tự và cách làm.','P'],['Có các mốc hoàn thành rõ ràng từ đầu.','J']]},
    {kind:'pair', axis:'JP', text:'Khi có hai lựa chọn đều thú vị, bạn thường...', opts:[['Chốt phương án để tập trung triển khai.','J'],['Giữ các lựa chọn mở để tìm hiểu thêm.','P']]},
    {kind:'likert', group:'R', text:'Bạn có hứng thú tự lắp ráp, sửa chữa hoặc làm ra một sản phẩm bằng tay không?'},
    {kind:'likert', group:'I', text:'Bạn có thích tìm hiểu vì sao một hiện tượng xảy ra và thử kiểm chứng lời giải không?'},
    {kind:'likert', group:'A', text:'Bạn có thích sáng tạo hình ảnh, câu chuyện, ý tưởng hoặc cách thể hiện mới không?'},
    {kind:'likert', group:'S', text:'Bạn có thấy vui khi hướng dẫn hoặc giúp người khác hiểu một vấn đề không?'},
    {kind:'likert', group:'E', text:'Bạn có hứng thú thuyết phục, tổ chức hoạt động hoặc dẫn dắt nhóm không?'},
    {kind:'likert', group:'C', text:'Bạn có thích sắp xếp dữ liệu, kiểm tra chi tiết hoặc làm theo quy trình rõ ràng không?'},
    {kind:'likert', group:'R', text:'Bạn có muốn thử thực hành với máy móc, dụng cụ, mô hình hoặc thiết bị không?'},
    {kind:'likert', group:'I', text:'Bạn có hứng thú nghiên cứu sâu một câu hỏi để tìm bằng chứng không?'},
    {kind:'likert', group:'A', text:'Bạn có thích biến một ý tưởng thành bản thiết kế, bài viết hay sản phẩm sáng tạo không?'},
    {kind:'likert', group:'S', text:'Bạn có muốn tham gia hoạt động hỗ trợ, kết nối hoặc chăm sóc cộng đồng không?'},
    {kind:'likert', group:'E', text:'Bạn có thích lập kế hoạch, giới thiệu ý tưởng và vận động mọi người cùng thực hiện không?'},
    {kind:'likert', group:'C', text:'Bạn có hứng thú quản lý lịch trình, hồ sơ hoặc những công việc cần độ chính xác không?'},
    {kind:'stage', text:'Hiện tại, bạn đang ở đâu trên hành trình chọn ngành, trường hoặc kế hoạch du học?', opts:[['Mình đang khám phá bản thân và những lựa chọn có thể.','explore'],['Mình có vài lĩnh vực yêu thích nhưng chưa chọn rõ.','consider'],['Mình đang so sánh ngành, trường hoặc chương trình.','compare'],['Mình đã có hướng đi và muốn lên lộ trình cụ thể.','plan']]}
  ];
  const likertLabels = ['Rất không thích','Không thích lắm','Bình thường','Khá thích','Rất thích'];
  const RIASEC = {
    R:{name:'Thực hành',desc:'công nghệ ứng dụng, kỹ thuật và hoạt động thực tế'},
    I:{name:'Tìm hiểu',desc:'nghiên cứu, phân tích và các câu hỏi khoa học'},
    A:{name:'Sáng tạo',desc:'thiết kế, ngôn ngữ, truyền thông và nghệ thuật'},
    S:{name:'Kết nối',desc:'giáo dục, hỗ trợ cộng đồng và các lĩnh vực làm việc với con người'},
    E:{name:'Dẫn dắt',desc:'kinh doanh, tổ chức, quản lý và phát triển ý tưởng'},
    C:{name:'Tổ chức',desc:'dữ liệu, kế hoạch, kế toán và vận hành có hệ thống'}
  };
  const axes = [
    {key:'EI', a:'E · Hướng ra ngoài', b:'I · Hướng vào trong',labels:{E:'Thích trao đổi để phát triển ý tưởng',I:'Thích suy nghĩ độc lập để đào sâu'}},
    {key:'SN', a:'S · Chú ý thực tế', b:'N · Khám phá khả năng',labels:{S:'Quan tâm dữ kiện và ví dụ cụ thể',N:'Quan tâm ý tưởng và khả năng tương lai'}},
    {key:'TF', a:'T · Cân nhắc lý lẽ', b:'F · Cân nhắc con người',labels:{T:'Ưu tiên phân tích theo tiêu chí',F:'Ưu tiên tác động đến mọi người'}},
    {key:'JP', a:'J · Ưa kế hoạch', b:'P · Ưa linh hoạt',labels:{J:'Thích có kế hoạch và mốc rõ ràng',P:'Thích để mở lựa chọn và điều chỉnh'}}
  ];
  const $ = (id) => document.getElementById(id);
  const answers = Array(25).fill(null);
  let idx = 0;
  const focusQuestion = () => $('quizCard').focus?.({preventScroll:true});
  const pad = (n) => String(n).padStart(2,'0');
  function buttonOption(label,value,index,selected,kind){
    const btn = document.createElement('button');
    btn.type='button';btn.className='option'+(selected?' selected':'');btn.setAttribute('aria-pressed',String(selected));
    btn.setAttribute('aria-label',kind==='likert'?`${value} trên 5: ${label}`:label);
    const bullet=document.createElement('span');bullet.className='bullet';bullet.textContent=selected?'✓':'';bullet.setAttribute('aria-hidden','true');
    const copy=document.createElement('span');copy.className='option-label';copy.textContent=label;
    const key=document.createElement('span');key.className='option-key';key.textContent=kind==='likert'?String(value):kind==='pair'?String.fromCharCode(65+index):'';
    if(kind==='likert'){btn.append(key,bullet,copy)}else{btn.append(bullet,copy,key)}
    btn.addEventListener('click',()=>{ answers[idx]=value;render();const next=$('nextBtn');next.disabled=false; });
    return btn;
  }
  function render(){
    const q=questions[idx], num=idx+1;
    $('asideStep').textContent=pad(num);
    $('asideLead').textContent=idx<12?'Bạn có xu hướng lựa chọn như thế nào?':idx<24?'Những hoạt động nào khiến bạn hứng thú?':'Bạn muốn khám phá điều gì tiếp theo?';
    $('quizCount').textContent=`${pad(num)}/25`;
    $('quizProgress').setAttribute('aria-valuenow',String(answers.filter(v=>v!==null).length));
    $('progressFill').style.width=`${answers.filter(v=>v!==null).length*4}%`;
    $('questionType').textContent=idx<12?'PHẦN 1 · XU HƯỚNG CÁ NHÂN':idx<24?'PHẦN 2 · SỞ THÍCH NGHỀ NGHIỆP':'PHẦN 3 · HÀNH TRÌNH CỦA BẠN';
    $('questionText').textContent=q.text;
    $('questionHelp').textContent=q.kind==='likert'?'Chọn mức độ yêu thích gần với cảm nhận của bạn nhất.':'Chọn một phương án gần với bạn nhất.';
    const options=$('options');options.innerHTML='';options.className='options'+(q.kind==='likert'?' likert':'');
    if(q.kind==='likert'){
      likertLabels.forEach((label,i)=>options.append(buttonOption(label,i+1,i,answers[idx]===i+1,'likert')));
    }else{
      q.opts.forEach(([label,value],i)=>options.append(buttonOption(label,value,i,answers[idx]===value,q.kind)));
    }
    $('backBtn').disabled=idx===0;
    $('nextBtn').disabled=answers[idx]===null;
    $('nextBtn').innerHTML=idx===24?'Xem kết quả <span aria-hidden="true">→</span>':'Tiếp tục <span aria-hidden="true">→</span>';
  }
  function make(tag,klass,txt){const e=document.createElement(tag);if(klass)e.className=klass;if(txt!==undefined)e.textContent=txt;return e;}
  function showResult(){
    if(answers.some(a=>a===null)){const first=answers.findIndex(a=>a===null);idx=first;render();return;}
    const tendencies = {};
    axes.forEach(axis=>{
      const vals=questions.slice(0,12).map((q,i)=>q.axis===axis.key?answers[i]:null).filter(Boolean);
      const leftKey=axis.a[0],leftCount=vals.filter(v=>v===leftKey).length;
      tendencies[axis.key]={left:leftCount,right:3-leftCount,label:leftCount>=2?axis.labels[leftKey]:axis.labels[axis.b[0]]};
    });
    const box=$('personalityItems');box.replaceChildren();
    axes.forEach(axis=>{
      const stat=tendencies[axis.key],row=make('div','personality-row');
      const summary=make('div','tendency',stat.label);
      const labels=make('div','traits');labels.append(make('span','',axis.a),make('span','',axis.b));
      const track=make('div','dual-meter');const left=make('span');const right=make('span');left.style.width=`${stat.left/3*100}%`;right.style.width=`${stat.right/3*100}%`;track.append(left,right);row.append(summary,labels,track);box.append(row);
    });
    const scores={};Object.keys(RIASEC).forEach(k=>scores[k]=0);
    questions.forEach((q,i)=>{if(q.kind==='likert')scores[q.group]+=Number(answers[i]);});
    const max=Math.max(...Object.values(scores)),min=Math.min(...Object.values(scores));
    const standout=max-min>1;
    let topCodes=Object.keys(scores).filter(k=>scores[k]>=max-1);
    if(topCodes.length>3)topCodes=Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,3);
    const scoresBox=$('interestItems');scoresBox.replaceChildren();
    Object.keys(RIASEC).forEach(k=>{
      const r=make('div','interest-row'+(standout&&topCodes.includes(k)?' high':''));
      const label=make('span','interest-label',`${k} · ${RIASEC[k].name}`);
      const track=make('div','single-meter');const span=make('span');span.style.width=`${scores[k]*10}%`;track.append(span);
      r.append(label,track,make('span','interest-score',`${scores[k]}/10`));scoresBox.append(r);
    });
    $('outlookTitle').textContent=standout?`Khám phá thêm: ${topCodes.map(k=>RIASEC[k].name.toLowerCase()).join(' · ')}`:'Bạn có nhiều sở thích khá cân bằng';
    $('outlookText').textContent=standout?`Bạn có thể bắt đầu tìm hiểu các lĩnh vực như ${topCodes.slice(0,3).map(k=>RIASEC[k].desc).join('; ')}. Đây là ý tưởng để khám phá, không phải đề xuất ngành hoặc hệ du học bắt buộc.`:'Các nhóm sở thích của bạn có điểm tương đối gần nhau. Hãy thử trải nghiệm thêm nhiều lĩnh vực, trao đổi với người có kinh nghiệm và quan sát điều mình thực sự thích.';
    const stages={explore:'Bạn đang ở giai đoạn khám phá — chưa cần quyết định ngay.',consider:'Bạn đã có một vài mối quan tâm — hãy thử tìm hiểu sâu hơn.',compare:'Bạn đang so sánh lựa chọn — hãy làm rõ tiêu chí ưu tiên.',plan:'Bạn muốn lên lộ trình — hãy kiểm tra điều kiện của từng chương trình.'};
    $('stageText').textContent=stages[answers[24]]||'';
    $('assessmentArea').hidden=true;$('result').hidden=false;
    $('result').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    $('resultTitle').focus?.({preventScroll:true});
  }
  $('backBtn').addEventListener('click',()=>{if(idx>0){idx--;render();}});
  $('nextBtn').addEventListener('click',()=>{if(answers[idx]===null)return;if(idx===24){showResult();return;}idx++;render();});
  $('restartBtn').addEventListener('click',()=>{answers.fill(null);idx=0;$('result').hidden=true;$('assessmentArea').hidden=false;render();$('assessmentArea').scrollIntoView({behavior:'smooth',block:'start'});});
  const dialog=$('consultDialog');
  const openDialog=(title)=>{$('dialogTitle').textContent=title;dialog.showModal();};
  document.querySelectorAll('[data-open-consult]').forEach(el=>el.addEventListener('click',()=>openDialog(el.dataset.openConsult)));
  $('headerContact')?.addEventListener('click',(e)=>{e.preventDefault();openDialog('Đặt lịch tư vấn');});
  $('dialogClose').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',(e)=>{if(e.target===dialog)dialog.close();});
  document.addEventListener('keydown',(e)=>{
    if(!$('assessmentArea').hidden && !e.altKey && !e.ctrlKey && !e.metaKey && !e.repeat && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){
      if(['ArrowLeft','Backspace'].includes(e.key)&&idx>0){e.preventDefault();idx--;render();}
    }
  });
  render();
})();
