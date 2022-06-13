const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭sourcemap
  productionSourceMap: false,
  // 自动打开浏览器
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    open: true,
    // 配置代理，请求api
    proxy: {
      '/api': {
        target: 'https://netease-cloud-music-api-omega-henna.vercel.app',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  // 关闭eslint
  lintOnSave: false
})
