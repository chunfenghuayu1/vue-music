import request from './request'

// 轮播图
export const reqBanner = () => request.get('/banner')

// 获取排行榜单数据
export const reqRankList = () => request.get('/toplist')
// 根据排行榜获取对应歌单 `/playlist/detail?id=${id}` get
export const reqRankListDetail = (id) => request.get(`/playlist/detail?id=${id}`)

// 获取热门歌单标签
export const reqPlayListTags = () => request({ url: '/playlist/hot', method: 'get' })
// 根据标签获取歌单
export const reqPlayListDetail = (order = 'hot', cat = '', limit = 6) => request({ url: '/top/playlist', method: 'get', params: { limit, cat, order } })

// 获取歌单分类标签
export const reqListTags = () => request({ url: '/playlist/catlist', method: 'get' })
