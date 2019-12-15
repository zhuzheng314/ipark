import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'
const dictionary = {
  state: {
    dictionaryTypeList: [],
    dictionaryList: [],
    dictionaryType: {},
    dictionary: {}
  },
  getters: {
    // 通过字典id获取字典名
    // 调用：this.$store.getters.getDicById(id);
    getDicById: (state) => (id) => {
      // const findName = function (id) {
      //   let name
      //   state.dictionaryList.forEach(v => {
      //     if (v.id === id) {
      //       name = v.dic_info
      //     }
      //   })
      //   return name
      // }
      // let dicName = findName(id)
      // return dicName
      return state.dictionary[id]
    },
    // 通过字典类型获取字典内容
    // 调用：this.$store.getters.getDicInfoByCode(type_code)
    getDicInfoByCode: (state) => (code) => {
      const dictionary = function (code) {
        let name
        let options = []
        state.dictionaryTypeList.forEach(type => {
          // if (type.type_code === code) {
          //   name = type.type_name
          //   if (type.dicinfo.length) {
          //     type.dicinfo.forEach(info => {
          //       options.push({
          //         value: info.id,
          //         label: info.dic_info
          //       })
          //     })
          //   }
          // }
          // state.dictionaryType[type.type_code] = {
          //   options: []
          // }
          // type.dicinfo.forEach(info => {
          //   state.dictionaryType[type.type_code].options.push({
          //     value: info.id,
          //     label: info.dic_info
          //   })
          // })
        })
        let dictionary = {
          name,
          options
        }
        return dictionary.options
      }
      let data = dictionary(code)
      return data
    }
  },
  mutations: {
    // 根据字典树取出字典、类型
    commitDictionaryTree (state, list) {
      state.dictionaryTypeList = list
      if (list.length) {
        list.forEach(type => {
          state.dictionaryType[type.type_code] = []
          if (type.dicinfo.length) {
            type.dicinfo.forEach(dictionary => {
              state.dictionaryList.push({ ...dictionary })
              state.dictionary[dictionary.id] = dictionary.dic_info
              state.dictionaryType[type.type_code][dictionary.order_num] = ({
                value: dictionary.id,
                label: dictionary.dic_info
              })
            })
          }
        })
      }
    }
  },
  actions: {
    // 获取字典树
    getDictionaryTree ({ commit }, data) {
      return request.post(baseUrl + api.dictype.get_tree_list, {
        page_no: 1,
        page_size: 999
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
