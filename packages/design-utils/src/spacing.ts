/**
 * Spacing scale utilities for the Phenotype design system.
 *
 * Material Lab 4..64 pattern: 8 steps from 4px to 88px.
 * Provides numeric lookups, CSS variable generation, and utility helpers.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single spacing step with its CSS value and pixel equivalent. */
export interface SpacingStep {
  /** CSS value (rem). */
  rem: string;
  /** Pixel equivalent. */
  px: number;
}

// ---------------------------------------------------------------------------
// Phenotype spacing scale (matches tokens.css)
// ---------------------------------------------------------------------------

/**
 * The canonical Phenotype spacing scale.
 * Material Lab 4..64 pattern: 4, 6, 10, 16, 24, 36, 56, 88 px.
 */
export const phenoSpacing: Record<number, SpacingStep> = {
  0: { rem: '0.25rem', px: 4 },
  1: { rem: '0.375rem', px: 6 },
  2: { rem: '0.625rem', px: 10 },
  3: { rem: '1rem', px: 16 },
  4: { rem: '1.5rem', px: 24 },
  5: { rem: '2.25rem', px: 36 },
  6: { rem: '3.5rem', px: 56 },
  7: { rem: '5.5rem', px: 88 },
};

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Get the CSS rem value for a spacing step.
 *
 * @param step - Scale index (0-7)
 * @returns CSS rem string, or undefined if step is out of range
 */
export function spacing(step: number): string | undefined {
  return phenoSpacing[step]?.rem;
}

/**
 * Get the pixel value for a spacing step.
 *
 * @param step - Scale index (0-7)
 * @returns Pixel value, or undefined if step is out of range
 */
export function spacingPx(step: number): number | undefined {
  return phenoSpacing[step]?.px;
}

/**
 * Find the closest spacing step for a given pixel value.
 *
 * @param px - Target pixel value
 * @returns Closest step index
 */
export function closestStep(px: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (const [step, { px: stepPx }] of Object.entries(phenoSpacing)) {
    const dist = Math.abs(stepPx - px);
    if (dist < bestDist) {
      bestDist = dist;
      best = Number(step);
    }
  }
  return best;
}

/**
 * Generate CSS custom property declarations for the spacing scale.
 *
 * @returns Array of CSS strings like `--space-0: 0.25rem;`
 */
export function spacingToCSS(): string[] {
  return Object.entries(phenoSpacing).map(
    ([step, { rem }]) => `--space-${step}: ${rem};`
  );
}

/**
 * Generate a fluid gutter value using clamp().
 *
 * @param minRem - Minimum gutter in rem (default 1)
 * @param maxRem - Maximum gutter in rem (default 3.75)
 * @param vwPercent - Viewport percentage (default 3)
 * @returns CSS clamp() expression
 */
export function fluidGutter(
  minRem = 1,
  maxRem = 3.75,
  vwPercent = 3
): string {
  return `clamp(${minRem}rem, ${vwPercent}vw, ${maxRem}rem)`;
}
