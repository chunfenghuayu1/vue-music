import request from './request'
// 获取排行榜单数据
export const reqRankList = () => request.get('/toplist')
// 根据排行榜获取对应歌单 `/playlist/detail?id=${id}` get
export const reqRankListDetail = (id) => request.get(`/playlist/detail?id=${id}`)
