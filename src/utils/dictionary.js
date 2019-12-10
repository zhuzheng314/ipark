import store from '../store/index'

export function tableData (list, params) {
  list.forEach(v => {
    params.forEach(p => {
      v[p] = store.getters.getDicById(v[p])
    })
  })
  return list
}
