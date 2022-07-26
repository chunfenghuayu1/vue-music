import request from './request'
// 搜索相关
// 搜索建议
export const searchSuggest = (keywords) => request({ url: `/search/suggest?keywords=${keywords}`, method: 'get' })
