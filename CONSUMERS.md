# phenoDesign — Consumer Map & Authority Chain

**Date:** 2026-09-08
**Scope:** Static evidence only — no authority transfer, no consumer migration.
**Provenance:** 2026-09-05 portfolio audit (chat1) breadth readiness slice R2/phenoDesign.

This document records **what currently consumes `@phenotype/design`** and **which document is authoritative** for the package's posture. It is intentionally narrow: it does **not** change authority, **not** retire any export, and **not** migrate any consumer. It exists so that future repair work has a single place to read the consumer graph before touching it.

---

## 1. Authority chain (current, observed 2026-09-08)

| Document | Posture | Notes |
|----------|---------|-------|
| `ARCHIVED.md` | **LIVE** — creativity/design/UX spine, un-archived 2026-06-08, absorption reversed 2026-07-20 | Per `DECLARE_SPINE` registry entry |
| `STATUS.md` | Un-archived 2026-06-08; package name corrected to `@phenotype/design` | Last-updated 2026-06-08 |
| `PLAN.md` | Active; 4-phase token → components → VitePress → quality plan | Phase 1–3 work landed |
| `README.md` (banner) | "ARCHIVED 2026-07-29" | **STALE** — conflicts with the three documents above and with the live consumer base below |
| `package.json` | `"name": "@phenotype/design"`, publishes `css/`, `dist/`, `tokens/`, `docs/guide/glass-recipe.md` | Real `npm publish` target |
| `package.json` (workspace) | `@kooshapari/phenotype-design-tokens` workspace subpackage, Tailwind preset now re-keyed to canonical (2026-10-17) | See §3 below |

### Open question for the owner (not resolved here)

The `README.md` banner says ARCHIVED while every other authority document (and the live consumer base below) says LIVE. The README banner appears to be **stale**: the audit's `ARCHIVED.md` records the 2026-07-17 archive + 2026-07-20 absorption reversal. **Fixing the README banner is an authority change and is out of scope for this static-evidence fix.** Recommended owner action: update `README.md` to reflect the canonical state per `ARCHIVED.md`, but only after the spine registry is consulted and the change is approved through the AgilePlus feature workflow.

---

## 2. Consumer map (current, observed 2026-09-08)

The following consumers were identified by static search across the Phenotype workspace for `@phenotype/design` in `package.json` files and `keycap-palette.css` / `vitepress-theme.css` / `glass.css` / `components.css` in CSS `@import` statements.

| Consumer | Pin | Use | Evidence |
|----------|-----|-----|----------|
| `phenodocs/phenodocs` (root) | `"@phenotype/design": "github:<REDACTED>/phenoDesign"` | VitePress root theme | `phenodocs/phenodocs/package.json:23` + `phenodocs/phenodocs/.vitepress/theme/custom.css` (imports `@phenotype/design/css/vitepress-theme.css`) |
| `phenodocs/phenodocs/packages/docs` | `"@phenotype/design": "github:<REDACTED>/phenoDesign"` | `@phenotype/docs` shared theme | `phenodocs/phenodocs/packages/docs/package.json:18` + `phenodocs/phenodocs/packages/docs/src/css/custom.css` (imports `@phenotype/design/css/vitepress-theme.css`) |
| `phenotype-registry/registry/disposition-index.json` | records `absorbed_package_identity: "@phenotype/design"` | Spine registry | Line 1939 |

### What those consumers actually import

`phenodocs/phenodocs` (both root and `packages/docs`) consumes the **CSS asset path only**:

```css
@import '@phenotype/design/css/vitepress-theme.css';
```

That asset path is declared in `package.json` exports as:

```json
"./css/vitepress-theme.css": "./css/vitepress-theme.css",
"./css/keycap-palette.css": "./css/keycap-palette.css",
"./css/components.css":    "./css/components.css",
"./css/glass.css":         "./css/glass.css"
```

