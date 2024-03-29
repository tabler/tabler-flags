import { forwardRef, createElement, ReactNode } from 'react';

import { FunctionComponent, ReactSVG } from 'react';
export type { ReactNode } from 'react';

export type FlagNode = [
  name: keyof ReactSVG,
  attributes: Record<string, string>,
  children: FlagNode,
][];

export interface FlagProps extends Partial<React.SVGProps<SVGSVGElement>> {
  size?: string | number;
}

export type Flag = FunctionComponent<FlagProps>;

const renderChildren = (children: FlagNode): ReactNode[] => {
  return children.map(([name, attributes, children]) => {
    return createElement(name, attributes, renderChildren(children));
  });
}

const createReactComponent = (name: string, flagNode: FlagNode) => {
  const Component = forwardRef<Flag, FlagProps>(
    ({ size = 24, className, ...rest }: FlagProps, ref) => {
      return createElement(
        'svg',
        {
          ref,
          xmlns: 'http://www.w3.org/2000/svg',
          "viewBox": '0 0 30 24',
          height: size,
          width: 1.25 * Number(size),
          className: [`tabler-flag`, `tabler-flag-${name}`, className]
            .join(' ')
            .trim(),
          ...rest,
        },
        [...renderChildren(flagNode)]
      );
    }
  );

  return Component;
};

export default createReactComponent;
