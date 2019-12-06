import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'
import { storageSet, storageGet } from '@/utils/utils'
const form = {
  state: {
    parkList: [],
    activePark: {},
    buildList: [],
    roomList: [],
    contractList: [],
    parkTreeList: [],
    customerList: [],
    repairList: [],
    complaintList: [],
    paymentList: [],
    financialList: [],
    incomeList: []
  },
  getters: {
    parkListOptions: state => {
      return {
        pid: state.parkList.length ? state.parkList.map(x => {
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
            if (y.floor === x.floor) {
              flag = true
              y.children.push({
                ...x
              })
            }
            if (yi === arr.length - 1 && !flag) {
              arr.push({
                floor: x.floor,
                children: [{ ...x }]
              })
            }
          })
        } else {
          arr.push({
            floor: x.floor,
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
    parkTreeOptions: state => {
      const filterList = (list) => {
        return list.map(item => {
          if (!item) {
            return {
              label: '暂无',
              disabled: true
            }
          }
          let children = item.children && item.children.length ? filterList(item.children) : null
          let disabled = false
          if (item.path.split('.').length !== 4) {
            if (!item.children || !item.children.length) {
              disabled = true
            }
          }
          return {
            label: item.name,
            value: item.domain_id,
            path: item.path,
            children,
            disabled
          }
        })
      }
      if (state.parkTreeList) {
        return filterList(state.parkTreeList)
      } else {
        return []
      }
    },
    contractListOptions: (state, getters) => {
      return {
        room: getters.parkTreeOptions,
        domain_id: getters.parkTreeOptions,
        customer_id: state.customerList
      }
    },
    customerListOptions: (state, getters) => {
      return {
        room: getters.parkTreeOptions
      }
    },
    repairListOptions: (state, getters) => {
      return {
        domain_id: getters.parkTreeOptions,
        customer_id: state.customerList
      }
    },
    complaintListOptions: (state, getters) => {
      return {
        domain_id: getters.parkTreeOptions
      }
    },
    paymentListOptions: (state, getters) => {
      return {
        customer_id: state.customerList,
        domain_id: getters.parkTreeOptions,
        contract_code: state.contractList
      }
    },
    financialListOptions: (state, getters) => {
      return {
        contract_code: state.contractList
      }
    },
    incomeListOptions: (state, getters) => {
      return {
        contract_code: state.contractList
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
      storageSet('activePark', park)
    },
    commitParkTreeList (state, list) {
      state.parkTreeList = list
    },
    commitContractList (state, list) {
      state.contractList = list.map(x => {
        return {
          ...x,
          label: x.customer_name + '-' + x.contract_code,
          value: x.contract_code
        }
      })
    },
    commitCustomerList (state, list) {
      state.customerList = list.map(x => {
        return {
          ...x,
          label: x.name,
          value: x.customer_id
        }
      })
    }
  },
  actions: {
    getParkList ({ commit }, data) {
      return request.post(baseUrl + api.park.get_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitParkList', res.list)
          return res
        }
      })
    },
    getBuildList ({ commit }, data) {
      return request.post(baseUrl + api.building.get_list, {
        ...data
      }).then(res => {
        if (res.code === 1000) {
          commit('commitBuildList', res.list)
          return res
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
            return res.list
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
      }).then(res => {
        return res
      })
    },
    getParkTreeList ({ commit }, data) {
      return request.post(baseUrl + api.park.get_tree_list, {
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          commit('commitParkTreeList', res.list)
        }
      })
    },
    getContractList ({ commit, state }, data) {
      return request.post(baseUrl + api.contract.get_list, {
        park_id: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          commit('commitContractList', res.list)
        }
      })
    },
    getCustomerList ({ commit, state }, data) {
      return request.post(baseUrl + api.customer.get_list, {
        park_id: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          commit('commitCustomerList', res.list)
        }
      })
    }
  }
}

export default form
