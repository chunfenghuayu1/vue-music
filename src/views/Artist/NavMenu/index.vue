<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>语种：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="area1 in area"
            :key="area1.val"
            class="item"
            :class="area1.val == initArea ? 'active' : ''"
            @click="togglePramas('area', area1.val)"
            >{{ area1.label }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>分类：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="type1 in type"
            :key="type1.val"
            class="item"
            :class="type1.val == initType ? 'active' : ''"
            @click="togglePramas('type', type1.val)"
            >{{ type1.label }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>筛选：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="initial1 in initial"
            :key="initial1.val"
            class="item"
            :class="initial1.val == initAlphabet ? 'active' : ''"
            @click="togglePramas('initial', initial1.val)"
            >{{ initial1.label }}</span
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分类
      type: [
        { label: '全部', val: -1 },
        { label: '男歌手', val: 1 },
        { label: '女歌手', val: 2 },
        { label: '乐队', val: 3 }
      ],
      // 语种
      area: [
        { label: '全部', val: -1 },
        { label: '华语', val: 7 },
        { label: '欧美', val: 96 },
        { label: '日本', val: 8 },
        { label: '韩国', val: 16 },
        { label: '其他', val: 0 }
      ],
      // 数据绑定
      initType: -1,
      initArea: -1,
      initAlphabet: -1,
      // 整理需要发送的参数
      params: {
        type: -1,
        area: -1,
        initial: -1,
        limit: 50,
        offset: 0
      }
    }
  },
  computed: {
    // 筛选
    initial () {
      // 初始化数据
      const init = [{ label: '热门', val: -1 }]
      const alphabet = []
      // 循环26个英文字母
      for (let i = 0; i < 26; i++) {
        alphabet.push({
          label: String.fromCharCode(65 + i),
          val: String.fromCharCode(97 + i)
        })
      }
      const sum = [...init, ...alphabet, { label: '#', val: 0 }]
      return sum
    }
  },
  methods: {
    // 切换分类
    togglePramas (val, index) {
      if (val === 'type') {
        console.log(index)
        this.initType = index
        // 整理参数
        this.params.type = index
        this.getData()
      } else if (val === 'area') {
        this.initArea = index
        this.params.area = index
        this.getData()
      } else if (val === 'initial') {
        this.initAlphabet = index
        this.params.initial = index
        this.getData()
        // console.log(index)
      }
    },
    // 获取歌手列表数据
    async  getData () {
      await this.$store.dispatch('getArtistList', this.params)
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
h1 {
  font-size: 16px;
  text-align: center;
}
.item {
  display: inline-block;
  margin-right: 20px;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #909399;
}
.el-card {
  border-radius: 10px;
}
.active {
  background-color: #63bbd0;
  border-radius: 5px;
  color: #fff;
}
</style>