No current consumer imports the TypeScript token bundle (`./tokens` or `.` exports). The TS contract is enforced by `tests/exports.test.ts` and `tests/tokens.test.ts`; the **CSS contract is what is exercised in production today**.

### Consumers found but NOT yet wired to `@phenotype/design`

The following workspaces ship `keycap-palette.css` / `vitepress-theme.css` references in template/asset paths but do **not** declare `@phenotype/design` in `package.json` — they appear to be **historical or template-only** consumers and are NOT listed as live consumers until their `package.json` is wired:

- `thegent/templates/vitepress*/theme/custom.css` (template content, not consumed at runtime unless a downstream uses the template)
- `thegent-mergify/templates/vitepress*/theme/custom.css` (same)
- `phenotype-tooling{, -wtrees, -mergify}/packages/design/ARCHIVED.md` (references in archived material only)
- `phenodocs/phenodocs/{PRD,SOTA,SPEC,FUNCTIONAL_REQUIREMENTS}.md` (prose mentions, not runtime imports)

**No action taken on these.** Listed for owner awareness only.

---

## 3. Drift between `@phenotype/design` and `@kooshapari/phenotype-design-tokens`

### 3.1 Status: PARTIALLY RESOLVED 2026-10-17

The workspace subpackage `packages/design-tokens/` ships a Tailwind config. Its
palette **was** fully independent of the canonical keycap. As of 2026-10-17 the
tokens that have a canonical equivalent have been re-keyed to match
`tokens/keycap.json`, and each value in `tailwind.config.mjs` now carries an
inline `[canonical]` (with its DTCG path) or `[subpackage]` marker.

| Token | `@phenotype/design` (canonical) | `design-tokens` tailwind preset (before) | (after) |
|-------|---------------------------------|------------------------------------------|---------|
| Primary / accent | `#7ebab5` (`keycap.color.accent`) | `#0ea5e9` sky → then `#3f8795` | `#7ebab5` `[canonical]` |
| Dark surface | `#090a0c` (`keycap.dark.bg`) | `#0f172a` → then `#0F1012` | `#090a0c` `[canonical]` |
| Light surface | `#f8f9fa` (`keycap.light.bg`) | `#f8fafc` → then `#f3f0e8` | `#f8f9fa` `[canonical]` |

### 3.2 Consumers (re-verified 2026-10-17, not the 2026-09-08 snapshot)

The earlier audit claimed *zero* consumers. That is **no longer accurate**.
A workspace-wide search for `phenotype-design-tokens` now finds **two**:

| Consumer | Pin | Real usage? | Evidence |
|----------|-----|-------------|----------|
| `pheno/packages/ui` | `"@kooshapari/phenotype-design-tokens": "workspace:*"` | **None.** Declared in `dependencies` but zero source imports; `packages/ui` contains only `package.json` matching the token name. | `pheno/packages/ui/package.json:21` |
| `pheno/packages/site-base` | `"@phenotype/design-tokens": "github:KooshaPari/phenoDesign"` | **Yes, and broken.** `packages/site-base/src/pages/index.astro:3` imports `@phenotype/design-tokens/css`, but the subpackage publishes as `@kooshapari/phenotype-design-tokens` and the root `@phenotype/design` exports no `./css` subpath. The import cannot resolve. | `pheno/packages/site-base/package.json:19`, `.../src/pages/index.astro:3` |

Neither consumer imports the **Tailwind preset** (`/tailwind`). The preset's only
in-repo reference is documentation: `skills/pd-design-tokens/SKILL.md`.

Two consequences worth flagging:

1. `pheno/packages/site-base` is a **pre-existing broken pin**, not drift caused
   by this repo. It points at a package name that has never existed on the
   `@phenotype/design` root exports map. Fixing it requires editing a file
   outside this repo, which is out of scope here.
