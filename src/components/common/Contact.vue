<template>
  <div class="contact-container">
    <div class="code-wrapper">
      <img :src="require('@/assets/img_login_bg_04.jpg')" />
    </div>
    <p></p>
    <span>Technology Stack</span>
    <p></p>
    <span>Frontend: Vue.js framework</span>
    <p></p>
    <span>Backend: Django web framework</span>
    <p></p>
    <span>Database: MySQL</span>
    <p></p>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'
import Setting from '@/utils/setting'

export default {
  name: 'Contact',
  data() {
    return {
      qq: Setting.customQQ,
      officialAccount: Setting.officialAccount
    }
  },
  methods: {
    copy() {
      const clipboard = new ClipboardJS('.copy')
      clipboard.on('success', (e) => {
        this.$successMsg('Copy successful~')
      })
      clipboard.on('error', (e) => {
        this.$errorMsg('Copy failed')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-container {
  width: 100%;
  text-align: center;
  .code-wrapper {
    width: 80%;
    margin: 0 auto;
    & > img {
      width: 100%;
      height: 100%;
    }
  }
  .copy {
    width: 50px;
    background-color: #409eff;
    font-size: 12px;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(47,187, 212, 100), 0 0 6px rgba(47,187, 212, 100);
  }
  .copy:active {
    background-color: #1989fa;
  }
}
</style>
