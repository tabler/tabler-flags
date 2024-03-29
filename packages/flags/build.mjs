import { globSync } from 'glob';
import { basename } from 'path';
import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { parseFlag, flagTypes } from '../../.build/helpers.mjs';

const flags = globSync('../../flags/*.svg');

Object.entries(flagTypes).forEach(([key, options]) => {
   mkdirSync(`./dist/${key}`, { recursive: true });
   console.log(`Processing ${key} flags...`)

   flags.forEach(flag => {
      let flagContent = readFileSync(flag, 'utf8'),
         name = basename(flag, '.svg');

      flagContent = parseFlag(flagContent, name, {
         ...options,
         removeSize: true
      })

      writeFileSync(`./dist/${key}/${name}.svg`, flagContent, 'utf8')
   })
})