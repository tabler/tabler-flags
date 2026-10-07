import { createRef } from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { FlagPoland, FlagPL, FlagEuropeanUnion, Flag, flagsList, variants } from './src/tabler-flags-react';

describe('flags-react', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a flag', () => {
    const { container } = render(<FlagPoland />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('exports the ISO alias pointing at the same component', () => {
    expect(FlagPL).toBe(FlagPoland);
  });

  it('keeps nested <defs>/<clipPath> nodes of the rounded variant', () => {
    const { container } = render(<FlagPoland />);
    expect(container.querySelector('defs clipPath rect')).toBeTruthy();
    expect(container.querySelector('g[clip-path]')).toBeTruthy();
  });

  it('renders every variant and only the plain one has no clip path', () => {
    variants.forEach((variant) => {
      const { container, unmount } = render(<FlagPoland variant={variant} />);
      expect(container.querySelector('svg'), variant).toBeTruthy();
      expect(!!container.querySelector('clipPath'), variant).toBe(variant !== 'plain');
      expect(!!container.querySelector('linearGradient'), variant).toBe(variant === 'gradient' || variant === 'shiny');
      unmount();
    });
  });

  it('defaults to the rounded variant', () => {
    const withoutVariant = render(<FlagPoland />);
    const explicit = render(<FlagPoland variant="rounded" />);
    expect(withoutVariant.container.innerHTML).toBe(explicit.container.innerHTML);
  });

  it('sizes height from `size` and derives width from the 5:4 aspect ratio', () => {
    const { container } = render(<FlagPoland size={48} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('height')).toBe('48');
    expect(svg?.getAttribute('width')).toBe('60');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 30 24');
  });

  it('applies class names', () => {
    const { container } = render(<FlagPoland className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class', 'tabler-flag', 'tabler-flag-poland');
  });

  it('forwards style and unknown props to the root <svg>', () => {
    const { container } = render(<FlagPoland style={{ color: 'red' }} data-testid="pl" aria-label="Poland" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle('color: rgb(255, 0, 0)');
    expect(svg?.getAttribute('data-testid')).toBe('pl');
    expect(svg?.getAttribute('aria-label')).toBe('Poland');
  });

  it('adds an accessible <title> when the title prop is set', () => {
    const { container } = render(<FlagPoland title="Poland" />);
    expect(container.querySelector('title')?.textContent).toBe('Poland');
  });

  it('forwards a ref to the root <svg> DOM node', () => {
    const ref = createRef<SVGSVGElement>();
    render(<FlagPoland ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('renders dynamically by slug and by ISO code', () => {
    const bySlug = render(<Flag name="poland" />);
    const byIso = render(<Flag name="pl" />);
    expect(bySlug.container.querySelector('svg')).toBeTruthy();
    expect(bySlug.container.innerHTML).toBe(byIso.container.innerHTML);
  });

  it('renders a flag without an ISO code via the dynamic component', () => {
    const { container } = render(<Flag name="european-union" />);
    expect(container.querySelector('svg')?.getAttribute('class')).toContain('tabler-flag-european-union');
    expect(FlagEuropeanUnion).toBeTruthy();
  });

  it('renders nothing for an unknown name', () => {
    const { container } = render(<Flag name={'not-a-real-flag' as any} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders every flag in flagsList without throwing', () => {
    expect(flagsList.length).toBeGreaterThan(0);
    flagsList.forEach((slug) => {
      const { container, unmount } = render(<Flag name={slug as any} />);
      expect(container.querySelector('svg'), `flag "${slug}" did not render an <svg>`).toBeTruthy();
      unmount();
    });
  });

  it('matches snapshot', () => {
    const { container } = render(<FlagPoland size={100} className="test-class" />);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
