<template>
  <div>
    <!-- 导航菜单 -->
    <IndexVue></IndexVue>
    <!-- 内容主体 -->
    <Content></Content>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import IndexVue from './NavMenu/index.vue'
import Content from './Content/index.vue'
export default {
  components: { IndexVue, Content }
}
</script>

<style>

</style>
