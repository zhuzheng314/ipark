<template>
<div>
  <el-card class="box-card" style="width: 100%">
    可招商面积
    可招商工位
    可招商车位
    设备运行状态
    本月合同到期数量
    <el-progress stroke-width="10" type="dashboard" :percentage="10" color="red"></el-progress>
  </el-card>
  <el-card style="width: 100%">
    <CardList v-for="item in 6" :key="item + 'ii'" style="margin-right: 10px"></CardList>
  </el-card>
  <el-card style="width: 200px; float: left;" v-for="x in 5" :key="x + 'base1'">
    <CardList></CardList>
  </el-card>
  <el-card style="clear: both; width: 500px">
    <g2-column :is-bar="false"
               :data="yearList"
               :width="400"
               :height="300"
               :axis-name="{name:'月份', value:'到期合同数（份）'}">
    </g2-column>
  </el-card>
  <el-card>
    <g2-liquidfill style="width: 300px;" :height="300"
                   :label="'asdf'"
                   :max-value="1" :is-percent="true" :data="[{ name: '中国', value: 0.6 }]"
                   :axis-name="{name:'国家', value:'GDP占比'}">
    </g2-liquidfill>
  </el-card>

  <el-card class="box-card" style="width: 480px; clear: both">
    <el-tabs v-model="second">
      <el-tab-pane label="待办事项" name="first">
        <el-table
          :data="tableData"
          :show-header="false"
          style="width: 100%">
          <el-table-column
            prop="address"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            width="100px"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="date"
            width="100px"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="预警信息" name="second">
        <el-table
          :data="tableData"
          :show-header="false"
          style="width: 100%">
          <el-table-column
            prop="address"
            label="日期">
          </el-table-column>
          <el-table-column
            prop="name"
            width="100px"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="date"
            width="100px"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</div>
</template>

<script>
import CardList from '@/components/CardList/index.vue'
export default {
  name: 'index',
  components: {
    CardList
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
      }],
      yearList: [
        { name: '1', value: 100 },
        { name: '2', value: 50 },
        { name: '3', value: 200 },
        { name: '4', value: 60 },
        { name: '5', value: 100 },
        { name: '6', value: 50 },
        { name: '7', value: 200 },
        { name: '8', value: 60 },
        { name: '9', value: 110 },
        { name: '10', value: 80 },
        { name: '11', value: 90 },
        { name: '12', value: 300 }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  margin: 10px;
}
</style>
