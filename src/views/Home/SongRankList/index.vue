<template>
  <div>
    <el-row :gutter="20"  type="flex">
      <el-col :span="6" v-for="(item,index) in newRankList" :key="index">
      <RankCard :list="item"></RankCard>
      </el-col>
      <!-- <el-col :span="6">
      <RankCard :list="newRankList[0]"></RankCard>
      </el-col>
      <el-col :span="6">
      <RankCard :list="newRankList[1]"></RankCard>
      </el-col>
      <el-col :span="6">
      <RankCard :list="newRankList[2]"></RankCard>
      </el-col>
      <el-col :span="6">
      <RankCard :list="newRankList[3]"></RankCard>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RankCard from './RankCard'
export default {
  computed: {
    ...mapGetters(['newRankList'])
    // rankList.name
    // rankList.updateTime
    //
  },
  components: { RankCard }
}
</script>

<style>

</style>
