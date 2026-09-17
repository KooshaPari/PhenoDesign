/**
 * Parallax Depth Pattern
 *
 * Subtle parallax depth effect on scroll. Elements move at slightly
 * different speeds based on their viewport position, creating a
 * layered depth feel. Uses CSS custom properties for composition
 * with other animations.
 *
 * Respects `prefers-reduced-motion` and provides SPA cleanup.
 *
 * @example
 * ```ts
 * import { initParallaxDepth } from '@<REDACTED>/phenotype-interaction-patterns/parallax-depth';
 *
 * const parallax = initParallaxDepth();
 * // On SPA navigation:
 * parallax.disconnect();
 * ```
 *
 * Elements use `data-parallax` attribute:
 * ```html
 * <div data-parallax="0.3">...</div>  <!-- 30% speed factor -->
 * <div data-parallax="-0.15">...</div> <!-- moves opposite direction -->
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Configuration for parallax depth. */
export interface ParallaxDepthConfig {
  /** Root element to scan. Default: document. */
  root?: Element | Document;
  /** Maximum pixel offset. Default: 20. */
  maxOffset?: number;
  /** Throttle interval in ms. Default: 16 (60fps). */
  throttleMs?: number;
}

/** Handle returned by initParallaxDepth for cleanup. */
export interface ParallaxDepthHandle {
  /** Re-scan for new [data-parallax] elements. */
  refresh(root?: Element | Document): void;
  /** Remove scroll listener and observer. */
  disconnect(): void;
}

/* ------------------------------------------------------------------ */
/*  State                                                             */
/* ------------------------------------------------------------------ */

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Initialize parallax depth on all `[data-parallax]` elements.
 *
 * Sets CSS custom properties `--parallax-y` and `--parallax-scale`
 * based on element distance from viewport center. Apply these in CSS:
 *
 * ```css
 * .my-element {
 *   transform: translateY(var(--parallax-y, 0)) scale(var(--parallax-scale, 1));
 * }
 * ```
 *
 * Data attributes:
 * - `data-parallax` - Speed factor (-1 to 1). Negative = opposite direction.
 *   Default: 0.3 (30% speed). Use 0 to disable for this element.
 *
 * @returns Handle with `refresh()` and `disconnect()` methods
 */
export function initParallaxDepth(
  config: ParallaxDepthConfig = {},
): ParallaxDepthHandle {
  const {
    root = document,
    maxOffset = 20,
    throttleMs: _throttleMs = 16,
  } = config;

  if (reducedMotion?.matches) {
    return { refresh() {}, disconnect() {} };
  }

  const selector = '[data-parallax]';
  let ticking = false;
  let scrollHandler: (() => void) | null = null;

  function getElements(): Element[] {
    if (!('querySelectorAll' in root)) return [];
    return Array.from(root.querySelectorAll(selector));
  }

  function updateParallax(): void {
    const elements = getElements();
    const vh = window.innerHeight;
    const viewportCenter = vh / 2;

    for (const el of elements) {
      const htmlEl = el as HTMLElement;
      const speed = parseFloat(htmlEl.dataset.parallax ?? '0.3') || 0;
      if (speed === 0) continue;

      const rect = htmlEl.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const normalized = (elCenter - viewportCenter) / vh;

      // Y offset: negative speed = cards move slower (parallax up)
      const py = normalized * -speed * maxOffset;
      // Subtle scale: elements slightly smaller when far from center
      const sc = 1 + Math.abs(normalized) * -0.01 * Math.abs(speed);

      htmlEl.style.setProperty('--parallax-y', `${py}px`);
      htmlEl.style.setProperty('--parallax-scale', `${Math.max(0.96, sc)}`);
    }
  }

  scrollHandler = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
  // Initial pass
  updateParallax();

  return {
    refresh(_newRoot?: Element | Document) {
      updateParallax();
    },
    disconnect() {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
        scrollHandler = null;
      }
    },
  };
}

/**
 * Apply parallax directly to a single element without observer setup.
 *
 * Call this in a scroll handler for manual parallax control.
 *
 * @param el - Element to apply parallax to
 * @param viewportCenter - Y center of the viewport
 * @param speed - Speed factor (-1 to 1)
 * @param maxOffset - Maximum pixel offset
 */
export function applyParallax(
  el: HTMLElement,
  viewportCenter: number,
  speed = 0.3,
  maxOffset = 20,
): void {
  const rect = el.getBoundingClientRect();
  const elCenter = rect.top + rect.height / 2;
  const normalized = (elCenter - viewportCenter) / window.innerHeight;

  const py = normalized * -speed * maxOffset;
  const sc = 1 + Math.abs(normalized) * -0.01 * Math.abs(speed);

  el.style.setProperty('--parallax-y', `${py}px`);
  el.style.setProperty('--parallax-scale', `${Math.max(0.96, sc)}`);
}
