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
  flags.json
```

```js
import flags from '@tabler/flags/flags.json';
```

tabler-flags is licensed under the [MIT License](https://github.com/tabler/tabler-flags/blob/main/LICENSE).
