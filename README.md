# phenoDesign

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/KooshaPari/phenoDesign/badge)](https://securityscorecards.dev/viewer/?uri=github.com/KooshaPari/phenoDesign)
[![CII Best Practices](https://www.bestpractices.dev/projects/11736/badge)](https://www.bestpractices.dev/projects/11736)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AI-DD-Slop](https://img.shields.io/badge/AI--DD--Slop%20Expected-orange?style=flat-square)]

## Description

Design system for all Phenotype surfaces. It publishes `@phenotype/design`: the keycap palette, VitePress theme, glass recipes, and style guide, shipped as CSS, TypeScript, and W3C DTCG JSON tokens. This repo is the creativity/design/UX spine (LIVE since un-archival 2026-06-08; absorption reversal 2026-07-20); primary consumers install from this repo, not from phenodocs mirrors. Design-tokens-to-code rendering lives in the separate `kooshapari/asset-engine`.

## Quick Start

### Install

```bash
bun install
# or npm install
```

### Build

```bash
# Build the design system package
bun run build

# Build packages (workspace)
bun run build:packages

# Dev mode (VitePress)
bun run dev

# Build docs
bun run docs:build

# Preview docs
bun run docs:preview
```

### Type Check

```bash
bun run typecheck
```

### Lint

```bash
bun run lint
```

### Test

```bash
bun run test       # vitest
bun run test:visual  # playwright test
bun run test:visual:update  # update snapshots
bun run test:deno  # deno test -A docs/tests
```

## Package: `@phenotype/design`

Exports:

| Path | Description |
|------|-------------|
| `./css/keycap-palette.css` | Keycap color palette (teal accent `#7ebab5`, slate `#353a40`) |
| `./css/vitepress-theme.css` | VitePress theme styling |
| `./css/components.css` | Component base styles |
| `./css/glass.css` | Glass morphism styles |
| `./tokens/keycap.json` | JSON design tokens |
| `./dist/` | Compiled JS and type definitions |
| `./docs/guide/glass-recipe.md` | Glass recipe documentation |

## GitHub

- **GitHub:** [KooshaPari/phenoDesign](https://github.com/KooshaPari/phenoDesign)
- **Topics:** design, docs, maintained, meta
- **License:** MIT
- **Language:** TypeScript + Rust
- **Package:** `@phenotype/design` (NPM)

## Status & Authority

| Document | Posture | Notes |
|----------|---------|-------|
| `ARCHIVED.md` | **LIVE** — creativity/design/UX spine, un-archived 2026-06-08, absorption reversed 2026-07-20 | Per `DECLARE_SPINE` registry entry |
| `STATUS.md` | Un-archived 2026-06-08; package name corrected to `@phenotype/design` | Last-updated 2026-06-08 |
| `PLAN.md` | Active; 4-phase token → components → VitePress → quality plan | Phase 1–3 work landed |

## Repository Structure

```
├── packages/                   # NPM workspace packages, all @kooshapari/phenotype-*
│   ├── design-tokens/          # Tailwind palette (sky #0ea5e9 vs teal #7ebab5)
│   ├── design-utils/           # Design utility functions
│   └── …                       # plus 3d-viewers, component-recipes,
│                               #      interaction-patterns, ui, vscode-extension
├── src/                        # Source code
├── css/                        # Design system CSS
├── tokens/                     # Design tokens (JSON, keycap palette)
├── engine/                     # Legacy compatibility pointer only
├── docs/                       # Design documentation (COST.md, DESIGN-CONTRACT.md, etc.)
├── vitest.config.ts            # Unit test config
├── playwright.config.ts        # Visual test config
├── package.json                # NPM workspace + @phenotype/design
├── tsconfig.json               # TypeScript config
├── bun.lock                    # Bun lockfile
└── ARCHIVED.md                # Archive history (2026-03-25 → 2026-07-20 reversal)
```