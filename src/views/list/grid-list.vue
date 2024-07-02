<template>
  <div className="main-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="Product Management"
        name="first"
        lazy
        className="wrapper"
      >
        <GoodsList/>
      </el-tab-pane>
      <el-tab-pane
        label="Comment Management"
        name="second"
        lazy
      >
        <CommentList/>
      </el-tab-pane>
    </el-tabs>
    <el-backtop
      target=".main-container"
      :visibility-height="100"
    />
  </div>
</template>

<script>
import GoodsList from './components/GoodsList'
import CommentList from './components/CommentList'

export default {
  name: 'GridList',
  components: {GoodsList, CommentList},
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__header {
  margin-bottom: 5px;
  padding: 0 10px;
}

.wrapper {
  position: relative;
}
</style>
