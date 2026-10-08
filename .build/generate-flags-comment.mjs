// Prints the markdown of the pull request comment with a preview of the flags
// added, changed, renamed or removed in `src/` relative to the base branch.
// Prints nothing when no flag changed. Run by the "Validate PR" workflow, the
// output is posted by the "Validate PR Comment" workflow.
//
//   BASE_SHA / BASE_REF  base of the comparison (default: origin/main)
//   BASE_REPO            repository the "before" images are loaded from
//   PR_REPO, PR_SHA      repository and commit the "after" images are loaded
//                        from, PR_SHA is also the head of the comparison
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { basename, resolve } from 'path';
import { HOME_DIR } from './helpers.mjs';

const WIDTH = 120;
const HEIGHT = 96;

const flagsData = JSON.parse(readFileSync(resolve(HOME_DIR, 'flags.json'), 'utf-8'));

const baseRef = process.env.BASE_SHA || process.env.BASE_REF || 'origin/main';
const baseRepo = process.env.BASE_REPO || process.env.GITHUB_REPOSITORY || 'tabler/tabler-flags';
const prRepo = process.env.PR_REPO || process.env.GITHUB_REPOSITORY || 'tabler/tabler-flags';
const prSha = process.env.PR_SHA || process.env.GITHUB_SHA || 'HEAD';
const headRef = process.env.PR_SHA || 'HEAD';

const git = (command) => execSync(`git ${command}`, { cwd: HOME_DIR, encoding: 'utf-8' });

const baseSha = git(`rev-parse ${baseRef}`).trim();

const changes = { added: [], modified: [], renamed: [], removed: [] };

git(`diff ${baseSha}...${headRef} --name-status -M -- src`)
  .trim()
  .split('\n')
  .filter(Boolean)
  .forEach((line) => {
    const [status, from, to] = line.split('\t');
    const slug = (file) => basename(file, '.svg');

    if (!from.endsWith('.svg')) {
      return;
    }

    if (status === 'A') changes.added.push(slug(from));
    else if (status === 'M') changes.modified.push(slug(from));
    else if (status === 'D') changes.removed.push(slug(from));
    else if (status.startsWith('R')) changes.renamed.push([slug(from), slug(to)]);
  });

const total = Object.values(changes).flat().length;

if (total === 0) {
  process.exit(0);
}

const image = (repo, ref, slug) =>
  `<img src="https://raw.githubusercontent.com/${repo}/${ref}/src/${slug}.svg" width="${WIDTH}" height="${HEIGHT}" alt="${slug}" />`;
const before = (slug) => image(baseRepo, baseSha, slug);
const after = (slug) => image(prRepo, prSha, slug);

const details = (slug) => {
  const data = flagsData[slug] || {};
  const name = data.name || '❌ Missing in `flags.json`';
  const category = data.category || '❌ No category';
  const iso = data.iso ? `\`${data.iso}\`` : '';

  return `${name} | ${category} | ${iso}`;
};

const section = (heading, rows, columns) => {
  if (rows.length === 0) {
    return '';
  }

  return (
    `### ${heading} (${rows.length})\n\n` +
    `| ${columns.join(' | ')} |\n` +
    `|${columns.map(() => '------').join('|')}|\n` +
    rows.map((row) => `| ${row.join(' | ')} |\n`).join('') +
    '\n'
  );
};

const plural = total > 1 ? 's' : '';
let markdown = `## 🏳️ Changed flags\n\nThis PR changes **${total}** flag${plural}.\n\n`;

markdown += section(
  'Added',
  changes.added.sort().map((slug) => [after(slug), `\`${slug}\``, details(slug)]),
  ['Flag', 'File', 'Name', 'Category', 'ISO'],
);

markdown += section(
  'Changed',
  changes.modified.sort().map((slug) => [before(slug), after(slug), `\`${slug}\``, details(slug)]),
  ['Before', 'After', 'File', 'Name', 'Category', 'ISO'],
);

markdown += section(
  'Renamed',
  changes.renamed
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([from, to]) => [after(to), `\`${from}\` → \`${to}\``, details(to)]),
  ['Flag', 'File', 'Name', 'Category', 'ISO'],
);

markdown += section(
  'Removed',
  changes.removed.sort().map((slug) => [before(slug), `\`${slug}\``]),
  ['Flag', 'File'],
);

console.log(markdown);
