import * as Song from '@/utils/playList'
const state = {
  // 播放列表
  musicList: Song.getSong() || []
}
const mutations = {
  // 存储歌曲
  ADDMUSIC (state, song) {
    state.musicList.unshift(song)
    Song.setSong(state.musicList)
    state.musicList = Song.getSong() || []
  },
  // 删除歌曲
  DELETESONG (state, id) {
    // const list = Song.getSong()
    // const newList = list.filter(item => item.id !== id)
    // Song.setSong(newList)
    Song.deleteSong(id)
    state.musicList = Song.getSong() || []
  },
  // 清除歌曲
  REMOVESONG (state, id) {
    Song.removeSong(id)
    state.musicList = Song.getSong() || []
  }
}
const actions = {
  // 添加歌曲
  addMusic (ctx, song) {
    // 歌曲去重
    const list = ctx.state.musicList
    const res = list.some(item => { return item.id === song.id })
    if (!res) {
      ctx.commit('ADDMUSIC', song)
      return res
    } else {
      return res
    }
  },
  // 初始化播放列表
  async initList (ctx) {
    await ctx.commit('INIT')
  },
  // 删除歌曲
  deleteSong (ctx, id) {
    ctx.commit('DELETESONG', id)
  },
  // 清空歌曲
  removeSong (ctx, id) {
    ctx.commit('REMOVESONG', id)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
