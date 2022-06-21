<template>
  <div>
    <div class="main">
      <div class="left">
        <div class="header">
          <!-- 歌手介绍 -->
          <div class="avatar" v-if="artist.cover">
            <el-image
              :src="`${artist.cover}?param=230y230`"
              fit="fill"
              :lazy="true"
            ></el-image>
          </div>
          <div class="desc">
            <div class="name">
              <p>{{ artist.name }}</p>
            </div>
            <div class="tag">
              <el-tag
                effect="light"
                size="medium"
                type="success"
                style="margin-right: 5px"
                v-for="item in artist.identifyTag"
                :key="item"
                >{{ item }}</el-tag
              >
              <el-tag
                effect="light"
                size="medium"
                type="success"
                style="margin-right: 5px"
                v-for="item in artist.identities"
                :key="item"
                >{{ item }}</el-tag
              >
            </div>
            <div class="count">
              <div class="musicSize" v-if="artist.musicSize">
                单曲数：
                <span>{{ artist.musicSize }}</span>
              </div>
              <div class="albumSize" v-if="artist.albumSize">
                专辑数：<span>{{ artist.albumSize }}</span>
              </div>
              <div class="mvSize" v-if="artist.mvSize">
                MV数：<span>{{ artist.mvSize }}</span>
              </div>
            </div>
            <div class="briefDesc" v-if="artist.briefDesc">
              <p class="briefDesc-title">介绍：</p>
              <p
                class="briefDesc-content"
                :class="toggle ? 'toggle' : ''"
                @click="toggle = !toggle"
              >
                {{ artist.briefDesc }}
              </p>
            </div>
          </div>
        </div>
        <div class="body" v-if="artistDesc.introduction">
          <div class="body-title">
            <div>
              <span :class="Index == 1 ? 'active' : ''" @click="changeActive(1)"
                >热门50首</span
              >
              <span
                :class="Index == 2 ? 'active' : ''"
                @click="changeActive(2)"
                v-if="artistDesc.introduction.length !== 0"
                >歌手详情</span
              >
            </div>
            <div class="btn">
              <el-button
                type="primary"
                size="small"
                round
                v-if="Index == 1"
                style="
                  background-color: rgb(99, 187, 208);
                  border-color: rgb(99, 187, 208);
                "
                >立即播放</el-button
              >
            </div>
          </div>
          <!-- 热门50首歌曲 -->
          <div class="content1" v-if="Index == 1">
            <div class="list-form">
              <!-- 歌曲表格 -->
              <el-table stripe style="width: 100%" :data="ListPage">
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="音乐标题"
                  show-overflow-tooltip
                  align="center"
                >
                  <template slot-scope="{ row, $index }">
                    <span
                      @click="
                        $router.push({ path: `/songdetail?id=${row.id}` })
                      "
                      >{{ row.name }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  label="歌手"
                  align="center"
                  show-overflow-tooltip
                >
                  <template slot-scope="{ row }">
                    <span
                      v-for="(item, index) in row.singer"
                      :key="index"
                      @click="
                        $router.push({ path: `/artist/detail?id=${item.id}` })
                      "
                    >
                      <span v-if="index !== 0">/</span>
                      {{ item.name }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="dt"
                  label="时长"
                  width="80"
                ></el-table-column>
                <!-- 播放/添加播放列表操作 -->
                <el-table-column label="操作" width="100" align="center">
                  <template slot-scope="{ row }">
                    <el-button
                      icon="el-icon-caret-right"
                      circle
                      size="mini"
                      @click="goArtist(row, 0)"
                    ></el-button>
                    <el-button
                      icon="el-icon-plus"
                      circle
                      size="mini"
                      @click="goArtist(row, 1)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页器 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :hide-on-single-page="true"
                :total="totalPage"
                :page-size="pageSize"
                :current-page="currentPage"
                align="center"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
          <!-- 歌手介绍 -->
          <div class="content2" v-else>
            <div
              class="artistDesc"
              v-for="(item, index) in artistDesc.introduction"
              :key="index"
            >
              <h3>{{ item.ti }}</h3>
              <p v-for="(txt, index) in item.txtArr" :key="index">{{ txt }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="card">
          <div class="title">
            <p>相似歌手</p>
          </div>
          <div class="content">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item, index) in simiArtists" :key="index">
                <img
                  :src="`${item.picUrl}?param=120y120`"
                  @click="goTarget(item.id)"
                />
              </swiper-slide>
              <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 用于切换热门50首和歌手详情
      Index: 1,
      // 显示更多文字
      toggle: true,
      // 相似歌手轮播图
      swiperOption: {
        // loop: true,
        spaceBetween: 5, // 图片间距
        autoplay: false,
        slidesPerView: 3, // 展示几张
        slidesPerColumn: 3,
        grid: {
          fill: 'column',
          rows: 3
        }
      },
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    ...mapState({
      hotPlayList: (state) => state.artistDetail.hotPlayList,
      artistDesc: (state) => state.artistDetail.artistDesc,
      artist: (state) => state.artistDetail.artist,
      simiArtists: (state) => state.artistDetail.simiArtists
    }),
    // 计算共多少页
    totalPage () {
      if (this.hotPlayList) {
        return this.hotPlayList.length
      } else {
        return 0
      }
    },
    // 计算需要展示歌曲的数量，便于分页
    ListPage () {
      const { hotPlayList, currentPage, pageSize } = this
      if (hotPlayList) {
        return hotPlayList.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      } else {
        return []
      }
    }
  },
  methods: {
    // 控制内容切换
    changeActive (index) {
      this.Index = index
    },
    async getData (id) {
      await this.$store.dispatch('getArtistDetail', id)
      await this.$store.dispatch('getArtistSimi', id)
      await this.$store.dispatch('getArtistHotPlay', id)
      await this.$store.dispatch('getArtistDesc', id)
    },
    // 跳转页面
    goTarget (id) {
      this.$router.push({ path: '/artist/detail', query: { id } })
      this.toggle = true
    },
    // 点击列表按钮
    goArtist (item, val) {
      // val 0表示播放 1表示添加播放列表
      if (val === 0) {
        // 此处播放
      } else if (val === 1) {
        // 此处添加到播放列表
      }
    },
    // 切换分页
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newval) {
        const { id } = this.$route.query
        if (id) {
          this.getData(id)
          this.toggle = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  width: 100%;
  .left {
    flex: 1;
    margin-right: 10px;
    .header {
      display: flex;
      padding: 18px 20px;
      margin-bottom: 20px;
      .avatar {
        // max-width: 225px;
        vertical-align: middle;
        .el-image {
          border-radius: 10px;
          vertical-align: middle;
        }
      }
      .desc {
        flex: 1;
        margin-left: 15px;
        .name {
          margin-bottom: 5px;
          p {
            display: inline-block;
            margin-right: 20px;
            font-size: 24px;
            font-weight: bold;
          }
        }
        .tag {
          padding: 10px 0;
        }
        .count {
          display: flex;
          padding: 10px 0;
          font-size: 14px;
          .musicSize {
            margin-right: 10px;
          }
          .albumSize {
            margin-right: 10px;
          }
        }
        .briefDesc {
          font-size: 14px;
          padding: 10px 0;
          .briefDesc-title {
            font-weight: bold;
            margin: 5px 0;
          }
          .briefDesc-content {
            color: #909399;
            text-indent: 2em;
            -webkit-box-orient: vertical;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            overflow: hidden;
            cursor: pointer;
          }
          i {
            font-style: normal;
            cursor: pointer;
            font-size: 12px;
            color: #909399;
          }
          .toggle {
            -webkit-line-clamp: 2;
          }
        }
      }
    }
    .body {
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 18px 20px;
      .body-title {
        display: flex;
        justify-content: space-between;
        // align-items: center;
        margin-bottom: 20px;
        span {
          position: relative;
          font-size: 16px;
          font-weight: normal;
          margin-right: 20px;
          cursor: pointer;
          z-index: 3;
        }
        .active::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 1px;
          width: 100%;
          height: 6px;
          background: #63bbd0;
          z-index: -1;
        }
        .active {
          font-weight: bold;
          font-size: 18px;
        }
      }
      .content2 {
        padding: 10px;
        .artistDesc {
          h3 {
            font-size: 14px;
          }
          p {
            text-indent: 2em;
            font-size: 14px;
            color: #909399;
            line-height: 30px;
          }
        }
      }
    }
  }
  .right {
    width: 350px;
    .card {
      height: 450px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 18px 20px;
      .content {
        .swiper-slide {
          border-radius: 10px;
          overflow: hidden;
          img {
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
      .title {
        margin-bottom: 20px;
        p {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
