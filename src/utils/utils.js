export function storageSet (name, value) {
  sessionStorage.setItem(name, JSON.stringify(value))
}

export function storageGet (name) {
  if (!sessionStorage.getItem(name) || sessionStorage.getItem(name) === 'undefined') {
    return null
  } else {
    return JSON.parse(sessionStorage.getItem(name))
  }
}

/*
  调用：this.$utils.getRooms(list)
    list: Array,原数据
*/
export function getRooms (list) { // 房间名数组
  list.forEach(v => {
    v.rooms = []
    v.room.forEach(room => {
      if (room) {
        v.rooms.push(room.building_name + '/' + room.name)
      }
    })
  })
  return list
}

/*
  调用：this.$utils.tagState(list, stateList)
    list: Array,原数据
    stateList: Object,使用分类tag的key、颜色
    颜色: ['danger', 'warning', 'info', 'success']
    例如:
      stateList = {
        state: {
          '未结清': 'danger',
          '已结清': 'success'
        },
        type: {
          '水费': 'warning',
          '房租费': 'info'
        }
      }
*/
export function tagState (list, stateList) { // 标签颜色
  list.forEach(v => {
    for (let state in stateList) {
      for (let value in stateList[state]) {
        if (v && v[state] === value) {
          v[state] = {
            value: v[state],
            [stateList[state][value]]: true
          }
        }
      }
    }
  })
  return list
}
