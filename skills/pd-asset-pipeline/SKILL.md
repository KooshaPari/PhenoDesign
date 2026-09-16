---
name: pd-asset-pipeline
description: "Asset optimization, format selection, CDN delivery, lazy loading, and image/video/audio pipeline for Phenotype projects."
license: MIT
---

# Asset Pipeline

Use this skill when adding, optimizing, or delivering media assets (images, videos, 3D models, fonts, audio) in Phenotype projects. Ensures fast load times and correct rendering across devices.

## When to Use

- Adding images, videos, or 3D models to pages
- Optimizing asset file sizes for web delivery
- Setting up lazy loading and responsive images
- Choosing correct formats (WebP, AVIF, GLB, MP4)
- Debugging slow page loads caused by heavy assets

## Format Selection

| Asset Type | Preferred Format | Fallback | Max Size |
|------------|-----------------|----------|----------|
| Photos | WebP | JPEG | 200KB |
| Illustrations | SVG | PNG | 50KB |
| Icons | SVG | — | 5KB |
| 3D Models | GLB | — | 5MB |
| Video | MP4 (H.264) | WebM | 10MB |
| Fonts | WOFF2 | WOFF | 100KB |

## Workflow

### 1. Responsive Images

```html
<picture>
  <source srcset="/images/project.avif" type="image/avif">
  <source srcset="/images/project.webp" type="image/webp">
  <img
    src="/images/project.jpg"
    alt="WITF keyboard on wooden desk"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

### 2. Lazy Loading

Native lazy loading for images and iframes:

```html
<img src="photo.webp" loading="lazy" decoding="async" alt="...">
<iframe src="..." loading="lazy" title="..."></iframe>
```

IntersectionObserver for custom lazy loading (3D models, heavy components):

```ts
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadModel(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' }); // start loading 200px before visible

observer.observe(document.getElementById('model-container'));
```

### 3. CDN Delivery

For Vercel deployment, assets in `/public/` are automatically served from CDN with immutable caching:

```
public/
  images/       → kooshapari.com/images/*
  models/       → kooshapari.com/models/*
  fonts/        → kooshapari.com/fonts/*
```

Add cache headers in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}
```

### 4. Image Optimization Script

```bash
# Convert to WebP
npx sharp-cli -i input.jpg -o output.webp --format webp --quality 80

# Generate AVIF
npx sharp-cli -i input.jpg -o output.avif --format avif --quality 70

# Resize for responsive
npx sharp-cli -i input.jpg -o output-800.webp --format webp --width 800
```

### 5. Font Loading

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: swap; /* show fallback until load */
}
```

## Quality Checklist

- [ ] All images have explicit `width` and `height` (prevents layout shift)
- [ ] Lazy loading on below-fold images
- [ ] WebP/AVIF served with JPEG/PNG fallback
- [ ] SVG used for icons and illustrations (not rasterized)
- [ ] 3D models < 5MB, ideally < 2MB
- [ ] Fonts use `font-display: swap`
- [ ] No render-blocking assets above the fold
- [ ] Alt text on all meaningful images

## Related Skills

- `pd-3d-viewers` — GLB model loading and display
- `pd-responsive` — responsive image sizing
- `pd-accessibility` — alt text, captions, ARIA
- `pd-layout-system` — image grid layouts
