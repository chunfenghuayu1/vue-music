import { reqSongDetail, reqSimiSong, reqComment, reqLyric } from '@/api'
import formatSong from '@/utils/formatSong'
const state = {
  song: {},
  // 相似歌曲
  simiSong: [],
  // 评论数据
  commentList: [],
  // 歌词
  lyric: []
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
      item.time1 = formatSong.formartDate(item.time, 'yyyy年MM月dd日')
    })
    data.comments = [...data.hotComments, ...data.comments]
    state.commentList = data
  },
  GETLYRIC (state, data) {
    state.lyric = data
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
  async getCommentList (ctx, id, limit = 100) {
    ctx.state.commentList = []
    if (id) {
      const { data } = await reqComment(id, limit)
      ctx.commit('GETCOMMENTLIST', data)
    }
  },
  // 获取歌词
  async getLyric (ctx, id) {
    ctx.state.lyric = []
    const { data } = await reqLyric(id)
    if (data.code === 200) {
      // console.log(data)
      const arr = data.lrc.lyric.split('\n')
      const newarr = []
      arr.forEach(item => {
        if (item) {
          newarr.push(item.split(']')[1].trim())
        }
      })
      ctx.commit('GETLYRIC', newarr)
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
