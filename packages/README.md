# phenoDesign workspace packages

The root `@phenotype/design` package (keycap palette, VitePress theme) lives at the repo root. Seven packages live under `packages/`; the two with a recorded upstream origin are below.

| Package | npm name | Origin |
|---------|----------|--------|
| `design-tokens/` | `@kooshapari/phenotype-design-tokens` | Absorbed from `phenotype-landing` |
| `ui/` | `@kooshapari/phenotype-ui` | Absorbed from `phenotype-landing` |

Consumers should depend on `@phenotype/design` from npm (`bun add @phenotype/design`), or on `github:kooshapari/phenoDesign` until the first publish lands. See `docs/guides/npm-release.md`.
