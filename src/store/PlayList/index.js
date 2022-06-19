// 歌单数据放这里
import { formatPlayCount } from '@/utils/formatCount'
import { reqListTags, reqPlayListDetail } from '@/api'

const state = {
  // 歌单标签
  tags: {},
  // 歌单详情
  tagList: []
}
const mutations = {
  GETTAGS (state, data) {
    state.tags = data
  },
  GETTAGLIST (state, data) {
    data.playlists.forEach((item) => {
      if (item.playCount) {
        item.playCount = formatPlayCount(item.playCount)
      }
    })
    state.tagList = data
  }

}
const actions = {
  // 获取所有歌单标签
  async getTags (ctx) {
    ctx.state.tags = {}
    const { data } = await reqListTags()
    if (data.code === 200) {
      ctx.commit('GETTAGS', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取歌单标签失败！'))
    }
  },
  // 获取对应标签的歌单内容 封面 名字 标签
  async getTagList (ctx, [order, cat, limit]) {
    ctx.state.tagList = []
    const { data } = await reqPlayListDetail(order, cat, limit)
    if (data.code === 200) {
      ctx.commit('GETTAGLIST', data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取标签对应的歌单内容失败'))
    }
  }
}
const getters = {
  // 处理歌单标签
  tagsList (state) {
    const list = []
    const obj = state.tags.categories
    for (const k in obj) {
      const newobj = {}
      const arr = state.tags.sub.filter(item => item.category == k)
      newobj.tags = arr
      newobj.key = obj[k]
      list.push(newobj)
    }
    return list
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
