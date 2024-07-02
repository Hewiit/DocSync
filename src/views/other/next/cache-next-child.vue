<template>
  <el-card>
    <template #header>
      <div>CacheInfo</div>
    </template>
    <el-input
      v-model="content"
      placeholder="Please input"
    />
  </el-card>
</template>

<script>
export default {
  name: 'CacheNextChild',
  data() {
    return {
      content: ''
    }
  },
  activated() {
    console.log(this.$layoutStore)
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  }
}
</script>

<style>
</style>
