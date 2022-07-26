<template>
  <div>
    <!-- 登录区域 -->
    <div>
      <el-avatar :src="picUrl" style="vertical-align: middle"></el-avatar>
      <span
        style="marginleft: 20px; cursor: pointer"
        v-if="!isLogin"
        @click="login"
        >登录</span
      >
      <span v-if="isLogin" style="font-size: 14px; margin-right: 10px">{{
        userInfo.nickname
      }}</span>
      <span
        style="marginleft: 20px; cursor: pointer"
        v-if="isLogin"
        @click="logout"
        >退出登录</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // 是否已经登录
    ...mapState({
      isLogin: (state) => state.login.isLogin,
      userInfo: (state) => state.login.userInfo
    }),
    // 计算出头像的地址，如果登录则用用户头像
    picUrl () {
      if (this.isLogin) {
        return this.userInfo.avatarUrl
      } else {
        return 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    }
  },
  methods: {
    login () {
      this.$store.commit('dialogVisible', true)
    },
    async logout () {
      const res = await this.$store.dispatch('logout')
      if (res) {
        this.$message.success('退出登录')
        this.$router.go(0)
      } else {
        this.$message.error('退出登录失败')
      }
    }
  }
}
</script>

<style></style>
