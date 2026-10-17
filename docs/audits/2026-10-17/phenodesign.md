## IDENTITY
PhenoDesign = `@phenotype/design` v2.0.1 + `@kooshapari/phenotype-design-tokens|ui|design-utils|3d-viewers|interaction-patterns|component-recipes|vscode-extension` monorepo at `KooshaPari/phenoDesign` (ID `1169864396`, default branch `main`, HEAD `ba6e8c6` 2026-09-19). Supporting-surface / creativity-design-UX spine.

## INTENT
Single source of truth for shared Phenotype design tokens (`--kc-*` CSS custom properties + DTCG JSON), 4 hand-authored stylesheets (`css/keycap-palette.css`, `components.css`, `glass.css`, `vitepress-theme.css`), VitePress theme, SVG icon/pattern/badge library, and an "authored spatial scene experiences v3" direction. Consumed only by `phenodocs` (root + `packages/docs`) via `@phenotype/design/css/vitepress-theme.css`.

## CURRENT STATE
Status: **LIVE** per `ARCHIVED.md` (line 5) + `CONSUMERS.md` §1 + commit `d6905da` "docs(readme): rewrite with LIVE design-system description" — but `STATE.md` snapshot (2026-09-16, `d11733b`) says `CURRENT_ASSET_SOURCE_UNRESOLVED` and is stale vs. the Sep 17-19 commits. Root `dist/` is **missing** despite `bun run build` (`package.json:33`); 5/7 workspace subpackages have populated `dist/` (3d-viewers, component-recipes, design-tokens, design-utils, interaction-patterns); `ui/dist` and root `dist/` are absent. Branch clean (`git status` empty).

## CODE REALITY
- `src/index.ts` (2 lines) + `src/tokens.ts` (1 line) are pure re-export facades — `src/tokens/index.ts:1` re-exports 6 small token modules totaling ~228 lines (`glass.ts:49`, `keycap.ts:48`, `materials.ts:24`, `neumorphism.ts:10`, `polygons.ts:54`, `typography.ts:19`).
- `src/application/generator.ts` (217 lines) is real implementation: `DesignGenerator` class with validate→compose→render→emit pipeline, AbortSignal-aware, per-step timeout — this is the only non-trivial logic in `src/`.
- `src/domain/types.ts:1-65` defines `DesignSpec | Composer | Renderer | Validator | Result` — these types feed the generator but no concrete `Composer`/`Renderer`/`Validator` ships in `src/`.
- `css/` is the actually-shipped surface: 4 files, ~21KB, hand-authored (`keycap-palette.css:1`, `components.css:1`, `glass.css:1`, `vitepress-theme.css:1`); exported via `package.json:18-21`.
- `tokens/keycap.json` (DTCG-format) is the canonical token store per `FUNCTIONAL_REQUIREMENTS.md` FR-TOK-006/007.
- `engine/README.md:1` is a 332-byte redirect stub pointing to peer `KooshaPari/asset-engine` — intentional, not lazyness.
- `creative-production/scene-experiences/specimen/workshop/` is a real Three.js Vite app (`index.html:1`, `vite.config.js:1`, `verify-render.mjs:1`, `src/`, `public/`, `dist/`) — closest thing to a "native" scene-experience v3 specimen.
- `tests/` totals 779 lines across 5 root test files (`tokens.test.ts:233`, `generator.test.ts:295`, `exports.test.ts:61`, `consumer-contracts.test.ts:190`) + `visual/` (Playwright snapshots) + `integration/` + `e2e/` subdirs — test infra exists but no run receipts observed.

## STUB/MOCK/MVP-LAZINESS INVENTORY
1. **`engine/` directory** — only `engine/README.md:1` (redirect stub to `asset-engine`). Documented, intentional.
2. **Root `dist/` missing** — `package.json:11` declares `"main": "dist/index.js"`, `package.json:33` declares `build = "tsc && cp -R css dist/css"`, but no `dist/` exists on disk. Consumers would 404 the main entry until rebuilt.
3. **`packages/ui/` has no `dist/`** — `package.json:8` exports `./src/index.ts` raw (no build step) and depends on the still-unpublished `@kooshapari/phenotype-design-tokens@^0.1.0`.
4. **Drift between `@phenotype/design` and `@kooshapari/phenotype-design-tokens`** — `CONSUMERS.md:75-78` documents primary `#7ebab5` vs `#0ea5e9`, dark `#090a0c` vs `#0f172a` — known, unfixed.
5. **Two v2 archives retained** under `creative-production/scene-experiences/prior-kits/` (`phenodesign-creative-production-v2.zip`, `phenoDesign-visual-production-v2.zip`) — `START-HERE.md:23-27` says "neither is automatically applied", but they remain in the tree as cargo-cult bytes.
6. **`src/domain/types.ts` interfaces without concrete implementations** — `Composer | Renderer | Validator` are referenced by `generator.ts` but no shipped implementations are in `src/`. The generator class is wired against abstract deps; concrete adapters presumably live in workspace packages but the wiring is unverified.
7. **Asset pipeline README claims asset-engine peer; this repo has no Blender/FFmpeg/ImageMagick code** — `engine/README.md:5-7` explicit policy. Means native 3D asset work can't happen here.

## FWD PATH TO FINISH
1. Run `bun run build` at root and commit the resulting `dist/` (currently absent — `package.json:11` points to `dist/index.js` that doesn't exist; this is the single most important gap).
2. Decide `packages/design-tokens` Tailwind palette drift: either re-key to canonical `#7ebab5` teal, or formally retire the workspace subpackage and migrate consumers to root `@phenotype/design/tokens` (`CONSUMERS.md:75-82`).
3. Publish `@phenotype/design@2.0.1` to npm OR document why all consumers stay on `github:` pin (`CONSUMERS.md:34-36` lists phenodocs as still on `github:`).
4. Reconcile `STATE.md` (stale `d11733b` snapshot) with the 4 Sep 17-19 commits (`6e79b74`, `d6905da`, `e247f57`, `3115d7d`) — or delete `STATE.md` and let `ARCHIVED.md` + `CONSUMERS.md` be the authority pair.
5. Apply the `creative-production/scene-experiences/` v3 installer (`integration/install.py --apply`, `AGENT-HANDOFF.md:38-41`) to commit the scene direction into `assets/` or `docs/` — currently a staged world, not live.

## TIME-TO-FINISH ESTIMATE
**~3-5 hours wallclock** for one focused engineer: 30m root build fix + verification; 1h design-tokens drift decision + patch; 30m npm publish dry-run; 30m STATE.md/CONSUMERS.md reconciliation; 2-3h scene-experiences v3 application (one scene-direction piece, not all 6 scenes). Most time goes to integration testing across phenodocs + design-utils + 3d-viewers consumers.

## SUNSET/KEEP CALL
**KEEP.** It has real CSS shipped to a real consumer (phenodocs), 5 built subpackages with `dist/`, a hand-authored DTCG token store, a Storybook + Playwright + Vitest test scaffold, an interactive Three.js specimen, and ~30 commits in the last 30 days. Not a stub — an active supporting surface with one missing build artifact and one palette drift. Sunset would orphan phenodocs and force a re-implementation of the keycap palette + VitePress theme elsewhere.

## CONFIDENCE
**High.** Read-only audit of 8+ source surfaces (AGENT-PROMPT, STATE, DOSSIER, CONSUMERS, ARCHIVED, package.json, src/, packages/, scene-experiences/, tests/, git log). No tests/builds run (read-only constraint). Confidence would rise to verified by running `bun install && bun run build && bun run test` once.