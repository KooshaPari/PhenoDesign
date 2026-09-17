# Choreography and scene primitives

Primitives are compositional tools, not effects to place everywhere. Combine a small set around
one dramatic premise. In the default specimen, light changes from distant object to manipulable
mechanism to surrounding environment; the visitor's aperture choice survives the whole passage.

| Primitive | Dramatic purpose | Composition / input | Failure to reject |
|---|---|---|---|
| Establishing chamber | Situate subject and viewer | Ground plane, horizon, restrained camera | Floating object with no scale/contact cues |
| Threshold / portal | Cross a boundary rather than swap cards | Expand an aperture past the viewport; maintain anchor | Arbitrary zoom obscures all navigation |
| Suspended mechanism | Show relations between parts | Shared axis, named mounting points and shadows | Parts float randomly without construction logic |
| Exploded construction | Explain assembly | Separate along a real assembly axis; toggle/scroll | A spectacle of unrelated components |
| Cutaway / sectional peel | Reveal interior without losing shell context | Clipping, transparent section, matching silhouette | Inaccurate product internals presented as fact |
| Material chamber | Make finish respond to light | Relight/material selector plus real response | Flat color button pretends to change material |
| Macro passage | Transition from object to material scale | Match curve/pattern into enlarged detail | Scaled poster without new information |
| Diegetic dial | Put an understandable control in the scene | Visible mechanism, keyboard range counterpart | Discoverability or accessibility sacrificed |
| Foreground transgression | Let a prop escape its apparent frame | Controlled overlap of decorative frame/type | Focus rings, CTA or text covered |
| Viewer-reactive light | Acknowledge deliberate input | Local pointer/drag response, bounded gain | Covert presence tracking or constant jitter |
| Tactile resistance | Communicate weight or mechanical limits | Damped motion with explicit bounds and reset | Motion tied to unbounded frame time |
| Assembly handoff | Carry identity across cuts/routes | Shared object/variant ID, matched anchor | New route silently resets choices |
| Environmental consequence | Make a small action affect the whole world | Aperture changes beam/wall/floor illumination | Control changes only a numeric label |
| Technical overlay | Explain a real relationship | World/projected anchors + semantic counterpart | Fake metrics or labels unrelated to geometry |
| Held moment | Give attention and reading time | Stable state, no unnecessary auto drift | Every surface competes for motion |
| Match cut / occluder | Hide renderer boundary without deceit | Same silhouette or intentional foreground wipe | Loader disguised as unavoidable cinematic pause |
| Perspective typography | Make type part of a staged plane | Selectable/semantic equivalent; bounded distortion | Essential copy exists only in illegible pixels |
| Time slice | Inspect a captured/simulated phase | Cached state or deterministic seek | Variable-step simulation breaks reverse/seek |
| Branch and return | Offer agency without losing orientation | Named branch, state retention, explicit return | Hidden exit or infinite scene navigation |
| Resolve to utility | End the show in a usable task surface | Direct link/action, all conclusions retained | A theatrical finale with no useful next step |

## Timing language

Storyboard the attention curve, not only durations. **Anticipation** establishes the change;
**action** communicates it; **settle** confirms the resulting state; **hold** permits understanding.
Do not attach spring/overshoot to every property. Material, scale and context determine the motion.
An extremely small machined dial should not bounce like rubber unless intentionally stylized.

Scroll distance is not time. Visitors can pause, reverse or skip. Define normalized state under
arbitrary seek, not a fragile sequence of `onEnter` callbacks. An auto film is a separate driver
and requires user control. Native scroll-linked CSS and GSAP are available routes; their existence
does not excuse unmeasured scroll traps. [R04, R05]

## Lighting and camera review

Use motivated key/fill/rim/reflection sources. Preserve a stable tonal hierarchy as the camera
moves. Avoid crushed blacks hiding the product silhouette and blown highlights erasing material
information. Test a neutral render before adding bloom. In 2.5D, moving the light too far can
expose baked shadows; constrain motion honestly or use a new plate.

A lens/camera path has framing, focal behavior, near/far planes and collision/occlusion constraints.
The browser viewport has unknown physical size; author multiple compositions, not one huge
scene cropped into mobile. Mobile may use a closer cut, fewer depth layers and direct selectors.
