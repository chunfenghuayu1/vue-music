<template>
  <div>
    <el-card shadow="always">
      <div slot="header">
        <span><!-- card title --></span>
      </div>
      <!-- card body -->
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      require: true,
      default: '',
      type: String
    }
  }
}
</script>

<style>

</style>
