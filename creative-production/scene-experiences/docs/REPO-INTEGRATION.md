# Repository integration and ownership

## Observed baseline, 2026-09-15

GitHub PR #87 was open/unmerged at the refreshed inspection. Base:
`d11733b1525cb97e045dc7f8d67a05df5501f6c1`; head:
`6c99a15337505b55f46a9f576465db5e4053b416`. Its stated imports are
`packages/journey-viewer`, `packages/playwright-record`, `packages/journey-playwright`,
`remotion/doc-embeds` and `remotion/borrowed`. The Rust CLI migration is separately identified
in that PR as phenotype-tooling #358. These are snapshot observations, not blanket runtime proof.
Source: https://github.com/KooshaPari/PhenoDesign/pull/87

The earlier packages preserve deeper snapshot-specific renderer findings and patch proposals.
V3 does not assume those patches were installed or applied. Refresh files before changing them.

## Logical architecture versus physical folders

Keep **design system / scene behavior / asset production / validation** as conceptual boundaries.
Do not mechanically create a new root folder for every noun or move existing source merely to
match a diagram. Start additive; extract a package only after a second real consumer demonstrates
shared behavior. Existing package names and exports stay stable until a deliberate migration.

```text
PhenoDesign/
  src/, tokens/, css/, docs/              existing design-system ownership: preserve
  packages/journey-viewer/                imported/accepted evidence presentation: extend
  packages/playwright-record/             imported/accepted browser capture: extend
  packages/journey-playwright/            existing helper interfaces: preserve
  remotion/doc-embeds/                    existing time-based presentation: extend
  creative-production/                   existing or reconciled v2 production surface
    scene-experiences/                    V3 additive subtree; no independent service
      docs/                              direction, grammar, routing, review, reference cards
      skills/                            scene workflows with references to shared docs
      contracts/                         authored scene extension, not proof authority
      runtime/                           pure reference evaluator; extract only on demand
      specimen/                          executable six-scene vertical slice
      recipes/                           native authoring + time-based adapter examples
      tests/                             reference-unit and browser consumers
      resources/                         references and acquisition records
```

The V3 installer only populates `creative-production/scene-experiences/`. It does not change
Remotion, root package.json, locks, CI, exported APIs, tokens or AGENTS.md. The integration work
below is an agent assignment against the live checkout—not a claim the repo has been modified.

## Ownership map

| Concern | Home / integration action | What not to duplicate |
|---|---|---|
| Identity, type, tokens, components | PhenoDesign accepted sources | Another brand palette as permanent authority |
| Scene treatment and recipes | PhenoDesign creative-production scene lane | A separate “immersive studio” repo |
| Small pure choreography helpers | Existing consuming package initially; shared package only after two consumers | A universal engine before demonstrated need |
| Editable source and export recipes | Current accepted asset owner, surfaced through PhenoDesign | Competing source masters or render schedulers |
| Headless/native workers | Existing asset-engine home or one deliberate migration | A second queue, permission broker or daemon |
| Low-level graphics | Current phenotype-gfx/accepted successor | Copied renderer ownership hidden in a skill pack |
| Capture, semantic assertions, trust | Accepted journeys/tooling verifier | A new PASS-producing registry |
| Edited video and documentation | Existing Remotion/viewer packages | Treating an edited render as raw evidence |
| Persistent product/work state | Existing Tracera/AgilePlus boundaries | Using a scene manifest as product or task authority |

User direction permits consolidation. These are current integration boundaries, not a veto on
moving code. A migration must choose one owner, move history/provenance, update all consumers,
provide compatibility where required and retire the duplicate. No restoration of deleted repos
is implied by the old description pointing at them.

## Integrate the scene experience

First run this package's tests and specimen. Then map the reference evaluator to the actual
Vue/React consuming surface. Keep Vue and React host boundaries explicit; do not import a React
Remotion component directly into a Vue viewer. Use a player/iframe adapter where appropriate,
with controlled sizing, lifecycle, accessibility and postMessage origin checks.

Add scene-aware journey observations without changing the trust model: scene ID/progress,
variant state, backend, asset readiness and error state accompany actual interaction and captures.
Fix failures at the owning recorder/viewer rather than fabricating screenshot placeholders.

For Remotion, reuse the shared deterministic evaluator and a renderer designed for frame-based
execution. Preserve input/source dimensions, fit/crop/zoom, scene-local frame durations and
annotation timing. Retain existing v2 staging hardening only after verifying current source.
Prove actual decoded output and playback inside the real documentation page.

## Proposed public surface, not published API

Keep authoring data, runtime evaluation and observation separate. A narrow eventual API could
provide `evaluateExperience`, a renderer adapter (`mount`, `update`, `resize`, `dispose`) and
`readSceneSnapshot`. Capture/verdict remains external. Package names/exports must be chosen
against the current workspace, not copied blindly from this illustration.

## Delivery gates

Use the milestone IDs in `plan/backlog.json`: M0 reconcile; M1 treatment and scene
contract; M2 native masters; M3 actual scene consumer; M4 Remotion cross-media;
M5 existing journey validation; M6 real-device/native isolation; M7 visual critique;
M8 second-consumer reuse and minimal extraction. The backlog carries dependencies, acceptance and failure
cases. Preserve its actual definitions when importing into the existing work system.
No automatic merge, publish, account changes, paid installs or private source upload
are authorized by this package.
