<template>
  <div class="flex item-container margin">
    <el-avatar
      :size="40"
      :src="item.avatar"
    />
    <div class="flex flex-direction justify-between margin-left">
      <div class="text-sm">
        <slot
          name="title"
          :title="item.title"
        ></slot>
      </div>
      <div class="text-gray text-xs">An hour ago</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendsItem',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
