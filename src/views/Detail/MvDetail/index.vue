<template>
  <div class="container">
    <div class="left">
      <div class="main">
        <VideoPlayer :mvUrl="mvUrl"></VideoPlayer>
      </div>
      <div class="brief">
        <div class="title">
          <p>{{ mvDetail.name }}</p>
        </div>
        <div class="count">
          <span>发布：{{ mvDetail.publishTime }}</span>
          <span>播放：{{ mvDetail.playCount1 }}</span>
        </div>
        <div class="desc">
          <p>{{ mvDetail.desc }}</p>
        </div>
      </div>
      <div class="comment">
        <Comments :list="commentList"></Comments>
      </div>
    </div>
    <div class="right">
      <div v-for="(item, index) in simiMv" :key="index">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <!-- card body -->
          <div
            class="img"
            @click="$router.push({ path: `/mv/detail?id=${item.id}` })"
          >
            <el-image
              :src="`${item.cover}?param=320y180`"
              fit="fill"
              :lazy="true"
            ></el-image>
          </div>
          <div class="name">
            <p>{{ item.name }}</p>
          </div>
          <div class="artist">
            <span
              @click="
                $router.push({ path: `/artist/detail?id=${item.artistId}` })
              "
              >{{ item.artistName }}</span
            >
          </div>
          <div class="playCount">
            <p><i class="el-icon-video-camera"></i>{{ item.playCount1 }}</p>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlayer from '../../../components/VideoPlayer/index.vue'
import Comments from '@/components/Comments/index.vue'
export default {
  watch: {
    $route: {
      immediate: true,
      handler () {
        const { id } = this.$route.query
        if (id) {
          // 不使用异步
          this.$store.dispatch('getMvDetail', id)
          this.$store.dispatch('getMvUrl', id)
          // 默认取100条评论
          this.$store.dispatch('getMvComment', id, 100)
          this.$store.dispatch('getSimiMv', id)
        }
      }
    }
  },
  computed: {
    ...mapState({
      mvUrl: (state) => state.mv.mvUrl,
      mvDetail: (state) => state.mv.mvDetail,
      commentList: (state) => state.mv.commentList,
      simiMv: (state) => state.mv.simiMv
    })
  },
  components: { VideoPlayer, Comments }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
   margin-bottom: 50px;
  .left {
    flex: 1;
    margin-right: 20px;
    .main {
      margin: 0 auto;
    }
    .brief {
      width: 80%;
      margin: 0 auto;
      .title {
        margin: 10px 0;
        font-size: 20px;
        font-weight: bold;
      }
      .count {
        margin: 10px 0;
        color: #909399;
        span {
          margin-right: 20px;
          font-size: 14px;
        }
      }
      .desc {
        font-size: 14px;
        margin: 30px 0 0 0;
      }
    }
  }
  .right {
    width: 300px;
    .el-card {
      border-radius: 10px;
      .el-image {
        text-align: center;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        height: 150px;
        vertical-align: middle;
      }
      .name {
        margin: 5px 0;
        p {
          font-size: 16px;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          overflow: hidden;
        }
      }
      .artist {
        margin: 5px 0;
        span {
          color: #909399;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .playCount {
        color: #909399;
        font-size: 14px;
      }
    }
  }
}
</style>
