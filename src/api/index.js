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

// 获取歌手列表
/*
    * 给评论点赞
    * type: -1:全部; 1:男歌手; 2:女歌手; 3:乐队
    * area: -1:全部; 7华语; 96欧美; 8:日本; 16韩国; 0:其他
    * initial: 按首字母索引查找参数, 热门传-1, #传0
    * limit: 30
    * offset: 0
*/
export const reqArtistList = (type, area, initial, limit, offset) => request({ url: `/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`, method: 'get' })
