
// 字典
const arr = [
  // 应该是从这里开始的
  // ----------------------------------------------------财务收入

  {
    type_code: 'charge_state',
    type_name: '缴费状态',
    data: [
      { dic_code: 'charge_state_0', dic_info: '已缴费', order_num: 0 },
      { dic_code: 'charge_state_1', dic_info: '未缴费', order_num: 1 }
    ]
  },
  {
    type_code: 'charge_type',
    type_name: '费用类型',
    data: [
      { dic_code: 'charge_type_0', dic_info: '物业费', order_num: 0 },
      { dic_code: 'charge_type_1', dic_info: '水费', order_num: 1 },
      { dic_code: 'charge_type_2', dic_info: '电费', order_num: 2 },
      { dic_code: 'charge_type_3', dic_info: '燃气费', order_num: 3 }
    ]
  },
  // ----------------------------------------------------费用列支
  {
    type_code: 'cost_log_type',
    type_name: '列支方向',
    data: [
      { dic_code: 'log_type_0', dic_info: '收款', order_num: 0 },
      { dic_code: 'log_type_1', dic_info: '付款', order_num: 1 }
    ]
  },
  {
    type_code: 'cost_state',
    type_name: '费用状态', // 列支状态
    data: [
      { dic_code: 'cost_state_0', dic_info: '已缴', order_num: 0 },
      { dic_code: 'cost_state_1', dic_info: '未缴', order_num: 1 }
    ]
  },
  // ----------------------------------------------------费用催缴
  {
    type_code: 'payment_type',
    type_name: '费用类型',
    data: [
      { dic_code: 'payment_type_0', dic_info: '租金', order_num: 0 },
      { dic_code: 'payment_type_1', dic_info: '物业费用', order_num: 1 }
    ]
  },
  // ----------------------------------------------------投诉管理  //报修管理
  {
    type_code: 'work_state',
    type_name: '工单状态',
    data: [
      { dic_code: 'work_state_0', dic_info: '已解决', order_num: 0 },
      { dic_code: 'work_state_1', dic_info: '未解决', order_num: 1 }
    ]
  },
  // ----------------------------------------------------四表集抄
  {
    type_code: 'equip_type',
    type_name: '设备类型',
    data: [
      { dic_code: 'equip_type_0', dic_info: '水表', order_num: 0 },
      { dic_code: 'equip_type_1', dic_info: '电表', order_num: 1 },
      { dic_code: 'equip_type_1', dic_info: '煤气', order_num: 2 },
      { dic_code: 'equip_type_1', dic_info: '暖通空调', order_num: 3 }
    ]
  },
  // ----------------------------------------------------退驻管理 //退驻管理
  {
    type_code: 'approval_type',
    type_name: '进驻状态',
    data: [
      { dic_code: 'approval_type_0', dic_info: '未进驻', order_num: 0 },
      { dic_code: 'approval_type_1', dic_info: '已进驻', order_num: 1 },
      { dic_code: 'approval_type_2', dic_info: '已退驻', order_num: 2 }
    ]
  },
  // ----------------------------------------------------模板管理
  {
    type_code: 'template_type',
    type_name: '合同模板类型',
    data: [
      { dic_code: 'template_type_0', dic_info: '其他', order_num: 0 },
      { dic_code: 'template_type_1', dic_info: '房屋租赁', order_num: 1 },
      { dic_code: 'template_type_2', dic_info: '物业保洁', order_num: 2 },
      { dic_code: 'template_type_3', dic_info: '花木租赁', order_num: 3 },
      { dic_code: 'template_type_4', dic_info: '场地租赁', order_num: 4 },
      { dic_code: 'template_type_5', dic_info: '场地租赁', order_num: 5 }
    ]
  },
  // ----------------------------------------------------合同管理
  {
    type_code: 'contract_state',
    type_name: '合同状态',
    data: [
      { dic_code: 'contract_state_0', dic_info: '签订', order_num: 0 },
      { dic_code: 'contract_state_1', dic_info: '执行', order_num: 1 },
      { dic_code: 'contract_state_2', dic_info: '到期', order_num: 2 },
      { dic_code: 'contract_state_3', dic_info: '到期未处理', order_num: 3 }
    ]
  },
  {
    type_code: 'contract_type',
    type_name: '合同类型',
    data: [
      {
        dic_code: 'contract_type_0',
        dic_info: '租房合同模板',
        order_num: 0
      },
      {
        dic_code: 'contract_type_1',
        dic_info: '车位合同模板',
        order_num: 1
      }
    ]
  },
  {
    type_code: 'company_scope',
    type_name: '经营范围',
    data: [
      { dic_code: 'company_scope_0', dic_info: '互联网', order_num: 0 },
      { dic_code: 'company_scope_1', dic_info: '金融', order_num: 1 }
    ]
  },
  /// /不确定下拉框内容
  {
    type_code: 'contract_divide',
    type_name: '租期划分',
    data: [
      {
        dic_code: 'contract_divide_0',
        dic_info: '按起始日划分',
        order_num: 0
      },
      { dic_code: 'contract_divide_1', dic_info: '商业', order_num: 1 }
    ]
  },
  // ----------------------------------------------------客户管理  ----------------------表名未确认
  {
    type_code: 'customer_state',
    type_name: '进度阶段',
    data: [
      { dic_code: 'customer_state_0', dic_info: '初次来访', order_num: 0 },
      { dic_code: 'customer_state_1', dic_info: '意向客户', order_num: 1 },
      { dic_code: 'customer_state_2', dic_info: '成交客户', order_num: 2 },
      { dic_code: 'customer_state_3', dic_info: '休眠客户', order_num: 3 }
    ]
  },
  {
    type_code: 'customer_info_source',
    type_name: '来源渠道',
    data: [
      {
        dic_code: 'customer_info_source_0',
        dic_info: '广告媒体',
        order_num: 0
      },
      {
        dic_code: 'customer_info_source_1',
        dic_info: '中介',
        order_num: 1
      },
      {
        dic_code: 'customer_info_source_2',
        dic_info: '客户自访',
        order_num: 2
      },
      { dic_code: 'customer_info_source_3', dic_info: '其他', order_num: 3 }
    ]
  },
  {
    type_code: 'customer_status',
    type_name: '行业',
    data: [
      { dic_code: 'customer_status_0', dic_info: '互联网', order_num: 0 },
      { dic_code: 'customer_status_1', dic_info: '电商', order_num: 1 }
    ]
  },
  {
    type_code: 'customer_access',
    type_name: '客户来源',
    data: [
      { dic_code: 'customer_access_0', dic_info: '上门', order_num: 0 },
      { dic_code: 'customer_access_1', dic_info: '官网', order_num: 1 }
    ]
  },
  {
    type_code: 'demand_area',
    type_name: '需求面积',
    data: [
      { dic_code: 'demand_area_0', dic_info: '100㎡以内', order_num: 0 },
      { dic_code: 'demand_area_1', dic_info: '100-200㎡', order_num: 1 },
      { dic_code: 'demand_area_2', dic_info: '200-300㎡', order_num: 2 },
      { dic_code: 'demand_area_3', dic_info: '300㎡以上', order_num: 3 }
    ]
  },
  {
    type_code: 'work_station',
    type_name: '需求工位',
    data: [
      { dic_code: 'work_station_0', dic_info: '1-20个', order_num: 0 },
      { dic_code: 'work_station_1', dic_info: '21-50个', order_num: 1 },
      { dic_code: 'work_station_2', dic_info: '51-100个', order_num: 2 },
      { dic_code: 'work_station_3', dic_info: '100个以上', order_num: 3 }
    ]
  },
  // ----------------------------------------------------园区  ----------------------表名未确认
  {
    type_code: 'park_usage',
    type_name: '园区定位',
    data: [
      { dic_code: 'park_usage_0', dic_info: '互联网', order_num: 0 },
      { dic_code: 'park_usage_1', dic_info: '招商', order_num: 1 },
      { dic_code: 'park_usage_2', dic_info: '运营', order_num: 2 },
      { dic_code: 'park_usage_3', dic_info: '其他', order_num: 3 }
    ]
  },
  {
    type_code: 'park_state',
    type_name: '园区状态',
    data: [
      { dic_code: 'park_state_0', dic_info: '在建', order_num: 0 },
      { dic_code: 'park_state_1', dic_info: '招商', order_num: 1 },
      { dic_code: 'park_state_2', dic_info: '运营', order_num: 2 },
      { dic_code: 'park_state_3', dic_info: '其他', order_num: 3 }
    ]
  },
  // ----------------------------------------------------楼宇  ----------------------表名未确认
  {
    type_code: 'contract_term', // 暂时不能筛选
    type_name: '合同期限',
    data: [
      { dic_code: 'contract_term_0', dic_info: '半年以下', order_num: 0 },
      { dic_code: 'contract_term_1', dic_info: '一年以内', order_num: 1 },
      { dic_code: 'contract_term_2', dic_info: '三年以内', order_num: 2 },
      { dic_code: 'contract_term_3', dic_info: '三年以上', order_num: 3 }
    ]
  },
  {
    type_code: 'investment_category', // 暂时不能筛选
    type_name: '房间招商类别',
    data: [
      { dic_code: 'investment_category_0', dic_info: '中介', order_num: 0 },
      { dic_code: 'investment_category_1', dic_info: '广告', order_num: 1 },
      { dic_code: 'investment_category_2', dic_info: '其他', order_num: 2 }
    ]
  },
  {
    type_code: 'room_state', // 暂时不能筛选
    type_name: '房间空置状态',
    data: [
      { dic_code: 'room_state_0', dic_info: '占用', order_num: 0 },
      { dic_code: 'room_state_1', dic_info: '预定', order_num: 1 },
      { dic_code: 'room_state_2', dic_info: '待租', order_num: 2 }
    ]
  },
  {
    type_code: 'room_property',
    type_name: '房间性质',
    data: [
      { dic_code: 'room_property_0', dic_info: '在租', order_num: 0 },
      { dic_code: 'room_property_1', dic_info: '待招商', order_num: 1 },
      { dic_code: 'room_property_2', dic_info: '自用', order_num: 2 },
      { dic_code: 'room_property_2', dic_info: '未分配', order_num: 2 },
      { dic_code: 'room_property_2', dic_info: '锁定', order_num: 2 }
    ]
  },
  // 通用模块
  {
    type_code: 'unit_value',
    type_name: '单位',
    data: [
      { dic_code: 'unit_value_0', dic_info: '元/㎡·天', order_num: 0 },
      { dic_code: 'unit_value_1', dic_info: '待招商', order_num: 1 },
      { dic_code: 'unit_value_2', dic_info: '自用', order_num: 2 },
      { dic_code: 'unit_value_2', dic_info: '未分配', order_num: 2 },
      { dic_code: 'unit_value_2', dic_info: '锁定', order_num: 2 }
    ]
  }
]

export { arr }
