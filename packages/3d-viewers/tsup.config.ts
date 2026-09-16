import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/glb-viewer.ts', 'src/lighting-presets.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['three'],
  splitting: false,
  minify: false,
});
