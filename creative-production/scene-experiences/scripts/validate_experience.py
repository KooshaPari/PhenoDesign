#!/usr/bin/env python3
"""Validate syntax plus ordered scene ranges/IDs. Requires jsonschema for the JSON schema layer."""
from pathlib import Path
import argparse,json,math
import jsonschema
ROOT=Path(__file__).resolve().parents[1]
def validate(data:dict)->None:
    schema=json.loads((ROOT/'contracts/experience.schema.json').read_text())
    jsonschema.Draft202012Validator(schema).validate(data)
    def finite(x):
        if isinstance(x,float) and not math.isfinite(x):raise ValueError('Nonfinite JSON number')
        if isinstance(x,dict):
            for v in x.values():finite(v)
        elif isinstance(x,list):
            for v in x:finite(v)
    finite(data)
    ids=set();end=0.0
    for scene in data['scenes']:
        if scene['id'] in ids:raise ValueError('Duplicate scene ID')
        ids.add(scene['id']);lo,hi=scene['range']
        if abs(lo-end)>1e-7 or hi<=lo:raise ValueError('Scene ranges must be ordered, contiguous and positive')
        end=hi
        if 'none' in scene['input'] and len(scene['input'])!=1:raise ValueError('none cannot be mixed with input bindings')
    if abs(end-1)>1e-7:raise ValueError('Scenes must cover progress [0,1]')
    asset_ids=[a['id'] for a in data['assets']]
    if len(set(asset_ids))!=len(asset_ids):raise ValueError('Duplicate asset ID')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('file',type=Path);a=p.parse_args()
    validate(json.loads(a.file.read_text()));print('Valid authored scene document; not runtime/evidence certification.')
