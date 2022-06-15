<template>
  <div>
    <!-- 导航菜单部分 -->
    <NavMenu @changeList2="changeList2"></NavMenu>
    <!-- 内容部分 -->
    <Content @changeList1="changeList1"></Content>
  </div>
</template>

<script>
import NavMenu from './NavMenu'
import Content from './Content'
export default {
  data () {
    return {
      order: 'hot',
      cat: '',
      limit: 50
    }
  },
  components: {
    NavMenu,
    Content
  },
  created () {
    this.getData()
    this.getTagList()
  },
  methods: {
    // 初始化导航菜单数据
    async getData () {
      await this.$store.dispatch('getTags')
    },
    // 初始化内容数据
    async getTagList () {
      const { order, cat, limit } = this
      await this.$store.dispatch('getTagList', [order, cat, limit])
    },
    // 获取content组件传递的参数
    changeList1 (val) {
      this.order = val
      this.getTagList()
    },
    //  获取Navmenu组件传递的参数
    changeList2 (val) {
      // console.log(val)
      this.cat = val
      this.getTagList()
    }
  }
}
</script>

<style>

</style>
