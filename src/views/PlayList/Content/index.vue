<template>
  <div>
    <el-row type="flex" align="bottom">
      <el-col :span="3">
        <h1  v-if="title==''?true:false">热门歌单</h1>
        <h1  v-else class="toggle">{{title}}<i class="el-icon-close" @click="closeTitle"></i></h1>
      </el-col>
      <el-col :span="2">
        <h3 :class="name==='hot'?'active':''"  @click="changeList('hot')">热门</h3>
      </el-col>
      <el-col :span="2">
        <h3 @click="changeList('new')" :class="name==='new'?'active':''">最新</h3>
      </el-col>
    </el-row>
    <el-row style="marginTop:15px;">
      <Album :playListDetail="tagList.playlists"></Album>
    </el-row>
  </div>
</template>

<script>
import Album from '@/components/Album'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 控制热门和最新切换
      name: 'hot'
    }
  },
  props: ['title'],
  components: {
    Album
  },
  computed: {
    ...mapState({
      tagList: state => state.playList.tagList
    })
  },
  methods: {
    changeList (val) {
      const { query } = this.$route
      if (query.order !== val) {
        if (query.cat) {
          this.$router.push({ path: '/playlist', query: { order: val, cat: query.cat } })
        } else {
          this.$router.push({ path: '/playlist', query: { order: val } })
        }
      }
    },
    // 关闭标题按钮的函数
    closeTitle () {
      this.$router.push({
        path: '/playlist',
        query: {
          order: 'hot'
        }
      })
    }
  },
  watch: {
    // 监听最新歌单的数据，如果为空就提示
    tagList: {
      handler (newval, oldval) {
        if (newval.playlists.length === 0) {
          this.$notify({
            title: '失败',
            message: '最新歌单数据为空',
            type: 'error'
          })
        }
      }
    },
    // 监听路由,改变name参数
    $route: {
      immediate: true,
      handler (newval) {
        const { order } = newval.query
        if (order) {
          this.name = order
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 28px;
  margin: 10px 0 0 0;
}
h3 {
  display: inline-block;
  margin: 10px 0 0 0;
  color: #909399;
  cursor: pointer;
}
.active {
  position: relative;
  color:#303133;
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
 .el-icon-close {
  vertical-align: top;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
 }
 .el-icon-close:hover {
  transform: rotate(180deg);
  transition: all .5s;
  color: #63bbd0;
 }
</style>
