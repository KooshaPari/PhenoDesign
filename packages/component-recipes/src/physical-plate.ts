/**
 * Physical Plate Recipe
 *
 * Physical product card with image or 3D viewer, annotation, metrics,
 * gradient backgrounds, and inner glow effect. Designed for hardware
 * and material artifact showcases.
 *
 * @example
 * ```ts
 * import { createPhysicalPlate } from '@<REDACTED>/phenotype-component-recipes/physical-plate';
 *
 * const plate = createPhysicalPlate({
 *   title: 'WITF Board',
 *   summary: 'Split Alice keyboard with teal accent keys',
 *   slug: 'witf',
 *   image: {
 *     src: '/projects/witf/hero.webp',
 *     alt: 'WITF keyboard render',
 *     width: 1200,
 *     height: 675,
 *   },
 *   annotation: { lens: 'engineering', text: 'CNC aluminum case with brass weight' },
 *   metrics: [{ value: '65%', label: 'layout', detail: 'split alice' }],
 *   category: 'Hardware',
 *   status: 'Shipped',
 *   familyAccent: 'var(--teal-500)',
 * });
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

import type { ArtifactAnnotation, ArtifactMetric, ArtifactMedia } from './artifact-card.js';

/** Configuration for creating a physical plate card. */
export interface PhysicalPlateConfig {
  /** Project title. */
  title: string;
  /** Short summary text. */
  summary: string;
  /** URL slug for the detail page. */
  slug?: string;
  /** Image or custom media content. */
  image?: ArtifactMedia;
  /** 3D viewer container to embed instead of image. */
  viewer3d?: HTMLElement;
  /** Annotation text. */
  annotation?: ArtifactAnnotation;
  /** Metrics to display. */
  metrics?: ArtifactMetric[];
  /** Category label (e.g. "Hardware"). */
  category?: string;
  /** Status label (e.g. "Shipped"). */
  status?: string;
  /** CSS custom property for family accent. */
  familyAccent?: string;
  /** Reveal animation delay in ms. */
  revealDelay?: number;
  /** Gradient background (CSS value). */
  gradient?: string;
  /** Inner glow intensity (0-1). Default: 0.06. */
  glowIntensity?: number;
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
 * Create a physical product plate card.
 *
 * Renders an article with gradient background, inner glow accent,
 * media slot (image or 3D viewer container), and annotation context.
 *
 * @returns `<article>` element with class `phenotype-artifact phenotype-artifact--physical`
 */
export function createPhysicalPlate(config: PhysicalPlateConfig): HTMLElement {
  const {
    title,
    summary,
    slug,
    image,
    viewer3d,
    annotation,
    metrics,
    category = 'Material artifact',
    status = '',
    familyAccent,
    revealDelay = 0,
    gradient,
    glowIntensity = 0.06,
  } = config;

  const accent = familyAccent ?? 'var(--arch-500)';
  const defaultGradient = `linear-gradient(180deg, color-mix(in oklch, ${accent} 4%, transparent) 0%, transparent 60%)`;

  const article = el('article', {
    class: `phenotype-artifact phenotype-artifact--physical${slug ? ` phenotype-artifact--${slug}` : ''}`,
    'data-artifact': slug ?? '',
    'data-reveal': 'up',
    'data-reveal-delay': String(revealDelay),
    style: [
      `--family-accent: ${accent}`,
      `--plate-glow: ${glowIntensity}`,
      gradient ? `background: ${gradient}` : `background: ${defaultGradient}`,
    ].join('; '),
  });

  // Header
  const header = el('header', { class: 'phenotype-artifact-header' },
    el('p', { class: 'phenotype-atelier-label' }, category),
    el('h2', {},
      slug ? el('a', { href: `/work/${slug}` }, title) : title,
    ),
    el('p', { class: 'phenotype-artifact-summary' }, summary),
  );
  article.append(header);

  // Media: 3D viewer or image
  const caption = [category, status].filter(Boolean).join(' / ');
  if (viewer3d) {
    const figure = el('figure', {
      class: 'phenotype-artifact-media phenotype-artifact-media--physical',
      'data-tilt': '',
      'data-tilt-max': '8',
      'data-tilt-glare': 'true',
      'data-tilt-scale': '1.015',
    }, viewer3d);
    if (caption) figure.append(el('figcaption', {}, caption));
    article.append(figure);
  } else if (image?.src) {
    const img = el('img', {
      src: image.src,
      alt: image.alt ?? title,
      loading: 'lazy',
      decoding: 'async',
      ...(image.width ? { width: String(image.width) } : {}),
      ...(image.height ? { height: String(image.height) } : {}),
    });
    const figure = el('figure', {
      class: 'phenotype-artifact-media phenotype-artifact-media--physical',
      'data-tilt': '',
      'data-tilt-max': '8',
      'data-tilt-glare': 'true',
      'data-tilt-scale': '1.015',
    }, img);
    if (caption) figure.append(el('figcaption', {}, caption));
    article.append(figure);
  }

  // Context: annotation + metrics
  if (annotation || metrics?.length) {
    const context = el('div', { class: 'phenotype-artifact-context' });
    if (annotation) {
      context.append(el('div', { class: 'phenotype-artifact-annotation' },
        el('span', { 'aria-hidden': 'true' }, 'P'),
        el('p', {}, annotation.text),
      ));
    }
    if (metrics) {
      for (const m of metrics) {
        context.append(el('div', {
          class: 'phenotype-metric-annotation',
          role: 'note',
          'aria-label': `${m.label}: ${m.value}`,
        },
          el('strong', {}, m.value),
          el('span', {}, m.label),
          m.detail ? el('small', {}, m.detail) : null,
        ));
      }
    }
    article.append(context);
  }

  return article;
}
