# OMLX → phenoDesign Migration Guide

**Date:** 2026-09-16
**Status:** Audit complete (PDV-004)
**Scope:** All OMLX UI surfaces mapped to phenoDesign equivalents

---

## Executive Summary

OMLX has **3 UI surfaces** with **~80 visual components**. The research panel alone has 711 lines of CSS with 53 component classes. Most can be replaced with phenoDesign equivalents.

---

## 1. OMLX UI Surfaces

### Surface A: Research Panel (Admin Extensions)
- `gui/admin-extensions/static/css/research_panel.css` (711 lines)
- `gui/admin-extensions/templates/research_panel.html`
- Dark theme: charcoal backgrounds, cyan/teal accents

### Surface B: hwledger App (React)
- `perf-core/hwledger/apps/hwledger-app/src/`
- Components: VerdictStrip, Suites, Comparison, CellsTable, LangfusePanel, Overview, SuiteCoverage
- Dark theme: near-black backgrounds, blue accent

### Surface C: Model Explorer (Svelte)
- `perf-core/hwledger/apps/model-explorer/web/src/`
- Components: FacetSidebar, ResultRow, DiscoveryBar, PreviewPane
- Uses app.css for styling

---

## 2. Research Panel Component Map (53 classes)

### Direct phenoDesign Matches

| OMLX Class | phenoDesign Equivalent | Package | Migration |
|-----------|----------------------|---------|-----------|
| `.rp-badge` | `createBadge()` | component-recipes | Replace CSS |
| `.rp-badge--online` | `createStatusBadge('online')` | component-recipes | Replace CSS |
| `.rp-badge--offline` | `createStatusBadge('offline')` | component-recipes | Replace CSS |
| `.rp-card` | `createArtifactCard()` | component-recipes | Replace CSS |
| `.rp-card-header` | `createArtifactCard()` header | component-recipes | Replace CSS |
| `.rp-card-name` | `createArtifactCard()` title | component-recipes | Replace CSS |
| `.rp-card-meta` | `createArtifactCard()` metadata | component-recipes | Replace CSS |
| `.rp-tag` | `createTechBadge()` | component-recipes | Replace CSS |
| `.rp-tag--turboquant` | `createTechBadge('TurboQuant')` | component-recipes | Replace CSS |
| `.rp-tag--specdecode` | `createTechBadge('SpecDecode')` | component-recipes | Replace CSS |
| `.rp-tag--cuda` | `createTechBadge('CUDA')` | component-recipes | Replace CSS |
| `.rp-tag--metal` | `createTechBadge('Metal')` | component-recipes | Replace CSS |
| `.rp-cap` | `createBadge()` variant | component-recipes | Replace CSS |
| `.rp-agent-card` | `createArtifactCard()` | component-recipes | Replace CSS |
| `.rp-output-line--ok` | `createStatusBadge('success')` | component-recipes | Replace CSS |
| `.rp-output-line--error` | `createStatusBadge('error')` | component-recipes | Replace CSS |
| `.rp-output-line--info` | `createStatusBadge('info')` | component-recipes | Replace CSS |
| `.rp-spinner` | `initCounterAnimate()` visual | interaction-patterns | Replace CSS |
| `.rp-loading` | `initScrollReveal()` pattern | interaction-patterns | Replace CSS |
| `.rp-fade-in` | `initScrollReveal('fade')` | interaction-patterns | Replace CSS |
| `.rp-skeleton` | None (new recipe needed) | — | **Gap** |

### Token Migration (replace hardcoded values)

| OMLX Token | Value | phenoDesign Equivalent |
|-----------|-------|----------------------|
| `--rp-bg-base` | `#0d1117` | `surface.dark` |
| `--rp-bg-surface` | `#161b22` | `surface.card` |
| `--rp-bg-card` | `#1c2128` | `surface.elevated` |
| `--rp-border` | `#30363d` | `border.default` |
| `--rp-text-primary` | `#e6edf3` | `surface.text` |
| `--rp-text-secondary` | `#8b949e` | `surface.textMuted` |
| `--rp-accent-cyan` | `#79c0ff` | `sky.400` |
| `--rp-accent-teal` | `#56d4dd` | `arch.400` |
| `--rp-accent-green` | `#3fb950` | `forest.500` |
| `--rp-accent-orange` | `#d29922` | `sun.500` |
| `--rp-accent-red` | `#f85149` | `ember.500` |
| `--rp-accent-purple` | `#bc8cff` | `iris.400` |
| `--rp-radius-sm` | `4px` | `radius.sm` |
| `--rp-radius-md` | `8px` | `radius.md` |
| `--rp-radius-lg` | `12px` | `radius.lg` |
| `--rp-font` | system stack | `fontFamily.sans` |
| `--rp-font-code` | monospace | `fontFamily.mono` |

### OMLX-Specific (no direct equivalent)

