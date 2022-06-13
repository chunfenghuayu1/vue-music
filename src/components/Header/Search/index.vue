<template>
  <div>
    <!--
            v-model="state"
      @select="handleSelect"
          :fetch-suggestions="querySearchAsync"
          -->
    <el-autocomplete
      placeholder="请输入内容"
      suffix-icon="el-icon-search"
      :debounce="50"
      style="width: 300px"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
