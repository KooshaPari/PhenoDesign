import { describe, it, expect } from 'vitest';
import {
  easeOut,
  easeInOut,
  easeSpring,
  durationFast,
  durationNormal,
  durationSlow,
  durationGlacial,
  durationShort,
  durationStandard,
  fadeTransition,
  standardTransition,
  smoothTransition,
  pressTransition,
  springGentle,
  springSnappy,
  springStiff,
  staggerDelay,
  staggerDelays,
  staggerTransitionDelay,
} from '../src/motion';

describe('easing functions', () => {
  it('easeOut is a valid cubic-bezier', () => {
    expect(easeOut).toMatch(/^cubic-bezier\(/);
  });
  it('easeInOut is a valid cubic-bezier', () => {
    expect(easeInOut).toMatch(/^cubic-bezier\(/);
  });
  it('easeSpring is a valid cubic-bezier', () => {
    expect(easeSpring).toMatch(/^cubic-bezier\(/);
  });
});

describe('durations', () => {
  it('all durations are valid CSS time values', () => {
    for (const d of [durationFast, durationNormal, durationSlow, durationGlacial, durationShort, durationStandard]) {
      expect(d).toMatch(/^\d+ms$/);
    }
  });
  it('fast < normal < slow < glacial', () => {
    expect(parseInt(durationFast)).toBeLessThan(parseInt(durationNormal));
    expect(parseInt(durationNormal)).toBeLessThan(parseInt(durationSlow));
    expect(parseInt(durationSlow)).toBeLessThan(parseInt(durationGlacial));
  });
});

describe('transitions', () => {
  it('fadeTransition has duration and easing', () => {
    expect(fadeTransition.duration).toBeDefined();
    expect(fadeTransition.easing).toBeDefined();
    expect(fadeTransition.css).toContain(durationFast);
    expect(fadeTransition.css).toContain(easeOut);
  });
  it('standardTransition has properties', () => {
    expect(standardTransition.duration).toBeDefined();
    expect(standardTransition.easing).toBeDefined();
  });
});

describe('spring configs', () => {
  it('springGentle has css and durationMs', () => {
    expect(springGentle.css).toBeDefined();
    expect(springGentle.durationMs).toBeGreaterThan(0);
  });
  it('springSnappy has css and durationMs', () => {
    expect(springSnappy.css).toBeDefined();
    expect(springSnappy.durationMs).toBeGreaterThan(0);
  });
  it('springStiff has css and durationMs', () => {
    expect(springStiff.css).toBeDefined();
    expect(springStiff.durationMs).toBeGreaterThan(0);
  });
});

describe('stagger helpers', () => {
  it('staggerDelay returns CSS string', () => {
    const result = staggerDelay(0);
    expect(result).toMatch(/^\d+ms$/);
  });
  it('staggerDelays returns array of CSS strings', () => {
    const delays = staggerDelays(4);
    expect(delays).toHaveLength(4);
    for (const d of delays) {
      expect(d).toMatch(/^\d+ms$/);
    }
  });
  it('staggerTransitionDelay returns CSS string', () => {
    const result = staggerTransitionDelay(2);
    expect(result).toMatch(/^\d+ms$/);
  });
});
