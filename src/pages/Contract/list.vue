<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>到期监控图</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="chart">
            <v-chart style="width:100%;height: 300px;" :options="barOptions" @click="endContract"></v-chart>
          </div>
        </el-col>
        <el-col :span="6">
          <el-card class="infoBox" v-for="(item,i) in infoList" :key="i">
            <el-row :gutter="40">
              <el-col :span="12">
                <p class="name">{{item.name}}</p>
                <p class="unit">单位：{{item.unit}}</p>
              </el-col>
              <el-col :span="12">
                <span class="value">{{item.value}}</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header">
        <el-select  size="small"
                    clearable
                    @change="fetchListSearch"
                    v-model="contract_state" placeholder="合同状态">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['contract_state']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          @change="fetchListSearch"
          clearable
          placeholder="搜索企业"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="customer_name">
        </el-input>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新建合同</el-button>
      </div>
      <GTable
        @row-click="contractState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.contractList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :style="{height: dialogHeight + 'px'}"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      v-if="addContractVisible"
      :visible.sync="addContractVisible">
      <div>
        <ParkForm
        @onChange="formActive"
        @onSubmit="fetchAddContract"
        @onCancel="() => {this.addContractVisible = false}"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :default-value="{}"
        :itemList="[]"
        :defaultValue="addDefaultValue"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :style="{height: dialogHeight + 'px'}"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      :destroy-on-close="true"
      v-if="modifyVisible"
      :visible.sync="modifyVisible">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="() => {this.modifyVisible = false}"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :default-disabled="{
          contract_code: true
        }"
        :defaultValue="defaultValue"
        :default-rules="{
            contract_code:  [
              { required: true, message: '该项为必填', trigger: 'blur' },
            ]
          }"
        ></ParkForm>
      </div>
    </el-dialog>

<!--  合同详情-->
    <el-drawer
      title="合同详情"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="contractInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in contractInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
        <template #headerCardSlot="data">
          <div style="color: #999;padding: 0 48px;">
            <p>
              <span>房租合同摘要</span>
              【签订时间{{data.slotName.sign_ts}}。出租面积{{data.slotName.rent_area}}㎡。租金单价{{data.slotName.unit_price}}元/㎡·天。{{data.slotName.pay_cycle}}月一付，提前{{data.slotName.prepaid}}个月{{data.slotName.pay_date}}号收物业费。】
            </p>
            <p>
              <span>物业合同摘要</span>
              【签订时间{{data.slotName.property_sign_ts}}。管理面积{{data.slotName.manage_area}}㎡。物业费单价{{data.slotName.property_unit_price}}元/㎡·天。{{data.slotName.property_pay_cycle}}月一付，提前{{data.slotName.property_prepaid}}个月{{data.slotName.property_pay_date}}号收物业费。】
            </p>
            <p>
              <span>最新备注：{{data.slotName.memo || '暂无备注'}}</span>
            </p>
          </div>
        </template>
      </HeaderCard>
      <div class="drawer-body" :style="{height: bodyHeight}">
        <BodyCard type=1 :data="contractInfo_body1"></BodyCard>
        <BodyCard type=2 :data="contractInfo_body_room"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body_contract"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body_property"></BodyCard>
      </div>
    </el-drawer>

<!--    <AddContract></AddContract>-->
  </div>
</template>

<script>
// import AddContract from '../Components/AddContract/index'

