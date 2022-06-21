<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- card body -->
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>地区：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="(item, index) in area"
            :key="index"
            class="item"
            :class="item == initArea ? 'active' : ''"
            @click="togglePramas('area', item)"
            >{{ item }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>分类：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="(item,index) in type"
            :key="index"
            class="item"
            :class="item == initType ? 'active' : ''"
            @click="togglePramas('type', item)"
            >{{ item }}</span
          >
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" align="middle">
        <el-col :span="2">
          <h1>筛选：</h1>
        </el-col>
        <el-col :span="22">
          <span
            v-for="(item,index) in initial"
            :key="index"
            class="item"
            :class="item == initAlphabet ? 'active' : ''"
            @click="togglePramas('initial', item)"
            >{{ item }}</span
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
      type: ['全部', '官方版', '现场版', '网易出品'],
      // 语种
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      initial: ['上升最快', '最新'],
      // 数据绑定
      initType: '全部',
      initArea: '全部',
      initAlphabet: '上升最快',
      // 整理需要发送的参数
      params: {
        type: '全部',
        area: '全部',
        order: '上升最快',
        limit: 100,
        offset: 0
      }
    }
  },
  methods: {
    // 切换分类
    togglePramas (val, index) {
      if (val === 'type') {
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
        this.params.order = index
        this.getData()
      }
    },
    // 获取歌手列表数据
    async getData () {
      await this.$store.dispatch('getNavMenu', this.params)
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