| Class | Purpose | Recommendation |
|-------|---------|---------------|
| `.rp-container` | Root wrapper | Keep, add phenoDesign tokens |
| `.rp-section-heading` | Section headers | Keep, use phenoDesign type scale |
| `.rp-card-grid` | Card layout | Keep, use phenoDesign grid |
| `.rp-card-indicator` | Status dot | Replace with `createStatusBadge` |
| `.rp-config-grid` | Config layout | Keep, use phenoDesign grid |
| `.rp-config-item` | Config row | Keep, use phenoDesign tokens |
| `.rp-config-label` | Config label | Keep, use phenoDesign type scale |
| `.rp-config-value` | Config value | Keep, use phenoDesign mono font |
| `.rp-config-section` | Config group | Keep, use phenoDesign spacing |
| `.rp-btn` | Button base | Keep, use phenoDesign tokens |
| `.rp-btn--primary` | Primary button | Keep, use phenoDesign arch tokens |
| `.rp-btn--danger` | Danger button | Keep, use phenoDesign ember tokens |
| `.rp-btn--subtle` | Subtle button | Keep, use phenoDesign slate tokens |
| `.rp-btn--small` | Small button | Keep, use phenoDesign spacing |
| `.rp-agent-form` | Agent form | Keep, use phenoDesign tokens |
| `.rp-agent-description` | Agent desc | Keep, use phenoDesign type scale |
| `.rp-number-input` | Number input | Keep, use phenoDesign tokens |
| `.rp-slider` | Range slider | Keep, use phenoDesign tokens |
| `.rp-toggle` | Toggle switch | Keep, use phenoDesign tokens |
| `.rp-toggle-slider` | Toggle thumb | Keep, use phenoDesign tokens |
| `.rp-output-area` | Output container | Keep, use phenoDesign tokens |
| `.rp-output-line` | Output line | Keep, use phenoDesign mono font |
| `.rp-refresh-btn` | Refresh button | Keep, use phenoDesign tokens |
| `.rp-status-bar` | Status bar | Keep, use phenoDesign tokens |
| `.rp-icon` | Icon wrapper | Keep, use phenoDesign tokens |

---

## 3. hwledger App Component Map

| Component | phenoDesign Equivalent | Migration |
|-----------|----------------------|-----------|
| Sidebar | None (layout-specific) | Token sync only |
| VerdictStrip | `createBadge()` + `createStatusBadge()` | Replace |
| Suites | `createArtifactCard()` grid | Replace |
| Comparison | None (data-viz specific) | Token sync only |
| CellsTable | None (new recipe needed) | **Gap** |
| LangfusePanel | `createEvidencePanel()` | Replace |
| Overview | `createMetricCallout()` grid | Replace |
| SuiteCoverage | `createMetricCallout()` | Replace |

### hwledger Token Map

| hwledger Token | Value | phenoDesign Equivalent |
|---------------|-------|----------------------|
| `--bg` | `#0f0f0f` | `surface.dark` |
| `--bg-sidebar` | `#161616` | `surface.card` |
| `--bg-card` | `#1a1a1a` | `surface.elevated` |
| `--fg` | `#e0e0e0` | `surface.text` |
| `--fg-dim` | `#888` | `surface.textMuted` |
| `--accent` | `#3b82f6` | `sky.500` |
| `--green` | `#22c55e` | `forest.500` |
| `--red` | `#ef4444` | `ember.500` |
| `--yellow` | `#eab308` | `sun.500` |
| `--border` | `#2a2a2a` | `border.default` |

---

## 4. Model Explorer Component Map (Svelte)

| Component | phenoDesign Equivalent | Migration |
|-----------|----------------------|-----------|
| FacetSidebar | None (filter-specific) | Token sync only |
| ResultRow | `createArtifactCard()` variant | Replace |
| DiscoveryBar | None (search-specific) | Token sync only |
| PreviewPane | `createEvidencePanel()` | Replace |

---

## 5. Migration Priority

### Phase 1: Token Alignment (30m)
- Replace 17 OMLX tokens with phenoDesign equivalents in research_panel.css
- Replace 10 hwledger tokens with phenoDesign equivalents in App.css
- Replace model-explorer tokens in app.css

### Phase 2: Component Migration (2h)
- Replace 21 OMLX CSS classes with phenoDesign component calls
- Replace 6 hwledger components with phenoDesign equivalents
- Replace 2 model-explorer components

### Phase 3: New Recipes (1h)
- Add `createSkeleton` recipe (loading placeholder)
- Add `createDataTable` recipe (replaces CellsTable)

**Total estimated effort:** 3.5h

---

## 6. Files to Modify

### OMLX Repo
- `gui/admin-extensions/static/css/research_panel.css` (711 lines)
- `gui/admin-extensions/templates/research_panel.html`
- `perf-core/hwledger/apps/hwledger-app/src/App.css`
- `perf-core/hwledger/apps/hwledger-app/src/components/*.tsx` (7 files)
- `perf-core/hwledger/apps/model-explorer/web/src/app.css`
- `perf-core/hwledger/apps/model-explorer/web/src/components/*.svelte` (4 files)

### phenoDesign Repo (new recipes)
- `packages/component-recipes/src/skeleton.ts` (new)
- `packages/component-recipes/src/data-table.ts` (new)
