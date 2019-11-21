<template>
  <div class="g-side">
    <h5 class="logo"></h5>
    <!--  <div style="color: white" @click="() => this.collapse = !this.collapse"> 展开 </div>-->
    <div class="g-side-menu">
      <el-menu
        :router="true"
        :collapse="collapse"
        class="el-menu-vertical-demo"
        :collapse-transition="true"
        @open="handleOpen"
        background-color="#293C55"
        text-color="#fff"
        active-text-color="#3FB1E3"
      >
        <el-submenu :index="'menu' + index" v-for="(item, index) in list" :key="'menu' + index">
          <template slot="title">
            <!--          <i :class="item.icon"></i>-->
            <!--          <i class="iconfont icon">{{item.icon}}</i>-->
            <i class="iconfont icon">{{item.icon}}</i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="subItem.path"
              :route="subItem.path"
              v-for="(subItem, subIndex) in item.children"
              :key="'subMenu' + subIndex"
              @click="handleClick(subItem)"
            >{{subItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <i v-if="!collapse" class="el-icon-s-fold menuIcon" @click="() => this.collapse = true"></i>
      <i v-if="collapse" class="el-icon-s-unfold menuIcon" @click="() => this.collapse = false"></i>
    </div>
  </div>
</template>

<script>
import { menuList } from '@/config/menu.js'
export default {
  name: 'SideMenu',
  data () {
    return {
      list: menuList,
      // [
      //   {
      //     name: '资产管理',
      //     icon: '\ue604',
      //     children: [
      //       // {
      //       //   name: '园区管理',
      //       //   icon: '',
      //       //   path: '/asset-management/assetInfo'
      //       // },
      //       {
      //         name: '园区',
      //         icon: '',
      //         path: '/asset-management/park'
      //       }
      //       // {
      //       //   name: '楼宇',
      //       //   icon: '',
      //       //   path: '/asset-management/build'
      //       // }
      //     ]
      //   },
      //   {
      //     name: '招商管理',
      //     icon: '\ue605',
      //     children: [
      //       {
      //         name: '客户管理',
      //         icon: '',
      //         path: '/business/customer'
      //       }
      //     ]
      //   },
      //   {
      //     name: '合同管理',
      //     icon: '\ue60e',
      //     children: [
      //       {
      //         name: '合同管理',
      //         path: '/contract/list'
      //       },
      //       {
      //         name: '模板管理',
      //         path: '/contract/template'
      //       }
      //     ]
      //   },
      //   // {
      //   //   name: '租客管理',
      //   //   icon: '\ue607',
      //   //   children: [
      //   //     {
      //   //       name: '租客列表',
      //   //       path: '/tenants/list'
      //   //     }
      //   //   ]
      //   // },
      //   {
      //     name: '企业进退驻',
      //     icon: '\ue606',
      //     children: [
      //       {
      //         name: '进驻管理',
      //         path: '/Entry/apply'
      //       },
      //       {
      //         name: '退驻管理',
      //         path: '/Entry/apply'
      //       }
      //     ]
      //   },
      //   {
      //     name: '物业服务',
      //     icon: '\ue60b',
      //     children: [
      //       {
      //         name: '四表联抄',
      //         path: '/property/equipment'
      //       },
      //       {
      //         name: '报修管理',
      //         path: '/property/repair'
      //       },
      //       {
      //         name: '投诉管理',
      //         path: '/property/complaint'
      //       },
      //       {
      //         name: '报事管理',
      //         path: '/property/report'
      //       },
      //       {
      //         name: '保洁管理',
      //         path: '/property/clean'
      //       }
      //     ]
      //   },
      //   {
      //     name: '财务管理',
      //     icon: '\ue60a',
      //     children: [
      //       {
      //         name: '费用列资',
      //         path: '/financial/list'
      //       },
      //       {
      //         name: '财务收入',
      //         path: '/financial/income'
      //       },
      //       {
      //         name: '费用催缴',
      //         path: '/financial/payment'
      //       }
      //     ]
      //   }
      // ],
      collapse: true
    }
  },
  methods: {
    handleOpen () {
    },

    filterIcon (icon) {
      console.log()
    },
    handleClick () {
      console.log(data)
      this.collapse = false
    }
  }
}
</script>

<style lang="less" scoped>
.g-side {
  background-color: #293c55;
  height: 100%;
  box-shadow: 3px 0px 5px rgba(0, 0, 0, 0.1);
  .logo{
    animation: logo 10s infinite;
    height: 50px;
    line-height: 50px;
    width: 30%;
    text-align: left;
    padding-left: 10px;
    color: white;
  }
  @keyframes logo
   {
    0% {color: #3FB1E3; font-size: 24px;}
    50% {color: #3FB1E3; font-size: 22px;}
    51% {color: #3FB1E3; font-size: 22px;}
    100% {color: #FE5B6B; font-size: 24px;}
   }
  &-menu{
    height: calc(100% - 125px);
    overflow-y: scroll;
    .icon {
      color: white;
      font-size: 20px;
      padding-right: 10px;
    }
    .menuIcon {
      position: absolute;
      text-align: center;
      color: white;
      font-size: 23px;
      left: 21px;
      bottom: 25px;
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
/deep/ .el-menu {
  border-right: none;
}
/deep/ .el-menu-item-group__title {
  padding: 0 0;
}
/*滚动条样式*/
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background: #252525;
  border-radius: 4px;
}
::-webkit-scrollbar-button:start {
  background-color: transparent;
  background-size: 6px 6px;
}
::-webkit-scrollbar-button:end {
  background-color: transparent;
  background-size: 6px 6px;
}
</style>
