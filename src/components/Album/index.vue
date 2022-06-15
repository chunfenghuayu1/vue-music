<template>
      <el-row :gutter="20">
        <el-col v-for="(item,index) in playListDetail" :key="index">
          <div class="body-card">
            <el-image
              :src="`${item.coverImgUrl}?param=250y250`"
              fit="cover"
              :lazy="true"
            ></el-image>
            <div>
              <a class="body-title">{{item.name}}</a>
              <div class="tags">
                <a  v-for="(tag,index) in item.tags" :key="index">#{{tag}}</a>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
</template>

<script>
export default {
  props: ['playListDetail']
}
</script>

<style lang="less" scoped>
.el-col {
width: calc(100% / 6);
}
.body-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .el-image {
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
}
}
.body-title {
  display: block;
  margin-bottom: 10px;
  color: #303133;
  height: 40px;
}
.tags {
  a {
    margin-right: 10px;
    color: #63bbd0;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
