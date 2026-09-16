---
name: pd-interaction-patterns
description: "Attach accessible interaction patterns (tilt, scroll reveal, lightbox, parallax) to Phenotype components."
license: MIT
---

# Interaction Patterns

Use this skill when adding motion, tilt, scroll-triggered animations, or interactive effects to Phenotype components. Every pattern respects `prefers-reduced-motion` and cleans up on SPA navigation.

## When to Use

- Adding perspective tilt to project cards
- Creating scroll-triggered reveal animations
- Building image lightbox with keyboard nav and zoom
- Adding parallax depth effects to sections
- Animating numbers/counters into view

## Available Patterns

| Pattern | Trigger | Motion | Reduced-Motion Fallback |
|---------|---------|--------|------------------------|
| `perspective-tilt` | Pointer move | 2.5D rotation + glare | Static, no tilt |
| `scroll-reveal` | IntersectionObserver | Clip-path / fade-in | Instant visible |
| `lightbox` | Click/tap | Zoom + overlay | Same zoom, no animation |
| `counter-animate` | Scroll into view | Number count-up | Static final value |
| `parallax-depth` | Scroll | Differential translate | Static position |

## Workflow

### 1. Install

```bash
npm install @kooshapari/phenotype-interaction-patterns
```

### 2. Initialize Patterns

```ts
import { initPerspectiveTilt } from '@kooshapari/phenotype-interaction-patterns/perspective-tilt';
import { initScrollReveal } from '@kooshapari/phenotype-interaction-patterns/scroll-reveal';

// Attach to elements
const cleanupTilt = initPerspectiveTilt('.project-card', {
  maxTilt: 8,        // degrees
  glareEnabled: true,
  scale: 1.02
});

const cleanupReveal = initScrollReveal('.reveal', {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});
```

### 3. SPA Cleanup

Critical for Next.js/Astro/SvelteKit. Call cleanup on route change:

```ts
// In your route change handler
function onRouteChange() {
  cleanupTilt();
  cleanupReveal();
  // Re-initialize for new page
  initPerspectiveTilt('.project-card');
  initScrollReveal('.reveal');
}
```

### 4. Staggered Reveals

```ts
// Cards enter sequentially
initScrollReveal('.card', {
  stagger: 100,      // ms between each card
  animation: 'slideUp',
  distance: 20        // px
});
```

### 5. Lightbox

```ts
import { initLightbox } from '@kooshapari/phenotype-interaction-patterns/lightbox';

const lightbox = initLightbox('.gallery-image', {
  zoom: true,
  swipe: true,
  keyboard: true      // arrow keys, escape
});
```

## Composition

Stack patterns for richer effects:

```ts
// Card with tilt + scroll reveal
initPerspectiveTilt('.hero-card', { maxTilt: 5 });
initScrollReveal('.hero-card', { animation: 'clipReveal' });

// Section with parallax + staggered child reveals
initParallaxDepth('.hero-section', { depth: 0.3 });
initScrollReveal('.hero-section .stat', { stagger: 150 });
```

## Quality Checklist

- [ ] All patterns check `prefers-reduced-motion` before animating
- [ ] Cleanup functions called on SPA route changes
- [ ] No layout shift during animation (use `transform` not `top/left`)
- [ ] Performance: animations use `will-change: transform` sparingly
- [ ] Touch devices: tilt uses deviceorientation, scroll uses native scroll
- [ ] Lightbox traps focus within overlay when open
- [ ] No animation on elements that are already visible on page load

## Related Skills

- `pd-component-recipes` — patterns attach to recipe output
- `pd-accessibility` — motion preferences and focus management
- `pd-responsive` — motion behavior across viewports
- `pd-design-tokens` — motion duration and easing tokens
