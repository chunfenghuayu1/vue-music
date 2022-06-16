<template>
  <el-row align="middle" type="flex">
    <el-col :span="3">
      <router-link to="/">
        <svg
          t="1655117388556"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3335"
          width="48"
          height="48"
        >
          <path
            d="M0 0v1024h839.68V839.68h184.32V0H0z"
            fill="#F45D5D"
            p-id="3336"
          ></path>
          <path
            d="M839.68 1024V839.68h184.32L839.68 1024z"
            fill="#EA4747"
            p-id="3337"
          ></path>
          <path
            d="M482.3552 455.68a115.2 115.2 0 1 1-115.2 115.2 115.328 115.328 0 0 1 115.2-115.2m0-76.8a192 192 0 1 0 192 192 192 192 0 0 0-192-192z"
            fill="#FFEBEB"
            p-id="3338"
          ></path>
          <path
            d="M488.73728 251.24736l72.16896-26.26688 102.1312 280.6016-72.16896 26.26816z"
            fill="#FFEBEB"
            p-id="3339"
          ></path>
          <path
            d="M538.176 387.0848l52.6848 144.768L663.04 505.6a192.4992 192.4992 0 0 0-124.864-118.5152z"
            fill="#FFFFFF"
            p-id="3340"
          ></path>
          <path
            d="M733.6448 271.36l-19.8784 74.176-211.5584-57.28-13.4784-37.0176 71.8208-26.2656L733.6448 271.36z"
            fill="#FFEBEB"
            p-id="3341"
          ></path>
          <path
            d="M592.8704 312.8064l-31.9232-87.7184-0.192-0.0512-72.0256 26.2016 13.4784 37.0176 90.6624 24.5504z"
            fill="#FFFFFF"
            p-id="3342"
          ></path>
        </svg>
      </router-link>
    </el-col>
    <el-col :span="18" class="middle-content">
      <el-col :span="3">
        <el-button
          icon="el-icon-arrow-left"
          size="mini"
          @click="$router.go(-1)"
          circle
        ></el-button>
        <el-button
          icon="el-icon-arrow-right"
          size="mini"
          @click="$router.go(1)"
          circle
        ></el-button>
      </el-col>
      <el-col :span="18">
        <Search></Search>
      </el-col>
      <el-col :span="3">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          style="verticalAlign: middle;"
        ></el-avatar>
        <span style="marginLeft:20px;cursor: pointer;" v-if="true">登录</span>
        <span style="marginLeft:20px;cursor: pointer;" v-else>退出登录</span>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import Search from './Search'
export default {
  components: {
    Search
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
}
// .el-button {
//   background-color: #909399;
// }
.middle-content {
  height: 100%;
  line-height: 80px;
}
</style>
