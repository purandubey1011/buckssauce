import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap.js';

export const initLenis = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const root = document.documentElement;
  const lenis = new Lenis({
    lerp: .12,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    syncTouch: false,
    anchors: { offset: -78 },
    overscroll: false,
    stopInertiaOnNavigate: true,
    prevent: node => Boolean(node.closest?.('.cart-drawer, .menu-overlay'))
  });

  let displayedVelocity = -1;
  const onScroll = event => {
    const velocity = Math.min(Math.abs(event.velocity || 0), 28);
    const normalizedVelocity = Math.round((velocity / 28) * 100) / 100;
    if (normalizedVelocity !== displayedVelocity) {
      displayedVelocity = normalizedVelocity;
      root.style.setProperty('--scroll-velocity', normalizedVelocity);
    }
    root.classList.toggle('is-scrolling', velocity > .18);
    ScrollTrigger.update();
  };

  const update = time => lenis.raf(time * 1000);
  const onOverlay = event => event.detail?.open ? lenis.stop() : lenis.start();

  lenis.on('scroll', onScroll);
  addEventListener('mm:overlay', onOverlay);
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy() {
      gsap.ticker.remove(update);
      removeEventListener('mm:overlay', onOverlay);
      root.classList.remove('is-scrolling');
      root.style.removeProperty('--scroll-velocity');
      lenis.destroy();
    }
  };
};
