# Molten Mouth

An original, multi-page, motion-rich sauce campaign and e-commerce frontend built with semantic HTML, CSS, vanilla ES modules, GSAP, Lenis, Three.js, Canvas, and Vite.

## Run it

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Routes

- `/` — interactive campaign homepage
- `/shop.html` — filterable, sortable editorial shop
- `/product.html?id=pineapple-sriracha` — data-driven product detail
- `/about.html`, `/wholesale.html`, `/faq.html`, `/contact.html`
- `/checkout.html` — intentionally non-payment checkout integration point
- `/404.html` — custom not-found page

## Architecture

- `src/js/data/` is the source of truth for products, bundles, reviews, FAQs, and story content.
- `src/js/components/` contains cart, menu, overlay, forms, marquee, and bundle modules.
- `src/js/pages/` contains page templates and page-specific behavior.
- `src/js/core/` owns GSAP registration, Lenis, loader, and page transitions.
- `src/js/webgl/` contains the Three.js product scene and GLSL shader source.
- `src/css/` separates global art direction, page layouts, and responsive behavior.

## Asset replacement guide

The original generated campaign still lives at `src/assets/molten-mouth-campaign.png`. Replace it with your final licensed image while preserving the filename, or update its imports in `src/js/pages/templates.js`. Keep the current 4:5 aspect ratio for the least layout shift. Product bottle art is code-native CSS, driven by each product's `color`, `name`, and `glyph`; replace the `bottle()` template with responsive `<picture>` sources when final transparent pack shots arrive.

Recommended production formats: AVIF first, WebP fallback, width variants at 480/800/1200/1600, explicit dimensions, and hero preload only on pages that use the asset above the fold.

## Animation map

- Loader: short numeric fill, skipped after the first session view and under reduced motion.
- Navigation/cart: clipped wipe and drawer easing with focus traps, Escape handling, focus restoration, and scroll locking.
- Internal navigation: full-screen color wipe before normal multi-page navigation.
- Home hero: state-locked GSAP flavor timeline plus a pointer-responsive Three.js bottle and custom shader label.
- Benefits: bounded clip reveals; no pinning on small screens.
- Product showcase: sticky editorial panel on desktop, normal vertical flow on tablet/mobile.
- Campaign image, product states, bundle bottles, marquee, and process canvas use restrained transforms and pause when appropriate.

## Performance notes

The Three.js module is dynamically imported only by the homepage and disabled on reduced-motion or narrow devices. DPR is capped at 1.5, its canvas rendering pauses outside the viewport, and resources are disposed on page exit. Canvas and marquee loops pause when hidden. Below-fold imagery carries dimensions and is cropped without layout shift. For production, convert the PNG campaign asset to AVIF/WebP and add responsive sources.

## Accessibility notes

The project includes a skip link, semantic landmarks, strong focus indicators, minimum touch target sizing, keyboard-operable overlays and product controls, focus traps/restoration, live cart announcements, form errors, FAQ ARIA state, alternative review text, readable reduced-motion layouts, and content that remains visible without animation. The checkout page deliberately does not collect payment data until a secure commerce provider is connected.

## Browser support

Target: current Chrome, Edge, Firefox, and Safari, plus recent iOS Safari. CSS `color-mix()` enhances product backgrounds; older browsers retain readable base colors. WebGL failure falls back to the CSS bottle. Test final commerce/provider code on real iOS devices before launch.

## Original image prompt

Built-in image generation was used for the project-bound campaign still: a cinematic original dark-glass sauce bottle with an unbranded orange label, surrounded by pineapple, habanero, garlic, cherry, and peach on a near-black studio backdrop; no existing marks, mascot, label text, or reference-site assets.
