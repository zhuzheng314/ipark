import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout/index.vue'

import Home from '@/pages/Home/index.vue' // 首页
import Overview from '@/pages/Overview/index.vue' // 概览页
import ContractTemplate from '@/pages/Contract/tamplate.vue' // 合同模板
import BusinessCustomer from '@/pages/Business/customer.vue' // 招商客户管理
import BusinessTask from '@/pages/Business/task.vue' // 招商任务管理
import ContractList from '@/pages/Contract/list.vue' // 合同列表
import TenantList from '@/pages/Tenants/index.vue' // 租客列表
import WorkOrders from '@/pages/Property/workOrders.vue' // 工单
import Equipment from '@/pages/Property/equipment.vue' // 工单
import FinancialList from '@/pages/Financial/list.vue' // 财务列表

import AssetInfo from '@/pages/asset-management/assetInfo.vue' // 资产管理
import Park from '@/pages/asset-management/park.vue' // 园区
import Build from '@/pages/asset-management/building.vue' // 楼宇
import Room from '@/pages/asset-management/room.vue' // 房间
import Apply from '@/pages/entry/apply.vue' // 进驻申请
import Approval from '@/pages/entry/approval.vue' // 进驻申请

import Test from '@/pages/test/index.vue' // 测试

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
      {
        path: '/home',
        name: 'home',
        component: ContractList
      },
      {
        path: '/overview',
        name: 'overview',
        component: Overview
      }
    ]
  },
  {
    path: '/asset-management', // 资产管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'assetInfo',
        name: 'assetInfo',
        component: AssetInfo
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
      }
    ]
  },
  {
    path: '/entry', // 企业进驻
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'apply',
        name: 'apply',
        component: Apply
      },
      {
        path: 'approval',
        name: 'approval',
        component: Approval
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
