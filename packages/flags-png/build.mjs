import { globSync } from 'glob';
import { basename } from 'path';
import { readFileSync, mkdirSync } from 'fs';
import { parseFlag, flagTypes, asyncForEach } from '../../.build/helpers.mjs';
import sharp from 'sharp';

const flags = globSync('../../flags/*.svg');

const sizes = [12, 16, 24, 32, 48, 64, 128]

await asyncForEach(Object.entries(flagTypes), async ([key, options]) => {
   console.log(key, options)

   mkdirSync(`./dist/${key}`, { recursive: true });

   await asyncForEach(sizes, async size => {
      mkdirSync(`./dist/${key}/${size}`, { recursive: true });

      console.log(`Processing ${key} flags with size ${size}...`)

      await asyncForEach(flags, async flag => {
         let flagContent = readFileSync(flag, 'utf8'),
            name = basename(flag, '.svg');

         flagContent = parseFlag(flagContent, name, options, size)

         await sharp(Buffer.from(flagContent))
            .png()
            .toFile(`./dist/${key}/${size}/${name}.png`)
      })
   })
})