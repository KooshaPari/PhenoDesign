# @<REDACTED>/phenotype-component-recipes

Reusable, parameterized visual component recipes extracted from proven Phenotype implementations.
Agents can compose these without re-engineering from scratch.

## Components

| Recipe | Description |
|--------|-------------|
| `artifact-card` | Parameterized artifact card with title, summary, type, media, annotations |
| `system-diagram` | SVG system diagram with nodes, edges, arrow markers, hover effects |
| `experiment-sheet` | Data table with numbered rows and accent styling |
| `physical-plate` | Physical product card with image/3D viewer, annotation, metrics |
| `evidence` | Evidence annotation and metric callout components |
| `badge` | Category badge/pill with family accent tinting |

## Usage

```ts
import { createArtifactCard } from '@<REDACTED>/phenotype-component-recipes/artifact-card';
import { renderDiagram } from '@<REDACTED>/phenotype-component-recipes/system-diagram';
import { createBadge } from '@<REDACTED>/phenotype-component-recipes/badge';

const card = createArtifactCard({
  title: 'OmniRoute',
  summary: 'AI model routing proxy with 40+ providers',
  type: 'systems',
  slug: 'omniroute',
  familyAccent: 'var(--arch-500)',
});

document.body.appendChild(card);
```

## All exports

```ts
import * as Recipes from '@<REDACTED>/phenotype-component-recipes';
```

## Conventions

- Pure DOM APIs (no framework dependency)
- Each factory returns `HTMLElement` or `SVGElement`
- All elements use semantic HTML
- CSS classes follow the `phenotype-` prefix pattern
- Under 250 lines per file

## License

MIT
