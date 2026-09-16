/**
 * Scroll Reveal Pattern
 *
 * IntersectionObserver-based reveal animations. Supports multiple
 * reveal types (fade, up, scale, clip-path) with stagger delays.
 * Respects `prefers-reduced-motion` and provides SPA cleanup.
 *
 * @example
 * ```ts
 * import { initScrollReveal } from '@kooshapari/phenotype-interaction-patterns/scroll-reveal';
 *
 * const reveal = initScrollReveal();
 * // On SPA navigation:
 * reveal.disconnect();
 * ```
 *
 * Elements use `data-reveal` attribute to opt in:
 * ```html
 * <div data-reveal="up" data-reveal-delay="200">...</div>
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Reveal animation type. */
export type RevealType = 'up' | 'fade' | 'scale' | 'clip';

/** Configuration for scroll reveal. */
export interface ScrollRevealConfig {
  /** Root element to observe. Default: document. */
  root?: Element | Document;
  /** IntersectionObserver threshold. Default: 0.1. */
  threshold?: number;
  /** Root margin for early/lazy trigger. Default: '0px 0px -60px 0px'. */
  rootMargin?: string;
  /** Default animation duration in ms. Default: 600. */
  duration?: number;
  /** Default stagger delay between siblings in ms. Default: 0. */
  stagger?: number;
}

/** Handle returned by initScrollReveal for cleanup. */
export interface ScrollRevealHandle {
  /** Re-scan for new [data-reveal] elements. */
  refresh(root?: Element | Document): void;
  /** Disconnect observer. */
  disconnect(): void;
}

/* ------------------------------------------------------------------ */
/*  Styles per reveal type                                            */
/* ------------------------------------------------------------------ */

const REVEAL_STYLES: Record<RevealType, { hidden: string; visible: string }> = {
  up: {
    hidden: 'opacity:0;transform:translateY(32px)',
    visible: 'opacity:1;transform:translateY(0)',
  },
  fade: {
    hidden: 'opacity:0',
    visible: 'opacity:1',
  },
  scale: {
    hidden: 'opacity:0;transform:scale(0.95)',
    visible: 'opacity:1;transform:scale(1)',
  },
  clip: {
    hidden: 'clip-path:inset(8% 8% 8% 8% round 12px);opacity:0',
    visible: 'clip-path:inset(0% 0% 0% 0% round 0px);opacity:1',
  },
};

/* ------------------------------------------------------------------ */
/*  State                                                             */
/* ------------------------------------------------------------------ */

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

const observedElements = new WeakSet<Element>();
const cleanupFns = new Map<Element, () => void>();

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Initialize scroll reveal on all `[data-reveal]` elements.
 *
 * Scans the root for elements with `data-reveal` and sets up
 * IntersectionObserver-based reveal animations.
 *
 * Data attributes:
 * - `data-reveal` - Type: "up" | "fade" | "scale" | "clip"
 * - `data-reveal-delay` - Delay before animation in ms
 * - `data-reveal-duration` - Animation duration in ms
 *
 * @returns Handle with `refresh()` and `disconnect()` methods
 */
export function initScrollReveal(
  config: ScrollRevealConfig = {},
): ScrollRevealHandle {
  const {
    root = document,
    threshold = 0.1,
    rootMargin = '0px 0px -60px 0px',
    duration = 600,
    stagger = 0,
  } = config;

  if (reducedMotion?.matches) {
    return { refresh() {}, disconnect() {} };
  }

  const selector = '[data-reveal]';
  const elements = 'querySelectorAll' in root
    ? root.querySelectorAll(selector)
    : [];

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target as HTMLElement;
        const type = (el.dataset.reveal ?? 'up') as RevealType;
        const delay = parseInt(el.dataset.revealDelay ?? '', 10) || 0;
        const dur = parseInt(el.dataset.revealDuration ?? '', 10) || duration;
        const styles = REVEAL_STYLES[type] ?? REVEAL_STYLES.up;

        // Apply hidden state
        el.style.cssText += `;${styles.hidden};transition:none`;

        // Force reflow then animate
        requestAnimationFrame(() => {
          el.style.transition = `opacity ${dur}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${dur}ms cubic-bezier(0.16, 1, 0.3, 1), clip-path ${dur}ms cubic-bezier(0.16, 1, 0.3, 1)`;

          setTimeout(() => {
            el.style.cssText += `;${styles.visible}`;
          }, delay);

          // Clean up inline styles after animation
          setTimeout(() => {
            el.style.transition = '';
            el.style.cssText = el.style.cssText
              .replace(new RegExp(styles.hidden.replace(/[()]/g, '\\$&'), 'g'), '')
              .replace(new RegExp(styles.visible.replace(/[()]/g, '\\$&'), 'g'), '')
              .trim();
          }, delay + dur + 50);
        });

        observer.unobserve(el);
        cleanupFns.delete(el);
      }
    },
    { threshold, rootMargin },
  );

  elements.forEach((el, index) => {
    if (observedElements.has(el)) return;
    observedElements.add(el);

    // Apply stagger delay if configured
    const htmlEl = el as HTMLElement;
    if (stagger > 0 && !htmlEl.dataset.revealDelay) {
      htmlEl.dataset.revealDelay = String(index * stagger);
    }

    observer.observe(el);
    cleanupFns.set(el, () => observer.unobserve(el));
  });

  return {
    refresh(newRoot?: Element | Document) {
      const r = newRoot ?? root;
      const els = 'querySelectorAll' in r ? r.querySelectorAll(selector) : [];
      els.forEach((el) => {
        if (observedElements.has(el)) return;
        observedElements.add(el);
        observer.observe(el);
        cleanupFns.set(el, () => observer.unobserve(el));
      });
    },
    disconnect() {
      observer.disconnect();
      cleanupFns.forEach((fn) => fn());
      cleanupFns.clear();
    },
  };
}

/**
 * Manually reveal a single element with animation.
 *
 * Useful for programmatic reveals (e.g. after data loads).
 */
export function revealElement(
  el: HTMLElement,
  type: RevealType = 'up',
  duration = 600,
): void {
  if (reducedMotion?.matches) return;

  const styles = REVEAL_STYLES[type] ?? REVEAL_STYLES.up;
  el.style.cssText += `;${styles.hidden};transition:none`;

  requestAnimationFrame(() => {
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    requestAnimationFrame(() => {
      el.style.cssText += `;${styles.visible}`;
    });
  });
}
