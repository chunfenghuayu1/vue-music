<!-- 此组件歌单 排行榜数据共用 -->
<template>
  <div class="main">
    <div class="left">
      <div class="header">
        <div class="header-left">
          <el-image
            v-if="detailList.playlist"
            :src="detailList.playlist.coverImgUrl"
            fit="fill"
            :lazy="true"
          ></el-image>
        </div>
        <div class="header-right">
          <div class="first">
            <p class="title" v-if="detailList.playlist">
              {{ detailList.playlist.name }}
            </p>
            <p class="updateTime" v-if="detailList.playlist">
              {{ detailList.playlist.updateFrequency }}
            </p>
          </div>
          <div class="second" v-if="detailList.playlist">
            <el-avatar
              size="medium"
              :src="detailList.playlist.creator.avatarUrl"
            ></el-avatar>
            <span class="cover-name">{{
              detailList.playlist.creator.nickname
            }}</span
            ><i class="cover-date">{{ detailList.updateTime }}</i>
          </div>
          <div class="third" v-if="detailList.playCount">
            <p><i class="el-icon-headset"></i>{{ detailList.playCount }}次</p>
            <p>
              <i class="el-icon-star-off"></i>{{ detailList.subscribedCount }}
            </p>
            <p>
              <i class="el-icon-chat-dot-square"></i
              >{{ detailList.commentCount }}
            </p>
          </div>
          <div class="forth" v-if="detailList.playlist">
            <p class="briefDesc-title">歌单简介</p>
            <p class="briefDesc-content" :class="toggle ? ' toggle' : ''" @click="toggle = !toggle">
              {{ detailList.playlist.description }}
            </p>
            <i @click="toggle = !toggle" v-if="toggle">更多</i>
            <i @click="toggle = !toggle" v-else>收起</i>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-header">
          <p v-if="songsDetailList">
            歌曲列表<em>共{{ songsDetailList.length }}首歌</em>
          </p>
          <div>
            <el-button
              type="primary"
              size="small"
              round
              style="
                background-color: rgb(99, 187, 208);
                border-color: rgb(99, 187, 208);
              "
              ><i class="el-icon-caret-right"></i>播放全部</el-button
            >
            <el-button size="small" round
              ><i class="el-icon-star-off"></i>收藏</el-button
            >
          </div>
        </div>
        <div class="list-form">
          <!-- 歌曲表格 -->
          <el-table stripe style="width: 100%" :data="songsDetailList">
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
            ></el-table-column>
            <el-table-column label="歌手" show-overflow-tooltip>
              <template slot-scope="{ row, $index }">
                <span v-for="(item, index) in row.singer" :key="index">
                  <span v-if="index !== 0">/</span>
                  {{ item.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="album.name" label="专辑"></el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="comment">
        <Comments :list="commentList"></Comments>
      </div>
    </div>
    <!-- 回到顶部按钮 -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import Comments from '@/components/Comments/index.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      toggle: true
    }
  },
  components: {
    Comments
  },
  computed: {
    ...mapState({
      commentList: (state) => state.rankListDetail.commentList,
      detailList: (state) => state.rankListDetail.rankDetailList1
    }),
    ...mapGetters(['songsDetailList'])
  },
  watch: {
    $route: {
      immediate: true,
      handler (newval) {
        const { id } = this.$route.query
        if (id) {
          this.$store.dispatch('getRankListDetail', id)
          this.$store.dispatch('getRankListComment', id)
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
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 18px 20px;
      margin-bottom: 15px;
      display: flex;
      .header-left {
        flex: 1;
        margin-right: 25px;
        .el-image {
          border-radius: 10px;
        }
      }
      .header-right {
        flex: 3;
        .first {
          .title {
            font-weight: bold;
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
          .updateTime {
            color: #909399;
            font-size: 14px;
          }
        }
        .second {
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 14px;
          .cover-name {
            margin-left: 10px;
            margin-right: 10px;
          }
          .cover-date {
            font-style: normal;
            color: #909399;
          }
        }
        .third {
          display: flex;
          margin-top: 20px;
          color: #909399;
          font-size: 14px;
          p {
            margin-right: 20px;
            i {
              margin-right: 5px;
            }
          }
        }
        .forth {
          font-size: 14px;
          .briefDesc-title {
            font-weight: bold;
            margin: 10px 0;
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
    .list {
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 18px 20px;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      p {
        font-weight: bold;
        font-size: 20px;
        em {
          font-size: 12px;
          color: #909399;
          font-style: normal;
          font-weight: normal;
          margin-left: 20px;
        }
      }
    }
  }

  .right {
    width: 350px;
    height: 100%;
    border: 1px solid #ebeef5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    padding: 18px 20px;
    .comment {
      width: 100%;
      overflow-y: auto;
      max-height: 600px;
      &::-webkit-scrollbar {
        display: none; /*隐藏滚动条*/
      }
    }
  }
}
</style>
