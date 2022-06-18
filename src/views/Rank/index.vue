<template>
  <div>
      <!-- 官方榜 -->
      <div>
        <el-row>
          <el-col :span="24">
            <h1>官方榜</h1>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col
            :span="12"
            v-for="(list, index) in officialRankList"
            :key="index"
          >
            <OfficialRank :list="list"></OfficialRank>
          </el-col>
        </el-row>
      </div>
      <!-- 全球榜 -->
      <div>
        <el-row>
          <el-col :span="24">
            <h1>全球榜</h1>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4" v-for="(list, index) in rankAllList" :key="index">
            <GlobalRank :list="list"></GlobalRank>
          </el-col>
        </el-row>
      </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import OfficialRank from './OfficialRank/index.vue'
import GlobalRank from './GlobalRank/index.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  components: { OfficialRank, GlobalRank },
  computed: {
    ...mapGetters(['officialRankList']),
    ...mapState({
      rankAllList: (state) => state.home.rankAllList
    })
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取首页必须的数据
    async getData () {
      try {
        // 获取排行榜单数据
        await this.$store.dispatch('getRankList')
        // 获取排行榜单具体数据
        await this.$store.dispatch('getRankListDetail')
      } catch (error) {
        this.$notify({
          title: '失败',
          message: '排行榜单数据加载失败',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  border-radius: 10px;
}
h1 {
  font-size: 28px;
  text-align: left;
  margin-top: 0;
}
</style>
