import { gsap } from '../core/gsap.js';

export const initHeader = () => {
  const header=document.querySelector('.site-header'); let last=0; let ticking=false;
  const update=()=>{const y=scrollY;header.classList.toggle('is-scrolled',y>24);if(y>last&&y>160)gsap.to(header,{yPercent:-115,duration:.35});else gsap.to(header,{yPercent:0,duration:.35});last=y;ticking=false;};
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
};
