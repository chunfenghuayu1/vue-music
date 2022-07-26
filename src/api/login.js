import request from './request'
// 手机登录 183.93.123.231
export const login = ({ phone, password, realIP = '183.93.123.231', timestamp = '' }) => request.post('/login/cellphone', { phone, password, realIP, timestamp })
// 获取用户信息 暂时不用
export const getUserInfo = () => request({ url: '/user/account', method: 'get' })
// 退出登录
export const logout = () => request({ url: '/logout', method: 'get' })
