<template>
    <div>
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
    <div class="desc">
      <p>Vue2.0项目源码地址：</p>
      <el-link type="primary" href="https://github.com/chunfenghuayu1/vue-music" target="_blank">GitHub</el-link>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      barList: [
        { name: '发现音乐', path: '/home', icon: 'icon-shouyeshouye' },
        { name: '排行榜', path: '/rank', icon: 'icon-paihangbang' },
        { name: '歌单', path: '/playlist', icon: 'icon-list' },
        { name: '歌手', path: '/artist', icon: 'icon-artist' },
        { name: 'MV', path: '/mv', icon: 'icon-bofangMV' }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  padding-left: 20px;
  li {
    height: 60px;
    text-align: left;
    line-height: 60px;
    padding-left: 10px;
    a {
      display: block;
      color: var(--third-color);
      .iconfont {
        font-size: 25px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .change {
        color:var(--main-color);
        font-size: 35px;
      }
      .changeFont {
        font-size: 18px;
        font-weight: bold;
        color: var(--main-color);
      }
    }
    &:hover {
      background-color: #F2F6FC;
      border-radius:10px;
    }
  }
}
.desc {
  margin-top: 100px;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  .el-link {
    color: var(--main-color);
    font-weight: bold;
  }
}
</style>
