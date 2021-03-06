import Vue from 'vue'
import Vuex from 'vuex'

import loginOut from './modules/loginOut' //   退出登录
import form from './modules/form' //  表单
import dictionary from './modules/dictionary' //  字典

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    setLoading (state, data) {
      state.loading = data
    }
  },
  actions: {
  },
  modules: {
    loginOut,
    form,
    dictionary
  }
})
