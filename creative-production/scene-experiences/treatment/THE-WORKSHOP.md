# M1 Treatment: The Workshop

## Subject

The PhenoDesign component workshop — a living material library where visitors can see, touch and reconfigure design tokens in spatial context.

## Visitor task

Understand how PhenoDesign's token system (glass, neumorphism, keycap, materials, polygons, typography) produces real visual output, and arrive at a configuration they can take away.

## Dramatic premise

Every design system has a documentation page with color swatches and code snippets. This scene inverts that: the tokens are physical objects in a room. The visitor enters a quiet workshop where material samples are arranged on shelves, light passes through glass specimens, and the neumorphism samples cast real shadows. By manipulating a single control — an aperture or lens — the visitor changes how light interacts with every material simultaneously, watching glass roughness, shadow depth, keycap relief and polygon faceting respond to one coherent change. The point is not "look, animation" — it is "these tokens are related, and here is how."

## Medium comparison

| Route | What it is | Strengths | Weaknesses | Verdict |
|---|---|---|---|---|
| **A: SVG/DOM layered scene** | Multiple SVG layers with CSS transforms, scroll-driven camera, pointer-reactive lighting | Fast, accessible, no GPU required, works on all devices, easy to edit | Limited depth perception, no real 3D occlusion, material simulation is approximate | **Chosen** — best first slice, proves the concept without GPU dependency |
| B: Three.js/R3F WebGL | Real 3D scene with PBR materials | True spatial depth, realistic materials | Heavy bundle, inaccessible on low-end devices, harder to edit source, GPU qualification required | Better for M3+ after proving the concept |
| C: Remotion film | Pre-rendered frame sequence | Pixel-perfect, deterministic | No interactivity, no real-time response, visitor cannot change state | Better for M4 cross-media path |

**Why A wins:** The first slice must prove spatial continuity, meaningful input-consequence, and useful resolution — all achievable with SVG/DOM. WebGL adds visual fidelity but blocks on GPU qualification (M6) and makes source editing harder (M2). The SVG route lets us validate the scene contract, choreography vocabulary and interaction grammar before committing to a renderer.

**Reversal condition:** If SVG layering cannot produce convincing depth cues (parallax, occlusion, contact shadows) within the six-beat sequence, switch to R3F for the depth-dependent scenes only.

## Six-beat board

### Beat 1: Establish — "A room with samples"

- **Camera:** Wide shot, slight perspective. The workshop fills the viewport.
- **Environment:** Dark floor, soft ambient light, shelves with material samples at left and right.
- **Objects:** Glass specimen (center), keycap row (left shelf), neumorphism block (right shelf), polygon facets (back wall).
- **Lighting:** Single soft directional from upper-right. Subtle floor reflection.
- **Text:** "PhenoDesign" title, minimal. No explanation yet.
- **Input:** Scroll to advance. Pointer movement causes subtle parallax on layers.
- **State:** All tokens at default values.
- **Exit:** Scroll down or click any sample to jump to its detail.

### Beat 2: Approach — "Focus on the glass"

- **Camera:** Dolly in toward the central glass specimen. Shelves recede.
- **Objects:** Glass specimen fills center-third. Other objects visible but peripheral.
- **Lighting:** Light source becomes more defined. Glass shows refraction and roughness.
- **Text:** "Material: Glass" label fades in.
- **Input:** Scroll continues dolly. Pointer over glass shows a subtle highlight shift.
- **State:** Glass roughness value displayed: `0.15`.
- **Transition:** Parallax layers separate as camera moves in. Depth cues emerge from layer ordering.

### Beat 3: Reveal — "Light passes through"

- **Camera:** Close on glass. The aperture control appears at bottom.
- **Objects:** Glass specimen, aperture ring (diegetic control), projected light pattern on floor.
- **Lighting:** Light now clearly passes through glass, creating caustic-like pattern.
- **Text:** "Aperture controls light intensity and material response."
- **Input:** **Meaningful interaction** — drag the aperture ring or use arrow keys. The light pattern, glass brightness, and floor reflection all change coherently.
- **State:** Aperture value: `0.0–1.0`. Affects glass opacity, light cone angle, floor pattern size.
- **Acceptance:** Dragging aperture changes visible state in glass, light pattern, and shadow simultaneously. Keyboard alternative works. State persists if visitor scrolls away and returns.

### Beat 4: Participate — "Configure the material"

