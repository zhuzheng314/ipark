import request from '@/plugins/axios'
import { baseUrl, api } from '@/config/api'
import { storageSet } from '@/utils/utils'
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
      return (state.dictionary && state.dictionary[id]) || id
    },
    // 通过字典类型获取字典内容
    // 调用：this.$store.getters.getDicInfoByCode(type_code)
    getDicInfoByCode: (state) => (code) => {
      return state.dictionaryType[code]
    }
  },
  mutations: {
    // 根据字典树取出字典、类型
    commitDictionaryTree (state, list) {
      state.dictionaryTypeList = list
      let dictionaryType = {}
      let dictionarys = {}
      if (list.length) {
        list.forEach(type => {
          dictionaryType[type.type_code] = []
          if (type.dicinfo.length) {
            type.dicinfo.forEach(dictionary => {
              state.dictionaryList.push({ ...dictionary })
              dictionarys[dictionary.id] = dictionary.dic_info
              dictionaryType[type.type_code][dictionary.order_num] = ({
                value: dictionary.id,
                label: dictionary.dic_info
              })
            })
          }
        })
      }
      state.dictionary = dictionarys
      state.dictionaryType = dictionaryType
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
          storageSet('dictionary', res.list)
          commit('commitDictionaryTree', res.list)
          return res
        }
      })
    }
  }
}

export default dictionary
