import hashlib,importlib.util,json,tempfile,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('install',ROOT/'integration/install.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Installation(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.home=Path(self.tmp.name);self.repo=self.home/'repo';self.repo.mkdir();(self.repo/'package.json').write_text('{"name":"@phenotype/design"}')
  self.source=self.home/'source';self.source.mkdir();(self.source/'README.md').write_text('original');self.refresh()
 def tearDown(self):self.tmp.cleanup()
 def refresh(self):
  lines=[]
  for p in sorted(self.source.rglob('*')):
   if p.is_file() and p.name!='MANIFEST.sha256':lines.append(f'{m.digest(p)}  {p.relative_to(self.source).as_posix()}')
  (self.source/'MANIFEST.sha256').write_text('\n'.join(lines)+'\n')
 def test_dry_run_no_write(self):m.plan(self.repo,self.source);self.assertFalse((self.repo/m.DEST).exists())
 def test_apply_creates(self):self.assertEqual(m.apply(self.repo,self.source)['created'],2)
 def test_idempotent(self):m.apply(self.repo,self.source);self.assertEqual(m.apply(self.repo,self.source)['created'],0)
 def test_conflict_preflight(self):
  dst=self.repo/m.DEST/'README.md';dst.parent.mkdir(parents=True);dst.write_text('newer');
  with self.assertRaises(m.Conflict):m.apply(self.repo,self.source)
  self.assertEqual(dst.read_text(),'newer');self.assertFalse((dst.parent/'MANIFEST.sha256').exists())
 def test_wrong_repo(self):
  (self.repo/'package.json').write_text('{"name":"other"}')
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_corrupt_source(self):
  (self.source/'README.md').write_text('tampered')
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_escape(self):
  (self.source/'MANIFEST.sha256').write_text('0'*64+'  ../x\n')
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_duplicate_manifest(self):
  f=self.source/'MANIFEST.sha256';f.write_text(f.read_text()*2)
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_symlink_parent(self):
  elsewhere=self.home/'elsewhere';elsewhere.mkdir();(self.repo/'creative-production').symlink_to(elsewhere,target_is_directory=True)
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_symlink_package(self):
  (self.repo/'package.json').unlink();f=self.home/'pkg';f.write_text('{"name":"@phenotype/design"}');(self.repo/'package.json').symlink_to(f)
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
 def test_lock_does_not_delete_existing(self):
  f=self.repo/'.pd-scenes-v3.lock';f.write_text('other')
  with self.assertRaises(m.Conflict):m.apply(self.repo,self.source)
  self.assertEqual(f.read_text(),'other')
 def test_lock_cleanup(self):m.apply(self.repo,self.source);self.assertFalse((self.repo/'.pd-scenes-v3.lock').exists())
 def test_skill_activation(self):
  p=self.source/'skills/pd-test/SKILL.md';p.parent.mkdir(parents=True);p.write_text('test');self.refresh();m.apply(self.repo,self.source,'both')
  self.assertEqual((self.repo/'.agents/skills/pd-test/SKILL.md').read_text(),'test');self.assertEqual((self.repo/'.forge/skills/pd-test/SKILL.md').read_text(),'test')
 def test_parent_file_refused(self):
  (self.repo/'creative-production').write_text('owned file')
  with self.assertRaises(m.Conflict):m.plan(self.repo,self.source)
if __name__=='__main__':unittest.main()
