<template>
  <div class="main-container">
    <el-card
      :body-style="{ padding: 0 }"
      shadow="never"
      class="container"
    >
      <div class="text-center"><i class="el-icon-success icon"></i></div>
      <div class="result">
        Submission Successful
      </div>
      <div class="tip">
        The submission result page is used to provide feedback on a series of operational tasks. For simple operations, you can use the Message global prompt feedback. This text area can display simple supplementary explanations. If there is a need to display "documents" or similar, the gray area below can present more complex content.
      </div>
      <div class="text-center action">
        <el-button
          type="primary"
          size="small"
        >Return to List</el-button>
        <el-button size="small">View Project</el-button>
        <el-button size="small">Print</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Success'
}
</script>

<style lang="scss" scoped>
.container {
  padding: 50px;
  .icon {
    color: #67c23a;
    font-size: 100px;
    margin: 30px 0;
  }
  .result {
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .tip {
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }
  .action {
    margin-top: 30px;
  }
}
</style>
