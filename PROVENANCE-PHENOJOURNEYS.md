# Provenance: PhenoJourneys Vue/Playwright/Remotion

**Source repository:** `KooshaPari/zz-merge-unk-PhenoJourneys`
**Absorbed into:** `KooshaPari/phenoDesign`
**Date:** 2026-09-15
**Absorbed by:** Jcode agent (automated)

## What was absorbed

Vue components, Playwright helpers, and Remotion doc embeds from the PhenoJourneys journey harness:

| Source path | Destination path | Description |
|---|---|---|
| `npm/journey-viewer/` | `packages/journey-viewer/` | Vue components (ShotGallery, JourneyViewer, JourneyStep, KeyframeGallery, etc.) |
| `npm/playwright-record/` | `packages/playwright-record/` | Playwright recorder (TypeScript) |
| `npm/journey-playwright/` | `packages/journey-playwright/` | Playwright helper (TypeScript) |
| `remotion/doc-embeds/` | `remotion/doc-embeds/` | Remotion/React doc embeds |
| `remotion/borrowed/` | `remotion/borrowed/` | Borrowed Remotion utilities |

## What was NOT absorbed (goes to phenotype-tooling)

Rust CLI code went to `KooshaPari/phenotype-tooling`:

- `crates/phenotype-journey-core/` — Core journey types and logic
- `crates/klipdot-capture/` — Klipdot capture utilities
- `crates/phenotype-journeys-observability/` — Journey observability/tracing
- `bin/phenotype-journey/` — CLI binary entry point

## License

Original code is Apache-2.0. Absorbed code retains its original license headers where present.
