---
name: pd-responsive
description: "Mobile-first responsive design, breakpoint system, container queries, and touch target patterns for Phenotype projects."
license: MIT
---

# Responsive Design

Use this skill when building or auditing responsive behavior in Phenotype projects. Covers the mobile-first breakpoint system, container queries, touch targets, and viewport-specific optimizations.

## When to Use

- Building components that adapt across viewports
- Setting up responsive typography and spacing
- Configuring container queries for component-level responsiveness
- Ensuring touch targets are large enough on mobile
- Debugging layout issues at specific breakpoints

## Breakpoint System

Mobile-first (min-width). Always apply base styles for mobile, then enhance at larger viewports:

| Name | Min-Width | Columns | Gutter | Target |
|------|-----------|---------|--------|--------|
| default | 0px | 1 | 16px | Phones |
| `sm` | 640px | 2 | 16px | Large phones |
| `md` | 768px | 4 | 24px | Tablets |
| `lg` | 1024px | 8 | 24px | Small laptops |
| `xl` | 1280px | 12 | 32px | Desktops |
| `2xl` | 1536px | 12 | 32px | Large screens |

## Workflow

### 1. Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); gap: var(--space-5); }
}
```

### 2. Responsive Typography

Use `clamp()` for fluid scaling between breakpoints:

```css
.heading-1 {
  font-size: clamp(1.75rem, 4vw, 3.5rem);
  line-height: 1.1;
}

.heading-2 {
  font-size: clamp(1.25rem, 3vw, 2rem);
  line-height: 1.2;
}

.body {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  line-height: 1.6;
}
```

### 3. Container Queries (Preferred)

For component-level responsiveness. Better than media queries for reusable components:

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Stack media on narrow containers */
@container card (max-width: 399px) {
  .card { flex-direction: column; }
}

/* Side-by-side on wider containers */
@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### 4. Touch Targets

All interactive elements must be at least 44x44px on touch devices:

```css
/* Ensure minimum touch target */
.interactive {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-3); /* expand hit area */
}

/* On mobile, make links/buttons larger */
@media (pointer: coarse) {
  .nav-link {
    padding: var(--space-3) var(--space-4);
    min-height: 48px;
  }
}
```

### 5. Viewport-Specific Patterns

```css
/* Hide on mobile */
@media (max-width: 767px) { .desktop-only { display: none; } }

/* Hide on desktop */
@media (min-width: 768px) { .mobile-only { display: none; } }

/* Full-width on mobile, contained on desktop */
@media (max-width: 767px) {
  .content { margin: 0 calc(-1 * var(--space-5)); }
}

/* Sidebar layout on desktop, stacked on mobile */
.layout {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .layout {
    flex-direction: row;
    gap: var(--space-6);
  }
  .sidebar { width: 280px; flex-shrink: 0; }
  .main { flex: 1; }
}
```

### 6. Responsive Images

```css
.hero-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}

@media (min-width: 1024px) {
  .hero-image {
    aspect-ratio: 21/9; /* wider on desktop */
    border-radius: var(--radius-lg);
  }
}
```

## Quality Checklist

- [ ] Mobile-first: base styles = mobile, media queries enhance up
- [ ] Touch targets >= 44x44px on all interactive elements
- [ ] Container queries used for reusable components
- [ ] Fluid typography via `clamp()`
- [ ] No horizontal overflow at any viewport
- [ ] Images responsive (max-width: 100%, explicit dimensions)
- [ ] Test at: 375px, 768px, 1024px, 1440px minimum
- [ ] Reduced motion respected at all breakpoints

## Testing Viewports

Test at these standard widths:

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375px | 667px |
| iPhone 14 | 390px | 844px |
| iPad | 768px | 1024px |
| MacBook Air | 1280px | 800px |
| Desktop | 1440px | 900px |
| Ultrawide | 1920px | 1080px |

## Related Skills

- `pd-layout-system` — grid and spacing system
- `pd-design-tokens` — breakpoint and spacing tokens
- `pd-accessibility` — touch targets and focus order
- `pd-component-recipes` — responsive component patterns
