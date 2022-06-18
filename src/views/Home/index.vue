<template>
  <div>
    <!-- 轮播图组件 -->
    <Carousel></Carousel>
    <!-- 歌曲排行榜 -->
    <PlayList></PlayList>
    <SongRankList></SongRankList>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Carousel from './Carousel/index.vue'
import SongRankList from './SongRankList/index.vue'
import PlayList from './PlayList/index.vue'
export default {
  components: { Carousel, SongRankList, PlayList },
  created () {
    this.getData()
  },
  methods: {
    // 获取首页必须的数据
    async getData () {
      try {
        // 获取轮播图数据
        await this.$store.dispatch('getBanner')
        // 获取热门歌单标签
        await this.$store.dispatch('getPlayListTags')
        // 获取歌单详情数据
        await this.$store.dispatch('getPlayListDetail')
        // 获取排行榜单数据
        await this.$store.dispatch('getRankList')
        // 获取排行榜单具体数据
        await this.$store.dispatch('getRankListDetail')
        await this.$notify({
          title: '成功',
          message: '首页、排行榜数据加载完成',
          type: 'success'
        })
      } catch (error) {
        this.$notify({
          title: '失败',
          message: '首页、排行榜数据加载失败',
          type: 'error'
        })
      }
    }
  }

}
</script>

<style>
</style>
