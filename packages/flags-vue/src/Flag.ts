import { h } from 'vue';
import flagsMap from './flags/flags-map';
import type { FlagProps } from './types';

/** A flag slug (`"poland"`) or lowercase ISO 3166-1 alpha-2 code (`"pl"`) — see `flagsList`. */
export type FlagName = keyof typeof flagsMap;

export interface DynamicFlagProps extends FlagProps {
  name: FlagName;
}

/**
 * Renders a flag by slug or ISO code, for data-driven lists. For a static,
 * known flag, prefer the tree-shakable named export instead.
 */
const Flag = ({ name, ...rest }: DynamicFlagProps) => {
  const Component = flagsMap[name];

  if (!Component) {
    return null;
  }

  return h(Component, rest);
};

Flag.props = ['name', 'variant', 'size', 'title', 'class'];

export default Flag;
