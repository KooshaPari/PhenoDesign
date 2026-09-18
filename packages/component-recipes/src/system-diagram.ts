/**
 * System Diagram Recipe
 *
 * Renders an SVG system diagram with nodes and edges. Includes arrow markers,
 * index numbers, hover effects, and accessible fallback for mobile.
 *
 * @example
 * ```ts
 * import { renderDiagram } from '@kooshapari/phenotype-component-recipes/system-diagram';
 *
 * const figure = renderDiagram({
 *   title: 'Request flow',
 *   summary: 'How requests route through the system',
 *   nodes: [
 *     { id: 'n1', label: 'Client' },
 *     { id: 'n2', label: 'Gateway' },
 *     { id: 'n3', label: 'Service' },
 *   ],
 *   edges: [
 *     { from: 'n1', to: 'n2' },
 *     { from: 'n2', to: 'n3' },
 *   ],
 * });
 * document.body.appendChild(figure);
 * ```
 *
 * @packageDocumentation
 */

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/** A node in the diagram. */
export interface DiagramNode {
  /** Unique identifier. */
  id: string;
  /** Display label. */
  label: string;
}

/** An edge connecting two nodes. */
export interface DiagramEdge {
  /** Source node id. */
  from: string;
  /** Target node id. */
  to: string;
}

/** Full diagram definition. */
export interface DiagramDefinition {
  /** Accessible title for the SVG. */
  title?: string;
  /** Summary description for screen readers and captions. */
  summary?: string;
  /** Node list (minimum 2). */
  nodes: DiagramNode[];
  /** Edge list connecting node ids. */
  edges: DiagramEdge[];
}

/** Rendering options for the diagram. */
export interface DiagramOptions {
  /** SVG viewBox width. Default: 640. */
  width?: number;
  /** Vertical spacing between nodes. Default: 88. */
  nodeSpacing?: number;
  /** Node rect height. Default: 52. */
  nodeHeight?: number;
  /** Node corner radius. Default: 6. */
  cornerRadius?: number;
  /** Arrow marker color (CSS value). Default: 'var(--arch-500)'. */
  edgeColor?: string;
  /** Node rect fill. Default: 'var(--surface)'. */
  nodeFill?: string;
  /** Node rect stroke. Default: 'var(--rule)'. */
  nodeStroke?: string;
  /** Hover stroke color. Default: 'var(--arch-500)'. */
  hoverStroke?: string;
  /** Force mobile text fallback. null = auto-detect. */
  forceMobile?: boolean | null;
}

