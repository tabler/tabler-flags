import type { ForwardRefExoticComponent, RefAttributes, ComponentPropsWithoutRef } from 'react';
import type { variants } from './defaultAttributes';
export type { ReactNode } from 'react';

export type FlagNode = [tag: string, attrs: Record<string, string | Record<string, string>>, children?: FlagNode][];

export type FlagVariant = (typeof variants)[number];

export type FlagNodes = Record<FlagVariant, FlagNode>;

export interface FlagProps extends Partial<ComponentPropsWithoutRef<'svg'>> {
  /** Sets the SVG height; width is derived from the fixed 5:4 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked visual variant to render. @default 'rounded' */
  variant?: FlagVariant;
  title?: string;
}

export type FlagComponent = ForwardRefExoticComponent<FlagProps & RefAttributes<SVGSVGElement>>;
