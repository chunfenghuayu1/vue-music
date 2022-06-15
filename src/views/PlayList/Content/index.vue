<template>
  <div>
    <el-row type="flex" align="bottom">
      <el-col :span="3">
        <h1 >热门歌单</h1>
      </el-col>
      <el-col :span="2">
        <h3 class="active"  @click="changeList('hot')">热门</h3>
      </el-col>
      <el-col :span="2">
        <h3 @click="changeList('new')">最新</h3>
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
      this.$emit('changeList1', val)
    }
  },
  watch: {
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
</style>
