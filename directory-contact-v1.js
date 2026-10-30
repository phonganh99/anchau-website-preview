(() => {
'use strict';
const source=document.querySelector('#school-data');
if(source){
 const data=JSON.parse(source.textContent);
 // Future CMS adapter: only editor-verified records with a source may render.
 const schools=(Array.isArray(data)?data:[]).filter(s=>s&&s.verified===true&&typeof s.name==='string'&&/^https:\/\//.test(s.source_url||''));
 const search=document.querySelector('#school-search'),program=document.querySelector('#school-program'),region=document.querySelector('#school-region'),status=document.querySelector('#school-status'),list=document.querySelector('#school-list');
 const text=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
 function render(){
  const q=search.value.toLocaleLowerCase('vi').trim();
  const rows=schools.filter(s=>(!q||[s.name,s.international_name].join(' ').toLocaleLowerCase('vi').includes(q))&&(!program.value||(s.programs||[]).includes(program.value))&&(!region.value||s.region===region.value)&&(!status.value||status.value==='verified'));
  document.querySelector('#school-count').textContent=rows.length+' kết quả';list.replaceChildren();
  if(!rows.length){const e=text('div','');e.className='school-empty';e.append(text('strong',q||program.value||region.value||status.value?'Không có kết quả phù hợp':'Danh sách trường đang chờ cập nhật'),text('p',schools.length?'Thử thay đổi bộ lọc hoặc từ khóa.':'Danh sách trường đang được cập nhật.'));list.append(e);return;}
  rows.forEach(s=>{const row=document.createElement('article');row.className='school-row';const photo=text('div','Chờ ảnh được duyệt');photo.className='school-placeholder';const copy=document.createElement('div');copy.append(text('h3',s.name),text('p',s.international_name||''),text('p',[s.location,s.type].filter(Boolean).join(' · ')));
   const citation=text('a','Nguồn thông tin');citation.href=s.source_url;citation.rel='noopener noreferrer';copy.append(citation);
   if(typeof s.detail_url==='string'&&/^\/[^/]/.test(s.detail_url)&&s.detail_exists===true){const link=text('a','Xem chi tiết');link.href=s.detail_url;copy.append(link);}else copy.append(text('p','Trang chi tiết đang chờ cập nhật.'));
   row.append(photo,copy);list.append(row);});
 }
 [search,program,region,status].forEach(el=>el.addEventListener('input',render));
 document.querySelector('#reset-filters').addEventListener('click',()=>{[search,program,region,status].forEach(el=>el.value='');render();});
 const toggle=document.querySelector('#filter-toggle');toggle.addEventListener('click',()=>{const closed=toggle.closest('.filter-panel').classList.toggle('collapsed');toggle.setAttribute('aria-expanded',String(!closed));toggle.firstChild.textContent=closed?'Hiển thị bộ lọc ':'Thu gọn bộ lọc ';});render();
}
const offices={hn:'Trụ sở Hà Nội',na1:'Văn phòng Nghệ An'};let selected='hn';
document.querySelectorAll('[data-office]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.office;document.querySelectorAll('[data-office]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});document.querySelector('#office-title').textContent=offices[selected];document.querySelector('#office-placeholder').textContent='Bản đồ đang được cập nhật. Thông tin liên hệ ở cuối trang.';}));
if(document.querySelector('[data-source="contact_page"]'))document.querySelectorAll('[data-consult]').forEach(b=>b.addEventListener('click',()=>{const f=document.querySelector('#consult-dialog form');f.elements.lead_source.value='contact_page';f.elements.office_id.value=selected;document.querySelector('#context').textContent='Liên hệ · '+offices[selected];}));
})();
