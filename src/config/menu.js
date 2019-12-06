const menuList = [
  {
    name: '资产管理',
    icon: '\ue64c',
    children: [
      // {
      //   name: '园区管理',
      //   icon: '',
      //   path: '/Park/assetInfo'
      // },
      {
        name: '园区',
        icon: '',
        path: '/park/park'
      },
      {
        name: '楼宇',
        icon: '',
        path: '/park/build'
      }
    ]
  },
  {
    name: '招商管理',
    icon: '\ue605',
    children: [
      {
        name: '客户管理',
        icon: '',
        path: '/business/customer'
      }
    ]
  },
  {
    name: '合同管理',
    icon: '\ue60e',
    children: [
      {
        name: '合同管理',
        path: '/contract/list'
      },
      {
        name: '模板管理',
        path: '/contract/template'
      }
    ]
  },
  // {
  //   name: '租客管理',
  //   icon: '\ue607',
  //   children: [
  //     {
  //       name: '租客列表',
  //       path: '/tenants/list'
  //     }
  //   ]
  // },
  {
    name: '企业进退驻',
    icon: '\ue606',
    children: [
      {
        name: '进驻管理',
        path: '/Entry/apply'
      },
      {
        name: '退驻管理',
        path: '/Entry/leave'
      }
    ]
  },
  {
    name: '物业服务',
    icon: '\ue60b',
    children: [
      {
        name: '四表集抄',
        path: '/property/equipment'
      },
      {
        name: '报修管理',
        path: '/property/repair'
      },
      {
        name: '投诉管理',
        path: '/property/complaint'
      },
      {
        name: '费用催缴',
        path: '/property/payment'
      }
      // {
      //   name: '报事管理',
      //   path: '/property/report'
      // },
      // {
      //   name: '保洁管理',
      //   path: '/property/clean'
      // }
    ]
  },
  {
    name: '财务管理',
    icon: '\ue604',
    children: [
      {
        name: '房租费用',
        path: '/financial/rent'
      },
      {
        name: '物业费用',
        path: '/financial/property'
      },
      {
        name: '水电费用',
        path: '/financial/water'
      },
      {
        name: '其他费用',
        path: '/financial/other'
      },
      {
        name: '费用列支',
        path: '/financial/list'
      },
      {
        name: '财务收入',
        path: '/financial/income'
      }
    ]
  }
]

export {
  menuList
}
