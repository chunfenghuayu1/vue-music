<template>
  <div class="main">
    <div id="dplayer" ref="dplayer"></div>
  </div>
</template>

<script>
// 引入播放器
import DPlayer from 'dplayer'
export default {
  components: {
  },
  data () {
    return {

    }
  },
  props: ['mvUrl'],
  watch: {
    mvUrl: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          const dp = new DPlayer({
            container: this.$refs.dplayer,
            autoplay: false, // 自动播放
            loop: false, // 循环播放
            video: {
              url: this.mvUrl.url,
              type: 'auto'
            },
            lang: 'zh-cn',
            volume: 0.5, // 默认音量
            // 阻止其他播放 无效
            mutex: true
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 80%;
  #dplayer {
    height: 550px;
  }
}
</style>
