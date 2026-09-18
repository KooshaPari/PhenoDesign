# phenoDesign

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/KooshaPari/phenoDesign/badge)](https://securityscorecards.dev/viewer/?uri=github.com/KooshaPari/phenoDesign)
[![CII Best Practices](https://www.bestpractices.dev/projects/11736/badge)](https://www.bestpractices.dev/projects/11736)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![AI-DD-Slop](https://img.shields.io/badge/AI--DD--Slop%20Expected-orange?style=flat-square)]

## Description

Design system: tokens, components, and UX standards for all Phenotype surfaces. This repo is the creativity/design/UX spine (LIVE since un-archival 2026-06-08, absorption reversal 2026-07-20). It provides the `@phenotype/design` NPM package with keycap palette, VitePress theme, glass recipes, and style guide. Primary consumers should install from this repo, not from phenodocs mirrors. The asset-engine split (`kooshapari/asset-engine`) handles design-tokens-to-code rendering.

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
- **Description:** Design system: tokens, components, and UX standards for all Phenotype surfaces
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
| `README.md` (banner) | **STALE** — says ARCHIVED 2026-07-29, conflicts with live status | Fix: update banner to reflect LIVE status |

The README banner saying "ARCHIVED 2026-07-29" is stale: the audit's `ARCHIVED.md` records the 2026-07-17 archive + 2026-07-20 absorption reversal. All other authority documents and the live consumer base confirm LIVE status.

## Repository Structure

```
├── packages/                   # NPM workspace packages
│   ├── @phenotype/design-tokens  # Tailwind palette (sky #0ea5e9 vs teal #7ebab5)
│   └── design-utils            # Design utility functions
├── src/                        # Source code
├── css/                        # Design system CSS
├── tokens/                     # Design tokens (JSON, keycap palette)
├── engine/                     # Legacy compatibility pointer only
├── docs/                       # Design documentation (COST.md, DESIGN-CONTRACT.md, etc.)
├── vitest.config.ts            # Unit test config
├── playwright.config.ts        # Visual test config
├── package.json                # NPM workspace + @phenotype/design
├── tsconfig.json               # TypeScript config
├── bun.lockb                   # Bun lockfile
└── ARCHIVED.md                # Archive history (2026-03-25 → 2026-07-20 reversal)