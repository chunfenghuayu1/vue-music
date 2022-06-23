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
                <span v-if="song.publishTime"
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
              <!-- <div class="right">
                <p @click="playMusic(item)">
                  <svg
                    t="1655560663748"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4544"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"
                      fill="#3D3D3D"
                      p-id="4545"
                    ></path>
                  </svg>
                </p>
                <p @click="addMusic(item)">
                  <svg
                    t="1655560726449"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5371"
                    width="15"
                    height="15"
                  >
                    <path
                      d="M516.403 813.64c-20.478 0-36.605-15.051-36.605-33.635s16.383-33.635 36.605-33.635h416.624a36.81 36.81 0 0 1 37.116 33.226 35.836 35.836 0 0 1-36.144 34.044H516.403z m180.155 174.421v-417.29a33.789 33.789 0 1 1 67.27-0.46v416.573c0.256 20.222-14.642 36.86-33.175 37.116h-0.46a35.12 35.12 0 0 1-33.635-35.939z m-429.679 31.075A212.817 212.817 0 0 1 54.062 806.32V212.87A213.278 213.278 0 0 1 266.879 0h418.21a213.278 213.278 0 0 1 212.818 212.766v266.213a36.604 36.604 0 0 1-73.209 0V212.766A140.07 140.07 0 0 0 685.09 73.209H266.879a139.608 139.608 0 0 0-139.609 139.66v593.45a139.608 139.608 0 0 0 139.61 139.609h182.2a36.604 36.604 0 1 1 0 73.208zM698.298 374.44H237.544a36.604 36.604 0 0 1 0-73.21h460.754a36.604 36.604 0 1 1 0 73.21zM467.921 546.197H237.544a36.604 36.604 0 0 1 0-73.208h230.377a36.604 36.604 0 1 1 0 73.208z"
                      p-id="5372"
                    ></path>
                  </svg>
                </p>
              </div> -->
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

export default {
  components: {
    Lyric: () => import('@/components/Lyric'),
    Comments: () => import('@/components/Comments')
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
        color: #303133;
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
              color: #909399;
              margin-bottom: 10px;
              margin-right: 10px;
            }
            .description {
              span {
                font-size: 14px;
                color: #909399;
                margin-right: 10px;
                i {
                  font-style: normal;
                  color: #303133;
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
              color: #909399;
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
