---
name: pd-design-tokens
description: "Author, extend, and apply the shared Phenotype token system (CSS custom properties, TS exports, Tailwind preset)."
license: MIT
---

# Design Tokens

Use this skill when creating, extending, or applying design tokens in any Phenotype project. Tokens are the single source of truth for colors, typography, spacing, motion, and layout across the ecosystem.

## When to Use

- Setting up a new project with Phenotype styling
- Adding new color, type, spacing, or motion tokens
- Troubleshooting token application (CSS not reflecting, Tailwind classes missing)
- Building a component that needs to reference the token system

## Core Concepts

### Seed Colors (Canonical)

Four source-of-truth colors from the Material Lab. Never derive directly from these in component code; always use the generated token aliases.

| Token | Hex | Role |
|-------|-----|------|
| `--seed-obsidian` | `#0F1012` | Foundation 900 — quiet shell |
| `--seed-slate` | `#353A40` | Foundation 700 — structural alloy |
| `--seed-ceramic` | `#F6F5F5` | Surface 0 — readable substrate |
| `--seed-teal` | `#7EBAB5` | Signal — optical guidance |

### Token Layers

1. **CSS Custom Properties** (`tokens.css`) — browser-ready, drop into any HTML/CSS project
2. **TypeScript Exports** (`tokens.ts`) — programmatic access for JS/TS tooling
3. **Tailwind Preset** (`tailwind-preset.js`) — merge into `tailwind.config.js` for class-based usage

## Workflow

### 1. Install

```bash
npm install @kooshapari/phenotype-design-tokens
```

### 2. Apply CSS Tokens

```html
<link rel="stylesheet" href="@kooshapari/phenotype-design-tokens/tokens.css">
```

Or import in JS:
```ts
import '@kooshapari/phenotype-design-tokens/tokens.css';
```

### 3. Use in Components

```css
.card {
  background: var(--surface-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  font-family: var(--font-sans);
  transition: box-shadow var(--duration-normal) var(--ease-out);
}
```

### 4. Extend Tokens

When adding new tokens:
1. Define in `tokens.css` following existing naming conventions
2. Export from `tokens.ts` with matching key
3. Add to Tailwind preset if it maps to a utility class
4. Keep the token flat — no nested objects in CSS; use `--category-variant` naming

### 5. Tailwind Integration

```js
// tailwind.config.js
const phenotypePreset = require('@kooshapari/phenotype-design-tokens/tailwind-preset');

module.exports = {
  presets: [phenotypePreset],
  // project-specific overrides below
};
```

## Quality Checklist

- [ ] All colors reference seed palette or derived OKLCH values
- [ ] No hardcoded hex values in component CSS (use tokens)
- [ ] Tokens follow `--category-variant` naming (e.g., `--text-secondary`, `--space-3`)
- [ ] CSS variables are defined at `:root` level
- [ ] TypeScript exports match CSS variable names (camelCase)
- [ ] Tailwind preset includes all spacing, color, and radius tokens
- [ ] `prefers-reduced-motion` tokens for all motion values

## Related Skills

- `pd-component-recipes` — uses tokens for component styling
- `pd-layout-system` — uses spacing and container tokens
- `pd-accessibility` — validates token contrast ratios
