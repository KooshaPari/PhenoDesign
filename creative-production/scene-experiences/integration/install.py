#!/usr/bin/env python3
"""Guarded additive installer. Never overwrites differing files; defaults to dry-run."""
from __future__ import annotations
import argparse, hashlib, json, os, re, sys, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DEST=Path('creative-production/scene-experiences')
class Conflict(RuntimeError): pass

def digest(path:Path)->str:
    h=hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda:stream.read(1024*1024),b''):h.update(block)
    return h.hexdigest()

def no_symlink(path:Path)->None:
    path=path.absolute()
    for item in [path,*path.parents]:
        if item.is_symlink():raise Conflict(f'Symlink path refused: {item}')

def safe_rel(text:str)->Path:
    p=Path(text)
    if not text or p.is_absolute() or '..' in p.parts or '\\' in text or ':' in text:raise Conflict(f'Unsafe relative path: {text}')
    return p

def verify_manifest(root:Path)->dict[str,str]:
    manifest=root/'MANIFEST.sha256'
    if not manifest.is_file():raise Conflict('Missing source MANIFEST.sha256; build/verify package first')
    entries={}
    for line in manifest.read_text().splitlines():
        if not line:continue
        match=re.fullmatch(r'([0-9a-f]{64})  (.+)',line)
        if not match:raise Conflict('Invalid manifest line')
        sha,text=match.groups();rel=safe_rel(text);p=root/rel;no_symlink(p)
        if text in entries:raise Conflict('Duplicate manifest path')
        if not p.is_file() or digest(p)!=sha:raise Conflict(f'Source integrity failed: {rel}')
        entries[text]=sha
    if not entries:raise Conflict('Empty manifest')
    return entries

def plan(repo:Path,root:Path=ROOT,activate:str='none')->list[dict]:
    no_symlink(repo)
    repo=repo.absolute()
    if not repo.is_dir():raise Conflict('Target repository directory does not exist')
    no_symlink(repo/'package.json')
    try: package=json.loads((repo/'package.json').read_text())
    except (OSError,ValueError) as e:raise Conflict('Cannot read target package.json') from e
    if package.get('name')!='@phenotype/design':raise Conflict('Expected target @phenotype/design; reconcile repo identity first')
    entries=verify_manifest(root);pairs=[]
    for text,sha in entries.items():
        rel=safe_rel(text)
        if '__pycache__' in rel.parts or any(x.startswith('.') for x in rel.parts):continue
        pairs.append((root/rel,repo/DEST/rel,sha))
    # The manifest itself is copied as an observation of installed source, not a signed attestation.
    pairs.append((root/'MANIFEST.sha256',repo/DEST/'MANIFEST.sha256',digest(root/'MANIFEST.sha256')))
    if activate not in ('none','codex','forge','both'):raise Conflict('Unknown skill activation target')
    if activate!='none':
        targets=[]
        if activate in ('codex','both'):targets.append('.agents/skills')
        if activate in ('forge','both'):targets.append('.forge/skills')
        for s in sorted((root/'skills').glob('pd-*/SKILL.md')):
            if not re.fullmatch(r'pd-[a-z0-9-]+',s.parent.name):raise Conflict('Invalid skill name')
            for target in targets:pairs.append((s,repo/target/s.parent.name/'SKILL.md',digest(s)))
    result=[]
    for src,dst,sha in pairs:
        no_symlink(dst)
        for parent in dst.parents:
            if parent==repo:break
            if parent.exists() and not parent.is_dir():raise Conflict(f'Parent is not a directory: {parent}')
        if dst.exists():
            if not dst.is_file() or digest(dst)!=sha:raise Conflict(f'Existing differing file: {dst}')
            action='unchanged'
        else:action='create'
        result.append({'source':str(src),'target':str(dst),'sha256':sha,'action':action})
    return result

def apply(repo:Path,root:Path=ROOT,activate:str='none')->dict:
    # Only coordinates this installer; the caller must also use the existing repo write lease.
    lock=repo/'.pd-scenes-v3.lock';no_symlink(lock)
    try:fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY,0o600)
    except FileExistsError as e:raise Conflict('Installer lock exists; do not remove another worker lock') from e
    created=[];dirs=[];warnings=[]
    try:
        os.write(fd,str(os.getpid()).encode());os.close(fd)
        operations=plan(repo,root,activate)
        for op in operations:
            if op['action']=='unchanged':continue
            src,dst=Path(op['source']),Path(op['target']);no_symlink(dst)
            if digest(src)!=op['sha256']:raise Conflict('Source changed during installation')
            missing=[];p=dst.parent
            while not p.exists():missing.append(p);p=p.parent
            for p in reversed(missing):p.mkdir();dirs.append(p)
            no_symlink(dst)
            tf=None
            try:
                with tempfile.NamedTemporaryFile(dir=dst.parent,prefix='.pd-v3-',delete=False) as f:
                    tf=Path(f.name);f.write(src.read_bytes());f.flush();os.fsync(f.fileno())
                # Link publishes a complete file without ever overwriting a competing file.
                os.link(tf,dst);created.append((dst,op['sha256']))
            finally:
                if tf is not None:tf.unlink(missing_ok=True)
        return {'created':len(created),'unchanged':sum(o['action']=='unchanged' for o in operations),'warnings':warnings}
    except Exception:
        for path,sha in reversed(created):
            if path.is_file() and not path.is_symlink() and digest(path)==sha:path.unlink()
            else:warnings.append(f'Preserved concurrently changed file: {path}')
        for p in reversed(dirs):
            try:p.rmdir()
            except OSError:pass
        if warnings:print('\n'.join(warnings),file=sys.stderr)
        raise
    finally:
        try:os.close(fd)
        except OSError:pass
        lock.unlink(missing_ok=True)

def main()->int:
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--repo',type=Path,required=True);p.add_argument('--apply',action='store_true');p.add_argument('--activate-skills',choices=['none','codex','forge','both'],default='none')
    a=p.parse_args()
    try:
        if a.apply:result=apply(a.repo.absolute(),activate=a.activate_skills)
        else:
            operations=plan(a.repo.absolute(),activate=a.activate_skills)
            result={'mode':'DRY_RUN','create':sum(o['action']=='create' for o in operations),'unchanged':sum(o['action']=='unchanged' for o in operations),'destination':str(a.repo/DEST),'operations':operations}
        print(json.dumps(result,indent=2));return 0
    except (Conflict,OSError,ValueError) as e:print(f'INSTALLATION REFUSED: {e}',file=sys.stderr);return 2
if __name__=='__main__':raise SystemExit(main())
