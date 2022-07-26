<template>
  <div>
    <el-row :gutter="20"  type="flex" v-if="newRankList">
      <el-col :span="6" v-for="(item,index) in newRankList" :key="index">
      <RankCard :list="item"></RankCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RankCard from './RankCard'
export default {
  computed: {
    ...mapGetters(['newRankList'])
  },
  components: { RankCard }
}
</script>

<style>

</style>
