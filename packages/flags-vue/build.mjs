import { buildFramework } from '../../.build/build.mjs';

const componentTemplate = ({ name, svgObject }) => {
   return `\
import createVueComponent from '../createVueComponent';
export default createVueComponent('${name}', ${JSON.stringify(svgObject)});`;
}

const indexTemplate = ({
   iso,
   isoPascal,
   name,
   namePascal
}) => {
   console.log(iso, isoPascal, name, namePascal)
   return `export { default as Flag${namePascal}${isoPascal ? `, default as Flag${isoPascal}` : ''} } from './flag-${name}'`;
}

buildFramework('flags-vue', {
   componentTemplate,
   indexTemplate,
   key: true,
})