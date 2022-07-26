import { reqPlayListComment, reqRankListDetail } from '@/api'
import formatSong from '@/utils/formatSong'
const state = {
  commentList: {},
  rankDetailList1: {}
}
const mutations = {
  GETRANKLISTCOMMENT (state, data) {
    // 格式化评论时间
    data.comments.forEach((item) => {
      item.time1 = formatSong.formartDate(item.time, 'yyyy年MM月dd日')
    })
    data.comments = [...data.hotComments, ...data.comments]
    // 格式化播放量
    data.total1 = formatSong.formartNum(data.total)
    state.commentList = data
  },
  GETRANKLISTDETAIL1 (state, data) {
    // 格式化播放量、订阅数、评论数、更新时间
    data.playCount = formatSong.formartNum(data.playlist.playCount)
    data.subscribedCount = formatSong.formartNum(data.playlist.subscribedCount)
    data.commentCount = formatSong.formartNum(data.playlist.commentCount)
    data.updateTime = formatSong.formartDate(
      data.playlist.updateTime,
      'yyyy年MM月dd日'
    )
    state.rankDetailList1 = data
  }
}
const actions = {
  // 获取评论
  async getRankListComment (ctx, id, limit = 20, offset = 0) {
    // 置空
    ctx.state.commentList = []
    const { data } = await reqPlayListComment(id)
    if (data.code === 200) {
      ctx.commit('GETRANKLISTCOMMENT', data)
    }
  },
  // 获取歌单内容
  async getRankListDetail (ctx, id) {
    ctx.state.rankDetailList1 = {}
    const { data } = await reqRankListDetail(id)
    if (data.code === 200) {
      ctx.commit('GETRANKLISTDETAIL1', data)
    }
  }
}
const getters = {
  songsDetailList (state) {
    if (state.rankDetailList1.playlist) {
      const list = state.rankDetailList1.playlist.tracks
      const privileges = state.rankDetailList1.privileges
      if (list && privileges) {
        list.forEach(async (item, index) => {
          // 是否有版权
          item.license = !privileges[index].cp
        })
        // 处理歌曲信息
        const songList = formatSong.formatSongs(list, privileges)
        return songList
      }
    }
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
