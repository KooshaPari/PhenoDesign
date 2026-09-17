# Scene grammar, state and time

## Minimum common contract

`contracts/experience.schema.json` defines an authored document, **not a replacement for
Journey, BundleManifest, Tracera's product graph or AgilePlus's work records**. It may be attached
to those existing owners by reference. Unknown/experimental behavior stays in namespaced
extensions rather than silently changing a downstream evidence schema.

An experience has a subject, task, semantic summary, asset references, ordered scenes,
transitions, input bindings, rendition policies and validation claims. A scene includes
`purpose`, `camera`, `lighting`, `objects`, `input`, `semantic`, `continuity`, `fallback` and
`acceptance`. Asset source/rights identities belong to existing asset records; reference them.
A scene is not required to animate or accept input. It is required to have a reason to exist.

## One evaluation model

Define `frame = evaluate(progress, interactionState, rendition)`. It must be pure for the same
arguments. Renderers draw that result; they do not each invent their own version of the story.
The included evaluator clamps finite progress, calculates scene-local progress, preserves
material/aperture selections and disables continuous camera/pointer travel in reduced motion.

Use normalized progress for a scroll rail. Scene beats have explicit boundaries. A time-based
render maps `frameIndex / (durationInFrames - 1)` into the same progress range. Last-frame mapping,
one-frame duration and nonfinite input are intentional edge cases, not accidental divides by zero.
Remotion reads a frame index; wall clocks and uncontrolled CSS animations do not create
frame-deterministic exports. [R08, R09]

Separate four concepts:

| Concept | Source of authority | Example |
|---|---|---|
| Narrative position | Native scroll, explicit scene link, or film clock—one active driver | The lens has separated enough to see its construction. |
| Persistent visitor state | Explicit bounded reducer | Selected finish and aperture survive scene navigation. |
| Transient response | Pointer/gesture sample with cancellation | A small spotlight follows the pointer. |
| Environment/capability | Observed device/runtime preferences | Reduced motion removes the camera flight. |

A selected finish is not a function of scrolling. Reverse scrolling must not erase it. A pointer
sample is not evidence of interest, identity, emotion or consent to tracking. A viewport resize
changes framing, not product configuration. User pause must not stop access to the task.

## Transitions

Author entrance, hold, exit, seam and direct-entry states. For matching cuts, name the invariant
(anchor, bounding ellipse, silhouette, luminance or camera axis). For literal spatial transitions,
keep world-space positions and transform ownership. For a change of renderer, either crossfade
at a matched state or use an intentional occluder; do not cover unknown loading latency with
an unskippable black screen. Failed rich assets keep the semantic rendition usable.

Reverse is defined even when the original narrative is linear. Seek sets the full state from
inputs; it must not rely on every earlier animation callback having fired. Drag/physics replay
uses a deterministic cached simulation or explicit fixed timestep with seed and boundary rules.
Do not use a variable-step physics simulation for a random-access film export.

## Three coordinate systems that must not be confused

**World:** object/camera/light coordinates and units. **Viewport:** CSS pixels, scroll and safe
areas. **Source media:** original pixels used for callouts/crop. Project world labels to CSS pixels,
then apply safe-area and occlusion rules. For video/image overlays, use one fit/crop/zoom transform
for both media and annotations. Device-pixel ratio is a renderer detail, not a second layout scale.

## Hooks for the real journey harness

Expose a read-only scene snapshot and an explicit readiness condition. Tests invoke real controls,
then inspect state plus pixels. A test-only `seek()` hook is useful for deterministic frame export,
but does not count as user-path interaction proof. Include capability/backend, dimensions,
progress, selected variants, loaded asset IDs and errors. Never let the app's own `passed=true`
replace the external test's observations.

The included `window.__sceneExperience` is a specimen inspection/export hook. It is not a trusted
verifier and is not a proposed global API for every app.
