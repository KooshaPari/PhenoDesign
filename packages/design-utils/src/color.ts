/**
 * OKLCH color utilities for the Phenotype design system.
 *
 * Provides parsing, mixing, contrast ratio calculation, palette generation
 * from seed colors, and WCAG AA/AAA compliance checking.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** OKLCH color representation: lightness (0-1), chroma (0-~0.4), hue (0-360). */
export interface OKLCH {
  l: number;
  c: number;
  h: number;
  a?: number;
}

/** sRGB channel values, each 0-255. */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/** WCAG contrast level. */
export type WCAGLevel = 'AA' | 'AAA';

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

/**
 * Parse a hex color string to OKLCH.
 * Supports 3-digit (#RGB), 4-digit (#RGBA), 6-digit (#RRGGBB), and 8-digit (#RRGGBBAA).
 */
export function hexToOKLCH(hex: string): OKLCH {
  const rgb = hexToRGB(hex);
  return rgbToOKLCH(rgb);
}

/** Parse hex to sRGB (0-255 per channel). */
export function hexToRGB(hex: string): RGB {
  const h = hex.replace('#', '');
  const full =
    h.length <= 4
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/** Convert sRGB (0-255) to OKLCH via linear sRGB -> OKLab -> OKLCH. */
export function rgbToOKLCH(rgb: RGB): OKLCH {
  // sRGB gamma expansion
  const r = srgbToLinear(rgb.r / 255);
  const g = srgbToLinear(rgb.g / 255);
  const b = srgbToLinear(rgb.b / 255);

  // Linear RGB to OKLab (Bjorn Ottosson's matrix)
  const l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    c: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    h: radToDeg(
      Math.atan2(0.1191753288 * l - 0.2489967512 * m + 1.2884428328 * s),
      2.0953275221 * l - 1.7880992112 * m - 0.3002336109 * s
    ),
  };
}

/** Convert OKLCH to CSS `oklch()` string. */
export function oklchToCSS(c: OKLCH): string {
  const a = c.a !== undefined ? ` / ${c.a}` : '';
  return `oklch(${c.l.toFixed(4)} ${c.c.toFixed(4)} ${c.h.toFixed(1)}${a})`;
}

// ---------------------------------------------------------------------------
// Contrast & WCAG
// ---------------------------------------------------------------------------

/**
 * Calculate relative luminance from sRGB (WCAG 2.x definition).
 * Expects 0-255 per channel.
 */
export function relativeLuminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/** Calculate WCAG contrast ratio between two sRGB colors (1:1 to 21:1). */
export function contrastRatio(a: RGB, b: RGB): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Check if a foreground/background pair meets WCAG AA (4.5:1 normal, 3:1 large). */
export function meetsWCAG(
  fg: RGB,
  bg: RGB,
  level: WCAGLevel = 'AA',
  largeText = false
): boolean {
  const ratio = contrastRatio(fg, bg);
  if (level === 'AAA') return largeText ? ratio >= 4.5 : ratio >= 7;
  return largeText ? ratio >= 3 : ratio >= 4.5;
}

// ---------------------------------------------------------------------------
// Mixing
// ---------------------------------------------------------------------------

/** Mix two OKLCH colors by weight (0 = all a, 1 = all b). */
export function mixOKLCH(a: OKLCH, b: OKLCH, weight = 0.5): OKLCH {
  // Shortest-arc hue interpolation
  const dh = shortestArc(a.h, b.h);
  return {
    l: a.l + (b.l - a.l) * weight,
    c: a.c + (b.c - a.c) * weight,
    h: normalizeHue(a.h + dh * weight),
  };
}

// ---------------------------------------------------------------------------
// Palette generation from seeds
// ---------------------------------------------------------------------------

/** Generate a 5-stop lightness ramp from a seed color in OKLCH. */
export function generatePalette(seed: OKLCH): OKLCH[] {
  const lightnessSteps = [0.15, 0.3, 0.5, 0.7, 0.9];
  return lightnessSteps.map((l) => ({
    l,
    c: seed.c * (1 - Math.abs(l - seed.l) * 0.8),
    h: seed.h,
  }));
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function radToDeg(y: number, x: number): number {
  const deg = (Math.atan2(y, x) * 180) / Math.PI;
  return deg >= 0 ? deg : deg + 360;
}

function shortestArc(a: number, b: number): number {
  const d = b - a;
  return d > 180 ? d - 360 : d < -180 ? d + 360 : d;
}

function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360;
}
