import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  // 配置路由
  routes,
  // 控制页面滚动行为，重置滚动
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // 判断是否有token
  // const token = store.state.login.token
  // // 此处暂时不进行拦截
  // if (token) {
  //   next()
  // } else {
  //   next()
  // }
  next()
})

export default router
