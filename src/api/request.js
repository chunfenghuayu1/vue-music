import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
  // 基础路径
  // proxy代理已经配置
  baseURL: '/api',
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  // withCredentials: true,
  // 请求超时
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 如果有token，带上token
  // if (token) {
  //   config.headers.xxx = token
  // }
  nprogress.start()
  return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res
}
, (error) => {
  // 服务器无响应
  if (error) {
    return Promise.reject(new Error('服务器无响应'))
  }
})

export default request
