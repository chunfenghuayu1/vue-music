<template>
  <div>
    <el-container>
      <el-header height="80px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <Aside></Aside>
        </el-aside>
        <el-main class="page-component__scroll el-scrollbar__wrap">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'
export default {
  components: {
    Header,
    Aside
  },
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
        // 获取排行榜单数据
        await this.$store.dispatch('getRankList')
        // 获取排行榜单具体数据
        await this.$store.dispatch('getRankListDetail')
        // 获取歌单详情数据
        await this.$store.dispatch('getPlayListDetail')
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

<style scoped>
.el-header {
  position: fixed;
  width: 100%;
  max-width: 1920px;
  background-color: #fff;
  color: #333;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 10;
}
.el-aside {
  position: fixed;
  top: 90px;
  background-color: #fff;
  color: #333;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 85%;
  padding: 20px;
}

.el-main {
  background-color: transparent;
  color: #333;
  margin-top: 90px;
  margin-left: 220px;
}
/* 过渡动画 */
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