/* ------------------------------------------------------------------ */
/*  SVG helpers                                                       */
/* ------------------------------------------------------------------ */

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(
  tag: string,
  attrs: Record<string, string> = {},
  ...children: (SVGElement | SVGTextElement | string | null)[]
): SVGElement {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  for (const child of children.flat(Infinity)) {
    if (child == null) continue;
    node.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return node;
}

/* ------------------------------------------------------------------ */
/*  Validation                                                        */
/* ------------------------------------------------------------------ */

function validate(def: DiagramDefinition): { valid: boolean; nodes: DiagramNode[]; edges: DiagramEdge[] } {
  const nodes = Array.isArray(def.nodes) ? def.nodes : [];
  const ids = new Set(nodes.map(({ id }) => id));
  const edges = Array.isArray(def.edges) ? def.edges : [];
  const valid =
    nodes.length >= 2 &&
    ids.size === nodes.length &&
    edges.every(({ from, to }) => ids.has(from) && ids.has(to));
  return { valid, nodes, edges };
}

function isMobile(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/* ------------------------------------------------------------------ */
/*  Renderers                                                         */
/* ------------------------------------------------------------------ */

function renderMobile(def: DiagramDefinition): HTMLElement {
  const { nodes, edges } = validate(def);
  const XHTML_NS = 'http://www.w3.org/1999/xhtml';
  const el = (tag: string, attrs: Record<string, string> = {}, ...ch: (Node | string | null)[]) => {
    const n = document.createElementNS(XHTML_NS, tag);
    for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
    for (const c of ch.flat(Infinity)) {
      if (c != null) n.append(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return n;
  };

  const nodeList = el('ol', { class: 'phenotype-diagram-reader__nodes' },
    ...nodes.map((n) => el('li', {}, n.label)),
  );

  const edgeList = el('ul', { class: 'phenotype-diagram-reader__edges' },
    ...edges.map(({ from, to }) => {
      const s = nodes.find((n) => n.id === from);
      const t = nodes.find((n) => n.id === to);
      return el('li', {}, `${s?.label ?? from} → ${t?.label ?? to}`);
    }),
  );

  const reader = el('div', { class: 'phenotype-diagram-reader' },
    el('p', {}, def.title ?? 'System diagram'),
    nodeList,
    el('p', {}, 'Connections'),
    edgeList,
  );

  return el('figure', { class: 'phenotype-diagram-figure' },
    reader,
    el('figcaption', {}, def.summary ?? ''),
  );
}

function renderSVG(def: DiagramDefinition, opts: DiagramOptions): SVGElement {
  const { nodes, edges } = validate(def);
  const w = opts.width ?? 640;
  const spacing = opts.nodeSpacing ?? 88;
  const nh = opts.nodeHeight ?? 52;
  const rx = String(opts.cornerRadius ?? 6);
  const totalH = Math.max(180, nodes.length * spacing);
  const descId = `diagram-${nodes.map(({ id }) => id).join('-')}`;

  // Arrow marker definition
  const defs = svgEl('defs', {},
    svgEl('marker', {
      id: 'phenotype-diagram-arrow',
      viewBox: '0 0 10 7',
      refX: '10',
      refY: '3.5',
      markerWidth: '10',
      markerHeight: '7',
      orient: 'auto-start-reverse',
    },
      svgEl('polygon', { points: '0 0, 10 3.5, 0 7', fill: opts.edgeColor ?? 'var(--arch-500)' }),
    ),
  );

  // Edges
  const edgeEls = edges.map(({ from, to }) => {
    const si = nodes.findIndex((n) => n.id === from);
    const ti = nodes.findIndex((n) => n.id === to);
    return svgEl('line', {
      x1: String(w / 2),
      y1: String(44 + si * spacing),
      x2: String(w / 2),
      y2: String(44 + ti * spacing),
      class: 'phenotype-svg-diagram__edge',
      'marker-end': 'url(#phenotype-diagram-arrow)',
    });
  });

  // Nodes
  const nodeEls = nodes.map((node, i) =>
    svgEl('g', { class: 'phenotype-svg-diagram__node', transform: `translate(80 ${20 + i * spacing})` },
      svgEl('rect', { width: String(w - 160), height: String(nh), rx }),
      svgEl('text', { x: '18', y: '30', class: 'phenotype-node-index' }, String(i + 1).padStart(2, '0')),
      svgEl('text', { x: '60', y: '30' }, node.label),
    ),
  );

  const svg = svgEl('svg', {
    class: 'phenotype-svg-diagram',
    viewBox: `0 0 ${w} ${totalH}`,
    role: 'img',
    'aria-labelledby': `${descId}-title ${descId}-desc`,
  },
    defs,
    svgEl('title', { id: `${descId}-title` }, def.title ?? 'System diagram'),
    svgEl('desc', { id: `${descId}-desc` }, def.summary ?? ''),
    ...edgeEls,
    ...nodeEls,
  );

  return svg;
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * Render a complete system diagram as a `<figure>` element.
 *
 * On mobile viewports, falls back to an accessible ordered list.
 * On desktop, renders an SVG with arrow markers and hover effects.
 *
 * @param definition - Nodes and edges to render
 * @param opts - Rendering options (colors, spacing, mobile override)
 * @returns `<figure>` element ready to append to the DOM
 */
export function renderDiagram(
  definition: DiagramDefinition,
  opts: DiagramOptions = {},
): HTMLElement {
  const { valid } = validate(definition);
  if (!valid) {
    const XHTML_NS = 'http://www.w3.org/1999/xhtml';
    const p = document.createElementNS(XHTML_NS, 'p');
    p.className = 'phenotype-diagram-fallback';
    p.textContent = definition.summary ?? 'Diagram data is unavailable.';
    return p;
  }

  const XHTML_NS = 'http://www.w3.org/1999/xhtml';
  const fig = document.createElementNS(XHTML_NS, 'figure');
  fig.className = 'phenotype-diagram-figure';

  const useMobile = opts.forceMobile ?? isMobile();

  if (useMobile) {
    fig.append(renderMobile(definition));
  } else {
    fig.append(renderSVG(definition, opts));
  }

  const caption = document.createElementNS(XHTML_NS, 'figcaption');
  caption.textContent = definition.summary ?? '';
  fig.append(caption);

  return fig;
}

/**
 * Validate a diagram definition without rendering.
 * Returns whether the definition is renderable.
 */
export function validateDiagram(definition: DiagramDefinition): boolean {
  return validate(definition).valid;
}
