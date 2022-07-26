<template>
  <div>
    <el-select
      v-model.trim="value"
      filterable
      remote
      clearable
      placeholder="请输入歌名、歌词、歌手或专辑"
      :remote-method="remoteMethod"
      loading-text="搜索中..."
      @focus="handleFocus"
      :loading="loading"
      style="width:100px;"
    >
      <el-option-group
        v-for="list in suggestInfo"
        :key="listType[list.label]"
        :label="listType[list.label]"
      >
        <el-option
          v-for="(item, index) in list.info"
          :key="list.label + index"
          :label="item.name"
          :value="list.label + item.name"
          @click.native="jumpPage(item, list.label)"
        >
          {{ item.name }}
          <template v-if="list.label === 'songs'">
            -
            <span v-for="(a, i) in item.artists" :key="i">{{
              (i !== 0 ? ' / ' : '') + a.name
            }}</span>
          </template>
        </el-option>
      </el-option-group>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      loading: false,
      suggestInfo: [],
      listType: {
        songs: '单曲',
        artists: '歌手',
        playlists: '歌单'
      }
    }
  },
  methods: {
    remoteMethod (query) {
      this.value = query
      if (this.value) {
        this.loading = true
        this.suggestInfo = []
        this.getSearchResult()
      }
    },
    // 搜索框聚焦
    handleFocus (e) {
      // 暂不处理
    },
    // 获取搜索结果
    async getSearchResult () {
      const { data } = await this.$http.searchSuggest(this.value)
      this.loading = false
      if (data.code === 200) {
        const list = []
        for (const k in data.result) {
          if (k !== 'albums' && k !== 'order') {
            list.push({
              label: k,
              info: data.result[k]
            })
          }
        }
        this.suggestInfo = list
      } else {
        this.$message.error('获取搜索结果失败，请重试！')
      }
    },
    // 页面跳转
    jumpPage (item, label) {
      switch (label) {
        case 'artists':
          this.$router.push({ path: '/artist/detail', query: { id: item.id } })
          break
        case 'songs':
          this.$router.push({ path: '/songdetail', query: { id: item.id } })
          break
        case 'playlists':
          this.$router.push({ path: '/rank/detail', query: { id: item.id } })
          break
      }
      this.value = ''
      this.suggestInfo = []
    }
  }
}
</script>

<style lang="less" scoped>
div {
  min-width: 300px;
  .el-select-group__wrap {
    padding-bottom: 30px;
  }
}
</style>
