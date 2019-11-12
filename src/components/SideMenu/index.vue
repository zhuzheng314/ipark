<template>
<div class="g-side">
  <h5> logo</h5>
<!--  <div style="color: white" @click="() => this.collapse = !this.collapse"> 展开 </div>-->
  <div class="g-side-menu">
    <el-menu
      :router="true"
      :collapse="collapse"
      class="el-menu-vertical-demo"
      :collapse-transition="true"
      @open="handleOpen"
      @close="handleClose"
      background-color="#293C55"
      text-color="#fff"
      active-text-color="#3FB1E3"
    >
      <el-submenu :index="'menu' + index" v-for="(item, index) in list" :key="'menu' + index">
        <template slot="title">
<!--          <i :class="item.icon"></i>-->
          <i class="iconfont icon">&#xe60b;</i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            :route="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="'subMenu' + subIndex"
            @click="handleClick(subItem)"
          >
            {{subItem.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

<!--    <div>-->
<!--      <i class="el-icon-s-fold menuIcon"></i>-->
<!--      <i class="el-icon-s-unfold menuIcon"></i>-->
<!--    </div>-->
    <i v-if="!collapse" class="el-icon-s-fold menuIcon" @click="() => this.collapse = true"></i>
    <i v-if="collapse" class="el-icon-s-unfold menuIcon"  @click="() => this.collapse = false"></i>
  </div>

</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SideMenu extends Vue {
  data ():{list: any, collapse: boolean} {
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
              path: '/contract/list'
            }
          ]
        }, {
          name: '租客管理',
          icon: 'el-icon-location',
          children: [
            {
              name: '租客列表',
              path: '/entry/apply'
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
              path: '/overview'
            },
            {
              name: '资产检索',
              path: '/a'
            }
          ]
        }
      ],
      collapse: true
    }
  }
  handleOpen (key:any, keyPath:any) {
    console.log(key, keyPath)
  }

  handleClose (key:any, keyPath:any) {
    console.log(11111)
  }

  handleClick (data: any) {
    console.log(data)
    // this.collapse = true
  }
}
</script>

<style lang="less" scoped>
.g-side{
  background-color: #293C55;
  /*width: 200px;*/
  position: absolute;
  left: 0px;
  top: -2px;
  height: 100%;
  z-index: 5000;
  box-shadow:3px 0px 5px rgba(0,0,0,0.1);
  h5{
    height: 50px;
    line-height: 50px;
    width: 50%;
    font-size: 25px;
    text-align: center;
    color: white;
  }
  .icon{
    color: white;
    padding-right: 10px;
  }
  .menuIcon{
    position: absolute;
    text-align: center;
    color: white;
    font-size: 23px;
    left: 21px;
    bottom: 25px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/deep/  .el-menu{
  border-right: none;
}
/deep/ .el-menu-item-group__title{
  padding: 0 0;
}
/*/deep/ .el-submenu__title{*/
/*  line-height: 40px;*/
/*}*/
/*/deep/ .el-submenu__title{*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*}*/
/*/deep/ .el-menu-item {*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*  padding: 0 45px;*/
/*}*/
/*/deep/ .el-menu--collapse{*/
/*  width: 60px;*/
/*}*/
</style>
