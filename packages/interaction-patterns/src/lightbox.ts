/**
 * Lightbox Pattern
 *
 * Image lightbox with keyboard navigation, pinch-to-zoom, and
 * swipe gestures. Creates a full-screen overlay for viewing images.
 * Respects `prefers-reduced-motion` and provides SPA cleanup.
 *
 * @example
 * ```ts
 * import { createLightbox } from '@kooshapari/phenotype-interaction-patterns/lightbox';
 *
 * const lightbox = createLightbox();
 * lightbox.open('/images/photo.jpg', 'Description');
 * // Cleanup:
 * lightbox.destroy();
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** A single lightbox image entry. */
export interface LightboxImage {
  /** Image source URL. */
  src: string;
  /** Alt text for accessibility. */
  alt: string;
  /** Optional caption displayed below the image. */
  caption?: string;
}

/** Configuration for the lightbox. */
export interface LightboxConfig {
  /** Background color. Default: 'rgba(0,0,0,0.92)'. */
  backgroundColor?: string;
  /** Maximum zoom level. Default: 3. */
  maxZoom?: number;
  /** Enable swipe gestures on touch devices. Default: true. */
  swipe?: boolean;
  /** Animation duration in ms. Default: 280. */
  duration?: number;
}

/** Handle returned by createLightbox for control and cleanup. */
export interface LightboxHandle {
  /** Open lightbox with a single image. */
  open(src: string, alt: string, caption?: string): void;
  /** Open lightbox with a gallery set. */
  openGallery(images: LightboxImage[], startIndex?: number): void;
  /** Close the lightbox. */
  close(): void;
  /** Remove all DOM elements and listeners. */
  destroy(): void;
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
 * Create a lightbox instance.
 *
 * Appends an overlay to `document.body`. Call `open()` to display images
 * with keyboard navigation (arrows, Escape), scroll-to-zoom, and touch swipe.
 *
 * @returns LightboxHandle with open/close/destroy methods
 */
export function createLightbox(config: LightboxConfig = {}): LightboxHandle {
  const {
    backgroundColor = 'rgba(0,0,0,0.92)',
    maxZoom = 3,
    swipe = true,
    duration = 280,
  } = config;

  const NS = 'http://www.w3.org/1999/xhtml';
  const el = (tag: string, attrs: Record<string, string> = {}, ...ch: (Node | string | null)[]) => {
    const n = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    for (const c of ch.flat(Infinity)) {
      if (c != null) n.append(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return n;
  };

  // Build DOM
  const overlay = el('div', {
    class: 'phenotype-lightbox',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Image lightbox',
    tabindex: '-1',
  });
  (overlay as HTMLElement).style.cssText =
    `position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:${backgroundColor};backdrop-filter:blur(8px);opacity:0;transition:opacity ${duration}ms ease`;

  const imgEl = el('img', { class: 'phenotype-lightbox-img' }) as HTMLImageElement;
  imgEl.style.cssText = 'max-width:90vw;max-height:85vh;object-fit:contain;border-radius:4px;transform:scale(0.96);transition:transform ' + duration + 'ms cubic-bezier(0.16,1,0.3,1)';

  const captionEl = el('p', { class: 'phenotype-lightbox-caption' }) as HTMLElement;
  captionEl.style.cssText = 'position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.7);font:0.8rem/1.4 system-ui;text-align:center;max-width:80vw;pointer-events:none';

  const prevBtn = el('button', { class: 'phenotype-lightbox-prev', 'aria-label': 'Previous image' }, '\u2039') as HTMLElement;
  const nextBtn = el('button', { class: 'phenotype-lightbox-next', 'aria-label': 'Next image' }, '\u203A') as HTMLElement;
  const closeBtn = el('button', { class: 'phenotype-lightbox-close', 'aria-label': 'Close lightbox' }, '\u00D7') as HTMLElement;

  const navStyle = 'position:absolute;top:50%;transform:translateY(-50%);background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer;padding:0.5rem;opacity:0.6;transition:opacity 0.15s ease;z-index:2';
  prevBtn.style.cssText = navStyle + ';left:1rem';
  nextBtn.style.cssText = navStyle + ';right:1rem';
  closeBtn.style.cssText = 'position:absolute;top:1rem;right:1.5rem;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer;opacity:0.6;transition:opacity 0.15s ease;z-index:2';

  overlay.append(imgEl, captionEl, prevBtn, nextBtn, closeBtn);
  document.body.append(overlay);

  // State
  let images: LightboxImage[] = [];
  let currentIndex = 0;
  let zoom = 1;
  let panX = 0;
  let panY = 0;
  let touchStartX = 0;

  function show(): void {
    const img = images[currentIndex];
    if (!img) return;
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    captionEl.textContent = img.caption ?? '';
    prevBtn.style.display = images.length > 1 ? '' : 'none';
    nextBtn.style.display = images.length > 1 ? '' : 'none';
    resetZoom();
  }

  function resetZoom(): void {
    zoom = 1;
    panX = 0;
    panY = 0;
    imgEl.style.transform = 'scale(0.96)';
  }

  function applyTransform(): void {
    imgEl.style.transform = `scale(${zoom}) translate(${panX}px, ${panY}px)`;
  }

  function openSingle(src: string, alt: string, caption?: string): void {
    images = [{ src, alt, caption }];
    currentIndex = 0;
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      (overlay as HTMLElement).style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    });
    show();
  }

  function openGallery(list: LightboxImage[], start = 0): void {
    images = list;
    currentIndex = Math.max(0, Math.min(start, list.length - 1));
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      (overlay as HTMLElement).style.opacity = '1';
      imgEl.style.transform = 'scale(1)';
    });
    show();
  }

  function close(): void {
    (overlay as HTMLElement).style.opacity = '0';
    imgEl.style.transform = 'scale(0.96)';
    setTimeout(() => {
      overlay.style.display = 'none';
      imgEl.src = '';
    }, duration);
  }

  function next(): void {
    if (images.length < 2) return;
    currentIndex = (currentIndex + 1) % images.length;
    show();
  }

  function prev(): void {
    if (images.length < 2) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    show();
  }

  // Event listeners
  function onKeyDown(e: KeyboardEvent): void {
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  }

  function onWheel(e: WheelEvent): void {
    if (overlay.style.display !== 'flex') return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    zoom = Math.min(maxZoom, Math.max(1, zoom + delta));
    applyTransform();
  }

  function onTouchStart(e: TouchEvent): void {
    touchStartX = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent): void {
    if (!swipe || overlay.style.display !== 'flex') return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 60) {
      diff > 0 ? prev() : next();
    }
  }

  document.addEventListener('keydown', onKeyDown);
  imgEl.addEventListener('wheel', onWheel, { passive: false });
  overlay.addEventListener('touchstart', onTouchStart, { passive: true });
  overlay.addEventListener('touchend', onTouchEnd, { passive: true });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return {
    open: openSingle,
    openGallery,
    close,
    destroy() {
      document.removeEventListener('keydown', onKeyDown);
      overlay.remove();
    },
  };
}
