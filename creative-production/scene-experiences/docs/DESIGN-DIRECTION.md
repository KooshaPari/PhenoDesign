# Scene-driven experience design

**Version:** 3.0 · **Status:** implementation direction proposed for PhenoDesign.
**User authority:** the request for dynamic, interactive, multidimensional, fourth-wall-aware
web experiences resembling a life-size diorama. The product is the experience, not a framed poster.

## 1. North star

Design the world before the page. Decide what exists, how it is situated, what is revealed,
what the visitor can change, and what they should understand afterward. Then select the
least burdensome combination of native assets, web renderers and semantic UI that preserves
that experience. The visitor can approach, inspect, alter, separate, reassemble or pass through
parts of the world. The interface behaves like a view into a coherent place, not a row of
independent marketing cards.

“Life-size” is a scale impression, not a physical measurement from an uncalibrated browser.
“Fourth-wall” means an authored relation between viewer, object and interface—not surveillance,
fake browser dialogs or an inference that the page knows the visitor's emotions.
“Over-engineered” describes visible craft and expressive capability, not wasted engineering.

The spinning shoe is one prop behavior. It is not a sufficient experience architecture.
A better sequence establishes the shoe's physical setting, makes ground contact and flex legible,
shows what the material does, invites a relevant manipulation, changes scale to its construction,
and brings that understanding back into a usable purchase/comparison flow. An orbit can appear
within that sequence, but cannot substitute for it.

## 2. Five governing qualities

**Spatial continuity.** Subjects have persistent identity, coherent scale cues and a relation to
floor, environment, light and camera. Foreground occlusion, contact shadows and perspective
must agree. A disconnected 3D ornament above a brochure is not enough.

**Choreography.** Changes have timing, focus and causality. Entry, hold, action, consequence,
recovery and exit are deliberate. A quiet hold can be the right scene; mandatory constant motion
would directly undermine this direction.

**Agency.** Interaction changes a meaningful state: construction, aperture, configuration,
viewpoint, path or understanding. Cursor-following alone is a micro-response, not meaningful
agency. Drag, keyboard and touch alternatives lead to equivalent outcomes.

**Material specificity.** Materials are not a universal glass preset. The subject's manufacturing,
scale, use and environment determine roughness, thickness, refraction, texture, softness,
weathering and lighting. An abstract world may use stylization, but must use it consistently.

**Useful resolution.** The visitor can finish the real task without performing the whole show.
The scene can collapse into an ordinary, legible comparison, navigation, configuration or action.
No cinematic entrance is worth hiding essential information or trapping someone in a scroll track.

## 3. The design unit is a scene

A scene record contains a purpose, subject, environment, camera/framing, lighting, state,
trigger, visitor affordance, text role, continuity constraint, exit, and accessible/static rendition.
Scenes may span multiple scroll sections or routes. A page is a delivery container; it is not
necessarily the narrative boundary. Stable asset IDs and configuration survive the boundary.

Compose three scales when the subject benefits: world scale, object scale and material/detail
scale. A macro transition should explain a detail, not merely enlarge an image. Macro imagery,
2.5D planes, real meshes and semantic text may coexist. A transition should preserve a visual
anchor—shape, centerline, highlight, hand contact or color—not cut to an unrelated composition.

Use camera motion sparingly. Test an object transform against a camera transform; they convey
different meaning. A dolly changes perspective while an optical zoom does not. Simulated rack
focus can direct attention, but cannot make mandatory labels unreadable. Keep an ordinary DOM
version of information placed in the world.

## 4. Reference discipline

The reviewed Apple iPhone product page is a structure/material/detail reference. Its published
content supports a progression through design, internals and camera capabilities; this package
has not reverse-engineered or measured its live animation implementation. Do not claim Apple
uses this package's chosen renderer. [R01]

Makemepulse's Nomadic Tribe explicitly describes four interactive narrative chapters; it is a
useful reference for a world that changes as the visitor participates, not just a product turntable.
Nike Reactland is documented as a running-controlled **physical installation**. Borrow the
relationship between bodily input and consequence, not its installation hardware as a web baseline.
[R02, R03]

Reference cards record what was actually inspected, the desired principle, the proposed transfer,
and what must not be copied. Screenshots and Dribbble shots can suggest composition; they do not
prove transitions, loading behavior, mobile usability, source editability or accessibility.

## 5. Formal requirements

