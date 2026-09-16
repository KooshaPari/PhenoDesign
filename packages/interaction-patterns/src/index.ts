/**
 * Interaction Patterns
 *
 * Reusable, accessible interaction patterns for Phenotype projects.
 * Each pattern respects `prefers-reduced-motion` and provides cleanup
 * for SPA routing.
 *
 * @packageDocumentation
 */

export {
  initPerspectiveTilt,
  type PerspectiveTiltConfig,
  type PerspectiveTiltHandle,
} from './perspective-tilt.js';

export {
  initScrollReveal,
  revealElement,
  type ScrollRevealConfig,
  type ScrollRevealHandle,
  type RevealType,
} from './scroll-reveal.js';

export {
  createLightbox,
  type LightboxConfig,
  type LightboxHandle,
  type LightboxImage,
} from './lightbox.js';

export {
  initCounterAnimate,
  animateCounter,
  type CounterAnimateConfig,
  type CounterAnimateHandle,
} from './counter-animate.js';

export {
  initParallaxDepth,
  applyParallax,
  type ParallaxDepthConfig,
  type ParallaxDepthHandle,
} from './parallax-depth.js';
