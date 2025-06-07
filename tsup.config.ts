import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  sourcemap: true,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
  treeshake: true,
  banner: {
    // Allows importing CommonJS modules from ESM
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
  },
});
