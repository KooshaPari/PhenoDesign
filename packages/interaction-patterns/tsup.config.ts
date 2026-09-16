import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/perspective-tilt.ts', 'src/scroll-reveal.ts', 'src/lightbox.ts', 'src/counter-animate.ts', 'src/parallax-depth.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  minify: false,
});
