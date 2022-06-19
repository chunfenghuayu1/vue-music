import { reqArtistHotMusic, reqArtistDesc, reqArtistDetail, reqArtistSimi } from '@/api'
import formatSong from '@/utils/formatSong'

const state = {
  // 热门50首
  hotPlayList: [],
  // 歌手详情
  artistDesc: {},
  // 歌手信息
  artist: {},
  // 相似歌手
  simiArtists: []
}
const mutations = {
  GETARTISTHOTPLAY (state, data) {
    state.hotPlayList = data
  },
  GETARTISTDESC (state, data) {
    state.artistDesc = data
  },
  GETARTISTDETAIL (state, data) {
    state.artist = data.data.artist
  },
  GETARTISTSIMI (state, data) {
    state.simiArtists = data.artists
  }
}
const actions = {
  // 获取歌手热门50首歌曲
  async  getArtistHotPlay (ctx, id) {
    const { data } = await reqArtistHotMusic(id)
    if (data.code === 200) {
      // 把版权信息单独放入list
      const list = []
      // 遍历歌曲进行格式化处理
      data.songs.forEach(item => {
        item.license = !item.privilege.cp
        list.push(item.privilege)
      })
      // 格式化歌曲信息 获取url
      const arr = formatSong.formatSongs(data.songs, list)
      ctx.commit('GETARTISTHOTPLAY', arr)
    }
  },
  // 获取歌手简介
  async getArtistDesc (ctx, id) {
    const { data } = await reqArtistDesc(id)
    if (data.code === 200) {
      data.introduction.forEach(item => {
        const arr = item.txt.split('\n')
        item.txtArr = arr
      })
      ctx.commit('GETARTISTDESC', data)
    }
  },
  // 获取歌手专辑数量封面等
  async getArtistDetail (ctx, id) {
    // 统一清空数据，因为请求是异步，所以在第一次请求时，清空数据
    ctx.state.hotPlayList = []
    ctx.state.artistDesc = {}
    ctx.state.artist = {}
    ctx.state.simiArtists = []
    const { data } = await reqArtistDetail(id)
    if (data.code === 200) {
      ctx.commit('GETARTISTDETAIL', data)
    }
  },
  // 获取相似歌手
  async getArtistSimi (ctx, id) {
    const { data } = await reqArtistSimi(id)
    if (data.code === 200) {
      ctx.commit('GETARTISTSIMI', data)
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
