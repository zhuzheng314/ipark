import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'

const header = {
  state: {
    parkList: [],
    activePark: {}
  },
  getters: {
  },
  mutations: {
    commitParkList (state, list) {
      state.parkList = list
    },
    commitActivePark (state, park) {
      state.activePark = park
    }
  },
  actions: {
    getParkList ({ commit }, data) {
      return request.post(baseUrl + api.park.get_tree_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitParkList', res.list)
        }
      })
    }
  }
}

export default header
