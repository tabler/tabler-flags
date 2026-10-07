import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { FlagPoland, FlagPL, Flag, flagsList, variants } from './src/tabler-flags-astro';

describe('flags-astro', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  const openingTag = (html: string) => html.slice(0, html.indexOf('>') + 1);

  it('renders a flag', async () => {
    const html = await container.renderToString(FlagPoland as any);
    expect(html).toContain('<svg');
    expect(html).toContain('</svg>');
  });

  it('exports the ISO alias pointing at the same component', () => {
    expect(FlagPL).toBe(FlagPoland);
  });

  it('keeps nested <defs>/<clipPath> nodes of the rounded variant', async () => {
    const html = await container.renderToString(FlagPoland as any);
    expect(html).toMatch(/<defs><clipPath/);
    expect(html).toMatch(/<g clip-path=/);
  });

  it('renders every variant and only the plain one has no clip path', async () => {
    for (const variant of variants) {
      const html = await container.renderToString(FlagPoland as any, { props: { variant } });
      expect(html, variant).toContain('<svg');
      expect(html.includes('<clipPath'), variant).toBe(variant !== 'plain');
      expect(html.includes('<linearGradient'), variant).toBe(variant === 'gradient' || variant === 'shiny');
    }
  });

  it('defaults to the rounded variant', async () => {
    const withoutVariant = await container.renderToString(FlagPoland as any);
    const explicit = await container.renderToString(FlagPoland as any, { props: { variant: 'rounded' } });
    expect(withoutVariant).toBe(explicit);
  });

  it('sizes height from `size` and derives width from the 5:4 aspect ratio', async () => {
    const tag = openingTag(await container.renderToString(FlagPoland as any, { props: { size: 48 } }));
    expect(tag).toContain('height="48"');
    expect(tag).toContain('width="60"');
    expect(tag).not.toContain('size=');
    expect(tag).not.toContain('variant=');
  });

  it('applies class names', async () => {
    const tag = openingTag(await container.renderToString(FlagPoland as any, { props: { class: 'test-class' } }));
    expect(tag).toContain('class="tabler-flag tabler-flag-poland test-class"');
  });

  it('forwards unknown props to the root <svg>', async () => {
    const tag = openingTag(await container.renderToString(FlagPoland as any, { props: { 'data-testid': 'pl', 'aria-label': 'Poland' } }));
    expect(tag).toContain('data-testid="pl"');
    expect(tag).toContain('aria-label="Poland"');
  });

  it('adds an accessible <title> when the title prop is set', async () => {
    const html = await container.renderToString(FlagPoland as any, { props: { title: 'Poland' } });
    expect(html).toContain('<title>Poland</title>');
  });

  it('renders dynamically by slug and by ISO code', async () => {
    const bySlug = await container.renderToString(Flag as any, { props: { name: 'poland' } });
    const byIso = await container.renderToString(Flag as any, { props: { name: 'pl' } });
    expect(bySlug).toContain('<svg');
    expect(bySlug).toBe(byIso);
  });

  it('renders nothing for an unknown name', async () => {
    const html = await container.renderToString(Flag as any, { props: { name: 'not-a-real-flag' } });
    expect(html).not.toContain('<svg');
  });

  it('renders every flag in flagsList without throwing', async () => {
    expect(flagsList.length).toBeGreaterThan(0);
    for (const slug of flagsList) {
      const html = await container.renderToString(Flag as any, { props: { name: slug } });
      expect(html, `flag "${slug}" did not render an <svg>`).toContain('<svg');
    }
  });
});
