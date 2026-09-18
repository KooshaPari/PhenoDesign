/**
 * @kooshapari/phenotype-design-utils — public API.
 *
 * Color (OKLCH), type scale, spacing, motion, and layout utilities
 * for the Phenotype design system.
 *
 * @packageDocumentation
 */

// Color utilities
export {
  hexToOKLCH,
  hexToRGB,
  rgbToOKLCH,
  oklchToCSS,
  relativeLuminance,
  contrastRatio,
  meetsWCAG,
  mixOKLCH,
  generatePalette,
} from './color.js';

export type { OKLCH, RGB, WCAGLevel } from './color.js';

// Type scale
export { phenoTypeScale, clampFluid, generateTypeScale, stepToCSS } from './type-scale.js';
export type { TypeStep, TypeScale } from './type-scale.js';

// Spacing
export {
  phenoSpacing,
  spacing,
  spacingPx,
  closestStep,
  spacingToCSS,
  fluidGutter,
} from './spacing.js';
export type { SpacingStep } from './spacing.js';

// Motion
export {
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
} from './motion.js';
export type { EasingFunction, Transition, SpringConfig } from './motion.js';

// Layout
export {
  breakpoints,
  minWidth,
  maxWidth,
  mediaRange,
  containerMinWidth,
  containerMaxWidth,
  gridCols,
  grid,
  fluidGrid,
  measure,
} from './layout.js';
export type { Breakpoint, GridConfig } from './layout.js';
