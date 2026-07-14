import { gsap } from './gsap.js';

export const initTransitions = () => {
  const wipe = document.querySelector('.page-wipe');
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || link.target || link.hasAttribute('download') || link.origin !== location.origin || link.hash) return;
    const next = link.href;
    if (next === location.href) return;
    event.preventDefault();
    gsap.timeline().set(wipe,{yPercent:100}).to(wipe,{yPercent:0,duration:.55,ease:'power4.inOut'}).call(()=>location.href=next);
  });
  window.addEventListener('pageshow',()=>gsap.set(wipe,{yPercent:-100}));
};
