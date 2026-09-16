import { describe, it, expect } from 'vitest';
import {
  hexToOKLCH,
  hexToRGB,
  oklchToCSS,
  contrastRatio,
  meetsWCAG,
  mixOKLCH,
  generatePalette,
} from '../src/color';

describe('hexToRGB', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRGB('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses 3-digit hex', () => {
    expect(hexToRGB('#F00')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('parses without hash', () => {
    expect(hexToRGB('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
  });
});

describe('hexToOKLCH', () => {
  it('converts teal seed to valid OKLCH', () => {
    const oklch = hexToOKLCH('#7EBAB5');
    expect(oklch.l).toBeGreaterThan(0.5);
    expect(oklch.l).toBeLessThan(0.85);
    expect(oklch.h).toBeGreaterThan(0);
  });
  it('converts obsidian seed', () => {
    const oklch = hexToOKLCH('#0F1012');
    expect(oklch.l).toBeGreaterThan(0);
    expect(oklch.l).toBeLessThan(0.2);
  });
});

describe('oklchToCSS', () => {
  it('produces valid oklch() string', () => {
    const css = oklchToCSS({ l: 0.5, c: 0.1, h: 180 });
    expect(css).toMatch(/^oklch\(/);
  });
});

describe('contrastRatio', () => {
  it('white vs black is ~21:1', () => {
    const ratio = contrastRatio({ r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 });
    expect(ratio).toBeCloseTo(21, 0);
  });
  it('identical colors give 1:1', () => {
    const ratio = contrastRatio({ r: 128, g: 128, b: 128 }, { r: 128, g: 128, b: 128 });
    expect(ratio).toBeCloseTo(1, 1);
  });
});

describe('meetsWCAG', () => {
  it('passes AA for black on white (RGB input)', () => {
    const fg = { r: 0, g: 0, b: 0 };
    const bg = { r: 255, g: 255, b: 255 };
    expect(meetsWCAG(fg, bg, 'AA')).toBe(true);
  });
  it('fails AA for low contrast', () => {
    const fg = { r: 136, g: 136, b: 136 };
    const bg = { r: 153, g: 153, b: 153 };
    expect(meetsWCAG(fg, bg, 'AA')).toBe(false);
  });
});

describe('mixOKLCH', () => {
  it('mixes at 50% averages lightness', () => {
    const a = { l: 0.2, c: 0.01, h: 240 };
    const b = { l: 0.8, c: 0.01, h: 240 };
    const mixed = mixOKLCH(a, b, 0.5);
    expect(mixed.l).toBeCloseTo(0.5, 1);
  });
});

describe('generatePalette', () => {
  it('generates 5 entries from seed', () => {
    const seed = hexToOKLCH('#7EBAB5');
    const palette = generatePalette(seed);
    expect(palette).toHaveLength(5);
  });
  it('entries are ordered by lightness', () => {
    const seed = hexToOKLCH('#7EBAB5');
    const palette = generatePalette(seed);
    expect(palette[0].l).toBeLessThan(palette[palette.length - 1].l);
  });
});
