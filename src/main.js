import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化全局样式
import '@/styles/reset.css'
// 引入图标
import '@/styles/iconfont.css'
// ----------------------------------------
// 如果需要build打包，请注释掉该行
// import 'swiper/dist/css/swiper.css'
// 引入element组件 打包时注释掉
// import './element_ui'
// ------------------------------------

import '@/icons' // svg组件
// 全局挂载aixios
import * as API from './api'
// 全局注册评论组件
import Comments from '@/components/Comments/index.vue'
Vue.component('Comments', Comments)

Vue.prototype.$http = API
// bus传递参数
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this
  }
}).$mount('#app')
