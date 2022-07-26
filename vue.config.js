const { defineConfig } = require('@vue/cli-service')
// 引入打包分析工具
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// js文件压缩 gzip
const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensionsc = ['js', 'css'] // 压缩的文件类型
// 解决resolve问题
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭sourcemap
  productionSourceMap: false,
  // 配置打包文件路径 打包时必须开启，不然加载不了本地js，css资源
  publicPath: './',
  outputDir: 'dist',
  // 自动打开浏览器
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    open: process.env.NODE_ENV === 'development'
    // 配置代理，请求api
    // 开发环境请开启
    // proxy: {
    //   '/dev-api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: { '^/dev-api': '' }
    //   }
    // }
  },
  // 关闭eslint
  lintOnSave: false,
  // 配置打包分析工具
  // 如果需要打包，则开启此工具，查看项目结构
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new BundleAnalyzerPlugin(),
          // 对js文件进行压缩
          new CompressionPlugin({
          // [file] 会被替换成原始资源。[path] 会被替换成原始资源的路径， [query] 会被替换成查询字符串。默认值是 "[path].gz[query]"。
            filename: 'js/[name].gz', // 提示compression-webpack-plugin@3.0.0的话asset改为filename
            // 可以是 function(buf, callback) 或者字符串。对于字符串来说依照 zlib 的算法(或者 zopfli 的算法)。默认值是 "gzip"。
            algorithm: 'gzip',
            // 所有匹配该正则的资源都会被处理。默认值是全部资源。
            test: new RegExp('\\.(' + productionGzipExtensionsc.join('|') + ')$'),
            // 只有大小大于该值的资源会被处理。单位是 bytes。默认值是 0。
            threshold: 10240,
            // 只有压缩率小于这个值的资源才会被处理。默认值是 0.8。
            minRatio: 0.8,
            deleteOriginalAssets: false // 删除原文件，如果运行在本地，此项需要关闭
          })],
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
    }
  },
  chainWebpack: config => {
    // 如果是生产环境，则进行优化
    if (process.env.NODE_ENV === 'production') {
      // 移除 prefetch 插件
      config.plugins.delete('prefetch')
      // 移除 preload 插件
      config.plugins.delete('preload')
      // 去除console.log
      config.optimization.minimizer('terser').tap((args) => {
        args[0].parallel = 4
        args[0].terserOptions.compress.warnings = true
        args[0].terserOptions.compress.drop_debugger = true
        args[0].terserOptions.compress.drop_console = true
        return args
      })
      // 添加 CDN 参数到 htmlWebpackPlugin 配置中
      config.plugin('html').tap((args) => {
        args[0].cdn = {
          js: [
            'https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js',
            'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js',
            'https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js',
            'https://cdn.bootcdn.net/ajax/libs/axios/0.27.2/axios.min.js',
            'https://unpkg.com/element-ui@2.15.9/lib/index.js',
            'https://cdn.bootcdn.net/ajax/libs/dplayer/1.26.0/DPlayer.min.js',
            'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js'
          ],
          css: [
            'https://unpkg.com/element-ui@2.15.9/lib/theme-chalk/index.css',
            'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css'
          ]
        }
        return args
      })
    }
    // 处理svg-sprite
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')) // index.js 的路径
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // index.js 的路径
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
