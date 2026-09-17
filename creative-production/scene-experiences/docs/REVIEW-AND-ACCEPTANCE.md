# Review the experience, not a screenshot count

## Critique rubric

Score each dimension 0–4 only when supported: 0 absent/broken, 1 demonstrable but weak,
2 coherent baseline, 3 intentionally strong, 4 distinctive and well-supported. These are an
internal creative rubric, not measured public quality claims. Missing observations are unknown,
not zero and not an average-friendly blank. Hard failures cannot be averaged away.

| Dimension | Ask | Inspect |
|---|---|---|
| Subject specificity | Could this treatment belong to any unrelated product? | Premise, forms, material vocabulary, copy |
| Spatial coherence | Does the world remain the same place? | Contact, perspective, shadows, continuity |
| Dramatic structure | Does something become understood? | Establish/reveal/consequence/resolve sequence |
| Agency | Does visitor input change something meaningful? | Real input, state, downstream visual consequence |
| Material craft | Do surfaces and light communicate the subject? | Neutral frame, close-up, moving highlights |
| Camera/motion | Is attention directed without exhausting the viewer? | Full playback, fast/reverse seek, holds |
| Typography/content | Does text belong without becoming unreadable? | Placement, semantic counterpart, localization |
| Interface/scene boundary | Is overlap intentional and usable? | Protected controls, focus, pointer/touch cases |
| Technical behavior | Does the real consumer remain stable? | Errors, resource/disposal, loading and budgets |
| Inclusive rendition | Is the meaning and task preserved without the spectacle? | Reduced motion, keyboard, no-rich-media path |
| Editorial honesty | Are product claims and evidence true? | Source provenance, raw capture, labeled concepts |
| Finish | Are small seams resolved? | Edges, crop, timing, empty/error states |

A flagship approval requires no hard blocker, no missing mandatory observations and a written
rationale for the weakest dimensions. Do not accept a new numeric threshold before calibrating
reviewers with shared examples. Evaluate a full narrative and interactions, not just the hero.

## Hard gates

Essential actions cannot be hidden by loading, camera travel or an inaccessible canvas. Pointer
interactions need keyboard/touch equivalents. Respect reduced motion; provide a way to pause
qualifying automatic motion. WCAG 2.2.2 is Level A under its stated conditions; 2.3.3 disabling
nonessential interaction animation is Level AAA. This pack adopts a motion-off route as product
policy without falsely calling every motion rule an AA requirement. Flash limits still apply. [R06]

All exports require rights/source custody and unambiguous concept labeling. Missing native
reopen, GPU output or real consumer verification stays unqualified. Do not use the app's own
state dump as independent evidence that its pixels match or that its business task succeeded.

## Initial budgets: proposals to measure, not industry guarantees

Keep critical semantic content available before rich media. Propose ≤500 KiB compressed initial
critical application payload excluding explicitly justified image media, lazy rich assets, a
small poster, and one active graphics context for the experience. Measure and revise with actual
content rather than silently dropping the defining scene to hit an arbitrary number.

Record transferred and decoded sizes separately. An RGBA8 1920×1080 frame occupies 8,294,400
bytes before overhead; 180 decoded frames occupy about 1.39 GiB. Compressed download size
is not decoded-memory cost. Use bounded windows/caches instead of pre-decoding an entire sequence.

On selected target devices measure input-to-state/pixel latency, frame-time p50/p95/p99 during
interaction, long tasks, layout shifts, CPU/GPU/memory, startup and dispose. Provisional budgets:
16.7 ms frame budget at 60 Hz; a deliberately documented 33.3 ms alternative at 30 Hz where the
experience tolerates it. These are refresh-period arithmetic, not measured device performance.
Use actual device/browser baselines for release; headless software tests are not hardware results.

Pause continuous work while hidden and suspend offscreen expensive renderers. Page Visibility
reports hidden/visible state; it does not determine whether a canvas is in the viewport, so use
an additional viewport observation. [R07] Preserve host gaming/DAW needs with bounded native
worker concurrency, cancellation and owned-resource cleanup.

## Required negative cases

Missing asset, corrupt model, decode failure, rejected native permission, unsupported backend,
context loss, resize at a seam, history/deep-link entry, reverse across every boundary, extreme
input, empty manifest, malformed schema, native source reopen failure, pause/resume, hidden-tab
return, non-pointer use, process cancellation, staging collision and concurrent-job isolation.

## Record the boundary

For every observation: artifact/build hash, environment, backend, actual input, expected and
observed state, pixels/video, errors, timing, verdict and limitations. Label synthetic fixtures.
Separate source validation, renderer output, served consumer, deployed consumer and target-device
qualification. Carry observations in the existing evidence system, not a second self-certifying log.
