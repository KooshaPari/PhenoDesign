# @<REDACTED>/phenotype-design-tokens

Shared design tokens for the Phenotype ecosystem. Anchored by four canonical seed colors from the Material Lab source packet.

## Seed Colors

| Token | Hex | Role |
|-------|-----|------|
| `--seed-obsidian` | `#0F1012` | Foundation 900 — quiet shell |
| `--seed-slate` | `#353A40` | Foundation 700 — structural alloy |
| `--seed-ceramic` | `#F6F5F5` | Surface 0 — readable substrate |
| `--seed-teal` | `#7EBAB5` | Signal — optical guidance |

## Installation

```bash
npm install @<REDACTED>/phenotype-design-tokens
```

## Usage

### CSS Import (recommended)

```css
@import '@<REDACTED>/phenotype-design-tokens/tokens.css';
```

This exposes all tokens as CSS custom properties on `:root`, including dark mode overrides via `[data-theme="dark"]`.

### TypeScript

```ts
import { seeds, spacing, motion } from '@<REDACTED>/phenotype-design-tokens';

const style = {
  color: seeds.teal,
  padding: spacing['3'],
  transitionDuration: motion.standard,
};
```

### Tailwind CSS

```js
// tailwind.config.js
import phenoPreset from '@<REDACTED>/phenotype-design-tokens/tailwind';

export default {
  presets: [phenoPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
};
```

Then use the tokens as Tailwind utilities:

```html
<div class="bg-surface text-ink font-display">
  <h1 class="text-step-3">Hello</h1>
  <p class="text-step-0 text-ink-muted">Body text</p>
  <button class="rounded-control bg-accent transition-normal">Click</button>
</div>
```

## Token Categories

- **Seeds** — Four canonical Material Lab colors
- **Surfaces** — Derived surface palette (obsidian, slate, ceramic, teal, raised, inset)
- **Graphite/Paper/Concrete/Olive/Arch/Acid** — Derived color families
- **Ink** — Text colors (default + muted)
- **Typography** — Font families (display, reading, meta) and responsive clamp-based type scale (step -1 through 4)
- **Spacing** — Material Lab 4..64 scale (8 steps from 4px to 88px)
- **Radii** — Sharp instrument corners: control (6px), panel (10px), studio (12px)
- **Motion** — Short durations (120ms-380ms) with precision easing curves
- **Family accents** — Per-project accent colors with engineering and product lens variants
- **Elevation** — Card and specimen shadows, z-index layers
- **Dark mode** — Activated via `data-theme="dark"` on `<html>`

## Design Principles

- **Precision, not plush** — Sharp corners, 1px hover lifts, short motion
- **Seed-first** — Compose from four canonical seeds, not downstream palettes
- **Lens-aware** — Engineering and product lenses shift accent colors via `data-lens`
- **Motion is short** — 120ms-380ms range, no ambient loops
