<template>
  <div class="notify-container">
    <div class="title text-cut">Please attend the project requirements analysis meeting in the main conference room at 3:30 PM this afternoon. All participants are required to be on time.</div>
    <div class="flex justify-end margin-top-xs">
      <el-tag
        type="primary"
        size="mini"
      >In Progress</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem'
}
</script>

<style lang="scss" scoped>
.notify-container {
  padding: 10px;
  .title {
    font-size: 14px;
    color: #333;
  }
}
</style>
