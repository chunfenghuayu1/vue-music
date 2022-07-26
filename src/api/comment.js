import request from './request'
// 发表评论
// t 1：发送 2：回复
// type 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
// id:对应资源 id
// content :要发送的内容
// commentId :回复的评论 id (回复评论时必填)
export const comment = ({ t, type, id, content }) => request({ url: `/comment?t=${t}&type=${type}&id=${id}&content=${content}`, method: 'get' })
