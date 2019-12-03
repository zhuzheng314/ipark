<template>
  <div>
  {{parkId}}
<!--    <el-card style="width: 100%">-->

<!--    </el-card>-->
    <el-card>
      <div slot="header">

        <el-select  size="small"
                    multiple
                    v-model="value1"
                    placeholder="缴费状态">

          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          placeholder="搜索客户名称"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="value2">
        </el-input>
        <el-date-picker
          v-model="value3"
          size="small"
          style="margin-left: 15px"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >添加账单</el-button>
      </div>
      <div>
        <Comparison
          :type="item.type"
          :key="item.name"
          v-for="item in finData"
          :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
      </div>

    </el-card>
    <el-card>
      <!-- <el-table
        :data="tableData"
        @row-click="financialState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="费用类型">
        </el-table-column>
        <el-table-column
          prop="b"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="c"
          label="缴费日期">
        </el-table-column>
        <el-table-column
          prop="d"
          label="金额">
        </el-table-column>
        <el-table-column
          prop="f"
          label="缴费状态">
        </el-table-column>
        <el-table-column
          prop="g"
          label="合同名称">
        </el-table-column>
        <el-table-column
          prop="h"
          label="租金">
        </el-table-column>
        <el-table-column
          prop="h"
          label="物业费">
        </el-table-column>
        <el-table-column
          prop="h"
          label="水费">
        </el-table-column>
        <el-table-column
          prop="h"
          label="电费">
        </el-table-column>
        <el-table-column
          prop="h"
          label="空调暖通费">
        </el-table-column>
        <el-table-column
          prop="i"
          label="跟进人">
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right; padding-top: 20px">
        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
      </div> -->
      <GTable
        @row-click="financialState"
        :tableLabel="$tableLabels.incomeList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建收付款账单"
      :visible.sync="addContractVisible"
      width="600px">
      <div>
        <ParkForm :formList="$formsLabels.incomeForm" :itemList="[]"></ParkForm>
      </div>
    </el-dialog>
    <!--  账单详情-->
    <el-drawer
      title="账单详情"
      custom-class="drawer-r"
      :visible.sync="financialInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="financialInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in financialInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="financialInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type=1 :data="financialInfo_body_financial"></BodyCard>
        <BodyCard type=1 :data="financialInfo_body_room"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table1"></BodyCard>
        <!-- <BodyCard type=2 :data="financialInfo_body_table2"></BodyCard> -->
        <!-- <BodyCard type=2 :data="financialInfo_body_table3"></BodyCard> -->
        <BodyCard type=2 :data="financialInfo_body_table4"></BodyCard>
        <!-- <BodyCard type=2 :data="financialInfo_body_table5"></BodyCard> -->

      </div>
    </el-drawer>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
