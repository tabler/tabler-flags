import { h, VNode } from 'vue';
import defaultAttributes, { ASPECT_RATIO, defaultVariant } from './defaultAttributes';
import type { FlagNode, FlagNodes, FlagComponent, FlagProps } from './types';

const renderNode = ([tag, attrs, children]: FlagNode[number]): VNode => h(tag, attrs, children ? children.map(renderNode) : undefined);

const createFlagVueComponent = (slug: string, namePascal: string, nodes: FlagNodes): FlagComponent => {
  const Component: FlagComponent = ({ variant = defaultVariant, size = 24, title, class: classes, ...rest }: FlagProps, { attrs, slots }) => {
    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    let children = [...(nodes[variant] ?? nodes[defaultVariant]).map(renderNode), ...(slots.default ? [slots.default()] : [])];
    if (title) children = [h('title', title), ...children];

    return h(
      'svg',
      {
        ...defaultAttributes,
        width,
        height,
        ...attrs,
        class: ['tabler-flag', `tabler-flag-${slug}`, classes],
        ...rest,
      },
      children,
    );
  };

  // Without a declared `props` list, Vue can't tell consumed props (variant,
  // size, title, class) apart from pass-through attrs, and they would leak onto
  // the rendered <svg> as literal attributes (e.g. `<svg variant="plain">`).
  Component.props = ['variant', 'size', 'title', 'class'];
  Component.displayName = `Flag${namePascal}`;

  return Component;
};

export default createFlagVueComponent;
