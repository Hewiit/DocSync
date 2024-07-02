import { state } from '@/store/modules/user.js'
export default {
  logout() {
    this.state.permissionRoutes = []
    this.state.visitedView = []
    this.state.cachedView = []
    state.userId = ''
    state.userName = ''
    state.avatar = ''
    state.token = ''
    localStorage.removeItem('userInfo')
    localStorage.removeItem('visited')
  }
}
