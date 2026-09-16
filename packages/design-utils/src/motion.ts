/**
 * Motion utilities for the Phenotype design system.
 *
 * Easing presets (short 120ms, standard 180ms), spring configurations,
 * and stagger delay calculators. Motion is intentionally short and
 * purposeful — no ambient loops.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** CSS timing function string. */
export type EasingFunction = string;

/** A complete transition shorthand: duration + easing. */
export interface Transition {
  duration: string;
  easing: EasingFunction;
  css: string;
}

/** Spring configuration for CSS or JS animation. */
export interface SpringConfig {
  /** CSS cubic-bezier approximation. */
  css: EasingFunction;
  /** Duration in ms for the spring animation. */
  durationMs: number;
}

// ---------------------------------------------------------------------------
// Easing presets (from tokens.css)
// ---------------------------------------------------------------------------

/** Standard ease-out curve: fast entry, decelerating exit. */
export const easeOut: EasingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Smooth ease-in-out: symmetric acceleration/deceleration. */
export const easeInOut: EasingFunction = 'cubic-bezier(0.65, 0, 0.35, 1)';

/** Spring curve with slight overshoot for micro-interactions. */
export const easeSpring: EasingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

// ---------------------------------------------------------------------------
// Duration presets (from tokens.css)
// ---------------------------------------------------------------------------

/** Fast transition — micro-interactions, opacity changes. */
export const durationFast: string = '160ms';

/** Normal transition — most UI state changes. */
export const durationNormal: string = '220ms';

/** Slow transition — complex multi-property animations. */
export const durationSlow: string = '280ms';

/** Glacial transition — page-level transitions. */
export const durationGlacial: string = '380ms';

/** Short press feedback (button press). */
export const durationShort: string = '120ms';

/** Standard press feedback. */
export const durationStandard: string = '180ms';

// ---------------------------------------------------------------------------
// Predefined transitions
// ---------------------------------------------------------------------------

/** Quick opacity fade — 160ms ease-out. */
export const fadeTransition: Transition = {
  duration: durationFast,
  easing: easeOut,
  css: `${durationFast} ${easeOut}`,
};

/** Standard UI state change — 220ms ease-in-out. */
export const standardTransition: Transition = {
  duration: durationNormal,
  easing: easeInOut,
  css: `${durationNormal} ${easeInOut}`,
};

/** Smooth page-level transition — 380ms ease-out. */
export const smoothTransition: Transition = {
  duration: durationGlacial,
  easing: easeOut,
  css: `${durationGlacial} ${easeOut}`,
};

/** Press feedback — 120ms spring. */
export const pressTransition: Transition = {
  duration: durationShort,
  easing: easeSpring,
  css: `${durationShort} ${easeSpring}`,
};

// ---------------------------------------------------------------------------
// Spring configs
// ---------------------------------------------------------------------------

/** Gentle spring for hover lifts (1px settle, no bounce). */
export const springGentle: SpringConfig = {
  css: easeSpring,
  durationMs: 220,
};

/** Snappy spring for button feedback. */
export const springSnappy: SpringConfig = {
  css: 'cubic-bezier(0.2, 1.2, 0.4, 1)',
  durationMs: 180,
};

/** Stiff spring for toast/slide-in. */
export const springStiff: SpringConfig = {
  css: 'cubic-bezier(0.1, 1.1, 0.3, 1)',
  durationMs: 280,
};

// ---------------------------------------------------------------------------
// Stagger delay calculator
// ---------------------------------------------------------------------------

/**
 * Calculate stagger delay for a list of items.
 *
 * @param index - Item index (0-based)
 * @param opts - Configuration options
 * @returns CSS delay string (e.g. "120ms")
 */
export function staggerDelay(
  index: number,
  opts: { baseDelayMs?: number; incrementMs?: number } = {}
): string {
  const { baseDelayMs = 0, incrementMs = 40 } = opts;
  const delay = baseDelayMs + index * incrementMs;
  return `${delay}ms`;
}

/**
 * Generate staggered transition-delay values for a list of elements.
 *
 * @param count - Number of items
 * @param opts - Configuration options
 * @returns Array of CSS delay strings
 */
export function staggerDelays(
  count: number,
  opts: { baseDelayMs?: number; incrementMs?: number } = {}
): string[] {
  return Array.from({ length: count }, (_, i) => staggerDelay(i, opts));
}

/**
 * Create a CSS transition-delay property for staggered animations.
 *
 * @param index - Item index
 * @param opts - Configuration options
 * @returns CSS transition-delay value
 */
export function staggerTransitionDelay(
  index: number,
  opts: { baseDelayMs?: number; incrementMs?: number } = {}
): string {
  return staggerDelay(index, opts);
}
