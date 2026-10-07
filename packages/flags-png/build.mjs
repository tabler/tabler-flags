#!/usr/bin/env node

import { mkdirSync } from 'fs';
import sharp from 'sharp';
import { flagTypes, getAllFlags, parseFlag, asyncForEach } from '../../.build/helpers.mjs';

const flags = getAllFlags();
const sizes = [12, 16, 24, 32, 48, 64, 128];

await asyncForEach(Object.entries(flagTypes), async ([variant, options]) => {
  await asyncForEach(sizes, async (size) => {
    mkdirSync(`./dist/${variant}/${size}`, { recursive: true });
    console.log(`Processing ${variant} flags with size ${size}...`);

    await asyncForEach(flags, async ({ slug, content }) => {
      await sharp(Buffer.from(parseFlag(content, slug, options, size)))
        .png()
        .toFile(`./dist/${variant}/${size}/${slug}.png`);
    });
  });
});
