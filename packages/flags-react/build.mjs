#!/usr/bin/env node

import { buildJsFlags, buildFlagsList, buildFlagsMap } from '../../.build/build-flags.mjs';
import { variants } from '../../.build/helpers.mjs';

const componentTemplate = ({ slug, namePascal, variants: nodes }) => {
  const svgBase64 = Buffer.from(nodes.rounded.content).toString('base64');
  const consts = variants.map((v) => `const __${v}: FlagNode = ${JSON.stringify(nodes[v].nodes)};`).join('\n');
  const map = variants.map((v) => `${v}: __${v}`).join(', ');

  return `\
import createFlagComponent from '../createFlagComponent';
import type { FlagNode } from '../types';

${consts}

/**
 * Flag${namePascal}
 * @preview ![img](data:image/svg+xml;base64,${svgBase64})
 */
const Flag${namePascal} = createFlagComponent('${slug}', '${namePascal}', { ${map} });

export default Flag${namePascal};`;
};

const indexItemTemplate = ({ namePascal, isoPascal }) =>
  `export { default as Flag${namePascal}${isoPascal ? `, default as Flag${isoPascal}` : ''} } from './Flag${namePascal}';`;

buildJsFlags({
  name: 'flags-react',
  componentTemplate,
  indexItemTemplate,
  indexFile: 'flags.ts',
  pascalCase: true,
  extension: 'ts',
});

buildFlagsList('flags-react');
buildFlagsMap('flags-react');
