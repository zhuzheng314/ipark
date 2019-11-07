<template>
<div class="g-side">
  <h5>logo</h5>
  <div class="g-side-menu">
    <el-menu
      :router="true"
      :collapse="false"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#293C55"
      text-color="#fff"
      active-text-color="#3FB1E3"
    >
      <el-submenu :index="'menu' + index" v-for="(item, index) in list" :key="'menu' + index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            :route="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="'subMenu' + subIndex"
          >
            {{subItem.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SideMenu extends Vue {
  data ():{list: any} {
    return {
      list: [
        {
          name: '资产管理',
          icon: 'el-icon-location',
          children: [
            {
              name: '园区管理',
              icon: '',
              path: '/asset-management/assetInfo'
            },
            {
              name: '资产检索',
              icon: '',
              path: '/asset-management/retrieval'
            }
          ]
        }, {
          name: '招商管理',
          icon: 'el-icon-location',
          children: [
            {
              name: '客户管理',
              icon: '',
              path: '/attract-investment/intention'
            },
            {
              name: '招商任务',
              icon: '',
              path: '/attract-investment/task'
            }
          ]
        }, {
          name: '合同管理',
          icon: 'el-icon-location',
          children: [
            {
              name: '合同模板',
              path: '/contract/template'
            },
            {
              name: '合同检索',
              path: '/contract/retrieval'
            }
          ]
        }, {
          name: '企业进驻',
          icon: 'el-icon-location',
          children: [
            {
              name: '进驻申请',
              path: '/entry/apply'
            },
            {
              name: '进驻审批',
              path: '/entry/approval'
            }
          ]
        }, {
          name: '物业服务',
          icon: 'el-icon-location',
          children: [
            {
              name: '车位服务',
              path: '/property/parking'
            },
            {
              name: '报事报修',
              path: '/property/repair'
            },
            {
              name: '工单处理',
              path: '/property/processing'
            }
          ]
        }, {
          name: 'xxxx',
          icon: 'el-icon-location',
          children: [
            {
              name: '园区管理',
              path: '/a'
            },
            {
              name: '资产检索',
              path: '/a'
            }
          ]
        }
      ]
    }
  }
  handleOpen (key:any, keyPath:any) {
    console.log(key, keyPath)
  }

  handleClose (key:any, keyPath:any) {
    console.log(key, keyPath)
  }
}
</script>

<style lang="less" scoped>
.g-side{
  background-color: #293C55;
  height: 100%;
  h5{
    font-size: 56px;
    color: white;
  }
}
/deep/ .el-menu--collapse{
  width: 40px;
  text-align: left;
}
/deep/  .el-menu{
  border-right: none;
}
/deep/ .el-menu-item-group__title{
  padding: 0 0;
}
/deep/ .el-submenu__title{
  height: 38px;
  line-height: 38px;
}
/deep/ .el-submenu__title:hover{
  background-color: red;
}
/deep/ .el-submenu__title{
  height: 38px;
  line-height: 38px;
}
/deep/ .el-menu-item {
  height: 38px;
  line-height: 38px;
  padding: 0 45px;
  min-width: 200px;
}
/deep/ .el-submenu .el-menu-item .active{
  background-color: red;
}
</style>
