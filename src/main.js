import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化全局样式
import './assets/style/reset.css'
// 引入图标
import '@/assets/style/iconfont.css'
// 引入element组件
import './element_ui'
import 'swiper/dist/css/swiper.css'

// 全局挂载aixios
import * as API from './api'

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
