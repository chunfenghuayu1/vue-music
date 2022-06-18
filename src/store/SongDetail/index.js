import { reqSongDetail, reqSimiSong, reqComment } from '@/api'
import formatSong from '@/utils/formatSong'
const state = {
  song: {},
  // 相似歌曲
  simiSong: [],
  // 评论数据
  commentList: []
}
const mutations = {
  GETSONGDETAIL (state, data) {
    const { songs, privileges } = data
    // 是否有版权
    songs[0].license = !privileges[0].cp
    const songList = formatSong.formatSongs(songs, privileges)[0]
    state.song = songList
  },
  GETSIMISONG (state, data) {
    state.simiSong = data.songs
  },
  GETCOMMENTLIST (state, data) {
    data.comments.forEach(item => {
      item.time1 = formatSong.formartDate(item.time, 'MM月dd日')
    })
    data.comments = [...data.hotComments, ...data.comments]
    state.commentList = data
  }
}
const actions = {
  // 获取歌曲详情
  async getSongDetail (ctx, id) {
    ctx.state.song = {}
    // 带时间戳
    const timestamp = new Date().valueOf()
    if (id) {
      const { data } = await reqSongDetail(id, timestamp)
      if (data.code === 200) {
        ctx.commit('GETSONGDETAIL', data)
      }
    }
  },
  // 获取相似歌曲
  async getSimiSong (ctx, id) {
    ctx.state.simiSong = []
    if (id) {
      const { data } = await reqSimiSong(id)
      ctx.commit('GETSIMISONG', data)
    }
  },
  // 获取评论
  async getCommentList (ctx, id, limit = 20) {
    ctx.state.commentList = []
    if (id) {
      const { data } = await reqComment(id, limit)
      ctx.commit('GETCOMMENTLIST', data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
