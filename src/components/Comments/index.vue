<template>
  <!-- 评论 -->
  <div class="comment">
    <div class="header">
      <h2>
        评论<em>共{{ list.total }}条评论(只获取前100条)</em>
      </h2>
    </div>
    <!-- 输入文本框 -->
    <div class="textarea">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="期待你的评论......"
        v-model.trim="textarea"
        maxlength="140"
        show-word-limit
        resize="none"
      >
      </el-input>
      <el-button
        size="default"
        round
        type="danger"
        style="
          background-color: #63bbd0;
          border-color: #63bbd0;
          margin-top: 10px; ;
        "
        @click="submitCom(textarea)"
        >评论</el-button
      >
    </div>
    <!-- 评论区 -->
    <div class="comment-area" ref="comment">
      <div
        class="comment-item"
        v-for="(item, index) in showList"
        :key="index"
      >
        <div class="left">
          <img :src="`${item.user.avatarUrl}?param=50y50`" />
        </div>
        <div class="right">
          <p class="username">{{ item.user.nickname }}</p>
          <p class="text">{{ item.content }}</p>
          <!-- 回复的评论 需要按需展示 -->
          <div
            class="comment-reply"
            v-for="reply in item.beReplied"
            :key="reply.beRepliedCommentId"
          >
            <span>{{ reply.user.nickname }}:</span>{{ reply.content }}
          </div>
          <div class="foot">
            <span class="time">{{ item.timeStr }}</span>
            <span class="tips el-icon-star-off"
              >({{ item.likedCount }}) <i class="el-icon-chat-dot-square"></i
            ></span>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
      style="margin-top: 20px; text-align: center;"
        :small="small"
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="totalPage"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: '',
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      // 获取ref的宽度
      commentWidth: 0
    }
  },
  props: ['list'],
  methods: {
    // 切换分页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 发表评论
    async submitCom (textarea) {
      const flag = this.$store.state.login.isLogin
      if (flag) {
        const obj = {
          t: 1,
          type: this.type,
          id: this.$route.query.id,
          content: textarea
        }
        const { data } = await this.$http.comment(obj)
        console.log(data)
        if (data.code === 200) {
          this.$message.success(`评论成功,评价内容:${data.comment.content}`)
          this.textarea = ''
        }
      } else {
        this.$store.commit('dialogVisible', true)
      }
    }
  },
  computed: {
    // 计算共多少页
    totalPage () {
      if (this.list.comments) {
        return this.list.comments.length
      } else {
        return 0
      }
    },
    // 计算需要展示的内容数
    showList () {
      const { list, currentPage, pageSize } = this
      if (list.comments) {
        return list.comments.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      } else {
        return []
      }
    },
    // 计算容器宽度，确定分页器大小
    small () {
      const { commentWidth } = this
      if (commentWidth > 500) {
        return false
      } else {
        return true
      }
    },
    // 计算当前页的类型
    // type 0: 歌曲 1: mv 2: 歌单
    type () {
      const { path } = this.$route
      if (path === '/songdetail') {
        return 0
      } else if (path === '/rank/detail') {
        return 2
      } else if (path === '/mv/detail') {
        return 1
      } else {
        return -1
      }
    }
  },
  mounted () {
    // 获取ref的宽度
    this.commentWidth = this.$refs.comment.offsetWidth
  }
}

</script>

<style lang="less" scoped>
.comment {
  .header {
    padding-top: 30px;
    h2 {
      font-weight: normal;
      em {
        font-size: 14px;
        font-style: normal;
        font-weight: normal;
        color: #909399;
        margin-left: 20px;
      }
    }
  }
  .comment-area {
    margin-top: 20px;
    .comment-item {
      display: flex;
      max-width: 100%;
      border: 1px solid #ebeef5;
      background-color: #fff;
      overflow: hidden;
      color: #303133;
      transition: 0.3s;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      padding: 15px 15px;
      margin-bottom: 15px;
      .left {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        margin: 10px;
        background-color: pink;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .right {
        width: 80%;
        flex: 1;
        font-size: 14px;
        .username {
          color: #909399;
          padding-bottom: 10px;
        }
        .text {
          padding-bottom: 10px;
          overflow: hidden;
        }
        // 回复的评论
        .comment-reply {
          background: #fafafa;
          border-radius: 5px;
          box-shadow: 0 0 27px #0000000f inset;
          padding: 10px;
          margin: 5px 0;
          line-height: 28px;
          span:nth-child(1) {
            color: #909399;
            margin-right: 5px;
          }
        }
        .foot {
          display: flex;
          justify-content: space-between;
          color: #909399;
          .tips {
            i {
              font-style: normal;
            }
          }
        }
      }
    }
  }
}
</style>
