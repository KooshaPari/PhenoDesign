# PhenoDesign · Scene Experiences v3

**Direction:** authored, spatial, interactive experiences—not posters with animation attached.
**Destination:** the existing `<REDACTED>/PhenoDesign`. **Delivery:** a repo-ready local package; no remote changes.

Begin with `docs/DESIGN-DIRECTION.md`, then `docs/CAPABILITY-MATRIX.md` and `docs/REPO-INTEGRATION.md`.
The executable teaching specimen is `specimen/index.html`; its source is beside it.
`index.html` is the offline document/resource browser. `AGENT-HANDOFF.md` is the execution instruction.

## What is new

This package adds the scene-oriented direction, formal requirements, scene/state contract,
capability matrix, choreography vocabulary, creative review rubric, 18 task-specific skills,
a six-scene interactive optical-instrument specimen, native Blender recipe, Remotion adapter,
reference research, test fixtures and a guarded additive installer.

The specimen is **spatial blocking and interaction architecture**, using projected geometry and
SVG/DOM, not a claim of Apple-level photoreal art direction. Native assets and production renderers
remain separately qualified. Read `evidence/VALIDATION.md` before repeating a test claim.

## One authoritative continuation, not competing v2 packages

Two different v2 archives were delivered earlier. Both are preserved byte-for-byte under
`prior-kits/`; neither is automatically applied. V3 governs the scene direction. The most recent
`phenodesign-creative-production-v2.zip` is the default historical implementation reference;
`phenoDesign-visual-production-v2.zip` contains additional alternatives, not a second runtime owner.
Reconcile useful code against the actual repo. Never run both old overlays indiscriminately.
Neither archive's old tests are counted as new validation. No fonts or proprietary software are added.

## Execute locally

```sh
node --test tests/*.test.mjs
python -m unittest discover -s tests -p 'test_*.py' -v
python scripts/build_specimen.py
python scripts/browser_check.py --transport inline --out evidence/local-browser
# On a host that permits local navigation, use the actual served consumer:
python scripts/browser_check.py --transport http --out evidence/local-http
python integration/install.py --repo /path/to/PhenoDesign
# Read the plan, acquire the repo write lease, then explicitly apply:
python integration/install.py --repo /path/to/PhenoDesign --apply
```

Node and Python are needed for checks; the Python contract suite needs jsonschema.
Browser checks additionally need Playwright, Pillow and a qualified Chromium binary.
`requirements-checks.txt` records the versions used here; reuse an approved environment
or create a project-local virtual environment. Python dependencies and browser binaries
are deliberately not bundled.
No dependency is installed by these commands. The installer adds only its own scene-experience
subdirectory; it does not alter existing Remotion, tokens, public exports, policy or CI.

The retained film frames and old archives are handoff/evidence material, not production
runtime dependencies. The additive installer stages this complete handoff for reconciliation;
follow existing repository/artifact retention policy rather than committing all historical
archives and PNG frames indiscriminately. Keep only the chosen live implementations in the
production dependency graph. Browser launch flags in the local fixture are not a recommended
security policy for browsing untrusted sites.
