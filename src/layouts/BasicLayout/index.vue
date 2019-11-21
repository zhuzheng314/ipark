<template>
  <el-container style="height: 100%;">
    <el-aside width="auto">
       <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header height="56px">
        <GlobalHeader></GlobalHeader>
      </el-header>
      <el-main>
        <el-breadcrumb v-if="route.name" separator-class="el-icon-arrow-right" style="padding-bottom: 20px;">
          <el-breadcrumb-item :to="{ path: route.path }" v-if="route.name">{{route.name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="route.name1">{{route.name1}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { menuList } from '@/config/menu.js'
import GlobalHeader from '@/components/GlobalHeader/index.vue'
import SideMenu from '@/components/SideMenu/index.vue'

export default {
  name: 'index',
  components: {
    GlobalHeader,
    SideMenu
  },
  data () {
    return {
      width: 200,
      route: {}
    }
  },
  mounted () {
    this.route.path = this.$route.path
    this.findName(this.route)
    setTimeout(() => {
      this.width = 300
    }, 2000)
  },
  methods: {
    findName (route) {
      this.route = {}
      menuList.forEach(v => {
        v.children.forEach(i => {
          if (i.path === route.path) {
            this.route.name = v.name
            this.route.name1 = i.name
          }
        })
      })
    }
  },
  watch: {
    $route (to, from) {
      this.route.path = this.$route.path
      this.findName(this.route)
    }
  }
}
</script>

<style scoped>
.el-header{
  padding: 0 0;
  /*height: 56px;*/
}
.el-aside{
  height: 100%;
}
.el-main{
  background: #eee;
}
</style>
