import { globSync } from 'glob';
import { join, basename } from 'path';
import { readFileSync } from 'fs';

const __dirname = new URL('.', import.meta.url).pathname;
const flags = globSync(join(__dirname, '../flags/*.svg')).sort()

flags.forEach(flag => {
   let flagContent = readFileSync(flag, 'utf8'),
      name = basename(flag, '.svg');

   console.log(`Validate flag ${name}`)

   if (flagContent.match(/<g(?: fill="none")?(?: fill-rule="[^"]+")?>(.*)<\/g>/gm)) {
      console.error(`Flag ${name} has a <g> tag with fill attributes`)
      process.exit(1)
   }

   if (flagContent.match(/<g /gm)) {
      console.error(`Flag ${name} has a <g> tag with attributes`)
      process.exit(1)
   }

   if(flagContent.match(/id=/gm)) {
      console.error(`Flag ${name} has an id attribute`)
      process.exit(1)
   }

   if(flagContent.match(/<style>/gm)) {
      console.error(`Flag ${name} has a <style> tag`)
      process.exit(1)
   }

   if(flagContent.match(/<title>/gm)) {
      console.error(`Flag ${name} has a <title> tag`)
      process.exit(1)
   }

   if(flagContent.match(/<defs>/gm)) {
      console.error(`Flag ${name} has a <defs> tag`)
      process.exit(1)
   }

   if(flagContent.match(/<clipPath>/gm)) {
      console.error(`Flag ${name} has a <clipPath> tag`)
      process.exit(1)
   }

   if(flagContent.match(/<mask>/gm)) {
      console.error(`Flag ${name} has a <mask> tag`)
      process.exit(1)
   }

   if (flagContent.match(/<circle/gm)) {
      console.error(`Flag ${name} has a <circle> tag`)
      process.exit(1)
   }

   if (flagContent.match(/<ellipse/gm)) {
      console.error(`Flag ${name} has a <ellipse> tag`)
      process.exit(1)
   }

   if (flagContent.match(/<line /gm)) {
      console.error(`Flag ${name} has a <line> tag`)
      process.exit(1)
   }

   if (flagContent.match(/<polygon /gm)) {
      console.error(`Flag ${name} has a <polygon> tag`)
      process.exit(1)
   }

   if (!flagContent.match(/width="30"/gm)) {
      console.error(`Flag ${name} has not a width of 30`)
      process.exit(1)
   }

   if (!flagContent.match(/height="24"/gm)) {
      console.error(`Flag ${name} has not a height of 24`)
      process.exit(1)
   }

   if (flagContent.match(/fill-rule/gm)) {
      console.error(`Flag ${name} has a fill-rule attribute`)
      process.exit(1)
   }

   if (!flagContent.trim().match(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="30" height="24" viewBox="0 0 30 24">([\n\s]*<path[^>]+\/>)+[\n\s]*<\/svg>$/gm)) {
      console.error(`Flag ${name} has not a valid structure`)
      process.exit(1)
   }

   if(name.match(/\s/)) {
      console.error(`Flag ${name} has a whitespace in the name`)
      process.exit(1)
   }
})