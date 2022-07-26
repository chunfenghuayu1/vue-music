import request from './request'
// 获取歌手热门50首歌曲
export const reqArtistHotMusic = (id) => request({ url: `/artist/top/song?id=${id}`, method: 'get' })
// 获取歌手简介
export const reqArtistDesc = (id) => request({ url: `/artist/desc?id=${id}`, method: 'get' })
// 获取歌手专辑数量封面等
export const reqArtistDetail = (id) => request({ url: `/artist/detail?id=${id}`, method: 'get' })
// 获取相似歌手
export const reqArtistSimi = (id) => request({ url: `/simi/artist?id=${id}`, method: 'get' })
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
