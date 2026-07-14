import { gsap } from '../core/gsap.js';
import { getProduct } from '../data/products.js';
import { createOverlay } from './overlay.js';

const KEY='molten-mouth-cart-v1';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[];}catch{return [];}};
let cart=load();
const save=()=>localStorage.setItem(KEY,JSON.stringify(cart));
const totalQty=()=>cart.reduce((sum,item)=>sum+item.qty,0);
const subtotal=()=>cart.reduce((sum,item)=>sum+(item.price*item.qty),0);

export const initCart = () => {
  const panel=document.querySelector('.cart-drawer'); const backdrop=document.querySelector('.menu-backdrop'); const live=document.querySelector('.sr-status');
  const api=createOverlay({panel,backdrop,openers:[...document.querySelectorAll('.cart-trigger')],closer:panel.querySelector('.cart-close'),onOpen(){gsap.fromTo(panel,{xPercent:100},{xPercent:0,duration:.6,ease:'power4.out'});gsap.from(panel.querySelectorAll('.cart-row'),{x:40,opacity:0,stagger:.06,delay:.2});},onClose(){gsap.to(panel,{xPercent:100,duration:.45,ease:'power3.inOut'});}});
  document.querySelectorAll('.cart-trigger').forEach(button=>button.onclick=()=>api.open());
  panel.querySelector('.cart-close').onclick=()=>api.close();
  const render=()=>{
    document.querySelectorAll('[data-cart-count]').forEach(node=>node.textContent=totalQty());
    const rows=panel.querySelector('[data-cart-items]'); const empty=panel.querySelector('[data-cart-empty]'); const foot=panel.querySelector('[data-cart-foot]');
    rows.innerHTML=cart.map(item=>`<article class="cart-row" data-cart-id="${item.id}"><span class="cart-swatch" style="--swatch:${item.color}">${item.glyph||'✦'}</span><div><h3>${item.name}</h3><p>$${item.price.toFixed(2)}</p><div class="cart-qty"><button type="button" data-cart-minus aria-label="Decrease ${item.name}">−</button><span aria-label="Quantity">${item.qty}</span><button type="button" data-cart-plus aria-label="Increase ${item.name}">+</button><button type="button" data-cart-remove aria-label="Remove ${item.name}">Remove</button></div></div></article>`).join('');
    empty.hidden=cart.length>0; foot.hidden=cart.length===0; panel.querySelector('[data-cart-total]').textContent=`$${subtotal().toFixed(2)}`;
    document.querySelectorAll('[data-checkout-items]').forEach(node=>node.innerHTML=cart.length?cart.map(i=>`<div><span>${i.name} × ${i.qty}</span><b>$${(i.price*i.qty).toFixed(2)}</b></div>`).join(''):'<p>Your cart is currently empty.</p>');
    document.querySelectorAll('[data-checkout-total]').forEach(node=>node.textContent=`$${subtotal().toFixed(2)}`);
  };
  const add=(id,qty=1,custom)=>{const product=custom||getProduct(id);const found=cart.find(i=>i.id===id);if(found)found.qty+=qty;else cart.push({...product,qty});save();render();live.textContent=`${product.name} added to cart. Cart now has ${totalQty()} items.`;gsap.fromTo('.cart-trigger',{scale:1.25},{scale:1,duration:.45,ease:'back.out(2)'});};
  document.addEventListener('click',event=>{
    const addButton=event.target.closest('.add-to-cart'); if(addButton){if(addButton.disabled)return;addButton.disabled=true;const label=addButton.querySelector('span');const original=label.textContent;label.textContent='Adding';setTimeout(()=>{add(addButton.dataset.product,Number(document.querySelector('[data-qty]')?.value||1));label.textContent='Added';api.open();setTimeout(()=>{label.textContent=original;addButton.disabled=false;},800);},300);return;}
    const action=event.target.closest('[data-cart-plus], [data-cart-minus], [data-cart-remove]');
    if(!action)return;
    const row=action.closest('[data-cart-id]');
    const item=cart.find(i=>i.id===row?.dataset.cartId);
    if(!row||!item)return;

    if(action.matches('[data-cart-plus]')) item.qty++;
    if(action.matches('[data-cart-minus]')) {
      if(item.qty<=1) cart=cart.filter(i=>i.id!==item.id);
      else item.qty--;
    }
    if(action.matches('[data-cart-remove]')) cart=cart.filter(i=>i.id!==item.id);

    save();
    render();
    live.textContent=cart.some(i=>i.id===item.id)
      ? `${item.name} quantity updated to ${item.qty}.`
      : `${item.name} removed from cart.`;
  });
  render();
  return {add,render};
};
