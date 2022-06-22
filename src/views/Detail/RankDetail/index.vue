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
            <p
              class="briefDesc-content"
              :class="toggle ? ' toggle' : ''"
              @click="toggle = !toggle"
            >
              {{ detailList.playlist.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-header">
          <p v-if="songsDetailList">
            歌曲列表<em>共{{ totalPage }}首歌</em>
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
              @click="playMusic(songsDetailListPage)"
              ><i class="el-icon-caret-right"></i>播放全部</el-button
            >
            <el-button size="small" round
              ><i class="el-icon-star-off"></i>收藏</el-button
            >
          </div>
        </div>
        <div class="list-form">
          <!-- 歌曲表格 -->
          <el-table stripe style="width: 100%" :data="songsDetailListPage">
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
            >
            <template slot-scope="{row}">
              <span @click="$router.push({path:`/songdetail?id=${row.id}`})" style="cursor:pointer;">{{row.name}}</span>
            </template>
            </el-table-column>
            <el-table-column label="歌手">
              <template slot-scope="{ row }">
                <span v-for="(item, index) in row.singer" :key="index" @click="$router.push({path:`/artist/detail?id=${item.id}`})" style="cursor:pointer;">
                  <span v-if="index !== 0">/</span>
                  {{ item.name }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="album.name" label="专辑" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="dt"
              label="时长"
              width="80"
            ></el-table-column>
            <!-- 播放/添加播放列表操作 -->
            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="{ row, $index }">
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
          style="margin-top: 20px;"
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      toggle: true,
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10
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
    songsDetailList () {
      return this.$store.getters.songsDetailList
    },
    // 计算需要展示歌曲的数量，便于分页
    songsDetailListPage () {
      const { songsDetailList, currentPage, pageSize } = this
      if (songsDetailList) {
        return songsDetailList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      } else {
        return []
      }
    },
    // 计算共多少页
    totalPage () {
      if (this.songsDetailList) {
        return this.songsDetailList.length
      } else {
        return 0
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newval) {
        const { id } = this.$route.query
        if (id) {
          this.toggle = true
          // 不采用异步，一起获取数据
          this.$store.dispatch('getRankListDetail', id)
          this.$store.dispatch('getRankListComment', id)
        }
      }
    }
  },
  methods: {
    // 点击列表按钮
    // 点击列表按钮
    async goArtist (item, val) {
      // val 0表示播放 1表示添加播放列表
      if (val === 0) {
        // 此处播放
        await this.$store.dispatch('addMusic', item)
        this.$bus.$emit('PLAYMUSIC', item)
      } else if (val === 1) {
        // 此处添加到播放列表
        const res = await this.$store.dispatch('addMusic', item)
        if (!res) {
          this.$bus.$emit('ADDMUSIC', true)
        } else {
          this.$bus.$emit('ADDMUSIC', false)
        }
      }
    },
    // 切换分页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 播放本页全部歌曲
    // 立即播放按钮
    playMusic (ListPage) {
      // 翻转数组 进行添加
      const list = []
      for (let i = ListPage.length - 1; i >= 0; i--) {
        list.push(ListPage[i])
      }
      list.forEach(async item => {
        await this.$store.dispatch('addMusic', item)
      })
      this.$bus.$emit('PLAYMUSIC', ListPage[0])
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
   margin-bottom: 50px;
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
            margin: 30px 0 10px 0;
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
            -webkit-line-clamp: 4;
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
