<template>
  <div class="notify-container flex justify-start">
    <div class="flex justify-center align-center icon-wrapper">
      <i class="el-icon-star-on"></i>
    </div>
    <div class="flex-sub margin-left-xs">
      <div class="title text-cut">Please attend the project requirements analysis meeting in the main conference room at 3:30 PM this afternoon. Attendance of all participants is mandatory.</div>
      <div class="time">1 hour ago</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageItem'
}
</script>

<style lang="scss" scoped>
.notify-container {
  padding: 10px;
  .icon-wrapper {
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    background-color: #ffce3d;
    font-size: 18px;
  }
  .title {
    font-size: 14px;
    color: #333;
  }
  .time {
    margin-top: 10px;
    font-size: 12px;
    color: #888;
  }
}
</style>
