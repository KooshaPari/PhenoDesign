/**
 * Responsive type scale generator using CSS clamp().
 *
 * Matches the Phenotype token system's step--1 through step-4 scale.
 * Generates fluid typography that scales between min and max viewport widths.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single type scale step with its clamp expression and metadata. */
export interface TypeStep {
  /** CSS clamp() expression for fluid sizing. */
  clamp: string;
  /** Minimum size in rem (at small viewport). */
  minRem: number;
  /** Maximum size in rem (at large viewport). */
  maxRem: number;
  /** Preferred viewport width unit (typically vw). */
  preferredUnit: string;
}

/** Complete type scale with named steps. */
export interface TypeScale {
  '-1': TypeStep;
  '0': TypeStep;
  '1': TypeStep;
  '2': TypeStep;
  '3': TypeStep;
  '4': TypeStep;
}

// ---------------------------------------------------------------------------
// Phenotype type scale (matches tokens.css exactly)
// ---------------------------------------------------------------------------

const STEP_CONFIGS: Record<string, { minRem: number; prefRem: number; maxRem: number }> = {
  '-1': { minRem: 0.75, prefRem: 0.71, maxRem: 0.84 },
  '0': { minRem: 0.96, prefRem: 0.9, maxRem: 1.08 },
  '1': { minRem: 1.18, prefRem: 1.07, maxRem: 1.42 },
  '2': { minRem: 1.48, prefRem: 1.25, maxRem: 1.95 },
  '3': { minRem: 1.88, prefRem: 1.48, maxRem: 2.7 },
  '4': { minRem: 2.45, prefRem: 1.73, maxRem: 3.9 },
};

/** The canonical Phenotype type scale as clamp() expressions. */
export const phenoTypeScale: TypeScale = buildTypeScale(STEP_CONFIGS);

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

/**
 * Build a CSS clamp() string for fluid type.
 *
 * @param minRem - Minimum font size in rem
 * @param maxRem - Maximum font size in rem
 * @param minViewport - Minimum viewport width in px (default 320)
 * @param maxViewport - Maximum viewport width in px (default 1200)
 * @returns CSS clamp() expression
 */
export function clampFluid(
  minRem: number,
  maxRem: number,
  minViewport = 320,
  maxViewport = 1200
): string {
  const slope = (maxRem - minRem) / (maxViewport / 16 - minViewport / 16);
  const intercept = minRem - slope * (minViewport / 16);
  return `clamp(${minRem}rem, ${intercept.toFixed(2)}rem + ${slope.toFixed(2)}vw, ${maxRem}rem)`;
}

/**
 * Generate a custom type scale from min/max sizes.
 *
 * @param steps - Map of step names to { minRem, maxRem } pairs
 * @param minViewport - Minimum viewport width in px
 * @param maxViewport - Maximum viewport width in px
 * @returns Map of step names to TypeStep objects
 */
export function generateTypeScale(
  steps: Record<string, { minRem: number; maxRem: number }>,
  minViewport = 320,
  maxViewport = 1200
): Record<string, TypeStep> {
  const result: Record<string, TypeStep> = {};
  for (const [name, { minRem, maxRem }] of Object.entries(steps)) {
    result[name] = {
      clamp: clampFluid(minRem, maxRem, minViewport, maxViewport),
      minRem,
      maxRem,
      preferredUnit: 'vw',
    };
  }
  return result;
}

/**
 * Convert a type step to a CSS custom property declaration.
 *
 * @param step - The TypeStep to convert
 * @returns CSS string like `--step-0: clamp(0.96rem, ...)`
 */
export function stepToCSS(step: TypeStep): string {
  return step.clamp;
}

// ---------------------------------------------------------------------------
// Internal
// ---------------------------------------------------------------------------

function buildTypeScale(
  configs: Record<string, { minRem: number; prefRem: number; maxRem: number }>
): TypeScale {
  const scale = {} as TypeScale;
  for (const [key, { minRem, maxRem }] of Object.entries(configs)) {
    (scale as unknown as Record<string, TypeStep>)[key] = {
      clamp: clampFluid(minRem, maxRem),
      minRem,
      maxRem,
      preferredUnit: 'vw',
    };
  }
  return scale;
}
