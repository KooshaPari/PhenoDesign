/**
 * Evidence Annotation & Metric Callout Components
 *
 * Two small composable components for displaying evidence labels
 * and metric annotations within artifact cards and case studies.
 *
 * @example
 * ```ts
 * import { createEvidenceLabel, createMetricCallout } from '@<REDACTED>/phenotype-component-recipes/evidence';
 *
 * const label = createEvidenceLabel({
 *   type: 'engineering',
 *   summary: 'Repository documentation and project history',
 *   assetCount: 3,
 * });
 *
 * const metric = createMetricCallout({
 *   value: '40+',
 *   label: 'providers',
 *   detail: 'actively tested',
 * });
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Evidence label configuration. */
export interface EvidenceLabelConfig {
  /** Which lens this evidence supports. */
  type: 'product' | 'engineering';
  /** Human-readable summary of the evidence source. */
  summary: string;
  /** Number of traced media assets (optional). */
  assetCount?: number;
  /** Additional CSS class names. */
  className?: string;
}

/** Metric callout configuration. */
export interface MetricCalloutConfig {
  /** Primary value (e.g. "40+", "3.2s"). */
  value: string;
  /** Metric label (e.g. "providers"). */
  label: string;
  /** Qualifying detail text. */
  detail?: string;
  /** Additional CSS class names. */
  className?: string;
}

/** Evidence panel configuration for case studies. */
export interface EvidencePanelConfig {
  /** Panel title. */
  title?: string;
  /** Evidence items as key-value pairs. */
  items: Array<[key: string, value: string]>;
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
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

/**
 * Create an evidence source label.
 *
 * Renders a `<p>` with the evidence type, summary, and optional asset trace info.
 *
 * @returns `<p>` element with class `phenotype-evidence-label`
 */
export function createEvidenceLabel(config: EvidenceLabelConfig): HTMLElement {
  const { type, summary, assetCount, className = '' } = config;
  const label = type === 'product' ? 'Product evidence' : 'Engineering evidence';

  const children: (Node | string | null)[] = [
    el('span', {}, label),
    el('strong', {}, summary),
  ];

  if (assetCount && assetCount > 0) {
    const noun = assetCount === 1 ? 'file' : 'files';
    children.push(
      el('small', {}, `Selected media: ${assetCount} manifest-traced ${noun}; ownership and licensing review pending.`),
    );
  }

  return el('p', { class: `phenotype-evidence-label${className ? ` ${className}` : ''}` }, ...children);
}

/**
 * Create a metric callout annotation.
 *
 * Renders a `<div>` with a bold value, label, and optional detail.
 *
 * @returns `<div>` element with class `phenotype-metric-annotation`
 */
export function createMetricCallout(config: MetricCalloutConfig): HTMLElement {
  const { value, label, detail, className = '' } = config;

  return el(
    'div',
    {
      class: `phenotype-metric-annotation${className ? ` ${className}` : ''}`,
      role: 'note',
      'aria-label': `${label}: ${value}`,
    },
    el('strong', {}, value),
    el('span', {}, label),
    detail ? el('small', {}, detail) : null,
  );
}

/**
 * Create an evidence panel for case studies.
 *
 * Renders a definition-list style panel with key-value evidence items.
 *
 * @returns `<div>` element with class `phenotype-evidence-panel`
 */
export function createEvidencePanel(config: EvidencePanelConfig): HTMLElement {
  const { title = 'Evidence', items, className = '' } = config;

  const panel = el('div', { class: `phenotype-evidence-panel${className ? ` ${className}` : ''}` });
  panel.append(el('h3', {}, title));

  const list = el('dl', { class: 'phenotype-evidence-list' });
  for (const [key, value] of items) {
    list.append(el('dt', {}, key));
    list.append(el('dd', {}, value));
  }
  panel.append(list);

  return panel;
}

/**
 * Create a lens annotation block for case study sections.
 *
 * @returns `<div>` element with class `phenotype-lens-annotation`
 */
export function createLensAnnotation(
  title: string,
  content: string,
  accentColor?: string,
): HTMLElement {
  const attrs: Record<string, string> = { class: 'phenotype-lens-annotation' };
  if (accentColor) {
    attrs.style = `border-left-color: ${accentColor}`;
  }

  const node = el('div', attrs);
  node.append(el('h3', {}, title));
  node.append(el('p', {}, content));
  return node;
}
