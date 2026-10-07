import { execSync } from 'child_process';
import path from 'path';
import { HOME_DIR } from './helpers.mjs';

const lastVersion = process.env.LATEST_VERSION;

if (!lastVersion || lastVersion === 'null') {
  console.log('No previous release tag, skipping changelog diff.');
  process.exit(0);
}

const diff = execSync(`git diff ${lastVersion} HEAD --name-status -- src`, {
  cwd: HOME_DIR,
  encoding: 'utf-8',
});

const added = [];
const modified = [];
const renamed = [];

diff
  .trim()
  .split('\n')
  .filter(Boolean)
  .forEach((line) => {
    const parts = line.split('\t');
    const status = parts[0];
    const slug = (file) => path.basename(file, '.svg');

    if (status === 'A') added.push(slug(parts[1]));
    else if (status === 'M') modified.push(slug(parts[1]));
    else if (status.startsWith('R')) renamed.push([slug(parts[1]), slug(parts[2])]);
  });

const uniq = (arr) => [...new Set(arr)];

if (added.length) console.log(`${added.length} new flag${added.length > 1 ? 's' : ''}: ${uniq(added).map((s) => `\`${s}\``).join(', ')}\n`);
if (modified.length) console.log(`Updated: ${uniq(modified).map((s) => `\`${s}\``).join(', ')}\n`);
if (renamed.length) renamed.forEach(([from, to]) => console.log(`Renamed \`${from}\` to \`${to}\``));
