/**
 * Perspective Tilt Pattern
 *
 * Pointer-driven 2.5D perspective tilt with optional glare overlay.
 * Applies CSS perspective transforms based on pointer position,
 * creating a depth effect without WebGL.
 *
 * Respects `prefers-reduced-motion` and provides cleanup for SPA routing.
 *
 * @example
 * ```ts
 * import { initPerspectiveTilt } from '@<REDACTED>/phenotype-interaction-patterns/perspective-tilt';
 *
 * const tilt = initPerspectiveTilt();
 * // On SPA navigation:
 * tilt.disconnect();
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Configuration for perspective tilt. */
export interface PerspectiveTiltConfig {
  /** Maximum tilt angle in degrees. Default: 12. */
  maxAngle?: number;
  /** Scale factor on hover. Default: 1.02. */
  scale?: number;
  /** Enable glare overlay. Default: false. */
  glare?: boolean;
  /** Glare opacity (0-1). Default: 0.15. */
  glareIntensity?: number;
  /** Transition speed in ms. Default: 400. */
  speed?: number;
  /** Root element to scan. Default: document. */
  root?: Element | Document;
}

/** Handle returned by initPerspectiveTilt for cleanup. */
export interface PerspectiveTiltHandle {
  /** Re-scan for new [data-tilt] elements. */
  refresh(root?: Element | Document): void;
  /** Disconnect observer and remove all listeners. */
  disconnect(): void;
}

/* ------------------------------------------------------------------ */
/*  State                                                             */
/* ------------------------------------------------------------------ */

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null;

const cleanupFns = new WeakMap<Element, () => void>();

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function createGlare(container: HTMLElement): HTMLElement {
  const glare = document.createElement('div');
  glare.className = 'phenotype-tilt-glare';
  glare.setAttribute('aria-hidden', 'true');
  if (!container.style.position) container.style.position = 'relative';
  container.appendChild(glare);
  return glare;
}

/* ------------------------------------------------------------------ */
/*  Single element setup                                              */
/* ------------------------------------------------------------------ */

function setupTilt(
  el: HTMLElement,
  defaults: Required<PerspectiveTiltConfig>,
): void {
  if (cleanupFns.has(el)) return;

  const maxTilt = parseFloat(el.dataset.tiltMax ?? '') || defaults.maxAngle;
  const scale = parseFloat(el.dataset.tiltScale ?? '') || defaults.scale;
  const speed = parseInt(el.dataset.tiltSpeed ?? '', 10) || defaults.speed;
  const enableGlare = el.dataset.tiltGlare === 'true' || defaults.glare;

  let glareEl: HTMLElement | null = null;
  if (enableGlare) glareEl = createGlare(el);

  el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
  el.style.transformStyle = 'preserve-3d';
  el.style.willChange = 'transform';

  function onMove(e: PointerEvent): void {
    if (reducedMotion?.matches) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const nx = (x - cx) / cx;
    const ny = (y - cy) / cy;

    const tiltX = clamp(ny * maxTilt, -maxTilt, maxTilt);
    const tiltY = clamp(-nx * maxTilt, -maxTilt, maxTilt);

    el.style.transform =
      `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, 1)`;

    if (glareEl) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glareEl.style.background =
        `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,${defaults.glareIntensity}) 0%, transparent 60%)`;
      glareEl.style.opacity = '1';
    }
  }

  function onLeave(): void {
    el.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glareEl) glareEl.style.opacity = '0';
  }

  el.addEventListener('pointermove', onMove, { passive: true });
  el.addEventListener('pointerleave', onLeave, { passive: true });

  cleanupFns.set(el, () => {
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
    el.style.transition = '';
    el.style.transform = '';
    el.style.transformStyle = '';
    el.style.willChange = '';
    if (glareEl) glareEl.remove();
  });
}

/* ------------------------------------------------------------------ */
/*  Scan and observe                                                  */
/* ------------------------------------------------------------------ */

function scanElements(root: Element | Document): void {
  const selector = '[data-tilt]';
  const elements = 'querySelectorAll' in root
    ? root.querySelectorAll(selector)
    : [];
  elements.forEach((el) => setupTilt(el as HTMLElement, DEFAULTS));
}

const DEFAULTS: Required<PerspectiveTiltConfig> = {
  maxAngle: 12,
  scale: 1.02,
  glare: false,
  glareIntensity: 0.15,
  speed: 400,
  root: document,
};

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Initialize perspective tilt on all `[data-tilt]` elements.
 *
 * Scans the root for elements with the `data-tilt` attribute and applies
 * pointer-driven 2.5D transforms. Sets up a MutationObserver to catch
 * dynamically added elements.
 *
 * Data attributes (override config defaults per-element):
 * - `data-tilt-max` - Max angle in degrees
 * - `data-tilt-scale` - Scale factor
 * - `data-tilt-glare` - "true" to enable glare
 * - `data-tilt-speed` - Transition speed in ms
 *
 * @returns Handle with `refresh()` and `disconnect()` methods
 */
export function initPerspectiveTilt(
  config: PerspectiveTiltConfig = {},
): PerspectiveTiltHandle {
  const opts = { ...DEFAULTS, ...config };

  if (reducedMotion?.matches) {
    return { refresh() {}, disconnect() {} };
  }

  const root = opts.root;
  scanElements(root);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const el = node as Element;
        if (el.matches?.('[data-tilt]')) {
          setupTilt(el as HTMLElement, opts);
        }
        if (el.querySelectorAll) {
          el.querySelectorAll('[data-tilt]').forEach((child) =>
            setupTilt(child as HTMLElement, opts),
          );
        }
      }
    }
  });

  const observeTarget = root === document ? document.body : root;
  observer.observe(observeTarget, { childList: true, subtree: true });

  return {
    refresh(newRoot?: Element | Document) {
      scanElements(newRoot ?? root);
    },
    disconnect() {
      observer.disconnect();
    },
  };
}
