import { basename, dirname } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { globSync } from 'glob';
import { parseFlag, toPascalCase } from './helpers.mjs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { parseSync } from 'svgson'

const getSvgObjectChildren = (children, key, pascalCase) => {
   return children.map(({
      name,
      attributes,
      children
   }, i) => {
      if (key) {
         attributes.key = `svg-${i}`
      }

      if (pascalCase) {
         attributes.strokeWidth = attributes['stroke-width']
         attributes.strokeLinecap = attributes['stroke-linecap']
         attributes.strokeLinejoin = attributes['stroke-linejoin']
         attributes.clipPath = attributes['clip-path']

         delete attributes['stroke-linecap']
         delete attributes['stroke-linejoin']
         delete attributes['stroke-width']
         delete attributes['clip-path']
      }

      return [
         name, attributes, getSvgObjectChildren(children, key, pascalCase)
      ]
   })
}

const getSvgObject = (svg, key, pascalCase) => {
   const obj = parseSync(svg);

   return getSvgObjectChildren(obj.children, key, pascalCase)
}

export const buildFramework = (packageName, {
   componentTemplate,
   indexTemplate,
   extension = 'ts',
   key = false,
   pascalCase = false
} = options) => {
   const __dirname = dirname(fileURLToPath(import.meta.url));
   const flags = globSync(join(__dirname, '../flags/*.svg')).sort();
   const json = JSON.parse(readFileSync(join(__dirname, '../flags.json'), 'utf8'))

   let index = []

   flags.forEach(flag => {
      const name = basename(flag, '.svg');
      const flagData = json[name] || {}
      let flagContent = readFileSync(flag, 'utf8')

      flagContent = parseFlag(flagContent, name, {
         radius: 4,
         border: true,
         shadow: true
      })

      flagContent = flagContent.replace(/\n\s*/g, '')

      writeFileSync(join(__dirname, `../packages/${packageName}/src/flags/flag-${name}.${extension}`), componentTemplate({
         name,
         namePascal: toPascalCase(name),
         iso: flagData.iso,
         isoPascal: flagData.iso ? toPascalCase(flagData.iso) : null,
         svg: flagContent,
         svgObject: getSvgObject(flagContent, key, pascalCase)
      }), 'utf8')

      index.push(indexTemplate({
         name,
         namePascal: toPascalCase(name),
         iso: flagData.iso,
         isoPascal: flagData.iso ? toPascalCase(flagData.iso) : null,
      }))

      console.log(name);
   })

   writeFileSync(join(__dirname, `../packages/${packageName}/src/flags/index.ts`), index.join('\n'), 'utf8')
}