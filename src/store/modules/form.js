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
  },
  actions: {
    addPark ({ commit }, data) {
      return request.post(baseUrl + api.park.get_tree_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitParkList', res.list)
        }
      })
    },
    addBuild ({ commit }, data) {
      return request.post(baseUrl + api.building.add, {
        ...data
      })
    },
    addRoom ({ commit }, data) {
      return request.post(baseUrl + api.room.add, {
        ...data
      })
    }
  }
}

export default header
