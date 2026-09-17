# One narrative state; multiple renderers

Status: proposed for the receiving repository.

## Decision
Use a pure, bounded state evaluator with separate interaction and rendition inputs. Adapt output to DOM/SVG/live 3D/frame-based renderers.

## Rationale and alternatives
Independent clocks and transform writers drift; a single universal renderer would constrain media quality.

## Consequences
Evaluate seams, arbitrary seek and state retention. Renderer equivalence is semantic/compositional, not necessarily pixel identical.
