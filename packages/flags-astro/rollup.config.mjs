import fs from 'fs';
import { getRollupConfig } from '../../.build/rollup-plugins.mjs';
import dts from 'rollup-plugin-dts';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const outputFileName = 'tabler-flags-astro';
const inputs = ['./src/tabler-flags-astro.ts'];

// Astro's runtime helpers stay external — resolved by the consumer's own
// Astro/Vite pipeline via the `astro` peer dependency, never bundled.
const external = [/^astro(\/|$)/];
const bundles = [
  { format: 'cjs', extension: 'cjs', inputs, external },
  { format: 'esm', extension: 'mjs', preserveModules: true, inputs, external },
];

export default [
  {
    input: inputs[0],
    external,
    output: [{ file: `dist/${outputFileName}.d.ts`, format: 'es' }],
    plugins: [dts()],
  },
  ...getRollupConfig(pkg, outputFileName, bundles, {}),
];
