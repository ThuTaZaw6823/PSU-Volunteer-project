'use strict';
const projectUrl = 'https://psu-english-fun-camp.thutazawjohan.chatgpt.site';
const photos = [
  {src:'assets/activities-1.jpg',caption:'Welcoming everyone to English Fun Camp',category:'activities',alt:'PSU student volunteers introducing the camp in front of the children'},
  {src:'assets/group-1.jpg',caption:'One camp, one big group',category:'together',alt:'Children and student volunteers smiling together at the camp'},
  {src:'assets/activities-2.jpg',caption:'Sharing the next activity',category:'activities',alt:'Student volunteers speaking to the children during the camp'},
  {src:'assets/group-2.jpg',caption:'Learning is better together',category:'together',alt:'Camp participants and the student volunteer team posing for a photo'},
  {src:'assets/activities-3.jpg',caption:'Teamwork behind the activities',category:'activities',alt:'Volunteers gathering around a table with camp materials'},
  {src:'assets/group-3.jpg',caption:'A morning to remember',category:'together',alt:'Children sitting together with the volunteer team behind them'},
  {src:'assets/group-4.jpg',caption:'A final moment together',category:'together',alt:'Children and the student volunteer team at Phuket Sunshine Village Foundation'}
];
const menu = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
function closeMenu(){ nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const grid=document.getElementById('photo-grid');
const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightbox-image');
let visiblePhotos=photos;
let currentPhoto=0;
let photoOpener=null;
function showPhoto(index){
 currentPhoto=(index+visiblePhotos.length)%visiblePhotos.length;
 const photo=visiblePhotos[currentPhoto];
 lightboxImage.src=photo.src;lightboxImage.alt=photo.alt;
 document.getElementById('lightbox-caption').textContent=photo.caption;
 document.getElementById('photo-counter').textContent=`${currentPhoto+1} / ${visiblePhotos.length}`;
}
function renderPhotos(filter='all'){
 visiblePhotos=filter==='all'?photos:photos.filter(p=>p.category===filter);
 grid.replaceChildren();
 visiblePhotos.forEach((photo,index)=>{
  const button=document.createElement('button');button.type='button';button.className='gallery-photo';button.setAttribute('aria-label',`View photo: ${photo.caption}`);
  const img=document.createElement('img');img.src=photo.src;img.alt=photo.alt;img.loading='lazy';img.width=960;img.height=photo.category==='together'?1280:720;
  const caption=document.createElement('span');caption.textContent=photo.caption;
  button.append(img,caption);button.addEventListener('click',()=>{photoOpener=button;showPhoto(index);lightbox.showModal();});grid.append(button);
 });
}
renderPhotos();
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 renderPhotos(button.dataset.filter);
}));
document.getElementById('close-lightbox').addEventListener('click',()=>lightbox.close());
document.getElementById('previous-photo').addEventListener('click',()=>showPhoto(currentPhoto-1));
document.getElementById('next-photo').addEventListener('click',()=>showPhoto(currentPhoto+1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox){const r=lightbox.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)lightbox.close();}});
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(currentPhoto-1);}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(currentPhoto+1);}});
lightbox.addEventListener('close',()=>photoOpener?.focus());
document.getElementById('copy-link').addEventListener('click',async()=>{
 const status=document.getElementById('share-status');
 try{await navigator.clipboard.writeText(projectUrl);status.textContent='Website link copied. Ready to share.';}
 catch{status.textContent=`Copy this link: ${projectUrl}`;}
});
