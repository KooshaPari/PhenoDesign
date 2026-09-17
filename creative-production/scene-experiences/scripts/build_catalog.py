#!/usr/bin/env python3
"""Build offline HTML views and resource browser from source Markdown/JSON."""
from pathlib import Path
import json, html, re
import mistune
R=Path(__file__).resolve().parents[1]
def write(p,s):
 q=R/p;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(s,encoding='utf-8')
# Render portable documentation from the original Markdown; no third-party assets.
css='''*{box-sizing:border-box}html{color-scheme:dark}body{margin:0;background:#0f181e;color:#ecf0ef;font:16px/1.65 system-ui,sans-serif}a{color:#9acdc5;text-underline-offset:.22em}a:focus-visible,input:focus-visible{outline:3px solid #c9e8d9;outline-offset:4px}header,main,footer{width:min(1120px,calc(100% - 40px));margin:auto}header{padding:26px 0;border-bottom:1px solid #3a4b51}header p{margin:0;color:#abbec3}.brand{color:#ecf0ef;text-decoration:none;font-size:20px}main{padding:45px 0 72px}h1{font-size:clamp(2.2rem,5vw,4.3rem);line-height:1.08;letter-spacing:-.045em;max-width:18ch;margin:0 0 24px}h2{margin:42px 0 16px;font-size:1.75rem;letter-spacing:-.025em}h3{font-size:1.2rem}p,li{max-width:85ch}pre{background:#17252c;border:1px solid #34454c;padding:20px;overflow:auto;font-size:.86rem}code{font-family:ui-monospace,monospace}table{display:block;overflow:auto;border-collapse:collapse;width:100%;font-size:.93rem}th,td{border-bottom:1px solid #3a4b51;padding:13px 12px;text-align:left;vertical-align:top;min-width:130px}th{color:#accec9}blockquote{margin:28px 0;padding:8px 24px;border-left:3px solid #7ebab5;color:#cfdfdd}footer{padding:24px 0;color:#b3c1c5;border-top:1px solid #3a4b51;font-size:.85rem}.lede{font-size:1.25rem;color:#c4d3d5;max-width:67ch}.nav{display:flex;gap:16px;flex-wrap:wrap;margin-top:18px}.nav a{border:1px solid #42565e;padding:10px 16px;border-radius:6px;text-decoration:none}.metrics{display:flex;flex-wrap:wrap;gap:22px;color:#aec5c5;margin:28px 0}.entries{list-style:none;padding:0}.entry{display:grid;grid-template-columns:170px 1fr;gap:12px;padding:20px 0;border-bottom:1px solid #34454c}.entry h3{margin:0}.entry p{margin:4px 0;color:#bdcace}.entry small{color:#a9bbbF}.entry[hidden]{display:none}.type{color:#8bb6b2;font-size:.88rem}.search{display:block;width:100%;padding:14px;color:#eff5f5;background:#17252c;border:1px solid #49616a;font:inherit;border-radius:6px}.notice{background:#17252c;border-left:3px solid #b6ccb9;padding:16px 20px}.preview{width:100%;height:auto;display:block;border:1px solid #34454c;margin:28px 0}.status{color:#b6d4ce}#count{color:#b3c4c9;font-size:.9rem}@media(max-width:580px){.entry{grid-template-columns:1fr}main{padding-top:30px}h1{font-size:2.6rem}.metrics{gap:10px 18px}}'''
write('site.css',css)
md=mistune.create_markdown(plugins=['table'])
mdfiles=[p for p in R.rglob('*.md') if not any(x in p.parts for x in ['prior-kits','html'])]
for p in mdfiles:
 rel=p.relative_to(R); dest=Path('html')/rel.with_suffix('.html')
 # Calculate root relative to this generated view.
 root='../'*len(dest.parent.parts)
 body=md(p.read_text())
 # Markdown-local links are uncommon; preserve their original resolved targets.
 def fix_link(m):
  val=m.group(1)
  if re.match(r'^[a-zA-Z][\w+.-]*:',val) or val.startswith('#'):return m.group(0)
  import posixpath
  resolved=posixpath.normpath((rel.parent/val).as_posix())
  if resolved.endswith('.md') and (R/resolved).exists():resolved='html/'+str(Path(resolved).with_suffix('.html'))
  return 'href="'+html.escape(root+resolved,quote=True)+'"'
 body=re.sub(r'href="([^"]+)"',fix_link,body)
 title=p.stem.replace('-',' ')
 write(dest,f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{html.escape(title)} · PhenoDesign</title><link rel="stylesheet" href="{root}site.css"><header><a class="brand" href="{root}index.html">PhenoDesign / Scene experiences</a><p>V3 · Source-backed working library</p></header><main>{body}</main><footer><a href="{root}{rel.as_posix()}">Original Markdown</a> · See <a href="{root}html/evidence/VALIDATION.html">validation boundaries</a>.</footer></html>')
items=[]
def item(kind,title,href,desc,extra=''):
 items.append({'kind':kind,'title':title,'href':href,'description':desc,'extra':extra})
for title,path,desc in [
 ('Formal design direction','docs/DESIGN-DIRECTION.md','The world-first brief, 24 requirements, meaningful agency, material specificity and purposeful stillness.'),
 ('Capability matrix','docs/CAPABILITY-MATRIX.md','30 families: creation routes, source artifacts, ownership, implementation states and acceptance.'),
 ('Repo integration plan','docs/REPO-INTEGRATION.md','Existing PhenoDesign, journeys and Remotion boundaries; additive locations, not a repository reorganization.'),
 ('Agent handoff','AGENT-HANDOFF.md','The execution instruction: reconcile, author, integrate, inspect, test and revise.'),
 ('Scene grammar','docs/SCENE-GRAMMAR.md','Subjects, camera, environment, light, persistent state, time and input ownership.'),
 ('Choreography vocabulary','docs/CHOREOGRAPHY-AND-PRIMITIVES.md','20 reusable dramatic mechanisms—not a checklist of effects.'),
 ('Renderer routing','docs/MEDIA-ROUTING.md','Compare DOM/SVG, 2.5D, live 3D, frame sequences and hybrids per scene.'),
 ('Creative review and acceptance','docs/REVIEW-AND-ACCEPTANCE.md','Independent visual criticism, behavioral evidence and hard failure gates.'),
 ('Cross-media E2E','docs/E2E-AND-CROSS-MEDIA.md','Native editable source to real scene, film and documented consumer.'),
 ('Reference study','docs/REFERENCE-STUDY.md','Apple, creator case studies and discovery shelves, with inspection limits.'),
 ('Six-beat storyboard','examples/STORYBOARD.md','Arrival, approach, construction, participation, threshold and resolution.'),
 ('Execution plan','plan/EXECUTION-PLAN.md','M0–M8 with dependencies and failure cases.'),
 ('Validation report','evidence/VALIDATION.md','47 Node tests, 30 Python tests, 41 inline browser checks; served/GPU/native limits.'),
 ('Installer guide','integration/README.md','Dry-run first, source hashes, no overwrite, existing policy preserved.')]:
 item('Document',title,'html/'+str(Path(path).with_suffix('.html')),desc)
item('Specimen','Lumen Chamber','specimen/index.html','Six scenes; aperture changes geometry and room light; finish and section state persist. SVG spatial blocking, not photoreal GPU rendering.')
item('Film','Authored scene study','specimen/scene-study.mp4','8-second deterministic presentation derivative, independently decoded. Not raw journey evidence or Remotion execution.')
item('Contract','Experience JSON Schema','contracts/experience.schema.json','Authored experience boundary only; does not replace Journey or BundleManifest.')
item('Source','Scene evaluator','runtime/scene-core.mjs','Pure state and frame mapping, reused by browser and the unexecuted Remotion adapter.')
item('Source','Blender native recipe','recipes/blender/build_chamber.py','Named editable mechanism/environment; recipe not executed in this environment.')
item('Source','Remotion adapter','recipes/remotion/SceneFilm.tsx','Frame-driven composition source; real Remotion rendering remains unexecuted.')
for s in json.loads((R/'skills/index.json').read_text())['skills']:
 item('Agent skill',s['name'],'html/'+str(Path(s['entry']).with_suffix('.html')),s['description'])
for v in json.loads((R/'resources/sources.json').read_text())['resources']:
 item('Reference',v['title'],v['url'],v['use'],v['inspection'])
for p in sorted((R/'docs/adr').glob('*.md')):
 item('Decision record',p.stem,'html/'+str(p.relative_to(R).with_suffix('.html')),p.read_text().splitlines()[0].lstrip('# '))
rows=[]
for i in items:
 target=' target="_blank" rel="noopener noreferrer"' if i['href'].startswith('https:') else ''
 rows.append(f'<li class="entry" data-search="{html.escape((i["kind"]+" "+i["title"]+" "+i["description"]+" "+i["extra"]).lower(),quote=True)}"><div class="type">{html.escape(i["kind"])}</div><div><h3><a href="{html.escape(i["href"],quote=True)}"{target}>{html.escape(i["title"])}</a></h3><p>{html.escape(i["description"])}</p>{("<small>"+html.escape(i["extra"])+"</small>") if i['extra'] else ""}</div></li>')
write('index.html',f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PhenoDesign · Scene experiences v3</title><link rel="stylesheet" href="site.css"><header><a class="brand" href="index.html">PhenoDesign / Scene experiences</a><p>A production library for authored interactive worlds.</p></header><main><h1>Stage the world.<br>Then build the page.</h1><p class="lede">Scenes with continuity, camera language, responsive materials and meaningful agency. Not a poster with a spinning object attached.</p><div class="metrics"><span>18 new agent skills</span><span>30 capability families</span><span>24 reference records</span><span>6-scene specimen</span></div><nav class="nav" aria-label="Start here"><a href="specimen/index.html">Enter the light chamber</a><a href="html/docs/DESIGN-DIRECTION.html">Read the design direction</a><a href="html/AGENT-HANDOFF.html">Give the agent its brief</a><a href="html/evidence/VALIDATION.html">Inspect validation</a></nav><a href="specimen/index.html"><img class="preview" src="evidence/browser/construction.png" width="1440" height="1000" alt="The optical instrument separates into related construction layers inside a lit room. Open the interactive scene study."></a><div class="notice"><strong>A working spatial prototype, not a finished launch campaign.</strong> The browser specimen uses SVG/projected geometry. Native Adobe/Blender, GPU rendering, real Remotion execution and PhenoDesign deployment still require qualification. The previous v2 kits are preserved; their installers are not automatically combined.</div><h2>Working library</h2><label for="search">Find a document, skill, source or reference</label><input class="search" id="search" type="search" placeholder="Try camera, Photoshop, agency, reduced motion…" autocomplete="off"><p id="count" aria-live="polite">{len(items)} entries</p><ul class="entries">{''.join(rows)}</ul><h2>Prior production kits</h2><p>Both archives are intact. V3 governs the scene direction; the latest creative-production v2 is the default historical implementation reference. Reconcile newer repository work before applying any older overlay.</p><nav class="nav"><a href="prior-kits/phenodesign-creative-production-v2.zip">Creative production v2</a><a href="prior-kits/phenoDesign-visual-production-v2.zip">Visual production v2</a><a href="prior-kits/PROVENANCE.json">Archive provenance</a></nav></main><footer>Original source and annotations. No external fonts or artwork included. Remote references open only on deliberate navigation. No repository was pushed or merged.</footer><script>const input=document.querySelector('#search'),rows=[...document.querySelectorAll('.entry')],count=document.querySelector('#count');input.addEventListener('input',()=>{{const terms=input.value.toLowerCase().trim().split(/\\s+/).filter(Boolean);let n=0;for(const row of rows){{row.hidden=!terms.every(t=>row.dataset.search.includes(t));if(!row.hidden)n++;}}count.textContent=n+' of '+rows.length+' entries';}});</script></html>''')
write('resources/catalog.json',json.dumps(items,indent=2)+'\n')
print('Generated',len(mdfiles),'HTML document views and',len(items),'catalog entries')
