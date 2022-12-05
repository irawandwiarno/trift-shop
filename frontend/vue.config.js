const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  // configureWebpack: {
  //   devServer: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:3000',
  //       },
  //     },
  //   },
  // }
})

module.exports = {
  devServer: {
      proxy: 'https://localhost:3000'
  }
}
