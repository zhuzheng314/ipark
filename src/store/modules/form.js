import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'

const form = {
  state: {
    parkList: [],
    activePark: {},
    buildList: [],
    roomList: []
  },
  getters: {
    parkListOptions: state => {
      return {
        pid: state.parkList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        })
      }
    }
  },
  mutations: {
    commitParkList (state, list) {
      state.parkList = list
    },
    commitBuildList (state, list) {
      state.buildList = list
    },
    commitRoomList (state, list) {
      state.roomList = list
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
    },
    getBuildList ({ commit }, data) {
      return request.post(baseUrl + api.building.get_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitBuildList', res.list)
        }
      })
    },
    getRoomList ({ commit }, data) {
      return request.post(baseUrl + api.room.get_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitRoomList', res.list)
        }
      })
    },
    addPark ({ commit }, data) {
      return request.post(baseUrl + api.park.add, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
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

export default form
