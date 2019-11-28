// 空间管理

// const baseUrl = 'https://service.iot1234.com:2443/api/'
const domin = 'http://192.168.0.231:3000/'
const baseUrl = domin + 'api/'
const uploadUrl = domin + 'upload'

const api = {
  // 获取域树
  tree: `account.domain.get_tree`,
  // 修改密码
  reste_password: `account.user.reset_pass`,

  // 上传文件
  upload: uploadUrl,
  // 园区模块
  park: {
    get_tree_list: `assets.park.get_tree_list`, // 获取园区树
    add: `/assets.park.add`, // 添加园区
    get_list: `/assets.park.get_list`, // 获取园区
    modify: `/assets.park.modify`, // 修改园区
    remove: `/assets.park.remove`, //  删除园区
    get_info: `/assets.park.get_info` // 获取园区信息
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
    get_list: `/assets.floor.get_list`, // 获取楼层列表
    get_info: `/assets.floor.get_info` // 获取楼层信息
  },
  // 房间模块管理
  room: {
    add: `/assets.room.add`, // 添加房间
    modify: `/assets.room.modify`, // 修改房间
    remove: `/assets.room.remove`, // 删除房间
    get_list: `/assets.room.get_list`, // 获取房间列表
    get_info: `/assets.room.get_info` // 获取房间信息
  },
  // 企业模块管理
  company: {
    add: `/assets.company.add`, // 添加企业
    modify: `/assets.company.modify`, // 修改企业
    remove: `/assets.company.remove`, // 删除企业
    get_list: `/assets.company.get_list`, // 获取企业列表
    get_info: `/assets.company.get_info` // 获取企业信息
  }

}

export {
  domin,
  api,
  baseUrl
}
