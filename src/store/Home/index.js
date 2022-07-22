// 发现音乐、排行榜数据放在这里处理
import { formatPlayCount } from '@/utils/formatCount'
import {
  reqBanner,
  reqRankList,
  reqRankListDetail,
  reqPlayListTags,
  reqPlayListDetail
} from '@/api'
const state = {
  // 轮播图数据
  bannerList: [],
  // 排行榜单数据,截取前四榜单
  rankList: [],
  rankAllList: [],
  // 排行榜对应的歌曲数据
  rankListDetail: [],
  // 热门歌单标签,包含playListDetail
  // 存储歌单
  playListTags: [],
  // 存储歌单详情
  playListDetail: []
}
const mutations = {
  // 存储轮播图数据
  GETBANNER (state, data) {
    state.bannerList = data
  },
  // 存储排行榜单数据
  GETRANKLIST (state, data) {
    state.rankList = data.splice(0, 4)
    state.rankAllList = data
  },
  // 存储排行榜单歌曲详情数据
  GETRANKLISTDETAIL (state, data) {
    state.rankListDetail.push(data)
  },
  // 存储热门歌单标签
  GETPLAYLISTTAGS (state, data) {
    state.playListTags = data
    const obj = { name: '为您推荐' }
    state.playListTags.unshift(obj)
  },
  GETPLAYLISTDETAIL (state, data) {
    // console.log(data)
    // 处理播放量数据
    data.forEach(item => {
      item.playCount = formatPlayCount(item.playCount)
    })
    state.playListDetail = data
  }
}
const actions = {
  // 获取轮播图数据
  async getBanner (ctx) {
    // 获取前清空所有数据
    ctx.state.bannerList = []
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
    ctx.state.rankList = []
    ctx.state.rankAllList = []
    ctx.state.rankListDetail = []
    const { data } = await reqRankList()
    // console.log(res)
    if (data.code === 200) {
      ctx.commit('GETRANKLIST', data.list)
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
  },
  // 获取热门歌单标签
  async getPlayListTags (ctx) {
    // 清空数据
    ctx.state.playListTags = []
    ctx.state.playListDetail = []
    const { data } = await reqPlayListTags()
    if (data.code === 200) {
      // console.log(data)
      ctx.commit('GETPLAYLISTTAGS', data.tags.slice(0, 5))
    } else {
      return Promise.reject(new Error('获取获取热门歌单标签失败'))
    }
  },
  // 根据歌单标签获取歌单具体数据
  async getPlayListDetail (ctx, name = '为您推荐') {
    // ctx.state.playListTags.forEach(async (item) => {
    //   const name = item.name === '为您推荐' ? '' : item.name
    //   const { data } = await reqPlayListDetail(name)
    //   if (data.code === 200) {
    //     // console.log(data)
    //     // 把数据直接存入tags里面
    //     ctx.commit('GETPLAYLISTDETAIL', data.playlists)
    //   } else {
    //     return Promise.reject(new Error('获取获取热门歌单详情失败'))
    //   }
    // })
    const cat = name === '为您推荐' ? '' : name
    const { data } = await reqPlayListDetail('hot', cat, 6)
    if (data.code === 200) {
      // console.log(data)
      // 把数据直接存入tags里面
      ctx.commit('GETPLAYLISTDETAIL', data.playlists)
    } else {
      return Promise.reject(new Error('获取获取热门歌单详情失败'))
    }
  }
}
const getters = {
  // 处理后的排行榜数据
  newRankList (state) {
    const list1 = []
    state.rankListDetail.forEach((item) => {
      const obj = {}
      obj.name = item.playlist.name
      obj.updateTime = item.playlist.updateTime
      obj.list = item.playlist.tracks.slice(0, 6)
      list1.push(obj)
    })
    return list1
  },
  // 官方榜数据
  officialRankList (state) {
    const list2 = []
    // 判断数据，避免加载不完全
    if (state.rankListDetail.length >= 4) {
      state.rankListDetail.forEach((item) => {
        const obj = {}
        obj.id = item.playlist.id
        obj.name = item.playlist.name
        obj.coverImgUrl = item.playlist.coverImgUrl
        obj.updateTime = item.playlist.updateTime
        obj.list = item.playlist.tracks.slice(0, 5)
        list2.push(obj)
      })
    }
    return list2
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
