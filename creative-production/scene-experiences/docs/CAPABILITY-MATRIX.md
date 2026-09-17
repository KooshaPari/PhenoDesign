# Capability matrix

All media families remain in scope. These rows are coverage and acceptance assignments—not a claim all adapters are installed.

| ID | Capability | Production/source | Owner | Delivered state | Acceptance |
|---|---|---|---|---|---|
| C01 | Scene direction (Narrative) | Treatment and alternative executions; Director dossier | PhenoDesign | Reference implementation | Premise survives static and interactive review |
| C02 | Spatial storyboarding (Narrative) | Camera/prop/lighting boards; Scene document + boards | PhenoDesign | Reference implementation | All entrances/holds/exits/reverse paths described |
| C03 | Scene continuity (Runtime) | Stable objects and variant state; Pure state evaluator | Consumer initially | Implemented reference | Direct seek, reverse, route handoff preserve configuration |
| C04 | Camera choreography (Runtime) | World/object/macro framing; Camera waypoints | Consumer initially | Implemented reference | Framing/occlusion and mobile compositions inspected |
| C05 | World and environment (Art) | Ground, scale, atmosphere and prop relations; Scene layers/master | Accepted asset owner | Implemented reference | Coherent spatial cues under all used views |
| C06 | Interactive object grammar (Interaction) | Aperture, unfold, section, assemble; Bounded reducer + input bindings | Consumer initially | Implemented reference | Real input visibly changes consequence, reset and bounds |
| C07 | Diegetic controls (Interaction) | Scene controls + semantic counterparts; DOM/SVG or native UI | PhenoDesign | Implemented reference | Keyboard/touch parity, visibility and no trapping |
| C08 | Fourth-wall staging (Art) | Foreground overlap and viewer response; Layer/occlusion policy | PhenoDesign | Implemented reference | Decorative frame may break; controls/focus stay protected |
| C09 | Light/material consequence (Art) | Relighting, finish, aperture; Material/light master and bindings | Accepted asset owner | Implemented stylized reference | Control changes environment and surface, not only label |
| C10 | Vector/identity/typography (2D) | Illustrator, SVG, semantic type; AI/SVG + layer/artboard identity | Accepted asset owner | Prior guidance, not rerun | Native reopen, vector inspection, placement and semantic copy |
| C11 | Raster/compositing (2D) | Photoshop layers/masks/material plates; PSD + color/alpha recipes | Accepted asset owner | Prior guidance, not rerun | Native reopen, missing links, alpha/crop and consumer |
| C12 | Rigged/animated 2D (2D/time) | Stateful vector, Rive, sprites; Editable rig/state machine/atlas | Accepted asset owner | Specified | Runtime state coverage and owned authoring qualification |
| C13 | 2.5D diorama (Spatial) | Layer planes, masks, constrained camera; Editable layers + depth/camera | PhenoDesign | Implemented reference | No exposed edges, matching occlusion and reduced-motion cuts |
| C14 | Procedural spatial source (3D) | Blender Python/Geometry Nodes; BLEND recipe + named objects | Existing render worker | Recipe; native unexecuted | Cold reopen, material/object structure, export and actual import |
| C15 | Live 3D/shaders (3D) | Three.js/R3F or accepted graphics stack; GLB + renderer source | Existing graphics owner | Specified; GPU unqualified | Renderer pixels, context loss, materials, picking and device budget |
| C16 | Film and motion (Time) | Remotion/AE deterministic composition; TSX/AEP + state/timing | Existing Remotion/render owner | Adapter; native runtime unexecuted | Actual render + full decode + served player and captions |
| C17 | Pre-rendered/hybrid delivery (Hybrid) | Video plates, image windows, live overlays; Masters + transform mapping | Consumer initially | Specified | No seams; seeking, decoded-memory and fallback tests |
| C18 | Scroll/direct navigation (Interaction) | Native scroll and scene links; Progress/scene driver | Consumer initially | Implemented reference | Fast/reverse scroll, links, resize, no wheel interception |
| C19 | Frame-driven export (Time) | Same pure scene state, film clock; Deterministic frame mapping | Existing Remotion owner | Implemented reference | First/last/one-frame behavior; no wall-clock dependence |
| C20 | Physics/simulation (Spatial/time) | Bounded state + fixed-step/cache; Rig/simulation recipe | Existing render worker | Specified | Seek/reset equivalence, bounds, reproducibility limits |
| C21 | Audio/captions (Time) | Intentional sound and transcript; Audio/caption source and mix | Existing media owner | Specified; no audio in specimen | Opt-in playback, synchronization, captions and rights |
| C22 | Data/diagrams/editorial (2D/info) | Accurate data plus spatial explanation; Data/source graph and semantic view | PhenoDesign | Prior scope retained | No fake statistics; semantic values and data provenance |
| C23 | Print/CAD/spatial variants (Extended) | Appropriate precise/native source; Print/CAD/XR source + exports | Accepted specialist owner | Prior scope retained | Target-specific qualification; no manufacturing/XR claim from web demo |
| C24 | Native authoring operations (Production) | Owned Adobe/Blender sessions; Probe/reopen/capture receipt | Existing worker broker | Specified; host unqualified | No focus theft; owned docs; cold reopen and independent pixels |
| C25 | Asset sourcing and rights (Production) | Approved source/tool/model acquisition; License/source/version identity | Accepted asset owner | Specified | Per-item rights; no private upload or font redistribution |
| C26 | Accessibility and fallback (Quality) | Semantic UI, motion-off, constrained route; Equivalent task rendition | Consumer + existing tests | Reference checks via scripts/browser_check.py | Real keyboard/no-JS/reduced-motion and protected controls |
| C27 | Performance/resource discipline (Quality) | Bounded render/cache/worker costs; Measured budgets and device results | Existing worker + consumer | Specified; device budgets unmeasured | Actual client measurements; hidden/offscreen/dispose behavior |
| C28 | Journey capture and review (Evidence) | Real input + state/pixel capture; Existing Journey/BundleManifest extension | Accepted journeys/tooling | Integration specified | Capture failures retained; authored film not proof |
| C29 | Critical aesthetic iteration (Quality) | Frame/motion critique + revise; Annotated review + corrected evidence | PhenoDesign | Specified | Review weakest dimensions; no numeric score hides hard failure |
| C30 | Multi-consumer integration (Architecture) | Reuse after demonstrated commonality; Narrow shared adapter + compatibility | PhenoDesign | Specified | Two real consumers, no duplicate source/queue/proof owner |

Machine-readable entries and paths: `plan/capabilities.json`. Existing all-forms canaries and source recipes remain in the preserved prior archives. Qualification does not propagate from one medium to another.
