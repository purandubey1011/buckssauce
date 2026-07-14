import { gsap } from '../core/gsap.js';
import { createOverlay } from './overlay.js';

export const initMenu = () => {
  const panel=document.querySelector('.menu-overlay'); const backdrop=document.querySelector('.menu-backdrop'); const trigger=document.querySelector('.menu-trigger');
  const api=createOverlay({panel,backdrop,openers:[trigger],closer:panel.querySelector('.menu-close'),onOpen(){trigger.setAttribute('aria-expanded','true');gsap.fromTo(panel,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.65,ease:'power4.inOut'});gsap.from(panel.querySelectorAll('.menu-links a'),{yPercent:110,duration:.7,stagger:.06,ease:'power4.out',delay:.25});},onClose(){trigger.setAttribute('aria-expanded','false');gsap.to(panel,{clipPath:'inset(0 0 100% 0)',duration:.45,ease:'power3.inOut'});}});
  trigger.onclick=()=>api.open();
  panel.querySelector('.menu-close').onclick=()=>api.close();
  panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>api.close()));
};
