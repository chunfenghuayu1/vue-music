<template>
    <el-scrollbar style="height: 100%">
      <!-- 滚动条要包裹的内容 -->
      <ul>
        <li v-for="(item,index) in barList" :key="index">
          <router-link :to="item.path">
            <i class="iconfont" :class="[item.icon,$route.path==item.path?'change':'']"></i>
            <span :class="$route.path==item.path?'changeFont':''">{{item.name}}</span>
          </router-link>
        </li>
      </ul>
    </el-scrollbar>
</template>

<script>
export default {
  data () {
    return {
      barList: [
        { name: '发现音乐', path: '/home', icon: 'icon-shouyeshouye' },
        { name: '排行榜', path: '/rank', icon: 'icon-paihangbang' },
        { name: '歌单', path: '/list', icon: 'icon-list' },
        { name: '歌手', path: '/artist', icon: 'icon-artist' },
        { name: 'MV', path: '/mv', icon: 'icon-bofangMV' }
      ]
    }
  }
}
</script>

<style lang="less">
.el-scrollbar__wrap {
  overflow-x: hidden!important;
}
ul {
  padding-left: 20px;
  li {
    height: 60px;
    text-align: left;
    line-height: 60px;
    padding-left: 10px;
    a {
      display: block;
      color: #909399;
      .iconfont {
        font-size: 25px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .change {
        color:#63bbd0;
        font-size: 35px;
      }
      .changeFont {
        font-size: 18px;
        font-weight: bold;
        color: #63bbd0;
      }
    }
    &:hover {
      background-color: #F2F6FC;
      border-radius:10px;
    }
  }
}
</style>
