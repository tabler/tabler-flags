module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("flags");
   eleventyConfig.addWatchTarget("../flags.json");

   eleventyConfig.addGlobalData("countries", () => {
      let countries = require('../flags.json');

      let c = {}
      Object.entries(countries).forEach(([key, country]) => {
         // get size of the svg file
         country.size = require('fs').statSync(`flags/${key}.svg`).size

         if (!c[country.category]) {
            c[country.category] = {}
         }

         c[country.category][key] = country
      })

      // sort by size
      Object.entries(c).forEach(([category, countries]) => {
         c[category] = Object.fromEntries(Object.entries(countries).sort((a, b) => a[1].size - b[1].size).reverse())
      })

      return c
   });

   return {
      dir: {
      }
   }
};