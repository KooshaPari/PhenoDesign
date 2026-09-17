# Frame adapter, not an installed runtime

Register `SceneFilm` in the existing `remotion/doc-embeds`/accepted composition host after
reconciling current imports and pinned compatible dependencies. Use the installed Remotion docs
for the current composition registration API. Example project parameters: 1440×900, 30 fps,
360 frames. These are example settings, not rendered-output facts.

The same `evaluateScene` and `renderSceneSVG` functions are used by the browser specimen and
this component. Frame mapping reaches progress 0 on the first frame and 1 on the last.
Supply fixed finish/aperture inputs or an explicit recorded interaction track. Do not use Date,
requestAnimationFrame, uncontrolled CSS animation, random IDs or mutable external state.

After actual rendering: fully decode, inspect representative frames at all six scene boundaries,
verify duration/dimensions/frame count, and open the result inside the real docs/player consumer.
This module has no dependency manifest on purpose: do not install a second conflicting React or
Remotion tree just to use a recipe. No Remotion render is claimed by the pure math/SVG tests.
