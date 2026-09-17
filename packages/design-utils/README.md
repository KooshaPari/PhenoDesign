# @<REDACTED>/phenotype-design-utils

Design utility functions for the Phenotype ecosystem. Color (OKLCH), responsive type scales, spacing, motion, and layout helpers.

## Installation

```bash
npm install @<REDACTED>/phenotype-design-utils
```

## Modules

### Color (OKLCH)

```ts
import { hexToOKLCH, contrastRatio, meetsWCAG, mixOKLCH, generatePalette } from '@<REDACTED>/phenotype-design-utils/color';

// Parse hex to OKLCH
const teal = hexToOKLCH('#7EBAB5');

// Check WCAG compliance
const fg = { r: 23, g: 26, b: 24 }; // obsidian
const bg = { r: 243, g: 240, b: 232 }; // paper-100
meetsWCAG(fg, bg, 'AA'); // true
contrastRatio(fg, bg); // ~16.5

// Mix two colors
const mixed = mixOKLCH(teal, hexToOKLCH('#F6F5F5'), 0.5);

// Generate palette from seed
const palette = generatePalette(teal); // 5-stop lightness ramp
```

### Type Scale

```ts
import { phenoTypeScale, clampFluid, generateTypeScale } from '@<REDACTED>/phenotype-design-utils/type-scale';

// Use the canonical Phenotype scale
phenoTypeScale['0'].clamp; // "clamp(0.96rem, 0.9rem + 0.25vw, 1.08rem)"

// Generate a custom fluid scale
const custom = generateTypeScale({
  sm: { minRem: 0.875, maxRem: 1 },
  lg: { minRem: 1.25, maxRem: 2 },
});
```

### Spacing

```ts
import { spacing, spacingPx, closestStep, fluidGutter } from '@<REDACTED>/phenotype-design-utils/spacing';

spacing(3);  // "1rem" (16px)
spacingPx(5); // 36
closestStep(20); // 3 (closest to 16px)
fluidGutter();   // "clamp(1rem, 3vw, 3.75rem)"
```

### Motion

```ts
import { fadeTransition, springGentle, staggerDelays } from '@<REDACTED>/phenotype-design-utils/motion';

// Predefined transitions
fadeTransition.css;     // "160ms cubic-bezier(0.16, 1, 0.3, 1)"
springGentle.css;       // "cubic-bezier(0.34, 1.56, 0.64, 1)"

// Stagger delays for list animations
const delays = staggerDelays(5); // ["0ms", "40ms", "80ms", "120ms", "160ms"]
const delays = staggerDelays(5, { baseDelayMs: 100, incrementMs: 60 });
```

### Layout

```ts
import { minWidth, breakpoints, fluidGrid, measure } from '@<REDACTED>/phenotype-design-utils/layout';

minWidth('lg');  // "@media (min-width: 1024px)"
minWidth(768);   // "@media (min-width: 768px)"
fluidGrid('250px', '1.5rem'); // "repeat(auto-fill, minmax(250px, 1fr))"
measure();       // "68ch"
```

## Design Principles

- **Precision, not plush** — Sharp geometry, 1px hover lifts, short motion
- **Seed-first** — Compose from four canonical Material Lab seeds
- **Measured width** — 68ch measure for readable text
- **Short motion** — 120ms-380ms range, no ambient loops
- **Mobile-first** — min-width breakpoints, fluid clamp() for typography
