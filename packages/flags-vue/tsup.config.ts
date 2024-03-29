import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    splitting: true,
    skipNodeModulesBundle: true,
    entry: ['src/**/*.{ts,tsx}'],
    name: 'tabler-flags-vue',
    clean: true,
    dts: true,
    minify: true,
    target: 'es2020',
    silent: true,
    sourcemap: false,
    outDir: `dist/${options.format}`,
    tsconfig: '../../tsconfig.json'
  };
});
