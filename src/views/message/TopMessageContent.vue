<template>
  <div style="width: 280px">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`Notification ${notifyNum}`"
        name="notify"
      >
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <NotifyItem class="item" />
        <div class="padding-top bottom-wrapper flex justify-center border-top">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="clear('notify')"
          >Clear Notifications</el-link>
          <div class="text-gray">|</div>
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="more('notify')"
          >See More</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="`Messages ${messageNum}`"
        name="message"
      >
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <MessageItem class="item" />
        <div class="padding-top bottom-wrapper flex justify-center border-top">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="clear('message')"
          >Clear Messages</el-link>
          <div class="text-gray">|</div>
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="more('message')"
          >See More</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="`To-do ${todoNum}`"
        name="todo"
      >
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <TodoItem class="item" />
        <div class="padding-top bottom-wrapper flex justify-center border-top">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="clear('todo')"
          >Clear To-dos</el-link>
          <div class="text-gray">|</div>
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="more('todo')"
          >See More</el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NotifyItem from './components/NotifyItem'
import MessageItem from './components/MessageItem'
import TodoItem from './components/TodoItem'
export default {
  name: 'MessageContent',
  components: {
    NotifyItem,
    MessageItem,
    TodoItem
  },
  data() {
    return {
      activeName: '',
      notifyNum: '(1)',
      messageNum: '(1)',
      todoNum: '(1)'
    }
  },
  methods: {
    update() {
      this.activeName = this.activeName === '0' ? 'notify' : this.activeName
    },
    clear(type) {
      if (!this[type + 'Num']) {
        return
      }
      this[type + 'Num'] = ''
      this.$emit('clear-num', 1)
    },
    more() {
      this.$successMsg('click more')
    }
  }
}
</script>

<style lang="scss" scoped>
.item + .item {
  border-top: 1px solid #f5f5f5;
}
.item:hover {
  background-color: #f5f5f5 !important;
}
.bottom-wrapper {
  border-top: 1px solid #f5f5f5;
}
</style>
