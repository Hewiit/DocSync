import Vue from 'vue'

import service from './axios.config'

Vue.prototype.$http = function ({ url, data, method = 'GET', headers, beforeRequest, afterRequest }) {
  const successHandler = res => {
    if (res.code === 200) {
      return res
    }
    throw new Error(res.msg || 'The request failed and an unknown exception occurred')
  }
  const failHandler = error => {
    afterRequest && afterRequest()
    throw new Error(error.msg || 'The request failed and an unknown exception occurred')
  }
  beforeRequest && beforeRequest()

  return method === 'GET' ? service.get(url, { params: data }).then(successHandler, failHandler) : service.post(url, data, { headers }).then(successHandler, failHandler)
}
Vue.prototype.$get = function ({ url, data, beforeRequest = null, afterRequest = null }) {
  return this.$http({ url, method: 'GET', data, beforeRequest, afterRequest })
}

Vue.prototype.$post = function ({ url, data, headers, beforeRequest = null, afterRequest = null }) {
  return this.$http({ url, method: 'POST', data, headers, beforeRequest, afterRequest })
}
