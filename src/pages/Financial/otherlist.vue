<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header">

        <el-select
          style="width: 220px;"
          size="small"
          v-model="type"
          clearable
          @change="fetchListSearch"
          placeholder="费用类型">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['finance_other_chargetype']"
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
          clearable
          @change="fetchListSearch"
          v-model="value2">
        </el-input>
        <el-input-number v-model="bill_money_floor" @change="fetchListSearch"
          size="small"
          style="width: 220px; margin-left: 15px" :controls="false" placeholder="账单金额下限"></el-input-number>
        <el-input-number v-model="bill_money_ceil" @change="fetchListSearch"
          size="small"
          style="width: 220px; margin-left: 15px"  :controls="false" placeholder="账单金额上限"></el-input-number>
        <el-select
          style="width: 220px; margin-left: 15px"
          size="small"
          v-model="value3"
          clearable
          @change="fetchListSearch"
          placeholder="费用金额范围">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="value4"
          size="small"
          style="margin-left: 15px"
          type="daterange"
          range-separator="至"
          clearable
          @change="fetchListSearch"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select  size="small"
          style="margin-left: 15px"
                    v-model="is_overdue"
                    clearable
                    @change="fetchListSearch"
                    placeholder="是否逾期">
          <el-option
            v-for="item in is_overdueOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >添加账单</el-button>
      </div>
      <div>
        <div :key="item.name" v-for="item in infoData" class="simple-item">
          <Comparison :type="item.type" :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
      <GTable
        @row-click="financialState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.expenseList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建房租费用账单"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
          @onSubmit="fetchAdd"
          @onCancel="() => {this.addVisible = false}"
          v-if="addVisible"
          :formList="$formsLabels.expenseForm"
          :options="formOptions"
          :defaultValue="addDefaultValue"
          :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改房租费用账单"
      :visible.sync="modifyVisible"
      width="600px">
      <div>
        <ParkForm
          @onSubmit="fetchModify"
          @onCancel="() => {this.modifyVisible = false}"
          v-if="modifyVisible"
          :formList="$formsLabels.expenseForm"
          :options="formOptions"
          :defaultValue="defaultValue"
          :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <!--  账单详情-->
    <el-drawer
      title="账单详情"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="info_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in info_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="info_info"></HeaderInfo>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type=1 :data="info_body_expense"></BodyCard>
        <BodyCard type=2 :data="info_body_room"></BodyCard>
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
      type: [],
      bill_money_floor: '',
      bill_money_ceil: '',
      is_overdue: '',
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [
      ],
      infoData: [
      ],
      is_overdueOptions: [
        {
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }
      ],
      options2: [],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: true,
      addVisible: false,
      modifyVisible: false,
      InfoState: false,
      id: '',
      info_header: {
        title: '付款方：-',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe7d1;'
          }
        ]
      },
      info_info: {
        label: [
          { prop: 'state', label: '账单状态' },
          { prop: 'bill_money', label: '付款金额' },
          { prop: 'receive_money', label: '已付金额' },
          { prop: 'pay_date', label: '应付时间' }
        ],
        tableData: []
      },
      info_body_expense: {
        title: '账单信息',
        info: []
      },
      info_body_room: {
        title: '房源信息',
        info: {
          label: [
            { prop: 'park_name', label: '所属园区' },
            { prop: 'building_name', label: '楼宇' },
            { prop: 'name', label: '房间号' },
            { prop: 'area', label: '面积' },
            { prop: 'state', label: '房源状态' }
          ],
          tableData: []
        }
      },
      formOptions: {
        ...this.$store.getters.expenseListOptions,
        type: this.$store.state.dictionary.dictionaryType['finance_other_chargetype']
      },
      addDefaultValue: {},
      defaultValue: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      }

    }
  },
  methods: {
    handleAdd () {
      this.addVisible = true
    },
    financialState (data) {
      this.id = data.expense_code
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    handleClose () { },
    open (i) {
      if (i === '编辑') {
        this.fetchGetBack()
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAdd (data) { // 添加房租费用
      let params = {
        ...data
      }
      this.$https.post(this.$urls.expense.add, params)
        .then(res => {
          if (res.code === 1000) {
            this.fetchList()
            this.addVisible = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        })
    },
    fetchRemove (id) { // 删除房租费用
      this.$confirm('此操作将永久删除该费用, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          expense_code: id
        }
        this.$https.post(this.$urls.expense.remove, params).then((res) => {
          if (res.code === 1000) {
            this.fetchList()
            this.InfoState = false
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    fetchModify (data) { // 修改房租费用
      let params = {
        ...data,
        expense_code: this.id
      }
      this.$https.post(this.$urls.expense.modify, params).then((res) => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.defaultValue = {}
          this.fetchList()
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchInfo () { // 统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        type: 409
      }
      this.$https.post(this.$urls.charge.top_info, params).then((res) => {
        if (res.code === 1000) {
          this.infoData = [
            { typeSelect: 'receive', name: `应收(${res.need_receive_num}笔)`, value: res.need_receive, chart: res.need_receive_rate, type: 'arrow' },
            { typeSelect: 'receive', name: `已收(${res.receive_num}笔)`, value: res.receive, chart: res.receive_rate, type: 'arrow' },
            { typeSelect: 'receive', name: `未缴(${res.un_receive_num}笔)`, value: res.un_receive, chart: res.un_receive_rate, type: 'arrow' },
            { typeSelect: 'receive', name: `费用总额`, value: res.fee, chart: res.fee_rate, type: 'arrow' }
          ]
        }
      })
    },
    fetchGetBack () {
      let params = {
        expense_code: this.id
      }
      this.$https.post(this.$urls.expense.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    fetchList () { // 获取财房租费用列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        type: [409, 410, 411, 412]
        // customer_name: this.value2,
        // start_ts: this.value3.length ? this.value3[0] : '',
        // end_ts: this.value3.length ? this.value3[1] : '',
        // bill_money_floor: this.bill_money_floor,
        // bill_money_ceil: this.bill_money_ceil,
        // is_overdue: this.value5
      }
      this.$https.post(this.$urls.expense.get_list, params).then((res) => {
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['state', 'type']
          this.$dictionary.tableData(list, params)
          this.page.total = res.total
          this.tableData = []
          this.tableData = list
        } else {
          this.$message.warning('未找到相关数据')
          this.tableData = []
        }
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取费用信息
      let params = {
        expense_code: id
      }
      this.$https.post(this.$urls.expense.get_info, params).then((res) => {
        let data = res
        this.info_body_expense.info = []
        this.info_body_room.info.tableData = []
        data.state = this.$store.getters.getDicById(data.state)
        data.type = this.$store.getters.getDicById(data.type)
        this.info_header.title = '付款方：' + data.customer_name
        this.info_info.tableData.push({ ...data })
        this.info_body_expense.info = [
          { name: '费用编号', value: data.expense_code },
          { name: '合同编号', value: data.contract_code },
          { name: '费用类型', value: data.type },
          { name: '账单金额', value: data.bill_money },
          { name: '实收金额', value: data.receive_money },
          { name: '开票金额', value: data.invoice_money },
          { name: '应收日期', value: data.pay_date },
          { name: '跟进人', value: data.receiver },
          { name: '结清状态', value: data.state },
          { name: '逾期天数', value: data.overdue_day },
          { name: '合同开始日期', value: data.start_ts },
          { name: '合同截至日期', value: data.end_ts },
          { name: '用户名', value: data.customer_name },
          { name: '备注', value: data.memo ? data.memo : '-' }
        ]
        console.log(data.room)
        if (data.room.length) {
          let roomList = data.room
          for (let i = 0; i < roomList.length; i++) {
            roomList[i].state = this.$store.getters.getDicById(roomList[i].state)
          }
          this.info_body_room.info.tableData = roomList
        }
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchList()
    this.fetchInfo()
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
