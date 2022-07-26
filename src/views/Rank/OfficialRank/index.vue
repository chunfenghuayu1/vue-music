<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <!-- card body -->
    <el-row :gutter="20" type="flex" align="middle">
      <el-col :span="8">
        <router-link :to="{ path: '/rank/detail', query: { id: list.id } }">
          <el-image
            :src="`${list.coverImgUrl}?param=200y200`"
            fit="cover"
            :lazy="true"
          ></el-image>
        </router-link>
      </el-col>
      <el-col :span="16">
        <div class="list">
          <ul>
            <li v-for="(item, index) in list.list" :key="index">
              <el-row>
                <el-col :span="2" class="type">{{ index + 1 }}</el-col>
                <el-col :span="2" class="state">
                  <span
                    class="el-icon-caret-top"
                    v-if="item.pop == 100 ? true : false"
                  ></span>
                  <span v-else class="el-icon-minus"></span>
                </el-col>
                <el-col :span="8" class="songname">
                  <router-link
                    :to="{ path: '/songdetail', query: { id: item.id } }"
                  >
                    {{ item.name }}
                  </router-link>
                </el-col>
                <el-col :span="12" class="author">
                  <span v-for="(ar, index) in item.ar" :key="index" @click="goTarget(ar.id)">
                  <span v-if="index!==0">/</span>
                  {{ ar.name }}
                  </span>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="24" class="all"
                  ><router-link
                    :to="{ path: '/rank/detail', query: { id: list.id } }"
                    >查看全部 &gt;</router-link
                  ></el-col
                >
              </el-row>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    goTarget (id) {
      this.$router.push({ path: '/artist/detail', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-image {
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.list {
  ul {
    margin: 0;
    padding: 0;
    li {
      line-height: 35px;
      height: 35px;
      font-size: 14px;
      cursor: default;
      &:hover {
        background-color: #f2f6fc;
        border-radius: 5px;
      }
      &:nth-child(6):hover {
        background-color: transparent;
      }
      &:nth-child(even) {
        // background-color: #ccc;
        border-radius: 5px;
      }
      &:nth-child(6) {
        background-color: transparent;
      }
      &:nth-child(4) .type {
        color: var(--third-color);
      }
      &:nth-child(5) .type {
        color: var(--third-color);
      }
    }
  }
}
.type {
  color: #f56c6c;
  text-align: center;
}

.state {
  color: var(--third-color);
}
.songname {
  color: #606266;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  cursor: pointer;
}
.author {
  color: var(--third-color);
  text-align: right;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
}
.author span:hover {
  color: #606266;
  cursor: pointer;
}
.type1 {
  color: var(--third-color);
}
.all {
  color: var(--third-color);
}
.all a:hover {
  color: #606266;
  cursor: pointer;
}
.el-icon-caret-top {
  color: red;
}
</style>
