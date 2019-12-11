// 四表集抄
let sibjc = {
  title: '四表集抄模块',
  content: [
    {
      title: '获取四表集抄模块统计信息',
      api: 'assets.d_equip.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '起始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '结束时间'
        }
      ],
      return: [
        {
          key: 'electric',
          type: 'decimal',
          required: true,
          description: `总电费`
        },
        {
          key: 'electric_rate',
          type: 'decimal',
          required: true,
          description: `总电费对比`
        },
        {
          key: 'water',
          type: 'decimal',
          required: true,
          description: `总水费`
        },
        {
          key: 'water_rate',
          type: 'decimal',
          required: true,
          description: `总水费对比`
        },
        {
          key: 'gas',
          type: 'decimal',
          required: true,
          description: `总燃气费`
        },
        {
          key: 'gas_rate',
          type: 'decimal',
          required: true,
          description: `总燃气费对比`
        },
        {
          key: 'heat',
          type: 'decimal',
          required: true,
          description: `总空调暖通费`
        },
        {
          key: 'heat_rate',
          type: 'decimal',
          required: true,
          description: `总空调暖通费对比`
        }
      ],
      explain: []
    },
    {
      title: '获取设备列表',
      api: 'assets.equip.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'building_name',
          type: 'string',
          required: false,
          description: `楼宇名称`
        },
        {
          key: 'order_num',
          type: 'int',
          required: false,
          description: `序号`
        },
        {
          key: 'contract_code',
          type: 'string',
          required: false,
          description: `合同编号`
        },
        {
          key: 'contract_type',
          type: 'int',
          required: false,
          description: `合同类型`
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: `抄录时间`
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '四表集抄列表'
        }
      ],
      explain: [
        {
          key: 'building_name',
          type: 'string',
          required: true,
          description: `楼宇名称`
        },
        {
          key: 'room',
          type: 'string',
          required: true,
          description: `房号`
        },
        {
          key: 'order_num',
          type: 'int',
          required: true,
          description: `序号`
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: `状态`
        },
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: `合同编号`
        },
        {
          key: 'contract_type',
          type: 'int',
          required: true,
          description: `合同类型`
        },
        {
          key: 'equip_type',
          type: 'int',
          required: true,
          description: `设备类型`
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: `客户`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: `抄录时间`
        }
      ]
    },
    {
      title: '获取设备信息',
      api: 'assets.equip.get_info',
      business: [
        {
          key: 'equip_id',
          type: 'int',
          required: false,
          description: '序号id'
        }
      ],
      return: [
        {
          key: 'order_num',
          type: 'int',
          required: true,
          description: `序号`
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: `设备名称`
        },
        {
          key: 'type',
          type: 'int',
          required: true,
          description: `设备类型`
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: `设备状态`
        },
        {
          key: 'unit_price',
          type: 'decimal',
          required: true,
          description: `设备单价`
        },
        {
          key: 'unit_type',
          type: 'int',
          required: true,
          description: `单位`
        },
        {
          key: 'park',
          type: '数组',
          required: true,
          description: `园区到房间的数组`
        },
        {
          key: 'current_val',
          type: 'decimal',
          required: true,
          description: `本期读数`
        },
        {
          key: 'current_create_ts',
          type: 'timestamp',
          required: true,
          description: `本期录入时间`
        },
        {
          key: 'privious_val',
          type: 'decimal',
          required: true,
          description: `上期读数`
        },
        {
          key: 'privious_create_ts',
          type: 'timestamp',
          required: true,
          description: `上期录入时间`
        }
      ],
      explain: []
    }
  ]
}
// 报修管理
let baoxgl = {
  title: '报修管理模块',
  content: [
    {
      title: '获取报修管理模块统计信息',
      api: 'assets.d_repair.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'resolved',
          type: 'int',
          required: true,
          description: `已解决`
        },
        {
          key: 'resolved_rate',
          type: 'decimal',
          required: true,
          description: `已解决对比`
        },
        {
          key: 'unsolved',
          type: 'int',
          required: true,
          description: `待解决`
        },
        {
          key: 'unsolved_rate',
          type: 'decimal',
          required: true,
          description: `待解决对比`
        },
        {
          key: 'complet',
          type: 'decimal',
          required: true,
          description: `完成率`
        },
        {
          key: 'complet_rate',
          type: 'decimal',
          required: true,
          description: `完成率对比`
        },
        {
          key: 'satisfies',
          type: 'decimal',
          required: true,
          description: `满意度`
        },
        {
          key: 'satisfies_rate',
          type: 'decimal',
          required: true,
          description: `满意度对比`
        }
      ],
      explain: []
    },
    {
      title: '添加报修工单',
      api: 'assets.repair.add',
      business: [
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'string',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约服务时间'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: true,
          description: '图片'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改报修工单',
      api: 'assets.repair.modify',
      business: [
        {
          key: 'repair_code',
          type: 'string',
          required: true,
          description: '工单号'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'string',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约服务时间'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: true,
          description: '图片'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除报修工单',
      api: 'assets.repair.remove',
      business: [
        {
          key: 'repair_code',
          type: 'string',
          required: false,
          description: '工单号'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取报修列表',
      api: 'assets.repair.get_list',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '工单状态'
        },
        {
          key: 'repair_code',
          type: 'string',
          required: false,
          description: '工单号'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '报修工单列表'
        }
      ],
      explain: [
        {
          key: 'repair_code',
          type: 'string',
          required: true,
          description: '工单号'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '工单状态'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'string',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '发起时间'
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '地址'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        }
      ]
    },
    {
      title: '获取报修工单信息',
      api: 'assets.repair.get_info',
      business: [
        {
          key: 'repair_code',
          type: 'string',
          required: true,
          description: '序号id'
        }
      ],
      return: [
        {
          key: 'type',
          type: 'int',
          required: true,
          description: '工单类型'
        },
        {
          key: 'originator',
          type: 'int',
          required: true,
          description: '发起人'
        },
        {
          key: 'repair_code',
          type: 'string',
          required: true,
          description: '工单号'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '工单描述'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '工单状态'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约时间'
        },
        {
          key: 'park',
          type: 'json',
          required: true,
          description: '房间id'
        },
        {
          key: 'evaluate',
          type: 'int',
          required: true,
          description: `工单评价`
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '地址'
        }
      ],
      explain: []
    }
  ]
}
// 投诉管理
let tousgl = {
  title: '投诉管理模块',
  content: [
    {
      title: '获取投诉管理模块统计信息',
      api: 'assets.d_complaint.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: false,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'resolved',
          type: 'int',
          required: true,
          description: `已解决`
        },
        {
          key: 'resolved_rate',
          type: 'decimal',
          required: true,
          description: `已解决对比`
        },
        {
          key: 'unsolved',
          type: 'decimal',
          required: true,
          description: `待解决`
        },
        {
          key: 'unsolved_rate',
          type: 'decimal',
          required: true,
          description: `待解决对比`
        },
        {
          key: 'complet_rate',
          type: 'decimal',
          required: true,
          description: `完成率`
        },
        {
          key: 'complet_rate',
          type: 'decimal',
          required: true,
          description: `完成率对比`
        },
        {
          key: 'satisfies',
          type: 'int',
          required: true,
          description: `满意度`
        },
        {
          key: 'satisfies_rate',
          type: 'int',
          required: true,
          description: `满意度对比`
        }
      ],
      explain: []
    },
    {
      title: '添加投诉工单',
      api: 'assets.complaint.add',
      business: [
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'int',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约服务时间'
        },
        {
          key: 'subject',
          type: 'string',
          required: true,
          description: '摘要'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        },
        {
          key: 'evaluate',
          type: 'string',
          required: true,
          description: '评价'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: true,
          description: '图片'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改投诉工单',
      api: 'assets.complaint.modify',
      business: [
        {
          key: 'complaint_code',
          type: 'string',
          required: false,
          description: '工单号'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'int',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约服务时间'
        },
        {
          key: 'subject',
          type: 'string',
          required: true,
          description: '摘要'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        },
        {
          key: 'evaluate',
          type: 'string',
          required: true,
          description: '评价'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: true,
          description: '图片'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除投诉工单',
      api: 'assets.complaint.remove',
      business: [
        {
          key: 'complaint_code',
          type: 'string',
          required: false,
          description: '工单号'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取投诉列表',
      api: 'assets.complaint.get_list',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '工单状态'
        },
        {
          key: 'complaint_code',
          type: 'string',
          required: false,
          description: '工单号'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '报修工单列表'
        }
      ],
      explain: [
        {
          key: 'complaint_code',
          type: 'string',
          required: true,
          description: '工单号'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '工单状态'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '租客名称'
        },
        {
          key: 'originator',
          type: 'int',
          required: true,
          description: '发起人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系电话'
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '地址'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '发起时间'
        },
        {
          key: 'subject',
          type: 'string',
          required: true,
          description: '摘要'
        },
        {
          key: 'describe',
          type: 'string',
          required: true,
          description: '描述'
        },
        {
          key: 'evaluate',
          type: 'string',
          required: true,
          description: '评价'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: true,
          description: '图片'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ]
    },
    {
      title: '获取投诉工单信息',
      api: 'assets.complaint.get_info',
      business: [
        {
          key: 'complaint_code',
          type: 'string',
          required: false,
          description: '序号id'
        }
      ],
      return: [
        {
          key: 'type',
          type: 'int',
          required: true,
          description: '工单类型'
        },
        {
          key: 'originator',
          type: 'string',
          required: true,
          description: '发起人'
        },
        {
          key: 'complaint_code',
          type: 'string',
          required: true,
          description: '工单号'
        },
        {
          key: 'describe',
          type: 'int',
          required: true,
          description: '工单描述'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '工单状态'
        },
        {
          key: 'reserve_ts',
          type: 'timestamp',
          required: true,
          description: '预约时间'
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '地址'
        },
        {
          key: 'park',
          type: 'json',
          required: true,
          description: `房间名称`
        },
        {
          key: 'evaluate',
          type: 'int',
          required: true,
          description: `工单评价`
        }
      ],
      explain: []
    }
  ]
}
// 费用催缴
let feiycj = {
  title: '费用催缴模块',
  content: [
    {
      title: '获取费用催缴模块统计信息',
      api: 'assets.d_payment.get_info',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'need_receive',
          type: 'int',
          required: true,
          description: `应收`
        },
        {
          key: 'need_receive_num',
          type: 'int',
          required: true,
          description: `应收费用笔数`
        },
        {
          key: 'need_receive_rate',
          type: 'decimal',
          required: true,
          description: `应收对比`
        },
        {
          key: 'receive',
          type: 'int',
          required: true,
          description: `已收`
        },
        {
          key: 'receive_rate',
          type: 'decimal',
          required: true,
          description: `已收对比`
        },
        {
          key: 'un_receive',
          type: 'int',
          required: true,
          description: `未缴`
        },
        {
          key: 'un_receive_num',
          type: 'int',
          required: true,
          description: `未缴费用笔数`
        },
        {
          key: 'un_receive_rate',
          type: 'decimal',
          required: true,
          description: `未缴对比`
        },
        {
          key: 'rent',
          type: 'int',
          required: true,
          description: `租金`
        },
        {
          key: 'rent_rate',
          type: 'decimal',
          required: true,
          description: `租金对比`
        },
        {
          key: 'property_fee',
          type: 'int',
          required: true,
          description: `物业费`
        },
        {
          key: 'property_rate',
          type: 'decimal',
          required: true,
          description: `物业费对比`
        },
        {
          key: 'energy',
          type: 'int',
          required: true,
          description: `四表费用`
        },
        {
          key: 'energy_rate',
          type: 'int',
          required: true,
          description: `四表费用对比`
        },
        {
          key: 'other',
          type: 'int',
          required: true,
          description: `其他`
        },
        {
          key: 'other_rate',
          type: 'int',
          required: true,
          description: `其他对比`
        }
      ],
      explain: []
    },
    {
      title: '添加催缴',
      api: 'assets.payment.add',
      business: [
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '关联合同'
        },
        {
          key: 'payer',
          type: 'string',
          required: true,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'type',
          type: 'int',
          required: true,
          description: '费用类型'
        },
        {
          key: 'currency',
          type: 'int',
          required: true,
          description: '币种'
        },
        {
          key: 'money',
          type: 'decimal',
          required: true,
          description: `催缴金额`
        },
        {
          key: 'overdue_ts',
          type: 'timestamp',
          required: true,
          description: `逾期天数`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '计费周期开始'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '计费周期结束'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改催缴',
      api: 'assets.payment.modify',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '催缴id'
        },
        {
          key: 'payer',
          type: 'string',
          required: false,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: '联系人'
        },
        {
          key: 'type',
          type: 'int',
          required: false,
          description: '费用类型'
        },
        {
          key: 'currency',
          type: 'int',
          required: false,
          description: '币种'
        },
        {
          key: 'money',
          type: 'decimal',
          required: false,
          description: `催缴金额`
        },
        {
          key: 'overdue_ts',
          type: 'timestamp',
          required: false,
          description: `逾期天数`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: '计费周期开始'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: '计费周期结束'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: '跟进人'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description: '房间id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除催缴',
      api: 'assets.payment.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: false,
          description: '催缴id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取催缴列表',
      api: 'assets.payment.get_list',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'type',
          type: 'int',
          required: false,
          description: '费用类型'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '报修工单列表'
        }
      ],
      explain: [
        {
          key: 'park',
          type: 'json',
          required: true,
          description: `房间`
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: `客户名称`
        },
        {
          key: 'type',
          type: 'int',
          required: true,
          description: `费用类型`
        },
        {
          key: 'money',
          type: 'decimal',
          required: true,
          description: `催缴金额`
        },
        {
          key: 'overdue_ts',
          type: 'timestamp',
          required: true,
          description: `逾期天数`
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: `跟进人`
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: `地址`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: `最近一次催缴时间`
        }
      ]
    },
    {
      title: '获取催缴信息',
      api: 'assets.payment.get_info',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '缴费id'
        }
      ],
      return: [
        {
          key: 'park',
          type: 'json',
          required: true,
          description: `房间`
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: `客户名称`
        },
        {
          key: 'type',
          type: 'int',
          required: true,
          description: `费用类型`
        },
        {
          key: 'money',
          type: 'decimal',
          required: true,
          description: `催缴金额`
        },
        {
          key: 'overdue_ts',
          type: 'timestamp',
          required: true,
          description: `逾期天数`
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: `跟进人`
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: `地址`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: `最近一次催缴时间`
        }
      ],
      explain: []
    }
  ]
}
// 客户管理
let kehgl = {
  title: '客户管理模块',
  content: [
    {
      title: '获取客户管理统计信息',
      api: 'assets.d_customer.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'customer_info_source',
          type: 'int',
          required: false,
          description: '来源字典id'
        }
      ],
      return: [
        {
          key: 'meet',
          type: 'decimal',
          required: true,
          description: `接触客户`
        },
        {
          key: 'meet_rate',
          type: 'decimal',
          required: true,
          description: `接触客户变化率`
        },
        {
          key: 'sign',
          type: 'decimal',
          required: true,
          description: `成交客户`
        },
        {
          key: 'sign_rate',
          type: 'decimal',
          required: true,
          description: `成交客户变化率`
        },
        {
          key: 'loss',
          type: 'decimal',
          required: true,
          description: `流失客户`
        },
        {
          key: 'loss_rate',
          type: 'decimal',
          required: true,
          description: `流失客户变化率`
        }
      ],
      explain: []
    },
    {
      title: '添加客户',
      api: 'assets.customer.add',
      business: [
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '客户或企业名称'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: true,
          description: '联系方式'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '进度阶段'
        },
        {
          key: 'status',
          type: 'int',
          required: true,
          description: '行业性质'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: '来访时间'
        },
        {
          key: 'info_source',
          type: 'int',
          required: true,
          description: '客户来源'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'demand_area',
          type: 'decimal',
          required: true,
          description: '需求面积'
        },
        {
          key: 'work_station',
          type: 'int',
          required: true,
          description: '需求工位'
        },
        {
          key: 'demand_ts',
          type: 'timestamp',
          required: true,
          description: '预计签约时间'
        },
        {
          key: 'room',
          type: '数组',
          required: true,
          description: 'json数组'
        },
        {
          key: 'email',
          type: 'string',
          required: false,
          description: '邮箱'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改客户',
      api: 'assets.customer.modify ',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '客户或者企业的id'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '客户或企业名称'
        },
        {
          key: 'contacter',
          type: 'int',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: '跟进人'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '进度阶段'
        },
        {
          key: 'status',
          type: 'int',
          required: false,
          description: '行业性质'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '来访时间'
        },
        {
          key: 'info_source',
          type: 'int',
          required: false,
          description: '客户来源'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'demand_area',
          type: 'decimal',
          required: false,
          description: '需求面积'
        },
        {
          key: 'work_station',
          type: 'int',
          required: false,
          description: '需求工位'
        },
        {
          key: 'demand_ts',
          type: 'timestamp',
          required: false,
          description: '预计签约时间'
        },
        {
          key: 'room',
          type: '数组',
          required: false,
          description: 'json数组'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除客户',
      api: 'assets.customer.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '客户或者企业的id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取客户列表',
      api: 'assets.customer.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区的domain_id'
        },
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '客户或者企业的id'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '客户或企业名称'
        },
        {
          key: 'contacter',
          type: 'int',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: '跟进人'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '进度阶段'
        },
        {
          key: 'status',
          type: 'int',
          required: false,
          description: '行业性质'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '来访时间'
        },
        {
          key: 'info_source',
          type: 'int',
          required: false,
          description: '客户来源'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'demand_area',
          type: 'decimal',
          required: false,
          description: '需求面积'
        },
        {
          key: 'work_station',
          type: 'int',
          required: false,
          description: '需求工位'
        },
        {
          key: 'demand_ts',
          type: 'timestamp',
          required: false,
          description: '预计签约时间'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '客户列表'
        }
      ],
      explain: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '客户或者企业的id'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '客户或企业名称'
        },
        {
          key: 'contacter',
          type: 'int',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: '跟进人'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '进度阶段'
        },
        {
          key: 'status',
          type: 'int',
          required: false,
          description: '行业性质'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '来访时间'
        },
        {
          key: 'info_source',
          type: 'int',
          required: false,
          description: '客户来源'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'demand_area',
          type: 'decimal',
          required: false,
          description: '需求面积'
        },
        {
          key: 'work_station',
          type: 'int',
          required: false,
          description: '需求工位'
        },
        {
          key: 'demand_ts',
          type: 'timestamp',
          required: false,
          description: '预计签约时间'
        },
        {
          key: 'room',
          type: '数组',
          required: false,
          description: 'json数组'
        }
      ]
    },
    {
      title: '获取客户信息',
      api: 'assets.customer.get_info',
      business: [
        {
          key: 'id',
          type: 'int',
          required: false,
          description: '客户id(客户id和房间id必须有一个)'
        },
        {
          key: 'room_id',
          type: 'int',
          required: false,
          description: '房间id(客户id和房间id必须有一个)'
        }
      ],
      return: [],
      explain: []
    }
  ]
}
// 园区管理模块
let park = {
  title: '园区管理模块',
  content: [
    {
      title: '获取园区统计信息',
      api: 'assets.d_park.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'rent_area',
          type: 'int',
          required: true,
          description: `可招商面积`,
          数据区间: [5000 - 6000]
        },
        {
          key: 'total_area',
          type: 'int',
          required: true,
          description: `管理面积`,
          数据区间: [1000 - 10000]
        },
        {
          key: 'avg_unit_price',
          type: 'int',
          required: true,
          description: `在租实时均价`,
          数据区间: [300 - 1000]
        },
        {
          key: 'avg_unit_price_rate',
          type: 'int',
          required: true,
          description: `在租实时均价变化率`,
          数据区间: [0 - 1]
        },
        {
          key: 'rent_rate',
          type: 'int',
          required: true,
          description: `出租率`,
          数据区间: [0 - 1]
        },
        {
          key: 'rent_change_rate',
          type: 'int',
          required: true,
          description: `出租率变化率`,
          数据区间: [0 - 1]
        },
        {
          key: 'pay_rate',
          type: 'int',
          required: true,
          description: `当前计租率`,
          数据区间: [0 - 1]
        },
        {
          key: 'total_rooms',
          type: 'int',
          required: true,
          description: `总房源数量`,
          数据区间: [0 - 1]
        },
        {
          key: 'month_area',
          type: 'int',
          required: true,
          description: `本月签约面积`,
          数据区间: [0 - 1]
        },
        {
          key: 'month_area_avg_price',
          type: 'int',
          required: true,
          description: `本月签约均价`,
          数据区间: [0 - 1]
        },
        {
          key: 'rent_rooms',
          type: 'int',
          required: true,
          description: `可招商房间`,
          数据区间: [0 - 1]
        },
        {
          key: 'year_pay_rate',
          type: 'int',
          required: true,
          description: `预计全年计租率:`,
          数据区间: [0 - 1]
        }
      ],
      explain: []
    },
    {
      title: '添加园区模块',
      api: 'assets.park.add',
      business: [
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: false,
          description: '竣工或购置时间，预留字段-可以不用'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: false,
          description: '取得方式，预留字段-可以不用'
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '园区地址'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: true,
          description: '房产性质，预留字段-可以不用'
        },
        {
          key: 'usage',
          type: 'string',
          required: true,
          description: '园区定位'
        },
        {
          key: 'capital',
          type: 'string',
          required: true,
          description: '产权单位，资产方'
        },
        {
          key: 'detail',
          type: 'string',
          required: false,
          description: '园区描述'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          required: false,
          description: '园区图片，或者文件，可以多文件'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注，预留字段暂时不用'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '园区名称'
        },
        {
          key: 'built_area',
          type: 'decimal',
          required: false,
          description: '建筑面积:单位平方米'
        },
        {
          key: 'total_invest',
          type: 'decimal',
          required: false,
          description: '总投资:万元'
        },
        {
          key: 'property',
          type: 'string',
          required: false,
          description: '所属物业'
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '园区状态'
        },
        {
          key: 'cover_area',
          type: 'numeric',
          required: false,
          description: '占地面积:单位平方米'
        },
        {
          key: 'actual_invest',
          type: 'numeric',
          required: false,
          description: '实际投资:万元'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改园区模块',
      api: 'assets.park.modify',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description:
            '域关联ID，是一个和地域关联的主键，园区信息的唯一标识，修改和删除的接口必须要有的参数，资产模块的园区、楼宇、楼层、房间都有这个作为主键'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: false,
          description: '竣工或购置时间，预留字段-可以不用'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: false,
          description: '取得方式，预留字段-可以不用'
        },
        {
          key: 'address',
          type: 'string',
          required: true,
          description: '园区地址'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: true,
          description: '房产性质，预留字段-可以不用'
        },
        {
          key: 'usage',
          type: 'string',
          required: true,
          description: '园区定位'
        },
        {
          key: 'capital',
          type: 'string',
          required: true,
          description: '产权单位，资产方'
        },
        {
          key: 'detail',
          type: 'string',
          required: false,
          description: '园区描述'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          required: false,
          description: '园区图片，或者文件，可以多文件'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注，预留字段暂时不用'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '园区名称'
        },
        {
          key: 'built_area',
          type: 'decimal',
          required: false,
          description: '建筑面积:单位平方米'
        },
        {
          key: 'total_invest',
          type: 'decimal',
          required: false,
          description: '总投资:万元'
        },
        {
          key: 'property',
          type: 'string',
          required: false,
          description: '所属物业'
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '园区状态'
        },
        {
          key: 'cover_area',
          type: 'numeric',
          required: false,
          description: '占地面积:单位平方米'
        },
        {
          key: 'actual_invest',
          type: 'numeric',
          required: false,
          description: '实际投资:万元'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除园区模块',
      api: 'assets.park.remove',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID，主键id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取园区模块列表',
      api: 'assets.park.get_info',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description: '域关联ID'
        }
      ],
      return: [
        {
          key: 'domain_id',
          type: 'int',
          description: '域关联ID'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          description: '竣工或购置时间'
        },
        {
          key: 'acquire_way',
          type: 'int',
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'address',
          type: 'string',
          description: '园区地址'
        },
        {
          key: 'estate_property',
          type: 'string',
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'capital',
          type: 'string',
          description: '产权单位，资产方'
        },
        {
          key: 'detail',
          type: 'string',
          description: '介绍'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          description: '附件-文件上传尚未开发'
        },
        {
          key: 'memo',
          type: 'string',
          description: '备注'
        },
        {
          key: 'name',
          type: 'string',
          description: '园区名称'
        },
        {
          key: 'built_area',
          type: 'decimal',
          description: '建筑面积:单位平方米'
        },
        {
          key: 'total_invest',
          type: 'decimal',
          description: '总投资:万元'
        },
        {
          key: 'property',
          type: 'string',
          description: '所属物业'
        },
        {
          key: 'contacter',
          type: 'string',
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          description: '联系方式'
        },
        {
          key: 'state',
          type: 'int',
          description: '园区状态'
        },
        {
          key: 'cover_area',
          type: 'numeric',
          description: '占地面积:单位平方米'
        },
        {
          key: 'actual_invest',
          type: 'numeric',
          description: '实际投资:万元'
        }
      ],
      explain: []
    },
    {
      title: '获取园区模块列表',
      api: 'assets.park.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description:
            '域关联ID，是一个和地域关联的主键，园区信息的唯一标识，修改和删除的接口必须要有的参数，资产模块的园区、楼宇、楼层、房间都有这个作为主键'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: false,
          description: '竣工或购置时间，预留字段-可以不用'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: false,
          description: '取得方式，预留字段-可以不用'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '园区地址'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: false,
          description: '房产性质，预留字段-可以不用'
        },
        {
          key: 'usage',
          type: 'string',
          required: false,
          description: '园区定位'
        },
        {
          key: 'capital',
          type: 'string',
          required: false,
          description: '产权单位，资产方'
        },
        {
          key: 'detail',
          type: 'string',
          required: false,
          description: '园区描述'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          required: false,
          description: '园区图片，或者文件，可以多文件'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注，预留字段暂时不用'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '园区名称'
        },
        {
          key: 'built_area',
          type: 'decimal',
          required: false,
          description: '建筑面积:单位平方米'
        },
        {
          key: 'total_invest',
          type: 'decimal',
          required: false,
          description: '总投资:万元'
        },
        {
          key: 'property',
          type: 'string',
          required: false,
          description: '所属物业'
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '园区状态'
        },
        {
          key: 'cover_area',
          type: 'numeric',
          required: false,
          description: '占地面积:单位平方米'
        },
        {
          key: 'actual_invest',
          type: 'numeric',
          required: false,
          description: '实际投资:万元'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '园区模块列表'
        }
      ],
      explain: [
        {
          key: 'domain_id',
          type: 'int',
          description: '域关联ID'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          description: '竣工或购置时间'
        },
        {
          key: 'acquire_way',
          type: 'int',
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'address',
          type: 'string',
          description: '园区地址'
        },
        {
          key: 'estate_property',
          type: 'string',
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'capital',
          type: 'string',
          description: '产权单位，资产方'
        },
        {
          key: 'detail',
          type: 'string',
          description: '介绍'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          description: '附件-文件上传尚未开发'
        },
        {
          key: 'memo',
          type: 'string',
          description: '备注'
        },
        {
          key: 'name',
          type: 'string',
          description: '园区名称'
        },
        {
          key: 'built_area',
          type: 'decimal',
          description: '建筑面积:单位平方米'
        },
        {
          key: 'total_invest',
          type: 'decimal',
          description: '总投资:万元'
        },
        {
          key: 'property',
          type: 'string',
          description: '所属物业'
        },
        {
          key: 'contacter',
          type: 'string',
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          description: '联系方式'
        },
        {
          key: 'state',
          type: 'int',
          description: '园区状态'
        },
        {
          key: 'cover_area',
          type: 'numeric',
          description: '占地面积:单位平方米'
        },
        {
          key: 'actual_invest',
          type: 'numeric',
          description: '实际投资:万元'
        }
      ]
    }
  ]
}
// 楼宇模块管理
let building = {
  title: '楼宇模块管理',
  content: [
    {
      title: '获取楼宇统计信息',
      api: 'assets.d_building.get_info',
      business: [
        {
          key: 'building_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'rent_area',
          type: 'int',
          required: true,
          description: `可招商面积`,
          数据区间: [1000 - 2000]
        },
        {
          key: 'total_area',
          type: 'int',
          required: true,
          description: `管理面积`,
          数据区间: [2000 - 3000]
        },
        {
          key: 'avg_unit_price',
          type: 'int',
          required: true,
          description: `在租实时均价`,
          数据区间: [300 - 1000]
        },
        {
          key: 'avg_unit_price_rate',
          type: 'int',
          required: true,
          description: `在租实时均价变化率`,
          数据区间: [0 - 1]
        },
        {
          key: 'rent_rate',
          type: 'int',
          required: true,
          description: `出租率`,
          数据区间: [0 - 1]
        },
        {
          key: 'rent_change_rate',
          type: 'int',
          required: true,
          description: `出租率变化率`,
          数据区间: [0 - 1]
        },
        {
          key: 'pay_rate',
          type: 'int',
          required: true,
          description: `当前计租率`,
          数据区间: [0 - 1]
        },
        {
          key: 'total_rooms',
          type: 'int',
          required: true,
          description: `总房源数量`,
          数据区间: [1000 - 1200]
        },
        {
          key: 'rent_rooms',
          type: 'int',
          required: true,
          description: `可招租房源数量`,
          数据区间: [600 - 700]
        },
        {
          key: 'name',
          type: 'int',
          required: true,
          description: `楼宇名称`,
          数据区间: [600 - 700]
        },
        {
          key: 'built_area',
          type: 'int',
          required: true,
          description: `建筑面积`,
          数据区间: [3000 - 3100]
        },
        {
          key: 'month_area',
          type: 'int',
          required: true,
          description: `本月签约面积`,
          数据区间: [0 - 1]
        },
        {
          key: 'month_area_avg_price',
          type: 'int',
          required: true,
          description: `本月签约均价`,
          数据区间: [0 - 1]
        },
        {
          key: 'year_pay_rate',
          type: 'int',
          required: true,
          description: `预计全年计租率:`,
          数据区间: [0 - 1]
        }
      ],
      explain: []
    },
    {
      title: '添加楼宇',
      api: 'assets.building.add',
      business: [
        {
          key: 'pid',
          type: 'int',
          required: true,
          description: '父域id,就是所属园区的domain_id'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: `名称,可修改`
        },
        {
          key: 'info',
          type: 'json',
          required: false,
          description: `域扩展信息，备用字段-可以忽略`
        },
        {
          key: 'code',
          type: 'string',
          required: false,
          description: `编码,比如行政区号，备用字段-可以忽略`
        },
        {
          key: 'domain_memo',
          type: 'string',
          required: false,
          description: `域备注，备用字段-可以忽略`
        },
        {
          key: 'property_unit',
          type: 'string',
          required: true,
          description: `产权单位，备用字段-可以忽略`
        },
        {
          key: 'property_certificate',
          type: 'string',
          required: true,
          description: `产权证，备用字段-可以忽略`
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: true,
          description: `竣工或购置时间，备用字段-可以忽略`
        },
        {
          key: 'area',
          type: 'decimal',
          required: true,
          description: `建筑面积`
        },
        {
          key: 'rent_area',
          type: 'decimal',
          required: true,
          description: `出租面积`
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: `附件或者图片`
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: `楼宇描述`
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改楼宇',
      api: 'assets.building.modify',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '名称'
        },
        {
          key: 'property_unit',
          type: 'string',
          required: false,
          description: '产权单位'
        },
        {
          key: 'property_certificate',
          type: 'string',
          required: false,
          description: '产权证'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: false,
          description: '竣工或购置时间'
        },
        {
          key: 'area',
          type: 'decimal',
          required: false,
          description: '建筑面积'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          required: false,
          description: '附件-文件上传尚未开发'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'rent_area',
          type: 'numeric',
          required: false,
          description: '出租面积'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: ' 删除楼宇',
      api: 'assets.building.remove',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域ID，主键id,唯一标识符'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取楼宇列表',
      api: 'assets.building.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '名称'
        },
        {
          key: 'property_unit',
          type: 'string',
          required: false,
          description: '产权单位，备用字段-可以忽略'
        },
        {
          key: 'property_certificate',
          type: 'string',
          required: false,
          description: '产权证，备用字段-可以忽略'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: false,
          description: '竣工或购置时间，备用字段-可以忽略'
        },
        {
          key: 'area',
          type: 'decimal',
          required: false,
          description: '建筑面积'
        },
        {
          key: 'rent_area',
          type: 'decimal',
          required: false,
          description: '出租面积'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '附件或者图片'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '楼宇描述'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '备注'
        },
        {
          key: 'rent_area',
          type: 'numeric',
          required: false,
          description: '备注'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '楼宇列表'
        }
      ],
      explain: []
    },
    {
      title: '获取楼宇信息',
      api: 'assets.building.get_list',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID，主键id'
        }
      ],
      return: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '名称'
        },
        {
          key: 'property_unit',
          type: 'string',
          required: true,
          description: '产权单位'
        },
        {
          key: 'property_certificate',
          type: 'string',
          required: true,
          description: '产权证'
        },
        {
          key: 'complete_ts',
          type: 'timestamp',
          required: true,
          description: '竣工或购置时间'
        },
        {
          key: 'area',
          type: 'decimal',
          required: true,
          description: '建筑面积'
        },
        {
          key: 'attached',
          type: 'multipart-file',
          required: false,
          description: '附件-文件上传尚未开发'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '楼宇描述'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '记录的生成时间'
        },
        {
          key: 'rent_area',
          type: 'numeric',
          required: false,
          description: '出租面积'
        }
      ],
      explain: []
    }
  ]
}
// 楼层模块管理
let floor = {
  title: '楼层模块管理:::目前楼层的概念已经被干掉了',
  content: [
    {
      title: '添加楼层 ，楼层这一块的添加可以先不管',
      api: 'assets.floor.add',
      business: [
        {
          key: 'pid',
          type: 'int',
          required: true,
          description: '父域id,就是楼宇的domain_id'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '名称,可修改'
        },
        {
          key: 'info',
          type: 'json',
          required: false,
          description: '域扩展信息,预留字段-可以忽略'
        },
        {
          key: 'code',
          type: 'string',
          required: false,
          description: '编码,比如行政区号-预留字段-可以忽略'
        },
        {
          key: 'domain_memo',
          type: 'string',
          required: false,
          description: '域备注-预留字段-可以忽略'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改楼层',
      api: 'assets.floor.modify',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID，主键id'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '楼层名称'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除楼层',
      api: 'assets.floor.remove',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '主键ID，唯一标识符'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取楼层列表',
      api: 'assets.floor.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '主键ID，唯一标识符'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '名称'
        }
      ],
      return: [],
      explain: []
    }
  ]
}
// 房间模块管理
let room = {
  title: '房间模块管理',
  content: [
    {
      title: '添加房间',
      api: 'assets.room.add',
      business: [
        {
          key: 'pid',
          type: 'int',
          required: true,
          description:
            '父域id,就是楼宇的domain_id；因为目前的父域id,就是楼层的domain_id'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '房间号，名称'
        },
        {
          key: 'area',
          type: 'decimal',
          required: true,
          description: '建筑面积 单位：平方米'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '房间状态'
        },
        {
          key: 'contacter',
          type: 'sting',
          required: false,
          description: '联系人'
        },
        {
          key: 'contact',
          type: 'string',
          required: false,
          description: '联系方式'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '房间描述'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: false,
          description: '附件或者图片'
        },
        {
          key: 'info',
          type: 'json',
          required: false,
          description: '域扩展信息，预留字段-可以忽略'
        },
        {
          key: 'code',
          type: 'string',
          required: false,
          description: '编码,比如行政区号，预留字段-可以忽略'
        },
        {
          key: 'domain_memo',
          type: 'string',
          required: false,
          description: '域备注，预留字段-可以忽略'
        },
        {
          key: 'room_property',
          type: 'int',
          required: true,
          description:
            '房间性质：0-出租、1-出售、2-自用、3-公用，预留字段-可以忽略'
        },
        {
          key: 'is_rentable',
          type: 'boolean',
          required: true,
          description:
            '是否可租： true 可租 、 false 不可租，预留字段-可以忽略'
        },
        {
          key: 'room_usage',
          type: 'int',
          required: true,
          description:
            '房间用途：0-其他、1-办公、2-厂房、3-公寓，预留字段-可以忽略'
        },
        {
          key: 'decoration_standard',
          type: 'int',
          required: true,
          description: '装修标准：0-毛坯、1-简装、2-精装，预留字段-可以忽略'
        },
        {
          key: 'direction',
          type: 'int',
          required: false,
          description: '朝向：0-东、1-南、2-西、3-北，预留字段-可以忽略'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: true,
          description:
            '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅，预留字段-可以忽略'
        },
        {
          key: 'usage',
          type: 'string',
          required: true,
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置，预留字段-可以忽略'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: true,
          description:
            '取得方式：0-其他、1-自建、2-购置、3-划拨，预留字段-可以忽略'
        },
        {
          key: 'acquire_ts',
          type: 'timestamp',
          required: true,
          description: '取得时间，预留字段-可以忽略'
        },
        {
          key: 'is_flue',
          type: 'bool',
          required: false,
          description: '烟道：true 有、false 无，预留字段-可以忽略'
        },
        {
          key: 'floor_height',
          type: 'decimal',
          required: false,
          description: '层高： 米，预留字段-可以忽略'
        },
        {
          key: 'floor',
          type: 'int',
          required: false,
          description: '楼层号'
        },
        {
          key: 'bearing',
          type: 'decimal',
          required: false,
          description: '承重： 千克，预留字段-可以忽略'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '房间详细地址'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改房间',
      api: 'assets.room.modify',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID，房间的主键id'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '房间名称'
        },
        {
          key: 'room_property',
          type: 'int',
          required: false,
          description: '房间性质：0-出租、1-出售、2-自用、3-公用'
        },
        {
          key: 'is_rentable',
          type: 'boolean',
          required: false,
          description: '是否可租： true 可租 、 false 不可租'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '房间状态：0-空闲、1-预定、2-占用'
        },
        {
          key: 'room_usage',
          type: 'int',
          required: false,
          description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
        },
        {
          key: 'decoration_standard',
          type: 'int',
          required: false,
          description: '装修标准：0-毛坯、1-简装、2-精装'
        },
        {
          key: 'area',
          type: 'decimal',
          required: false,
          description: '建筑面积 单位：平方米'
        },
        {
          key: 'direction',
          type: 'int',
          required: false,
          description: '朝向：0-东、1-南、2-西、3-北'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: false,
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          required: false,
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: false,
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'acquire_ts',
          type: 'timestamp',
          required: false,
          description: '取得时间'
        },
        {
          key: 'is_flue',
          type: 'bool',
          required: false,
          description: '烟道：true 有、false 无'
        },
        {
          key: 'floor_height',
          type: 'decimal',
          required: false,
          description: '层高： 米'
        },
        {
          key: 'bearing',
          type: 'decimal',
          required: false,
          description: '承重： 千克'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: false,
          description: '附件'
        },
        {
          key: 'floor',
          type: 'int',
          required: false,
          description: '楼层号'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '房间详细地址'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除房间',
      api: 'assets.room.remove',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '主键ID'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取房间列表',
      api: 'assets.room.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'domain_id',
          type: 'int',
          required: false,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: false,
          description: '房间名称'
        },
        {
          key: 'room_property',
          type: 'int',
          required: false,
          description: '房间性质：0-出租、1-出售、2-自用、3-公用'
        },
        {
          key: 'is_rentable',
          type: 'boolean',
          required: false,
          description: '是否可租： true 可租 、 false 不可租'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '房间状态：0-空闲、1-预定、2-占用'
        },
        {
          key: 'room_usage',
          type: 'int',
          required: false,
          description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
        },
        {
          key: 'decoration_standard',
          type: 'int',
          required: false,
          description: '装修标准：0-毛坯、1-简装、2-精装'
        },
        {
          key: 'area',
          type: 'decimal',
          required: false,
          description: '建筑面积 单位：平方米'
        },
        {
          key: 'direction',
          type: 'int',
          required: false,
          description: '朝向：0-东、1-南、2-西、3-北'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: false,
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          required: false,
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: false,
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'acquire_ts',
          type: 'timestamp',
          required: false,
          description: '取得时间'
        },
        {
          key: 'is_flue',
          type: 'bool',
          required: false,
          description: '烟道：true 有、false 无'
        },
        {
          key: 'floor_height',
          type: 'decimal',
          required: false,
          description: '层高： 米'
        },
        {
          key: 'bearing',
          type: 'decimal',
          required: false,
          description: '承重： 千克'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '房间详细地址'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '楼宇列表'
        }
      ],
      explain: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '房间名称'
        },
        {
          key: 'room_property',
          type: 'int',
          required: true,
          description: '房间性质：0-出租、1-出售、2-自用、3-公用'
        },
        {
          key: 'is_rentable',
          type: 'boolean',
          required: true,
          description: '是否可租： true 可租 、 false 不可租'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '房间状态：0-空闲、1-预定、2-占用'
        },
        {
          key: 'room_usage',
          type: 'int',
          required: true,
          description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
        },
        {
          key: 'decoration_standard',
          type: 'int',
          required: true,
          description: '装修标准：0-毛坯、1-简装、2-精装'
        },
        {
          key: 'area',
          type: 'decimal',
          required: true,
          description: '建筑面积 单位：平方米'
        },
        {
          key: 'direction',
          type: 'int',
          required: false,
          description: '朝向：0-东、1-南、2-西、3-北'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: true,
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          required: true,
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: true,
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'acquire_ts',
          type: 'timestamp',
          required: true,
          description: '取得时间'
        },
        {
          key: 'is_flue',
          type: 'bool',
          required: false,
          description: '烟道：true 有、false 无'
        },
        {
          key: 'floor_height',
          type: 'decimal',
          required: false,
          description: '层高： 米'
        },
        {
          key: 'bearing',
          type: 'decimal',
          required: false,
          description: '承重： 千克'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: false,
          description: '附件'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '房间详细地址'
        }
      ]
    },
    {
      title: '获取房间信息',
      api: 'assets.room.get_info',
      business: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID'
        }
      ],
      return: [
        {
          key: 'domain_id',
          type: 'int',
          required: true,
          description: '域关联ID'
        },
        {
          key: 'name',
          type: 'string',
          required: true,
          description: '房间名称'
        },
        {
          key: 'room_property',
          type: 'int',
          required: true,
          description: '房间性质：0-出租、1-出售、2-自用、3-公用'
        },
        {
          key: 'is_rentable',
          type: 'boolean',
          required: true,
          description: '是否可租： true 可租 、 false 不可租'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '房间状态：0-空闲、1-预定、2-占用'
        },
        {
          key: 'room_usage',
          type: 'int',
          required: true,
          description: '房间用途：0-其他、1-办公、2-厂房、3-公寓'
        },
        {
          key: 'decoration_standard',
          type: 'int',
          required: true,
          description: '装修标准：0-毛坯、1-简装、2-精装'
        },
        {
          key: 'area',
          type: 'decimal',
          required: true,
          description: '建筑面积 单位：平方米'
        },
        {
          key: 'direction',
          type: 'int',
          required: false,
          description: '朝向：0-东、1-南、2-西、3-北'
        },
        {
          key: 'estate_property',
          type: 'string',
          required: true,
          description: '房产性质：0-其他、1-商业用房、2-生产用房、3-住宅'
        },
        {
          key: 'usage',
          type: 'string',
          required: true,
          description:
            '房产用途：0-其他、1-办公、2-经营、3-生产、4-出租、5-仓储、6-居住、7-闲置'
        },
        {
          key: 'acquire_way',
          type: 'int',
          required: true,
          description: '取得方式：0-其他、1-自建、2-购置、3-划拨'
        },
        {
          key: 'acquire_ts',
          type: 'timestamp',
          required: true,
          description: '取得时间'
        },
        {
          key: 'is_flue',
          type: 'bool',
          required: false,
          description: '烟道：true 有、false 无'
        },
        {
          key: 'floor_height',
          type: 'decimal',
          required: false,
          description: '层高： 米'
        },
        {
          key: 'bearing',
          type: 'decimal',
          required: false,
          description: '承重： 千克'
        },
        {
          key: 'attached',
          type: 'jsonb',
          required: false,
          description: '附件'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: '创建时间'
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: '备注'
        },
        {
          key: 'address',
          type: 'string',
          required: false,
          description: '房间详细地址'
        }
      ],
      explain: []
    }
  ]
}
// 费用列支
let feiyonglz = {
  title: '费用列支模块',
  content: [
    {
      title: '获取费用列支统计信息',
      api: 'assets.d_cost.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'need_pay',
          type: 'int',
          required: true,
          description: `应付`
        },
        {
          key: 'need_pay_num',
          type: 'int',
          required: true,
          description: `应付笔数`
        },
        {
          key: 'need_pay_rate',
          type: 'decimal',
          required: true,
          description: `应付对比`
        },
        {
          key: 'pay',
          type: 'int',
          required: true,
          description: `已付`
        },
        {
          key: 'pay_rate',
          type: 'decimal',
          required: true,
          description: `已付对比`
        },
        {
          key: 'un_pay',
          type: 'int',
          required: true,
          description: `未付`
        },
        {
          key: 'un_pay_num',
          type: 'int',
          required: true,
          description: `未付笔数`
        },
        {
          key: 'un_pay_rate',
          type: 'decimal',
          required: true,
          description: `未付对比`
        },

        {
          key: 'need_receive',
          type: 'int',
          required: true,
          description: `应收`
        },
        {
          key: 'need_receive_num',
          type: 'int',
          required: true,
          description: `应收笔数`
        },
        {
          key: 'need_receive_rate',
          type: 'decimal',
          required: true,
          description: `应收对比`
        },
        {
          key: 'receive',
          type: 'int',
          required: true,
          description: `已收`
        },
        {
          key: 'receive_rate',
          type: 'decimal',
          required: true,
          description: `已收对比`
        },
        {
          key: 'un_receive',
          type: 'int',
          required: true,
          description: `未缴`
        },
        {
          key: 'un_receive_num',
          type: 'int',
          required: true,
          description: `未缴笔数`
        },
        {
          key: 'un_receive_rate',
          type: 'decimal',
          required: true,
          description: `未缴对比`
        }
      ],
      explain: []
    },
    {
      title: '添加费用列支',
      api: 'assets.cost.add',
      business: [
        {
          key: 'log_type',
          type: 'int',
          required: true,
          description: '列支方向'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '状态'
        },
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '合同编号'
        },
        {
          key: 'payer',
          type: 'string',
          required: true,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: '来访时间'
        },
        {
          key: 'customer_id',
          type: 'int',
          required: true,
          description: '客户id'
        },
        {
          key: 'cost',
          type: 'decimal',
          required: false,
          description: '费用金额'
        },
        {
          key: 'cost_type',
          type: 'int',
          required: true,
          description: '费用类型'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '周期开始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '周期结束时间'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '客户名字'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改费用列支',
      api: 'assets.cost.modify ',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '主键'
        },
        {
          key: 'log_type',
          type: 'int',
          required: true,
          description: '列支方向'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '状态'
        },
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '合同编号'
        },
        {
          key: 'payer',
          type: 'string',
          required: true,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: '来访时间'
        },
        {
          key: 'customer_id',
          type: 'int',
          required: true,
          description: '客户id'
        },
        {
          key: 'cost',
          type: 'decimal',
          required: false,
          description: '费用金额'
        },
        {
          key: 'cost_type',
          type: 'int',
          required: true,
          description: '费用类型'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '周期开始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '周期结束时间'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '客户名字'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除费用列支',
      api: 'assets.cost.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '主键'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取费用列支列表',
      api: 'assets.cost.get_list',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'log_type',
          type: 'int',
          required: true,
          description: '列支方向'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '状态'
        },
        {
          key: 'like',
          type: 'string',
          required: true,
          description: '模糊搜索：联系人、跟进人、客户'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '客户列表'
        }
      ],
      explain: [
        {
          key: 'log_type',
          type: 'int',
          required: true,
          description: '列支方向'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '状态'
        },
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '合同编号'
        },
        {
          key: 'payer',
          type: 'string',
          required: true,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: '来访时间'
        },
        {
          key: 'customer_id',
          type: 'int',
          required: true,
          description: '客户id'
        },
        {
          key: 'cost',
          type: 'decimal',
          required: false,
          description: '费用金额'
        },
        {
          key: 'cost_type',
          type: 'int',
          required: true,
          description: '费用类型'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '周期开始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '周期结束时间'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '客户名字'
        }
      ]
    },
    {
      title: '获取费用列支信息',
      api: 'assets.cost.get_info',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '费用列支id'
        }
      ],
      return: [
        {
          key: 'log_type',
          type: 'int',
          required: true,
          description: '列支方向'
        },
        {
          key: 'state',
          type: 'int',
          required: true,
          description: '状态'
        },
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '合同编号'
        },
        {
          key: 'payer',
          type: 'string',
          required: true,
          description: '付款方'
        },
        {
          key: 'contacter',
          type: 'string',
          required: true,
          description: '联系人'
        },
        {
          key: 'receiver',
          type: 'string',
          required: true,
          description: '跟进人'
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: '来访时间'
        },
        {
          key: 'customer_id',
          type: 'int',
          required: true,
          description: '客户id'
        },
        {
          key: 'cost',
          type: 'decimal',
          required: false,
          description: '费用金额'
        },
        {
          key: 'cost_type',
          type: 'int',
          required: true,
          description: '费用类型'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: true,
          description: '周期开始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: true,
          description: '周期结束时间'
        },
        {
          key: 'memo',
          type: 'string',
          required: true,
          description: '备注'
        },
        {
          key: 'customer',
          type: 'string',
          required: true,
          description: '客户名字'
        }
      ],
      explain: []
    }
  ]
}
// 财务收入
let caiwusr = {
  title: '财务收入模块',
  content: [
    {
      title: '获取财务收入统计信息',
      api: 'assets.d_charge.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'charge_state',
          type: 'int',
          required: true,
          description: '缴费状态字典id'
        }
      ],
      return: [
        {
          key: 'rent',
          type: 'decimal',
          required: true,
          description: `租金`
        },
        {
          key: 'property_fee',
          type: 'decimal',
          required: true,
          description: `物业费`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: true,
          description: `水费`
        },
        {
          key: 'gas_fee',
          type: 'decimal',
          required: true,
          description: `燃气费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: true,
          description: `电费`
        },
        {
          key: 'heat_fee',
          type: 'decimal',
          required: true,
          description: `暖通费用`
        },
        {
          key: 'other_fee',
          type: 'decimal',
          required: true,
          description: `其他费用`
        },
        {
          key: 'rent_rate',
          type: 'decimal',
          required: true,
          description: `租金变化率`
        },
        {
          key: 'property_rate',
          type: 'decimal',
          required: true,
          description: `物业费变化率`
        },
        {
          key: 'water_rate',
          type: 'decimal',
          required: true,
          description: `水费变化率`
        },
        {
          key: 'gas_rate',
          type: 'decimal',
          required: true,
          description: `燃气费变化率`
        },
        {
          key: 'electric_rate',
          type: 'decimal',
          required: true,
          description: `电费变化率`
        },
        {
          key: 'heat_rate',
          type: 'decimal',
          required: true,
          description: `暖通费用变化率`
        },
        {
          key: 'other_rate',
          type: 'decimal',
          required: true,
          description: `其他费用变化率`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: true,
          description: `创建时间`
        }
      ],
      explain: []
    },
    {
      title: '添加财务收入',
      api: 'assets.charge.add',
      business: [
        {
          key: 'contract_code',
          type: 'string',
          required: false,
          description: `合同编号`
        },
        {
          key: 'payer',
          type: 'string',
          required: false,
          description: `付款方`
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'customer_id',
          type: 'string',
          required: false,
          description: `客户id`
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: `联系人`
        },
        {
          key: 'charge',
          type: 'decimal',
          required: false,
          description: `费用金额`
        },
        {
          key: 'charge_type',
          type: 'int',
          required: false,
          description: `费用类型`
        },
        {
          key: 'rent',
          type: 'decimal',
          required: false,
          description: `租金`
        },
        {
          key: 'property_fee',
          type: 'decimal',
          required: false,
          description: `物业费`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: false,
          description: `水费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: false,
          description: `电费`
        },
        {
          key: 'heat_fee',
          type: 'decimal',
          required: false,
          description: `暖通费用`
        },
        {
          key: 'currency',
          type: 'int',
          required: false,
          description: `币种类型`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期开始`
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期结束`
        },
        {
          key: 'rooms',
          type: 'string',
          required: false,
          description: `房间用逗号分隔`
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: `跟进人`
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: `缴费状态`
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: `备注`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: `创建时间`
        },
        {
          key: 'gas_fee',
          type: 'decimal',
          required: false,
          description: `燃气费用`
        },
        {
          key: 'other_fee',
          type: 'decimal',
          required: false,
          description: `其他费用`
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改财务收入',
      api: 'assets.charge.modify ',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '主键'
        },
        {
          key: 'contract_code',
          type: 'string',
          required: false,
          description: `合同编号`
        },
        {
          key: 'payer',
          type: 'string',
          required: false,
          description: `付款方`
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'customer_id',
          type: 'string',
          required: false,
          description: `客户id`
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: `联系人`
        },
        {
          key: 'charge',
          type: 'decimal',
          required: false,
          description: `费用金额`
        },
        {
          key: 'charge_type',
          type: 'int',
          required: false,
          description: `费用类型`
        },
        {
          key: 'rent',
          type: 'decimal',
          required: false,
          description: `租金`
        },
        {
          key: 'property_fee',
          type: 'decimal',
          required: false,
          description: `物业费`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: false,
          description: `水费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: false,
          description: `电费`
        },
        {
          key: 'heat_fee',
          type: 'decimal',
          required: false,
          description: `暖通费用`
        },
        {
          key: 'currency',
          type: 'int',
          required: false,
          description: `币种类型`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期开始`
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期结束`
        },
        {
          key: 'rooms',
          type: 'string',
          required: false,
          description: `房间用逗号分隔`
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: `跟进人`
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: `缴费状态`
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: `备注`
        },
        {
          key: 'gas_fee',
          type: 'decimal',
          required: false,
          description: `燃气费用`
        },
        {
          key: 'other_fee',
          type: 'decimal',
          required: false,
          description: `其他费用`
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除财务收入',
      api: 'assets.charge.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '财务收入id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取财务收入列表',
      api: 'assets.charge.get_list',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期开始`
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期结束`
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: `缴费状态`
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '财务收入列表'
        }
      ],
      explain: [
        {
          key: 'contract_code',
          type: 'string',
          required: false,
          description: `合同编号`
        },
        {
          key: 'payer',
          type: 'string',
          required: false,
          description: `付款方`
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'customer_id',
          type: 'string',
          required: false,
          description: `客户id`
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: `联系人`
        },
        {
          key: 'charge',
          type: 'decimal',
          required: false,
          description: `费用金额`
        },
        {
          key: 'charge_type',
          type: 'int',
          required: false,
          description: `费用类型`
        },
        {
          key: 'rent',
          type: 'decimal',
          required: false,
          description: `租金`
        },
        {
          key: 'property_fee',
          type: 'decimal',
          required: false,
          description: `物业费`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: false,
          description: `水费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: false,
          description: `电费`
        },
        {
          key: 'heat_fee',
          type: 'decimal',
          required: false,
          description: `暖通费用`
        },
        {
          key: 'currency',
          type: 'int',
          required: false,
          description: `币种类型`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期开始`
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期结束`
        },
        {
          key: 'rooms',
          type: 'string',
          required: false,
          description: `房间用逗号分隔`
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: `跟进人`
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: `缴费状态`
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: `备注`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: `创建时间`
        },
        {
          key: 'gas_fee',
          type: 'decimal',
          required: false,
          description: `燃气费用`
        },
        {
          key: 'other_fee',
          type: 'decimal',
          required: false,
          description: `其他费用`
        }
      ]
    },
    {
      title: '获取财务收入信息',
      api: 'assets.charge.get_info',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '客户id'
        }
      ],
      return: [
        {
          key: 'contract_code',
          type: 'string',
          required: false,
          description: `合同编号`
        },
        {
          key: 'payer',
          type: 'string',
          required: false,
          description: `付款方`
        },
        {
          key: 'customer',
          type: 'string',
          required: false,
          description: `客户`
        },
        {
          key: 'customer_id',
          type: 'string',
          required: false,
          description: `客户id`
        },
        {
          key: 'contacter',
          type: 'string',
          required: false,
          description: `联系人`
        },
        {
          key: 'charge',
          type: 'decimal',
          required: false,
          description: `费用金额`
        },
        {
          key: 'charge_type',
          type: 'int',
          required: false,
          description: `费用类型`
        },
        {
          key: 'rent',
          type: 'decimal',
          required: false,
          description: `租金`
        },
        {
          key: 'property_fee',
          type: 'decimal',
          required: false,
          description: `物业费`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: false,
          description: `水费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: false,
          description: `电费`
        },
        {
          key: 'heat_fee',
          type: 'decimal',
          required: false,
          description: `暖通费用`
        },
        {
          key: 'currency',
          type: 'int',
          required: false,
          description: `币种类型`
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期开始`
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: `计费周期结束`
        },
        {
          key: 'rooms',
          type: 'string',
          required: false,
          description: `房间用逗号分隔`
        },
        {
          key: 'receiver',
          type: 'string',
          required: false,
          description: `跟进人`
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: `缴费状态`
        },
        {
          key: 'memo',
          type: 'string',
          required: false,
          description: `备注`
        },
        {
          key: 'create_ts',
          type: 'timestamp',
          required: false,
          description: `创建时间`
        },
        {
          key: 'gas_fee',
          type: 'decimal',
          required: false,
          description: `燃气费用`
        },
        {
          key: 'other_fee',
          type: 'decimal',
          required: false,
          description: `其他费用`
        }
      ],
      explain: []
    }
  ]
}
// 字典模块管理
let zidmkgl = {
  title: '字典类型模块',
  content: [
    {
      title: '添加字典类型模块',
      api: 'model.dictype.add',
      business: [
        {
          key: 'type_code',
          type: 'string',
          required: true,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: true,
          description: '字典类型名称'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改字典类型模块',
      api: 'model.dictype.modify',
      business: [
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'type_code',
          type: 'string',
          required: false,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: false,
          description: '字典类型名称'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除字典类型模块',
      api: 'model.dictype.remove',
      business: [
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取字典类型列表',
      api: 'model.dictype.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'type_code',
          type: 'string',
          required: false,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: false,
          description: '字典类型名称'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'int',
          required: false,
          description: '字典类型列表'
        }
      ],
      explain: [
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'type_code',
          type: 'string',
          required: false,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: false,
          description: '字典类型名称'
        }
      ]
    },
    {
      title: '获取字典类型信息',
      api: 'model.dictype.get_list',
      business: [
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        }
      ],
      return: [
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'type_code',
          type: 'string',
          required: false,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: false,
          description: '字典类型名称'
        }
      ],
      explain: []
    },
    {
      title: '获取字典树',
      api: 'model.dictype.get_tree_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'type_code',
          type: 'string',
          required: false,
          description: '字典类型编码'
        },
        {
          key: 'type_name',
          type: 'string',
          required: false,
          description: '字典类型名称'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '字典类型列表'
        }
      ],
      explain: []
    }
  ]
}
// 字典管理
let zidgl = {
  title: '字典模块',
  content: [
    {
      title: '添加字典模块',
      api: 'model.dicinfo.add',
      business: [
        {
          key: '参数名称',
          type: '参数类型',
          required: false,
          description: '参数描述'
        },
        {
          key: 'type_id',
          type: 'int',
          required: true,
          description: '字典类型id'
        },
        {
          key: 'dic_code',
          type: 'string',
          required: true,
          description: '业务编码'
        },
        {
          key: 'dic_info',
          type: 'string',
          required: false,
          description: '业务详情'
        },
        {
          key: 'order_num',
          type: 'int',
          required: true,
          description: '排序使用'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改字典模块',
      api: 'model.dicinfo.modify',
      business: [
        { key: 'id', type: 'int', required: true, description: '字典id' },
        {
          key: 'type_id',
          type: 'int',
          required: false,
          description: '字典类型id'
        },
        {
          key: 'dic_code',
          type: 'string',
          required: false,
          description: '业务编码'
        },
        {
          key: 'dic_info',
          type: 'string',
          required: false,
          description: '业务详情'
        },
        {
          key: 'order_num',
          type: 'int',
          required: false,
          description: '排序使用'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除字典模块',
      api: 'model.dicinfo.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '字典id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取字典列表',
      api: 'model.dicinfo.get_list',
      business: [
        { key: 'pageno', type: 'int', required: true, description: '页码' },
        {
          key: 'pagesize',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        { key: 'id', type: 'int', required: false, description: '字典id' },
        {
          key: 'typeid',
          type: 'int',
          required: false,
          description: '字典类型id'
        },
        {
          key: 'diccode',
          type: 'string',
          required: false,
          description: '业务编码'
        },
        {
          key: 'dicinfo',
          type: 'string',
          required: false,
          description: '业务详情'
        },
        {
          key: 'ordernum',
          type: 'int',
          required: false,
          description: '排序使用'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '字典id'
        }
      ],
      explain: [
        {
          key: 'type_id',
          type: 'int',
          required: false,
          description: '字典类型id'
        },
        {
          key: 'dic_code',
          type: 'string',
          required: false,
          description: '业务编码'
        },
        {
          key: 'dic_info',
          type: 'string',
          required: false,
          description: '业务详情'
        },
        {
          key: 'order_num',
          type: 'int',
          required: false,
          description: '排序使用'
        }
      ]
    },
    {
      title: '获取字典信息',
      api: 'model.dicinfo.get_info',
      business: [
        { key: 'id', type: 'int', required: true, description: '字典ID' }
      ],
      return: [
        {
          key: 'type_id',
          type: 'int',
          required: false,
          description: '字典类型id'
        },
        {
          key: 'dic_code',
          type: 'string',
          required: false,
          description: '业务编码'
        },
        {
          key: 'dic_info',
          type: 'string',
          required: false,
          description: '业务详情'
        },
        {
          key: 'order_num',
          type: 'int',
          required: false,
          description: '排序使用'
        }
      ],
      explain: []
    }
  ]
}
// 合同管理
let contract = {
  title: '合同模块管理',
  content: [
    {
      title: '获取合同到期统计信息',
      api: 'assets.d_contract.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json',
          required: true,
          description: `合同到期统计信息列表 例：{"一月":3,"二月":0,"三月":2,"四月":3,"五月":0,"六月":4,"七月":1,"八月":2,"九月":0,"十月":3,"十一月":0,"十二月":2}`
        }
      ],
      explain: []
    },
    {
      title: '添加合同',
      api: 'assets.contract.add',
      business: [
        { key: 'customer_id', type: 'int', description: '用户id' },
        { key: 'organiz_code', type: 'string', description: '组织机构代码' },
        { key: 'company_type', type: 'int', description: '公司类别' },
        { key: 'company_name', type: 'string', description: '公司名称' },
        { key: 'customer_id', type: 'int', description: '来访客户id' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'social_credit_code', type: 'string', description: '统一社会信用代码' },
        { key: 'taxpayer_code', type: 'string', description: '纳税人识别号' },
        { key: 'regist_code', type: 'string', description: '注册号' },
        { key: 'representative', type: 'string', description: '法人代表' },
        { key: 'nationality', type: 'string', description: '国籍' },
        { key: 'regist_fund', type: 'int', description: '注册资金:单位(万)' },
        { key: 'operate_state', type: 'int', description: '经营状态' },
        { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
        { key: 'staff_size', type: 'int', description: '人员规模' },
        { key: 'operate_term', type: 'timestamp', description: '营业期限' },
        { key: 'issuance', type: 'string', description: '登记机关' },
        { key: 'authentic_ts', type: 'timestamp', description: '核准日期' },
        { key: 'en_name', type: 'string', description: '英文名' },
        { key: 'region', type: 'string', description: '所属地区' },
        { key: 'trade', type: 'string', description: '所属行业' },
        { key: 'address', type: 'string', description: '注册地址' },
        { key: 'brand', type: 'string', description: '商标品牌' },
        { key: 'taxpayer_code', type: 'string', description: '纳税人识别号' },
        { key: 'contacter', type: 'string', description: '联系人' },
        { key: 'contact', type: 'string', description: '电话' },
        { key: 'email', type: 'string', description: '邮箱' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'bank', type: 'string', description: '银行' },
        { key: 'bank_code', type: 'string', description: '银行账号' },
        { key: 'invoice_address', type: 'string', description: '开票地址' },
        { key: 'business_format', type: 'int', description: '客户业态' },
        { key: 'follow_business', type: 'string', description: '跟进商务' },
        { key: 'contract_type', type: 'int', description: '合同类型' },
        { key: 'rent_area', type: 'int', description: '租聘面积' },
        { key: 'tenancy_divide', type: 'int', description: '租期划分' },
        { key: 'charge_type', type: 'int', description: '计费类型' },
        { key: 'state', type: 'int', description: '合同状态' },
        { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'fee_start_ts', type: 'timestamp', description: '计费开始日期' },
        { key: 'fee_end_ts', type: 'timestamp', description: '计费截至日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
        { key: 'pay_date', type: 'int', description: '付款日期:每月的第几天' },
        { key: 'prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'unit_price', type: 'int', description: '合同单价' },
        { key: 'unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'year_rent', type: 'int', description: '年租金' },
        { key: 'month_rent', type: 'int', description: '月租金' },
        { key: 'deposit', type: 'int', description: '押金' },
        { key: 'manage_area', type: 'numeric', description: '管理面积' },
        { key: 'room', type: 'josn数组', description: '房间domain_id' },
        { key: 'property_sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'property_start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'property_end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'property_fee_start_ts', type: 'timestamp', description: '费用开始时间' },
        { key: 'property_fee_end_ts', type: 'timestamp', description: '费用结束时间' },
        { key: 'property_pay_cycle', type: 'int', description: '付款周期:单位是月' },

        { key: 'property_pay_date', type: 'int', description: '付款日期:每月的第几天' },
        { key: 'property_prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'property_unit_price', type: 'int', description: '合同单价' },
        { key: 'property_unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'property_year_rent', type: 'int', description: '年物业费' },
        { key: 'property_month_rent', type: 'int', description: '月物业费' },
        { key: 'property_deposit', type: 'int', description: '押金' },
        { key: 'customer_id', type: 'int', description: '年租金' },
        { key: 'room', type: 'json数组', description: '租聘房间' }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改合同',
      api: 'assets.contract.modify',
      business: [
        { key: 'contract_code', type: '合同编码', description: 'string' },
        { key: 'customer_id', type: '用户id', description: 'int' },
        { key: 'company_id', type: '企业id', description: 'int' },

        { key: 'organiz_code', type: 'string', description: '组织机构代码' },
        { key: 'company_type', type: 'int', description: '公司类别' },
        { key: 'company_name', type: 'string', description: '公司名称' },
        { key: 'customer_id', type: 'int', description: '来访客户id' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'social_credit_code', type: 'string', description: '统一社会信用代码' },
        { key: 'taxpayer_code', type: 'string', description: '纳税人识别号' },
        { key: 'regist_code', type: 'string', description: '注册号' },
        { key: 'representative', type: 'string', description: '法人代表' },
        { key: 'nationality', type: 'string', description: '国籍' },
        { key: 'regist_fund', type: 'int', description: '注册资金:单位(万)' },
        { key: 'operate_state', type: 'int', description: '经营状态' },
        { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
        { key: 'staff_size', type: 'int', description: '人员规模' },
        { key: 'operate_term', type: 'timestamp', description: '营业期限' },
        { key: 'issuance', type: 'string', description: '登记机关' },
        { key: 'authentic_ts', type: 'timestamp', description: '认证日期' },
        { key: 'en_name', type: 'string', description: '英文名' },
        { key: 'region', type: 'string', description: '所属地区' },
        { key: 'trade', type: 'string', description: '所属行业' },
        { key: 'address', type: 'string', description: '地址' },
        { key: 'brand', type: 'string', description: '商标品牌' },
        { key: 'contacter', type: 'string', description: '联系人' },
        { key: 'contact', type: 'string', description: '联系方式' },
        { key: 'email', type: 'string', description: '邮箱' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'bank', type: 'string', description: '银行' },
        { key: 'bank_code', type: 'string', description: '银行账号' },
        { key: 'invoice_address', type: 'string', description: '开票地址' },
        { key: 'business_format', type: 'int', description: '客户业态' },
        { key: 'follow_business', type: 'string', description: '跟进商务' },
        { key: 'contract_type', type: 'int', description: '合同类型' },
        { key: 'rent_area', type: 'int', description: '租聘面积' },
        { key: 'tenancy_divide', type: 'int', description: '租期划分' },
        { key: 'charge_type', type: 'int', description: '计费类型' },
        { key: 'state', type: 'int', description: '合同状态' },
        { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'fee_start_ts', type: 'timestamp', description: '计费开始日期' },
        { key: 'fee_end_ts', type: 'timestamp', description: '计费截至日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
        { key: 'pay_date', type: 'int', description: '付款日期:每月的第几天' },
        { key: 'prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'unit_price', type: 'int', description: '合同单价' },
        { key: 'unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'year_rent', type: 'int', description: '年租金' },
        { key: 'month_rent', type: 'int', description: '月租金' },
        { key: 'deposit', type: 'int', description: '押金' },
        { key: 'manage_area', type: 'numeric', description: '管理面积' },
        { key: 'room', type: 'josn数组', description: '房间domain_id' },
        { key: 'property_sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'property_start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'property_end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'property_fee_start_ts', type: 'timestamp', description: '费用开始时间' },
        { key: 'property_fee_end_ts', type: 'timestamp', description: '费用结束时间' },
        { key: 'property_pay_cycle', type: 'int', description: '付款周期:单位是月' },
        { key: 'property_pay_date', type: 'int', description: '付款日期:每月的第几天' },
        { key: 'property_prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'property_unit_price', type: 'int', description: '合同单价' },
        { key: 'property_unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'property_year_rent', type: 'int', description: '年租金' },
        { key: 'property_month_rent', type: 'int', description: '月租金' },
        { key: 'property_deposit', type: 'int', description: '押金' },
        { key: 'customer_id', type: 'int', description: '年租金' },
        { key: 'room', type: 'json数组', description: '租聘房间' }
      ],
      return: [],
      explain: []
    },
    {
      title: ' 删除合同',
      api: 'assets.contract.remove',
      business: [
        { key: 'contract_code', type: 'string', description: '合同编码' }
      ],
      return: [],
      explain: []
    },
    {
      title: '通过园区id获取园区下的获取合同列表',
      api: 'assets.contract.get_list',
      business: [
        { key: 'page_no', type: 'int', required: true, description: '页码' },
        { key: 'page_size', type: 'int', required: true, description: '页面显示行数' },
        { key: 'park_id', type: 'int', required: true, description: '园区的domain_id' },
        { key: 'state', type: 'int', required: false, description: '状态' },
        { key: 'customer_name', type: 'string', required: false, description: '客户名' },
        { key: 'customer_id', type: 'int', required: false, description: '客户id' }
      ],
      return: [
        { key: 'list', type: 'json array', required: true, description: '楼宇列表' }
      ],
      explain: [
        // 这里是企业的相关字段   工商信息
        { key: 'organiz_code', type: '组织机构代码', description: 'string' }, // 组织机构代码  工商信息
        { key: 'company_type', type: '公司类别', description: 'int' },
        { key: 'company_name', type: '公司名称', description: 'string' },
        { key: 'customer_id', type: '来访客户id', description: 'int' },
        { key: 'scope', type: '经营范围', description: 'int' },
        { key: 'social_credit_code', type: '统一社会信用代码', description: 'string' }, // 统一社会信用代码  工商信息
        { key: 'taxpayer_code', type: '纳税人识别号', description: 'string' }, // 纳税人识别号    工商信息
        { key: 'regist_code', type: '注册号', description: 'string' }, // 注册号     工商信息
        { key: 'representative', type: '法人代表', description: 'string' }, // 法定代表人    工商信息
        { key: 'nationality', type: '国籍', description: 'string' }, // 国籍   工商信息
        { key: 'regist_fund', type: '注册资金:单位(万)', description: 'int' }, // 注册资本/万  工商信息
        { key: 'operate_state', type: '经营状态', description: 'int' }, // 经营状态    工商信息
        { key: 'establish_ts', type: '成立日期', description: 'timestamp' }, // 成立日期      工商信息
        { key: 'staff_size', type: '人员规模', description: 'int' }, // 人员规模     工商信息
        { key: 'operate_term', type: '营业期限', description: 'timestamp' }, // 营业期限      工商信息
        { key: 'issuance', type: '登记机关', description: 'string' }, // 登记机关      工商信息
        { key: 'authentic_ts', type: '核准日期', description: 'timestamp' }, // 核准日期    工商信息
        { key: 'en_name', type: '英文名', description: 'string' }, // 英文名      工商信息
        { key: 'region', type: '所属地区', description: 'string' }, // 所属地区     工商信息
        { key: 'trade', type: '所属行业', description: 'string' }, // 所属行业      工商信息
        { key: 'address', type: '注册地址', description: 'string' }, // 注册地址        工商信息

        // 企业的      开票信息
        { key: 'brand', type: '商标品牌', description: 'string' },
        { key: 'taxpayer_code', type: '纳税人识别号', description: 'string' },
        { key: 'contacter', type: '联系人', description: 'string' },
        { key: 'contact', type: '电话', description: 'string' }, // 联系方式    开票信息
        { key: 'email', type: '邮箱', description: 'string' },
        { key: 'scope', type: '经营范围', description: 'int' },
        { key: 'bank', type: '银行', description: 'string' }, // 开户银行     开票信息
        { key: 'bank_code', type: '银行账号', description: 'string' }, // 账号    开票信息
        { key: 'invoice_address', type: '开票地址', description: 'string' }, // 开票地址     开票信息

        // 这里是合同信息
        { key: 'contract_code', type: '合同编号', description: 'string' },
        { key: 'business_format', type: '客户业态', description: 'int' }, // 客户业态    基础信息
        { key: 'follow_business', type: '跟进商务', description: 'string' }, // 跟进商务    基础信息
        { key: 'contract_type', type: '合同类型', description: 'int' }, // 合同类型    基础信息
        { key: 'rent_area', type: '租聘面积', description: 'int' }, // 租赁面积    基础条款
        { key: 'tenancy_divide', type: '租期划分', description: 'int' }, // 租期划分    基础条款
        { key: 'charge_type', type: '计费类型', description: 'int' }, // 计费类型    基础条款
        { key: 'state', type: '合同状态', description: 'int' },

        { key: 'sign_ts', type: '签订时间', description: 'timestamp' }, // 签订时间     基础条款
        { key: 'start_ts', type: '合同开始日期', description: 'timestamp' }, // 开始时间      房源租期条款
        { key: 'end_ts', type: '合同截至日期', description: 'timestamp' }, // 结束时间        房源租期条款
        { key: 'fee_start_ts', type: '计费开始日期', description: 'timestamp' }, // 计租时间      基础条款
        { key: 'fee_end_ts', type: '计费截至日期', description: 'timestamp' }, // 结束时间        基础条款
        { key: 'pay_cycle', type: '付款周期:单位是月', description: 'int' }, // 付款周期（月）  基础条款
        { key: 'pay_date', type: '付款日期:每月的第几天', description: 'int' }, // 收款日      基础条款
        { key: 'prepaid', type: '预付月份:预付几个月的月租', description: 'int' }, // 提取收租（月） 基础条款
        { key: 'unit_price', type: '合同单价', description: 'int' }, // 合同单价            房源租期条款
        { key: 'unit_value', type: '合同单价的单位', description: 'int' }, // (元/㎡·天)     房源租期条款
        { key: 'year_rent', type: '年租金', description: 'int' }, // 年租金                 房源租期条款
        { key: 'month_rent', type: '月租金', description: 'int' }, // 月租金                房源租期条款
        { key: 'deposit', type: '押金', description: 'int' }, // 押金设置（元）    基础条款

        // 物业合同相关信息   物业基础条款   物业条款
        { key: 'manage_area', type: '管理面积', description: 'numeric' }, // 管理面积
        { key: 'room', type: '房间domain_id', description: 'josn数组' },

        { key: 'property_sign_ts', type: '签订时间', description: 'timestamp' }, // 签订时间               物业费基础条款
        { key: 'property_start_ts', type: '合同开始日期', description: 'timestamp' }, // 开始时间          物业费条款
        { key: 'property_end_ts', type: '合同截至日期', description: 'timestamp' }, // 结束时间            物业费条款
        { key: 'property_fee_start_ts', type: '费用开始时间', description: 'timestamp' }, // 计费时间     物业费基础条款
        { key: 'property_fee_end_ts', type: '费用结束时间', description: 'timestamp' }, // 结束时间        物业费条款
        { key: 'property_pay_cycle', type: '付款周期:单位是月', description: 'int' }, // 付款周期（月）     物业费基础条款
        // { key: 'property_pay_date', type: '收款日', description: 'int' },//收款日           物业费基础条款
        { key: 'property_prepaid', type: '预付月份:预付几个月的月租', description: 'int' }, // 提前收费（月）物业费基础条款
        { key: 'property_unit_price', type: '合同单价', description: 'int' }, // 合同单价     物业费条款
        { key: 'property_unit_value', type: '合同单价的单位', description: 'int' }, // (元/㎡·天)  物业费条款
        { key: 'property_year_rent', type: '年物业费', description: 'int' }, // 年物业费   物业费条款
        { key: 'property_month_rent', type: '月物业费', description: 'int' }, // 月物业费  物业费条款
        { key: 'property_deposit', type: '押金', description: 'int' }, // 押金（元）    物业费基础条款
        {
          key: 'room',
          type: '数组',
          description: '房间详细信息的数组',
          explain: [
            { key: 'name', type: 'string', required: true, description: '房间号，名称' },
            { key: 'park_name', type: 'string', required: true, description: '园区名称' },
            { key: 'building_name', type: 'string', required: true, description: '楼宇名称' }
          ]
        },
        // 租户
        // 租客信息
        { key: 'company_name', type: 'string', description: '租客' },
        { key: 'trade', type: 'string', description: '行业' },
        { key: 'representative', type: 'string', description: '法人' },
        { key: 'customer_name', type: 'string', description: '租客信息的签订人和租客信息的联系人' }
      ]
    },
    {
      title: '通过房间id获取合同列表',
      api: 'assets.contract.get_list_by_room',
      business: [
        { key: 'page_no', type: 'int', required: true, description: '页码' },
        { key: 'page_size', type: 'int', required: true, description: '页面显示行数' },
        { key: 'room_id', type: 'int', required: true, description: '园区的domain_id' }
      ],
      return: [
        { key: 'list', type: 'json array', required: true, description: '楼宇列表' }
      ],
      explain: [
        { key: 'organiz_code', type: 'string', description: '组织机构代码' },
        { key: 'company_type', type: 'int', description: '公司类别' },
        { key: 'company_name', type: 'string', description: '公司名称' },
        { key: 'customer_id', type: 'int', description: '来访客户id' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'social_credit_code', type: 'string', description: '统一社会信用代码' },
        { key: 'taxpayer_code', type: 'string', description: '纳税人识别号' },
        { key: 'regist_code', type: 'string', description: '注册号' },
        { key: 'representative', type: 'string', description: '法人代表' },
        { key: 'nationality', type: 'string', description: '国籍' },
        { key: 'regist_fund', type: 'int', description: '注册资金:单位(万)' },
        { key: 'operate_state', type: 'int', description: '经营状态' },
        { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
        { key: 'staff_size', type: 'int', description: '人员规模' },
        { key: 'operate_term', type: 'timestamp', description: '营业期限' },
        { key: 'issuance', type: 'string', description: '登记机关' },
        { key: 'authentic_ts', type: 'timestamp', description: '核准日期' },
        { key: 'en_name', type: 'string', description: '英文名' },
        { key: 'region', type: 'string', description: '所属地区' },
        { key: 'trade', type: 'string', description: '所属行业' },
        { key: 'address', type: 'string', description: '注册地址' },
        { key: 'brand', type: 'string', description: '商标品牌' },
        { key: 'taxpayer_code', type: 'string', description: '纳税人识别号' },
        { key: 'contacter', type: 'string', description: '联系人' },
        { key: 'contact', type: 'string', description: '电话' },
        { key: 'email', type: 'string', description: '邮箱' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'bank', type: 'string', description: '银行' },
        { key: 'bank_code', type: 'string', description: '银行账号' },
        { key: 'invoice_address', type: 'string', description: '开票地址' },
        { key: 'business_format', type: 'int', description: '客户业态' },
        { key: 'follow_business', type: 'string', description: '跟进商务' },
        { key: 'contract_type', type: 'int', description: '合同类型' },
        { key: 'rent_area', type: 'int', description: '租聘面积' },
        { key: 'tenancy_divide', type: 'int', description: '租期划分' },
        { key: 'charge_type', type: 'int', description: '计费类型' },
        { key: 'state', type: 'int', description: '合同状态' },
        { key: 'sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'fee_start_ts', type: 'timestamp', description: '计费开始日期' },
        { key: 'fee_end_ts', type: 'timestamp', description: '计费截至日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期:单位是月' },
        { key: 'pay_date', type: 'int', description: '付款日期:每月的第几天' },
        { key: 'prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'unit_price', type: 'int', description: '合同单价' },
        { key: 'unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'year_rent', type: 'int', description: '年租金' },
        { key: 'month_rent', type: 'int', description: '月租金' },
        { key: 'deposit', type: 'int', description: '押金' },
        { key: 'manage_area', type: 'numeric', description: '管理面积' },
        { key: 'room', type: 'josn数组', description: '房间domain_id' },
        { key: 'property_sign_ts', type: 'timestamp', description: '签订时间' },
        { key: 'property_start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'property_end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'property_fee_start_ts', type: 'timestamp', description: '费用开始时间' },
        { key: 'property_fee_end_ts', type: 'timestamp', description: '费用结束时间' },
        { key: 'property_pay_cycle', type: 'int', description: '付款周期:单位是月' },
        { key: 'property_prepaid', type: 'int', description: '预付月份:预付几个月的月租' },
        { key: 'property_unit_price', type: 'int', description: '合同单价' },
        { key: 'property_unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'property_year_rent', type: 'int', description: '年物业费' },
        { key: 'property_month_rent', type: 'int', description: '月物业费' },
        { key: 'property_deposit', type: 'int', description: '押金' },
        {
          key: 'room',
          type: '数组',
          description: '房间详细信息的数组',
          explain: [
            { key: 'name', type: 'string', required: true, description: '房间号，名称' },
            { key: 'park_name', type: 'string', required: true, description: '园区名称' },
            { key: 'building_name', type: 'string', required: true, description: '楼宇名称' }
          ]
        },
        // 租户
        // 租客信息
        { key: 'company_name', type: 'string', description: '租客' },
        { key: 'trade', type: 'string', description: '行业' },
        { key: 'representative', type: 'string', description: '法人' },
        { key: 'customer_name', type: 'string', description: '租客信息的签订人和租客信息的联系人' }
      ]
    },
    {
      title: '获取合同信息',
      api: 'assets.contract.get_info',
      business: [
        {
          key: 'contract_code',
          type: 'string',
          required: true,
          description: '合同编号'
        }
      ],
      return: [
        // 合同信息
        { key: 'contract_code', type: 'string', description: '合同编号' }, // XXX公司1
        { key: 'receiver', type: 'string', description: '跟进人' }, // -
        { key: 'manage_area', type: 'numeric', description: '合同租赁数' }, // 100㎡
        { key: 'sign_ts', type: 'timestamp', description: '合同签订日' }, // 2015-10-10
        { key: 'start_ts', type: 'timestamp', description: '合同起租日' }, // 2016-01-01
        { key: 'end_ts', type: 'timestamp', description: '合同失效日' }, // 2017-01-01
        { key: '暂无', type: '', description: '单位保留小数' }, // 2
        { key: '暂无', type: '', description: '计算精度' }, // 精确计算结果保留两位小数
        { key: '暂无', type: '', description: '原合同失效日' }, // -
        { key: '暂无', type: '', description: '合同标签' }, // -

        // 房源信息
        {
          key: 'room',
          type: '数组',
          description: '房间详细信息的数组',
          explain: [
            { key: 'name', type: 'string', required: true, description: '房间号，名称' },
            { key: 'park_name', type: 'string', required: true, description: '园区名称' },
            { key: 'building_name', type: 'string', required: true, description: '楼宇名称' }
          ]
        },
        // 租客信息
        // 租户
        // 租客信息
        { key: 'company_name', type: 'string', description: '租客' },
        { key: 'trade', type: 'string', description: '行业' },
        { key: 'representative', type: 'string', description: '法人' },
        { key: 'customer_name', type: 'string', description: '租客信息的签订人和租客信息的联系人' },
        { key: '暂无', type: '', description: '房源信息' }, // 9001
        { key: '暂无', type: '', description: '租赁数' }, // 360
        // 保证金条款
        //
        { key: '保证金目前只有租金', type: '', description: '保证金类型' }, // 租金保证金
        { key: 'deposit', type: 'numeric', description: '保证金类型' }, // 租金保证金
        // 租期条款
        { key: 'fee_start_ts', type: 'timestamp', description: '开始时间' }, // 2019-11-11
        { key: 'fee_end_ts', type: 'timestamp', description: '结束时间' }, // 2022-11-10
        { key: 'pay_date', type: 'int', description: '付款时间' }, // (工作日)15天
        { key: 'unit_price', type: 'numeric', description: '基础单价' }, // 3元/㎡·天
        { key: 'charge_type', type: 'int', description: '计费类型' }, // 按月计费
        { key: 'tenancy_divide', type: 'int', description: '租期划分方式' }, // 按起始日划分
        { key: '暂无', type: '', description: '天单价换算规则' }, // -
        { key: '暂无', type: '', description: '年天数' }, // 365天
        { key: '暂无', type: '', description: '支付类型' } // 3月一付
      ],
      explain: []
    }
  ]
}
// 进驻模块管理
let enter = {
  title: '进驻模块管理',
  content: [
    {
      title: '获取进驻统计信息',
      api: 'assets.d_company_enter.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json',
          required: true,
          description: `进驻统计列表 例： {"一月":5,"二月":5,"三月":5,"四月":7,"五月":6,"六月":4,"七月":4,"八月":1,"九月":1,"十月":9,"十一月":8,"十二月":9}`
        }
      ],
      explain: []
    },
    {
      title: '获取退驻统计信息',
      api: 'assets.d_company_out.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json',
          required: true,
          description: `退驻统计列表 例： {"一月":5,"二月":5,"三月":5,"四月":7,"五月":6,"六月":4,"七月":4,"八月":1,"九月":1,"十月":9,"十一月":8,"十二月":9}`
        }
      ],
      explain: []
    },
    {
      title: '添加进驻',
      api: 'assets.enter.add',
      business: [
        { key: 'customer_id', type: 'int', description: '客户id' },
        { key: 'start_ts', type: 'timestamp', description: '开始时间' },
        { key: 'end_ts', type: 'timestamp', description: '结束时间' },
        { key: 'state', type: 'int', description: '进驻状态' },
        { key: 'memo', type: 'string', description: '备注' }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改进驻',
      api: 'assets.enter.modify',
      business: [
        { key: 'customer_id', type: 'int', description: '客户id' },
        { key: 'start_ts', type: 'timestamp', description: '开始时间' },
        { key: 'end_ts', type: 'timestamp', description: '结束时间' },
        { key: 'state', type: 'int', description: '进驻状态' },
        { key: 'memo', type: 'string', description: '备注' }
      ],
      return: [],
      explain: []
    },
    {
      title: ' 删除进驻企业',
      api: 'assets.building.remove',
      business: [{ key: 'customer_id', type: 'int', description: '客户id' }],
      return: [],
      explain: []
    },
    {
      title: '获取进驻企业列表',
      api: 'assets.building.get_list',
      business: [
        {
          key: 'page_no',
          type: 'int',
          required: true,
          description: '页码'
        },
        {
          key: 'page_size',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        {
          key: 'park_id',
          type: 'int',
          required: false,
          description: '园区id'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '审批状态'
        },
        {
          key: 'start_ts',
          type: 'timestamp',
          required: false,
          description: '入驻开始时间'
        },
        {
          key: 'end_ts',
          type: 'timestamp',
          required: false,
          description: '入驻结束时间'
        },
        {
          key: 'company_name',
          type: 'string',
          required: false,
          description: '企业名称'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '进驻企业列表'
        }
      ],
      explain: [
        { key: 'park_name', type: 'string', description: '所属园区' },
        { key: 'customer_id', type: 'int', description: '客户id' },
        { key: 'company_name', type: 'string', description: '企业名称' },
        { key: 'company_type', type: 'int', description: '企业类型' },
        { key: 'regist_fund', type: 'numeric', description: '注册资金' },
        { key: 'status', type: 'int', description: '入驻性质' }, // 这里先用企业性质
        { key: 'area', type: 'numeric', description: '入驻面积' }, // 合同的管理面积
        { key: 'room_name', type: 'json数组', description: '房间号数组' },
        { key: 'start_ts', type: 'timestamp', description: '开始时间' },
        { key: 'end_ts', type: 'timestamp', description: '结束时间' },
        { key: 'receiver', type: 'string', description: '跟进人' }, // 客户的跟进人
        { key: 'state', type: 'int', description: '审批状态' }
      ]
    },
    {
      title: '获取进驻企业信息',
      api: 'assets.building.get_info',
      business: [
        { key: 'customer_id', type: 'int', description: '客户id' }
      ],
      return: [
        // 企业信息
        { key: 'company_name', type: 'string', description: '公司名称' },
        { key: 'start_ts', type: 'timestamp', description: '入驻时间' }, // 入驻表
        { key: 'representative', type: 'string', description: '法人代表' },
        { key: 'establish_ts', type: 'timestamp', description: '成立日期' },
        { key: 'company_type', type: 'int', description: '公司类别' },
        { key: 'contacter', type: 'string', description: '联系人' }, // 开票信息的联系人
        { key: 'organiz_code', type: 'string', description: '组织机构代码' },
        { key: 'regist_fund', type: 'numeric', description: '注册资金' },
        { key: 'address', type: 'string', description: '注册地址' },
        { key: 'scope', type: 'int', description: '经营范围' },
        { key: 'memo', type: 'string', description: '备注' },
        // 抬头发票
        { key: 'taxpayer_code', type: '纳税人识别号', description: 'string' },
        { key: 'bank', type: '银行', description: 'string' }, // 开户银行     开票信息
        { key: 'bank_code', type: '银行账号', description: 'string' }, // 账号    开票信息
        { key: 'contact', type: '电话', description: 'string' }, // 联系方式    开票信息
        { key: 'invoice_address', type: '开票地址', description: 'string' }, // 开票地址     开票信息
        // 合同数组
        { key: 'contract_code', type: 'string', description: '合同编号' },
        { key: 'company_name', type: 'string', description: '公司名称' },
        { key: 'contract_start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'contract_end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'unit_price', type: 'int', description: '合同单价' },
        { key: 'unit_value', type: 'int', description: '合同单价的单位' },
        { key: 'state', type: 'int', description: '合同状态' },
        {
          key: 'room',
          type: '数组',
          description: '房间数组',
          explain:
            [
              { key: 'name', type: 'string', description: '房间名' },
              { key: 'area', type: 'numeric', description: '房间面积' }
            ]
        }
      ],
      explain: []
    }
  ]
}
// 合同模板
let htmb = {
  title: '合同模板',
  content: [
    {
      title: '添加合同模板',
      api: 'assets.contract_template.add',
      business: [
        {
          key: '参数名称',
          type: '参数类型',
          required: false,
          description: '参数描述'
        },
        {
          key: 'template_name',
          type: 'string',
          required: false,
          description: '模板名称'
        },
        {
          key: 'template_type',
          type: 'string',
          required: false,
          description: '模板类型'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '模板状态'
        },
        {
          key: 'memo',
          type: 'int',
          required: false,
          description: '模板备注'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '模板文件(使用存储图片的方式)'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改字典模块',
      api: 'assets.contract_template.modify',
      business: [
        { key: 'id', type: 'int', required: true, description: '模板id' },
        {
          key: '参数名称',
          type: '参数类型',
          required: false,
          description: '参数描述'
        },
        {
          key: 'template_name',
          type: 'string',
          required: false,
          description: '模板名称'
        },
        {
          key: 'template_type',
          type: 'string',
          required: false,
          description: '模板类型'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '模板状态'
        },
        {
          key: 'memo',
          type: 'int',
          required: false,
          description: '模板备注'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '模板文件(使用存储图片的方式)'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '删除合同模板',
      api: 'assets.contract_template.remove',
      business: [
        {
          key: 'id',
          type: 'int',
          required: true,
          description: '合同模板id'
        }
      ],
      return: [],
      explain: []
    },
    {
      title: '获取合同模板列表',
      api: 'assets.contract_template.get_list',
      business: [
        { key: 'pageno', type: 'int', required: true, description: '页码' },
        {
          key: 'pagesize',
          type: 'int',
          required: true,
          description: '页面显示行数'
        },
        { key: 'id', type: 'int', required: false, description: '字典id' },
        {
          key: 'template_name',
          type: 'string',
          required: false,
          description: '模板名称'
        },
        {
          key: 'template_type',
          type: 'string',
          required: false,
          description: '模板类型'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '模板状态'
        },
        {
          key: 'memo',
          type: 'int',
          required: false,
          description: '模板备注'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '模板文件(使用存储图片的方式)'
        }
      ],
      return: [
        {
          key: 'list',
          type: 'json array',
          required: true,
          description: '字典id'
        }
      ],
      explain: [
        {
          key: 'template_name',
          type: 'string',
          required: false,
          description: '模板名称'
        },
        {
          key: 'template_type',
          type: 'string',
          required: false,
          description: '模板类型'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '模板状态'
        },
        {
          key: 'memo',
          type: 'int',
          required: false,
          description: '模板备注'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '模板文件(使用存储图片的方式)'
        }
      ]
    },
    {
      title: '获取模板信息',
      api: 'assets.contract_template.get_back',
      business: [
        { key: 'id', type: 'int', required: true, description: '字典ID' }
      ],
      return: [
        {
          key: 'template_name',
          type: 'string',
          required: false,
          description: '模板名称'
        },
        {
          key: 'template_type',
          type: 'string',
          required: false,
          description: '模板类型'
        },
        {
          key: 'state',
          type: 'int',
          required: false,
          description: '模板状态'
        },
        {
          key: 'memo',
          type: 'int',
          required: false,
          description: '模板备注'
        },
        {
          key: 'attached',
          type: 'json',
          required: false,
          description: '模板文件(使用存储图片的方式)'
        }
      ],
      explain: []
    }
  ]
}
// 物业费房租费用等费用的管理
let expense = {
  title: '物业费房租费用等费用的管理',
  content: [
    {
      title: '获取财务管理模块信息',
      api: 'assets.d_expense.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        },
        {
          key: 'type',
          type: 'int',
          required: true,
          description: '类型 包括[1,2,409,410,411,412,413,414]'
        }
      ],
      return: [
        {
          key: 'receive',
          type: 'int',
          required: true,
          description: `已收`
        },
        {
          key: 'need_receive',
          type: 'int',
          required: true,
          description: `应收`
        },
        {
          key: 'receive_rate',
          type: 'decimal',
          required: true,
          description: `已收百分比 `
        },
        {
          key: 'need_receive_rate',
          type: 'decimal',
          required: true,
          description: `应收百分比`
        },
        {
          key: 'receive_num',
          type: 'int',
          required: true,
          description: `已收几笔`
        },
        {
          key: 'need_receive_num',
          type: 'int',
          required: true,
          description: `应收几笔`
        },
        {
          key: 'fee',
          type: 'decimal',
          required: true,
          description: `其他费用/房租费用/物业费用`
        },
        {
          key: 'water_fee',
          type: 'decimal',
          required: true,
          description: `水费`
        },
        {
          key: 'electric_fee',
          type: 'decimal',
          required: true,
          description: `电费`
        },
        {
          key: 'fee_rate',
          type: 'decimal',
          required: true,
          description: `其他百分比`
        },
        {
          key: 'water_fee_rate',
          type: 'decimal',
          required: true,
          description: `水费百分比`
        },
        {
          key: 'electric_fee_rate',
          type: 'decimal',
          required: true,
          description: '电费百分比'
        },
        {
          key: 'un_receive',
          type: 'int',
          required: true,
          description: '未缴'
        },
        {
          key: 'un_receive_rate',
          type: 'decimal',
          required: true,
          description: '未缴百分比'
        },
        {
          key: 'un_receive_num',
          type: 'int',
          required: true,
          description: '未缴几笔'
        }
      ],
      explain: []
    },
    {
      title: '添加费用相关信息',
      api: 'assets.expense.add',
      business: [
        { key: 'contract_code', type: 'string', description: '合同编号' },

        { key: 'type', type: 'int', description: '费用类型' },
        { key: 'bill_money', type: 'numeric', description: '账单金额' },

        { key: 'receive_money', type: 'numeric', description: '实收金额' },
        { key: 'invoice_money', type: 'numeric', description: '开票金额' },

        { key: 'pay_date', type: 'timestamp', description: '应收日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期' },

        { key: 'receiver', type: 'string', description: '跟进人' },

        { key: 'state', type: 'int', description: '结清状态' },

        { key: 'overdue_day', type: 'int', description: '逾期天数' },

        { key: 'memo', type: 'string', description: '备注' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' }
      ],
      return: [],
      explain: []
    },
    {
      title: '修改费用',
      api: 'assets.expense.modify',
      business: [
        { key: 'expense_code', type: 'string', description: '费用code' },

        { key: 'contract_code', type: 'string', description: '合同编号' },

        { key: 'type', type: 'int', description: '费用类型' },
        { key: 'bill_money', type: 'numeric', description: '账单金额' },

        { key: 'receive_money', type: 'numeric', description: '实收金额' },
        { key: 'invoice_money', type: 'numeric', description: '开票金额' },

        { key: 'pay_date', type: 'timestamp', description: '应收日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期' },

        { key: 'receiver', type: 'string', description: '跟进人' },

        { key: 'state', type: 'int', description: '结清状态' },

        { key: 'overdue_day', type: 'int', description: '逾期天数' },

        { key: 'memo', type: 'string', description: '备注' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' }
      ],
      return: [],
      explain: []
    },
    {
      title: ' 删除费用',
      api: 'assets.expense.remove',
      business: [
        { key: 'expense_code', type: 'string', description: '合同编码' }
      ],
      return: [],
      explain: []
    },
    {
      title: '通过园区id获取园区下的获取费用列表',
      api: 'assets.expense.get_list',
      business: [
        { key: 'page_no', type: 'int', required: true, description: '页码' },
        { key: 'page_size', type: 'int', required: true, description: '页面显示行数' },
        { key: 'park_id', type: 'int', required: true, description: '园区的domain_id' },
        { key: 'customer_name', type: 'string', required: false, description: '客户名' },
        { key: 'type', type: 'int', required: false, description: '费用类型' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },
        { key: 'bill_money_floor', type: 'numeric', description: '账单金额下限' },
        { key: 'bill_money_ceil', type: 'numeric', description: '账单金额上限' },
        { key: 'name', type: 'string', required: false, description: '房间号' },
        { key: 'is_overdue', type: 'bool', required: false, description: '是否逾期,true逾期' }
      ],
      return: [
        { key: 'list', type: 'json array', required: true, description: '楼宇列表' }
      ],
      explain: [
        // 这里是企业的相关字段   工商信息
        { key: 'expense_code', type: 'string', description: '费用code' },

        { key: 'contract_code', type: 'string', description: '合同编号' },

        { key: 'type', type: 'int', description: '费用类型' },
        { key: 'bill_money', type: 'numeric', description: '账单金额' },

        { key: 'receive_money', type: 'numeric', description: '实收金额' },
        { key: 'invoice_money', type: 'numeric', description: '开票金额' },

        { key: 'pay_date', type: 'timestamp', description: '应收日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期' },

        { key: 'receiver', type: 'string', description: '跟进人' },

        { key: 'state', type: 'int', description: '结清状态' },

        { key: 'overdue_day', type: 'int', description: '逾期天数' },

        { key: 'memo', type: 'string', description: '备注' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },

        { key: 'customer_name', type: 'string', description: '用户名' },

        {
          key: 'room',
          type: '数组',
          description: '房间详细信息的数组',
          explain: [
            { key: 'name', type: 'string', required: true, description: '房间号，名称' },
            { key: 'park_name', type: 'string', required: true, description: '园区名称' },
            { key: 'building_name', type: 'string', required: true, description: '楼宇名称' }
          ]
        }
      ]
    },
    {
      title: '获取费用信息',
      api: 'assets.expense.get_info',
      business: [
        {
          key: 'expense_code',
          type: 'string',
          required: true,
          description: '费用编号'
        }
      ],
      return: [
        { key: 'expense_code', type: 'string', description: '费用code' },

        { key: 'contract_code', type: 'string', description: '合同编号' },

        { key: 'type', type: 'int', description: '费用类型' },
        { key: 'bill_money', type: 'numeric', description: '账单金额' },

        { key: 'receive_money', type: 'numeric', description: '实收金额' },
        { key: 'invoice_money', type: 'numeric', description: '开票金额' },

        { key: 'pay_date', type: 'timestamp', description: '应收日期' },
        { key: 'pay_cycle', type: 'int', description: '付款周期' },

        { key: 'receiver', type: 'string', description: '跟进人' },

        { key: 'state', type: 'int', description: '结清状态' },

        { key: 'overdue_day', type: 'int', description: '逾期天数' },

        { key: 'memo', type: 'string', description: '备注' },
        { key: 'start_ts', type: 'timestamp', description: '合同开始日期' },
        { key: 'end_ts', type: 'timestamp', description: '合同截至日期' },

        { key: 'customer_name', type: 'string', description: '用户名' },

        {
          key: 'room',
          type: '数组',
          description: '房间详细信息的数组',
          explain: [
            { key: 'name', type: 'string', required: true, description: '房间号，名称' },
            { key: 'park_name', type: 'string', required: true, description: '园区名称' },
            { key: 'building_name', type: 'string', required: true, description: '楼宇名称' }
          ]
        }
      ],
      explain: []
    }
  ]
}
// 工作台
let home = {
  title: '工作台',
  content: [
    {
      title: '获取工作台模块统计信息',
      api: 'assets.d_home.get_info',
      business: [
        {
          key: 'park_id',
          type: 'int',
          required: true,
          description: '园区id'
        }
      ],
      return: [
        {
          key: 'build_area',
          type: 'int',
          required: true,
          description: `建筑面积`
        },
        {
          key: 'total_invest',
          type: 'int',
          required: true,
          description: `总投资`
        },
        {
          key: 'enter_firm',
          type: 'int',
          required: true,
          description: `入驻企业数 `
        },
        {
          key: 'pact_num',
          type: 'int',
          required: true,
          description: `合同数`
        },
        {
          key: 'rent',
          type: 'int',
          required: true,
          description: `房租费用`
        },
        {
          key: 'park_total',
          type: 'int',
          required: true,
          description: `总金额`
        },
        {
          key: 'firm_total',
          type: 'int',
          required: true,
          description: `本月企业入驻总数`
        },
        {
          key: 'service_total',
          type: 'int',
          required: true,
          description: `本月工单总数：service数组中所有数据的总和`
        },
        {
          key: 'tax_total',
          type: 'int',
          required: true,
          description: `本月总税收`
        },
        {
          key: 'pact_total',
          type: 'int',
          required: true,
          description: `本月合同数`
        },
        {
          key: 'parkValue',
          type: '数组',
          required: true,
          description: '园区产值',
          explain: [
            { key: 'rent_value', type: 'int', description: '租金' },
            { key: 'fee_value', type: 'int', description: '物业费' },
            { key: 'else_value', type: 'int', description: '其他' }
          ]
        },
        {
          key: 'firm',
          type: '数组',
          required: true,
          description: '入驻企业生产指标'
        },
        {
          key: 'service',
          type: '数组',
          required: true,
          description: '物业服务指数',
          explain: [
            { key: 'accuse_num', type: 'int', description: '投诉' },
            { key: 'repairs_num', type: 'int', description: '报修' },
            { key: 'pay_urge', type: 'int', description: '催缴' },
            { key: 'pay_closed', type: 'int', description: '已结清' }
          ]
        },
        {
          key: 'pact',
          type: '数组',
          required: true,
          description: '合同及账单'
        },
        {
          key: 'tax',
          type: '数组',
          required: true,
          description: '税收'
        }
      ],
      explain: []
    }
  ]
}

export { sibjc, baoxgl, tousgl, feiycj, kehgl, park, building, floor, room, feiyonglz, caiwusr, zidmkgl, zidgl, contract, enter, htmb, expense, home }
