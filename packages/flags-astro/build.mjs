#!/usr/bin/env node

import { buildJsFlags, buildFlagsList, buildFlagsMap } from '../../.build/build-flags.mjs';
import { variants } from '../../.build/helpers.mjs';

const componentTemplate = ({ slug, namePascal, variants: nodes }) => {
  const consts = variants.map((v) => `const __${v}: FlagNode = ${JSON.stringify(nodes[v].nodes)};`).join('\n');
  const map = variants.map((v) => `${v}: __${v}`).join(', ');

  return `\
import createFlagAstroComponent from '../createFlagAstroComponent';
import type { FlagNode } from '../types';

${consts}

const Flag${namePascal} = createFlagAstroComponent('${slug}', '${namePascal}', { ${map} });

export default Flag${namePascal};`;
};

const indexItemTemplate = ({ namePascal, isoPascal }) =>
  `export { default as Flag${namePascal}${isoPascal ? `, default as Flag${isoPascal}` : ''} } from './Flag${namePascal}';`;

buildJsFlags({
  name: 'flags-astro',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'flags.ts',
  pascalCase: false,
  extension: 'ts',
});

buildFlagsList('flags-astro');
buildFlagsMap('flags-astro');
