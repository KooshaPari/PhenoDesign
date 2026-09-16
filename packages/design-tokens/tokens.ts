/**
 * Phenotype Design Tokens — TypeScript exports.
 *
 * All token values from the canonical CSS custom properties, exposed as
 * typed constants for programmatic use (JS-in-CSS, style objects, testing).
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Seed colors (Material Lab packet, OKLab-derived)
// ---------------------------------------------------------------------------

/** Canonical seed colors from the Phenotype Material Lab source packet. */
export const seeds = {
  obsidian: '#0F1012',
  slate: '#353A40',
  ceramic: '#F6F5F5',
  teal: '#7EBAB5',
} as const;

// ---------------------------------------------------------------------------
// Surface family
// ---------------------------------------------------------------------------

export const surface = {
  obsidian: seeds.obsidian,
  slate: seeds.slate,
  ceramic: seeds.ceramic,
  teal: seeds.teal,
  /** 92% ceramic mixed with slate via OKLCH. Resolved statically — CSS uses color-mix(). */
  ceramicRaised: '#E6E4E0',
  inset: '#e2dfd8',
} as const;

// ---------------------------------------------------------------------------
// Derived color families
// ---------------------------------------------------------------------------

export const graphite = {
  950: '#171a18',
  900: '#20231f',
  800: '#30332e',
} as const;

export const paper = {
  100: '#f3f0e8',
  200: '#e8e3d8',
} as const;

export const concrete = {
  300: '#c8c5bb',
  500: '#8e9188',
} as const;

export const olive = {
  300: '#a9b47a',
  500: '#737c4c',
} as const;

export const arch = {
  300: '#76aeb5',
  500: '#3f8795',
} as const;

export const acid = {
  500: '#b6d448',
} as const;

// ---------------------------------------------------------------------------
// Semantic colors
// ---------------------------------------------------------------------------

export const ink = {
  default: graphite[950],
  muted: '#3d4239',
} as const;

export const semantic = {
  ink: ink.default,
  inkMuted: ink.muted,
  surface: paper[100],
  surfaceRaised: '#faf7ef',
  surfaceInset: surface.inset,
  accent: arch[500],
  accentEngineering: arch[500],
  accentProduct: olive[500],
} as const;

// ---------------------------------------------------------------------------
// Family accent colors
// ---------------------------------------------------------------------------

export const familyAccents = {
  engineering: {
    netweave: '#3f8795',
    sharecli: '#c76a3a',
    omniroute: '#457b9d',
    physical: '#b8962e',
    substrate: '#5a7a6e',
    omlx: '#7a6aad',
  },
  product: {
    netweave: '#4ecdc4',
    sharecli: '#e07a5f',
    omniroute: '#577590',
    physical: '#daa520',
    substrate: '#6a8f7e',
    omlx: '#9a8acd',
  },
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const fontFamily = {
  display: '"Space Grotesk", "Avenir Next", "Helvetica Neue", sans-serif',
  reading: '"Inter", "Avenir Next", "Helvetica Neue", sans-serif',
  meta: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
} as const;

/** Clamp-based type scale — responsive from min to max viewport. */
export const typeScale = {
  '-1': 'clamp(0.75rem, 0.71rem + 0.16vw, 0.84rem)',
  '0': 'clamp(0.96rem, 0.9rem  + 0.25vw, 1.08rem)',
  '1': 'clamp(1.18rem, 1.07rem + 0.48vw, 1.42rem)',
  '2': 'clamp(1.48rem, 1.25rem + 0.93vw, 1.95rem)',
  '3': 'clamp(1.88rem, 1.48rem + 1.63vw, 2.7rem)',
  '4': 'clamp(2.45rem, 1.73rem + 2.9vw,  3.9rem)',
} as const;

// ---------------------------------------------------------------------------
// Spacing (Material Lab 4..64)
// ---------------------------------------------------------------------------

export const spacing = {
  '0': '0.25rem',   // 4px
  '1': '0.375rem',  // 6px
  '2': '0.625rem',  // 10px
  '3': '1rem',      // 16px
  '4': '1.5rem',    // 24px
  '5': '2.25rem',   // 36px
  '6': '3.5rem',    // 56px
  '7': '5.5rem',    // 88px
} as const;

export const layout = {
  gutter: 'clamp(1rem, 3vw, 3.75rem)',
  measure: '68ch',
} as const;

// ---------------------------------------------------------------------------
// Radii
// ---------------------------------------------------------------------------

export const radius = {
  control: '6px',
  panel: '10px',
  studio: '12px',
} as const;

// ---------------------------------------------------------------------------
// Elevation / z-index
// ---------------------------------------------------------------------------

export const shadow = {
  card: '0 1px 0 var(--precision-rule)',
  specimen: '0.65rem 0.65rem 0 color-mix(in oklch, var(--ink) 14%, transparent)',
} as const;

export const zIndex = {
  chrome: 10,
  canvas: 5,
  overlay: 1,
  footer: 0,
} as const;

// ---------------------------------------------------------------------------
// Motion
// ---------------------------------------------------------------------------

export const motion = {
  fast: '160ms',
  normal: '220ms',
  slow: '280ms',
  glacial: '380ms',
  short: '120ms',
  standard: '180ms',
} as const;

export const easing = {
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;
