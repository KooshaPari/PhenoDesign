/**
 * Counter Animation Pattern
 *
 * Animates a number from 0 to a target value when the element scrolls
 * into view. Uses IntersectionObserver with easing for smooth counting.
 * Respects `prefers-reduced-motion` and provides SPA cleanup.
 *
 * @example
 * ```ts
 * import { initCounterAnimate } from '@<REDACTED>/phenotype-interaction-patterns/counter-animate';
 *
 * const counter = initCounterAnimate();
 * // On SPA navigation:
 * counter.disconnect();
 * ```
 *
 * Elements use `data-counter` attribute with the target number:
 * ```html
 * <span data-counter="40" data-counter-suffix="+">0</span>
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Configuration for counter animation. */
export interface CounterAnimateConfig {
  /** Root element to observe. Default: document. */
  root?: Element | Document;
  /** IntersectionObserver threshold. Default: 0.5. */
  threshold?: number;
  /** Root margin. Default: '0px'. */
  rootMargin?: string;
}

/** Handle returned by initCounterAnimate for cleanup. */
export interface CounterAnimateHandle {
  /** Re-scan for new [data-counter] elements. */
  refresh(root?: Element | Document): void;
  /** Disconnect observer. */
  disconnect(): void;
}

/* ------------------------------------------------------------------ */
/*  Easing                                                            */
/* ------------------------------------------------------------------ */

/** Ease-out cubic for natural deceleration. */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Format number with locale-aware separators. */
function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
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
 * Initialize counter animation on all `[data-counter]` elements.
 *
 * Scans the root for elements with `data-counter` and sets up
 * IntersectionObserver to trigger count-up animation.
 *
 * Data attributes:
 * - `data-counter` - Target number to count to
 * - `data-counter-duration` - Animation duration in ms (default: 1500)
 * - `data-counter-prefix` - String prefix (e.g. "$")
 * - `data-counter-suffix` - String suffix (e.g. "%", "+")
 * - `data-counter-decimals` - Decimal places (default: 0)
 *
 * @returns Handle with `refresh()` and `disconnect()` methods
 */
export function initCounterAnimate(
  config: CounterAnimateConfig = {},
): CounterAnimateHandle {
  const { root = document, threshold = 0.5, rootMargin = '0px' } = config;

  if (reducedMotion?.matches) {
    return { refresh() {}, disconnect() {} };
  }

  const selector = '[data-counter]';
  const elements = 'querySelectorAll' in root
    ? root.querySelectorAll(selector)
    : [];

  function animateCounter(el: Element): void {
    const htmlEl = el as HTMLElement;
    const target = parseFloat(htmlEl.dataset.counter ?? '0');
    const duration = parseInt(htmlEl.dataset.counterDuration ?? '', 10) || 1500;
    const prefix = htmlEl.dataset.counterPrefix ?? '';
    const suffix = htmlEl.dataset.counterSuffix ?? '';
    const decimals = parseInt(htmlEl.dataset.counterDecimals ?? '', 10) || 0;

    const start = performance.now();

    function tick(now: number): void {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target * Math.pow(10, decimals)) / Math.pow(10, decimals);

      htmlEl.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold, rootMargin },
  );

  elements.forEach((el) => observer.observe(el));

  return {
    refresh(newRoot?: Element | Document) {
      const r = newRoot ?? root;
      const els = 'querySelectorAll' in r ? r.querySelectorAll(selector) : [];
      els.forEach((el) => observer.observe(el));
    },
    disconnect() {
      observer.disconnect();
    },
  };
}

/**
 * Manually animate a single counter element.
 *
 * @param el - The element with `data-counter` or a numeric target
 * @param target - Target number (overrides data-counter attribute)
 * @param duration - Animation duration in ms
 */
export function animateCounter(
  el: HTMLElement,
  target?: number,
  duration = 1500,
): void {
  if (reducedMotion?.matches) return;

  const value = target ?? parseFloat(el.dataset.counter ?? '0');
  const prefix = el.dataset.counterPrefix ?? '';
  const suffix = el.dataset.counterSuffix ?? '';
  const decimals = parseInt(el.dataset.counterDecimals ?? '', 10) || 0;
  const dur = parseInt(el.dataset.counterDuration ?? '', 10) || duration;

  const start = performance.now();

  function tick(now: number): void {
    const progress = Math.min((now - start) / dur, 1);
    const eased = easeOutCubic(progress);
    const current = Math.round(eased * value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    el.textContent = `${prefix}${formatNumber(current, decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
