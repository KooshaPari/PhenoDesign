import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/color.ts', 'src/type-scale.ts', 'src/spacing.ts', 'src/motion.ts', 'src/layout.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  minify: false,
});
