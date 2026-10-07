import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/vue';
import { FlagPoland, FlagPL, Flag, flagsList, variants } from './src/tabler-flags-vue.ts';

describe('flags-vue', () => {
  afterEach(() => cleanup());

  it('renders a flag', () => {
    const { container } = render(FlagPoland);
    expect(container.getElementsByTagName('svg').length).toBe(1);
  });

  it('exports the ISO alias pointing at the same component', () => {
    expect(FlagPL).toBe(FlagPoland);
  });

  it('keeps nested <defs>/<clipPath> nodes of the rounded variant', () => {
    const { container } = render(FlagPoland);
    expect(container.querySelector('defs clipPath rect')).toBeTruthy();
    expect(container.querySelector('g[clip-path]')).toBeTruthy();
  });

  it('renders every variant and only the plain one has no clip path', () => {
    variants.forEach((variant) => {
      const { container, unmount } = render(FlagPoland, { props: { variant } });
      expect(container.getElementsByTagName('svg').length, variant).toBe(1);
      expect(!!container.querySelector('clipPath'), variant).toBe(variant !== 'plain');
      expect(!!container.querySelector('linearGradient'), variant).toBe(variant === 'gradient' || variant === 'shiny');
      unmount();
    });
  });

  it('defaults to the rounded variant', () => {
    const withoutVariant = render(FlagPoland);
    const explicit = render(FlagPoland, { props: { variant: 'rounded' } });
    expect(withoutVariant.container.innerHTML).toBe(explicit.container.innerHTML);
  });

  it('sizes height from `size` and derives width from the 5:4 aspect ratio', () => {
    const { container } = render(FlagPoland, { props: { size: 48 } });
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg.getAttribute('height')).toBe('48');
    expect(svg.getAttribute('width')).toBe('60');
    expect(svg.getAttribute('viewBox')).toBe('0 0 30 24');
  });

  it('does not leak consumed props onto the <svg>', () => {
    const { container } = render(FlagPoland, { props: { size: 48, variant: 'plain' } });
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg.hasAttribute('size')).toBe(false);
    expect(svg.hasAttribute('variant')).toBe(false);
  });

  it('applies class names', () => {
    const { container } = render(FlagPoland, { props: { class: 'test-class' } });
    expect(container.firstChild).toHaveClass('test-class', 'tabler-flag', 'tabler-flag-poland');
  });

  it('forwards style and unknown attrs to the root <svg>', () => {
    const { container } = render(FlagPoland, { props: { style: { color: 'red' }, id: 'pl', 'aria-label': 'Poland' } });
    const svg = container.getElementsByTagName('svg')[0];
    expect(svg).toHaveStyle('color: rgb(255, 0, 0)');
    expect(svg.getAttribute('id')).toBe('pl');
    expect(svg.getAttribute('aria-label')).toBe('Poland');
  });

  it('adds an accessible <title> when the title prop is set', () => {
    const { container } = render(FlagPoland, { props: { title: 'Poland' } });
    expect(container.querySelector('title')?.textContent).toBe('Poland');
  });

  it('renders dynamically by slug and by ISO code', () => {
    const bySlug = render(Flag, { props: { name: 'poland' } });
    const byIso = render(Flag, { props: { name: 'pl' } });
    expect(bySlug.container.getElementsByTagName('svg').length).toBe(1);
    expect(bySlug.container.innerHTML).toBe(byIso.container.innerHTML);
  });

  it('renders nothing for an unknown name', () => {
    const { container } = render(Flag, { props: { name: 'not-a-real-flag' } });
    expect(container.getElementsByTagName('svg').length).toBe(0);
  });

  it('renders every flag in flagsList without throwing', () => {
    expect(flagsList.length).toBeGreaterThan(0);
    flagsList.forEach((slug) => {
      const { container, unmount } = render(Flag, { props: { name: slug } });
      expect(container.getElementsByTagName('svg').length, `flag "${slug}" did not render an <svg>`).toBe(1);
      unmount();
    });
  });
});
