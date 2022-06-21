<template>
  <div>
    <!-- 导航菜单 -->
    <NavMenu></NavMenu>
    <!-- 内容部分 -->
    <Content></Content>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import NavMenu from './NavMenu/index.vue'
import Content from './Content/index.vue'
export default {
  components: { NavMenu, Content }
}
</script>

<style></style>
