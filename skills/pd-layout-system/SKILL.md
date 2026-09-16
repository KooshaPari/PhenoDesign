---
name: pd-layout-system
description: "Grid, spacing, container queries, and responsive breakpoint patterns for Phenotype projects."
license: MIT
---

# Layout System

Use this skill when building page layouts, grid systems, or responsive structures in Phenotype projects. Provides the spatial logic that all components sit within.

## When to Use

- Setting up page layout (header, content, sidebar, footer)
- Building responsive grid systems for card galleries
- Configuring container queries for component-level responsiveness
- Choosing spacing values from the token system
- Debugging layout issues (overflow, alignment, spacing)

## Core Concepts

### Spacing Scale

Derived from the design token system. Always use these values, never arbitrary px:

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight inner spacing |
| `--space-2` | 8px | Compact gaps |
| `--space-3` | 12px | Default inner padding |
| `--space-4` | 16px | Card padding, standard gaps |
| `--space-5` | 24px | Section inner spacing |
| `--space-6` | 32px | Section gaps |
| `--space-7` | 48px | Major section breaks |
| `--space-8` | 64px | Page-level vertical rhythm |

### Breakpoints

Mobile-first. Apply styles at min-width:

| Name | Min-Width | Target |
|------|-----------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Container Queries

Component-level responsiveness. Preferred over media queries for reusable components:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { grid-template-columns: 200px 1fr; }
}
```

## Workflow

### 1. Page Layout

```css
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 var(--space-5);
}
```

### 2. Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  gap: var(--space-5);
}

/* Tighter on mobile */
@media (max-width: 768px) {
  .card-grid { gap: var(--space-4); }
}
```

### 3. Section Spacing

Vertical rhythm between major sections: `--space-8` (64px) default, `--space-7` (48px) for compact, `--space-6` (32px) for tight.

### 4. Flex Utilities

```css
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-stack { display: flex; flex-direction: column; gap: var(--space-4); }
```

## Quality Checklist

- [ ] No hardcoded spacing values (all from token scale)
- [ ] Mobile-first breakpoint application
- [ ] No horizontal overflow on any viewport
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Container queries used for component responsiveness
- [ ] Grid uses `auto-fill` or `auto-fit` for dynamic item counts
- [ ] Proper vertical rhythm (consistent section spacing)

## Related Skills

- `pd-design-tokens` — spacing and breakpoint token definitions
- `pd-responsive` — responsive behavior patterns
- `pd-component-recipes` — components that consume layout patterns
- `pd-accessibility` — focus order and reading flow
