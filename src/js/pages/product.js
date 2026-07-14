export const initProduct = () => {
  const gallery=document.querySelector('[data-gallery]');if(!gallery)return;let view='front';
  const setView=next=>{view=next;gallery.querySelectorAll('.product-photo').forEach(photo=>photo.classList.toggle('is-active',photo.dataset.view===view));gallery.querySelectorAll('[data-gallery-view]').forEach(button=>button.classList.toggle('is-active',button.dataset.galleryView===view));};
  gallery.querySelector('.gallery-next').addEventListener('click',()=>setView(view==='front'?'back':'front'));gallery.querySelector('.gallery-prev').addEventListener('click',()=>setView(view==='front'?'back':'front'));gallery.querySelectorAll('[data-gallery-view]').forEach(button=>button.addEventListener('click',()=>setView(button.dataset.galleryView)));
  const input=document.querySelector('[data-qty]');document.querySelector('[data-qty-minus]').addEventListener('click',()=>input.value=Math.max(1,(parseInt(input.value)||1)-1));document.querySelector('[data-qty-plus]').addEventListener('click',()=>input.value=Math.min(12,(parseInt(input.value)||1)+1));input.addEventListener('change',()=>input.value=Math.min(12,Math.max(1,parseInt(input.value)||1)));
  document.title=`${document.querySelector('.product-info h1').textContent} — Molten Mouth`;
};
