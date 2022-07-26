import {
  setisLogin,
  getisLogin,
  removeisLogin,
  setUser,
  getUser,
  removeUser
} from '@/utils/token'
import { login, logout } from '@/api'
const state = {
  // 是否登录
  isLogin: getisLogin() || false,
  // // 存储token
  // token: getToken(),
  // cookie: getCookie(),
  userInfo: getUser(),
  // 登录框默认不弹出
  dialogVisible: false
}
const mutations = {
  // 控制登录框弹出
  dialogVisible (state, val) {
    state.dialogVisible = val
  }
}
const actions = {
  // 登录
  async login (ctx, val) {
    const { phone, password } = val
    const timestamp = +new Date()
    const { data } = await login({ phone, password, timestamp })
    if (data.code === 200) {
      const { profile } = data
      // 设置token
      // setToken(token)
      // 设置cookie
      // setCookie(cookie)
      // 设置用户信息
      setUser(profile)
      // 更改登录状态
      setisLogin(true)
    }
    return data
  },
  // 退出登录
  async logout (ctx) {
    const { data } = await logout()
    if (data.code === 200) {
      // 删除cookie token user
      // removeToken()
      // removeCookie()
      removeisLogin()
      removeUser()
      return true
    } else {
      return false
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
