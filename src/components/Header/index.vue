<template>
  <el-row align="middle" type="flex">
    <el-col :span="3">
      <router-link to="/">
        <svg-icon icon-class="logo" style="fontSize:48px;"></svg-icon>
      </router-link>
    </el-col>
    <el-col :span="4">
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
    <el-col :span="10">
        <Search></Search>
    </el-col>
    <el-col :span="7">
        <Login></Login>
      </el-col>
  </el-row>
</template>

<script>
import Search from './Search'
import Login from '@/components/Login'
export default {
  components: {
    Search,
    Login
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
}
</style>
