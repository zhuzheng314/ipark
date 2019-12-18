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

export function tagState (list, stateList) { // 标签颜色
  list.forEach(v => {
    for (let state in stateList) {
      for (let value in stateList[state]) {
        if (v[state] === value) {
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
