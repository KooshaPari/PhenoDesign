---
name: pd-accessibility
description: "WCAG 2.2 AA compliance, reduced-motion support, screen reader patterns, and focus management for Phenotype projects."
license: MIT
---

# Accessibility

Use this skill when building or auditing Phenotype components for accessibility. Covers WCAG 2.2 Level AA requirements, with patterns for motion preferences, screen readers, keyboard navigation, and focus management.

## When to Use

- Building new components (apply a11y from the start)
- Auditing existing pages for WCAG 2.2 AA compliance
- Adding keyboard navigation to interactive elements
- Implementing reduced-motion support
- Setting up focus trapping for modals/lightboxes
- Adding ARIA labels and roles

## Core Requirements (WCAG 2.2 AA)

### Color and Contrast

| Element | Minimum Ratio | Check |
|---------|--------------|-------|
| Normal text (< 18pt) | 4.5:1 | `meetsWCAG()` from design-utils |
| Large text (>= 18pt) | 3:1 | `meetsWCAG()` from design-utils |
| UI components | 3:1 | Against adjacent colors |
| Focus indicators | 3:1 | Against background |

```ts
import { contrastRatio, meetsWCAG } from '@<REDACTED>/phenotype-design-utils/color';

const ratio = contrastRatio('#F6F5F5', '#353A40');
console.log(ratio); // 10.4:1 — passes AA
meetsWCAG('#F6F5F5', '#353A40', 'AA'); // true
```

### Motion Preferences

Every animation MUST check `prefers-reduced-motion`:

```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReduced) {
  // animate
} else {
  // show final state immediately
}
```

CSS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Keyboard Navigation

All interactive elements must be:
1. Focusable (use `<button>` or `tabindex="0"`)
2. Operable with Enter/Space
3. Have visible focus indicator
4. Logical tab order (match visual order)

```css
:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### Focus Trapping (Modals, Lightboxes)

```ts
function trapFocus(container: HTMLElement) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0] as HTMLElement;
  const last = focusable[focusable.length - 1] as HTMLElement;

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  first.focus();
}
```

### Screen Reader Patterns

```html
<!-- Decorative image: hide from SR -->
<img src="bg.svg" alt="" aria-hidden="true">

<!-- Meaningful image -->
<img src="chart.png" alt="Growth chart showing 3x increase over 6 months">

<!-- Icon button -->
<button aria-label="Close lightbox">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<!-- Live region for dynamic updates -->
<div aria-live="polite" aria-atomic="true">
  <!-- Update this content for SR announcements -->
</div>

<!-- SVG diagram -->
<svg role="img" aria-labelledby="diagram-title">
  <title id="diagram-title">System architecture diagram</title>
  <!-- diagram content -->
</svg>
```

## Audit Checklist

- [ ] All text meets contrast ratios (4.5:1 normal, 3:1 large)
- [ ] All interactive elements are keyboard accessible
- [ ] Visible focus indicator on all focusable elements
- [ ] `prefers-reduced-motion` checked before all animations
- [ ] All images have appropriate alt text
- [ ] Icon buttons have `aria-label`
- [ ] Dynamic content uses `aria-live`
- [ ] SVG diagrams have `<title>` and `role="img"`
- [ ] Focus trapped in modals/lightboxes
- [ ] Tab order matches visual order
- [ ] No keyboard traps (user can always Tab out)
- [ ] Skip-to-content link present

## Common Patterns

### Skip to Content

```html
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### Visually Hidden (SR Only)

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Related Skills

- `pd-design-tokens` — contrast ratio helpers
- `pd-interaction-patterns` — motion preferences built in
- `pd-component-recipes` — ARIA patterns for cards/diagrams
- `pd-3d-viewers` — keyboard interaction for 3D viewers
