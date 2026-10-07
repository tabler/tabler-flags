import { h, toChildArray, ComponentChild } from 'preact';
import defaultAttributes, { ASPECT_RATIO, defaultVariant } from './defaultAttributes';
import type { FlagNode, FlagNodes, FlagComponent, FlagProps } from './types';

const renderNodes = (nodes: FlagNode): ComponentChild[] =>
  nodes.map(([tag, attrs, children]) => h(tag as any, attrs, children ? renderNodes(children) : undefined));

const createFlagPreactComponent = (slug: string, namePascal: string, nodes: FlagNodes): FlagComponent => {
  const Component = ({ variant = defaultVariant, size = 24, title, children, className = '', class: classes = '', style, ...rest }: FlagProps) => {
    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    return h(
      'svg' as any,
      {
        ...defaultAttributes,
        width: String(width),
        height: String(height),
        class: ['tabler-flag', `tabler-flag-${slug}`, classes, className].filter(Boolean).join(' '),
        style,
        ...rest,
      },
      [title && h('title', {}, title), ...renderNodes(nodes[variant] ?? nodes[defaultVariant]), ...toChildArray(children)],
    );
  };

  Component.displayName = `Flag${namePascal}`;

  return Component;
};

export default createFlagPreactComponent;
