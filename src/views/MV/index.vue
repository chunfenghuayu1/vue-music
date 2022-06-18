<template>
  <div>
    <!-- 导航菜单 -->
    <NavMenu></NavMenu>
    <!-- 内容部分 -->
    <Content></Content>
  </div>
</template>

<script>
import NavMenu from './NavMenu/index.vue'
import Content from './Content/index.vue'
export default {
  components: { NavMenu, Content }
}
</script>

<style>

</style>
