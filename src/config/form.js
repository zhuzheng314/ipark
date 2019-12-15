import store from '../store/index'

const validateUpload = (rule, value, callback) => {
  if (!value.upload || !value.upload.length) {
    callback(new Error('该项为必填'))
  } else {
    callback()
  }
}

const validateContractName = (rule, value, callback) => {
  store.dispatch(
    'validateContractName',
    { check_contract_code: value }).then(res => {
    if (res.list.length && value === '') {
      callback(new Error('该项为必填'))
    } else if (res.list.length) {
      callback(new Error('该编号已存在'))
    } else {
      callback()
    }
  })
}
const validateParkName = (rule, value, callback) => {
  return store.dispatch(
    'validateParkName',
    { check_name: value }).then(res => {
    if (res.list.length && value === '') {
      callback(new Error('该项为必填'))
    } else if (res.list.length) {
      callback(new Error('该名称已存在'))
    } else {
      callback()
    }
  })
}
const validateBuildName = (rule, value, callback) => {
  return store.dispatch(
    'validateBuildName',
    { check_name: value }).then(res => {
    if (res.list.length && value === '') {
      callback(new Error('该项为必填'))
    } else if (res.list.length) {
      callback(new Error('该名称已存在'))
    } else {
      callback()
    }
  })
}

