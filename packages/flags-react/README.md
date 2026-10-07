# @tabler/flags-react

Country flags as React components — one tree-shakable component per flag (plus an ISO alias), and a dynamic lookup by slug or ISO code for data-driven lists.

> **Pre-1.0.** API may still change.

## Install

```bash
pnpm add @tabler/flags-react react
```

## Usage

```tsx
import { FlagPoland, FlagPL } from '@tabler/flags-react';

function Language() {
  return <FlagPoland variant="plain" size={32} />; // FlagPL is the same component
}
```

### Rendering by slug or ISO code

```tsx
import { Flag, flagsList } from '@tabler/flags-react';

function AllFlags() {
  return (
    <>
      {flagsList.map((slug) => (
        <Flag key={slug} name={slug} size={24} />
      ))}
      <Flag name="pl" />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'rounded' \| 'plain' \| 'gradient' \| 'shiny'` | `'rounded'` | Which pre-baked visual variant to render. |
| `size` | `string \| number` | `24` | Sets the SVG height. Width is derived from the fixed 5:4 aspect ratio, unless you also pass an explicit `width`. |
| `title` | `string` | — | Adds an accessible `<title>` element inside the SVG. |
| ...rest | `React.ComponentPropsWithoutRef<'svg'>` | — | Any other SVG attribute (`className`, `onClick`, `style`, ...) is forwarded to the root `<svg>`. |

The dynamic `Flag` component additionally requires `name`: a slug (`"poland"`) or lowercase ISO 3166-1 alpha-2 code (`"pl"`).

The full list of flags, slugs and component names is in the [repository README](https://github.com/tabler/tabler-flags#flags).

## License

tabler-flags is licensed under the [MIT License](https://github.com/tabler/tabler-flags/blob/main/LICENSE).
