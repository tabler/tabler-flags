// Every source flag shares this canvas (enforced by .build/validate.mjs).
export default {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 30 24',
};

// width / height ratio of the shared 30x24 viewBox.
export const ASPECT_RATIO = 1.25;

export const variants = ['rounded', 'plain', 'gradient', 'shiny'] as const;
export const defaultVariant = 'rounded';
