import { createComponent, render as renderTemplate, renderComponent } from 'astro/compiler-runtime';
import flagsMap from './flags/flags-map';
import type { FlagComponent, FlagProps } from './types';

/** A flag slug (`"poland"`) or lowercase ISO 3166-1 alpha-2 code (`"pl"`) — see `flagsList`. */
export type FlagName = keyof typeof flagsMap;

export interface DynamicFlagProps extends FlagProps {
  name: FlagName;
}

/**
 * Renders a flag by slug or ISO code, for data-driven lists. For a static,
 * known flag, prefer the tree-shakable named export instead.
 */
const Flag = createComponent((result: any, props: DynamicFlagProps, slots: any) => {
  const { name, ...rest } = props ?? ({} as DynamicFlagProps);
  const Component = flagsMap[name];

  if (!Component) {
    return renderTemplate``;
  }

  return renderTemplate`${renderComponent(result, `Flag${String(name)}`, Component, rest, slots)}`;
}, 'Flag', undefined) as FlagComponent;

export default Flag;
