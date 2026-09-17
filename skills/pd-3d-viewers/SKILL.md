---
name: pd-3d-viewers
description: "Embed Three.js GLB model viewers with orbit controls, product lighting presets, and SPA-safe cleanup."
license: MIT
---

# 3D Viewers

Use this skill when embedding interactive 3D model viewers in Phenotype projects. Built on Three.js with orbit controls, auto-rotate, and product photography lighting presets.

## When to Use

- Displaying physical product models (keyboards, hardware, sculptures)
- Creating interactive 3D showcases for physical computing projects
- Building product photography views with consistent lighting
- Adding orbit-controlled model inspection to case studies

## Requirements

- `three` (>=0.160.0) as peer dependency
- Three.js available via import map or bundler
- GLB format models (binary glTF)

## Available Modules

| Module | Purpose |
|--------|---------|
| `glb-viewer` | Core viewer with orbit, auto-rotate, lighting |
| `lighting-presets` | Product photography lighting setups |

## Lighting Presets

| Preset | Mood | Best For |
|--------|------|----------|
| `studio` | Clean, neutral | Default product shots |
| `dramatic` | High contrast, moody | Artistic showcase |
| `flat` | Even, minimal shadow | Technical documentation |
| `outdoor` | Warm, directional | Natural/handmade items |

## Workflow

### 1. Install

```bash
npm install @<REDACTED>/phenotype-3d-viewers three
```

### 2. Add Import Map (if no bundler)

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
  }
}
</script>
```

### 3. Mount Viewer

```ts
import { createGLBViewer } from '@<REDACTED>/phenotype-3d-viewers/glb-viewer';
import { lightingPresets } from '@<REDACTED>/phenotype-3d-viewers/lighting-presets';

const viewer = createGLBViewer({
  container: '#model-viewer',
  model: '/models/witf-keyboard.glb',
  poster: '/images/witf-poster.jpg',   // shown while loading + fallback
  lighting: lightingPresets.studio,
  autoRotate: true,
  autoRotateSpeed: 2,
  enableOrbit: true,
  backgroundColor: '#0F1012'           // obsidian seed
});

// Cleanup on route change (SPA)
function onNavigate() {
  viewer.dispose();
}
```

### 4. Responsive Sizing

```css
.viewer-container {
  width: 100%;
  aspect-ratio: 16/9;    /* or 1/1 for square */
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* Smaller on mobile */
@media (max-width: 768px) {
  .viewer-container { aspect-ratio: 4/3; }
}
```

### 5. Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- Auto-rotate disabled
- Orbit still works (user-initiated)
- No entrance animation
- Poster shown until user interacts

## Quality Checklist

- [ ] Poster image provided (fallback + loading state)
- [ ] Background color matches page (`#0F1012` default)
- [ ] Orbit controls enabled for inspection
- [ ] Auto-rotate paused on user interaction
- [ ] `dispose()` called on SPA navigation
- [ ] Canvas does not trap keyboard focus
- [ ] Works without WebGL (shows poster gracefully)
- [ ] Model file size reasonable (< 5MB for web)

## Related Skills

- `pd-component-recipes` — physical-plate recipe uses 3D viewer
- `pd-interaction-patterns` — perspective tilt for non-3D cards
- `pd-accessibility` — reduced motion, keyboard interaction
- `pd-responsive` — viewer sizing across viewports
