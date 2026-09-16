# @kooshapari/phenotype-3d-viewers

Three.js GLB model viewer with orbit controls, auto-rotate, product lighting presets, and SPA-safe cleanup.
Falls back to a poster image when WebGL is unavailable or reduced motion is preferred.

## Requirements

- `three` (>=0.160.0) as a peer dependency
- Three.js must be available via import map or bundler

## Components

| Module | Description |
|--------|-------------|
| `glb-viewer` | GLB model viewer with orbit controls, auto-rotate, product lighting |
| `lighting-presets` | Product photography lighting setups: studio, dramatic, flat, outdoor |

## Usage

```ts
import { createGlbViewer } from '@kooshapari/phenotype-3d-viewers/glb-viewer';
import { LIGHTING_PRESETS } from '@kooshapari/phenotype-3d-viewers/lighting-presets';

const viewer = await createGlbViewer({
  containerId: 'product-viewer',
  glbPath: '/models/product.glb',
  poster: { src: '/images/product-poster.webp', alt: 'Product render' },
  background: 0x0F1012,
  lighting: LIGHTING_PRESETS.studio,
  autoRotate: true,
});

// Cleanup on SPA navigation
viewer.destroy();
```

## Lighting Presets

```ts
import { LIGHTING_PRESETS } from '@kooshapari/phenotype-3d-viewers/lighting-presets';

// Available presets:
LIGHTING_PRESETS.studio   // Clean product shot, neutral tones
LIGHTING_PRESETS.dramatic // High contrast, rim lighting
LIGHTING_PRESETS.flat     // Even, shadowless illumination
LIGHTING_PRESETS.outdoor  // Warm natural light simulation
```

## Conventions

- WebGL feature detection with poster fallback
- Respects `prefers-reduced-motion` (disables auto-rotate)
- Handles container resize via ResizeObserver
- Full cleanup (renderer, scene, controls, animation frames)
- Under 250 lines per file

## License

MIT
