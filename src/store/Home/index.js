import { reqBanner, reqRankList, reqRankListDetail } from '@/api'
const state = {
  // 轮播图数据
  bannerList: [],
  // 排行榜单数据,截取前四榜单
  rankList: [],
  // 排行榜对应的歌曲数据
  rankListDetail: []
}
const mutations = {
  // 存储轮播图数据
  GETBANNER (state, data) {
    state.bannerList = data
  },
  // 存储排行榜单数据
  GETRANKLIST (state, data) {
    state.rankList = data
  },
  // 存储排行榜单歌曲详情数据
  GETRANKLISTDETAIL (state, data) {
    state.rankListDetail.push(data)
  }
}
const actions = {
  // 获取轮播图数据
  async getBanner (ctx) {
    const { data } = await reqBanner()
    // console.log(data)
    if (data.code === 200) {
      ctx.commit('GETBANNER', data.banners)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取轮播图数据失败'))
    }
  },
  // 获取排行榜
  async getRankList (ctx) {
    const { data } = await reqRankList()
    // console.log(res)
    if (data.code === 200) {
      ctx.commit('GETRANKLIST', data.list.splice(0, 4))
      return 'ok'
    } else {
      return Promise.reject(new Error('获取排行榜失败'))
    }
  },
  // 获取排行榜单详细数据
  getRankListDetail (ctx) {
    ctx.state.rankList.forEach(async (item) => {
      const { data } = await reqRankListDetail(item.id)
      if (data.code === 200) {
        ctx.commit('GETRANKLISTDETAIL', data)
        return 'ok'
      } else {
        return Promise.reject(new Error('获取排行榜歌曲失败'))
      }
    })
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
