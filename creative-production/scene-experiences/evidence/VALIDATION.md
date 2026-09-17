# Validation observations

## Executed in the preparation environment

| Layer | Observation | Evidence |
|---|---|---|
| Pure scene state, frame mapping and SVG geometry | **47 Node tests passed; 0 failed** | `node-tests.txt` |
| Scene contract, capability metadata and guarded installer | **30 Python tests passed; 0 failed** | `python-tests.txt` |
| Exact self-contained HTML, Chromium inline fixture | **41 checks passed** | `browser/results.json`, screenshots and `browser-run.txt` |
| Offline catalog | **6 checks passed; 234 local links resolved** | `catalog/results.json` |
| Source sanity | **14 Python/JS syntax checks; JSON parse and archive checks passed** | `source-checks.json` |
| Served local URL | **BLOCKED_ENV**: `ERR_BLOCKED_BY_ADMINISTRATOR` | `http/results.json`, `http-run.txt` |
| Authored image sequence → video | **96 frames; 960 × 554; 12 fps; 8 seconds; full decode passed** | `media-audit.json`, `media-probe.json`, encode/decode logs |
| Source archives | Both earlier v2 archives preserved byte-for-byte | `../prior-kits/PROVENANCE.json` and package checksums |

The browser run exercised chapter selection, keyboard aperture adjustment, finish
selection, section mode, native scroll, hold/resume, reset, motion preference and
state persistence. It compared actual screenshots, including the floor-light region,
rather than treating displayed state text as sufficient evidence. It checked 390 px
and 320 px mobile layouts, disabled JavaScript, page errors, outbound requests and
idle render behavior. Chromium was **144.0.7559.96**; WebGL2 was unavailable.

The inline fixture contains the actual generated HTML/JS/SVG/CSS. It does not exercise
HTTP headers, module delivery, caching, framework mounting, a deployment, or a target
product route. The HTTP attempt is retained as blocked; no fallback pass is substituted
for it. A separate offline catalog check, when recorded in `catalog/results.json`, is
navigation/UI validation for this package's documentation, not a product E2E test.

The media film is an authored deterministic presentation captured from explicit scene
positions. It is not raw journey evidence and was not rendered by Remotion. The full
PNG sequence remains available so the derivative is reproducible and inspectable.

## Not executed or not established

- Adobe Illustrator/Photoshop/After Effects host execution, license/session probing,
  native editable save and cold reopen on the user's devices.
- Blender execution of the included recipe, `.blend` cold reopen, generated GLB import,
  WebGL/WebGPU scene rendering or physical GPU/device performance.
- Remotion composition bundling, video rendering or a real documentation-player embed.
- PhenoDesign workspace build, target repo integration, current installed journey
  recorder/verifier behavior or production-browser/device matrix.
- Accessibility conformance certification, screen-reader testing or measured target
  hardware frame-time/memory/thermal budgets.
- Photoreal material/art-direction acceptance. This specimen proves spatial blocking
  and behavior; it does not meet a finished iPhone-launch campaign quality bar by itself.

The packaged film recipe was separately rerun and produced a byte-identical MP4 in
this environment. That is a bounded reproducibility observation, not a promise of
bit-identical output across browser/encoder versions or machines.

No remote repository was modified, pushed or merged. Native tools are user-reported
resources to qualify, not capabilities confirmed from this environment. The JSON
contract and review rubric describe acceptance; they do not declare all 30 families
implemented or independently verified.

## Reproduction

```sh
node --test tests/*.test.mjs
python -m unittest discover -s tests -p 'test_*.py' -v
python scripts/build_specimen.py
python scripts/browser_check.py --transport inline --out evidence/local-browser
python scripts/browser_check.py --transport http --out evidence/local-http
```

For the film, run the browser script with `--film`, then encode the frames using the
recipe in `../scripts/render_film.py`. No script installs dependencies automatically.
The installer tests use synthetic temporary target repositories; their pass does not
mean the real PhenoDesign checkout was updated.
