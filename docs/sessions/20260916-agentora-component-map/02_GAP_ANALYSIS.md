# Agentora ↔ phenoDesign Gap Analysis

**Date:** 2026-09-16
**Status:** Ready for implementation

---

## Summary

| Category | Count | Action |
|----------|-------|--------|
| Direct match (no work) | 12 | Document |
| Token migration | 8 | Quick win |
| Component migration | 6 | Medium effort |
| New recipes needed | 7 | Build in phenoDesign |
| TUI-only (no web equivalent) | 11 | Token sync only |

---

## Quick Wins (Token Migration)

Replace hardcoded CSS values with phenoDesign token imports.

### VitePress Theme (`custom.css`)
- [ ] Replace `#7ebab5` → `arch.500` token
- [ ] Replace `#6aa8a3` → `arch.600` token
- [ ] Replace `#569691` → `arch.700` token
- [ ] Replace `#95ccc8` → `arch.400` token
- [ ] Replace `#353a40` → `slate.700` token
- [ ] Replace `#090a0c` → `surface.dark` token
- [ ] Replace `#f8f9fa` → `surface.light` token
- [ ] Replace `#f6f5f5` → `surface.text` token

### Error Pages (inline CSS)
- [ ] Extract inline styles to phenoDesign token variables
- [ ] Replace font stack with `fontFamily.sans` + `mono`
- [ ] Replace gradient colors with seed color references

**Effort:** 30m | **Impact:** Consistent color language across all surfaces

---

## Component Migration (Medium Effort)

### VitePress → phenoDesign Components
| Current | Replace With | Files |
|---------|-------------|-------|
| `.layer-badge` CSS | `createBadge({ family })` | 3 custom.css files |
| `.status-badge` CSS | `createStatusBadge(status)` | 3 custom.css files |
| `.doc-type-card` CSS | `createArtifactCard()` | 3 custom.css files |

**Effort:** 1h | **Impact:** Single source of truth for badge/card components

### Error Pages → phenoDesign Recipe
| Current | Replace With | New File |
|---------|-------------|----------|
| 9 standalone error HTML pages | `createErrorPage({ code, title, message })` | `component-recipes/src/error-page.ts` |

**Effort:** 1h | **Impact:** Consistent error pages across all Agentora services

---

## New Recipes Needed

These components don't exist in phenoDesign yet but are used across Agentora.

### 1. `createErrorPage` (High Priority)
Standardized error page with gradient background, glassmorphism card, and status-specific theming.
- Replaces 9+ inline HTML error pages
- Supports 403/404/500/502/503 status codes
- Includes loading, maintenance, and dashboard variants

### 2. `createToast` (Medium Priority)
Notification popup component for real-time alerts.
- Maps to TUI `NotificationToast` concept
- Supports success/error/warning/info variants
- Auto-dismiss with configurable duration

### 3. `createActionMenu` (Medium Priority)
Command palette / action list component.
- Maps to TUI `ActionMenu` concept
- Keyboard-navigable
- Search/filter support

### 4. `createDataGrid` (Low Priority)
Tabular data display with sorting and filtering.
- Maps to TUI `DataGrid` concept
- Responsive column layout
- Row selection support

### 5. `createGlassPanel` Utility (Low Priority)
Glassmorphism helper for backdrop-filter + rgba backgrounds.
- Extracts pattern from error pages
- Reusable across all surfaces

### 6. `createGradientPresets` (Low Priority)
Predefined gradient backgrounds for status/error types.
- Error: red gradient (5xx)
- Warning: orange gradient (4xx)
- Success: green gradient (2xx)
- Info: blue gradient (loading)

### 7. `createCategorySwitcher` (Low Priority)
Filterable category selector component.
- Maps to VitePress `.category-switcher`
- Supports multi-select

---

## TUI Token Sync (Conceptual)

The 11 TUI components can't share web code, but should share design language.

### Color Mapping
| TUI State | Current Color | phenoDesign Seed | hex |
|-----------|--------------|-----------------|-----|
| online/success | green | `forest.500` | #22c55e |
| offline/error | red | `ember.500` | #ef4444 |
| warning | yellow | `sun.500` | #eab308 |
| loading | blue | `sky.500` | #0ea5e9 |
| unknown/dim | dim | `slate.500` | #64748b |

### Recommended: `tui-tokens.ts`
Create a TUI-specific token file in design-tokens that maps terminal colors to phenoDesign seeds:
```ts
export const TUI_TOKENS = {
  online: seeds.forest[500],    // green
  offline: seeds.ember[500],    // red
  warning: seeds.sun[500],      // yellow
  loading: seeds.sky[500],      // blue
  unknown: seeds.slate[500],    // dim
} as const;
```

**Effort:** 30m | **Impact:** Consistent color language between terminal and web

---

## Implementation Order

1. **Token migration** (30m) — Replace hardcoded colors in VitePress + error pages
2. **`createErrorPage` recipe** (1h) — Replace 9+ inline error pages
3. **Badge/card migration** (1h) — Replace VitePress CSS with phenoDesign components
4. **`tui-tokens.ts`** (30m) — Terminal color mapping
5. **`createToast` recipe** (1h) — Notification component
6. **`createActionMenu` recipe** (1h) — Command palette
7. **`createDataGrid` recipe** (1h) — Tabular data
8. **`createGlassPanel` utility** (30m) — Glassmorphism helper
9. **`createGradientPresets`** (30m) — Gradient definitions
10. **`createCategorySwitcher`** (1h) — Filter component

**Total estimated effort:** 7.5h
