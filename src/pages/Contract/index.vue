<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">基础表单</span>
      </div>
      <ParkForm></ParkForm>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">基础表单</span>
      </div>
      <ParkForm></ParkForm>
    </el-card>
    <el-card style="width: 100%; padding: 0 0 30px" class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">流程进度</span>
      </div>
      <div style="padding: 0 10px">
        <el-steps :active="1">
          <el-step title="创建合同" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="xx初审" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="财务复合" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="完成" description="这段就没那么长了"></el-step>
        </el-steps>
      </div>

    </el-card>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
export default {
  name: 'index',
  components: {
    ParkForm
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .box-card {
    margin: 10px;
    width: 480px;
    float: left;
  }
  .card-title{
    font-size: 16px;
  }
</style>
