# @<REDACTED>/phenotype-interaction-patterns

Reusable, accessible interaction patterns extracted from proven Phenotype implementations.
Each pattern respects `prefers-reduced-motion` and provides cleanup for SPA routing.

## Patterns

| Pattern | Description |
|---------|-------------|
| `perspective-tilt` | Pointer-driven 2.5D tilt with glare overlay |
| `scroll-reveal` | IntersectionObserver-based reveal animations |
| `lightbox` | Image lightbox with keyboard nav, zoom, swipe |
| `counter-animate` | Number counter animation on scroll into view |
| `parallax-depth` | Subtle parallax depth effect on scroll |

## Usage

```ts
import { initPerspectiveTilt } from '@<REDACTED>/phenotype-interaction-patterns/perspective-tilt';
import { initScrollReveal } from '@<REDACTED>/phenotype-interaction-patterns/scroll-reveal';

// Initialize on page load
const tilt = initPerspectiveTilt();
const reveal = initScrollReveal();

// Cleanup on SPA navigation
tilt.disconnect();
reveal.disconnect();
```

## Data Attributes

### perspective-tilt
- `data-tilt` - Enable tilt on element
- `data-tilt-max` - Max angle in degrees (default: 12)
- `data-tilt-glare` - Enable glare (default: false)
- `data-tilt-scale` - Scale on hover (default: 1.02)
- `data-tilt-speed` - Transition speed in ms (default: 400)

### scroll-reveal
- `data-reveal` - Reveal type: `up`, `fade`, `scale`, `clip`
- `data-reveal-delay` - Delay in ms before animation
- `data-reveal-duration` - Animation duration in ms

### counter-animate
- `data-counter` - Target number to animate to
- `data-counter-duration` - Animation duration in ms (default: 1500)
- `data-counter-prefix` - Prefix string (e.g. "$")
- `data-counter-suffix` - Suffix string (e.g. "%")

## Conventions

- All patterns check `prefers-reduced-motion` and disable when active
- All return a cleanup/disconnect function for SPA routing
- Pure browser APIs, no dependencies
- Under 250 lines per file

## License

MIT
