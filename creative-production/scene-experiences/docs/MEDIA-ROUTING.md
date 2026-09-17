# Choose the medium that preserves the experience

Do not confuse multidimensional design with mandatory real-time 3D. Compare the same scene
and task using at least two routes, including the simplest credible route.

| Route | Prefer when | Limit / losing condition | Required proof |
|---|---|---|---|
| Semantic DOM + CSS | Layout, type, masks, native controls and limited perspective carry the scene | Complex overlap/geometry turns into brittle transform stacks | Reading order, focus, motion preference, clipping, responsive behavior |
| SVG / layered 2.5D | Precise outlines, diagrams, cutouts, rigs, vector/material metaphors | Large filter areas, excessive DOM nodes or missing backs in camera travel | Painted bounds, hit areas, layer seams, source editability and seek |
| Canvas/Pixi-style 2D | Many sprites, particles or painted scene updates | Essential UI hidden in pixels, uncontrolled fill rate | Semantic parallel UI, batching, resolution/alpha and hit-state tests |
| Rive / stateful vector | Character/prop state machines and responsive vector art | Editor-only feature cannot be reproduced or exported on the qualified worker | Editable .riv, named inputs/events, runtime version and state coverage |
| Live mesh + Three.js/R3F | Free camera, physical occlusion, relighting, geometry-dependent input | Material budget or weak assets make it worse than a bake | Native source/GLB, render path, context loss, picking and target GPU |
| Pre-rendered video | Art-directed camera path, complex simulation or expensive materials with little free spatial agency | Seeking/compression breaks the interaction; visitor needs unseen views | Decode, seek latency, bounded preload, poster, exact dimensions/timing |
| Image sequence | Frame-precise scrub when video seek cannot meet the requirement | Decoded-memory/transfer costs exceed the device budget | Windowed frame cache, decoded bytes, deterministic frame index and fallback |
| Hybrid | A fixed beautiful plate plus limited live response gives the best result | Lighting, crop or timing seams expose incompatible layers | Matched transforms/exposure, layer alpha and input state continuity |
| Native engine / spatial delivery | A justified native/XR consumer needs it | A heavy engine is being used only to avoid learning ordinary web delivery | Real target build, permissions, tracking consent, interaction and fallback |

## Production routes for the reported tools

Illustrator owns editable paths, artboards and vector scene components. Photoshop owns layered
composites, masks, textures and carefully managed image derivatives. Blender owns spatial
geometry, materials, lighting and camera masters. Remotion/AE own intentionally time-based
composition; FFmpeg/ffprobe provide derivative/decoding checks, not aesthetic direction.

Qualify the installed tool/API before assuming unattended operation. Photoshop's supported
mutation flow includes modal execution; an installed app is not the same thing as a safe worker.
Native applications may need a dedicated signed-in host/session. [R11]

For each route produce: source identity, dependency/rights manifest, placement size, parameters,
render settings, export hashes, native reopen result, consumer tests and independent critique.
Retain masks/layers/rigs and meaningful names. Avoid baking text that must remain accessible or
localized into a background texture. Never distribute installed font binaries in this kit.

## Shared recipe, not guaranteed visual identity

A normalized scene state can drive web, video and a Blender recipe. This does not guarantee
bit-identical pixels across color management, render engines, type rasterization or physics.
Record the accepted equivalence: composition, source object identity, key states, timing and
material direction. Compare representative frames under documented tone mapping/exposure.

## Challenge cards

**Alternative A: this should be static.** Preserve content, assets and framing, remove motion.
Does the moving version reveal a material, relation, task or point of view the static version loses?
If not, prefer the simpler execution.

**Alternative B: interaction is decorative.** Replace drag with a clear button/state selector.
Does drag communicate the mechanism or simply add friction? Keep both when each serves a role.

**Alternative C: the asset, not the renderer, is weak.** Compare a high-quality offline render
and live scene with identical framing. Fix geometry, light or art direction before writing shaders.

**Alternative D: the package boundary is premature.** Implement once inside the consumer;
extract only repeated stable logic. More reusable-looking folders do not establish reuse.
