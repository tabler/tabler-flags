module.exports = function (eleventyConfig) {
   eleventyConfig.addPassthroughCopy("flags");
   eleventyConfig.addWatchTarget("../flags.json");

   eleventyConfig.addGlobalData("countries", () => {
      let countries = require('../flags.json');

      let c = {}
      Object.entries(countries).forEach(([key, country]) => {
         if (!c[country.category]) {
            c[country.category] = {}
         }

         c[country.category][key] = country
      })

      return c
   });

   return {
      dir: {
      }
   }
};