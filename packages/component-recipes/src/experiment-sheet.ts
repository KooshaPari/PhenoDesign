/**
 * Experiment Sheet Recipe
 *
 * Renders a data table / experiment sheet with numbered rows,
 * label-detail pairs, and optional accent styling.
 *
 * @example
 * ```ts
 * import { createExperimentSheet } from '@kooshapari/phenotype-component-recipes/experiment-sheet';
 *
 * const sheet = createExperimentSheet({
 *   rows: [
 *     ['Route layer', 'A* over directed road graph'],
 *     ['Traffic layer', 'Per-road cellular automata'],
 *     ['Observed', 'Congestion, waves, gridlock'],
 *   ],
 *   summary: 'Simulation field note',
 *   ariaLabel: 'NetWeave experiment parameters',
 * });
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** A single row in the experiment sheet. */
export type ExperimentRow = [label: string, detail: string];

/** Configuration for creating an experiment sheet. */
export interface ExperimentSheetConfig {
  /** Row data as [label, detail] pairs. */
  rows: ExperimentRow[];
  /** Summary text for screen readers and caption. */
  summary?: string;
  /** Accessible label for the container. */
  ariaLabel?: string;
  /** Accessible describedby target id. */
  ariaDescribedBy?: string;
  /** CSS custom property for accent color. */
  accent?: string;
  /** Additional CSS class names. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const NS = 'http://www.w3.org/1999/xhtml';

function el(
  tag: string,
  attrs: Record<string, string> = {},
  ...children: (Node | string | null | undefined)[]
): HTMLElement {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v != null) node.setAttribute(k, v);
  }
  for (const child of children.flat(Infinity)) {
    if (child == null) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Create an experiment sheet element.
 *
 * Renders a list of `[label, detail]` rows with zero-padded index numbers,
 * wrapped in a container with semantic ARIA attributes.
 *
 * @returns `<div>` with class `phenotype-experiment-sheet`
 */
export function createExperimentSheet(config: ExperimentSheetConfig): HTMLElement {
  const { rows, summary, ariaLabel, ariaDescribedBy, accent, className = '' } = config;

  const container = el('div', {
    class: `phenotype-experiment-sheet${className ? ` ${className}` : ''}`,
    role: 'img',
    'aria-label': ariaLabel ?? summary ?? 'Experiment data',
    ...(ariaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {}),
  });

  if (accent) {
    container.style.setProperty('--family-accent', accent);
  }

  for (const [label, detail], index of rows) {
    const row = el('div', { class: 'phenotype-experiment-row' },
      el('span', { class: 'phenotype-experiment-index' }, String(index + 1).padStart(2, '0')),
      el('div', { class: 'phenotype-experiment-content' },
        el('strong', {}, label),
        el('span', {}, detail),
      ),
    );
    container.append(row);
  }

  return container;
}

/**
 * Create an experiment sheet from a newline-delimited string.
 *
 * @param text - Newline-separated lines, each split on the first `:` or `|`
 * @param opts - Sheet configuration options
 */
export function createExperimentSheetFromString(
  text: string,
  opts: Omit<ExperimentSheetConfig, 'rows'> = {},
): HTMLElement {
  const rows: ExperimentRow[] = text
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => {
      const sep = line.includes(':') ? ':' : '|';
      const [label, ...rest] = line.split(sep);
      return [label.trim(), rest.join(sep).trim()] as ExperimentRow;
    });

  return createExperimentSheet({ ...opts, rows });
}
