import { gsap, ScrollTrigger } from './gsap.js';

const revealSelector = [
  '.statement-copy', '.campaign-image', '.benefit>div', '.showcase-sticky>*',
  '.product-take-copy>*', '.story-copy>*', '.process-film>div:last-child>*',
  '.bundle-grid>*', '.review', '.shop-controls>*', '.shop-row-copy>*',
  '.product-info>*', '.related>*', '.about-collage>div>*', '.philosophy>*',
  '.origin article>*', '.values>*', '.partner article>*', '.form-section>div>*',
  '.big-form>*', '.faq-item', '.contact-copy>*', '.contact form>*', '.checkout>*'
].join(',');

const parallaxSelector = [
  '.campaign-image img', '.story-image img', '.film-frame img',
  '.origin-sticky img', '.page-hero .bottle-art', '.bottle-cluster'
].join(',');

export const initScrollMotion = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(revealSelector, { clearProps: 'all' });
    return null;
  }

  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
  const context = gsap.context(() => {
    const revealItems = gsap.utils.toArray(revealSelector)
      .filter((item, index, array) => array.indexOf(item) === index)
      .filter(item => !item.matches('h2, h3'));

    gsap.set(revealItems, {
      y: 34,
      opacity: 0,
      willChange: 'transform, opacity'
    });

    ScrollTrigger.batch(revealItems, {
      start: 'top 91%',
      once: true,
      interval: .06,
      batchMax: 5,
      onEnter: batch => gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: .72,
        stagger: .045,
        ease: 'power3.out',
        overwrite: 'auto',
        onComplete: () => batch.forEach(item => {
          item.style.removeProperty('will-change');
        })
      })
    });

    gsap.utils.toArray('main h2, main h3').forEach(heading => {
      if (heading.closest('.hero, .page-hero, .about-hero, .faq-hero, .wholesale-hero')) return;
      gsap.fromTo(heading,
        { yPercent: 18, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: .82,
          ease: 'power3.out', immediateRender: false,
          scrollTrigger: { trigger: heading, start: 'top 88%', once: true }
        }
      );
    });

    const media = gsap.matchMedia();
    media.add('(min-width: 768px)', () => {
      gsap.utils.toArray(parallaxSelector).forEach((item, index) => {
        gsap.fromTo(item,
          { yPercent: index % 2 ? -3 : -5 },
          {
            yPercent: index % 2 ? 3 : 5,
            ease: 'none',
            scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true }
          }
        );
      });

      const hero = document.querySelector('.hero');
      if (hero) {
        gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
          .to('.hero-copy', { yPercent: -10, opacity: .35, ease: 'none' }, 0)
          .to('.hero-stage', { yPercent: 8, scale: .94, ease: 'none' }, 0)
          .to('.hero-webgl', { scale: 1.08, opacity: .03, ease: 'none' }, 0);
      }
    });

    media.add('(max-width: 767px)', () => {
      gsap.utils.toArray('.campaign-image img, .film-frame img').forEach(item => {
        gsap.fromTo(item, { yPercent: -2 }, {
          yPercent: 2, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => document.documentElement.style.setProperty('--scroll-progress', self.progress.toFixed(4))
    });
  });

  return {
    destroy() {
      context.revert();
      document.documentElement.style.removeProperty('--scroll-progress');
    }
  };
};
