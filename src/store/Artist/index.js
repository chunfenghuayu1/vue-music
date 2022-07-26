import { reqArtistList } from '@/api'
import formatSong from '@/utils/formatSong'
const state = {
  artistList: []
}
const mutations = {
  GETARTISTLIST (state, data) {
    // 处理列表的粉丝数据，进行格式化
    data.artists.forEach(item => {
      item.fansCount = formatSong.formartNum(item.fansCount)
    })
    state.artistList = data
  }
}
const actions = {
  // 获取歌手列表
  async getArtistList (ctx, params) {
    // console.log(params)
    const { type, area, initial, limit, offset } = params
    const { data } = await reqArtistList(type, area, initial, limit, offset)
    if (data.code === 200) {
      ctx.commit('GETARTISTLIST', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取歌手列表失败'))
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
