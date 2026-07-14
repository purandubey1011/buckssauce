import 'lenis/dist/lenis.css';
import '../css/styles.css';
import '../css/pages.css';
import '../css/responsive.css';
import '../css/fixes.css';
import '../css/motion.css';
import { pageTemplates } from './pages/templates.js';
import { shell } from './components/shell.js';
import { initLenis } from './core/lenis.js';
import { runLoader } from './core/loader.js';
import { initTransitions } from './core/transitions.js';
import { initHeader } from './components/header.js';
import { initMenu } from './components/menu.js';
import { initCart } from './components/cart.js';
import { initForms } from './components/forms.js';
import { initAccordions } from './components/accordion.js';
import { initCursor } from './components/cursor.js';
import { initHoverEffects } from './components/hoverEffects.js';
import { initMarquees } from './components/marquee.js';
import { initBundles } from './components/bundles.js';
import { initHome } from './pages/home.js';
import { initShop } from './pages/shop.js';
import { initProduct } from './pages/product.js';
import { initScrollMotion } from './core/scrollMotion.js';
import { ScrollTrigger } from './core/gsap.js';

const page=document.body.dataset.page||'404';const template=pageTemplates[page]||pageTemplates['404'];document.querySelector('#app').innerHTML=shell(template());
const ensureMeta=(selector,attrs)=>{if(document.head.querySelector(selector))return;const node=document.createElement(attrs.tag||'meta');Object.entries(attrs).filter(([key])=>key!=='tag').forEach(([key,value])=>node.setAttribute(key,value));document.head.append(node);};
ensureMeta('meta[property="og:title"]',{property:'og:title',content:document.title});ensureMeta('meta[property="og:description"]',{property:'og:description',content:document.querySelector('meta[name="description"]')?.content||'Original chef-built sauce with real ingredients.'});ensureMeta('meta[property="og:type"]',{property:'og:type',content:page==='product'?'product':'website'});ensureMeta('meta[name="twitter:card"]',{name:'twitter:card',content:'summary_large_image'});ensureMeta('link[rel="icon"]',{tag:'link',rel:'icon',href:'/favicon.svg',type:'image/svg+xml'});
const lenis=initLenis();initTransitions();initHeader();initMenu();const cart=initCart();initForms();initAccordions();const cursor=initCursor();const hoverEffects=initHoverEffects();initMarquees();initShop();initProduct();let scrollMotion;
if(page!=='home')initBundles(cart);
runLoader().then(async()=>{await initHome(cart);scrollMotion=initScrollMotion();if(document.fonts?.ready)await document.fonts.ready;ScrollTrigger.refresh();document.documentElement.classList.add('is-ready');});

if(page==='product'){
  const productName=document.querySelector('.product-info h1')?.textContent;const ld={"@context":"https://schema.org","@type":"Product",name:productName,brand:{"@type":"Brand",name:"Molten Mouth"},offers:{"@type":"Offer",priceCurrency:"USD",price:document.querySelector('.add-to-cart b')?.textContent.replace('$',''),availability:"https://schema.org/InStock"}};const script=document.createElement('script');script.type='application/ld+json';script.textContent=JSON.stringify(ld);document.head.append(script);
}
if(page==='faq'){const questions=[...document.querySelectorAll('.faq-item')].map(item=>({"@type":"Question",name:item.querySelector('button span').textContent.trim(),acceptedAnswer:{"@type":"Answer",text:item.querySelector('.faq-answer').textContent.trim()}}));const script=document.createElement('script');script.type='application/ld+json';script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:questions});document.head.append(script);}
if(page==='home'){const script=document.createElement('script');script.type='application/ld+json';script.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Organization",name:"Molten Mouth",url:"https://moltenmouth.example/",logo:"https://moltenmouth.example/favicon.svg"});document.head.append(script);}
window.addEventListener('pagehide',()=>{lenis?.destroy();cursor?.destroy();hoverEffects?.destroy();scrollMotion?.destroy();window.heroScene?.destroy();});
