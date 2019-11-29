import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'

const form = {
  state: {
    parkList: [],
    activePark: {},
    buildList: [],
    roomList: [],
    contractList: []
  },
  getters: {
    parkListOptions: state => {
      return {
        pid: state.buildList.length ? state.parkList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        }) : []
      }
    },
    buildListOptions: state => {
      return {
        pid: state.buildList.length ? state.buildList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        }) : []
      }
    },
    roomFloor: state => {
      let arr = []
      state.roomList.forEach(x => {
        if (arr.length) {
          let flag = false
          arr.forEach((y, yi) => {
            if (y.floor_height === x.floor_height) {
              flag = true
              y.children.push({
                ...x
              })
            }
            if (yi === arr.length - 1 && !flag) {
              arr.push({
                floor_height: x.floor_height,
                children: [{ ...x }]
              })
            }
          })
        } else {
          arr.push({
            floor_height: x.floor_height,
            children: [{
              ...x
            }]
          })
        }
      })
      arr.forEach(x => {
        x.allArea = 0
        x.children.forEach(y => {
          x.allArea += y.area
        })
      })
      return arr
    },
    contractListOptions: state => {
      return {
        pid: state.contractList.length ? state.contractList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        }) : []
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
      })
        .then(res => {
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
