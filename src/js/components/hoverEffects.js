import { gsap } from '../core/gsap.js';

const magneticSelector = [
  '.button', '.icon-button', '.circle-button', '.text-link',
  '.desktop-nav a', '.footer-links a', '.filter-buttons button',
  '.segmented button', '.gallery-thumbs button'
].join(',');

const tiltSelector = [
  '.product-take .bottle-art', '.shop-row .bottle-art',
  '.related-grid .bottle-art', '.about-collage img'
].join(',');

export const initHoverEffects = () => {
  if (innerWidth < 768 || matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return null;

  const cleanups = [];
  const headings = [...document.querySelectorAll('h1, h2, h3')]
    .filter(heading => !heading.closest('.cart-drawer'));
  const copy = document.querySelectorAll([
    '.lede', '.statement-copy p', '.reason p', '.shop-row-copy>p',
    '.product-info>.lede', '.faq-answer p', '.contact-copy p', '.philosophy p'
  ].join(','));

  headings.forEach(heading => {
    heading.classList.add('fx-heading');
    const moveX = gsap.quickTo(heading, 'x', { duration: .65, ease: 'power3.out' });
    const skew = gsap.quickTo(heading, 'skewX', { duration: .65, ease: 'power3.out' });
    const onMove = event => {
      const rect = heading.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width - .5;
      moveX(ratio * 8);
      skew(ratio * -1.2);
    };
    const onEnter = () => heading.classList.add('is-hovered');
    const onLeave = () => { heading.classList.remove('is-hovered'); moveX(0); skew(0); };
    heading.addEventListener('pointermove', onMove);
    heading.addEventListener('pointerenter', onEnter);
    heading.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      heading.removeEventListener('pointermove', onMove);
      heading.removeEventListener('pointerenter', onEnter);
      heading.removeEventListener('pointerleave', onLeave);
    });
  });

  copy.forEach(node => node.classList.add('fx-copy'));

  document.querySelectorAll(magneticSelector).forEach(element => {
    element.classList.add('fx-magnetic');
    const moveX = gsap.quickTo(element, 'x', { duration: .45, ease: 'power3.out' });
    const moveY = gsap.quickTo(element, 'y', { duration: .45, ease: 'power3.out' });
    const rotate = gsap.quickTo(element, 'rotation', { duration: .5, ease: 'power3.out' });
    const onMove = event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      moveX(x * .16);
      moveY(y * .2);
      rotate(x * .012);
    };
    const onLeave = () => { moveX(0); moveY(0); rotate(0); };
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    });
  });

  document.querySelectorAll(tiltSelector).forEach(media => {
    const hitArea = media.closest('a, article, figure') || media;
    media.classList.add('fx-media');
    hitArea.classList.add('fx-media-wrap');
    gsap.set(media, { transformPerspective: 900, transformOrigin: '50% 50%' });
    const rotateX = gsap.quickTo(media, 'rotationX', { duration: .55, ease: 'power3.out' });
    const rotateY = gsap.quickTo(media, 'rotationY', { duration: .55, ease: 'power3.out' });
    const scaleX = gsap.quickTo(media, 'scaleX', { duration: .55, ease: 'power3.out' });
    const scaleY = gsap.quickTo(media, 'scaleY', { duration: .55, ease: 'power3.out' });
    const onMove = event => {
      const rect = hitArea.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      rotateY(x * 7);
      rotateX(y * -6);
      scaleX(1.025);
      scaleY(1.025);
    };
    const onEnter = () => hitArea.classList.add('is-hovered');
    const onLeave = () => {
      hitArea.classList.remove('is-hovered');
      rotateX(0); rotateY(0); scaleX(1); scaleY(1);
    };
    hitArea.addEventListener('pointermove', onMove);
    hitArea.addEventListener('pointerenter', onEnter);
    hitArea.addEventListener('pointerleave', onLeave);
    cleanups.push(() => {
      hitArea.removeEventListener('pointermove', onMove);
      hitArea.removeEventListener('pointerenter', onEnter);
      hitArea.removeEventListener('pointerleave', onLeave);
    });
  });

  return { destroy: () => cleanups.forEach(cleanup => cleanup()) };
};
