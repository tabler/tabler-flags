import { h } from 'vue'
import type { SVGAttributes, FunctionalComponent, VNode } from 'vue';

export interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number | string;
}

export type FlagNode = [
  name: string,
  attrs: Record<string, string>,
  children: FlagNode
][]; 

export type Flag = FunctionalComponent<SVGProps>;

const renderChildren = (children: FlagNode): VNode[] => {
  return children.map(([name, attributes, children]) => {
    return h(name, attributes, renderChildren(children));
  });
};

const createVueComponent =
  (name: string, flagNode: FlagNode): Flag =>
  ({ size = 24, class: classes, ...props }, { attrs }) => {
    console.log('attrs', attrs);

    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 30 24',
        height: size,
        width: 1.25 * Number(size),
        ...attrs,
        class: ['tabler-flag', `tabler-flag-${name}`],
        ...props,
      },
      [...renderChildren(flagNode)]
    );
  };

export default createVueComponent;
