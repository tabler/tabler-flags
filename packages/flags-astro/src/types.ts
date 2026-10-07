import type { variants } from './defaultAttributes';

export type FlagNode = [tag: string, attrs: Record<string, string>, children?: FlagNode][];

export type FlagVariant = (typeof variants)[number];

export type FlagNodes = Record<FlagVariant, FlagNode>;

export interface FlagProps extends Record<string, any> {
  /** Sets the SVG height; width is derived from the fixed 5:4 aspect ratio unless overridden. */
  size?: string | number;
  /** Which pre-baked visual variant to render. @default 'rounded' */
  variant?: FlagVariant;
  title?: string;
  class?: string;
}

/**
 * Structural type for an Astro component factory. The runtime marker
 * `isAstroComponentFactory` is attached by Astro's `createComponent`.
 */
export type FlagComponent = ((result: any, props: FlagProps, slots: any) => any) & {
  isAstroComponentFactory: true;
};
