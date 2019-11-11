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
    <el-card class="box-card" style="width: 390px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <div class="msg-list">
            待办事项
          </div>
        </el-tab-pane>
        <el-tab-pane label="未读消息" name="second">未读消息</el-tab-pane>
      </el-tabs>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    margin: 10px;
    width: 480px;
    float: left;
  }
  .card-title{
    font-size: 16px;
  }
  .msg-list{
    border-bottom: 1px solid red;
    .cont{
      width: 100%;
      color: #333333;
      font-size: 14px;
    }
    .btm{
      .name{

      }
      .date{

      }
    }
  }
</style>
