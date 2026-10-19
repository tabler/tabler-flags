#!/usr/bin/env node

import { mkdirSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';
import { HOME_DIR, flagTypes, getAllFlags, parseFlag } from '../../.build/helpers.mjs';
import { buildSprite } from '../../.build/build-sprite.mjs';

const flags = getAllFlags();

Object.entries(flagTypes).forEach(([variant, options]) => {
  mkdirSync(`./dist/${variant}`, { recursive: true });
  console.log(`Processing ${variant} flags...`);

  flags.forEach(({ slug, content }) => {
    writeFileSync(`./dist/${variant}/${slug}.svg`, parseFlag(content, slug, { ...options, removeSize: true }), 'utf8');
  });
});

console.log('Building sprite...');
const { cells, rows } = buildSprite({ outDir: './dist/sprite' });
console.log(`Sprite: ${cells} flags in ${rows} rows`);

copyFileSync(resolve(HOME_DIR, 'flags.json'), './dist/flags.json');
