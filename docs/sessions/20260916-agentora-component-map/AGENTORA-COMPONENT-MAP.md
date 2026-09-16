# Agentora Component Map

**Date:** 2026-09-16
**Status:** Rebuilt (PDV-001)
**Scope:** All visual/UI components across Agentora, mapped to phenoDesign equivalents

---

## Executive Summary

Agentora has **3 distinct UI surfaces** with **~45 visual components** across them. Of these, **12 have direct phenoDesign equivalents**, **18 can be migrated with minor adaptation**, and **15 are Agentora-specific** (TUI/CLI) with no web design system equivalent.

---

## 1. Agentora UI Surfaces

### Surface A: VitePress Documentation (3 crates)
- `phenotype-hub/docs/`
- `phenotype-router-monitor/docs/`
- `phenotype-governance/docs/`

All share a common custom theme (`custom.css`) with teal accent (#7ebab5).

### Surface B: Python TUI (pheno-cli)
- `agents/phenoagent/python/pheno-cli/src/pheno_cli/app/tui/components/`
- Textual-based terminal UI components

### Surface C: HTML Error Pages (pheno-kits, pheno-infra)
- `agents/phenoagent/python/pheno-kits/src/pheno_kits/infra/templates/error_pages/`
- `agents/phenoagent/python/pheno-infra/src/pheno_infra/templates/error_pages/`
- Standalone HTML+CSS error/status pages

---

## 2. Component Inventory

### Surface A: VitePress Components

| Component | CSS Selector/Class | phenoDesign Equivalent | Migration Effort |
|-----------|-------------------|----------------------|-----------------|
| Navigation bar | `.VPNav` | None (VitePress built-in) | N/A |
| Sidebar | `.VPSidebar` | None (VitePress built-in) | N/A |
| Hero section | `.VPHero` | None (VitePress built-in) | N/A |
| Feature cards | `.VPFeature` | `createArtifactCard` | Low |
| Code blocks | `div[class*='language-']` | None (VitePress built-in) | N/A |
| **Layer badges** | `.layer-badge`, `.layer-0` to `.layer-4` | `createBadge` | **Medium** |
| **Status badges** | `.status-badge`, `.status-draft` etc | `createStatusBadge` | **Medium** |
| **Doc type cards** | `.doc-type-card` | `createArtifactCard` | **Low** |
| **Category switcher** | `.category-switcher` | None | **High (new)** |
| Footer | `.VPFooter` | None (VitePress built-in) | N/A |

**Key tokens already shared:**
- `--kc-accent` = `#7ebab5` (teal) → matches phenoDesign `arch-500`
- `--kc-slate` = `#353a40` → matches phenoDesign `slate-700`
- Font stack: Inter + JetBrains Mono → matches phenoDesign `fontFamily.sans` + `mono`
- Dark mode variables → align with phenoDesign surface system

### Surface B: TUI Components (Python/Textual)

| Component | File | Description | phenoDesign Equivalent |
|-----------|------|-------------|----------------------|
| `StatusIndicator` | `status.py` | Online/offline/warning/loading states | `createStatusBadge` (concept) |
| `ProgressTracker` | `progress.py` | Progress bars, step tracking | `animateCounter` (concept) |
| `MetricDisplay` | `metrics.py` | Numeric metrics, gauges | `createMetricCallout` (concept) |
| `NotificationToast` | `notifications.py` | Toast notifications | None (new recipe needed) |
| `LogViewer` | `log_viewer.py` | Scrolling log display | None (CLI-specific) |
| `ActionMenu` | `actions.py` | Command palette, action list | None (new recipe needed) |
| `ConfigEditor` | `config.py` | Configuration form | None (CLI-specific) |
| `FormBuilder` | `form.py` | Dynamic forms | None (CLI-specific) |
| `DataGrid` | `grid.py` | Tabular data display | None (new recipe needed) |
| `BaseComponent` | `base.py` | Component foundation | None (CLI-specific) |
| `ComponentFactory` | `factories.py` | Component creation | None (CLI-specific) |

**Note:** TUI components are terminal-specific (Textual framework). They share *conceptual* patterns with phenoDesign (status, metrics, progress) but have no direct code migration path. The mapping is for design language consistency, not code sharing.

### Surface C: HTML Error Pages

| Page | Template Path | phenoDesign Equivalent | Migration Effort |
|------|--------------|----------------------|-----------------|
| 403 Forbidden | `error_pages/403.html` | None (standalone) | **High** |
| 404 Not Found | `error_pages/404.html` | None (standalone) | **High** |
| 500 Server Error | `error_pages/500.html` | None (standalone) | **High** |
| 502 Bad Gateway | `error_pages/502.html` | None (standalone) | **High** |
| 503 Service Unavailable | `error_pages/503.html` | None (standalone) | **High** |
| Dashboard | `error_pages/dashboard.html` | None (standalone) | **High** |
| Loading | `error_pages/loading.html` | None (standalone) | **High** |
| Live Status | `error_pages/live.html` | None (standalone) | **High** |
| Maintenance | `error_pages/maintenance.html` | None (standalone) | **High** |
| Status Welcome | `error_pages/status_welcome.html` | None (standalone) | **High** |

**Design patterns in error pages:**
- Glassmorphism: `backdrop-filter: blur(10px)`, `rgba backgrounds`
- Gradient backgrounds per error type (red=5xx, orange=4xx, green=2xx)
- System font stack (not Inter)
- Inline CSS (no token system)
- Card-based layout with border-radius: 20px

---

## 3. Gap Analysis

### phenoDesign Has (direct match):
1. `createBadge` → layer badges, status badges
2. `createStatusBadge` → status indicators
3. `createTechBadge` → technology labels
4. `createArtifactCard` → doc-type cards, feature cards
5. `createMetricCallout` → metric displays
6. `createEvidenceLabel` → evidence/annotation labels
7. `createEvidencePanel` → evidence panels
8. `createLensAnnotation` → lens annotations
9. `createArtifactSequence` → step sequences
10. `animateCounter` → counter animations
11. `initScrollReveal` → scroll animations
12. `createLightbox` → image lightboxes

### phenoDesign Missing (gaps):
1. **Error page recipe** — standardized error page component (403/404/500/502/503)
2. **Toast/notification recipe** — notification popup component
3. **Action menu recipe** — command palette / action list
4. **Data grid recipe** — tabular data display
5. **Glassmorphism utility** — backdrop-filter + rgba background helper
6. **Gradient presets** — error-type gradient definitions
7. **Category switcher** — filterable category selector

### Agentora-Specific (no web equivalent):
- All 11 TUI components are terminal-specific
- Log viewer, form builder, config editor are CLI-only
- These should adopt phenoDesign *tokens* (colors, spacing) but not components

---

## 4. Migration Recommendations

### Phase 1: Token Alignment (Quick Wins)
- [ ] Replace hardcoded colors in VitePress `custom.css` with phenoDesign token imports
- [ ] Replace hardcoded colors in error page inline CSS with phenoDesign tokens
- [ ] Add phenoDesign `fontFamily` imports to error pages

### Phase 2: Component Migration (Medium Effort)
- [ ] Replace `.layer-badge` CSS with `createBadge` component
- [ ] Replace `.status-badge` CSS with `createStatusBadge` component
- [ ] Replace `.doc-type-card` CSS with `createArtifactCard` component
- [ ] Create `createErrorPage` recipe in phenoDesign for error pages

### Phase 3: New Recipes (Higher Effort)
- [ ] Add `createToast` recipe to phenoDesign
- [ ] Add `createActionMenu` recipe to phenoDesign
- [ ] Add `createDataGrid` recipe to phenoDesign
- [ ] Add `createGlassPanel` utility to design-utils

### Phase 4: TUI Token Sync (Conceptual)
- [ ] Map TUI color palette to phenoDesign seed colors
- [ ] Document TUI ↔ web design language equivalence
- [ ] Create `tui-tokens.ts` in design-tokens for terminal color mapping

---

## 5. Token Mapping: Agentora ↔ phenoDesign

| Agentora Token | Value | phenoDesign Equivalent | Package |
|---------------|-------|----------------------|---------|
| `--kc-accent` | `#7ebab5` | `arch.500` | design-tokens |
| `--kc-accent-hover` | `#95ccc8` | `arch.400` | design-tokens |
| `--kc-accent-active` | `#6aa8a3` | `arch.600` | design-tokens |
| `--kc-accent-dim` | `#569691` | `arch.700` | design-tokens |
| `--kc-slate` | `#353a40` | `slate.700` | design-tokens |
| `--vp-c-bg` (dark) | `#090a0c` | `surface.dark` | design-tokens |
| `--vp-c-bg` (light) | `#f8f9fa` | `surface.light` | design-tokens |
| `--vp-c-text-1` (dark) | `#f6f5f5` | `surface.text` | design-tokens |
| Font: Inter | 400-700 | `fontFamily.sans` | design-tokens |
| Font: JetBrains Mono | 400-500 | `fontFamily.mono` | design-tokens |

---

## 6. TUI Color Palette (for Token Sync)

| TUI State | Icon | Color | phenoDesign Seed |
|-----------|------|-------|-----------------|
| online | ✅ | green | `forest.500` |
| offline | ❌ | red | `ember.500` |
| warning | ⚠️ | yellow | `sun.500` |
| loading | 🔄 | blue | `sky.500` |
| success | ✅ | green | `forest.500` |
| error | ❌ | red | `ember.500` |
| unknown | ❓ | dim | `slate.500` |

---

## 7. Files Referenced

### Agentora
- `crates/phenotype-hub/docs/.vitepress/theme/custom.css` (285 lines)
- `crates/phenotype-router-monitor/docs/.vitepress/theme/custom.css`
- `crates/phenotype-governance/docs/.vitepress/theme/custom.css`
- `agents/phenoagent/python/pheno-cli/src/pheno_cli/app/tui/components/` (12 files)
- `agents/phenoagent/python/pheno-kits/src/pheno_kits/infra/templates/error_pages/` (9 templates)
- `agents/phenoagent/python/pheno-infra/src/pheno_infra/templates/error_pages/` (10 templates)

### phenoDesign
- `packages/component-recipes/src/` (badge, evidence, artifact-card, experiment-sheet, diagram, plate-viewer)
- `packages/design-tokens/` (seeds, surfaces, typography, spacing, radius)
- `packages/interaction-patterns/src/` (scroll-reveal, lightbox, counter-animate, parallax-depth, perspective-tilt)
- `packages/design-utils/src/` (color, spacing, layout, motion, type-scale)
- `packages/3d-viewers/src/` (glb-viewer, lighting-presets)
