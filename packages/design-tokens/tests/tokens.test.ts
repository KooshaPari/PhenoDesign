import { describe, it, expect } from 'vitest';
import { seeds, surface, fontFamily, typeScale, spacing, radius } from '../tokens';

describe('seed colors', () => {
  it('has 4 canonical seeds', () => {
    expect(Object.keys(seeds)).toHaveLength(4);
  });
  it('obsidian is #0F1012', () => {
    expect(seeds.obsidian).toBe('#0F1012');
  });
  it('teal is #7EBAB5', () => {
    expect(seeds.teal).toBe('#7EBAB5');
  });
});

describe('surface family', () => {
  it('maps seeds to surface', () => {
    expect(surface.obsidian).toBe(seeds.obsidian);
    expect(surface.teal).toBe(seeds.teal);
  });
});

describe('fontFamily', () => {
  it('has font family tokens', () => {
    expect(fontFamily).toBeDefined();
    const keys = Object.keys(fontFamily);
    expect(keys.length).toBeGreaterThan(0);
  });
});

describe('typeScale', () => {
  it('has type scale tokens', () => {
    expect(typeScale).toBeDefined();
    const keys = Object.keys(typeScale);
    expect(keys.length).toBeGreaterThan(3);
  });
});

describe('spacing', () => {
  it('has spacing scale', () => {
    expect(spacing).toBeDefined();
    const keys = Object.keys(spacing);
    expect(keys.length).toBeGreaterThan(3);
  });
});

describe('radius', () => {
  it('has radius tokens', () => {
    expect(radius).toBeDefined();
    const keys = Object.keys(radius);
    expect(keys.length).toBeGreaterThan(0);
  });
});
