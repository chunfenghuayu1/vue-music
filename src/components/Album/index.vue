<template>
  <el-row :gutter="20">
    <el-col v-for="(item, index) in playListDetail" :key="index">
      <div class="body-card">
        <el-image
          :src="`${item.coverImgUrl}?param=250y250`"
          fit="cover"
          :lazy="true"
        ></el-image>
        <p class="count">
          <i class="el-icon-video-play"></i>
          <i>{{ item.playCount }}</i>
          <i>/</i>
          <i>{{ item.trackCount }}首</i>
        </p>
        <div>
          <a class="body-title">{{ item.name }}</a>
          <div class="tags">
            <a
              v-for="(tag, index) in item.tags"
              :key="index"
              @click.prevent="toTarget(tag)"
              >#{{ tag }}</a
            >
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      playCount: '',
      trackCount: ''
    }
  },
  props: ['playListDetail'],
  methods: {
    toTarget (tag) {
      // 路由传参,因为没有order参数,所以默认添加order参数
      const { query } = this.$route
      if (query.cat !== tag) {
        this.$router.push({
          path: '/playlist',
          query: { cat: tag, order: 'hot' }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-col {
  width: calc(100% / 6);
}
.body-card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .el-image {
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .count {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    border-top-right-radius: 10px;
    width: 60%;
    height: 10%;
    background: linear-gradient(
      to right,
      #63bbd000 0%,
      #63bbd080 97%,
      #63bbd080 100%
    );
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
    i {
      font-style: normal;
      font-size: 12px;
      color: #fff;
    }
  }
}
.body-title {
  display: block;
  margin-bottom: 10px;
  color: #303133;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  cursor: pointer;
}
.tags {
  a {
    margin-right: 10px;
    color: #63bbd0;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
