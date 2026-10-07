import { createComponent, render as renderTemplate, spreadAttributes, unescapeHTML } from 'astro/compiler-runtime';
import defaultAttributes, { ASPECT_RATIO, defaultVariant, variants } from './defaultAttributes';
import type { FlagComponent, FlagNode, FlagNodes, FlagProps, FlagVariant } from './types';

/**
 * Serialize a (possibly nested) FlagNode tree to a raw HTML string once, at
 * module init — the path data never changes per render, only the root <svg>
 * attributes do.
 */
const renderNodesToString = (nodes: FlagNode): string =>
  nodes.map(([tag, attrs, children]) => `<${tag}${String(spreadAttributes(attrs))}>${children ? renderNodesToString(children) : ''}</${tag}>`).join('');

/**
 * Creates an Astro component factory for a flag. Astro compiles a `.astro`
 * file down to a `createComponent()` call whose render function returns a
 * `renderTemplate` tagged-template result; we build the same shape by hand so
 * every flag can ship as a plain `.ts` module.
 */
const createFlagAstroComponent = (slug: string, namePascal: string, nodes: FlagNodes): FlagComponent => {
  const html = Object.fromEntries(variants.map((v) => [v, renderNodesToString(nodes[v])])) as Record<FlagVariant, string>;

  return createComponent((result: any, props: FlagProps, slots: any) => {
    const { variant = defaultVariant, size = 24, title, class: className, ...rest } = props ?? {};

    const height = typeof size === 'number' ? size : parseFloat(String(size)) || 24;
    const width = Math.round(height * ASPECT_RATIO * 100) / 100;

    const attributes = {
      ...defaultAttributes,
      width,
      height,
      class: `tabler-flag tabler-flag-${slug}${className ? ` ${className}` : ''}`,
      ...rest,
    };

    return renderTemplate`<svg${spreadAttributes(attributes)}>${title != null ? renderTemplate`<title>${title}</title>` : ''}${unescapeHTML(html[variant as FlagVariant] ?? html[defaultVariant])}</svg>`;
  }, `Flag${namePascal}`, undefined) as FlagComponent;
};

export default createFlagAstroComponent;
