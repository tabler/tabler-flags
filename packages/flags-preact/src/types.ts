import type { FunctionComponent, JSX } from 'preact';
import type { variants } from './defaultAttributes';

export type FlagNode = [tag: string, attrs: Record<string, string>, children?: FlagNode][];

export type FlagVariant = (typeof variants)[number];

export type FlagNodes = Record<FlagVariant, FlagNode>;

export interface FlagProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  /** Sets the SVG height; width is derived from the fixed 5:4 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked visual variant to render. @default 'rounded' */
  variant?: FlagVariant;
  title?: string;
}

export type FlagComponent = FunctionComponent<FlagProps>;
