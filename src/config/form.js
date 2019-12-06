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
          { required: true, message: '该项为必填', trigger: 'blur' }
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
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '园区定位',
        key: 'usage',
        placeholder: '请输入',
        options: [
          {
            label: '互联网',
            value: 1
          },
          {
            label: '招商',
            value: 2
          },
          {
            label: '运营',
            value: 3
          },
          {
            label: '其他',
            value: 4
          }
        ],
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
          {
            label: '在建',
            value: 1
          },
          {
            label: '招商',
            value: 2
          },
          {
            label: '运营',
            value: 3
          },
          {
            label: '其他',
            value: 4
          }
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
          { required: true, message: '请上传图片', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        type: 'input',
        label: '楼宇名称',
        key: 'name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
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
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '所属园区',
        key: 'pid',
        placeholder: '请输入',
        options: [
        ],
        rule: [
          { required: true, message: '请输入', trigger: ['change', 'blur'] }
        ]
      },
      {
        type: 'textarea',
        label: '楼宇描述',
        key: 'memo',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '楼宇图片',
        key: 'attached',
        placeholder: '请输入'
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
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '所属楼层',
        key: 'floor',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
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
        type: 'select',
        label: '状态',
        key: 'state',
        placeholder: '请选择',
        options: [
          {
            label: '在租',
            value: 0
          },
          {
            label: '待招商',
            value: 1
          },
          {
            label: '自用',
            value: 2
          },
          {
            label: '未分配',
            value: 3
          },
          {
            label: '锁定',
            value: 4
          }
        ],
        rule: [
          { required: true, message: '请选择', trigger: 'blur' }
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
          { required: true, message: '该项为必填', trigger: 'blur' }
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
        placeholder: '请输入'
        // rule: [
        //   { required: true, message: '请输入', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ]
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
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '跟进人',
        key: 'receiver',
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '进度阶段',
        key: 'state',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '初次来访',
            value: 0
          }, {
            label: '意向客户',
            value: 1
          }, {
            label: '成交客户',
            value: 2
          }, {
            label: '休眠客户',
            value: 3
          }
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
          {
            label: '互联网',
            value: 0
          }, {
            label: '电商',
            value: 1
          }
        ]
      },
      {
        type: 'date-picker',
        label: '来访时间',
        key: 'create_ts',
        placeholder: '请选择来访时间',
        rule: [
          { required: true, message: '请选择来访时间', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '客户来源',
        key: 'info_source',
        placeholder: '请选择客户来源',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '上门',
            value: 0
          }, {
            label: '官网',
            value: 1
          }
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        key: 'email',
        placeholder: '请输入邮箱',
        rule: [
          // { required: true, message: '请输入租客名称', trigger: 'blur' },
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
    title: '房源信息',
    span: 24,
    children: [
      {
        type: 'select',
        label: '需求面积',
        key: 'demand_area',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            value: 1,
            label: '100㎡以内'
          }, {
            value: 2,
            label: '100-200㎡'
          }, {
            value: 3,
            label: '200-300㎡'
          }, {
            value: 4,
            label: '300㎡以上'
          }
        ]
      },
      {
        type: 'select',
        label: '需求工位',
        key: 'work_station',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            value: 1,
            label: '1-20个'
          }, {
            value: 2,
            label: '21-50个'
          }, {
            value: 3,
            label: '51-100个'
          }, {
            value: 4,
            label: '100个以上'
          }
        ]
      },
      {
        type: 'date-picker',
        label: '预计签约时间',
        key: 'demand_ts',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
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
        options: [{
          value: 1,
          label: '梦想小镇',
          children: [{
            value: 2,
            label: '1幢',
            children: [
              { value: 3, label: '101' },
              { value: 4, label: '201' },
              { value: 5, label: '205' }
            ]
          }, {
            value: 7,
            label: '3幢',
            children: [
              { value: 8, label: '101' },
              { value: 9, label: '103' },
              { value: 10, label: '503' }
            ]
          }, {
            value: 12,
            label: '8幢',
            children: [
              { value: 13, label: '202' },
              { value: 14, label: '503' },
              { value: 15, label: '603' }
            ]
          }]
        }, {
          value: 17,
          label: '人工智能小镇',
          children: [{
            value: 18,
            label: '16幢',
            children: [
              { value: 19, label: '501' },
              { value: 20, label: '505' }
            ]
          }, {
            value: 21,
            label: '19幢',
            children: [
              { value: 22, label: '103' },
              { value: 23, label: '105' }
            ]
          }]
        }]
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
        type: 'select',
        label: '客户业态',
        key: 'business_format',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '商业',
            value: 1
          }, {
            label: '商业',
            value: 2
          }
        ]
      },
      {
        type: 'input',
        label: '跟进商务',
        key: 'follow_business',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '合同类型',
        key: 'contract_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '租房合同模板',
            value: 1
          }, {
            label: '车位合同模板',
            value: 2
          }
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
        multiple: true, // 是否多选
        key: 'room',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: []
      }
    ]
  },
  {
    title: '租户信息',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'input',
        label: '品牌名称',
        key: 'brand',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '经营范围',
        key: 'scope',
        placeholder: '请输入',
        options: [
          {
            label: '互联网',
            value: 1
          }, {
            label: '金融',
            value: 2
          }
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
        label: '联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系邮箱',
        key: 'email',
        placeholder: '请输入',
        rule: [
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '账号',
        key: 'bank_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'taxpayer_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '开票地址',
        key: 'invoice_address',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'taxpayer_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册号',
        key: 'regist_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '组织机构代码',
        key: 'organiz_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '法定代表人',
        key: 'representative',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '国籍',
        key: 'nationality',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '注册资本/万',
        key: 'regist_fund',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '经营状态',
        key: 'operate_state',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '成立日期',
        key: 'establish_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '公司类型',
        key: 'company_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }, {
        type: 'input-num',
        label: '人员规模',
        key: 'staff_size',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '营业期限',
        key: 'operate_term',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '登记机关',
        key: 'issuance',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '核准日期',
        key: 'authentic_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '英文名',
        key: 'en_name',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属地区',
        key: 'region',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属行业',
        key: 'trade',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册地址',
        key: 'address',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
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
        type: 'date-picker',
        label: '计租时间',
        key: 'fee_start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'fee_end_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'input-num',
        label: '押金设置(元)',
        key: 'deposit',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '租期划分',
        key: 'tenancy_divide',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '按起始日划分',
            value: 1
          }, {
            label: '商业',
            value: 2
          }
        ]
      },
      {
        type: 'input-num',
        label: '付款周期(月)',
        key: 'pay_cycle',
        placeholder: '几月一付',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '收款日',
        key: 'pay_date',
        placeholder: '每月收款日',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '提前收租(月)',
        key: 'prepaid',
        placeholder: '提前几个月收租金',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '计费类型',
        key: 'charge_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '按实际天数计费',
            value: 1
          }, {
            label: '车位合同模板',
            value: 2
          }
        ]
      }
    ]
  },
  {
    title: '房源租期条款',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'date-picker',
        label: '开始时间',
        key: 'fee_start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'fee_end_ts',
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
        label: '月租金',
        key: 'month_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
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
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费时间',
        key: 'property_fee_start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'property_fee_end_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
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
        label: '付款周期(月)',
        key: 'property_pay_cycle',
        placeholder: '几月一付',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '收款日',
        key: 'property_pay_date',
        placeholder: '请输入',
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
      }
    ]
  },
  {
    title: '物业费条款',
    span: 24,
    itemSpan: 8,
    minHeight: 150,
    padding: '0 10px 0',
    margin: '',
    children: [
      {
        type: 'date-picker',
        label: '开始时间',
        key: 'property_start_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      {
        type: 'date-picker',
        label: '结束时间',
        key: 'property_end_ts',
        placeholder: '请选择日期',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
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
        label: '月物业费',
        key: 'property_month_rent',
        placeholder: '请输入',
        rule: [
          { required: true, message: '该项为必填', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    ]
  }
]
// 合同模板
const tamplateForm = [
  {
    type: 'select',
    label: '模板类型',
    key: 'tamplate',
    placeholder: '请输入',
    rule: [
      { required: true, message: '请选择', trigger: 'change' }
    ],
    options: [
      {
        label: '房屋租赁',
        value: 's1'
      }, {
        label: '物业保洁',
        value: 's2'
      }, {
        label: '花木租赁',
        value: 's3'
      }, {
        label: '场地租赁',
        value: 's4'
      }, {
        label: '设备租赁',
        value: 's5'
      }, {
        label: '其他',
        value: 's6'
      }
    ]
  }, {
    type: 'input',
    label: '模板名称',
    key: 'i',
    placeholder: '请输入',
    rule: [
      { required: true, message: '请输入模板名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }, {
    type: 'textarea',
    label: '模板描述',
    key: 'i11',
    placeholder: '请输入模板描述',
    rule: [
      { required: true, message: '请输入模板描述', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }, {
    type: 'upload',
    label: '模板描述',
    key: 'i11',
    placeholder: '请输入模板描述',
    rule: [
      { required: true, message: '请输入模板描述', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]
  }
]

/* -------------------- 企业进退驻 -------------------- */
// 进驻管理
const applyForm = [
  {
    title: '客户信息',
    span: 12,
    minHeight: 450,
    children: [
      {
        type: 'input',
        label: '租客名称',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '证件号码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '行业分类',
        key: 'tamplate',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '租客编码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '账号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '开票地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'checkbox',
        label: '标签选择',
        key: 'c',
        options: [
          {
            label: '美食',
            value: 'vdd1'
          }, {
            label: '美食美食',
            value: 'vdd2'
          }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '组织机构代码',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '法定代表人',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '国籍',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册资本/万',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营状态',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }, {
        type: 'input',
        label: '人员规模',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '营业期限',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '登记机关',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '核准日期',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '英文名',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属地区',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属行业',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营范围',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        label: '租客名称',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '证件号码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'select',
        label: '行业分类',
        key: 'tamplate',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '租客编码',
        key: 'i',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '账号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '电话',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '开票地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'checkbox',
        label: '标签选择',
        key: 'c',
        options: [
          {
            label: '美食',
            value: 'vdd1'
          }, {
            label: '美食美食',
            value: 'vdd2'
          }
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '纳税人识别号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册号',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '组织机构代码',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '法定代表人',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '国籍',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册资本/万',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营状态',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
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
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }, {
        type: 'input',
        label: '人员规模',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '营业期限',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '登记机关',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '核准日期',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '英文名',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属地区',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '所属行业',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '注册地址',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '经营范围',
        key: 'tenantName',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' },
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
        type: 'input',
        label: '租客名称',
        key: 'customer',
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '发起人',
        key: 'originator',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '联系电话',
        key: 'contact',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '预约服务时间',
        key: 'reserve_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'textarea',
        label: '描述',
        key: 'describe',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'upload-img',
        label: '图片',
        key: 'attached',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入合同编号', trigger: 'blur' }
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
// 投诉管理
const complaintForm = [
  {
    title: '工单信息',
    children: [
      {
        type: 'input',
        label: '租客名称',
        key: 'customer',
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
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
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
// 费用催缴
const paymentForm = [
  {
    title: '账单',
    children: [
      {
        type: 'input',
        label: '关联合同',
        key: 'contract_code',
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
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '联系人',
        key: 'contacter',
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
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
          {
            label: '物业',
            value: 1
          }, {
            label: '车位',
            value: 2
          }
        ]
      },
      {
        type: 'select',
        label: '币种',
        key: 'currency',
        placeholder: '请选择',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '人民币',
            value: 1
          }, {
            label: '美元',
            value: 2
          }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期',
        key: 'start_ts',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期',
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
          {
            label: '合同1',
            value: 'C8B3454C-2D50-0001-683B-EAD0F000A030'
          }, {
            label: '合同2',
            value: 2
          }
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
        type: 'select',
        label: '列支方向',
        key: 'log_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        options: [
          {
            label: '收款',
            value: 1
          }, {
            label: '付款',
            value: 2
          }
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
          {
            label: '已缴',
            value: 1
          }, {
            label: '未缴',
            value: 2
          }
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
        label: '客户',
        key: 'customer',
        placeholder: '请输入租客名称',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      {
        type: 'input-num',
        label: '金额',
        key: 'costi',
        placeholder: '请输入金额',
        rule: [
          { required: true, message: '请输入租客名称', trigger: 'blur' }
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
          {
            label: '水费',
            value: 1
          }, {
            label: '电费',
            value: 2
          }
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
        type: 'input',
        label: '关联合同',
        key: 'contract_code',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '美食',
            value: 1
          }, {
            label: '美食美食',
            value: 2
          }
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
        type: 'select',
        label: '费用类型',
        key: 'charge_type',
        placeholder: '请输入',
        rule: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        options: [
          {
            label: '物业',
            value: 1
          }, {
            label: '房租',
            value: 2
          }
        ]
      },
      {
        type: 'date-picker',
        label: '计费周期开始',
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
  incomeForm
}
export {
  forms
}
