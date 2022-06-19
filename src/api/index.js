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

// 获取歌曲的详情
export const reqSongDetail = (id, timestamp = 0) => request({ url: `/song/detail?ids=${id}&timestamp=${timestamp}`, method: 'get' })
// 获取相似歌曲 /simi/song
export const reqSimiSong = (id) => request({ url: `/simi/song?id=${id}`, method: 'get' })
// 获取歌词
export const reqLyric = (id) => request({ url: `/lyric?id=${id}`, method: 'get' })
// 获取歌曲评论
export const reqComment = (id, limit) => request({ url: `/comment/music?id=${id}&limit=${limit}`, method: 'get' })

// 获取榜单评论 包括排行榜和歌单
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
export const reqPlayListComment = (id, limit = 20, offset = 0) => request({ url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' })

// 获取歌手热门50首歌曲
export const reqArtistHotMusic = (id) => request({ url: `/artist/top/song?id=${id}`, method: 'get' })
// 获取歌手简介
export const reqArtistDesc = (id) => request({ url: `/artist/desc?id=${id}`, method: 'get' })
// 获取歌手专辑数量封面等
export const reqArtistDetail = (id) => request({ url: `/artist/detail?id=${id}`, method: 'get' })
// 获取相似歌手
export const reqArtistSimi = (id) => request({ url: `/simi/artist?id=${id}`, method: 'get' })

/* ********* MV ********* */
// 获取 mv
export const reqMv = ({ area = '', type = '', order = '', limit = 50, offset = 0 }) => request({ url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`, method: 'get' })
// 获取 mv详情
export const mvDetail = ({ id = '' }) => request({ url: `/mv/detail?mvid=${id}`, method: 'get' })
// 获取 地址
export const mvUrl = ({ id = '', r = 1080 }) => request({ url: `/mv/url?id=${id}&r=${r}`, method: 'get' })

// 获取mv评论
export const commentMv = ({ id = '', limit = 20, offset = 0, before = 0, timestamp = 0 }) => request({ url: `/comment/mv?id=${id}&limit=${limit}&offset=${offset}&before=${before}&timestamp=${timestamp}`, method: 'get' })

// 相似mv
export const simiMv = ({ id = '' }) => request({ url: `/simi/mv?mvid=${id}`, method: 'get' })