- **Camera:** Pull back slightly to show glass + keycap + neumorphism together.
- **Objects:** All three material types now visible. Aperture still active.
- **Lighting:** Aperture change now affects all materials — keycap shadow depth changes, neumorphism relief shifts, glass refraction adjusts.
- **Text:** "One control. Every material responds."
- **Input:** Aperture continues to work. Click a material sample to see its token values.
- **State:** Visitor has chosen an aperture setting. This choice persists.
- **Acceptance:** The visitor understands that tokens are connected. The aperture is the "one coherent change" that demonstrates material specificity.

### Beat 5: Change scale — "Inside the token"

- **Camera:** Zoom into the keycap at macro scale. See the relief, shadow, and surface texture.
- **Objects:** Single keycap fills viewport. The neumorphism shadow is visible as depth.
- **Lighting:** Directional light now reveals surface detail. Shadow is crisp.
- **Text:** Token values displayed: `shadow-depth: 4px`, `relief: 2px`, `surface: #1a1a2e`.
- **Input:** Scroll to zoom. Pointer position shifts the light angle subtly.
- **State:** Visitor can read actual token values. These are the same values used in phenoDesign CSS.
- **Acceptance:** The macro view explains what the token does, not just what it looks like.

### Beat 6: Resolve — "Take it with you"

- **Camera:** Pull back to full workshop view. All samples visible with visitor's chosen aperture.
- **Objects:** Workshop at rest. Visitor's configuration is visible in all materials.
- **Lighting:** Matches visitor's aperture choice.
- **Text:** "Your configuration" + CSS variable output + copy button. Link to full documentation.
- **Input:** Copy CSS button (functional). Link to phenoDesign docs. Reset button to return to defaults.
- **State:** Final configuration is exportable as CSS custom properties.
- **Acceptance:** Visitor can copy usable CSS. Reset returns to defaults. The real task (understanding tokens) is complete without having watched the whole show — the CSS output is available from beat 3 onward.

## Continuity rules

- Glass, keycap, neumorphism, polygon objects maintain identity across all beats.
- Aperture value persists through scroll, reverse, direct entry and resize.
- Light direction is consistent (upper-right) unless the visitor moves it.
- Floor reflection is present whenever the floor is visible.
- No beat requires the visitor to perform an action — each is complete as an observation.

## Fallback

- **No JS:** Static workshop illustration with semantic labels and links to documentation.
- **Reduced motion:** All camera transitions become instant cuts. Aperture interaction still works. No parallax.
- **Low-end device:** SVG layers only, no blur filters, simplified shadows.

## Token inheritance

Inherits from phenoDesign's existing token system:
- `glass` — opacity, blur, tint used for the glass specimen
- `neumorphism` — shadow depth, relief, surface color for the neumorphism block
- `keycap` — relief, surface, legend for the keycap row
- `polygons` — faceting, stroke, fill for the back wall
- `materials` — shared material properties
- `typography` — label and value text styles

No new tokens are introduced. The scene is a spatial presentation of existing tokens.

## Acceptance summary

| Requirement | How met |
|---|---|
| DIR-01 Real subject/task | Workshop + token configuration task |
| DIR-02 Alternative comparison | SVG/DOM vs Three.js vs Remotion decision card above |
| DIR-03 Object continuity | Same 4 objects across 6 beats |
| DIR-04 Coherent scales | World → object → material macro |
| DIR-05 Purpose per effect | Parallax = depth, aperture = material response, zoom = explanation |
| DIR-06 Input-consequence | Aperture drag changes glass, shadows, light pattern |
| DIR-07 No forced interaction | Each beat works as observation |
| DIR-08 Editable source | SVG + JS, no binary assets required |
| DIR-09 Medium per scene | SVG/DOM for all 6 beats (hybrid not needed for first slice) |
| DIR-10 State ownership | One evaluator, no competing writers |
| DIR-11 Reverse/seek | Aperture state preserved on reverse scroll |
| DIR-12 Semantic content | CSS output, labels, documentation link in DOM |
| DIR-13 Reduced motion | Instant cuts, no parallax, interaction preserved |
| DIR-14 Native scroll | No scroll interception |
| DIR-15 Interface overlap | Controls have protected hit areas |
| DIR-16 Local awareness | No sensors, no tracking |
| DIR-17 Resource budget | SVG-only, <50KB total assets |
| DIR-18 Renderer validation | SVG is the renderer; fallback is static |
| DIR-19 Evidence separation | Film frames from specimen, not this treatment |
| DIR-20 Source-to-consumer | SVG source → browser render → CSS output |
| DIR-21 Existing contracts | Inherits phenoDesign tokens, no new registries |
| DIR-22 Visual quality | Independent review after implementation |
| DIR-23 Brand direction | PhenoDesign dark theme, existing tokens |
| DIR-24 Exit/reset | CSS copy, doc link, reset button |