| ID | Requirement | Acceptance evidence |
|---|---|---|
| DIR-01 | Write a subject-specific dramatic premise and a real visitor task. | Treatment names both and connects each major beat to them. |
| DIR-02 | Compare at least two plausible alternative executions. | Decision card includes why the chosen route wins and what would reverse it. |
| DIR-03 | Keep important objects and configuration continuous between scenes. | Reverse and direct-entry tests preserve identity/state. |
| DIR-04 | Define coherent world, object and detail scale where useful. | Board + captured transitions; no unexplained perspective/scale jump. |
| DIR-05 | Give each conspicuous effect a narrative or functional purpose. | Remove the effect; document the lost information or experiential role. |
| DIR-06 | Provide at least one meaningful input-consequence loop in the flagship specimen. | Real pointer/touch/keyboard input changes state and visible output. |
| DIR-07 | Do not force an interaction in every scene. | Holds, exposition and task completion remain viable. |
| DIR-08 | Preserve editable, named, rights-cleared source masters. | Native cold reopen, dependency inventory and export recipe. |
| DIR-09 | Pick the medium per scene and support hybrid composition. | Renderer decision, transition seams and consumer checks. |
| DIR-10 | Make time/scroll/interaction ownership explicit. | One evaluator or bounded mixer; no simultaneous competing writers. |
| DIR-11 | Respect reverse, seek, refresh, resize and route transitions. | Boundary/restore tests on a served consuming surface. |
| DIR-12 | Keep mandatory content and actions semantic. | DOM reading order, focus, labels and no-JS/static view. |
| DIR-13 | Provide reduced-motion and constrained-device renditions. | Same conclusions and actions without continuous camera motion. |
| DIR-14 | Preserve native scroll and offer direct scene/task access. | No wheel interception, scroll trap, unskippable loader or hidden CTA. |
| DIR-15 | Treat interface/scene overlap intentionally. | Protected focus/controls and legible type at all tested sizes. |
| DIR-16 | Keep viewer awareness local, explicit and bounded. | No covert sensors, emotion inference, hidden tracking or deceptive chrome. |
| DIR-17 | Budget actual client and authoring resources. | Transfer, frame-time, memory, hidden/offscreen behavior and worker limits. |
| DIR-18 | Validate the real renderer separately from fallback. | Report backend/device; fallback success cannot satisfy GPU qualification. |
| DIR-19 | Separate authored presentation from captured evidence. | Raw masters immutable; edits, crop and time mapping recorded. |
| DIR-20 | Complete source-to-consumer validation before capability acceptance. | Source reopen, export, import, behavior/pixels and actual consumer result. |
| DIR-21 | Preserve existing repo contracts and ownership. | Explicit integration map; no duplicated evidence registry/runtime owner. |
| DIR-22 | Review visual quality independently of structural tests. | Critique names problems and links corrected frames; no score substitutes for judgment. |
| DIR-23 | Retain accepted brand direction without universalizing one look. | Subject treatment names token inheritance and deliberate exceptions. |
| DIR-24 | Let the visitor leave, reset and reach utility. | Accessible exit/reset/task link, no forced gesture or sound. |

## 6. Non-goals and corrections

This direction does not ban editorial layouts, poster art, ordinary controls, component libraries,
static media or commercial CTAs. Those remain important capabilities. It rejects using their
composition model as the unexamined default for this particular flagship experience.

Not every project needs 3D. A layered illustration, a tactile vector mechanism or a carefully
composited sequence may create a more convincing world at lower cost. Conversely, a static
poster is not an adequate fallback for a task that needs configuration or spatial inspection;
preserve the task through a semantic alternate interface.

Do not build a new engine just to demonstrate ownership. Reuse existing Three.js/R3F, DOM/SVG,
Rive, GSAP, native scroll or time-based renderers when justified. A pure state evaluator can
coordinate them; it should not become a universal scene language before two real consumers
prove the common abstraction. [R04–R10]

## 7. Definition of done

A scene experience is accepted only when the intended task and dramatic premise survive actual
use, source editing and export, target-device constraints and fallbacks. Passing code checks
is necessary but does not establish art direction. A visually impressive recording does not
establish interaction. A working inline specimen does not establish deployment. Keep these
observations separate and link them through the existing journeys/evidence system.

The first complete slice should be small enough to critique as a whole and rich enough to
falsify the weak interpretation: environment, multiple related objects/layers, change of scale,
meaningful input, continuity and a useful exit—not another isolated rotating mesh.
