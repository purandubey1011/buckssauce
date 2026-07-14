import { gsap } from '../core/gsap.js';

export const initAccordions = () => {
  const items=[...document.querySelectorAll('.faq-item')]; if(!items.length)return;
  const close=item=>{const button=item.querySelector('button');const answer=item.querySelector('.faq-answer');button.setAttribute('aria-expanded','false');button.querySelector('b').textContent='+';gsap.to(answer,{height:0,opacity:0,duration:.35,onComplete:()=>{answer.hidden=true;answer.style.height='';}});};
  const open=item=>{const button=item.querySelector('button');const answer=item.querySelector('.faq-answer');if(innerWidth>=768)items.filter(x=>x!==item).forEach(close);answer.hidden=false;button.setAttribute('aria-expanded','true');button.querySelector('b').textContent='−';gsap.fromTo(answer,{height:0,opacity:0},{height:'auto',opacity:1,duration:.45,ease:'power3.out'});};
  items.forEach(item=>item.querySelector('button').addEventListener('click',()=>item.querySelector('button').getAttribute('aria-expanded')==='true'?close(item):open(item)));
  const target=location.hash&&document.querySelector(location.hash);if(target?.classList.contains('faq-item')){open(target);setTimeout(()=>target.scrollIntoView({block:'start'}),100);}
};
