import { resetRouter } from '@/router/index'
import Cookies from 'js-cookie'

const userInfoString = localStorage.getItem('userInfo')
const userInfo = JSON.parse(userInfoString || '{}')
export const state = {
  userId: userInfo.userId || '',
  userName: userInfo.userName || '',
  avatar: userInfo.avatar || '',
  token: userInfo.token || '',
  unlook_message_count: userInfo.unlook_message_count || ''
}

export const getters = {
  getAvatar(state) {
    return state.avatar
  },
  getUserName(state) {
    return state.userName
  },
  getToken(state) {
    return state.token
  },
  getUserId(state) {
    return state.userId
  },
  getUnlook_message_count(state) {
    return state.unlook_message_count
  },
  clear(state) {
    state.userId = null
    state.userName = null
    state.avatar = null
    state.token = null
    state.unlook_message_count = null
  }
}

const actions = {
  saveUserInfo({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      try {
        commit('SAVE_USER_INFO', userInfo)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      try {
        dispatch('router/delAllRoute', null, { root: true })
        commit('LOGOUT')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const mutations = {
  SAVE_USER_INFO(state, userInfo) {
    state.userId = userInfo.userId
    state.userName = userInfo.userName
    state.avatar = userInfo.avatar
    state.token = userInfo.token
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    Cookies.set('admin-token', userInfo.token, {
      expires: 1
    })
  },
  LOGOUT(state) {
    state.userId = ''
    state.userName = ''
    state.avatar = ''
    state.token = ''
    resetRouter()
    localStorage.removeItem('userInfo')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
