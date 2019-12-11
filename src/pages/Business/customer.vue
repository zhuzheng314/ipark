<template>
  <div>
    <el-card style="width: 100%">
      <div>
        <el-select  size="small"
        v-model="value1"
        clearable
        @change="fetchListSearch"
        placeholder="进度阶段">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['customer_state']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  size="small"
        v-model="value2"
        clearable
        style="width: 220px; margin-left: 15px"
        @change="fetchListSearch"
        placeholder="来源渠道">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['customer_info_source']"
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
          v-model="value3">
        </el-input>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddCustomer"
        >客户</el-button>
      </div>
    </el-card>
    <el-card>
<!--      <el-radio-group v-model="radio" size="mini">-->
<!--        <el-radio-button label="收款"></el-radio-button>-->
<!--        <el-radio-button label="付款"></el-radio-button>-->
<!--      </el-radio-group>-->
      <div>
        <div :key="item.name" v-for="item in infoData" class="simple-item">
           <Comparison :type="item.type" :data="item"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
      <GTable
        @row-click="customerState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.businessCustomer"
        :tableData="tableData"
        >
      </GTable>
    </el-card>

    <el-dialog
      title="新建客户"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="() => {this.addVisible = false}"
        v-if="addVisible"
        :formList="$formsLabels.addCustomerForm"
        :options="$store.getters.customerListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改客户"
      :visible.sync="modifyVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        v-if="modifyVisible"
        :formList="$formsLabels.addCustomerForm"
        :options="$store.getters.customerListOptions"
        :defaultValue="defaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
<!--  客户详情-->
    <el-drawer
      title="客户详情"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="customerInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in customerInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type=1 :data="customerInfo_body_1"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_2"></BodyCard>
        <BodyCard type=3 :data="customerInfo_body_3"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_table">
          <template #btn>
            <el-button
              :style="{height: '80%',margin: 'auto 8px'}"
              size="mini"
            >发起合同</el-button>
          </template>
        </BodyCard>

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
  data () {
    return {
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [
      ],
      infoData: [
      ],
      options1: this.$store.getters.getDicInfoByCode('customer_state'),
      options2: [
        {
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '广告媒体'
        }, {
          value: 2,
          label: '中介'
        }, {
          value: 3,
          label: '客户自访'
        }, {
          value: 4,
          label: '其他'
        }
      ],
      value1: '',
      value2: '',
      value3: '',
      addVisible: false,
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
      InfoState: false,
      modifyVisible: false,
      id: '',
      customerInfo_header: {
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
        ]
      },
      customerInfo_body_1: {
        title: '客户信息',
        info: [
          { name: '名称', value: '-' },
          { name: '来访时间', value: '-' },
          { name: '客户状态', value: '-' },
          { name: '渠道', value: '-' },
          { name: '需求面积段', value: '-' },
          { name: '需求工位段', value: '-' },
          { name: '行业', value: '-' },
          { name: '预计签约时间', value: '-' },
          { name: '跟进人', value: '-' }
        ]
      },
      customerInfo_body_2: {
        title: '关注房源',
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
      customerInfo_body_3: {
        title: '备注',
        info: ''
      },
      customerInfo_body_table: {
        title: '合同',
        info: {
          label: [
            { prop: 'contract_code', label: '合同编号' },
            { prop: 'room', label: '楼宇/房间号' },
            { prop: 'rent_area', label: '租赁面积' },
            { prop: 'fee_start_ts', label: '开始日' },
            { prop: 'fee_end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'state', label: '状态' },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系人电话' }
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
    handleAddCustomer () {
      this.addVisible = true
    },
    customerState (data) { // 显示客户详情
      this.id = data.id
      this.fetchGetInfo(this.id)
      this.InfoState = true
      this.$https.post(this.$urls.contract.get_list, {
        park_id: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 999,
        customer_id: this.id
      }).then(res => {
        this.customerInfo_body_2.info.tableData = []
        this.customerInfo_body_table.info.tableData = []
        if (res.list.length) {
          let roomList = res.list[0].room
          for (let i = 0; i < roomList.length; i++) {
            roomList[i].state = this.$store.getters.getDicById(roomList[i].state)
          }
          this.customerInfo_body_2.info.tableData = roomList
          let contractList = res.list
          for (let i = 0; i < contractList.length; i++) {
            contractList[i].state = this.$store.getters.getDicById(contractList[i].state)
          }
          this.customerInfo_body_table.info.tableData = contractList
        }
      })
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
    test (page) {
      console.log(page)
    },
    fetchAdd (data) { // 添加客户
      let params = {
        ...data
      }
      params.room = data.room
      params.rooms = data.room
      this.$https.post(this.$urls.customer.add, params)
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
    fetchRemove (id) { // 删除客户
      this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          id: id
        }
        this.$https.post(this.$urls.customer.remove, params).then((res) => {
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
    fetchModify (data) { // 修改客户
      let params = {
        ...data,
        id: this.id
      }
      this.$https.post(this.$urls.customer.modify, params).then((res) => {
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
    fetchInfo () { // 获取客户管理统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.customer.info, params).then((res) => {
        if (res.code === 1000) {
          this.infoData = [
            { name: '初次接触', value: res.meet, chart: res.meet_rate || res.meet_drate, type: 'arrow' },
            { name: '成交客户', value: res.sign, chart: res.sign_rate, type: 'arrow' },
            { name: '流失客户', value: res.loss, chart: res.loss_rate, type: 'arrow' }
          ]
        }
      })
    },
    fetchList () { // 获取客户列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id
        // state: this.value1,
        // info_source: this.value2,
        // name: this.value3
      }
      this.$https.post(this.$urls.customer.get_list, params).then((res) => {
        // console.log(res)
        let list = res.list
        let params = ['state', 'info_source', 'demand_area', 'status']
        this.$dictionary.tableData(list, params)
        this.page.total = res.total
        this.tableData = []
        this.tableData = list
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取客户信息
      let params = {
        id: id
      }
      this.$https.post(this.$urls.customer.get_info, params).then((res) => {
        // console.log(res);
        let data = res
        this.customerInfo_header.title = data.name
        this.customerInfo_body_1.info = [
          { name: '名称', value: data.name },
          { name: '来访时间', value: data.create_ts },
          { name: '客户状态', value: this.$store.getters.getDicById(data.state) },
          { name: '渠道', value: this.$store.getters.getDicById(data.info_source) },
          { name: '需求面积段', value: this.$store.getters.getDicById(data.demand_area) },
          { name: '需求工位段', value: this.$store.getters.getDicById(data.work_station) },
          { name: '行业', value: this.$store.getters.getDicById(data.status) },
          { name: '预计签约时间', value: data.demand_ts },
          { name: '跟进人', value: data.receiver }
        ]
        this.customerInfo_body_3.info = data.memo
      })
    },
    fetchGetBack () {
      let params = {
        id: this.id
      }
      this.$https.post(this.$urls.customer.get_back, params).then(res => {
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
  // .simple-item{
  //   min-width: 140px;
  //   border-right: 2px solid rgb(230, 232, 238);
  //   padding-left: 20px;
  //   float: left;
  //   margin: 20px 30px 20px 0;
  //   .title{
  //     font-size: 12px;
  //     color: rgb(152, 154, 163);
  //     line-height: 12px;
  //     margin-bottom: 20px;
  //   }
  //   .value{
  //     font-size: 22px;
  //     color: rgb(31, 33, 46);
  //     height: 22px;
  //   }
  // }
</style>
