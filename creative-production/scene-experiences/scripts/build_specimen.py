#!/usr/bin/env python3
"""Build one offline artifact from the exact source modules used by tests."""
import json, re, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def build():
    core=(ROOT/'runtime/scene-core.mjs').read_text()
    drawing=(ROOT/'specimen/draw.mjs').read_text()
    controller=(ROOT/'specimen/controller.js').read_text()
    script=re.sub(r'^export ', '', core+'\n'+drawing, flags=re.MULTILINE)+'\n'+controller
    if '</script' in script.lower():raise ValueError('Unexpected script closing tag in source')
    node="import {evaluateScene} from './runtime/scene-core.mjs';import {renderSceneSVG} from './specimen/draw.mjs';console.log(renderSceneSVG(evaluateScene(0),1440,900));"
    static=subprocess.run(['node','--input-type=module','-e',node],cwd=ROOT,text=True,capture_output=True,check=True,timeout=20).stdout.strip()
    text=(ROOT/'specimen/template.html').read_text().replace('/*STYLE*/',(ROOT/'specimen/style.css').read_text()).replace('/*STATIC*/',static).replace('/*SCRIPT*/',script)
    target=ROOT/'specimen/index.html';target.write_text(text)
    (ROOT/'specimen/poster.svg').write_text(static+'\n')
    return target
if __name__=='__main__': print(build())
