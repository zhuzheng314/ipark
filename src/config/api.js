// 空间管理

const baseUrl = 'https://service.iot1234.com:2443/api/'

const api = {
  // 获取园区所有信息
  getParkInfo: `/assets.park.get`,
  // 园区模块
  park: {
    add: `/assets.park.add`, // 添加园区
    get_list: `/assets.park.get_list`, // 获取园区
    modify: `/assets.park.modify`, // 修改园区
    remove: `/assets.park.remove` //  删除园区
  },
  // 楼宇模块管理
  building: {
    add: `/assets.building.add`, // 添加楼宇
    modify: `/assets.building.modify`, // 修改楼宇
    remove: `/assets.building.remove`, // 删除楼宇
    get_list: `/assets.building.get_list`, // 获取楼宇列表
    get_info: `/assets.building.get_info` // 获取楼宇信息
  },
  // 楼层模块管理
  floor: {
    add: `/assets.floor.add`, // 添加楼层
    modify: `/assets.floor.modify`, // 修改楼层
    remove: `/assets.floor.remove`, // 删除楼层
    get_list: `/assets.floor.get_list`, // 获取楼宇楼层
    get_info: `/assets.floor.get_info` // 获取楼宇楼层
  },
  // 房间模块管理
  room: {
    add: `/assets.room.add`, // 添加房间
    modify: `/assets.room.modify`, // 修改房间
    remove: `/assets.room.remove`, // 删除房间
    get_list: `/assets.room.get_list`, // 获取楼宇房间
    get_info: `/assets.room.get_info` // 获取楼宇房间
  }

}

export {
  api,
  baseUrl
}
