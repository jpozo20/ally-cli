import { env } from 'process';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  sourcemap: false,
  minify: true,
  target: 'esnext',
  outDir: 'dist',
  treeshake: true,
  banner: {
    // Allows importing CommonJS modules from ESM
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
  },

  esbuildOptions: (options) => {
    const drop = env.NODE_ENV === 'production' ? ['console', 'debugger'] : [];
    options.drop = drop as unknown as string[];
  },
});
