const { defineConfig } = require('@vue/cli-service')
// 引入打包分析工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭sourcemap
  productionSourceMap: false,
  // 配置打包文件路径 打包时必须开启，不然加载不了本地js，css资源
  publicPath: './',
  // 自动打开浏览器
  // devServer: {
  //   host: '127.0.0.1',
  //   port: 8080,
  //   open: true,
  //   // 配置代理，请求api
  //   proxy: {
  //     '/api': {
  //       target: 'http://120.48.31.206:3000',
  //       // target: 'https://netease-cloud-music-api-omega-henna.vercel.app',
  //       changeOrigin: true
  //       // pathRewrite: { '^/api': '' }
  //     }
  //   }
  // },
  // 关闭eslint
  lintOnSave: false,
  // 配置打包分析工具
  // 如果需要打包，则开启此工具，查看项目结构
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    // cdn引入忽略项
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      dplayer: 'DPlayer',
      nprogress: 'NProgress'
    }
  }
})
