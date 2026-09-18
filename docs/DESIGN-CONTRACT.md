# Phenotype Design Contract

This contract defines the binding rules for all visual and interaction work across the Phenotype ecosystem. Every agent, designer, and contributor must follow this contract.

## 1. Token Authority

All colors, typography, spacing, and motion values MUST come from `@kooshapari/phenotype-design-tokens`. No exceptions.

### Seed Colors (Immutable)

These four colors are the root of the entire palette. They cannot be changed, only extended through:

| Seed | Hex | Usage |
|------|-----|-------|
| `--seed-obsidian` | `#0F1012` | Backgrounds, dark surfaces |
| `--seed-slate` | `#353A40` | Borders, secondary text, structure |
| `--seed-ceramic` | `#F6F5F5` | Primary text, light surfaces |
| `--seed-teal` | `#7EBAB5` | Accent, signal, interactive |

### Forbidden

- No hardcoded hex values in component CSS
- No `rgb()`, `hsl()`, or `rgba()` without going through the token system
- No font-family declarations outside the token system
- No arbitrary spacing values (must come from `--space-*` scale)

## 2. Component Recipe Usage

When building visual components that match a Phenotype recipe pattern, you MUST use the recipe instead of building from scratch.

| Pattern | Recipe | When to Use |
|---------|--------|-------------|
| Project card | `artifact-card` | Any card displaying a project, artifact, or work item |
| System diagram | `system-diagram` | Any SVG diagram with nodes and edges |
| Badge/pill | `badge` | Any category or status indicator |
| Physical product | `physical-plate` | Any card showing a physical artifact with image/3D |
| Data table | `experiment-sheet` | Any table with numbered rows and accent styling |
| Evidence callout | `evidence` | Any annotation or metric display |

### Recipe Extension

To customize a recipe:
1. Use the recipe's configuration parameters first
2. If parameters are insufficient, extend via CSS (add a wrapper class)
3. Only create new components if the recipe truly doesn't fit
4. Document why the recipe was insufficient

## 3. Interaction Pattern Rules

Every motion effect MUST:
- Check `prefers-reduced-motion` before animating
- Provide a static fallback for reduced-motion users
- Clean up event listeners on SPA navigation
- Use `transform` and `opacity` only (no layout-triggering properties)

### Approved Patterns

| Pattern | Package | Use When |
|---------|---------|----------|
| Perspective tilt | `pd-interaction-patterns` | Card hover/pointer interaction |
| Scroll reveal | `pd-interaction-patterns` | Content entering viewport |
| Lightbox | `pd-interaction-patterns` | Image gallery zoom |
| Parallax depth | `pd-interaction-patterns` | Hero sections, depth layers |
| Counter animate | `pd-interaction-patterns` | Statistics, metrics |

### Forbidden Motion

- No `scroll-behavior: smooth` without reduced-motion check
- No infinite CSS animations (except loading spinners)
- No parallax that causes content to be hidden off-screen
- No entrance animations that block content visibility

## 4. Accessibility Requirements

### WCAG 2.2 Level AA (Mandatory)

- Text contrast: 4.5:1 minimum (normal), 3:1 (large text)
- Interactive elements: 44x44px minimum touch target
- All interactive elements keyboard-accessible
- Visible focus indicator on all focusable elements
- All images have alt text (decorative: `alt=""` + `aria-hidden="true"`)
- SVG diagrams have `<title>` and `role="img"`
- Modals/lightboxes trap focus
- Dynamic content uses `aria-live` regions

### Testing

Before any visual work is considered complete:
- [ ] Run Lighthouse accessibility audit (target: 100)
- [ ] Test keyboard navigation through all interactive elements
- [ ] Verify with `prefers-reduced-motion: reduce` enabled
- [ ] Check contrast ratios with `meetsWCAG()` from design-utils

## 5. Responsive Requirements

### Mobile-First

- Base styles target phones (375px+)
- Enhance at breakpoints: sm(640), md(768), lg(1024), xl(1280)
- Container queries preferred over media queries for components

### Viewport Testing

Minimum test matrix:
- 375px (iPhone SE)
- 768px (iPad)
- 1024px (MacBook Air)
- 1440px (Desktop)

### No Horizontal Overflow

At no viewport width should horizontal overflow occur. If content is too wide, use `overflow-x: auto` on the container.

## 6. 3D Viewer Requirements

When embedding 3D models:
- Must provide poster image (loading + fallback state)
- Background color must be `#0F1012` (obsidian seed)
- Auto-rotate must pause on user interaction
- Must call `dispose()` on SPA navigation
- Canvas must not trap keyboard focus
- Model file < 5MB (ideally < 2MB)

## 7. Asset Pipeline Rules

- Images: WebP with JPEG fallback, explicit width/height
- Icons/illustrations: SVG preferred
- Fonts: WOFF2 with `font-display: swap`
- Lazy loading on all below-fold assets
- No render-blocking resources above the fold

## 8. Quality Standards

### Code Quality
- All CSS uses design tokens (no hardcoded values)
- TypeScript types on all recipe/pattern parameters
- No `any` types in public APIs
- All packages publish with ESM + CJS

### Visual Quality
- Consistent vertical rhythm (section spacing from `--space-*`)
- Family-tinted accent colors on all cards/badges
- Proper depth hierarchy (obsidian > slate > ceramic)
- Teal used sparingly for signal/interactive only

### Performance
- No layout shift from lazy-loaded images (explicit dimensions)
- All animations on compositor thread (transform/opacity only)
- 3D models load progressively (poster -> model)
- Font loading doesn't block text render
