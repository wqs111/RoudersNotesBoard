const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// include less
const path = require("path");
const { prependListener } = require('process');
module.exports = {
  pluginOptions: {
  "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/commons.less")],
  }
  }
}