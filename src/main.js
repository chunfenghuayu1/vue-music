import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化全局样式
import '../public/reset.css'
// 引入图标
import '@/assets/style/iconfont.css'
// 引入element组件
import './element_ui'
// 全局挂载aixios
import API from './api'
Vue.prototype.$http = API

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')