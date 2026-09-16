/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { initScrollReveal } from '../src/scroll-reveal';
import { createLightbox } from '../src/lightbox';
import { initCounterAnimate } from '../src/counter-animate';
import { initParallaxDepth } from '../src/parallax-depth';

describe('initScrollReveal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a handle with disconnect', () => {
    const handle = initScrollReveal();
    expect(typeof handle.disconnect).toBe('function');
    expect(typeof handle.refresh).toBe('function');
    handle.disconnect();
  });

  it('does not throw with no elements', () => {
    const handle = initScrollReveal();
    expect(() => handle.disconnect()).not.toThrow();
  });
});

describe('createLightbox', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a handle with open/close/destroy', () => {
    const lightbox = createLightbox();
    expect(typeof lightbox.open).toBe('function');
    expect(typeof lightbox.close).toBe('function');
    expect(typeof lightbox.destroy).toBe('function');
  });

  it('creates DOM elements on open', () => {
    const lightbox = createLightbox();
    lightbox.open('test.jpg', 'Test image');
    const overlay = document.querySelector('[class*="overlay"]') || document.querySelector('[class*="backdrop"]') || document.querySelector('[class*="lightbox"]');
    expect(overlay).toBeTruthy();
    lightbox.destroy();
  });

  it('removes DOM on destroy', () => {
    const lightbox = createLightbox();
    lightbox.open('test.jpg', 'Test');
    lightbox.destroy();
    const overlay = document.querySelector('[class*="lightbox"]');
    expect(overlay).toBeNull();
  });
});

describe('initCounterAnimate', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a handle with disconnect', () => {
    const handle = initCounterAnimate();
    expect(typeof handle.disconnect).toBe('function');
    expect(typeof handle.refresh).toBe('function');
    handle.disconnect();
  });
});

describe('initParallaxDepth', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns a handle with disconnect', () => {
    const handle = initParallaxDepth();
    expect(typeof handle.disconnect).toBe('function');
    expect(typeof handle.refresh).toBe('function');
    handle.disconnect();
  });
});
