<template>
  <el-card shadow="always" :body-style="{ padding: '0px 20px' }">
    <div slot="header">
      <el-row type="flex">
        <el-col>
          <a class="header-title">{{ list.name }}</a>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span class="header-tip">最近更新：{{ updateTime }}</span>
        </el-col>
      </el-row>
    </div>
    <!-- card body -->
    <div>
      <ul>
        <li v-for="item in list.list" :key="item.id">
          <div class="img">
            <router-link :to="{ path: '/songdetail', query: { id: item.id } }">
              <el-image
                style="width: 50px; height: 50px"
                :src="item.al.picUrl + '?param=50y50'"
                fit="cover"
                :lazy="true"
              ></el-image>
            </router-link>
          </div>
          <div class="title">
            <router-link :to="{ path: '/songdetail', query: { id: item.id } }">
              {{ item.name }}
            </router-link>
            <a>
              <i v-for="(artist,index) in item.ar" :key="artist.id" @click="goTarget(artist.id)"><i v-if="index!==0">/</i>{{ artist.name }}</i>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import formatSong from '@/utils/formatSong'
export default {
  props: ['list'],
  computed: {
    updateTime () {
      return formatSong.formartDate(this.list.updateTime, 'MM月dd日HH时mm分')
    }
  },
  methods: {
    goTarget (id) {
      this.$router.push({ path: '/artist/detail', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  border-radius: 10px;
  // header部分
  .el-row {
    .el-col {
      text-align: left;
    }
  }
  // body部分
  div {
    ul {
      padding-left: 0;
      li {
        text-align: left;
        height: 50px;
        line-height: 50px;
        margin: 0 0 20px 0;
        display: flex;
        &:hover {
          background-color: #f2f6fc;
          border-radius: 10px;
        }
        .img {
          margin-right: 20px;
          .el-image {
            border-radius: 5px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          }
        }
        .title {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          a {
            line-height: 25px;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            overflow: hidden;
            i {
              font-style: normal;
            }
            &:nth-child(1) {
              color: var(--second-color);
              font-size: 14px;
            }
            &:nth-child(2) {
              color: var(--third-color);
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.header-title {
  display: block;
  font-size: 22px;
  font-weight: bold;
  color: var(--second-color);
  margin-bottom: 5px;
}
.header-tip {
  font-size: 12px;
  color: var(--third-color);
}
</style>
