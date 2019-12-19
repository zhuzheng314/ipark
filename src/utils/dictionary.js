import store from '../store/index'

/*
  调用：this.$dictionary.tableData(list, params)
    list: Array,原数据
    params: Array,使用字典的key值
*/
export function tableData (list, params) {
  list.forEach(v => {
    params.forEach(p => {
      v[p] = store.getters.getDicById(v[p])
    })
  })
  return list
}
