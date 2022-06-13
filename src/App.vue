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
      // 获取轮播图数据
      await this.$store.dispatch('getBanner')
      // 获取排行榜单数据
      await this.$store.dispatch('getRankList')
      // 获取排行榜单具体数据
      await this.$store.dispatch('getRankListDetail')
    }
  }
}
</script>

<style>
.el-header {
  position: fixed;
  width: 100%;
  background-color: #fff;
  color: #333;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
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
  text-align: center;
  margin-top: 90px;
  margin-left: 220px;
}
/* 过渡动画 */
.fade-enter-active {
  transition: all .5s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
