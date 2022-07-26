<template>
  <div v-if="tagsList">
    <el-card shadow="always" :body-style="{ padding: '20px' }" >
      <!-- card body -->
      <el-row :gutter="20" type="flex">
        <el-col v-for="(categories, index) in tagsList" :key="index">
          <div class="title">{{ categories.key }}</div>
          <div class="body">
            <span
              v-for="(sub, index) in categories.tags.slice(0, 8)"
              :key="index"
            >
              <em @click="changeList(sub.name)"
              :class="sub.name==title?'active':''"
               >{{ sub.name }}</em>
            </span>
            <el-dropdown
              class="more"
              v-if="index == 0 ? false : true"
              trigger="click"
              size="small"
              @command="changeList"
            >
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(sub2, index) in categories.tags.slice(8)"
                  :key="index"
                  :command="sub2.name"
                  >{{ sub2.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['title'],
  computed: {
    ...mapGetters(['tagsList'])
  },
  methods: {
    changeList (val) {
      // 控制样式
      this.name = val
      const { query } = this.$route
      if (query.cat !== val) {
        this.$router.push({ path: '/playlist', query: { cat: val, order: 'hot' } })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  border-radius: 10px;
}
.el-col {
  position: relative;
}
.el-col::after {
  content: '';
  position: absolute;
  top: 0;
  left: 90%;
 border-right: 1px solid #f5f5f5;
 height: 100%;
}
.el-col:nth-child(5)::after {
  border: none;
}
.title {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
}
.body {
  span {
    display: inline-block;
    width: calc(100% /  3);
    em {
      font-size: 14px;
      line-height: 25px;
      cursor: pointer;
      font-style: normal;
    }
  }
  .more {
    display: inline;
    font-size: 14px;
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.active {
  background: var(--main-color);
  border-radius: 3px;
  color: #f5f5f5;
  padding: 5px;
  margin: 5px -5px 0;
}
</style>
