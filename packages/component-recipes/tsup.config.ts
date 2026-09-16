import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/artifact-card.ts', 'src/system-diagram.ts', 'src/experiment-sheet.ts', 'src/physical-plate.ts', 'src/evidence.ts', 'src/badge.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  minify: false,
});
