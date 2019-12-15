import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'
import { storageSet, storageGet } from '@/utils/utils'
import dictionary from './dictionary' //  字典
const form = {
  state: {
    parkList: [],
    activePark: {},
    buildList: [],
    roomList: [],
    contractList: [],
    contractTamplateList: [],
    parkTreeList: [],
    customerList: [],
    repairList: [],
    complaintList: [],
    paymentList: [],
    financialList: [],
    incomeList: []
  },
  getters: {
    // 园区
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
    // 新增园区
    addParkOptions: (state, getters, rootState) => {
      return {
        usage: dictionary.state.dictionaryType['park_usage'],
        state: dictionary.state.dictionaryType['park_state']
      }
    },
    // 修改园区
    modifyParkOptions: state => {
      return {
        usage: dictionary.state.dictionaryType['park_usage'],
        pid: state.parkList.length ? state.parkList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        }) : [],
        state: dictionary.state.dictionaryType['park_state']
      }
    },
    // 楼宇
    buildListOptions: state => {
      return {
        pid: state.buildList.length ? state.buildList.map(x => {
          return {
            label: x.name,
            value: x.domain_id
          }
        }) : [],
        state: dictionary.state.dictionaryType['room_state']
      }
    },
    // 房间
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
    // 园区树
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
    // 合同
    contractListOptions: (state, getters) => {
      return {
        room: getters.parkTreeOptions,
        domain_id: getters.parkTreeOptions,
        customer_id: state.customerList,
        contract_type: state.contractTamplateList,
        // contract_type: dictionary.state.dictionaryType['template_type'],
        scope: dictionary.state.dictionaryType['company_scope'],
        operate_state: dictionary.state.dictionaryType['company_operate_state'],
        company_type: dictionary.state.dictionaryType['company_company_type'],
        staff_size: dictionary.state.dictionaryType['company_staff_size'],
        trade: dictionary.state.dictionaryType['customer_status'],
        tenancy_divide: dictionary.state.dictionaryType['contract_divide'],
        charge_type: dictionary.state.dictionaryType['contract_charge_type'],
        state: dictionary.state.dictionaryType['contract_state']
      }
    },
    // 合同模板类型
    tamplateListOptions: (state, getters) => {
      return {
        template_type: dictionary.state.dictionaryType['template_type']
      }
    },
    // 进驻
    applyListOptions: (state, getters) => {
      return {
        contract_code: state.contractList,
        state: dictionary.state.dictionaryType['approval_type']
      }
    },
    // 客户
    customerListOptions: (state, getters) => {
      return {
        room: getters.parkTreeOptions,
        state: dictionary.state.dictionaryType['customer_state'],
        status: dictionary.state.dictionaryType['customer_status'],
        info_source: dictionary.state.dictionaryType['customer_info_source'],
        demand_area: dictionary.state.dictionaryType['demand_area'],
        work_station: dictionary.state.dictionaryType['work_station']
      }
    },
    // 报修
    repairListOptions: (state, getters) => {
      return {
        domain_id: getters.parkTreeOptions,
        customer_id: state.customerList,
        repair_state: dictionary.state.dictionaryType['work_state']
      }
    },
    // 投诉
    complaintListOptions: (state, getters) => {
      return {
        domain_id: getters.parkTreeOptions,
        customer_id: state.customerList,
        complaint_state: dictionary.state.dictionaryType['work_state']
      }
    },
    // 催缴
    paymentListOptions: (state, getters) => {
      return {
        customer_id: state.customerList,
        domain_id: getters.parkTreeOptions,
        contract_code: state.contractList,
        type: dictionary.state.dictionaryType['payment_type']
      }
    },
    // 列支
    financialListOptions: (state, getters) => {
      return {
        contract_code: state.contractList,
        customer_id: state.customerList,
        log_type: dictionary.state.dictionaryType['cost_log_type'],
        state: dictionary.state.dictionaryType['cost_state'],
        cost_type: dictionary.state.dictionaryType['charge_type']
      }
    },
    // 收入
    incomeListOptions: (state, getters) => {
      return {
        contract_code: state.contractList,
        state: dictionary.state.dictionaryType['cost_state'],
        charge_type: dictionary.state.dictionaryType['charge_type']
      }
    },
    // 费用
    expenseListOptions: (state, getters) => {
      return {
        contract_code: state.contractList,
        state: dictionary.state.dictionaryType['expense_state']
      }
    }
  },
  mutations: {
    commitParkList (state, list) {
      state.parkList = list
    },
    commitBuildList (state, list) {
      let arr = list.map(item => {
        return {
          ...item,
          rent_rate: Number(item.rent_rate * 100).toFixed(2)
        }
      })
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
    commitContractTamplateList (state, list) {
      state.contractTamplateList = list.map(x => {
        return {
          ...x,
          label: x.template_name,
          value: x.id
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
          const activePark = storageGet('activePark')
          if (activePark) {
            commit('commitActivePark', activePark)
          } else {
            commit('commitActivePark', res.list[0])
          }
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
    getContractTamplateList ({ commit, state }, data) {
      return request.post(baseUrl + api.template.get_list, {
        park_id: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          commit('commitContractTamplateList', res.list)
        }
      })
    },
    getCustomerList ({ commit, state }, data) {
      return request.post(baseUrl + api.customer.get_list, {
        // park_id: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          commit('commitCustomerList', res.list)
        }
      })
    },
    validateContractName ({ state }, data) {
      return request.post(baseUrl + api.contract.get_list, {
        ...data,
        park_id: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          return res
        }
      })
    },
    validateParkName ({ commit, state }, data) {
      return request.post(baseUrl + api.park.get_list, {
        ...data,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          return res
        }
      })
    },
    validateBuildName ({ commit, state }, data) {
      return request.post(baseUrl + api.building.get_list, {
        ...data,
        pid: state.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }).then(res => {
        if (res.code === 1000) {
          return res
        }
      })
    },
    validateRoomName ({ commit, state }, data) {
      return request.post(baseUrl + api.room.get_list, {
        pid: state.activePark.domain_id,
        page_no: 1,
        page_size: 999,
        ...data
      }).then(res => {
        if (res.code === 1000) {
          return res
        }
      })
    }
  }
}

export default form
