<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <span>歌词</span>
    </div>
    <!-- card body -->
    <div class="body">
      <div class="lyrics">
        <p v-for="(item,index) in lyric" :key="index">{{item}}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      lyric: state => state.songDetail.lyric
    })
  }
}
</script>

<style lang="less" scoped>
span {
  position: relative;
  font-size: 16px;
  z-index: 1;
}
span::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
  height: 30%;
  background-color: #63bbd0;
  z-index: -1;

}
.body {
  text-align: center;
  max-height: 520px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .lyrics {
    p {
      font-size: 14px;
      color: #909399;
      line-height: 30px;
    }
  }
}
</style>
