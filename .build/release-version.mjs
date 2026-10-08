// Runs after `changeset version` (see the `version-packages` script) on the
// "Version packages" branch: brings the root package.json, which is not a
// workspace package and is left alone by Changesets, to the version it picked.
// All packages are released together in one version (see `fixed` in
// .changeset/config.json), the GitHub release and its tag use this version.
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { HOME_DIR, PACKAGES_DIR } from './helpers.mjs';

const { version } = JSON.parse(readFileSync(resolve(PACKAGES_DIR, 'flags/package.json'), 'utf-8'));

console.log(`Preparing release ${version}`);

const rootPackagePath = resolve(HOME_DIR, 'package.json');
const rootPackage = JSON.parse(readFileSync(rootPackagePath, 'utf-8'));
rootPackage.version = version;
writeFileSync(rootPackagePath, `${JSON.stringify(rootPackage, null, 2)}\n`);
