<template>
  <div class="main-container">
    <el-card :body-style="{padding: 0}">
      <div slot="header">
        <el-link
          :underline="false"
          type="primary"
        >Notification Tips</el-link>
      </div>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openNotify('primary')"
        >Normal</el-button>
        <el-button
          size="small"
          type="success"
          plain
          @click="openNotify('success')"
        >Success</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openNotify('warning')"
        >Warning</el-button>
        <el-button
          size="small"
          type="danger"
          plain
          @click="openNotify('danger')"
        >Error</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openNotify('html')"
        >With HTML Fragment</el-button>
      </div>
    </el-card>
    <el-card :body-style="{padding: 0}">
      <div slot="header">
        <el-link
          :underline="false"
          type="primary"
        >Confirmation Dialog</el-link>
      </div>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openConfirm('primary')"
        >Normal</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openConfirm('warning')"
        >Confirmation</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openConfirm('html')"
        >With HTML Fragment</el-button>
      </div>
    </el-card>
    <el-card :body-style="{padding: 0}">
      <div slot="header">
        <el-link
          :underline="false"
          type="primary"
        >Message Tips</el-link>
      </div>
      <div class="padding">
        <el-button
          size="small"
          type="primary"
          plain
          @click="openMessage('primary')"
        >Normal</el-button>
        <el-button
          size="small"
          type="success"
          plain
          @click="openMessage('success')"
        >Success</el-button>
        <el-button
          size="small"
          type="warning"
          plain
          @click="openMessage('warning')"
        >Warning</el-button>
        <el-button
          size="small"
          type="danger"
          plain
          @click="openMessage('danger')"
        >Error</el-button>
        <el-button
          size="small"
          type="info"
          plain
          @click="openMessage('html')"
        >With HTML Fragment</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  methods: {
    openNotify(type) {
      switch (type) {
        case 'primary':
          this.$notify({
            title: 'Notification',
            message: 'Username or password is incorrect.'
          })
          break
        case 'success':
          this.$notify({
            title: 'Notification',
            message: 'Congratulations, login successful.',
            type: 'success'
          })
          break
        case 'warning':
          this.$notify({
            title: 'Notification',
            message: 'Are you sure you want to delete this item?',
            type: 'warning'
          })
          break
        case 'danger':
          this.$notify({
            title: 'Notification',
            message: 'Operation failed. Please check the request parameters.',
            type: 'error'
          })
          break
        case 'html':
          this.$notify({
            title: 'Follow these steps to proceed',
            dangerouslyUseHTMLString: true,
            message: `<ul>
            <li style="color: red">Select image</li>
            <li style="font-weight: bold">Upload image</li>
            <li style="font-size: 20px">Display corresponding image</li>
            </ul>`
          })
          break
      }
    },
    openConfirm(type) {
      switch (type) {
        case 'primary':
          this.$alert('Are you sure you want to exit the current system?', 'Confirmation', {
            confirmButtonText: 'Confirm',
            callback: action => {
              this.$notify({
                title: 'Notification',
                message: 'You have exited the current system.',
                type: 'success'
              })
            }
          })
          break
        case 'warning':
          this.$confirm('This operation will permanently delete this file. Continue?', 'Important Notice', {
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: 'Deleted successfully!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Deletion canceled.'
            })
          })
          break
        case 'html':
          this.$alert(`<ul>
            <li style="color: red">Select image</li>
            <li style="font-weight: bold">Upload image</li>
            <li style="font-size: 20px">Display corresponding image</li>
            </ul>`, 'Follow these steps to proceed', {
            dangerouslyUseHTMLString: true
          })
          break
      }
    },
    openMessage(type) {
      switch (type) {
        case 'primary':
          this.$message('You have 10+ unread messages. Please check now.')
          break
        case 'success':
          this.$message({
            message: 'Congratulations, login successful.',
            type: 'success'
          })
          break
        case 'warning':
          this.$message({
            message: 'No item selected for deletion.',
            type: 'warning'
          })
          break
        case 'danger':
          this.$message({
            message: 'Operation failed. Please check the request parameters.',
            type: 'error'
          })
          break
        case 'html':
          this.$message({
            dangerouslyUseHTMLString: true,
            message: `<ul>
            <li style="color: red">Select image</li>
            <li style="font-weight: bold">Upload image</li>
            <li style="font-size: 20px">Display corresponding image</li>
            </ul>`
          })
          break
      }
    }
  }
}
</script>

<style scoped>
.el-card + .el-card {
  margin-top: 10px;
}
</style>
