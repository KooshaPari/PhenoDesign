---
name: pd-component-recipes
description: "Compose pre-built Phenotype component recipes (artifact cards, diagrams, badges, evidence panels) without re-engineering."
license: MIT
---

# Component Recipes

Use this skill when building visual components that map to proven Phenotype patterns. Each recipe is a parameterized template — configure it, don't rebuild from scratch.

## When to Use

- Creating artifact cards, project displays, or evidence panels
- Building SVG system diagrams with nodes, edges, and hover effects
- Adding category badges with family-tinted accent colors
- Displaying physical product cards with images or 3D viewers
- Creating experiment/data tables with accent styling

## Available Recipes

| Recipe | Purpose | Key Parameters |
|--------|---------|---------------|
| `artifact-card` | Project/thing display card | title, summary, type, media, annotations |
| `system-diagram` | SVG diagram with interactive nodes | nodes, edges, layout, markers |
| `experiment-sheet` | Data table with numbered rows | columns, rows, accentColor |
| `physical-plate` | Physical product card | image/3D, annotations, metrics |
| `evidence` | Evidence annotation callout | text, source, confidence |
| `badge` | Category pill with accent tint | label, family, size |

## Workflow

### 1. Install

```bash
npm install @<REDACTED>/phenotype-component-recipes
```

### 2. Import the Recipe

```ts
import { createArtifactCard } from '@<REDACTED>/phenotype-component-recipes/artifact-card';
import { createSystemDiagram } from '@<REDACTED>/phenotype-component-recipes/system-diagram';
import { createBadge } from '@<REDACTED>/phenotype-component-recipes/badge';
```

### 3. Configure and Mount

```ts
const card = createArtifactCard({
  title: 'WITF',
  summary: 'Physical computing keyboard for emotional regulation',
  type: 'physical',
  family: 'evidence',
  media: { type: '3d', src: '/models/witf.glb', poster: '/images/witf-poster.jpg' },
  annotations: [
    { label: 'Status', value: 'Shipped' },
    { label: 'Stack', value: 'RP2040, Kailh, Custom PCB' }
  ]
});

document.getElementById('project-grid').appendChild(card.element);
```

### 4. System Diagram Pattern

```ts
const diagram = createSystemDiagram({
  nodes: [
    { id: 'brain', label: 'Core', x: 200, y: 150, family: 'evidence' },
    { id: 'input', label: 'Input', x: 80, y: 250, family: 'evidence' },
    { id: 'output', label: 'Output', x: 320, y: 250, family: 'evidence' }
  ],
  edges: [
    { from: 'input', to: 'brain', label: 'events' },
    { from: 'brain', to: 'output', label: 'actions' }
  ],
  width: 400,
  height: 350
});

container.appendChild(diagram.element);
```

### 5. Badge with Family Tint

```ts
const badge = createBadge({
  label: 'Physical',
  family: 'evidence', // applies tinted accent color
  size: 'sm'          // 'sm' | 'md' | 'lg'
});
```

## Family Accent Mapping

Each component family maps to an accent color. Badges, card accent bars, and diagram nodes all use this mapping:

| Family | Accent | Usage |
|--------|--------|-------|
| `evidence` | Teal | Proven, shipped work |
| `exploration` | Amber | Research, experiments |
| `infrastructure` | Slate | DevOps, tooling |
| `design` | Rose | Visual, interaction |

## Quality Checklist

- [ ] Using recipe instead of building from scratch
- [ ] All parameters typed (no `any`)
- [ ] Component respects `prefers-reduced-motion`
- [ ] Cards have proper ARIA labels
- [ ] SVG diagrams have `role="img"` and `<title>` elements
- [ ] Badges are readable at smallest size (min 12px)
- [ ] No hardcoded colors — all use token-derived values

## Related Skills

- `pd-design-tokens` — token system used by all recipes
- `pd-interaction-patterns` — attach tilt, reveal, parallax to recipe output
- `pd-3d-viewers` — 3D media for physical-plate recipe
- `pd-accessibility` — validate contrast and ARIA
