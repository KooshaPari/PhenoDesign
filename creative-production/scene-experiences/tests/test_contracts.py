import copy, importlib.util,json,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('validator',ROOT/'scripts/validate_experience.py');v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
class Contracts(unittest.TestCase):
 def setUp(self):self.data=json.loads((ROOT/'examples/optical-instrument.experience.json').read_text())
 def test_example(self):v.validate(self.data)
 def reject(self,data):
  with self.assertRaises(Exception):v.validate(data)
 def test_duplicate_scene(self):self.data['scenes'][1]['id']=self.data['scenes'][0]['id'];self.reject(self.data)
 def test_gap(self):self.data['scenes'][1]['range'][0]=.2;self.reject(self.data)
 def test_reversed(self):self.data['scenes'][1]['range']=[.33333333,.16666667];self.reject(self.data)
 def test_missing_end(self):self.data['scenes'][-1]['range'][1]=.99;self.reject(self.data)
 def test_missing_start(self):self.data['scenes'][0]['range'][0]=.01;self.reject(self.data)
 def test_duplicate_asset(self):self.data['assets'][1]['id']=self.data['assets'][0]['id'];self.reject(self.data)
 def test_wrong_evidence_owner(self):self.data['evidenceOwner']='app-self-pass';self.reject(self.data)
 def test_unknown_field(self):self.data['random']=True;self.reject(self.data)
 def test_nan(self):self.data['scenes'][0]['camera']['position'][0]=float('nan');self.reject(self.data)
 def test_empty_meaning(self):self.data['scenes'][0]['purpose']='  ';self.reject(self.data)
 def test_mixed_none(self):self.data['scenes'][0]['input'].append('none');self.reject(self.data)
 def test_rest_scene(self):self.data['scenes'][0]['input']=['none'];v.validate(self.data)
 def test_all_capabilities_have_unique_ids(self):
  caps=json.loads((ROOT/'plan/capabilities.json').read_text())['capabilities'];self.assertEqual(len(caps),len({c['id'] for c in caps}))
 def test_all_skills_have_frontmatter_and_guide(self):
  skills=json.loads((ROOT/'skills/index.json').read_text())['skills'];self.assertEqual(len(skills),18)
  for s in skills:
   self.assertTrue((ROOT/s['entry']).read_text().startswith('---\nname: '));self.assertTrue((ROOT/s['guide']).is_file())
 def test_backlog_dependencies(self):
  items=json.loads((ROOT/'plan/backlog.json').read_text())['milestones'];done=set()
  for i in items:self.assertTrue(set(i['depends_on'])<=done);done.add(i['id'])
if __name__=='__main__':unittest.main()
