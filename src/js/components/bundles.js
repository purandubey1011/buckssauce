import { gsap } from '../core/gsap.js';
import { bundles } from '../data/products.js';

export const initBundles = cart => document.querySelectorAll('[data-bundle-builder]').forEach(builder=>builder.addEventListener('click',event=>{
  const option=event.target.closest('[data-bundle]');
  if(option){builder.querySelectorAll('[role="radio"]').forEach(button=>button.setAttribute('aria-checked',String(button===option)));const bundle=bundles.find(item=>item.id===option.dataset.bundle);builder.querySelector('[data-bundle-name]').textContent=bundle.name;builder.querySelector('[data-bundle-price]').textContent=`$${bundle.price}`;builder.querySelector('[data-bundle-save]').textContent=`Save $${bundle.savings}`;gsap.fromTo(builder.querySelectorAll('.bottle-art'),{y:25,rotation:index=>(index-1)*9},{y:0,rotation:0,duration:.65,ease:'back.out(1.5)'});}
  if(event.target.closest('[data-add-bundle]')){const selected=builder.querySelector('[aria-checked="true"]');const bundle=bundles.find(item=>item.id===selected.dataset.bundle);cart.add(bundle.id,1,{id:bundle.id,name:bundle.name,price:bundle.price,color:'#e9512d',glyph:'✦'});}
}));
