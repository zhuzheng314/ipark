<template>
  <div>
    <el-card>
      <div slot="header">

        <el-select  size="small"
        v-model="state"
        clearable
        @change="fetchListSearch"
        placeholder="缴费状态">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['cost_state']"
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
          v-model="customer_name"
          clearable
          @change="fetchListSearch">
        </el-input>
        <el-date-picker
          v-model="date"
          size="small"
          style="margin-left: 15px"
          type="daterange"
          range-separator="至"
          clearable
          @change="fetchListSearch"
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
          v-for="item in infoData"
          :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
      </div>

    </el-card>
    <el-card>
      <GTable
        @row-click="financialState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.incomeList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建收付款账单"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      v-if="addVisible"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="() => {this.addVisible = false}"
        :formList="$formsLabels.incomeForm"
        :options="$store.getters.incomeListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改收付款账单"
      v-if="modifyVisible"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      :visible.sync="modifyVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="() => {this.modifyVisible = false}"
        :formList="$formsLabels.incomeForm"
        :options="$store.getters.incomeListOptions"
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
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [
      ],
      infoData: [
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
      state: '',
      date: '',
      customer_name: '',
      addVisible: false,
      InfoState: false,
      modifyVisible: false,
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
          { prop: 'charge_type', label: '类型' },
          { prop: 'charge', label: '金额' }
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
            { prop: 'state', label: '房源状态', renderTags: true }
          ],
          tableData: []
        }
      },
      defaultValue: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      }

    }
  },
  methods: {
    handleAddContract () {
      this.addVisible = true
    },
    financialState (data) {
      this.id = data.id
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    handleClose () { },
    open (i) {
      if (i === '编辑') {
        this.InfoState = false
        this.fetchGetBack()
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAdd (data) { // 添加财务收入
      let params = {
        ...data
      }
      this.$https.post(this.$urls.charge.add, params)
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
    fetchRemove (id) { // 删除财务收入
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          id: id
        }
        this.$https.post(this.$urls.charge.remove, params).then((res) => {
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
    fetchModify (data) { // 修改财务收入
      let params = {
        ...data,
        id: this.id
      }
      this.$https.post(this.$urls.charge.modify, params).then((res) => {
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
    fetchInfo () { // 获取财务收入统计信息
      let params = {
        park_id: this.parkId
      }
      this.$https.post(this.$urls.charge.info, params).then((res) => {
        if (res.code === 1000) {
          this.infoData = [
            { key: 'rent', name: '租金', value: res.rent, chart: res.rent_rate, type: 'arrow' },
            { key: 'property_fee', name: '物业费', value: res.property_fee, chart: res.property_rate, type: 'arrow' },
            { key: 'water_fee', name: '水费', value: res.water_fee, chart: res.water_rate, type: 'arrow' },
            { key: 'electric_fee', name: '电费', value: res.electric_fee, chart: res.electric_rate, type: 'arrow' },
            { key: 'gas_fee', name: '燃气', value: res.gas_fee, chart: res.gas_rate, type: 'arrow' },
            { key: 'heat_fee', name: '空调暖通', value: res.heat_fee, chart: res.heat_rate, type: 'arrow' },
            { key: 'other_fee', name: '其他', value: res.other_fee, chart: res.other_rate, type: 'arrow' }
          ]
        }
      })
    },
    fetchList () { // 获取财务收入列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        state: this.state,
        start_ts: this.date && this.date.length ? this.date[0] : '',
        end_ts: this.date && this.date.length ? this.date[1] : '',
        customer_name: this.customer_name
      }

      this.$https.post(this.$urls.charge.get_list, params).then((res) => {
        // console.log(res)
        this.tableData = []
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['charge_type', 'state']
          this.$dictionary.tableData(list, params)
          let stateList = {
            state: {
              '未缴': 'danger'
            }
          }
          this.$utils.tagState(list, stateList)
          this.page.total = res.total
          this.tableData = res.list
        }
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取费用信息
      let params = {
        id: id
      }
      this.$https.post(this.$urls.charge.get_info, params).then((res) => {
        let data = res
        // this.info_info.tableData = [];
        this.info_body_expense.info = []
        this.info_body_room.info.tableData = []
        data.state = this.$store.getters.getDicById(data.state)
        data.charge_type = this.$store.getters.getDicById(data.charge_type)

        this.info_header.title = '付款方：' + data.payer
        this.info_info.tableData.push({ ...data })
        this.info_body_expense.info = [
          { name: '费用编号', value: data.id },
          { name: '合同编号', value: data.contract_code },
          { name: '费用类型', value: data.charge_type },
          { name: '费用金额', value: data.charge },
          { name: '客户名字', value: data.customer },
          { name: '跟进人', value: data.receiver },
          { name: '联系人', value: data.contacter },
          { name: '付款方', value: data.payer },
          { name: '状态', value: data.state },
          { name: '周期开始时间', value: data.start_ts },
          { name: '周期结束时间', value: data.end_ts },
          { name: '备注', value: data.memo }
        ]
        if (data.room.length) {
          let roomList = data.room
          this.$dictionary.tableData(roomList, ['state'])
          this.info_body_room.info.tableData = roomList
        }
      })
    },
    fetchGetBack () {
      let params = {
        id: this.id
      }
      this.$https.post(this.$urls.charge.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchInfo()
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
