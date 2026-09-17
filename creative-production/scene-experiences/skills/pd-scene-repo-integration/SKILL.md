---
name: pd-scene-repo-integration
description: "Absorb scene capabilities into PhenoDesign without duplicate owners."
license: MIT
---

# Scene Repo Integration

## Trigger and objective
Absorb scene capabilities into PhenoDesign without duplicate owners.

## Inputs
Current checkout, existing work, migration heads and the two historical kits.

## Workflow
Reconcile current files before applying a pack. Add the scene lane without root renames. Reuse worker/graphics/evidence owners or migrate one at a time with consumers. Extract common runtime only after two consumers prove it.

Read `docs/REPO-INTEGRATION.md` from the canonical pack root. In a PhenoDesign checkout that
root is `creative-production/scene-experiences/`; in the standalone ZIP it is
the extracted V3 root. Read only the related docs/recipes, not every skill.

## Deliver
Owned worktree changes, integration map, tests and remaining blockers.

## Critical alternative / failure case
Never run both old v2 overlays blindly or restore deleted repositories because a stale README names them.

## Non-negotiable boundaries
Keep accepted design tokens, editable source and source rights. Work on owned
files/sessions and within approved tool/spend/network scope. Capture actual
outputs, report blocked backends honestly, and use the existing journey/evidence
authority rather than an agent-authored success flag. A cheaper or less animated
alternative wins when it preserves the same meaning and task with better results.
