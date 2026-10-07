# @tabler/flags-astro

Country flags as Astro components — one tree-shakable component per flag (plus an ISO alias), and a dynamic lookup by slug or ISO code for data-driven lists. Rendered at build time, zero client JavaScript.

> **Pre-1.0.** API may still change.

## Install

```bash
pnpm add @tabler/flags-astro
```

## Usage

```astro
---
import { FlagPoland, Flag, flagsList } from '@tabler/flags-astro';
---

<FlagPoland variant="plain" size={32} />
<Flag name="pl" />
{flagsList.map((slug) => <Flag name={slug} />)}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'rounded' \| 'plain' \| 'gradient' \| 'shiny'` | `'rounded'` | Which pre-baked visual variant to render. |
| `size` | `string \| number` | `24` | Sets the SVG height. Width is derived from the fixed 5:4 aspect ratio, unless you also pass an explicit `width`. |
| `title` | `string` | — | Adds an accessible `<title>` element inside the SVG. |
| ...rest | any HTML attribute | — | Any other attribute (`class`, `style`, `aria-label`, ...) is forwarded to the root `<svg>`. |

The dynamic `Flag` component additionally requires `name`: a slug (`"poland"`) or lowercase ISO 3166-1 alpha-2 code (`"pl"`).

The full list of flags, slugs and component names is in the [repository README](https://github.com/tabler/tabler-flags#flags).

## License

tabler-flags is licensed under the [MIT License](https://github.com/tabler/tabler-flags/blob/main/LICENSE).
