<template>
  <div>
    <div class="main" @mouseenter="showBar" @mouseleave="hiddenBar" :class="flag && !lock?'':'active'" v-if="musicList.length>0">
      <div class="top">
        <div class="btn" @click="lockBar" >
          <span class="el-icon-unlock" :class="lock?'lock':''"></span>
        </div>
      </div>
      <div class="bar">
        <el-slider v-model="value3" :show-tooltip="false" @change="changeCurrentTime" @mousedown.native="control"></el-slider>
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
              <p class="song-name">{{source.name}}</p>
              <p class="ar-name" v-for="(item,index) in source.singer" :key="index"><span v-if="index!==0">/</span>{{item.name}}</p>
            </div>
            <div class="time" v-if="source">
              <span>{{ currentTime }}</span
              ><span> / </span><span>{{ source.dt }}</span>
            </div>
          </div>
          <div class="player-middle">
            <!-- 上一曲 -->
            <div class="before">
              <svg
                width="30"
                height="30"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                 @click="beforMusic"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M34 36L22 24L34 12"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 12V36"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <!-- 播放 -->
            <div v-if="play" class="play" @click="playOrParse(false)">
              <svg
                width="30"
                height="30"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  fill="none"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 24V17.0718L26 20.5359L32 24L26 27.4641L20 30.9282V24Z"
                  fill="none"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <!-- 暂停 -->
            <div v-else class="parse" @click="playOrParse(true)">
              <svg
                width="30"
                height="30"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  fill="none"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linejoin="round"
                />
                <path
                  d="M19 18V30"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M29 18V30"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <!-- 下一曲 -->
            <div class="next">
              <svg
                width="30"
                height="30"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                @click="nextMusic"
              >
                <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                <path
                  d="M14 12L26 24L14 36"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34 12V36"
                  stroke="#63bbd0"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div class="player-right">
            <div class="volume" v-if="source">
              <div class="volume-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="48"
                    height="48"
                    fill="white"
                    fill-opacity="0.01"
                  />
                  <path
                    d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
                    fill="none"
                    stroke="#63bbd0"
                    stroke-width="4"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
                    stroke="#63bbd0"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34.2358 41.1857C40.0835 37.6953 43.9999 31.305 43.9999 24C43.9999 16.8085 40.2042 10.5035 34.507 6.97906"
                    stroke="#63bbd0"
                    stroke-width="4"
                    stroke-linecap="round"
                  />
                </svg>
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
                      <span style="cursor: pointer" @click="removeList">清空列表</span>
                    </div>
                    <el-table
                      :data="musicList"
                      size="small"
                      height="350"
                      style="width: 100%"
                    >
                      <el-table-column
                        label="序号"
                        align="center"
                      >
                      <template slot-scope="{row,$index}">
                        <span v-if="row.id!==source.id || play">{{$index+1}}</span>
                        <span v-else><svg t="1655838281940" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8868" width="32" height="32"><path d="M0 512c0 282.763636 229.236364 512 512 512s512-229.236364 512-512S794.763636 0 512 0 0 229.236364 0 512z" fill="#F9F9F9" p-id="8869"></path><path d="M649.541818 528.360727l-2.862545-2.885818-181.457455-103.68C462.336 418.909091 459.473455 418.909091 456.610909 418.909091c-8.634182 0-14.405818 5.771636-14.405818 14.405818v213.131636c0 8.657455 5.771636 14.405818 14.405818 14.405819 2.885818 0 5.748364 0 8.634182-2.885819l181.457454-103.68h2.885819c2.885818-2.885818 5.748364-5.771636 5.748363-11.52a21.992727 21.992727 0 0 0-5.748363-14.405818z m-178.548363 95.045818V456.378182l146.897454 83.525818-146.897454 83.549091z" fill="#5693FF" p-id="8870"></path><path d="M523.636364 215.272727A307.549091 307.549091 0 0 0 215.272727 523.636364c0 170.938182 137.425455 308.363636 308.363637 308.363636s308.363636-137.425455 308.363636-308.363636S694.574545 215.272727 523.636364 215.272727z m0 34.909091c151.645091 0 273.454545 121.809455 273.454545 273.454546S675.281455 797.090909 523.636364 797.090909A272.64 272.64 0 0 1 250.181818 523.636364c0-151.645091 121.809455-273.454545 273.454546-273.454546z" fill="#5693FF" p-id="8871"></path></svg></span>
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
                            <span style="cursor: pointer" @click="listPlay(row)"><svg t="1655819491574" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7410" width="20" height="20"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" fill="#5C5C66" p-id="7411"></path></svg></span>
                            <span style="cursor: pointer" @click="listDelete(row.id)"><svg t="1655819406292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2316" width="20" height="20"><path d="M202.666667 256h-42.666667a32 32 0 0 1 0-64h704a32 32 0 0 1 0 64H266.666667v565.333333a53.333333 53.333333 0 0 0 53.333333 53.333334h384a53.333333 53.333333 0 0 0 53.333333-53.333334V352a32 32 0 0 1 64 0v469.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H320c-64.8 0-117.333333-52.533333-117.333333-117.333334V256z m224-106.666667a32 32 0 0 1 0-64h170.666666a32 32 0 0 1 0 64H426.666667z m-32 288a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z m170.666666 0a32 32 0 0 1 64 0v256a32 32 0 0 1-64 0V437.333333z" p-id="2317"></path></svg></span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <svg
                    slot="reference"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="48"
                      height="48"
                      fill="white"
                      fill-opacity="0.01"
                    />
                    <path
                      d="M5 10L8 13L14 7"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 24L8 27L14 21"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 38L8 41L14 35"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 24H43"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 38H43"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 10H43"
                      stroke="#63bbd0"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
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
        const time = e.target.currentTime / this.formatSongSecond(this.source.dt) * 100
        // 保留两位小数
        this.value3 = Math.floor(time * 100) / 100
      }
    },
    // 控制歌曲进度
    changeCurrentTime (val) {
      const time = this.formatSongSecond(this.source.dt) * val / 100
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
      const song = this.musicList.filter(item => item.id === row.id)
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
      const index = this.musicList.findIndex(item => item.id === this.source.id)
      // 如果为最后一首，则从第一首开始播放
      if (index == this.musicList.length - 1) {
        this.source = this.musicList[0]
      } else {
        this.source = this.musicList[index + 1]
      }
      this.playOrParse(false)
    },
    // 上一曲
    beforMusic () {
      const index = this.musicList.findIndex(item => item.id === this.source.id)
      // 如果是第一首，则播放最后一首
      if (index == 0) {
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
  transition: all .4s ease-out ;
  &.active {
    transform: translateY(0);
  }
@keyframes up {
  100%{
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
        color: #909399;
        line-height: 25px;

      }
      .lock {
          color: #63bbd0;
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
        border: 2px solid #63bbd0;
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
        font-size: 0;
        cursor: pointer;
      }
      .play {
        font-size: 0;
        cursor: pointer;
      }
      .parse {
        font-size: 0;
        cursor: pointer;
      }
      .next {
        font-size: 0;
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
          font-size: 0;
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
              border: 2px solid #63bbd0;
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
            span {
            }
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
