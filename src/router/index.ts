import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout/index.vue'

import Home from '@/pages/Home/index.vue' // 首页
import Overview from '@/pages/Overview/index.vue' // 概览页
import Desk from '@/pages/Desk/index.vue' // 工作台
import ContractTemplate from '@/pages/Contract/tamplate.vue' // 合同模板
import BusinessCustomer from '@/pages/Business/customer.vue' // 招商客户管理
import BusinessTask from '@/pages/Business/task.vue' // 招商任务管理
import ContractList from '@/pages/Contract/list.vue' // 合同列表
import ContractAdd from '@/pages/Contract/add.vue' // 合同新增
import TenantList from '@/pages/Tenants/index.vue' // 租客列表
import WorkOrders from '@/pages/Property/workOrders.vue' // 工单
import Equipment from '@/pages/Property/equipment.vue' // 设备管理
import CleanOrder from '@/pages/Property/cleanOrder.vue' // 保洁
import RepairOrder from '@/pages/Property/repairOrder.vue' // 报修
import ReportOrder from '@/pages/Property/reportOrder.vue' // 报事
import ComplaintOrder from '@/pages/Property/complaintOrder.vue' // 投诉
import FinancialList from '@/pages/Financial/list.vue' // 财务列表
import FinancialIncome from '@/pages/Financial/income.vue' // 财务收入
import FinancialOther from '@/pages/Financial/otherlist.vue' // 财务其他
import FinancialProperty from '@/pages/Financial/propertylist.vue' // 财务物业
import FinancialRoom from '@/pages/Financial/roomlist.vue' // 财务房租
import FinancialWater from '@/pages/Financial/waterlist.vue' // 财务水电
import PropertyPayment from '@/pages/Property/payment.vue' // 费用催缴
import Park from '@/pages/Park/park.vue' // 园区
import Build from '@/pages/Park/build.vue' // 楼宇
// import Build from '@/pages/Park/buildingOld.vue' // 楼宇
import Room from '@/pages/Park/room.vue' // 房间
import Apply from '@/pages/Entry/apply.vue' // 进驻申请
import EntryLeave from '@/pages/Entry/leave.vue' // 退驻申请
import Approval from '@/pages/Entry/approval.vue' // 进驻审批

import Test from '@/pages/test/index.vue' // 测试
import Api from '@/pages/test/api.vue' // 测试
import Form from '@/pages/test/form.vue' // 测试

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    name: 'overview',
    component: BasicLayout,
    meta: {
      requireAuth: true
    },
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: ContractList
      // },
      {
        path: '/overview',
        name: 'overview',
        component: Overview
      },
      {
        path: '/home',
        name: 'desk',
        component: Desk
      }
    ]
  },
  {
    path: '/Park', // 资产管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'room',
        name: 'assetInfo',
        component: Room
      },
      {
        path: 'park',
        name: 'park',
        component: Park
      },
      {
        path: 'build',
        name: 'build',
        component: Build
      },
      {
        path: 'room',
        name: 'room',
        component: Room
      }
    ]
  },
  {
    path: '/business', // 招商管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'customer',
        name: 'customer',
        component: BusinessCustomer
      },
      {
        path: 'task',
        name: 'task',
        component: BusinessTask
      }
    ]
  },
  {
    path: '/contract', // 合同管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'template',
        name: 'template',
        component: ContractTemplate
      },
      {
        path: 'list',
        name: 'list',
        component: ContractList
      },
      {
        path: 'add',
        name: 'add',
        component: ContractAdd
      }
    ]
  },
  {
    path: '/Entry', // 企业进驻
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'apply',
        name: 'apply',
        component: Apply
      },
      {
        path: 'leave',
        name: 'leave',
        component: EntryLeave
      }
    ]
  },
  {
    path: '/tenants', // 租客管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'list',
        name: 'apply',
        component: TenantList
      }
    ]
  },
  {
    path: '/property', // 物业服务
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'equipment',
        name: 'equipment',
        component: Equipment
      },
      {
        path: 'orders',
        name: 'orders',
        component: WorkOrders
      },
      {
        path: 'processing',
        name: 'processing',
        component: ContractList
      },
      {
        path: 'clean',
        name: 'clean',
        component: CleanOrder
      },
      {
        path: 'repair',
        name: 'repair',
        component: RepairOrder
      },
      {
        path: 'report',
        name: 'report',
        component: ReportOrder
      },
      {
        path: 'complaint',
        name: 'complaint',
        component: ComplaintOrder
      },
      {
        path: 'payment', // 费用催缴
        name: 'PropertyPayment',
        component: PropertyPayment
      }
    ]
  },
  {
    path: '/financial', // 财务管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'list',
        name: 'financialList',
        component: FinancialList
      },
      {
        path: 'income', // 财务收入
        name: 'FinancialIncome',
        component: FinancialIncome
      },
      {
        path: 'rent', // 房租费
        name: 'rentFinancial',
        component: FinancialRoom
      },
      {
        path: 'property', // 物业费
        name: 'propertyFinancial',
        component: FinancialProperty
      },
      {
        path: 'water', // 水电费
        name: 'waterFinancial',
        component: FinancialWater
      },
      {
        path: 'other', // 其他费
        name: 'otherFinancial',
        component: FinancialOther
      }
    ]
  },
  {
    path: '/test', // 测试
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'test',
        name: 'test',
        component: Test
      },
      {
        path: 'api',
        name: 'api',
        component: Api
      },
      {
        path: 'form',
        name: 'form',
        component: Form
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../pages/Home/index.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
