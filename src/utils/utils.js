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
      v.rooms.push(room.building_name + '/' + room.name)
    })
  })
  return list
}
