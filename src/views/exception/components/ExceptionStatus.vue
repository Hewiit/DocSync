<template>
  <div class="exception-container">
    <div class="img-wrapper">
      <img :src="statusImage" />
    </div>
    <div class="title">
      <div>{{ statusTip }}</div>
      <div class="margin-top-lg">
        <el-button
          type="primary"
          size="mini"
          @click="backHome"
        >
          Back to mainPage
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import image_404 from '@/assets/img_404.png'
import image_403 from '@/assets/img_403.png'
import image_500 from '@/assets/img_500.png'
export default {
  name: 'ExceptionStatus',
  props: {
    status: {
      type: [Number, String],
      default: '404'
    }
  },
  data() {
    return {
      image404: image_404,
      image403: image_403,
      image500: image_500
    }
  },
  computed: {
    statusImage() {
      if (this.status.toString() === '404') {
        return this.image404
      } else if (this.status.toString() === '403') {
        return this.image403
      } else {
        return this.image500
      }
    },
    statusTip() {
      if (this.status.toString() === '404') {
        return 'The page you are trying to access does not exist.'
      } else if (this.status.toString() === '403') {
        return 'You do not have permission to access this page.'
      } else {
        return 'The page you are trying to access encountered an error.'
      }
    }
  },
  methods: {
    backHome() {
      this.$router.replace({ path: '/index/main' })
    }
  }
}
</script>

<style lang="scss" scoped>
.exception-container {
  text-align: center;
  height: 100%;
  .img-wrapper {
    width: 80%;
    margin: 0 auto;
    & > img {
      width: 100%;
    }
  }
  .title {
    margin-top: -50px;
  }
}
</style>
