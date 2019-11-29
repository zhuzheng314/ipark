// 空间管理

const url = 'https://service.iot1234.com'
const domin = url + ':2443/'
// const url = 'http://192.168.0.231'
// const domin = url + ':3000/'
const baseUrl = domin + 'api'
const uploadUrl = domin + 'upload'

const api = {
  // 获取域树
  tree: `account.domain.get_tree`,
  // 修改密码
  reste_password: `account.user.reset_pass`,

  // 上传文件
  upload: uploadUrl,
  // 获取文件
  fileUrl: url + '/images/',
  /* --------------- 资产管理模块 --------------- */
  // 园区模块
  park: {
    get_tree_list: `assets.park.get_tree_list`, // 获取园区树
    info: `/assets.park.get_info`, // 获取园区统计信息
    add: `/assets.park.add`, // 添加园区
    get_list: `/assets.park.get_list`, // 获取园区
    modify: `/assets.park.modify`, // 修改园区
    remove: `/assets.park.remove`, //  删除园区
    get_info2: `/assets.d_park.get_list`, // 获取园区信息
    get_info: `/assets.park.get_info` // 获取园区信息
  },
  // 楼宇模块管理
  building: {
    info: `/assets.d_building.get_info`, // 获取楼宇统计信息
    get_list2: `/assets.d_building.get_list`, // 获取楼宇统计信息
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
  },
  /* --------------- 招商管理模块 --------------- */
  // 客户管理模块
  customer: {
    info: `/assets.d_customer.get_info`, // 获取客户统计信息
    add: `/assets.customer.add`, // 添加客户
    modify: `/assets.customer.modify`, // 修改客户
    remove: `/assets.customer.remove`, // 删除客户
    get_list: `/assets.customer.get_list`, // 获取客户列表
    get_info: `/assets.customer.get_info` // 获取客户信息
  },
  /* --------------- 合同管理模块 --------------- */

  /* --------------- 企业进退驻管理模块 --------------- */

  /* --------------- 物业服务模块 --------------- */
  // 四表集抄模块
  equip: {
    info: `/assets.d_equip.get_info`, // 获取四表集抄统计信息
    get_list: `/assets.equip.get_list`, // 获取设备列表
    get_info: `/assets.equip.get_info` // 获取设备信息
  },
  // 报修管理模块
  repair: {
    info: `/assets.d_repair.get_info`, // 获取报修管理统计信息
    add: `/assets.repair.add`, // 添加报修工单
    modify: `/assets.repair.modify`, // 修改报修工单
    remove: `/assets.repair.remove`, // 删除报修工单
    get_list: `/assets.repair.get_list`, // 获取报修工单列表
    get_info: `/assets.repair.get_info` // 获取报修工单信息
  },
  // 投诉管理模块
  complaint: {
    info: `/assets.d_complaint.get_info`, // 获取投诉管理统计信息
    add: `/assets.complaint.add`, // 添加投诉工单
    modify: `/assets.complaint.modify`, // 修改投诉工单
    remove: `/assets.complaint.remove`, // 删除投诉工单
    get_list: `/assets.complaint.get_list`, // 获取投诉工单列表
    get_info: `/assets.complaint.get_info` // 获取投诉工单信息
  },
  // 费用催缴模块
  payment: {
    info: `/assets.d_payment.get_info`, // 获取费用催缴统计信息
    add: `/assets.payment.add`, // 添加催缴
    modify: `/assets.payment.modify`, // 修改催缴
    remove: `/assets.payment.remove`, // 删除催缴
    get_list: `/assets.payment.get_list`, // 获取催缴列表
    get_info: `/assets.payment.get_info` // 获取催缴信息
  },
  /* --------------- 财务管理模块 --------------- */
  // 费用列支模块
  cost: {
    info: `/assets.d_cost.get_info`, // 获取费用列支统计信息
    add: `/assets.cost.add`, // 添加费用列支
    modify: `/assets.cost.modify`, // 修改费用列支
    remove: `/assets.cost.remove`, // 删除费用列支
    get_list: `/assets.cost.get_list`, // 获取费用列支列表
    get_info: `/assets.cost.get_info` // 获取费用列支信息
  },
  // 财务收入模块
  charge: {
    info: `/assets.d_charge.get_info`, // 获取财务收入统计信息
    add: `/assets.charge.add`, // 添加财务收入
    modify: `/assets.charge.modify`, // 修改财务收入
    remove: `/assets.charge.remove`, // 删除财务收入
    get_list: `/assets.charge.get_list`, // 获取财务收入列表
    get_info: `/assets.charge.get_info` // 获取财务收入信息
  },
  /* --------------- 字典模块管理 --------------- */
  // 字典类型模块
  dictype: {
    get_tree_list: `/model.dictype.get_tree_list`, // 获取字典类型树
    add: `/model.dictype.add`, // 添加字典类型
    modify: `/model.dictype.modify`, // 修改字典类型
    remove: `/model.dictype.remove`, // 删除字典类型
    get_list: `/model.dictype.get_list`, // 获取字典类型列表
    get_info: `/model.dictype.get_info` // 获取字典类型信息
  },
  // 字典模块
  dicinfo: {
    add: `/model.dicinfo.add`, // 添加字典
    modify: `/model.dicinfo.modify`, // 修改字典
    remove: `/model.dicinfo.remove`, // 删除字典
    get_list: `/model.dicinfo.get_list`, // 获取字典列表
    get_info: `/model.dicinfo.get_info` // 获取字典信息
  }
}

export {
  domin,
  api,
  baseUrl
}
