import request from './request'
/* ********* MV ********* */
// 获取 全部mv
export const reqMv = ({ area = '', type = '', order = '', limit = 50, offset = 0 }) => request({ url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`, method: 'get' })
// 获取 mv详情
export const mvDetail = (id = '') => request({ url: `/mv/detail?mvid=${id}`, method: 'get' })
// 获取 地址
export const mvUrl = (id = '', r = 1080) => request({ url: `/mv/url?id=${id}&r=${r}`, method: 'get' })

// 获取mv评论
// , offset = 0, before = 0, timestamp = 0
export const commentMv = (id = '', limit = 100) => request({ url: `/comment/mv?id=${id}&limit=${limit}`, method: 'get' })

// 相似mv
export const simiMv = (id) => request({ url: `/simi/mv?mvid=${id}`, method: 'get' })
