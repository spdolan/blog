const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([optimizedImages], {
  basePath: "/blog",
  assetPrefix: "/blog/", // assetPrefix requires the trailing slash
});
