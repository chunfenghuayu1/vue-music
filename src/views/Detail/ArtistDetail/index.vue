<template>
  <div>
    <div class="main">
      <div class="left">
        <div class="header">
          <!-- 歌手介绍 -->
          <div class="avatar">
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
                v-for="(item, index) in artist.identities"
                :key="index"
                >{{ item }}</el-tag
              >
            </div>
            <div class="count" >
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
              <p class="briefDesc-content" :class="toggle ? ' toggle' : ''" @click="toggle = !toggle">
                {{ artist.briefDesc }}
              </p>
              <i @click="toggle = !toggle" v-if="toggle">更多</i>
              <i @click="toggle = !toggle" v-else>收起</i>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="body-title">
            <div>
              <span :class="Index == 1 ? 'active' : ''" @click="changeActive(1)"
              >热门50首</span
            >
            <span :class="Index == 2 ? 'active' : ''" @click="changeActive(2)"
              >歌手详情</span
            >
            </div>
            <div class="btn"><el-button type="primary"
              size="small"
              round
              v-if="Index==1"
              style="
                background-color: rgb(99, 187, 208);
                border-color: rgb(99, 187, 208);
              " >立即播放</el-button>
            </div>
          </div>
          <!-- 热门50首歌曲 -->
          <div class="content1" v-if="Index == 1">
            <div class="list-form">
              <!-- 歌曲表格 -->
              <el-table stripe style="width: 100%" :data="hotPlayList">
                <el-table-column
                  type="index"
                  label="序号"
                  width="80"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="音乐标题"
                  show-overflow-tooltip
                  align="center"
                ></el-table-column>
                <el-table-column label="歌手" align="center" show-overflow-tooltip>
                  <template slot-scope="{ row, $index }">
                    <span v-for="(item, index) in row.singer" :key="index">
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
              </el-table>
            </div>
          </div>
          <!-- 歌手介绍 -->
          <div class="content2" v-else>
            <div class="artistDesc" v-for="(item,index) in artistDesc.introduction" :key="index">
              <h3>{{item.ti}}</h3>
              <p v-for="(txt,index) in item.txtArr" :key="index">{{txt}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
          <div class="card">
            <div class="title">
              <p>相似歌手</p>
            <div class="content">1</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 用于切换热门50首和歌手详情
      Index: 1,
      // 显示更多文字
      toggle: true
    }
  },
  computed: {
    ...mapState({
      hotPlayList: (state) => state.artistDetail.hotPlayList,
      artistDesc: (state) => state.artistDetail.artistDesc,
      artist: (state) => state.artistDetail.artist,
      simiArtists: (state) => state.artistDetail.simiArtists
    })
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
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newval) {
        const { id } = this.$route.query
        if (id) {
          this.getData(id)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
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
            -webkit-line-clamp: 3;
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
      height: 500px;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 18px 20px;
    }
  }
}
</style>
