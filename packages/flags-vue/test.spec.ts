import { describe, it, expect, afterEach, expectTypeOf } from 'vitest';
import { render, cleanup } from '@testing-library/vue';
import { FlagPoland, createVueComponent } from './src';

describe('Vue Flag component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render flag component', () => {
    const { container } = render(FlagPoland);
    expect(container.getElementsByTagName('svg').length).toBeGreaterThan(0);
  });

  it('should update svg attributes when there are props passed to the component', () => {
    const { container } = render(FlagPoland, {
      props: { size: 48 },
    });

    expect(container.firstChild).toHaveAttribute('height', '48');
    expect(container.firstChild).toHaveAttribute('viewBox', '0 0 30 24');
    expect(container.firstChild).toHaveAttribute('width', '60');
    expect(container.firstChild).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
  });

  it('should apply all classNames to the element', () => {
    const testClass = 'test-class';
    const { container } = render(FlagPoland, {
      props: { class: testClass },
    });

    expect(container.firstChild).toHaveClass(testClass);
    expect(container.firstChild).toHaveClass('tabler-flag');
    expect(container.firstChild).toHaveClass('tabler-flag-poland');
  });

  it('should add a style attribute to the element', () => {
    const { container } = render(FlagPoland, {
      props: { style: { color: 'red' } },
    });

    expect(container.firstChild).toHaveStyle('color: red');
  });

  it('should have proper type', () => {
    expectTypeOf(FlagPoland).toBeFunction();
    expectTypeOf(FlagPoland).toEqualTypeOf(createVueComponent('poland', []));
  });

  it('should match snapshot', () => {
    const { container } = render(FlagPoland, {
      props: {
        size: 100,
        class: 'test-class',
        style: { outline: '1px solid red' },
      },
    });
    expect(container.innerHTML).toMatchInlineSnapshot(`"<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24" height="100" width="125" size="100" class="tabler-flag tabler-flag-poland test-class" style="outline: 1px solid red;"><defs><clipPath idflag-poland="-clip"><rect width="30" height="24" fill="#fff" rx="4"></rect></clipPath></defs><g clip-path="url(#flag-poland-clip)"><path fill="#fff" d="M30 24H0V0h30z"></path><path fill="#cb2e40" d="M30 24H0V12h30z"></path></g><rect width="29" height="23" x=".5" y=".5" fill="none" opacity=".15" stroke="#000" stroke-width="1" rx="3.5"></rect><path fill="#fff" d="M4 1a3 3 0 0 0-3 3v1a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v-1a3 3 0 0 0-3-3Z" opacity=".1"></path></svg>"`);
  });
});
