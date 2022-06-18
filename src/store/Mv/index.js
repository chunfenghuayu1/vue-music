import { reqMv } from '@/api'
import { formatPlayCount } from '@/utils/formatCount'

const state = {
  // 存储mv列表数据
  mvList: []
}
const mutations = {
  GETNAVMENU (state, data) {
    data.forEach(item => {
      item.playCount1 = formatPlayCount(item.playCount)
    })
    state.mvList = data
  }
}
const actions = {
  // 获取导航菜单数据
  async getNavMenu (ctx, params) {
    const { data } = await reqMv(params)
    if (data.code === 200) {
      ctx.commit('GETNAVMENU', data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取mv列表失败!'))
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
