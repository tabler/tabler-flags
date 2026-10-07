import { readFileSync, existsSync, readdirSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';
import { parseSync } from 'svgson';

export const getCurrentDirPath = () => path.dirname(fileURLToPath(import.meta.url));

export const HOME_DIR = resolve(getCurrentDirPath(), '..');
export const SRC_DIR = resolve(HOME_DIR, 'src');
export const PACKAGES_DIR = resolve(HOME_DIR, 'packages');

// Every source SVG shares this canvas — enforced by `.build/validate.mjs`.
export const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 30 24',
};

/**
 * Pre-baked visual variants. Every framework component ships all of them and
 * picks one at render time via the `variant` prop; `@tabler/flags` and
 * `@tabler/flags-png` emit one directory per variant.
 */
export const flagTypes = {
  rounded: {
    radius: 4,
    border: true,
    shadow: true,
  },
  plain: {
    radius: 0,
  },
  gradient: {
    radius: 4,
    border: true,
    shadow: true,
    gradient: true,
  },
  shiny: {
    radius: 4,
    border: true,
    shadow: true,
    gradient: true,
    gradientLinear: true,
  },
};

export const variants = Object.keys(flagTypes);
export const defaultVariant = 'rounded';

/**
 * Wrap a raw source flag (a plain list of <path>s on a 30x24 canvas) with the
 * decorations of one variant: rounded-corner clip, 1px inset border, top
 * highlight, and an optional overlay gradient.
 *
 * `id` must be unique per rendered <svg> in a document — variants of the same
 * flag define different gradients under the same local name, so callers pass
 * `${slug}-${variant}` when more than one variant can appear on a page.
 */
export const parseFlag = (
  svg,
  id,
  { radius = 0, shadow = false, border = false, gradient = false, gradientLinear = false, removeSize = false } = {},
  size = false,
) => {
  if (radius || gradient) {
    svg = svg.replace(/^(<svg[^>]+>)(.*)(<\/svg>)$/gms, (_, m1, m2, m3) => {
      const prefix = `flag-${id}`;

      return `${m1}
            <defs>
               ${radius ? `<clipPath id="${prefix}-clip"><rect width="30" height="24" fill="#fff" rx="${radius}"/></clipPath>` : ''}
               ${
                 gradient
                   ? gradientLinear
                     ? `<linearGradient id="${prefix}-gradient" x1="15" y1="0" x2="15" y2="24" gradientUnits="userSpaceOnUse">
<stop stop-color="white" stop-opacity="0.7"/>
<stop offset="1" stop-opacity="0.3"/>
</linearGradient>`
                     : `<linearGradient id="${prefix}-gradient" x1="30" y1="0" x2="-2" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" stop-opacity="0.3"/>
                  <stop offset="0.262741" stop-opacity="0.27"/>
                  <stop offset="0.369956" stop-color="white" stop-opacity="0.26"/>
                  <stop offset="0.487001" stop-opacity="0.55"/>
                  <stop offset="0.594445" stop-opacity="0.24"/>
                  <stop offset="0.736408" stop-color="white" stop-opacity="0.3"/>
                  <stop offset="0.901459" stop-color="#272727" stop-opacity="0.22"/>
                  <stop offset="1" stop-opacity="0.2"/>
               </linearGradient>`
                   : ''
               }
            </defs>
      ${radius ? `<g clip-path="url(#${prefix}-clip)">` : ''}
      ${m2}
      ${gradient ? `<rect width="30" height="24" fill="url(#${prefix}-gradient)" style="mix-blend-mode:overlay"/>` : ''}
      ${radius ? `</g>` : ''}
      ${border ? `<rect width="29" height="23" x=".5" y=".5" fill="none" opacity=".15" stroke="#000" stroke-width="1" rx="${Math.max(radius - 0.5, 0)}" />` : ''}
      ${
        shadow
          ? `<path fill="#fff" d="M${radius} 1a${radius - 1} ${radius - 1} 0 0 0-${radius - 1} ${radius - 1}v1a${radius - 1} ${radius - 1} 0 0 1 ${radius - 1}-${radius - 1}h${32 - radius * 2 - 2}a${radius - 1} ${radius - 1} 0 0 1 ${radius - 1} ${radius - 1}v-1a${radius - 1} ${radius - 1} 0 0 0-${radius - 1}-${radius - 1}Z" opacity=".1"/>`
          : ''
      }
      ${m3}`;
    });

    svg = optimize(svg, {
      js2svg: {
        indent: 3,
        pretty: true,
      },
      plugins: [
        {
          name: 'cleanupIds',
          params: {
            remove: false,
            minify: false,
          },
        },
      ],
    }).data;
  }

  if (size) {
    svg = svg.replace(/^(<svg[^>]+) width="30" height="24"/gm, `$1 height="${size}"`);
  }

  if (removeSize) {
    svg = svg.replace(/^(<svg[^>]+) width="30" height="24"/gm, `$1`);
  }

  return svg;
};

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const toCamelCase = (string) =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => (p2 ? p2.toUpperCase() : p1.toLowerCase()));