/* -------------------- 园区 -------------------- */
// 添加园区
const addParkForm = [
  {
    title: '园区信息',
    children: [
      {
        type: 'input',
        label: '园区名称',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateParkName, trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'input',
        label: '园区地址',
        key: 'address',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '产权',
        key: 'capital',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '建筑面积(㎡)',
        key: 'built_area',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '占地面积(㎡)',
        key: 'cover_area',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '总投资:万元',
        key: 'total_invest',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '实际投资:万元',
        key: 'actual_invest',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属物业',
        key: 'property',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '园区联系人',
        key: 'contacter',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '园区联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'select',
        label: '园区定位',
        key: 'usage',
        placeholder: '请输入',
        // options: [
        //   {
        //     label: '互联网',
        //     value: 366
        //   },
        //   {
        //     label: '招商',
        //     value: 367
        //   },
        //   {
        //     label: '运营',
        //     value: 284
        //   },
        //   {
        //     label: '其他',
        //     value: 285
        //   }
        // ],
        options: [],
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '园区状态',
        key: 'state',
        placeholder: '请输入',
        options: [
        ],
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '园区描述',
        key: 'detail',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '园区图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  }
]
const addParkForm1 = [
  {
    title: '园区信息',
    children: [
      {
        type: 'input',
        label: '园区名称',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateParkName, trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'upload-img',
        label: '园区图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  }
]
// 添加楼宇
const addBuildForm = [
  {
    title: '楼宇信息',
    children: [
      {
        type: 'select',
        label: '所属园区',
        key: 'pid',
        placeholder: '请输入',
        options: [
        ],
        rule: [
          { required: true, message: '该项为必填', trigger: ['change', 'blur'] }
        ]
      },
      {
        type: 'input',
        label: '楼宇名称',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateBuildName, trigger: ['blur', 'change'] }
        ]
      },
      {
        type: 'input-num',
        label: '建筑面积',
        key: 'area',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '可出租面积',
        key: 'rent_area',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '楼宇描述',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '楼宇图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  }
]
// 添加房间
const addRoomForm = [
  {
    title: '房间信息',
    children: [
      {
        type: 'select',
        label: '所属楼宇',
        key: 'pid',
        placeholder: '请选择',
        options: [],
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '所属楼层',
        key: 'floor',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '房间号',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '面积',
        key: 'area',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '地址',
        key: 'address',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '状态',
        key: 'state',
        placeholder: '请选择',
        options: [
          // {
          //   label: '在租',
          //   value: 0
          // },
          // {
          //   label: '待招商',
          //   value: 1
          // },
          // {
          //   label: '自用',
          //   value: 2
          // },
          // {
          //   label: '未分配',
          //   value: 3
          // },
          // {
          //   label: '锁定',
          //   value: 4
          // }
        ],
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      // {
      //   type: 'switch',
      //   label: '是否可租',
      //   key: 'is_rentable'
      // },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'textarea',
        label: '房间描述',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '房间图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  }
]
/* -------------------- 招商管理 -------------------- */
// 新增客户
const addCustomerForm = [
  {
    title: '客户信息',
    span: 24,
    // minHeight: 500,
    children: [
      {
        type: 'input',
        label: '客户(企业名称)',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系方式',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'receiver',
        placeholder: '请输入企业名称',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '进度阶段',
        key: 'state',
        placeholder: '请选择',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '初次来访',
          //   value: 0
          // }, {
          //   label: '意向客户',
          //   value: 1
          // }, {
          //   label: '成交客户',
          //   value: 2
          // }, {
          //   label: '休眠客户',
          //   value: 3
          // }
        ]
      },
      {
        type: 'select',
        label: '行业',
        key: 'status',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '互联网',
          //   value: 0
          // }, {
          //   label: '电商',
          //   value: 1
          // }
        ]
      },
      {
        type: 'date-picker',
        label: '来访时间',
        key: 'create_ts',
        placeholder: '请选择来访时间',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '客户来源',
        key: 'info_source',
        placeholder: '请选择客户来源',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '上门',
          //   value: 0
          // }, {
          //   label: '官网',
          //   value: 1
          // }
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        key: 'email',
        placeholder: '请输入邮箱',
        rule: [
          // { required: true, message: '请输入企业名称', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '备注',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  },
  {
    title: '意向房源',
    span: 24,
    children: [
      {
        type: 'select',
        label: '需求面积',
        key: 'demand_area',
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   value: 1,
          //   label: '100㎡以内'
          // }, {
          //   value: 2,
          //   label: '100-200㎡'
          // }, {
          //   value: 3,
          //   label: '200-300㎡'
          // }, {
          //   value: 4,
          //   label: '300㎡以上'
          // }
        ]
      },
      {
        type: 'select',
        label: '需求工位',
        key: 'work_station',
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   value: 1,
          //   label: '1-20个'
          // }, {
          //   value: 2,
          //   label: '21-50个'
          // }, {
          //   value: 3,
          //   label: '51-100个'
          // }, {
          //   value: 4,
          //   label: '100个以上'
          // }
        ]
      },
      {
        type: 'date-picker',
        label: '预计签约时间',
        key: 'demand_ts',
        placeholder: '请选择',
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'cascader',
        label: '房源信息',
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      }
    ]
  }
]

/* -------------------- 合同管理 -------------------- */
// 新增合同
const addContractForm = [
  {
    title: '合同基础信息',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'input',
        label: '合同编号',
        key: 'contract_code',
        placeholder: '请输入合同编号',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { validator: validateContractName, trigger: ['blur', 'change'] }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '客户',
        key: 'customer_id',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input',
        label: '跟进商务',
        key: 'follow_business',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '合同类型',
        key: 'contract_type',
        placeholder: '请选择合同类型',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '合同状态',
        key: 'state',
        placeholder: '请选择',
        options: [
          // {
          //   label: '互联网',
          //   value: 1
          // }, {
          //   label: '金融',
          //   value: 2
          // }
        ]
      }
    ]
  },
  {
    title: '房源信息',
    span: 24,
    itemSpan: 12,
    children: [
      {
        type: 'cascader',
        label: '房源信息',
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: []
      }
    ]
  },
  // {
  //   title: '房源租期条款',
  //   span: 24,
  //   itemSpan: 8,
  //   minHeight: 150,
  //   padding: '0 10px 0',
  //   margin: '',
  //   children: [
  //   ]
  // },
  // {
  //   title: '租户信息',
  //   span: 24,
  //   itemSpan: 8,
  //   minHeight: 150,
  //   padding: '0 10px 0',
  //   margin: '',
  //   children: [
  //     {
  //       type: 'input',
  //       label: '品牌名称',
  //       key: 'brand',
  //       placeholder: '请输入',
  //       rule: [
  //         { required: true, message: '该项为必填', trigger: 'blur' }
  //         // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //       ]
  //     },
  //     {
  //       type: 'select',
  //       label: '经营范围',
  //       key: 'scope',
  //       placeholder: '请输入',
  //       options: [
  //       ]
  //     },
  //     {
  //       type: 'input',
  //       label: '联系人',
  //       key: 'contacter',
  //       placeholder: '请输入',
  //       rule: [
  //         { required: true, message: '请输入', trigger: 'blur' }
  //         // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //       ]
  //     },
  //     {
  //       type: 'input',
  //       label: '联系电话',
  //       key: 'contact',
  //       placeholder: '请输入',
  //       rule: [
  //         { required: true, message: '请输入', trigger: 'blur' },
  //         { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
  //       ]
  //     },
  //     {
  //       type: 'input',
  //       label: '联系邮箱',
  //       key: 'email',
  //       placeholder: '请输入',
  //       rule: [
  //         // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //       ]
  //     }
  //   ]
  // },
  {
    title: '联系方式',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'input',
        label: '联系邮箱',
        key: 'email',
        placeholder: '请输入',
        rule: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    ]
  },
  {
    title: '开票信息',
    span: 24,
    itemSpan: 8,
    children: [
      {
        type: 'input',
        label: '开户银行',
        key: 'bank',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '账号',
        key: 'bank_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'taxpayer_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '开票地址',
        key: 'invoice_address',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  },
  {
    title: '工商信息',
    span: 24,
    itemSpan: 8,
    children: [
      {
        type: 'input',
        label: '统一社会信用代码',
        key: 'social_credit_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'taxpayer_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册号',
        key: 'regist_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '组织机构代码',
        key: 'organiz_code',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '法定代表人',
        key: 'representative',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // {
      //   type: 'input',
      //   label: '国籍',
      //   key: 'nationality',
      //   placeholder: '请输入',
      //   rule: [
      //     { required: true, message: '该项为必填', trigger: 'blur' }
      //     // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ]
      // },
      {
        type: 'input-num',
        label: '注册资本/万',
        key: 'regist_fund',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '经营状态',
        key: 'operate_state',
        placeholder: '请选择',
        options: [
        ]
      },
      {
        type: 'date-picker',
        label: '成立日期',
        key: 'establish_ts',
        placeholder: '请选择日期',
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'select',
        label: '公司类型',
        key: 'company_type',
        placeholder: '请选择',
        options: [
        ]
      }, {
        type: 'select',
        label: '人员规模',
        key: 'staff_size',
        placeholder: '请输入',
        options: [
        ]
      },
      {
        type: 'date-picker',
        label: '营业期限',
        key: 'operate_term',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '登记机关',
        key: 'issuance',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '核准日期',
        key: 'authentic_ts',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '英文名',
        key: 'en_name',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属地区',
        key: 'region',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '所属行业',
        key: 'trade',
        placeholder: '请输入',
        options: [
        ]
      },
      {
        type: 'input',
        label: '注册地址',
        key: 'address',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  },
  {
    title: '合同基础条款',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'input-num',
        label: '租赁面积',
        key: 'rent_area',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '押金设置(元)',
        key: 'deposit',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '签订时间',
        key: 'sign_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '合同单价(元/㎡·天)',
        key: 'unit_price',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '月租金',
        key: 'month_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '年租金',
        key: 'year_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '付款周期(月)',
        key: 'pay_cycle',
        placeholder: '几月一付',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '提前收租(月)',
        key: 'prepaid',
        placeholder: '提前几个月收租金',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '收款日',
        key: 'pay_date',
        placeholder: '每月收款日',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '计租时间',
        key: 'start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'end_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ]
      }
      // {
      //   type: 'select',
      //   label: '租期划分',
      //   key: 'tenancy_divide',
      //   placeholder: '请输入',
      //   rule: [
      //     { required: true, message: '请选择', trigger: 'change' }
      //   ],
      //   options: [
      //   ]
      // },
      // {
      //   type: 'select',
      //   label: '计费类型',
      //   key: 'charge_type',
      //   placeholder: '请输入',
      //   rule: [
      //     { required: true, message: '请选择', trigger: 'change' }
      //   ],
      //   options: [
      //   ]
      // }
    ]
  },
  {
    title: '物业费基础条款',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'input-num',
        label: '管理面积',
        key: 'manage_area',
        placeholder: '请输入',
        rule: [
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '签订时间',
        key: 'property_sign_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '押金(元)',
        key: 'property_deposit',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '合同单价(元/㎡·天)',
        key: 'property_unit_price',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '月物业费',
        key: 'property_month_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '年物业费',
        key: 'property_year_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '付款周期(月)',
        key: 'property_pay_cycle',
        placeholder: '几月一付',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '提前收费(月)',
        key: 'property_prepaid',
        placeholder: '提前几个月收物业费',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '收款日',
        key: 'property_pay_date',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费时间',
        key: 'property_fee_start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'property_fee_end_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ]
      }
    ]
  }
  // {
  //   title: '物业费条款',
  //   span: 24,
  //   itemSpan: 8,
  //   minHeight: 150,
  //   padding: '0 10px 0',
  //   margin: '',
  //   children: [
  //   ]
  // }
]
// 合同模板
const tamplateForm = [
  {
    title: '模板类型',
    children: [
      {
        type: 'select',
        label: '模板类型',
        key: 'template_type',
        placeholder: '请输入',
        options: [
        ]
      },
      // {
      //   type: 'select',
      //   label: '模板状态',
      //   key: 'state',
      //   placeholder: '请选择',
      //   rule: [
      //     { required: true, message: '请选择', trigger: 'change' }
      //   ],
      //   options: [
      //     {
      //       label: '启用',
      //       value: 0
      //     },
      //     {
      //       label: '未启用',
      //       value: 1
      //     }
      //   ]
      // },
      {
        type: 'input',
        label: '模板名称',
        key: 'template_name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '模板描述',
        key: 'memo',
        placeholder: '请输入模板描述',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-file',
        label: '模板文件',
        key: 'attached',
        placeholder: '请输入模板描述',
        rule: [
          { required: true, message: '请上传', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  }
]

/* -------------------- 企业进退驻 -------------------- */
// 进驻管理
const applyForm = [
  {
    title: '基本信息',
    span: 24,
    minHeight: 450,
    children: [
      {
        type: 'select',
        label: '合同编号',
        key: 'contract_code',
        placeholder: '请选择合同编号',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'date-picker',
        label: '开始时间',
        key: 'start_ts',
        placeholder: '请选择开始时间',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'end_ts',
        placeholder: '请选择结束时间',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '进驻状态',
        key: 'state',
        placeholder: '请选择进驻状态',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '未进驻',
          //   value: 1
          // }, {
          //   label: '已进驻',
          //   value: 2
          // }
        ]
      },
      {
        type: 'textarea',
        label: '备注',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }
]
// 退驻管理
const leaveForm = [
  {
    title: '客户信息',
    span: 12,
    minHeight: 450,
    children: [
      {
        type: 'input',
        label: '企业名称',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '证件号码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '行业分类',
        key: 'tamplate',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
          {
            label: '美食',
            value: 's1'
          }, {
            label: '美食美食',
            value: 's2'
          }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '企业编码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }, {
    title: '开票信息',
    span: 12,
    minHeight: 450,
    children: [
      {
        type: 'input',
        label: '开户银行',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '账号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '开票地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'checkbox',
        label: '标签选择',
        key: 'c',
        options: [
          // {
          //   label: '美食',
          //   value: 'vdd1'
          // }, {
          //   label: '美食美食',
          //   value: 'vdd2'
          // }
        ]
      }
    ]
  },
  {
    title: '工商信息',
    span: 24,
    itemSpan: 12,
    children: [
      {
        type: 'input',
        label: '统一社会信用代码',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '组织机构代码',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '法定代表人',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '国籍',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册资本/万',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营状态',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '成立日期',
        key: 'date3',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input',
        label: '公司类型',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }, {
        type: 'input',
        label: '人员规模',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '营业期限',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '登记机关',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '核准日期',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '英文名',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属地区',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属行业',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营范围',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }
]

/* -------------------- 物业服务 -------------------- */
// 报修管理
const repairForm = [
  {
    title: '工单信息',
    children: [
      {
        type: 'select',
        label: '客户',
        key: 'customer_id',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input',
        label: '发起人',
        key: 'originator',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'date-picker',
        label: '预约服务时间',
        key: 'reserve_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '工单状态',
        key: 'repair_state',
        placeholder: '请选择',
        options: []
      },
      {
        type: 'textarea',
        label: '描述',
        key: 'describe',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入报修详情', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请上传图片', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  },
  {
    title: '房源信息',
    children: [
      {
        type: 'cascader',
        label: '房源信息',
        key: 'domain_id',
        multiple: false, // 是否多选
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      }
    ]
  }
]
// 投诉管理
const complaintForm = [
  {
    title: '工单信息',
    children: [
      {
        type: 'select',
        label: '客户',
        key: 'customer_id',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input',
        label: '发起人',
        key: 'originator',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '手机号码格式错误' }
        ]
      },
      {
        type: 'date-picker',
        label: '预约服务时间',
        key: 'reserve_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择时间', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '工单状态',
        key: 'complaint_state',
        placeholder: '请选择',
        options: []
      },
      {
        type: 'textarea',
        label: '描述',
        key: 'describe',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请上传图片', trigger: 'blur' },
          { validator: validateUpload, trigger: ['blur', 'change'] }
        ]
      }
    ]
  },
  {
    title: '房源信息',
    children: [
      {
        type: 'cascader',
        label: '房源信息',
        key: 'domain_id',
        multiple: false, // 是否多选
        rule: [
          // { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      }
    ]
  }
]
// 费用催缴
const paymentForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'input',
        label: '付款方',
        key: 'payer',
        placeholder: '请输入企业名称',
        rule: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入企业名称',
        rule: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '物业',
          //   value: 1
          // }, {
          //   label: '车位',
          //   value: 2
          // }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期开始',
        key: 'start_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期结束',
        key: 'end_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '备注',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  },
  {
    title: '房源信息',
    children: [
      {
        type: 'cascader',
        label: '房源信息',
        key: 'domain_id',
        multiple: false, // 是否多选
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      }
    ]
  }
]

/* -------------------- 财务管理 -------------------- */
// 费用列支
const financialForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '客户',
        key: 'customer_id',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input',
        label: '付款方',
        key: 'payer',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '列支方向',
        key: 'log_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        options: [
          // {
          //   label: '收款',
          //   value: 1
          // }, {
          //   label: '付款',
          //   value: 2
          // }
        ]
      },
      {
        type: 'select',
        label: '状态',
        key: 'state',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入联系人',
        rule: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'receiver',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '金额',
        key: 'cost',
        placeholder: '请输入金额',
        rule: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '开始时间',
        key: 'start_ts',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'end_ts',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'cost_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '水费',
          //   value: 1
          // }, {
          //   label: '电费',
          //   value: 2
          // }
        ]
      },
      // {
      //   type: 'date-picker-range',
      //   label: '计费周期',
      //   key: 'fr',
      //   placeholder: '请输入',
      //   rule: [
      //     { required: true, message: '请输入', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ]
      // },
      {
        type: 'textarea',
        label: '备注',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }
]
// 财务收入
const incomeForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '状态',
        key: 'state',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'input',
        label: '付款方',
        key: 'payer',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '费用金额',
        key: 'charge',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'receiver',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'charge_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '物业',
          //   value: 1
          // }, {
          //   label: '房租',
          //   value: 2
          // }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期开始',
        placeholder: '请输入',
        key: 'start_ts',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期结束',
        key: 'end_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '备注',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }
  // {
  //   title: '房源信息',
  //   children: [
  //     {
  //       type: 'cascader',
  //       label: '房源信息',
  //       key: 'rooms',
  //       rule: [
  //         { required: true, message: '请选择', trigger: 'change' }
  //       ],
  //       options: []
  //     }
  //   ]
  // }
]
// 房租费用
const expenseForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请选择关联合同',
        rule: [
          { required: true, message: '请选择关联合同', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'type',
        placeholder: '请选择费用类型',
        rule: [
          { required: true, message: '请选择费用类型', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'input-num',
        label: '账单金额',
        key: 'bill_money',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '实收金额',
        key: 'receive_money',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '开票金额',
        key: 'invoice_money',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '应收日期',
        key: 'pay_date',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期开始',
        key: 'start_ts',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期结束',
        key: 'end_ts',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '逾期天数',
        key: 'overdue_day',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'receiver',
        placeholder: '请输入跟进人名称',
        rule: [
          { required: true, message: '请输入跟进人名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '结清状态',
        key: 'state',
        placeholder: '请选结清状态',
        rule: [
          { required: true, message: '请选择结清状态', trigger: 'change' }
        ],
        options: [
          // {
          //   label: '未结清',
          //   value: 0
          // },
          // {
          //   label: '已结清',
          //   value: 1
          // }
        ]
      }
    ]
  }
]
// 物业费用
const propertyForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请选择关联合同',
        rule: [
          { required: true, message: '请选择关联合同', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '客户名称',
        key: 'name',
        placeholder: '请选择客户名称',
        rule: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'cascader',
        label: '房源信息',
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input-num',
        label: '账单金额',
        key: 'a',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '实收金额',
        key: 'b',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '开票金额',
        key: 'c',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '应收日期',
        key: 'd',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期',
        key: 'e',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '逾期天数',
        key: 'f',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'g',
        placeholder: '请输入跟进人名称',
        rule: [
          { required: true, message: '请输入跟进人名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '结清状态',
        key: 'h',
        placeholder: '请选结清状态',
        rule: [
          { required: true, message: '请选择结清状态', trigger: 'change' }
        ],
        options: [
          {
            label: '未结清',
            value: 0
          },
          {
            label: '已结清',
            value: 1
          }
        ]
      }
    ]
  }
]
// 水电费用
const waterForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请选择关联合同',
        rule: [
          { required: true, message: '请选择关联合同', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '客户名称',
        key: 'name',
        placeholder: '请选择客户名称',
        rule: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'type',
        placeholder: '请选择费用类型',
        rule: [
          { required: true, message: '请选择费用类型', trigger: 'change' }
        ],
        options: [
          {
            label: '水费',
            value: 0
          },
          {
            label: '电费',
            value: 1
          }
        ]
      },
      {
        type: 'cascader',
        label: '房源信息',
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input-num',
        label: '账单金额',
        key: 'a',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '实收金额',
        key: 'b',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '开票金额',
        key: 'c',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '应收日期',
        key: 'd',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期',
        key: 'e',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '逾期天数',
        key: 'f',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'g',
        placeholder: '请输入跟进人名称',
        rule: [
          { required: true, message: '请输入跟进人名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '结清状态',
        key: 'h',
        placeholder: '请选结清状态',
        rule: [
          { required: true, message: '请选择结清状态', trigger: 'change' }
        ],
        options: [
          {
            label: '未结清',
            value: 0
          },
          {
            label: '已结清',
            value: 1
          }
        ]
      }
    ]
  }
]
// 其他费用
const otherForm = [
  {
    title: '账单',
    children: [
      {
        type: 'select',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请选择关联合同',
        rule: [
          { required: true, message: '请选择关联合同', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '客户名称',
        key: 'name',
        placeholder: '请选择客户名称',
        rule: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        options: [
        ]
      },
      {
        type: 'select',
        label: '费用类型',
        key: 'type',
        placeholder: '请选择费用类型',
        rule: [
          { required: true, message: '请选择费用类型', trigger: 'change' }
        ],
        options: [
          {
            label: '花卉租赁',
            value: 0
          },
          {
            label: '花卉租赁',
            value: 1
          },
          {
            label: '场地租赁',
            value: 2
          },
          {
            label: '人员租赁',
            value: 3
          }
        ]
      },
      {
        type: 'cascader',
        label: '房源信息',
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      },
      {
        type: 'input-num',
        label: '账单金额',
        key: 'a',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '实收金额',
        key: 'b',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '开票金额',
        key: 'c',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '应收日期',
        key: 'd',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期',
        key: 'e',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '逾期天数',
        key: 'f',
        placeholder: '请输入',
        rule: [
          // { required: true, message: '请输入', trigger: 'change' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'g',
        placeholder: '请输入跟进人名称',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '结清状态',
        key: 'h',
        placeholder: '请选结清状态',
        rule: [
          { required: true, message: '该项为必填', trigger: 'change' }
        ],
        options: [
          {
            label: '未结清',
            value: 0
          },
          {
            label: '已结清',
            value: 1
          }
        ]
      }
    ]
  }
]

const forms = {
  addParkForm,
  addBuildForm,
  addRoomForm,
  addCustomerForm,
  addContractForm,
  tamplateForm,
  applyForm,
  leaveForm,
  repairForm,
  complaintForm,
  paymentForm,
  financialForm,
  incomeForm,
  expenseForm
}
export {
  forms
}
