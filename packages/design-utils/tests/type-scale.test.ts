import { describe, it, expect } from 'vitest';
import { clampFluid, phenoTypeScale, stepToCSS } from '../src/type-scale';

describe('clampFluid', () => {
  it('returns a clamp() expression', () => {
    const result = clampFluid(1, 2);
    expect(result).toMatch(/^clamp\(/);
    expect(result).toContain('rem');
    expect(result).toContain('vw');
  });
  it('output contains min and max rem values', () => {
    const result = clampFluid(0.5, 1.5);
    expect(result).toContain('0.5rem');
    expect(result).toContain('1.5rem');
  });
});

describe('phenoTypeScale', () => {
  it('has all 6 steps', () => {
    expect(Object.keys(phenoTypeScale)).toHaveLength(6);
    expect(phenoTypeScale['-1']).toBeDefined();
    expect(phenoTypeScale['0']).toBeDefined();
    expect(phenoTypeScale['4']).toBeDefined();
  });
  it('each step has clamp expression', () => {
    for (const step of Object.values(phenoTypeScale)) {
      expect(step.clamp).toMatch(/^clamp\(/);
      expect(step.minRem).toBeGreaterThan(0);
      expect(step.maxRem).toBeGreaterThan(step.minRem);
    }
  });
  it('scale is monotonically increasing', () => {
    const steps = ['-1', '0', '1', '2', '3', '4'];
    for (let i = 1; i < steps.length; i++) {
      expect(phenoTypeScale[steps[i]].maxRem).toBeGreaterThan(
        phenoTypeScale[steps[i - 1]].maxRem
      );
    }
  });
});

describe('stepToCSS', () => {
  it('returns the clamp expression', () => {
    const step = phenoTypeScale['1'];
    expect(stepToCSS(step)).toBe(step.clamp);
  });
});
