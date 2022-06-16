<template>
  <div class="main">
    <!-- 内容渲染区域 -->
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      v-for="item in artistList.artists"
      :key="item.id"
    >
      <!-- card body -->
      <div class="body">
        <el-image
          :src="`${item.picUrl}?param=200y200`"
          fit="cover"
          :lazy="true"
          class="img"
        ></el-image>
        <div>
          <div class="title">{{ item.name }}</div>
          <div class="content">
            <span><i>专辑</i>{{ item.albumSize }}</span>
            <span><i>单曲</i>{{ item.musicSize }}</span>
            <span><i>粉丝</i>{{ item.fansCount }}</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // 从仓库拿到歌手列表
    ...mapState({
      artistList: (state) => state.artist.artistList
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0 10px;
}
.el-card {
  border-radius: 10px;
  cursor: pointer;
}
.el-card:hover {
  background: linear-gradient(to right, #63bbd000 0%, #63bbd080 97%, #63bbd080 100%);
}
.body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: center;
  align-content: center;
  grid-gap: 0 10px;
}
.img {
  border-radius: 10px;
  overflow: hidden;
}
.title {
  font-size: 18px;
}
.content {
  font-size: 14px;
  span {
    display: inline-block;
    margin-right: 10px;
    margin-top: 20px;
    i {
      display: block;
      font-style: normal;
      color: #909399;
      margin-bottom: 5px;
    }
  }
}
</style>
