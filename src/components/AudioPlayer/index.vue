<template>
  <div>
    <div
      class="main"
      @mouseenter="showBar"
      @mouseleave="hiddenBar"
      :class="flag && !lock ? '' : 'active'"
      v-if="musicList.length > 0"
    >
      <div class="top">
        <div class="btn" @click="lockBar">
          <span class="el-icon-unlock" :class="lock ? 'lock' : ''"></span>
        </div>
      </div>
      <div class="bar">
        <el-slider
          v-model="value3"
          :show-tooltip="false"
          @change="changeCurrentTime"
          @mousedown.native="control"
        ></el-slider>
      </div>
      <div class="body">
        <div class="player-body">
          <div class="player-left">
            <div class="avatar" v-if="source">
              <el-image
                v-if="source"
                :src="`${source.album.picUrl}?param=50y50`"
                fit="cover"
                :lazy="true"
              ></el-image>
            </div>
            <div class="song" v-if="source">
              <p class="song-name">{{ source.name }}</p>
              <p
                class="ar-name"
                v-for="(item, index) in source.singer"
                :key="index"
              >
                <span v-if="index !== 0">/</span>{{ item.name }}
              </p>
            </div>
            <div class="time" v-if="source">
              <span>{{ currentTime }}</span
              ><span> / </span><span>{{ source.dt }}</span>
            </div>
          </div>
          <div class="player-middle">
            <!-- 上一曲 -->
            <div class="before" @click="beforMusic">
            <svg-icon icon-class="before" style="fontSize:30px;"></svg-icon>
            </div>
            <!-- 播放 -->
            <div v-if="play" class="play" @click="playOrParse(false)">
              <svg-icon icon-class="play" style="fontSize:30px;"></svg-icon>
            </div>
            <!-- 暂停 -->
            <div v-else class="parse" @click="playOrParse(true)">
            <svg-icon icon-class="parse" style="fontSize:30px;"></svg-icon>
            </div>
            <!-- 下一曲 -->
            <div class="next" @click="nextMusic">
            <svg-icon icon-class="next" style="fontSize:30px;"></svg-icon>
            </div>
          </div>
          <div class="player-right">
            <div class="volume" v-if="source">
              <div class="volume-icon">
                <svg-icon icon-class="volume-icon" style="fontSize:20px;"></svg-icon>
              </div>
              <div class="volume-slider">
                <el-slider v-model="volume" :show-tooltip="true"></el-slider>
              </div>
            </div>
            <el-tooltip
              :manual="true"
              effect="dark"
              :content="text1"
              placement="top"
              :hide-after="500"
              v-model="isShow"
            >
              <div class="list">
                <el-popover placement="top-start" width="500" trigger="click">
                  <div>
                    <div style="display: flex; justify-content: space-between">
                      <span
                        >播放列表<span>(共{{ musicList.length }}首)</span></span
                      >
                      <span style="cursor: pointer" @click="removeList"
                        >清空列表</span
                      >
                    </div>
                    <el-table
                      :data="musicList"
                      size="small"
                      height="350"
                      style="width: 100%"
                    >
                      <el-table-column label="序号" align="center">
                        <template slot-scope="{ row, $index }">
                          <span v-if="row.id !== source.id || play">{{
                            $index + 1
                          }}</span>
                          <span v-else>
                            <svg-icon icon-class="listPlay" style="fontSize:32px;"></svg-icon>
                            </span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="歌曲"
                        prop="name"
                      ></el-table-column>
                      <el-table-column label="歌手">
                        <template slot-scope="{ row, $index }">
                          <span v-for="(item, index) in row.singer" :key="index"
                            ><span v-if="index !== 0">/</span
                            >{{ item.name }}</span
                          >
                        </template>
                      </el-table-column>
                      <el-table-column label="时长" prop="dt"></el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="{ row }">
                          <div>
                            <span style="cursor: pointer" @click="listPlay(row)"
                              >
                              <svg-icon icon-class="listPlayButton" style="fontSize:20px;"></svg-icon>
                              </span>
                            <span
                              style="cursor: pointer"
                              @click="listDelete(row.id)"
                              >
                              <svg-icon icon-class="listDelete" style="fontSize:20px;"></svg-icon>
                              </span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <svg-icon slot="reference" icon-class="list" style="fontSize:24px;"></svg-icon>
                </el-popover>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <div class="audio" v-if="source">
      <audio
        :src="source.url"
        ref="audio"
        @ended="nextPlay"
        @timeupdate="audioUpdateTime"
      ></audio>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      // 控制音量
      volume: 50,
      // 控制进度条
      value3: 0,
      // 控制播放暂停
      play: true,
      // 音乐文件
      // 可能会报错，不能去除里面的变量
      source: {
        album: {
          picUrl: ''
        },
        dt: '00:00'
      },
      // 当前时间
      currentTime: '00:00',
      // 控制tooltip
      isShow: false,
      // 提示文字
      text1: '添加歌曲成功',
      // 控制播放器上浮
      flag: false,
      // 锁定
      lock: false,
      // 设置一个定时器
      timer: '',
      // 控制进度条拖拽时，不改变value3的值
      controlPro: true
    }
  },
  mounted () {
    // 挂载后暂停播放
    this.playOrParse(true)
    // 控制添加到播放列表的提示
    this.$bus.$on('ADDMUSIC', (val) => {
      this.showBar()
      if (!val) {
        this.text1 = '已经添加过了！'
      } else {
        this.text1 = '添加歌曲成功'
      }
      this.isShow = true
      setTimeout(() => {
        this.isShow = false
      }, 1000)
      this.hiddenBar()
    })
    // 控制立即播放按钮
    this.$bus.$on('PLAYMUSIC', (song) => {
      this.showBar()
      this.source = song
      this.playOrParse(false)
      this.hiddenBar()
    })
    if (this.musicList.length > 0) {
      this.showBar()
      this.hiddenBar()
      this.source = this.musicList[0]
    }
  },
  methods: {
    // 播放和暂停
    // false为播放
    // 如果同一首歌多次点击，则不会重新播放
    playOrParse (val) {
      this.play = val
      if (this.play) {
        this.$refs.audio.pause()
      } else {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      }
    },
    // 当前播放时间 会实时调用函数
    audioUpdateTime (e) {
      this.currentTime = this.format(e.target.currentTime)
      if (this.controlPro) {
        // 计算当前歌曲百分比进度
        const time =
          (e.target.currentTime / this.formatSongSecond(this.source.dt)) * 100
        // 保留两位小数
        this.value3 = Math.floor(time * 100) / 100
      }
    },
    // 控制歌曲进度
    changeCurrentTime (val) {
      const time = (this.formatSongSecond(this.source.dt) * val) / 100
      const audio = this.$refs.audio
      audio.currentTime = time
      this.value3 = val
      this.controlPro = true
    },
    // 鼠标按下，控制进度条拖拽时不改变数值
    control () {
      this.controlPro = false
    },
    // 格式化时间
    format (duration) {
      const time = duration
      const m = (Math.floor(time / 60) + '').padStart(2, '0')
      const s = (Math.floor(time % 60) + '').padStart(2, '0')
      return `${m}:${s}`
    },
    // 歌曲转毫秒格式化处理 03:30 => (3*60+30) * 1000
    formatSongSecond (duration) {
      const arr = duration.split(':')
      let second = 0

      for (let i = 0; i < arr.length; i++) {
        second += arr[i] * 60 * (arr.length - 1 - i)
      }

      second += arr[arr.length - 1] * 1

      return second
    },
    // 控制播放器显示
    // 当鼠标移入
    // true为移除
    showBar () {
      this.flag = false
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // 当鼠标移出
    hiddenBar () {
      if (!this.lock) {
        this.timer = setTimeout(() => {
          this.flag = true
        }, 3000)
      }
    },
    // 锁定播放器显示
    lockBar () {
      this.lock = !this.lock
    },
    // 播放列表里面播放歌曲
    listPlay (row) {
      const song = this.musicList.filter((item) => item.id === row.id)
      this.source = song[0]
      this.playOrParse(false)
    },
    // 删除歌曲
    listDelete (id) {
      this.$store.dispatch('deleteSong', id)
      // 如果删除的是正在播放的歌，则暂停
      if (this.source.id === id) {
        this.playOrParse(true)
      }
    },
    // 清空列表
    removeList () {
      // 向删除歌曲传id=-1
      this.$store.dispatch('removeSong', -1)
      this.$refs.audio.load()
    },
    // 下一曲
    nextMusic () {
      const index = this.musicList.findIndex(
        (item) => item.id === this.source.id
      )
      // 如果为最后一首，则从第一首开始播放
      if (index === this.musicList.length - 1) {
        this.source = this.musicList[0]
      } else {
        this.source = this.musicList[index + 1]
      }
      this.playOrParse(false)
    },
    // 上一曲
    beforMusic () {
      const index = this.musicList.findIndex(
        (item) => item.id === this.source.id
      )
      // 如果是第一首，则播放最后一首
      if (index === 0) {
        this.source = this.musicList[this.musicList.length - 1]
      } else {
        this.source = this.musicList[index - 1]
      }
      this.playOrParse(false)
    },
    // 当前歌曲播放完毕,按顺序播放
    nextPlay () {
      this.nextMusic()
    }
  },
  computed: {
    ...mapState({
      musicList: (state) => state.playBar.musicList
    })
  },
  watch: {
    // 控制音量
    volume: {
      immediate: true,
      handler (newval) {
        this.$nextTick(() => {
          const audio = this.$refs.audio
          audio.volume = newval / 100
        })
      }
    },
    source: {
      handler (newval) {
        if (newval.license) {
          this.$message.error('无法播放')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 95px;
  transform: translateY(70%);
  z-index: 999;
  background-color: transparent;
  transition: all 0.4s ease-out;
  &.active {
    transform: translateY(0);
  }
  @keyframes up {
    100% {
      transform: translateY(0%);
    }
  }
  .top {
    position: relative;
    background-color: transparent;
    height: 25px;
    .btn {
      position: absolute;
      right: 300px;
      top: 0;
      width: 45px;
      height: 25px;
      // background-color: #fff;
      text-align: center;
      border-top-right-radius: 25px;
      border-top-left-radius: 25px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: hsla(0, 0%, 100%, 0.722);
      backdrop-filter: saturate(180%) blur(20px);
      cursor: pointer;
      span {
        font-size: 16px;
        font-weight: bold;
        color: var(--third-color);
        line-height: 25px;
      }
      .lock {
        color: var(--main-color);
      }
    }
  }
  .bar {
    /deep/ .el-slider__runway {
      height: 4px;
      margin: 0;
      padding: 0;
      .el-slider__bar {
        background-color: hsl(192, 54%, 60%, 0.722);
      }
      .el-slider__button {
        border: 2px solid var(--main-color);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .body {
    height: 70px;
    // background-color: #fff;
    background-color: hsla(0, 0%, 100%, 0.722);
    backdrop-filter: saturate(180%) blur(20px);
    .player-body {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      // align-items: center;
    }
    .player-left {
      display: flex;
      justify-content: left;
      align-items: center;
      height: 70px;
      flex: 1;
      .avatar {
        margin-right: 10px;
        .el-image {
          width: 50px;
          height: 50px;
          border-radius: 5px;
          vertical-align: middle;
        }
      }
      .song {
        margin-right: 20px;
        .song-name {
          font-size: 14px;
          cursor: pointer;
        }
        .ar-name {
          display: inline-block;
          font-size: 12px;
          cursor: pointer;
          // -webkit-line-clamp: 1;
          // -webkit-box-orient: vertical;
          // word-break: break-all;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // overflow: hidden;
        }
      }
      .time {
        span {
          font-size: 14px;
        }
      }
    }
    .player-middle {
      min-width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .before {
        cursor: pointer;
      }
      .play {
        cursor: pointer;
      }
      .parse {
        cursor: pointer;
      }
      .next {
        cursor: pointer;
      }
    }
    .player-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      .volume {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        margin-right: 15px;
        .volume-icon {
          margin-right: 15px;
        }
        .volume-slider {
          /deep/ .el-slider__runway {
            height: 3px;
            width: 150px;
            margin: 0;
            padding: 0;
            vertical-align: middle;
            .el-slider__bar {
              background-color: hsl(192, 54%, 60%, 0.722);
              height: 3px;
            }
            .el-slider__button {
              border: 2px solid var(--main-color);
              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
      .list {
        cursor: pointer;
        .el-popover {
          .list-tips {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
}
.audio {
  display: hidden;
}
</style>
