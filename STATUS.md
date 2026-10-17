# Status

Last updated: 2026-10-17

## Build
- GitHub Actions billing-blocked org-wide. Workflows are configured but not running.
- Local build: `bun run build` (`tsc && cp -R css dist/css`) succeeds.
- Root `dist/`: **BUILT in 2026-10-17 audit** — 43 artifacts committed (`b0a2447`),
  including `dist/index.js`, `dist/index.d.ts`, `dist/tokens.js`, `dist/css/`.
  This closes the highest-severity gap from `docs/audits/2026-10-17/phenodesign.md`
  (audit item 2: root `dist/` was declared as `main` but absent on disk).
- `packages/ui/dist` still absent by design (`package.json:8` exports raw `./src/index.ts`).

## Quality gates
- oxlint: local (`bun run lint`)
- vitest: local (`bun run test`)
- vitepress build: local

## Current state
- Branch: `main` (default), 1 commit ahead of `origin/main` (`b0a2447`, not pushed)
- Working tree: clean
- Stashes: 0
- Open PRs: 0
- Package: `@phenotype/design` v2.0.1 (`VERSION` file still reads `0.1.0` — drift)
- Master cohort audit: overall **49 / grade D**
  (`docs/audits/2026-10-17/phenodesign.md`, commit `a2a6791`)

## npm publish
**TODO (unresolved).** `@phenotype/design@2.0.1` is not published to npm. Both known
consumers (`phenodocs/phenodocs` root and `packages/docs`) still install via
`github:` pin per `CONSUMERS.md:34-36`. Publish, or formally document why all
consumers stay on the git pin (audit item 3).

## Recent changes
- 2026-10-17 — master cohort audit recorded (`a2a6791`)
- 2026-10-17 — root `dist/` build artifacts emitted and committed (`b0a2447`)
- 2026-10-17 — ecosystem copy tightened, stale repository facts corrected (`c8fd783`)
- 2026-09-18 — adopted canonical GLOBAL_HANDBOOK (docs-5 rev 1.4 atlas) (`3115d7d`)
- 2026-09-17 — design system docs and package metadata refreshed (`6e79b74`)
- 2026-09-17 — README rewritten with LIVE design-system description (`d6905da`)
- 2026-09-16 — Phenotype Global Handbook pinned, consolidated from 13 source docsets (`e247f57`)
- 2026-06-08 — un-archived (reverted 2026-03-25 archive decision); package name
  corrected to `@phenotype/design`; workflow hygiene pass applied

## Known open items
- `packages/design-tokens` Tailwind palette drift vs canonical `#7ebab5` teal
  (`CONSUMERS.md:75-82`) — re-key or retire the subpackage.
- `VERSION` file (`0.1.0`) disagrees with `package.json` (`2.0.1`).
- `creative-production/scene-experiences/` v3 direction staged but not applied to
  `assets/` or `docs/`.

## Cross-references
- `ARCHIVED.md` — spine status, archive/absorption history, consumer guidance
- `CONSUMERS.md` — consumer install pins and palette drift
- `docs/audits/2026-10-17/phenodesign.md` — full master cohort audit
- `audit_scorecard.json` — per-layer L1–L30 scores
- `phenotype-org-governance/SUPERSEDED.md` — canonical authority