export const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

/** `stroke-width` -> `strokeWidth`, `clip-path` -> `clipPath`, `xlink:href` -> `xlinkHref`. */
export const toCamelCaseAttr = (attr) => attr.replace(/[-:]([a-z])/g, (_, c) => c.toUpperCase());

/**
 * Recursively convert a svgson node into a `FlagNode` tuple: [tag, attrs, children?].
 * Recursion is required: every decorated variant nests <defs>/<clipPath>/<linearGradient>
 * and wraps the paths in a clipping <g>.
 */
/** `mix-blend-mode:overlay` -> `{ mixBlendMode: 'overlay' }` for JSX runtimes that reject string styles. */
const styleToObject = (style) =>
  Object.fromEntries(
    style
      .split(';')
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => {
        const [prop, ...rest] = rule.split(':');
        return [toCamelCaseAttr(prop.trim()), rest.join(':').trim()];
      }),
  );

const buildNode = (node, { pascalCase }) => {
  const attrs = {};
  for (const [key, value] of Object.entries(node.attributes || {})) {
    if (pascalCase && key === 'style') {
      attrs.style = styleToObject(value);
    } else {
      attrs[pascalCase ? toCamelCaseAttr(key) : key] = value;
    }
  }

  const children = (node.children || [])
    .filter((child) => child.type === 'element')
    .map((child) => buildNode(child, { pascalCase }));

  return children.length ? [node.name, attrs, children] : [node.name, attrs];
};

export const svgToNodes = (svg, { pascalCase = false } = {}) =>
  parseSync(svg).children.map((node) => buildNode(node, { pascalCase }));

/**
 * Load the canonical flag list from the repo-root flags.json, cross-reference it
 * against the SVGs in src/, and return one entry per flag that exists on disk.
 * Entries without an SVG are skipped with a warning; SVGs missing from
 * flags.json are reported as stray.
 *
 * `homeDir` overrides the repo root for callers whose bundle moves this file
 * (the Astro preview resolves it from `process.cwd()`).
 *
 * With `withVariants`, every entry also gets `variants[<name>]` holding the
 * decorated SVG string (and, with `withNodes`, its parsed node tree).
 */
export const getAllFlags = ({ withVariants = false, withNodes = false, pascalCase = false, homeDir = HOME_DIR } = {}) => {
  const srcDir = resolve(homeDir, 'src');
  const canonical = JSON.parse(readFileSync(resolve(homeDir, 'flags.json'), 'utf-8'));

  const flags = [];
  const missing = [];

  Object.entries(canonical).forEach(([slug, { name, category, iso }]) => {
    const svgPath = resolve(srcDir, `${slug}.svg`);

    if (!existsSync(svgPath)) {
      missing.push(slug);
      return;
    }

    const content = readFileSync(svgPath, 'utf-8');

    const flag = {
      slug,
      name,
      category,
      iso: iso ?? null,
      namePascal: toPascalCase(slug),
      isoPascal: iso ? toPascalCase(iso) : null,
      content,
    };

    if (withVariants || withNodes) {
      flag.variants = {};
      variants.forEach((variant) => {
        const decorated = parseFlag(content, `${slug}-${variant}`, { ...flagTypes[variant], removeSize: true }).replace(/\n\s*/g, '');
        flag.variants[variant] = {
          content: decorated,
          ...(withNodes ? { nodes: svgToNodes(decorated, { pascalCase }) } : {}),
        };
      });
    }

    flags.push(flag);
  });

  if (missing.length) {
    console.warn(`\n[tabler-flags] Skipping ${missing.length} flag(s) with no SVG yet: ${missing.join(', ')}\n`);
  }

  const stray = readdirSync(srcDir)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.replace(/\.svg$/, ''))
    .filter((slug) => !canonical[slug]);
  if (stray.length) {
    console.warn(`\n[tabler-flags] Ignoring SVG(s) not in flags.json: ${stray.join(', ')}\n`);
  }

  return flags;
};
