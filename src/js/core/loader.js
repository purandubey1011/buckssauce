import { gsap } from './gsap.js';

export const runLoader = () => {
  const loader = document.querySelector('.loader');
  if (!loader) return Promise.resolve();
  const repeat = sessionStorage.getItem('mm-seen');
  sessionStorage.setItem('mm-seen','1');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (repeat || reduced) { loader.remove(); return Promise.resolve(); }
  const count = loader.querySelector('.loader-count');
  const state = {n:0};
  return new Promise(resolve => {
    gsap.timeline({onComplete(){loader.remove();resolve();}})
      .to(state,{n:100,duration:.9,ease:'power2.inOut',onUpdate:()=>count.textContent=String(Math.round(state.n)).padStart(2,'0')})
      .to('.loader-mark span',{scaleY:1,duration:.9},0)
      .to(loader,{yPercent:-100,duration:.8,ease:'power4.inOut'});
  });
};
