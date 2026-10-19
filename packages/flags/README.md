# @tabler/flags

Country flags as plain SVG files, one directory per visual variant: `rounded` (default look), `plain`, `gradient` and `shiny`. `flags.json` lists every flag with its name, category and ISO code.

```bash
pnpm add @tabler/flags
```

```
node_modules/@tabler/flags/dist/
  rounded/poland.svg
  plain/poland.svg
  gradient/poland.svg
  shiny/poland.svg
  sprite/flags.svg
  sprite/flags.css
  sprite/flags.json
  flags.json
```

```js
import flags from '@tabler/flags/flags.json';
```

## CSS sprite

`sprite/flags.svg` packs every flag into one file, and `sprite/flags.css` shows one of them per element through `background-position`. One request covers every flag, so this is the cheapest option when a page renders many flags at once.

```html
<link rel="stylesheet" href="node_modules/@tabler/flags/dist/sprite/flags.css">

<span class="flag flag-poland"></span>
<span class="flag flag-pl"></span>
<span class="flag flag-rounded flag-jp"></span>
```

- `.flag` sets the size to `1.25em` x `1em`, so `font-size` on the element controls the flag size.
- `.flag-<slug>` and `.flag-<iso>` pick the flag. Aliases such as `flag-sj` point at the artwork they share.
- `.flag-rounded` adds the rounded corners and inset border of the `rounded` variant. Without it the sprite matches `plain`.
- Positions are percentages, so a class works at any element size.
- The flag is a background, so add `role="img"` and `aria-label` when it carries meaning.

`sprite/flags.json` lists the pixel offset of every cell (`{ x, y }` on a 30x24 grid) for building your own CSS.

tabler-flags is licensed under the [MIT License](https://github.com/tabler/tabler-flags/blob/main/LICENSE).
