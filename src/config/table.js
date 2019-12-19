// 客户管理
const businessCustomer = [
  {
    prop: 'name',
    label: '客户名称'
  },
  {
    prop: 'state',
    label: '进度阶段'
  },
  {
    prop: 'info_source',
    label: '来源渠道'
  },
  {
    prop: 'demand_area',
    label: '需求面积段'
  },
  {
    prop: 'status',
    label: '行业'
  },
  {
    prop: 'update_ts',
    label: '最近联络时间'
  },
  {
    prop: 'contacter',
    label: '联络人'
  },
  {
    prop: 'contact',
    label: '联系方式'
  },
  {
    prop: 'demand_ts',
    label: '预计签约时间'
  },
  {
    prop: 'receiver',
    label: '跟进人'
  }
]
// 合同管理
const contractList = [
  {
    prop: 'contract_code',
    label: '合同编号'
  },
  {
    prop: 'rooms',
    label: '楼宇/房间号',
    tags: true
  },
  {
    prop: 'customer_name',
    label: '客户名称'
  },
  {
    prop: 'sign_ts',
    label: '签订日'
  },
  {
    prop: 'end_ts',
    label: '截止时间'
  },
  {
    prop: 'state',
    label: '合同状态',
    renderTags: true
  },
  {
    prop: 'receiver',
    label: '跟进人'
  },
  {
    prop: 'unit_price',
    label: '合同金额'
  }
]
// 合同模板
const contractTamplate = [
  {
    prop: 'id',
    label: '模板编号'
  },
  {
    prop: 'template_name',
    label: '模板名称'
  },
  {
    prop: 'template_type',
    label: '模板类型'
  },
  {
    prop: 'memo',
    label: '模板描述'
  },
  {
    prop: 'e',
    label: '操作',
    renderButton: true
  }
]
// 进驻管理
const applyList = [
  {
    prop: 'rooms',
    label: '房间号',
    tags: true
  },
  {
    prop: 'customer_name',
    label: '企业名称'
  },
  {
    prop: 'company_type',
    label: '企业类型'
  },
  {
    prop: 'start_ts',
    label: '开始时间',
    sortable: true
  },
  {
    prop: 'end_ts',
    label: '结束时间',
    sortable: true
  },
  {
    prop: 'receiver',
    label: '跟进人',
    sortable: true
  },
  {
    prop: 'state',
    label: '审批状态',
    sortable: true,
    renderTags: true
  }
]
// 退驻管理
const leaveList = [
  {
    prop: 'a',
    label: '所属园区'
  },
  {
    prop: 'b',
    label: '企业名称'
  },
  {
    prop: 'c',
    label: '企业类型'
  },
  {
    prop: 'd',
    label: '注册资本'
  },
  {
    prop: 'e',
    label: '入驻性质'
  },
  {
    prop: 'f',
    label: '入驻面积'
  },
  {
    prop: 'g',
    label: '房间号'
  },
  {
    prop: 'e',
    label: '开始时间'
  },
  {
    prop: 'date',
    label: '结束时间'
  },
  {
    prop: 'person',
    label: '跟进人'
  },
  {
    prop: 'h',
    label: '审批状态',
    renderTags: true
  }
]
// 四表集抄
const equipmentList = [
  {
    prop: 'building_name',
    label: '楼宇名称'
  },
  {
    prop: 'room',
    label: '房号'
  },
  {
    prop: 'contract_code',
    label: '合同编号'
  },
  {
    prop: 'equip_type',
    label: '设备类型'
  },
  {
    prop: 'state',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'customer',
    label: '客户'
  },
  {
    prop: 'create_ts',
    label: '抄录时间'
  }
]
// 报修管理
const repairList = [
  {
    prop: 'customer_name',
    label: '企业名称'
  },
  {
    prop: 'originator',
    label: '发起人'
  },
  {
    prop: 'contact',
    label: '联系电话'
  },
  {
    prop: 'reserve_ts',
    label: '预约时间'
  },
  {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'repair_state',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'describe',
    label: '描述'
  }
]
// 投诉管理
const complaintList = [
  {
    prop: 'customer_name',
    label: '企业名称'
  },
  {
    prop: 'originator',
    label: '发起人'
  },
  {
    prop: 'contact',
    label: '联系电话'
  },
  {
    prop: 'reserve_ts',
    label: '预约时间'
  },
  {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'complaint_state',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'describe',
    label: '描述'
  }
]
// 费用催缴
const paymentList = [
  {
    prop: 'room',
    label: '房间号',
    renderTags: true
  },
  {
    prop: 'customer_name',
    label: '客户名称'
  },
  {
    prop: 'type',
    label: '费用类型',
    renderTags: true
  },
  {
    prop: 'money',
    label: '催缴金额'
  },
  {
    prop: 'overdue_ts',
    label: '逾期天数'
  },
  {
    prop: 'receiver',
    label: '跟进人'
  },
  {
    prop: 'update_ts',
    label: '最近一次催缴时间'
  }
]
// 费用列支
const financialList = [
  {
    prop: 'log_type',
    label: '列支方向'
  },
  {
    prop: 'state',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'contract_code',
    label: '关联合同'
  },
  {
    prop: 'payer',
    label: '付款方'
  },
  {
    prop: 'contacter',
    label: '联系人'
  },
  {
    prop: 'receiver',
    label: '跟进人'
  },
  {
    prop: 'customer_name',
    label: '客户'
  },
  {
    prop: 'cost',
    label: '金额'
  },
  {
    prop: 'create_ts',
    label: '时间'
  },
  {
    prop: 'cost_type',
    label: '费用类型',
    renderTags: true
  }
]
// 财务收入
const incomeList = [
  {
    prop: 'charge_type',
    label: '费用类型',
    renderTags: true
  },
  {
    prop: 'customer_name',
    label: '客户名称'
  },
  {
    prop: 'create_ts',
    label: '缴费日期'
  },
  {
    prop: 'charge',
    label: '金额'
  },
  {
    prop: 'state',
    label: '缴费状态',
    renderTags: true
  },
  {
    prop: 'contract_code',
    label: '合同编号'
  },
  // {
  //   prop: 'rent',
  //   label: '租金'
  // },
  // {
  //   prop: 'property_fee',
  //   label: '物业费'
  // },
  // {
  //   prop: 'water_fee',
  //   label: '水费'
  // },
  // {
  //   prop: 'electric_fee',
  //   label: '电费'
  // },
  // {
  //   prop: 'gas_fee',
  //   label: '燃气费'
  // },
  // {
  //   prop: 'heat_fee',
  //   label: '空调暖通费'
  // },
  {
    prop: 'receiver',
    label: '跟进人'
  }
]
// 费用
const expenseList = [
  // {
  //   prop: 'building_name',
  //   label: '楼宇名称'
  // },
  // {
  //   prop: 'room_name',
  //   label: '房间号'
  // },
  {
    prop: 'customer_name',
    label: '客户名称'
  },
  {
    prop: 'rooms',
    label: '房间号',
    tags: true
  },
  {
    prop: 'type',
    label: '费用类型',
    renderTags: true
  },
  {
    prop: 'start_ts',
    label: '计费周期开始'
  },
  {
    prop: 'end_ts',
    label: '计费周期结束'
  },
  {
    prop: 'bill_money',
    label: '应收金额'
  },
  {
    prop: 'receive_money',
    label: '实收金额'
  },
  // {
  //   prop: 'invoice_money',
  //   label: '开票金额'
  // },
  {
    prop: 'contacter',
    label: '联系人'
  },
  {
    prop: 'contact',
    label: '联系方式'
  },
  {
    prop: 'overdue_day',
    label: '逾期天数'
  },
  {
    prop: 'pay_date',
    label: '截止日期'
  },
  // {
  //   prop: 'receiver',
  //   label: '跟进人'
  // },
  {
    prop: 'state',
    label: '结清状态',
    renderTags: true
  },
  {
    prop: 'e',
    label: '操作',
    renderButton: true
  }
]
const tables = {
  businessCustomer,
  contractList,
  contractTamplate,
  applyList,
  leaveList,
  equipmentList,
  repairList,
  complaintList,
  paymentList,
  financialList,
  incomeList,
  expenseList
}
export {
  tables
}
