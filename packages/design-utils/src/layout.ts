/**
 * Layout utilities for the Phenotype design system.
 *
 * Responsive breakpoint definitions, container query helpers, and grid
 * utilities. Designed for precision layouts — sharp geometry, measured width.
 *
 * @packageDocumentation
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A responsive breakpoint with name, min-width, and pixel value. */
export interface Breakpoint {
  name: string;
  minWidth: string;
  px: number;
}

/** Grid configuration for a CSS Grid layout. */
export interface GridConfig {
  columns: string;
  gap: string;
  maxWidth?: string;
}

// ---------------------------------------------------------------------------
// Breakpoints
// ---------------------------------------------------------------------------

/**
 * Phenotype responsive breakpoints.
 * Mobile-first: min-width media queries.
 */
export const breakpoints: Record<string, Breakpoint> = {
  sm: { name: 'sm', minWidth: '640px', px: 640 },
  md: { name: 'md', minWidth: '768px', px: 768 },
  lg: { name: 'lg', minWidth: '1024px', px: 1024 },
  xl: { name: 'xl', minWidth: '1280px', px: 1280 },
  '2xl': { name: '2xl', minWidth: '1536px', px: 1536 },
};

// ---------------------------------------------------------------------------
// Media query helpers
// ---------------------------------------------------------------------------

/**
 * Generate a min-width media query for a breakpoint.
 *
 * @param bp - Breakpoint name or pixel value
 * @returns CSS media query string
 */
export function minWidth(bp: string | number): string {
  const value = typeof bp === 'number' ? `${bp}px` : bp;
  return `@media (min-width: ${value})`;
}

/**
 * Generate a max-width media query.
 *
 * @param bp - Breakpoint name or pixel value
 * @returns CSS media query string
 */
export function maxWidth(bp: string | number): string {
  const value = typeof bp === 'number' ? `${bp}px` : bp;
  return `@media (max-width: ${value})`;
}

/**
 * Generate a media query for a range between two breakpoints.
 *
 * @param min - Minimum breakpoint
 * @param max - Maximum breakpoint
 * @returns CSS media query string
 */
export function mediaRange(min: string | number, max: string | number): string {
  const minVal = typeof min === 'number' ? `${min}px` : min;
  const maxVal = typeof max === 'number' ? `${max}px` : max;
  return `@media (min-width: ${minVal}) and (max-width: ${maxVal})`;
}

// ---------------------------------------------------------------------------
// Container queries
// ---------------------------------------------------------------------------

/**
 * Generate a container query for a minimum width.
 *
 * @param minPx - Minimum container width in px
 * @returns CSS container query string
 */
export function containerMinWidth(minPx: number): string {
  return `@container (min-width: ${minPx}px)`;
}

/**
 * Generate a container query for a maximum width.
 *
 * @param maxPx - Maximum container width in px
 * @returns CSS container query string
 */
export function containerMaxWidth(maxPx: number): string {
  return `@container (max-width: ${maxPx}px)`;
}

// ---------------------------------------------------------------------------
// Grid utilities
// ---------------------------------------------------------------------------

/**
 * Generate a CSS Grid template with equal-width columns.
 *
 * @param cols - Number of columns
 * @param gap - Gap between items (CSS value, default 1rem)
 * @returns CSS grid-template-columns value
 */
export function gridCols(cols: number, _gap = '1rem'): string {
  return `repeat(${cols}, 1fr)`;
}

/**
 * Build a complete grid layout config.
 *
 * @param columns - Number of columns
 * @param gap - Gap between items
 * @param maxWidth - Optional max width
 * @returns GridConfig object
 */
export function grid(
  columns: number,
  gap = '1rem',
  maxWidth?: string
): GridConfig {
  return {
    columns: gridCols(columns, gap),
    gap,
    maxWidth,
  };
}

/**
 * Generate a responsive grid that adapts across breakpoints.
 * Uses auto-fill with minmax for fluid column counts.
 *
 * @param minColWidth - Minimum column width (CSS value)
 * @param gap - Gap between items
 * @returns CSS grid-template-columns with auto-fill
 */
export function fluidGrid(minColWidth = '200px', _gap = '1rem'): string {
  return `repeat(auto-fill, minmax(${minColWidth}, 1fr))`;
}

/**
 * Generate the CSS measure (max-width for readable text).
 *
 * @param ch - Character width unit (default 68ch from tokens)
 * @returns CSS max-width value
 */
export function measure(ch = 68): string {
  return `${ch}ch`;
}
