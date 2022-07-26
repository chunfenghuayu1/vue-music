<template>
  <div class="container">
    <div class="main">
      <!-- 头部主体 -->
      <div class="header">
        <!-- 主体描述 -->
        <div class="desc">
          <div class="card">
            <div class="left">
              <p class="title" v-if="song">
                {{ song.name }}
              </p>
              <span class="author" v-for="item in song.singer" :key="item.id"
                ><span v-if="item">{{ item.name }}</span></span
              >
              <p class="description">
                <span v-if="song.album"
                  >专辑：<i>{{ song.album.name }}</i></span
                >
                <span v-if="song.publishTime!==0?true:false"
                  >发行时间：<i>{{ song.publishTime }}</i></span
                >
              </p>
            </div>
            <div class="right">
              <div>
                <el-image
                  v-if="song.album"
                  :src="`${song.album.picUrl}?param=230y230`"
                  fit="cover"
                  :lazy="true"
                ></el-image>
              </div>
            </div>
          </div>
          <div class="btn">
            <el-button
              type="danger"
              size="medium"
              round
              style="background-color: #63bbd0; border-color: #63bbd0"
              :disabled="song.license ? true : false"
              @click="playMusic(song)"
              >立即播放</el-button
            >
            <el-button size="medium" round :disabled="song.license ? true : false"
            @click="addMusic(song)"
              >添加到播放列表</el-button
            >
          </div>
        </div>
        <!-- 相似歌曲 -->
        <div class="recommend">
          <el-card
            shadow="always"
            :body-style="{ padding: '0px 20px 10px 20px' }"
          >
            <div slot="header">
              <span>推荐歌曲</span>
            </div>
            <!-- card body -->
            <div class="recom" v-for="item in simiSong" :key="item.id">
              <div class="left">
                <router-link
                  :to="{ path: '/songdetail', query: { id: item.id } }"
                >
                  <p>{{ item.name }}</p>
                </router-link>
                <p>
                  <span
                    v-for="(item1, index) in item.album.artists"
                    :key="index"
                    @click="$router.push({ path: `/artist/detail?id=${item1.id}` })"
                    ><span v-if="index!==0">/</span>{{ item1.name }}</span
                  >
                </p>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 评论 -->
      <Comments :list="commentList"></Comments>
    </div>
    <!-- 歌词 -->
    <div class="aside">
      <Lyric></Lyric>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Lyric from '@/components/Lyric/index.vue'
export default {
  components: {
    Lyric
  },
  computed: {
    ...mapState({
      song: (state) => state.songDetail.song,
      simiSong: (state) => state.songDetail.simiSong,
      commentList: (state) => state.songDetail.commentList
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (newval) {
        const { id } = this.$route.query
        // 未使用异步
        this.$store.dispatch('getSongDetail', id)
        this.$store.dispatch('getSimiSong', id)
        this.$store.dispatch('getCommentList', id)
        this.$store.dispatch('getLyric', id)
      }
    }
  },
  methods: {
    // 立即播放歌曲按钮
    async playMusic (song) {
      await this.$store.dispatch('addMusic', song)
      this.$bus.$emit('PLAYMUSIC', song)
    },
    // 添加到播放列表按钮
    async addMusic (song) {
      const res = await this.$store.dispatch('addMusic', song)
      if (!res) {
        this.$bus.$emit('ADDMUSIC', true)
      } else {
        this.$bus.$emit('ADDMUSIC', false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  margin-bottom: 50px;
  .main {
    flex: 1;

    .header {
      display: flex;
      .desc {
        display: flex;
        flex-direction: column;
        flex: 1;
        border: 1px solid #ebeef5;
        background-color: #fff;
        overflow: hidden;
        color: var(--second-color);
        transition: 0.3s;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        padding: 18px 20px;
        .card {
          display: flex;
          flex: 4;
          .left {
            flex: 2;
            .title {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .author {
              display: inline-block;
              font-size: 16px;
              color: var(--third-color);
              margin-bottom: 10px;
              margin-right: 10px;
            }
            .description {
              span {
                font-size: 14px;
                color: var(--third-color);
                margin-right: 10px;
                i {
                  font-style: normal;
                  color: var(--second-color);
                }
              }
            }
          }
          .right {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-image {
              vertical-align: middle;
              overflow: hidden;
              border-radius: 50%;
              // animation: rotate1 10s linear infinite;
            }
            // @keyframes rotate1 {
            //   100% {
            //     transform: rotate(360deg);
            //   }
            // }
          }
        }
        .btn {
          flex: 1;
          margin-top: 10px;
        }
      }
      // 推荐歌曲主体部分样式
      .recommend {
        margin-left: 10px;
        width: 350px;
        //
        .recom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f2f2f2;
          .left {
            font-size: 14px;
            margin-bottom: 5px;
            margin-top: 5px;
            p {
              cursor: pointer;
            }
            p:nth-child(2) {
              color: var(--third-color);
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
              text-overflow: ellipsis;
              display: -webkit-box;
              overflow: hidden;
              font-size: 14px;
            }
          }
          // .right {
          //   display: flex;
          //   p {
          //     padding: 0 5px;
          //     cursor: pointer;
          //   }
          // }
        }
      }
    }
  }
  //侧边栏歌词
  .aside {
    width: 350px;
    margin-left: 10px;
  }
}
.el-card {
  border-radius: 10px;
  margin-bottom: 0px;
  /deep/ .el-card__header {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
