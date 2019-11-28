import Vue from 'vue'
import Vuex from 'vuex'

import header from './modules/header' //   头部
import loginOut from './modules/loginOut' //   退出登录
import form from './modules/form' //  表格

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    header,
    loginOut,
    form
  }
})
