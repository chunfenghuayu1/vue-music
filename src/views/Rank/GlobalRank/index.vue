<template>
<!-- 排行榜 全球榜图片 -->
  <div>
    <el-image
      :src="`${list.coverImgUrl}?param=300y300`"
      fit="fill"
      :lazy="true"
      :alt="list.description"
    ></el-image>
    <p>{{list.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
.el-image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
p {
  height: 30px;
  margin-top: 0;
  margin-bottom: 5px;
  text-align: left;
  font-size: 14px;
  color: #606266;
}
</style>
