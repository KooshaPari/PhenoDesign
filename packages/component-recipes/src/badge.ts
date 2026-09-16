/**
 * Badge / Pill Component Recipe
 *
 * Category badge with family accent tinting. Renders as a pill-shaped
 * inline element with configurable label, optional icon, and accent
 * color derived from the project family.
 *
 * @example
 * ```ts
 * import { createBadge } from '@kooshapari/phenotype-component-recipes/badge';
 *
 * const badge = createBadge({
 *   label: 'Shipped',
 *   family: 'omniroute',
 *   familyAccent: 'var(--arch-500)',
 * });
 * card.querySelector('header')?.prepend(badge);
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** Badge variant determines visual weight. */
export type BadgeVariant = 'default' | 'accent' | 'subtle';

/** Configuration for creating a badge. */
export interface BadgeConfig {
  /** Badge text label. */
  label: string;
  /** Family name for accent tinting (e.g. "omniroute", "substrate"). */
  family?: string;
  /** CSS custom property value for family accent color. */
  familyAccent?: string;
  /** Visual variant. Default: 'default'. */
  variant?: BadgeVariant;
  /** Optional icon text or character to prepend. */
  icon?: string;
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
 * Create a category badge/pill element.
 *
 * Renders a `<span>` with class `phenotype-badge phenotype-badge--{variant}`.
 * When `family` is set, applies `--family-accent` CSS custom property for tinting.
 *
 * Badge CSS classes:
 * - `phenotype-badge` - base styles
 * - `phenotype-badge--default` - standard badge
 * - `phenotype-badge--accent` - filled accent background
 * - `phenotype-badge--subtle` - muted background
 * - `phenotype-badge--{family}` - family-specific tint
 *
 * @returns `<span>` element ready to insert into the DOM
 */
export function createBadge(config: BadgeConfig): HTMLElement {
  const {
    label,
    family,
    familyAccent,
    variant = 'default',
    icon,
    className = '',
  } = config;

  const classes = [
    'phenotype-badge',
    `phenotype-badge--${variant}`,
    family ? `phenotype-badge--${family}` : '',
    className,
  ].filter(Boolean).join(' ');

  const attrs: Record<string, string> = { class: classes };
  if (familyAccent) {
    attrs.style = `--family-accent: ${familyAccent}`;
  }

  const children: (Node | string | null)[] = [];
  if (icon) {
    children.push(el('span', { class: 'phenotype-badge-icon', 'aria-hidden': 'true' }, icon));
  }
  children.push(label);

  return el('span', attrs, ...children);
}

/**
 * Create a status badge with predefined status styles.
 *
 * Status maps to a semantic color:
 * - `shipped` - green accent
 * - `in-progress` - amber accent
 * - `planned` - muted accent
 * - `archived` - grey accent
 *
 * @returns `<span>` element with status badge styling
 */
export function createStatusBadge(
  status: 'shipped' | 'in-progress' | 'planned' | 'archived',
  label?: string,
): HTMLElement {
  const displayLabel = label ?? status.replace('-', ' ');
  return createBadge({
    label: displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1),
    variant: 'accent',
    className: `phenotype-badge--status-${status}`,
  });
}

/**
 * Create a tech stack badge for technology pills.
 *
 * @returns `<span>` element with tech badge styling
 */
export function createTechBadge(tech: string): HTMLElement {
  return createBadge({
    label: tech,
    variant: 'subtle',
    className: 'phenotype-badge--tech',
  });
}
