import { gsap } from '../core/gsap.js';

export const initMarquees = () => document.querySelectorAll('[data-marquee]').forEach(track=>{
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const tween=gsap.to(track,{xPercent:-50,duration:28,ease:'none',repeat:-1});
  track.addEventListener('pointerenter',()=>tween.pause());track.addEventListener('pointerleave',()=>tween.play());document.addEventListener('visibilitychange',()=>document.hidden?tween.pause():tween.play());
});
