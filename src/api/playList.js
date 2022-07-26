import request from './request'
// 获取热门歌单标签
export const reqPlayListTags = () => request({ url: '/playlist/hot', method: 'get' })
// 根据标签获取歌单
export const reqPlayListDetail = (order = 'hot', cat = '', limit = 6) => request({ url: '/top/playlist', method: 'get', params: { limit, cat, order } })

// 获取歌单分类标签
export const reqListTags = () => request({ url: '/playlist/catlist', method: 'get' })

// 获取榜单评论 包括排行榜和歌单
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqPlayListComment = (id, limit = 100, offset = 0) => request({ url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' })
