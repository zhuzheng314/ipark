<template>
  <el-container style="height: 100%;">
    <el-aside width="60px">
<!--       <SideMenu></SideMenu>-->
    </el-aside>
    <SideMenu></SideMenu>
    <el-container>
      <el-header height="56px">
        <GlobalHeader></GlobalHeader>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
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
      width: 200
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
  background:rgba(232,229,229,0.5);
}
</style>
