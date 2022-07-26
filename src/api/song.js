import request from './request'
// 获取歌曲的详情
export const reqSongDetail = (id, timestamp = 0) => request({ url: `/song/detail?ids=${id}&timestamp=${timestamp}`, method: 'get' })
// 获取相似歌曲 /simi/song
export const reqSimiSong = (id) => request({ url: `/simi/song?id=${id}`, method: 'get' })
// 获取歌词
export const reqLyric = (id) => request({ url: `/lyric?id=${id}`, method: 'get' })
// 获取歌曲评论
export const reqComment = (id, limit) => request({ url: `/comment/music?id=${id}&limit=${limit}`, method: 'get' })
