import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['tokens.ts', 'index.ts'],
  format: ['esm'],
  dts: true,
  clean: false,
  outDir: 'dist',
  splitting: false,
  minify: false,
});
