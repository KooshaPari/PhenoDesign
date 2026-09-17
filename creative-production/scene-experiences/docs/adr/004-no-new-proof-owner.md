# Keep evidence authority where it belongs

Status: proposed for the receiving repository.

## Decision
Attach scene observations to the accepted journey/evidence model; keep authored film separate from raw captures.

## Rationale and alternatives
A scene renderer can manufacture any desired frame, so its own success flag cannot verify a real user journey.

## Consequences
External tests record input, state and pixels. New schemas describe authored intent, not trusted verdicts.
