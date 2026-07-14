import { gsap, ScrollTrigger } from '../core/gsap.js';
import { products, bundles } from '../data/products.js';

export const initHome = async cart => {
  if(!document.querySelector('[data-home]'))return;
  let index=0,busy=false;const hero=document.querySelector('.hero');const stage=hero.querySelector('[data-hero-stage]');const name=hero.querySelector('[data-hero-name]');const number=hero.querySelector('[data-hero-number]');const copy=hero.querySelector('[data-hero-copy]');
  const bottle=stage.querySelector('.bottle-art');const label=bottle.querySelector('.bottle-label');const orbitOne=stage.querySelector('.orbit--one');const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const applyProduct=product=>{
    stage.style.setProperty('--product',product.color);
    bottle.setAttribute('aria-label',`Bottle of ${product.name}`);
    bottle.querySelector('.bottle-label small').textContent=product.name;
    bottle.querySelector('.bottle-label em').textContent=product.glyph;
    stage.querySelector('.orbit--one').textContent=product.glyph;
    name.textContent=product.name;
    copy.textContent=product.description;
    number.textContent=String(index+1).padStart(2,'0');
    hero.style.setProperty('--accent',product.color);
    window.heroScene?.setColor(product.color);
  };
  const update=direction=>{
    if(busy)return;
    busy=true;
    index=(index+direction+products.length)%products.length;
    const product=products[index];
    if(reduced){applyProduct(product);busy=false;return;}

    const animated=[bottle,label,orbitOne,name,number,copy];
    gsap.timeline({
      defaults:{overwrite:'auto'},
      onStart:()=>gsap.set(animated,{willChange:'transform, opacity'}),
      onComplete:()=>{gsap.set(animated,{clearProps:'transform,opacity,willChange'});busy=false;}
    })
      .to(bottle,{scale:.985,duration:.62,ease:'sine.inOut'},0)
      .to(label,{scale:.97,opacity:0,duration:.58,ease:'sine.inOut'},0)
      .to(orbitOne,{scale:.9,opacity:0,duration:.52,ease:'sine.inOut'},0)
      .to(name,{y:direction*7,opacity:0,duration:.5,ease:'sine.inOut'},0)
      .to(copy,{y:direction*7,opacity:0,duration:.56,ease:'sine.inOut'},.04)
      .to(number,{y:direction*6,opacity:0,duration:.46,ease:'sine.inOut'},.02)
      .call(()=>applyProduct(product),[],.6)
      .set(label,{scale:1.025,opacity:0},.6)
      .set(orbitOne,{scale:.9,opacity:0},.6)
      .set([name,copy],{y:-direction*7,opacity:0},.6)
      .set(number,{y:-direction*6,opacity:0},.6)
      .to(bottle,{scale:1,duration:1.1,ease:'sine.out'},.6)
      .to(label,{scale:1,opacity:1,duration:1.08,ease:'power2.out'},.62)
      .to(orbitOne,{scale:1,opacity:1,duration:1.02,ease:'power2.out'},.66)
      .to(name,{y:0,opacity:1,duration:.96,ease:'power2.out'},.68)
      .to(copy,{y:0,opacity:1,duration:1.02,ease:'power2.out'},.74)
      .to(number,{y:0,opacity:1,duration:.9,ease:'power2.out'},.7);
  };
  let autoplayTimer;
  const scheduleAutoplay=()=>{
    clearTimeout(autoplayTimer);
    if(document.hidden)return;
    autoplayTimer=setTimeout(()=>{update(1);scheduleAutoplay();},4000);
  };
  const changeManually=direction=>{update(direction);scheduleAutoplay();};
  hero.querySelector('[data-hero-next]').addEventListener('click',()=>changeManually(1));hero.querySelector('[data-hero-prev]').addEventListener('click',()=>changeManually(-1));
  document.addEventListener('visibilitychange',scheduleAutoplay);
  scheduleAutoplay();
  gsap.from('.hero-copy > *',{y:70,opacity:0,duration:1,stagger:.08,ease:'power4.out',delay:.2});gsap.from(stage,{scale:.8,rotation:-8,opacity:0,duration:1.2,ease:'back.out(1.4)',delay:.35});
  document.querySelectorAll('.product-take').forEach(card=>ScrollTrigger.create({trigger:card,start:'top 55%',end:'bottom 45%',toggleClass:'is-active'}));
  const film=document.querySelector('[data-film]');const filmButton=film.querySelector('.film-toggle');const filmCanvas=film.querySelector('canvas');const fctx=filmCanvas.getContext('2d');let filmPlaying=false,filmRaf,t=0;
  const resizeFilm=()=>{filmCanvas.width=film.clientWidth;filmCanvas.height=film.clientHeight;};const drawFilm=()=>{fctx.clearRect(0,0,filmCanvas.width,filmCanvas.height);for(let i=0;i<20;i++){fctx.fillStyle=`rgba(233,81,45,${.02+(i%4)*.01})`;fctx.beginPath();fctx.arc((Math.sin(t*.01+i)*.45+.5)*filmCanvas.width,(Math.cos(t*.008+i*2)*.35+.5)*filmCanvas.height,12+i*2,0,Math.PI*2);fctx.fill();}t++;if(filmPlaying)filmRaf=requestAnimationFrame(drawFilm);};resizeFilm();addEventListener('resize',resizeFilm);filmButton.addEventListener('click',()=>{filmPlaying=!filmPlaying;filmButton.setAttribute('aria-pressed',String(filmPlaying));filmButton.querySelector('span').textContent=filmPlaying?'Ⅱ':'▶';filmButton.querySelector('b').textContent=filmPlaying?'Pause kitchen loop':'Play kitchen loop';if(filmPlaying)drawFilm();else cancelAnimationFrame(filmRaf);});
  const builder=document.querySelector('[data-bundle-builder]');builder?.addEventListener('click',event=>{const option=event.target.closest('[data-bundle]');if(option){builder.querySelectorAll('[role="radio"]').forEach(b=>b.setAttribute('aria-checked',String(b===option)));const b=bundles.find(x=>x.id===option.dataset.bundle);builder.querySelector('[data-bundle-name]').textContent=b.name;builder.querySelector('[data-bundle-price]').textContent=`$${b.price}`;builder.querySelector('[data-bundle-save]').textContent=`Save $${b.savings}`;gsap.fromTo(builder.querySelectorAll('.bottle-art'),{x:i=>(i-1)*40,rotation:i=>(i-1)*-8},{x:0,rotation:0,duration:.7,ease:'back.out(1.5)'});}if(event.target.closest('[data-add-bundle]')){const active=builder.querySelector('[aria-checked="true"]');const b=bundles.find(x=>x.id===active.dataset.bundle);cart.add(b.id,1,{id:b.id,name:b.name,price:b.price,color:'#e9512d',glyph:'✦'});}});
  try{const {initHeroScene}=await import('../webgl/heroScene.js');window.heroScene=initHeroScene(hero.querySelector('.hero-webgl'),products[0].color);}catch{hero.classList.add('no-webgl');}
};
