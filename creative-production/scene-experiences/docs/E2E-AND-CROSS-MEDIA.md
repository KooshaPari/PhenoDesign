# End-to-end and cross-media production

## Vertical slices

**Vector/2.5D:** named Illustrator/SVG layers → save/reopen → optimized export → scene rig → real
input → browser pixels → static/keyboard rendition. Inspect hidden edges, clipping and alpha.

**Raster:** layered Photoshop master with owned linked images/masks → save/reopen → color/alpha
export → multi-plane scene → bounded camera move → seams and semantic content check. A crop
must not become an undocumented loss of content or a fake source metric.

**Spatial:** Blender source and parameter recipe → cold reopen and named object/material check →
GLB/poster/optional plates → real renderer import → picking/camera/lighting → graphics failure and
fallback → selected target devices. A valid GLB header is not a good-looking scene.

**Motion:** shared narrative state + explicit frame clock → Remotion or approved compositing
adapter → actual output → full decode/duration/dimensions/audio checks → true documentation/player
consumer → captions/transcript and keyboard playback. Match source pixels and annotation geometry.

**Interactive vector:** editable Rive/vector source → named state inputs/events → runtime load →
real input transition coverage → focus and reduced motion. Installed authoring tool and runtime
are separate capabilities; do not infer either from a screenshot or package entry.

## Native worker contract

Probe platform, app/version, login/license, plugin/API, permissions, source fonts/links and renderer
before running a canary. Acquire an owned session and project directory. Do not steal focus or
close the operator's files. Save native source, close the owned document and cold-reopen it in an
independent step; inspect objects/layers and linked data, then export and view output independently.
An execution receipt records what happened; external checks decide whether it is acceptable.

The included Blender recipe authors a simplified optical instrument. It is a recipe ready for
on-device qualification, not a supplied .blend or evidence of native rendering in this environment.
The earlier archives carry native Adobe canaries; reconcile one implementation rather than copying
both versions into the repo.

## Shared state to Remotion

`recipes/remotion/SceneFilm.tsx` consumes the same pure evaluator and SVG drawing function as
the browser specimen. It is an adapter example, not an installed/qualified package. Use the current
repo's compatible pinned React/Remotion versions and actual lockfile; no floating package install
is necessary to understand it. Timing derives only from `useCurrentFrame()` and `useVideoConfig()`;
the pure functions are tested independently. [R08, R09]

A Remotion output is **authored presentation**. To show real product behavior, capture the product
with journeys, preserve the master, then use edits/callouts as separate derivatives. Rendering the
product's desired state from a JSON file is not proof a user could reach it in the product.

## Build versus deployment

The reference browser tests offer `inline` and `http`. Inline loads the exact generated artifact
into a browser fixture; it validates its code/pixels/controls but not URL loading, CSP, bundling,
module import, server headers or integration. HTTP tests navigate to a locally served artifact and
must not fall back silently. The target agent additionally tests the actual framework consumer
and release URL under its normal permissions. Do not evade environment navigation restrictions.
