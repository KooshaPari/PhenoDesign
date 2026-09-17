# phenoDesign VS Code Extension

Design tokens, component recipes, and interaction patterns for the Phenotype ecosystem.

## Features

### Token Autocomplete
- CSS custom property completions for all phenoDesign tokens
- Triggers on `--` and `pd-` in CSS files
- Includes surface, color, spacing, radius, and font tokens

### Component Recipe Snippets
Type these prefixes in TypeScript files:

| Prefix | Description |
|--------|-------------|
| `pd-badge` | Create a badge component |
| `pd-status-badge` | Create a status badge |
| `pd-tech-badge` | Create a tech badge |
| `pd-artifact-card` | Create an artifact card |
| `pd-metric` | Create a metric callout |
| `pd-evidence` | Create an evidence label |
| `pd-scroll-reveal` | Initialize scroll reveal |
| `pd-lightbox` | Create a lightbox |
| `pd-counter` | Initialize counter animation |

### Design Token Snippets (CSS)
Type these prefixes in CSS files:

| Prefix | Description |
|--------|-------------|
| `pd-surface-dark` | Dark surface pattern |
| `pd-surface-light` | Light surface pattern |
| `pd-card` | Card pattern |
| `pd-gradient-arch` | Arch (teal) gradient |
| `pd-gradient-sky` | Sky gradient |
| `pd-glass` | Glassmorphism panel |
| `pd-font-sans` | Sans-serif font |
| `pd-font-mono` | Monospace font |

## Development

```bash
# Install dependencies
bun install

# Build extension
bun run build

# Watch mode
bun run watch

# Package for VS Code Marketplace
bun run package
```

## Installation

### From Source
1. Clone the phenoDesign repo
2. Run `bun install` in `packages/vscode-extension`
3. Open VS Code and run `Extension: Install from VSIX...`
4. Select the generated `.vsix` file

### From Marketplace
```bash
code --install-extension <REDACTED>.phenodesign
```
