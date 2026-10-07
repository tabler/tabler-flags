import fs from 'fs-extra';
import path from 'path';
import { PACKAGES_DIR, getAllFlags } from './helpers.mjs';

/**
 * Generate one component file per flag. Each component bakes every visual
 * variant (rounded, plain, gradient, shiny) and picks one at render time.
 */
export const buildJsFlags = ({ name, componentTemplate, indexItemTemplate, extension = 'ts', pascalCase = false, indexFile = 'flags.ts' }) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const flags = getAllFlags({ withNodes: true, pascalCase });

  fs.ensureDirSync(path.resolve(DIST_DIR, 'src/flags'));

  const index = [];

  flags.forEach((flag) => {
    const component = componentTemplate(flag);

    const filePath = path.resolve(DIST_DIR, 'src/flags', `Flag${flag.namePascal}.${extension}`);
    fs.writeFileSync(filePath, component, 'utf-8');

    index.push(indexItemTemplate(flag));
  });

  fs.writeFileSync(path.resolve(DIST_DIR, `src/flags/${indexFile}`), index.join('\n') + '\n', 'utf-8');

  return flags;
};

export const buildFlagsList = (name) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const flags = getAllFlags();

  fs.writeFileSync(
    path.resolve(DIST_DIR, './src/flags-list.ts'),
    `export default ${JSON.stringify(flags.map((f) => f.slug), null, 2)};\n`,
    'utf-8',
  );
};

/**
 * slug -> component map (plus lowercase ISO alias where one exists), consumed by
 * each framework's dynamic `<Flag name="poland" />` / `<Flag name="pl" />` lookup.
 */
export const buildFlagsMap = (name) => {
  const DIST_DIR = path.resolve(PACKAGES_DIR, name);
  const flags = getAllFlags();

  const imports = flags.map((f) => `import Flag${f.namePascal} from './Flag${f.namePascal}';`).join('\n');
  const map = flags
    .flatMap((f) => [`  '${f.slug}': Flag${f.namePascal},`, ...(f.iso && f.iso.toLowerCase() !== f.slug ? [`  '${f.iso.toLowerCase()}': Flag${f.namePascal},`] : [])])
    .join('\n');

  fs.writeFileSync(path.resolve(DIST_DIR, './src/flags/flags-map.ts'), `${imports}\n\nexport default {\n${map}\n};\n`, 'utf-8');
};
