<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header" class="clearfix">
        <el-select  size="small"
                    multiple
                    v-model="value" placeholder="设备类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          size="small"
          style="margin-left: 15px"
          v-model="value2"
          type="month"
          placeholder="请选择月份">
        </el-date-picker>
        <el-input
          placeholder="搜索房号或设备类型"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="value">
        </el-input>
      </div>
      <div>
        <Comparison
          :type="item.type"
          :key="item.name"
          v-for="item in finData"
          :data="item"></Comparison>
      </div>
    </el-card>
    <el-card>
      <!-- <el-table
        :data="tableData"
        @row-click="equipmentState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="楼宇名称">
        </el-table-column>
        <el-table-column
          prop="c"
          label="房号">
        </el-table-column>
        <el-table-column
          prop="a"
          label="合同编号">
        </el-table-column>
        <el-table-column
          prop="e"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="f"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="g"
          label="客户">
        </el-table-column>
        <el-table-column
          prop="t"
          label="抄录时间">
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right; padding-top: 20px">
        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
      </div> -->
      <GTable
        @row-click="equipmentState"
        :tableLabel="$tableLabels.equipmentList"
        :tableData="tableData">
      </GTable>
    </el-card>

<!--      设备详情-->
      <el-drawer
      title="设备详情"
      custom-class="drawer-r"
      :visible.sync="equipmentInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="equipmentInfo_header"></HeaderCard>
      <HeaderInfo type=1 :data="equipmentInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="equipmentInfo_body1"></BodyCard>
        <BodyCard type=1 :data="equipmentInfo_body2"></BodyCard>
        <BodyCard type=1 :data="equipmentInfo_body3"></BodyCard>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ElCard from 'element-ui/packages/card/src/main'
export default {
  name: 'index',
  components: {
    ElCard
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      yearList: [
      ],
      options: [
        {
          value: '选项2',
          label: '水表'
        }, {
          value: '选项3',
          label: '电表'
        }, {
          value: '选项4',
          label: '煤气'
        }, {
          value: '选项5',
          label: '暖通空调'
        }
      ],
      value: '',
      value2: '',
      equipmentInfoState: false,
      equipmentInfo_header: {
        title: '',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          {
            name: '备注',
            icon: '&#xe7d1;',
            function: 'click1'
          },
          {
            name: '删除',
            icon: '&#xe64a;',
            function: 'click1'
          }
        ],
        data: {}
      },
      equipmentInfo_info: {},
      equipmentInfo_body1: {},
      equipmentInfo_body2: {},
      equipmentInfo_body3: {},
      finData: [
        { name: '总电费', value: '10000', chart: '0.3564', type: 'arrow' },
        { name: '总水费', value: 10000, chart: '-0.3564', type: 'arrow' },
        { name: '总燃气费', value: '10000', chart: '0.3564', type: 'arrow' },
        { name: '总空调暖通费', value: 10000, chart: '-0.3564', type: 'arrow' }
      ]
    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    equipmentState (row) {
      console.log(row)
      this.equipmentInfo_header.title = row.d
      this.equipmentInfo_info = {
        label: [
          { prop: 'a', label: '设备类型' },
          { prop: 'b', label: '设备状态' },
          { prop: 'c', label: '设备单价' }
        ],
        tableData: [{
          a: row.e,
          b: row.f,
          c: row.g
        }]
      }
      this.equipmentInfo_body1 = {
        title: '所属资产',
        info: [
          { name: '楼宇名称', value: row.a },
          { name: '楼层', value: row.b },
          { name: '房号', value: row.c }
        ]
      }
      this.equipmentInfo_body2 = {
        title: '本期读数',
        info: [
          { name: '本期读数', value: row.n },
          { name: '本期录入时间', value: row.t }
        ]
      }
      this.equipmentInfo_body3 = {
        title: '上期读数',
        info: [
          { name: '上期读数', value: row.n },
          { name: '上期录入时间', value: row.t }
        ]
      }

      this.equipmentInfoState = true
    },
    handleClose () {},
    fetchEquipList () { // 获取四表集抄列表
      let params = {
        page_no: 1,
        page_size: 999
      }
      this.$https.post(this.$urls.equip.get_list, params).then((res) => {
        console.log(res)
      })
    }
  },
  created () {
    this.fetchEquipList()
    // console.log(this.yearList)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
