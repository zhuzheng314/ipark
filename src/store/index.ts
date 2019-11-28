import Vue from 'vue'
import Vuex from 'vuex'

import header from './modules/header' //   头部
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
    form
  }
})