export default {
  name: 'index',
  components: {
    // AddContract
  },
  watch: {
    InfoState () {
      if (this.InfoState) {
        this.$nextTick(() => {
          this.bodyHeight = this.$utils.dialogHeight()
        })
      }
    }
  },
  data () {
    return {
      bodyHeight: 0,
      tableData: [],
      activeName: 'first',
      dialogHeight: '',
      yearList: [
      ],
      barOptions: {},
      infoList: [],
      contract_state: '',
      customer_name: '',
      addContractVisible: false,
      modifyVisible: false,
      InfoState: false,
      id: '',
      contractInfo_header: {
        title: '-',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe7d1;',
            function: 'click1'
          }
        ],
        data: {}
      },
      contractInfo_body_contract: {
        title: '合同信息',
        info: []
      },
      contractInfo_body_room: {
        title: '房源信息',
        info: {
          label: [
            { prop: 'park_name', label: '园区' },
            { prop: 'building_name', label: '楼宇' },
            { prop: 'name', label: '房号' },
            { prop: 'area', label: '面积' },
            { prop: 'state', label: '房源状态', renderTags: true }
          ],
          tableData: []
        }
      },
      contractInfo_body1: {
        title: '企业信息',
        info: []
      },
      contractInfo_body_property: {
        title: '物业信息',
        info: []
      },
      publicOptions: {
        color: ['#4a8fcd', '#639ed5', '#8ebde6', '#37add0'],
        grid: {
          left: '80px',
          right: '40px'
        },
        barWidth: '20'
      },
      addDefaultValue: {
        state: 328, // 新增合同默认状态[签订]
        contract_type: 1, // 新增合同默认合同类型[房租]
        park_id: this.$store.state.form.activePark.domain_id
      },
      defaultValue: {
      },
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      },
      company_id: '',
      end_ts: 0
    }
  },
  methods: {
    formActive (data) {
      if (data.key === 'customer_id') {
        let customer = this.$store.state.form.customerList
        let obj = {}
        customer.forEach(v => {
          if (v.id === data.value) {
            obj.contacter = v.contacter
            obj.contact = v.contact
            obj.email = v.email
            obj.trade = v.status
          }
        })
        this.addDefaultValue = { ...this.addDefaultValue, ...obj }
      }
    },
    endContract (event, instance, echarts) {
      this.end_ts = event.dataIndex + 1
      this.fetchList()
    },
    handleAddContract () {
      this.addContractVisible = true
    },
    contractState (data) {
      this.id = data.contract_code
      // this.fetchGetInfo(this.id)
      this.InfoState = true
      this.contractInfo_header.title = data.customer_name
      this.contractInfo_header.data = data
      this.contractInfo_body_contract.info = [
        { name: '合同编号', value: data.contract_code },
        { name: '合同类型', value: data.contract_type },
        { name: '合同状态', value: data.state, tag: true },
        { name: '合同签订日', value: data.sign_ts },
        { name: '合同起租日', value: data.start_ts },
        { name: '合同失效日', value: data.end_ts },
        { name: '租赁面积', value: data.rent_area + '㎡' },
        { name: '计租时间', value: data.start_ts },
        { name: '结束时间', value: data.end_ts },
        { name: '合同单价', value: data.unit_price + '元/㎡·天' },
        { name: '月租金', value: data.month_rent + '元' },
        { name: '年租金', value: data.year_rent + '元' },
        { name: '付款周期', value: data.pay_cycle + '月一付' },
        { name: '提前收租', value: data.prepaid + '月' },
        { name: '收款日', value: '每月' + data.pay_date + '日' },
        { name: '押金', value: data.deposit + '元' }
      ]
      this.$dictionary.tableData(data.room, ['state'])
      this.contractInfo_body_room.info.tableData = data.room
      this.contractInfo_body1.info = [
        { name: '企业', value: data.customer_name },
        { name: '行业', value: data.trade },
        { name: '法人', value: data.representative },
        { name: '企业联系人', value: data.customer_name },
        { name: '签订人', value: data.customer_name }
      ]
      this.contractInfo_body_property.info = [
        { name: '管理面积', value: data.manage_area + '㎡' },
        { name: '签订时间', value: data.sign_ts },
        { name: '押金', value: data.property_deposit + '元' },
        { name: '合同单价', value: data.property_unit_price + '元/㎡·天' },
        { name: '公摊', value: data.equal_share + '元/㎡·天' },
        { name: '能耗', value: data.energy_consume + '元/㎡·天' },
        { name: '月物业费', value: data.property_month_rent + '元' },
        { name: '年物业费', value: data.property_year_rent + '元' },
        { name: '付款周期', value: data.property_pay_cycle + '月一付' },
        { name: '提前收费', value: data.property_prepaid + '月' },
        { name: '收款日', value: '每月' + data.property_pay_date + '日' },
        { name: '计费时间', value: data.property_fee_start_ts }
      ]
    },
    open (i) {
      if (i === '编辑') {
        this.InfoState = false
        this.$utils.timeOut(this.fetchGetBack)
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAddContract (data) { // 新增合同
      let params = {
        ...data
      }
      this.$https.post(this.$urls.contract.add, params).then(res => {
        if (res.code === 1000) {
          this.fetchList()
          this.addContractVisible = false
          this.$message.success('新增成功')
          this.$store.dispatch('getParkTreeList')
          this.$store.dispatch('getContractList')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    fetchList () { // 获取合同列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        state: this.contract_state,
        customer_name: this.customer_name
      }
      if (this.end_ts) {
        params.end_ts = this.end_ts
      }
      this.$https.post(this.$urls.contract.get_list, params).then((res) => {
        this.end_ts = 0
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['state', 'trade', 'charge_type', 'tenancy_divide', 'contract_type']
          this.$dictionary.tableData(list, params)
          this.$utils.getRooms(list)
          let stateList = {
            state: {
              '到期未处理': 'danger'
            }
          }
          this.$utils.tagState(list, stateList)
          this.page.total = res.total
          this.tableData = []
          this.tableData = list
        } else {
          this.page.total = 0
          // this.$message.warning('未找到相关数据')
          this.tableData = []
        }
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取合同信息
      let params = {
        contract_code: id
      }
      this.$https.post(this.$urls.contract.get_info, params).then((res) => {
        // console.log(res);
        let data = res
      })
    },
    fetchRemove (id) { // 删除合同
      this.$confirm('此操作将永久删除该合同, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          contract_code: id
        }
        this.$https.post(this.$urls.contract.remove, params).then((res) => {
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
    fetchModify (data) { // 修改合同
      let params = {
        ...data,
        contract_code: this.id,
        company_id: this.company_id
      }
      this.$https.post(this.$urls.contract.modify, params).then(res => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.defaultValue = {}
          this.fetchGetInfo(this.id)
          this.fetchList()
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchGetBack () {
      let params = {
        contract_code: this.id
      }
      this.$https.post(this.$urls.contract.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          this.modifyVisible = true
          this.company_id = data.company_id
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    },
    fetchInfo () { // 统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.contract.info, params).then(res => {
        if (res.code === 1000) {
          let arr = []
          // let dateArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          let dateArr = Object.keys(res.list)
          // dateArr.forEach(item => {
          //   arr.push(res.list[item])
          // })
          // this.barOptions.series[0].data = arr
          // console.log(arr)
          dateArr.forEach(item => {
            arr.push(
              {
                name: item,
                value: res.list[item]
              }
            )
          })
          let barName = '到期数量'
          this.barOptions = this.$charts.setBarOptions(arr, barName)
        }
      })
      this.$https.post(this.$urls.contract.get_month_info, params).then(res => {
        if (res.code === 1000) {
          let data = res.list
          this.infoList = [
            { name: '合同总数量', unit: '个', value: data.total_contract },
            { name: '合同总金额', unit: '万元', value: data.total_money },
            { name: '本月新增数量', unit: '个', value: data.increase },
            { name: '本月到期合同', unit: '个', value: data.expire }
          ]
        }
      })
    }
  },
  created () {
    this.fetchInfo()
  },
  mounted () {
    this.dialogHeight = document.documentElement.clientHeight
    let xAxisData = []
    let seriesData = []
    this.yearList.forEach(v => {
      xAxisData.push(v.name)
      seriesData.push(v.value)
    })
    this.$store.dispatch('getParkTreeList')
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
  .infoBox /deep/ .el-card__body{
      padding: 0;
    }
  .infoBox{
    height: 68px;
    width: 320px;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 8px;
    p{
      margin: 8px;
    }
    .name{
      text-align: left;
      color: @text-color;
      font-size: 16px;
    }
    .unit{
      text-align: center;
      color: @text-color-light;
      font-size: 12px;
    }
    .value{
      text-align: left;
      color: @blue;
      font-size: 24px;
      line-height: 60px;
    }
  }
</style>
