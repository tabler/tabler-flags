import { optimize } from 'svgo';
import { parseSync } from 'svgson'

export const flagTypes = {
   rounded: {
      radius: 4,
      border: true,
      shadow: true
   },
   plain: {
      radius: 0,
   },
   gradient: {
      radius: 4,
      border: true,
      shadow: true,
      gradient: true,
   },
   shiny: {
      radius: 4,
      border: true,
      shadow: true,
      gradient: true,
      gradientLinear: true
   }
}

export const parseFlag = (svg, name, {
   radius = 0,
   shadow = false,
   border = false,
   gradient = false,
   gradientLinear = false,
   removeSize = false
} = options, size = false) => {
   
   if (radius || gradient) {
      svg = svg
         .replace(/^(<svg[^>]+>)(.*)(<\/svg>)$/gms, (_, m1, m2, m3) => {
            const id = `flag-${name}`

            return `${m1}
            <defs>
               ${radius ? `<clipPath id="${id}-clip"><rect width="30" height="24" fill="#fff" rx="${radius}"/></clipPath>` : ''}
               ${gradient ? (gradientLinear ? `<linearGradient id="${id}-gradient" x1="15" y1="0" x2="15" y2="24" gradientUnits="userSpaceOnUse">
<stop stop-color="white" stop-opacity="0.7"/>
<stop offset="1" stop-opacity="0.3"/>
</linearGradient>` : `<linearGradient id="${id}-gradient" x1="30" y1="0" x2="-2" y2="24" gradientUnits="userSpaceOnUse">
                  <stop stop-color="white" stop-opacity="0.3"/>
                  <stop offset="0.262741" stop-opacity="0.27"/>
                  <stop offset="0.369956" stop-color="white" stop-opacity="0.26"/>
                  <stop offset="0.487001" stop-opacity="0.55"/>
                  <stop offset="0.594445" stop-opacity="0.24"/>
                  <stop offset="0.736408" stop-color="white" stop-opacity="0.3"/>
                  <stop offset="0.901459" stop-color="#272727" stop-opacity="0.22"/>
                  <stop offset="1" stop-opacity="0.2"/>
               </linearGradient>`) : ''}
            </defs>
      ${radius ? `<g clip-path="url(#${id}-clip)">` : ''}
      ${m2}
      ${gradient ? `<rect width="30" height="24" fill="url(#${id}-gradient)" style="mix-blend-mode:overlay"/>` : ''}
      ${radius ? `</g>` : ''}
      ${border ? `<rect width="29" height="23" x=".5" y=".5" fill="none" opacity=".15" stroke="#000" stroke-width="1" rx="${Math.max(radius - .5, 0)}" />` : ''}
      ${shadow ? `<path fill="#fff" d="M${radius} 1a${radius - 1} ${radius - 1} 0 0 0-${radius - 1} ${radius - 1}v1a${radius - 1} ${radius - 1} 0 0 1 ${radius - 1}-${radius - 1}h${32 - radius * 2 - 2}a${radius - 1} ${radius - 1} 0 0 1 ${radius - 1} ${radius - 1}v-1a${radius - 1} ${radius - 1} 0 0 0-${radius - 1}-${radius - 1}Z" opacity=".1"/>` : ''}
      ${m3}`
         })

      svg = optimize(svg, {
         js2svg: {
            indent: 3,
            pretty: true,
         },
         plugins: [
            {
               name: "cleanupIds",
               params: {
                  remove: false,
                  minify: false
               }
            }
         ]
      }).data;
   }

   if (size) {
      svg = svg
         .replace(/^(<svg[^>]+) width="30" height="24"/gm, `$1 height="${size}"`)
   }

   if (removeSize) {
      svg = svg
         .replace(/^(<svg[^>]+) width="30" height="24"/gm, `$1`)
   }

   return svg
}

export const asyncForEach = async (array, callback) => {
   for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
   }
}

export const getSvgContents = (svg) => {
   return parseSync(svg)
}

export const toCamelCase = (string) => {
   return string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase())
}

export const toPascalCase = (string) => {
   const camelCase = toCamelCase(string);

   return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}