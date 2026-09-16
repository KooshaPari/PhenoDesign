import { describe, it, expect } from 'vitest';
import {
  phenoSpacing,
  spacing,
  spacingPx,
  closestStep,
  spacingToCSS,
} from '../src/spacing';

describe('phenoSpacing', () => {
  it('has 8 steps (0-7)', () => {
    expect(Object.keys(phenoSpacing)).toHaveLength(8);
  });
  it('step 0 is 4px (0.25rem)', () => {
    expect(phenoSpacing[0].px).toBe(4);
    expect(phenoSpacing[0].rem).toBe('0.25rem');
  });
  it('step 3 is 16px', () => {
    expect(phenoSpacing[3].px).toBe(16);
  });
  it('step 4 is 24px', () => {
    expect(phenoSpacing[4].px).toBe(24);
  });
});

describe('spacing', () => {
  it('returns rem string for valid step', () => {
    expect(spacing(3)).toBe('1rem');
  });
  it('returns undefined for invalid step', () => {
    expect(spacing(-1)).toBeUndefined();
    expect(spacing(99)).toBeUndefined();
  });
});

describe('spacingPx', () => {
  it('returns px value for valid step', () => {
    expect(spacingPx(3)).toBe(16);
  });
  it('returns undefined for invalid step', () => {
    expect(spacingPx(-1)).toBeUndefined();
  });
});

describe('closestStep', () => {
  it('finds step for 16px', () => {
    expect(closestStep(16)).toBe(3);
  });
  it('finds closest for 15px', () => {
    expect(closestStep(15)).toBe(3);
  });
  it('returns 0 for very small values', () => {
    expect(closestStep(1)).toBe(0);
  });
});

describe('spacingToCSS', () => {
  it('generates 8 CSS variable declarations', () => {
    const css = spacingToCSS();
    expect(css.length).toBe(8);
    expect(css[0]).toContain('--space-0');
    expect(css[3]).toContain('--space-3');
    expect(css[3]).toContain('1rem');
  });
});
