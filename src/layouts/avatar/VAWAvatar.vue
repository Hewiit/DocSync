<template>
  <div class="vaw-avatar-container">
    <el-dropdown trigger="hover" @command="onCommad">
      <div class="action-wrapper">
        <span class="nick-name el-dropdown-link">
          <span>{{ username }}</span>
          <i class="el-icon-arrow-down tip"></i>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command="personalCenter">
          Personal Center
        </el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="logout">
          Logout
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from '../store/index'
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'VAWAvatar',
  data() {
    return {
      avatar: getters.getAvatar(state),
      state: store.state
    }
  },
  computed: {
    ...mapGetters({
      username: 'user/getUserName'
    })
  },
  methods: {
    onCommad(command) {
      switch (command) {
        case 'personalCenter':
          this.onPersonalCenter()
          break
        case 'logout':
          this.onLogout()
          break
      }
    },
    onPersonalCenter() {
      store.toPersonalCenter && store.toPersonalCenter()
    },
    onLogout() {
      MessageBox.confirm('Whether you want to log out？', 'tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      })
        .then(_ => {
          store.logout()
          store.onLogout && store.onLogout()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
.vaw-avatar-container {
  .action-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      width: calc(#{$logoHeight} - 15px);
      height: calc(#{$logoHeight} - 15px);
      display: flex;
      align-items: center;
      & > img {
        border: 1px solid #f6f6f6;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
}
.vaw-avatar-container:hover {
  cursor: pointer;
}
.el-dropdown-menu {
  top: 40px !important;
}
</style>
