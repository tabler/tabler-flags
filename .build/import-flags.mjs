import { globSync } from 'glob';
import { join, basename } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { optimize } from 'svgo';

const __dirname = new URL('.', import.meta.url).pathname,
   flags = globSync(join(__dirname, '../import/*.svg')),
   flagsData = JSON.parse(readFileSync(join(__dirname, '../flags.json'), 'utf8'));

flags.forEach(flag => {
   let flagContent = readFileSync(flag, 'utf8'),
      name = basename(flag, '.svg');

   if (!flagsData[name]) {
      flagsData[name] = {}
   }

   flagContent = optimize(flagContent, {
      multipass: true,
      js2svg: {
         indent: 2,
         pretty: true
      },
      plugins: [
         "sortAttrs",
         "removeTitle",
         "cleanupIds",
         "removeXMLProcInst",
         "cleanupAttrs",
         "convertStyleToAttrs",
         "moveGroupAttrsToElems",
         "convertColors",
         "convertTransform",
         {
            name: "convertShapeToPath",
            params: {
               convertArcs: true
            }
         },
         {
            name: "cleanupNumericValues",
            params: {
               floatPrecision: 2
            }
         },
         {
            name: "convertPathData",
            params: {
               floatPrecision: 2
            }
         },
         {
            name: "convertTransform",
            params: {
               floatPrecision: 2
            }
         },
         {
            name: "cleanupListOfValues",
            params: {
               floatPrecision: 2
            }
         }
      ]
   }).data;

   flagContent = flagContent
      // Unwrap a single <g> that wraps the whole pretty-printed (multiline) content
      .replace(/^(<svg[^>]+>)\n\s*<g(?: stroke="none")?(?: stroke-width="1")?(?: fill="none")?(?: fill-rule="[^"]+")?>\n([\s\S]*?)\n\s*<\/g>\n(<\/svg>)\s*$/, (_, open, inner, close) => `${open}\n${inner.replace(/^ {2}/gm, '')}\n${close}\n`)
      .replace(/^(<svg[^>]+>)<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">(.*)<\/g>(<\/svg>)$/gm, `$1$2$3`)
      .replace(/^(<svg[^>]+>)<g(?: fill="none")?(?: fill-rule="[^"]+")?>(.*)<\/g>(<\/svg>)$/gm, `$1$2$3`)
      .replace(' xmlns:xlink="http://www.w3.org/1999/xlink"', '')
      .replace(/ fill="none"/g, '')
      .replace(/fill="#([^"]+)"/g, (_, fill) => {
         return `fill="#${fill.toLowerCase()}"`
      })

   // Write file if its different than the original
   const writePath = join(__dirname, `../src/${name}.svg`)
   if (!existsSync(writePath) || flagContent !== readFileSync(writePath, 'utf8')) {
      console.log(`Writing ${name}.svg`)
      writeFileSync(writePath, flagContent)
   }
})

// Write flags.json (only adds entries for imported flags, never removes existing ones)
writeFileSync(join(__dirname, '../flags.json'), JSON.stringify(flagsData, null, 2))
