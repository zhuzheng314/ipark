import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'
const dictionary = {
  state: {
    dictionaryTree: []
  },
  getters: {
  },
  mutations: {
    commitDictionaryTree (state, list) {
      state.dictionaryTree = list
    }
  },
  actions: {
    getDictionaryTree ({ commit }, data) {
      return request.post(baseUrl + api.dictype.get_tree_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitDictionaryTree', res.list)
          return res
        }
      })
    }
  }
}

export default dictionary
