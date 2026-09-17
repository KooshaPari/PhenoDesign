# Consolidate by ownership, not folder count

Status: proposed for the receiving repository.

## Decision
Surface existing production workers through PhenoDesign, or migrate each once with consumers and source custody.

## Rationale and alternatives
Two v2 archives and partially moved repos create a real risk of duplicate implementations.

## Consequences
Keep archives immutable; reconcile locally; never apply competing overlays without inspecting current heads.
