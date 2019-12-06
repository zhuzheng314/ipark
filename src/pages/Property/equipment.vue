<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header" class="clearfix">
        <el-select  size="small"
                    multiple
                    v-model="value1" placeholder="设备类型">
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
          v-model="value3">
        </el-input>
      </div>
      <div>
        <Comparison
          :type="item.type"
          :key="item.name"
          v-for="item in infoData"
          :data="item"></Comparison>
      </div>
    </el-card>
    <el-card>
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
      value1: '',
      value2: '',
      value3: '',
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
      infoData: []
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
    fetchEquipAdd () { // 添加设备
      let params = {
        id: this.parkId
      }
      this.$https.post(this.$urls.equip.add, params).then((res) => {

      })
    },
    fetchEquipRemove (id) { // 删除设备
      let params = {
        id: id
      }
      this.$https.post(this.$urls.equip.remove, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchEquipModify (id) { // 修改设备信息
      let params = {
        id: id
      }
      this.$https.post(this.$urls.equip.modify, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchEquipInfo () { // 获取四表集抄统计信息
      this.$https.post(this.$urls.equip.info, {
        park_id: this.$store.state.form.activePark.domain_id,
        start_ts: new Date(new Date().getFullYear(), 0),
        end_ts: new Date()
      }).then((res) => {
        this.infoData = [
          { name: '总电费(元)', value: Number(res.electric), chart: Number(res.electric_rate), type: 'arrow' },
          { name: '总水费(元)', value: Number(res.water), chart: Number(res.water_rate), type: 'arrow' },
          { name: '总燃气费(元)', value: Number(res.gas), chart: Number(res.gas_rate), type: 'arrow' },
          { name: '总空调暖通费(元)', value: Number(res.heat), chart: Number(res.heat_rate), type: 'arrow' }
        ]
      })
    },
    fetchEquipList () { // 获取设备列表
      let params = {
        page_no: 1,
        page_size: 999
      }
      this.$https.post(this.$urls.equip.get_list, params).then((res) => {
        // console.log(res)
        this.tableData = res.list
      })
    },
    fetchEquipGetInfo (id) { // 获取设备信息
      let params = {
        customer_id: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.equip.get_info, params).then((res) => {
      })
    }
  },
  created () {
    this.fetchEquipList()
    // console.log(this.yearList)
    this.fetchEquipInfo()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
