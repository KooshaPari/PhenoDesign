/**
 * Artifact Card Recipe
 *
 * Parameterized artifact card that renders a project artifact with header,
 * media slot, annotations, and metrics. Supports three types: physical,
 * systems, and experiment.
 *
 * @example
 * ```ts
 * import { createArtifactCard } from '@<REDACTED>/phenotype-component-recipes/artifact-card';
 *
 * const card = createArtifactCard({
 *   title: 'OmniRoute',
 *   summary: 'AI model routing proxy with 40+ providers',
 *   type: 'systems',
 *   slug: 'omniroute',
 *   label: 'Upstream routing overview',
 *   annotation: { lens: 'engineering', text: 'Built on Rust performance cores' },
 *   metrics: [{ value: '40+', label: 'providers', detail: 'actively tested' }],
 *   familyAccent: 'var(--arch-500)',
 * });
 * document.body.appendChild(card);
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Artifact type determines visual variant and default label. */
export type ArtifactType = 'physical' | 'systems' | 'experiment';

/** Annotation shown in the card footer with lens indicator. */
export interface ArtifactAnnotation {
  /** Which lens this annotation is from. */
  lens: 'product' | 'engineering';
  /** Annotation text content. */
  text: string;
}

/** Metric callout displayed alongside the annotation. */
export interface ArtifactMetric {
  /** Primary value string (e.g. "40+", "3.2s", "99.9%"). */
  value: string;
  /** Metric label (e.g. "providers", "latency"). */
  label: string;
  /** Qualifying detail text. */
  detail?: string;
}

/** Media content slot for the card. */
export interface ArtifactMedia {
  /** Image source URL. */
  src?: string;
  /** Image alt text. */
  alt?: string;
  /** Image dimensions. */
  width?: number;
  height?: number;
  /** Custom element to render instead of an image (e.g. 3D viewer container). */
  custom?: HTMLElement;
  /** Figcaption text. */
  caption?: string;
}

/** Configuration for creating an artifact card. */
export interface ArtifactCardConfig {
  /** Project title. */
  title: string;
  /** Short summary text. */
  summary: string;
  /** Artifact type variant. */
  type: ArtifactType;
  /** URL slug for linking. */
  slug?: string;
  /** Header label override. Falls back to type-based default. */
  label?: string;
  /** Media content to display. */
  media?: ArtifactMedia;
  /** Engineering or product annotation. */
  annotation?: ArtifactAnnotation;
  /** Metrics to display. */
  metrics?: ArtifactMetric[];
  /** CSS custom property for family accent color. */
  familyAccent?: string;
  /** Reveal animation delay in ms. */
  revealDelay?: number;
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

const TYPE_DEFAULTS: Record<ArtifactType, string> = {
  physical: 'Material artifact',
  systems: 'Runtime topology',
  experiment: 'Fork-delta experiment',
};

const TYPE_INDICATOR: Record<ArtifactType, string> = {
  physical: 'P',
  systems: 'S',
  experiment: 'E',
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function renderHeader(title: string, summary: string, label: string, slug?: string): HTMLElement {
  const heading = slug
    ? el('h2', {}, el('a', { href: `/work/${slug}` }, title))
    : el('h2', {}, title);

  return el(
    'header',
    { class: 'phenotype-artifact-header' },
    el('p', { class: 'phenotype-atelier-label' }, label),
    heading,
    el('p', { class: 'phenotype-artifact-summary' }, summary),
  );
}

function renderAnnotation(annotation: ArtifactAnnotation): HTMLElement {
  return el(
    'div',
    { class: 'phenotype-artifact-annotation' },
    el('span', { 'aria-hidden': 'true' }, TYPE_INDICATOR.physical),
    el('p', {}, annotation.text),
  );
}

function renderMetric(metric: ArtifactMetric): HTMLElement {
  return el(
    'div',
    { class: 'phenotype-metric-annotation', role: 'note', 'aria-label': `${metric.label}: ${metric.value}` },
    el('strong', {}, metric.value),
    el('span', {}, metric.label),
    metric.detail ? el('small', {}, metric.detail) : null,
  );
}

function renderMedia(media: ArtifactMedia): HTMLElement | null {
  if (media.custom) {
    const figure = el(
      'figure',
      { class: 'phenotype-artifact-media' },
      media.custom,
    );
    if (media.caption) {
      figure.append(el('figcaption', {}, media.caption));
    }
    return figure;
  }

  if (!media.src) return null;

  const img = el('img', {
    src: media.src,
    alt: media.alt ?? '',
    loading: 'lazy',
    decoding: 'async',
    ...(media.width ? { width: String(media.width) } : {}),
    ...(media.height ? { height: String(media.height) } : {}),
  });

  const figure = el(
    'figure',
    {
      class: 'phenotype-artifact-media',
      'data-tilt': '',
      'data-tilt-max': '8',
      'data-tilt-glare': 'true',
      'data-tilt-scale': '1.015',
    },
    img,
  );
  if (media.caption) {
    figure.append(el('figcaption', {}, media.caption));
  }
  return figure;
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Create a parameterized artifact card element.
 *
 * Returns an `<article>` with class `phenotype-artifact phenotype-artifact--{type}`.
 * Attach to the DOM to display.
 */
export function createArtifactCard(config: ArtifactCardConfig): HTMLElement {
  const {
    title,
    summary,
    type,
    slug,
    label = TYPE_DEFAULTS[type],
    media,
    annotation,
    metrics,
    familyAccent,
    revealDelay = 0,
    className = '',
  } = config;

  const attrs: Record<string, string> = {
    class: `phenotype-artifact phenotype-artifact--${type}${className ? ` ${className}` : ''}`,
    'data-artifact': slug ?? '',
    'data-reveal': 'up',
    'data-reveal-delay': String(revealDelay),
  };
  if (familyAccent) {
    attrs['data-family'] = type;
    attrs.style = `--family-accent: ${familyAccent}`;
  }

  const children: (HTMLElement | null)[] = [
    renderHeader(title, summary, label, slug),
    media ? renderMedia(media) : null,
  ];

  if (annotation || metrics?.length) {
    const context = el('div', { class: 'phenotype-artifact-context' });
    if (annotation) context.append(renderAnnotation(annotation));
    if (metrics) {
      for (const m of metrics) context.append(renderMetric(m));
    }
    children.push(context);
  }

  return el('article', attrs, ...children);
}

/**
 * Convenience: create multiple artifact cards from a dataset.
 *
 * @param records - Array of card configs
 * @param staggerBase - Delay between cards in ms (default 100)
 * @returns Array of card elements with staggered reveal delays
 */
export function createArtifactSequence(
  records: ArtifactCardConfig[],
  staggerBase = 100,
): HTMLElement[] {
  return records.map((config, i) =>
    createArtifactCard({ ...config, revealDelay: i * staggerBase }),
  );
}
