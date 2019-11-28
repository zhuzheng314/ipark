// 客户管理
const businessCustomer = [
  {
    prop: 'a',
    label: '客户名称'
  },
  {
    prop: 'b',
    label: '进度阶段'
  },
  {
    prop: 'c',
    label: '来源渠道'
  },
  {
    prop: 'd',
    label: '需求面积段'
  },
  {
    prop: 'e',
    label: '行业'
  },
  {
    prop: 'f',
    label: '最近联络时间'
  },
  {
    prop: 'g',
    label: '联络人'
  },
  {
    prop: 'h',
    label: '联系方式'
  },
  {
    prop: 'i',
    label: '预计签约时间'
  },
  {
    prop: 'j',
    label: '跟进人'
  }
]
// 合同管理
const contractList = [
  {
    prop: 'a',
    label: '合同序号'
  },
  {
    prop: 'b',
    label: '楼宇名称'
  },
  {
    prop: 'c',
    label: '客户名称'
  },
  {
    prop: 'e',
    label: '截止时间'
  },
  {
    prop: 'd',
    label: '签订日'
  },
  {
    prop: 'f',
    label: '合同状态'
  },
  {
    prop: 'g',
    label: '租赁数目'
  },
  {
    prop: 'h',
    label: '跟进人'
  },
  {
    prop: 'j',
    label: '合同金额'
  }
]
// 合同模板
const contractTamplate = [
  {
    prop: 'a',
    label: '模板编号'
  },
  {
    prop: 'b',
    label: '模板名称'
  },
  {
    prop: 'c',
    label: '模板类型'
  },
  {
    prop: 'd',
    label: '状态'
  },
  {
    prop: 'e',
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
    label: '入驻性质',
    sortable: true
  },
  {
    prop: 'f',
    label: '入驻面积',
    sortable: true
  },
  {
    prop: 'g',
    label: '房间号',
    sortable: true
  },
  {
    prop: 'e',
    label: '开始时间',
    sortable: true
  },
  {
    prop: 'date',
    label: '结束时间',
    sortable: true
  },
  {
    prop: 'date',
    label: '开始时间',
    sortable: true
  },
  {
    prop: 'person',
    label: '跟进人',
    sortable: true
  },
  {
    prop: 'h',
    label: '审批状态',
    sortable: true
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
    prop: 'a',
    label: '楼宇名称'
  },
  {
    prop: 'c',
    label: '房号'
  },
  {
    prop: 'a',
    label: '合同编号'
  },
  {
    prop: 'e',
    label: '设备类型'
  },
  {
    prop: 'f',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'g',
    label: '客户'
  },
  {
    prop: 't',
    label: '抄录时间'
  }
]
// 报修管理
const repairList = [
  {
    prop: 'a',
    label: '租客名称'
  },
  {
    prop: 'b',
    label: '发起人'
  },
  {
    prop: 'c',
    label: '联系电话'
  },
  {
    prop: 't',
    label: '发起时间'
  },
  {
    prop: 'adress',
    label: '地址'
  },
  {
    prop: 'e',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'e',
    label: '描述'
  }
]
// 投诉管理
const complaintList = [
  {
    prop: 'a',
    label: '租客名称'
  },
  {
    prop: 'b',
    label: '发起人'
  },
  {
    prop: 'c',
    label: '联系电话'
  },
  {
    prop: 't',
    label: '发起时间'
  },
  {
    prop: 'adress',
    label: '地址'
  },
  {
    prop: 'e',
    label: '状态',
    renderTags: true
  },
  {
    prop: 'e',
    label: '描述'
  }
]
// 费用催缴
const paymentList = [
  {
    prop: 'a',
    label: '楼宇名称'
  },
  {
    prop: 'b',
    label: '房间号'
  },
  {
    prop: 'c',
    label: '客户名称'
  },
  {
    prop: 'd',
    label: '费用类型'
  },
  {
    prop: 'e',
    label: '催缴金额'
  },
  {
    prop: 'num',
    label: '逾期天数'
  },
  {
    prop: 'person',
    label: '跟进人'
  },
  {
    prop: 'day',
    label: '最近一次催缴时间'
  }
]
// 费用列支
const financialList = [
  {
    prop: 'type',
    label: '列支方向'
  },
  {
    prop: 'status',
    label: '状态'
  },
  {
    prop: 'a',
    label: '关联合同'
  },
  {
    prop: 'd',
    label: '付款方'
  },
  {
    prop: 'e',
    label: '联系人'
  },
  {
    prop: 'e',
    label: '跟进人'
  },
  {
    prop: 'e',
    label: '客户'
  },
  {
    prop: 'e',
    label: '金额'
  },
  {
    prop: 'e',
    label: '时间'
  },
  {
    prop: 'moneyType',
    label: '费用类型'
  }
]
// 财务收入
const incomeList = [
  {
    prop: 'a',
    label: '费用类型'
  },
  {
    prop: 'b',
    label: '客户名称'
  },
  {
    prop: 'c',
    label: '缴费日期'
  },
  {
    prop: 'd',
    label: '金额'
  },
  {
    prop: 'f',
    label: '缴费状态'
  },
  {
    prop: 'g',
    label: '合同名称'
  },
  {
    prop: 'h',
    label: '租金'
  },
  {
    prop: 'h',
    label: '物业费'
  },
  {
    prop: 'h',
    label: '水费'
  },
  {
    prop: 'h',
    label: '电费'
  },
  {
    prop: 'h',
    label: '空调暖通费'
  },
  {
    prop: 'i',
    label: '跟进人'
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
  incomeList
}
export {
  tables
}
