import { buildFramework } from '../../.build/build.mjs';

const componentTemplate = ({ name, svgObject }) => {
   return `\
import createReactComponent from '../createReactComponent';
export default createReactComponent('${name}', ${JSON.stringify(svgObject)});`;
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

buildFramework('flags-react', {
   componentTemplate,
   indexTemplate,
   key: true,
   pascalCase: true
})