import { reqMv, commentMv, mvDetail, mvUrl, simiMv } from '@/api'
import { formatPlayCount } from '@/utils/formatCount'

const state = {
  // 存储mv列表数据
  mvList: [],
  // mvurl
  mvUrl: {},
  mvDetail: {},
  commentList: {},
  simiMv: []
}
const mutations = {
  GETNAVMENU (state, data) {
    data.forEach(item => {
      item.playCount1 = formatPlayCount(item.playCount)
    })
    state.mvList = data
  },
  GETMVURL (state, data) {
    state.mvUrl = data.data
  },
  GETMVDETAIL (state, data) {
    data.data.playCount1 = formatPlayCount(data.data.playCount)
    state.mvDetail = data.data
  },
  GETMVCOMMENT (state, obj) {
    state.commentList = obj
  },
  GETSIMIMV (state, data) {
    data.mvs.forEach(item => {
      item.playCount1 = formatPlayCount(item.playCount)
    })
    state.simiMv = data.mvs
  }
}
const actions = {
  // 根据导航菜单数据，获取mv数据
  async getNavMenu (ctx, params) {
    ctx.state.mvList = []
    const { data } = await reqMv(params)
    if (data.code === 200) {
      ctx.commit('GETNAVMENU', data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取mv列表失败!'))
    }
  },
  // 获取mv评论
  async getMvComment (ctx, id, limit) {
    ctx.state.commentList = {}
    const { data } = await commentMv(id, limit)
    // console.log(data)
    if (data.code === 200) {
      // console.log(data)
      data.comments.push(...data.hotComments)
      ctx.commit('GETMVCOMMENT', data)
    }
  },
  // 获取mv详情
  async getMvDetail (ctx, id) {
    ctx.state.mvDetail = {}
    const { data } = await mvDetail(id)
    if (data.code === 200) {
      ctx.commit('GETMVDETAIL', data)
    }
  },
  // 获取mv地址
  async getMvUrl (ctx, id) {
    ctx.state.mvUrl = {}
    const { data } = await mvUrl(id)
    if (data.code === 200) {
      ctx.commit('GETMVURL', data)
    }
  },
  // 获取相似mv
  async getSimiMv (ctx, id) {
    ctx.state.simiMv = []
    const { data } = await simiMv(id)
    if (data.code === 200) {
      ctx.commit('GETSIMIMV', data)
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
