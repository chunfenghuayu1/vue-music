// 对外暴露一个函数
// 存储token
// export const setToken = (token) => {
//   localStorage.setItem('token', token)
// }
// // 获取token
// export const getToken = () => {
//   return localStorage.getItem('token')
// }
// // 清空token
// export const removeToken = () => {
//   localStorage.removeItem('token')
// }
// // 存储cookie
// export const setCookie = (Cookie) => {
//   localStorage.setItem('cookie', Cookie)
// }
// // 获取cookie
// export const getCookie = () => {
//   return localStorage.getItem('cookie')
// }
// // 清空cookie
// export const removeCookie = () => {
//   localStorage.removeItem('cookie')
// }
// 存储登录状态
export const setisLogin = (value) => {
  localStorage.setItem('isLogin', value)
}
// 获取登录状态
export const getisLogin = () => {
  return localStorage.getItem('isLogin')
}
// 移除登录状态
export const removeisLogin = () => {
  localStorage.removeItem('isLogin')
}
// 存储用户信息
export const setUser = (info) => {
  localStorage.setItem('USER', JSON.stringify(info))
}
// 获取用户信息
export const getUser = () => {
  return JSON.parse(localStorage.getItem('USER'))
}
// 移除用户信息
export const removeUser = () => {
  localStorage.removeItem('USER')
}