2. `pheno/`, `PhenoInfra/`, and `PhenoApps/archive/PhenoInfra/` each hold a
   **copy** of `packages/design-tokens/` (plus an `ARCHIVED.md` noting
   `@phenotype/design-tokens` "Moved"). Copies drift from this repo
   independently; the re-key applied here does not propagate to them.

### 3.3 Remaining non-canonical surface (documented, not fixed)

These preset entries have **no** canonical equivalent in `tokens/keycap.json`
and are intentionally left alone. They are landing-page utility classes, not
keycap tokens:

- `colors.graphite`, `colors.paper`, `colors.concrete`, `colors.olive`,
  `colors.arch`, `colors.acid` — derived landing families.
- `colors.seed.ceramic`, `colors.surface.ceramic` — no keycap counterpart.
- `colors.paper.*` — these shadow the canonical light surface; note that
  `paper.100` (`#f3f0e8`) does **not** match `keycap.light.bg` (`#f8f9fa`).
- `fontFamily.display` (Space Grotesk) — `keycap.font` defines only
  `family-base` and `family-mono`. The Mac-first fallback chains on `reading`
  and `meta` are also subpackage-local.
- `spacing`, `fontSize`, `borderRadius`, `boxShadow`, `zIndex`,
  `transitionDuration`, `transitionTimingFunction`, `maxWidth` — no canonical
  scale exists in the keycap store.
- `colors.family.*` — per-product brand colors, intentionally outside keycap.

### 3.4 Deprecation plan (NOT yet triggered)

Formal retirement (Option B) was **evaluated and rejected** for now: with only
two consumers, neither of which uses the Tailwind preset, there is nothing to
migrate and no 4+ consumer blast radius. The subpackage stays, re-keyed.

Retirement becomes the right call when any of these happen:

- A consumer actually imports `/tailwind` from `@kooshapari/phenotype-design-tokens`.
- Landing pages adopt it, making it the only Tailwind preset in the workspace.
- `@phenotype/design` grows its own Tailwind preset export (see §3.5).

### 3.5 Proposed follow-up: Tailwind preset on the root package

The natural end state is for `@phenotype/design` to export a preset generated
**from** `tokens/keycap.json`, so there is one source of truth rather than a
hand-maintained transcription. Not done here because it changes the root
package's public exports map — an authority change. Also note
`skills/pd-design-tokens/SKILL.md:82` documents a `/tailwind-preset` subpath
that the package **does not** actually export (it exports `/tailwind`); that doc
is stale.

---

## 4. Verification commands

Re-running this audit at any later date:

```bash
# 1. Find direct consumers (package.json declarations)
grep -rn '"@phenotype/design"\|"@<REDACTED>/phenotype-design-tokens"' \
  --include="*.json" /Users/<REDACTED>/CodeProjects/Phenotype/repos \
  | grep -v node_modules | grep -v "phenoDesign/source-checkouts"

# 2. Find CSS asset consumers
grep -rln "keycap-palette.css\|vitepress-theme.css\|glass.css\|components.css" \
  --include="*.css" --include="*.ts" --include="*.tsx" --include="*.vue" \
  /Users/<REDACTED>/CodeProjects/Phenotype/repos \
  | grep -v node_modules | grep -v "phenoDesign/source-checkouts"

# 3. Verify the package builds and exports are intact
cd /Users/<REDACTED>/Downloads/chat1-portfolio-audit-2026-09-05/source-checkouts/20260908T082020Z/phenoDesign
bun run build && bun run test
```

---

## 5. What this document does NOT do

- Does not retire the `README.md` "ARCHIVED" banner (authority change — out of scope).
- Does not unify the workspace subpackage palette with the canonical keycap (cleanup — out of scope).
- Does not migrate any consumer to a different package (no authority transfer per audit mandate).
- Does not assert that the spine is the right spine — only that the spine is the **currently observed** spine.

Refs: audit/2026-09-05 (R2/phenoDesign), ARCHIVED.md, STATUS.md, PLAN.md, package.json exports.
