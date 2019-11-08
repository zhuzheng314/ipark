import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/layouts/BasicLayout/index.vue'

import Home from '@/pages/Home/index.vue' // 首页
import Contract from '@/pages/Contract/index.vue' // 合同首页

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    name: 'overview',
    component: BasicLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
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
        component: Home
      },
      {
        path: 'retrieval',
        name: 'retrieval',
        component: Home
      }
    ]
  },
  {
    path: '/attract-investment', // 招商管理
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'intention',
        name: 'intention',
        component: Home
      },
      {
        path: 'task',
        name: 'task',
        component: Home
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
        component: Contract
      },
      {
        path: 'retrieval',
        name: 'retrieval',
        component: Contract
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
        component: Home
      },
      {
        path: 'approval',
        name: 'approval',
        component: Home
      }
    ]
  },
  {
    path: '/property', // 物业服务
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'parking',
        name: 'parking',
        component: Home
      },
      {
        path: 'repair',
        name: 'repair',
        component: Home
      },
      {
        path: 'processing',
        name: 'processing',
        component: Home
      }
    ]
  },
  {
    path: '/xxxx', // xxxx
    redirect: '',
    component: BasicLayout,
    children: [
      {
        path: 'xxxx1',
        name: 'xxxx1',
        component: Home
      },
      {
        path: 'xxxx2',
        name: 'task',
        component: Home
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
