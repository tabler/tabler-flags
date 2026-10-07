import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { HOME_DIR, getAllFlags } from './helpers.mjs';

/**
 * Refresh the flag count between <!--flags-count--> markers and the per-category
 * flag table between <!--flags-table--> markers in README.md.
 */
const README_PATH = resolve(HOME_DIR, 'README.md');
const COUNT_MARKER = /<!--flags-count-->\d+<!--\/flags-count-->/g;
const TABLE_MARKER = /<!--flags-table-->[\s\S]*?<!--\/flags-table-->/;

const flags = getAllFlags();
let readme = readFileSync(README_PATH, 'utf-8');
const original = readme;

if (COUNT_MARKER.test(readme)) {
  readme = readme.replace(COUNT_MARKER, `<!--flags-count-->${flags.length}<!--/flags-count-->`);
} else {
  console.warn('[tabler-flags] No <!--flags-count--> marker found in README.md, skipping count');
}

if (TABLE_MARKER.test(readme)) {
  const categories = [...new Set(flags.map((f) => f.category))];
  const table = categories
    .map((category) => {
      const rows = flags
        .filter((f) => f.category === category)
        .map((f) => `| ${f.name}${f.alias ? ` (alias of \`${f.alias}\`)` : ''} | \`${f.slug}\` | ${f.iso ? `\`${f.iso}\`` : ''} | \`Flag${f.namePascal}\`${f.isoPascal ? `, \`Flag${f.isoPascal}\`` : ''} |`)
        .join('\n');
      return `### ${category}\n\n| Name | Slug | ISO | Component |\n| --- | --- | --- | --- |\n${rows}`;
    })
    .join('\n\n');

  readme = readme.replace(TABLE_MARKER, `<!--flags-table-->\n${table}\n<!--/flags-table-->`);
} else {
  console.warn('[tabler-flags] No <!--flags-table--> marker found in README.md, skipping table');
}

if (readme !== original) {
  writeFileSync(README_PATH, readme, 'utf-8');
  console.log(`[tabler-flags] README.md updated (${flags.length} flags)`);
}
