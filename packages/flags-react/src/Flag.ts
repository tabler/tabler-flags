import { createElement } from 'react';
import flagsMap from './flags/flags-map';
import type { FlagProps } from './types';

/** A flag slug (`"poland"`) or lowercase ISO 3166-1 alpha-2 code (`"pl"`) — see `flagsList`. */
export type FlagName = keyof typeof flagsMap;

export interface DynamicFlagProps extends FlagProps {
  name: FlagName;
}

/**
 * Renders a flag by slug or ISO code, for data-driven lists (e.g. a language
 * switcher built from `flagsList`). For a static, known flag, prefer the
 * tree-shakable named export instead, e.g. `import { FlagPoland } from '@tabler/flags-react'`.
 */
const Flag = ({ name, ...rest }: DynamicFlagProps) => {
  const Component = flagsMap[name];

  if (!Component) {
    return null;
  }

  return createElement(Component, rest);
};

export default Flag;
