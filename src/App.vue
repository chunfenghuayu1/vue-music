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
        <el-main class="page-component__scroll el-scrollbar">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <!-- 播放器 -->
    <AudioPlayer></AudioPlayer>
    <LoginDialog></LoginDialog>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Aside from '@/components/Aside'

export default {
  components: {
    Header,
    Aside,
    AudioPlayer: () => import(/* webpackChunkName: "AudioPlayer"  */ '@/components/AudioPlayer/index.vue'),
    LoginDialog: () => import(/* webpackChunkName: "LoginDialog" */ '@/components/Login/LoginDialog.vue')
  }
}
</script>

<style>
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
  margin-bottom: 30px;
}
/* 过渡动画 */
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
