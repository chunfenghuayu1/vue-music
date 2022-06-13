<template>
  <div>
    此处放col，加载四个卡片组件
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      rankList: state => state.home.rankList,
      rankListDetail: state => state.home.rankListDetail
    })
    // rankList.name
    // rankList.updateTime
    //

  }
}
</script>

<style>

</style>