import ElCard from 'element-ui/packages/card/src/main'
export default {
  name: 'index',
  components: {
    ElCard,
    ParkForm
  },
  computed: {
    parkId () {
      return this.$store.state.form.activePark.domain_id
    }
  },
  watch: {
    parkId () {
      this.fetchChargeInfo()
    }
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [
      ],
      finData: [
        { key: 'rent', name: '租金', value: '', chart: '', type: 'arrow' },
        { key: 'property_fee', name: '物业费', value: '', chart: '', type: 'arrow' },
        { key: 'water_fee', name: '水费', value: '', chart: '', type: 'arrow' },
        { key: 'electric_fee', name: '电费', value: '', chart: '', type: 'arrow' },
        { key: 'gas_fee', name: '燃气', value: '', chart: '', type: 'arrow' },
        { key: 'heat_fee', name: '空调暖通', value: '', chart: '', type: 'arrow' },
        { key: 'other_fee', name: '其他', value: '', chart: '', type: 'arrow' }
      ],
      stateOptions: [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '已缴费'
        }, {
          value: '选项3',
          label: '未缴费'
        }
      ],
      value1: '',
      value2: '',
      value3: '',
      addContractVisible: false,
      tamplateFormList: [
        {
          type: 'select',
          label: '模板类型',
          key: 'tamplate',
          placeholder: '请输入',
          rule: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          options: [
            {
              label: '美食',
              value: 's1'
            }, {
              label: '美食美食',
              value: 's2'
            }
          ]
        }, {
          type: 'input',
          label: '模板名称',
          key: 'i',
          placeholder: '请输入',
          rule: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'textarea',
          label: '模板描述',
          key: 'i11',
          placeholder: '请输入模板描述',
          rule: [
            { required: true, message: '请输入模板描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'upload',
          label: '模板描述',
          key: 'i11',
          placeholder: '请输入模板描述',
          rule: [
            { required: true, message: '请输入模板描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      ],
      financialInfoState: false,
      financialInfo_header: {
        title: '付款方：张三丰',
        button: [
          {
            name: '张三丰',
            icon: '&#xe607;',
            function: 'click1'
          },
          {
            name: '打印',
            icon: '&#xe617;',
            function: 'click1'
          }
        ]
      },
      financialInfo_info: {
        label: [
          { prop: 'a', label: '账单状态' },
          { prop: 'b', label: '付款金额' },
          { prop: 'c', label: '已付金额' },
          { prop: 'd', label: '应付时间' }
        ],
        tableData: [{
          a: '未付款',
          b: '1,495.89元',
          c: '1,495.89元',
          d: '2020-01-07'
        }]
      },
      financialInfo_body_financial: {
        title: '账单信息',
        info: [
          { name: '费用类型', value: '租金' },
          { name: '计费周期', value: '2020-01-28-2020-04-27' },
          { name: '账单金额', value: '1,495.89元' },
          { name: '创建时间', value: '2019-10-28' },
          { name: '收款方', value: '杨' },
          { name: '收款方联系方式', value: '-' },
          { name: '合同编号', value: '1003' },
          { name: '账单编号', value: 'zj-20191028-016558624' },
          { name: '备注', value: '-' }
        ]
      },
      financialInfo_body_room: {
        title: '房源信息',
        info: [
          { name: '园区', value: '西港发展中心' },
          { name: '楼宇', value: '协力大厦' },
          { name: '房号', value: '10层302室' }
        ]
      },
      financialInfo_body_table1: {
        title: '收款',
        info: {
          label: [
            { prop: 'a', label: '对方单位名称' },
            { prop: 'b', label: '入账日' },
            { prop: 'd', label: '发生额' },
            { prop: 'e', label: '我方确认人' },
            { prop: 'h', label: '操作' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table4: {
        title: '开票记录',
        info: {
          label: [
            { prop: 'a', label: '发票抬头' },
            { prop: 'b', label: '发票号码' },
            { prop: 'c', label: '开票金额' },
            { prop: 'd', label: '备注' },
            { prop: 'e', label: '开票时间' },
            { prop: 'f', label: '状态' }
          ],
          tableData: []
        }
      }

    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    financialState (row) {
      this.financialInfoState = true
      this.fetchChargeGetInfo(row.customer_id)
    },
    handleClose () { },
    open (i) {
      this.$message('这里是' + i)
    },
    fetchChargeAdd () { // 添加财务收入
      let params = {
        id: this.parkId
      }
      this.$https.post(this.$urls.charge.add, params).then((res) => {

      })
    },
    fetchChargeRemove (id) { // 删除财务收入
      let params = {
        id: id
      }
      this.$https.post(this.$urls.charge.remove, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchChargeModify (id) { // 修改财务收入
      let params = {
        id: id
      }
      this.$https.post(this.$urls.charge.modify, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchChargeInfo () { // 获取财务收入统计信息
      let params = {
        id: this.parkId
      }
      this.$https.post(this.$urls.charge.info, params).then((res) => {
        // console.log(res)
        // this.tableData = res.list
        let data = res.data
        this.finData.forEach(v => {
          v.value = data[v.key]
          v.chart = data[v.key + '_rate']
        })
      })
    },
    fetchChargeList () { // 获取财务收入列表
      let params = {
        page_no: 1,
        page_size: 999
      }
      this.$https.post(this.$urls.charge.get_list, params).then((res) => {
        // console.log(res)
        this.tableData = res.list
      })
    },
    fetchChargeGetInfo (id) { // 获取财务收入信息
      let params = {
        customer_id: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.charge.get_info, params).then((res) => {
        // console.log(res)
      })
    }
  },
  created () {
    this.fetchChargeInfo()
    this.fetchChargeList()
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
