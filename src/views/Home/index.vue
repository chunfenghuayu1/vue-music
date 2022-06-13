<template>
  <div>
    <!-- 轮播图组件 -->
    <Carousel></Carousel>
    <!-- 歌曲排行榜 -->
    <SongRankList></SongRankList>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Carousel from './Carousel/index.vue'
import SongRankList from './SongRankList/index.vue'
export default {
  components: { Carousel, SongRankList }
}
</script>

<style>
.el-icon-caret-top {
  color: #606266;
}
</style>
