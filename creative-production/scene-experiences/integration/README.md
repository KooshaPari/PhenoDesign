# Additive installation

First reconcile actual PhenoDesign source/ownership and acquire its existing write lease.
The default is a read-only plan. Target identity must be `@phenotype/design`.
Source manifest hashes are checked. Symlinks, unsafe paths and differing destination files
are refused before writing. An exclusive installer lock protects only other copies of this
installer, not unrelated agents. The caller must coordinate the repository separately.

```sh
python integration/install.py --repo /path/to/PhenoDesign
python integration/install.py --repo /path/to/PhenoDesign --apply
# Optional project-local skill discovery copies, with conflict checks:
python integration/install.py --repo /path/to/PhenoDesign --activate-skills both
python integration/install.py --repo /path/to/PhenoDesign --activate-skills both --apply
```

A complete temporary file is published with a no-overwrite hard link in the same directory.
A filesystem without that operation fails rather than falling back to destructive overwrite.
On failure, only installer-created bytes that still match are removed. New external edits are
preserved. Identical files make reapplying idempotent; changed files require deliberate reconciliation.
This is a local convenience tool, not an adversarial filesystem security boundary.

It copies this package into `creative-production/scene-experiences/`, including reference archives,
without executing old installers. It never changes root exports, dependencies, Remotion, CI or
AGENTS.md and makes no GitHub mutation. Skills reference the canonical installed subtree.
The archives are preserved for reference only; do not activate their conflicting overlays blindly.
