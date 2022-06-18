<template>
  <div class="main">
    <!-- card body -->
    <div class="body" v-for="item in mvList" :key="item.id">
      <div class="body-img">
        <el-image
          :src="`${item.cover}?param=200y200`"
          fit="cover"
          :lazy="true"
          class="img"
        ></el-image>
      </div>
      <div class="content-box">
        <div class="title">
          <span>{{ item.name }}</span>
        </div>
        <div class="content">
          <span>{{ item.artistName }}</span>
        </div>
        <div class="content">
          <span
            ><i class="el-icon-video-camera"></i> {{ item.playCount1 }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // 从仓库拿到歌手列表
    ...mapState({
      mvList: (state) => state.mv.mvList
    })
  }
}
</script>

<style lang="less" scoped>
.main {
  display: grid;
  justify-content: center;
  align-content: center;
  //定义列宽
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 0 10px;
}
.img {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  vertical-align: middle;
}

.title {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  span {
    cursor: pointer;
  }
}
.content-box {
  padding: 10px 0;
}
.content {
  font-size: 14px;
  color: #909399;
}
</style>
