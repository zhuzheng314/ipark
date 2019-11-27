import Vue from 'vue'
import Vuex from 'vuex'

// import header from './modules/header' //   头部

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token.token)
    },
    delToken (state) {
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
    // header,
  }
})
