#!/usr/bin/env node

import { mkdirSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';
import { HOME_DIR, flagTypes, getAllFlags, parseFlag } from '../../.build/helpers.mjs';

const flags = getAllFlags();

Object.entries(flagTypes).forEach(([variant, options]) => {
  mkdirSync(`./dist/${variant}`, { recursive: true });
  console.log(`Processing ${variant} flags...`);

  flags.forEach(({ slug, content }) => {
    writeFileSync(`./dist/${variant}/${slug}.svg`, parseFlag(content, slug, { ...options, removeSize: true }), 'utf8');
  });
});

copyFileSync(resolve(HOME_DIR, 'flags.json'), './dist/flags.json');
