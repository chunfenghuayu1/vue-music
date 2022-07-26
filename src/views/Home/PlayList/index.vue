<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <el-row>
        <el-col :span="3" class="header-title" >热门推荐</el-col>
        <el-col :span="21" :pull="1" class="header-tip">
          <ul>
            <li v-for="(list,index) in playListTags" :key="index" :class="index==Index?'active':''" @click="changeList(index,list.name)">{{list.name}}</li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <!-- card body -->
    <div>
      <Album :playListDetail="playListDetail"></Album>
    </div>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import Album from '@/components/Album'
export default {
  data () {
    return {
      Index: 0
    }
  },
  components: {
    Album
  },
  computed: {
    ...mapState({
      playListTags: state => state.home.playListTags,
      playListDetail: state => state.home.playListDetail
    })
  },
  methods: {
    async changeList (index, name) {
      this.Index = index
      await this.$store.dispatch('getPlayListDetail', name)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  border-radius: 10px;
}
.el-col {
  text-align: left;
}
.header-title {
  font-size: 26px;
  font-weight: bold;
}
.header-tip {
  ul {
    li {
      float: left;
      margin-right: 30px;
      cursor: pointer;
      position: relative;
      z-index: 2;
    }
    .active::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 1px;
      width: 100%;
      height: 6px;
      background: var(--main-color);
      z-index: -1;
    }
  }
}
</style>
