# @<REDACTED>/phenotype-assets

Shared SVG icons, patterns, and badges for the Phenotype ecosystem. All assets use currentColor for theming and follow the token system.

## Installation

```bash
npm install @<REDACTED>/phenotype-assets
```

## Available Assets

### Icons (`icons/`)

| Icon | File | Usage |
|------|------|-------|
| Arrow Right | `arrow-right.svg` | Links, navigation |
| Arrow Down | `arrow-down.svg` | Expand, scroll |
| External Link | `external-link.svg` | External references |
| GitHub | `github.svg` | Repository links |
| Close | `close.svg` | Modal/lightbox dismiss |
| Menu | `menu.svg` | Mobile navigation |
| Chevron Right | `chevron-right.svg` | Breadcrumbs, lists |
| Search | `search.svg` | Search inputs |

### Patterns (`patterns/`)

| Pattern | File | Usage |
|---------|------|-------|
| Grid Dots | `grid-dots.svg` | Background texture |
| Diagonal Lines | `diagonal-lines.svg` | Section dividers |
| Noise Texture | `noise.svg` | Surface texture overlay |
| Wave Divider | `wave.svg` | Section transitions |

### Badges (`badges/`)

| Badge | File | Usage |
|-------|------|-------|
| Physical | `physical.svg` | Hardware/physical projects |
| Software | `software.svg` | Software/digital projects |
| Research | `research.svg` | Research/exploration |
| Shipped | `shipped.svg` | Completed/shipped work |
| In Progress | `in-progress.svg` | Active work |

## Usage

### Inline SVG (Recommended)

```html
<!-- Import as component -->
<img src="@<REDACTED>/phenotype-assets/icons/arrow-right.svg" alt="" aria-hidden="true">

<!-- Or use inline for theming -->
<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
```

### CSS Background Pattern

```css
.section {
  background-image: url('@<REDACTED>/phenotype-assets/patterns/grid-dots.svg');
  background-repeat: repeat;
  background-size: 24px 24px;
}
```

### Badge System

```html
<span class="badge badge--physical">
  <svg class="badge__icon" aria-hidden="true"><!-- physical icon --></svg>
  Physical
</span>
```

## Design Rules

- All icons: 24x24 viewBox, 2px stroke, no fill (outlined style)
- All patterns: seamless tile, use currentColor where possible
- All badges: consistent height (20px), pill shape, family-tinted background
- All SVGs: optimized (no comments, no editor metadata)
