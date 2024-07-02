<template>
  <div class="main-container">
    <el-card
      :body-style="{ padding: 0 }"
      shadow="never"
      class="container"
    >
      <div class="text-center"><i class="el-icon-error icon"></i></div>
      <div class="result">
        Submission Failed
      </div>
      <div class="tip">
        Please verify and correct the following information before resubmitting.
      </div>
      <el-card
        :body-style="{padding: 0}"
        class="text-center reason"
      >
        <div class="text-bold text-lg margin-bottom">There are the following errors in your submission:</div>
        <div class="reason-item"><i class="el-icon-circle-close text-red margin-right-xs"></i>Your account has been frozen
          <el-link
            :underline="false"
            type="primary"
            class="margin-left"
          >Unfreeze Now<i class="el-icon-arrow-right"></i></el-link>
        </div>
        <div class="reason-item"><i class="el-icon-circle-close text-red margin-right-xs"></i>Your account does not meet the application requirements
          <el-link
            :underline="false"
            type="primary"
            class="margin-left"
          >Upgrade Now<i class="el-icon-arrow-right"></i></el-link>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Fail'
}
</script>

<style lang="scss" scoped>
.container {
  padding: 50px;
  .icon {
    color: #ed4014;
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
  .reason {
    padding: 24px 40px;
    text-align: left;
    border-radius: 4px;
    margin-top: 30px;
    .title {
      margin-bottom: 16px;
      font-weight: 500;
      font-size: 16px;
    }
    .reason-item {
      font-size: 14px;
    }
    .reason-item + .reason-item {
      margin-top: 15px;
    }
  }
}
</style>
