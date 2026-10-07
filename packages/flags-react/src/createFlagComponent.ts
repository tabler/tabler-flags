import { forwardRef, createElement, ReactNode } from 'react';
import defaultAttributes, { ASPECT_RATIO, defaultVariant } from './defaultAttributes';
import type { FlagNode, FlagNodes, FlagProps } from './types';

const renderNodes = (nodes: FlagNode): ReactNode[] =>
  nodes.map(([tag, attrs, children], i) =>
    createElement(tag, { key: `svg-${i}`, ...attrs }, children ? renderNodes(children) : undefined),
  );

const createFlagComponent = (slug: string, namePascal: string, nodes: FlagNodes) => {
  const Component = forwardRef<SVGSVGElement, FlagProps>(
    ({ variant = defaultVariant, size = 24, title, className, children, ...rest }, ref) => {
      const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
      const width = Math.round(height * ASPECT_RATIO * 100) / 100;

      return createElement(
        'svg',
        {
          ref,
          ...defaultAttributes,
          width,
          height,
          className: ['tabler-flag', `tabler-flag-${slug}`, className].filter(Boolean).join(' '),
          ...rest,
        },
        [
          title && createElement('title', { key: 'svg-title' }, title),
          ...renderNodes(nodes[variant] ?? nodes[defaultVariant]),
          ...(Array.isArray(children) ? children : children ? [children] : []),
        ],
      );
    },
  );

  Component.displayName = `Flag${namePascal}`;

  return Component;
};

export default createFlagComponent;
