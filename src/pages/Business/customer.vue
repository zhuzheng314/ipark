<template>
  <div>
    <el-card>
      <div>
        <div :key="item.name" v-for="item in infoData" class="simple-item">
           <Comparison :type="item.type" :data="item"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
      <div slot="header">
        <el-select  size="small"
        v-model="customer_state"
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
        v-model="customer_info_source"
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
          v-model="name">
        </el-input>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddCustomer"
        >客户</el-button>
      </div>
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
<!-- 新增客户 -->
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="新建客户"
      v-if="addVisible"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="() => {this.addVisible = false}"
        :formList="$formsLabels.addCustomerForm"
        :options="$store.getters.customerListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
<!-- 修改客户 -->
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="修改客户"
      v-if="modifyVisible"
      :visible.sync="modifyVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="() => {this.modifyVisible = false}"
        :formList="$formsLabels.addCustomerForm"
        :options="$store.getters.customerListOptions"
        :defaultValue="defaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
<!-- 新建合同 -->
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="新建合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      v-if="addContractVisible"
      :visible.sync="addContractVisible">
      <div>
        <ParkForm
        @onSubmit="fetchAddContract"
        @onCancel="() => {this.addContractVisible = false}"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :default-value="{}"
        :itemList="[]"
        :defaultValue="defaultValueContract"
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
      <div class="drawer-body" :style="{height: bodyHeight}">
        <BodyCard type=1 :data="customerInfo_body_customer"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_rooms"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_demand_room"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_memo"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_table">
          <template #btn>
            <el-button
              :style="{height: '80%',margin: 'auto 8px'}"
              size="mini"
              @click="addContract"
            >发起合同</el-button>
          </template>
        </BodyCard>
        <BodyCard type=3 :data="customerInfo_body_memo"></BodyCard>
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
      radio: '收款',
      yearList: [
      ],
      infoData: [
      ],
      customer_state: '',
      customer_info_source: '',
      name: '',
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
      addContractVisible: false,
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
      customerInfo_body_customer: {
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
      customerInfo_body_rooms: {
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
      customerInfo_body_demand_room: {
        title: '意向房源信息',
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
      customerInfo_body_memo: {
        title: '备注',
        info: ''
      },
      customerInfo_body_table: {
        title: '合同',
        info: {
          label: [
            { prop: 'contract_code', label: '合同编号' },
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'rent_area', label: '租赁面积' },
            { prop: 'start_ts', label: '开始日' },
            { prop: 'end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'state', label: '状态', renderTags: true },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系人电话' }
          ],
          tableData: []
        }
      },
      defaultValue: {},
      defaultValueContract: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      }

    }
  },
  methods: {
    addContract () { // 打开添加合同表单
      this.defaultValueContract = {
        customer_id: this.id
      }
      this.addContractVisible = true
    },
    fetchAddContract (data) { // 新增合同
      let params = {
        ...data
      }
      this.$https.post(this.$urls.contract.add, params).then(res => {
        if (res.code === 1000) {
          this.fetchGetInfo(this.id)
          this.addContractVisible = false
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    handleAddCustomer () {
      this.addVisible = true
    },
    customerState (data) { // 显示客户详情
      this.id = data.id
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    open (i) {
      if (i === '编辑') {
        this.InfoState = false
        this.fetchGetBack()
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAdd (data) { // 添加客户
      let params = {
        ...data
      }
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
        // park_id: this.$store.state.form.activePark.domain_id,
        state: this.customer_state,
        info_source: this.customer_info_source,
        name: this.name
      }
      this.$https.post(this.$urls.customer.get_list, params).then((res) => {
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['state', 'info_source', 'demand_area', 'status']
          this.$dictionary.tableData(list, params)
          this.page.total = res.total
          this.tableData = []
          this.tableData = list
        } else {
          this.page.total = 0
          // this.$message.warning('未找到相关数据')
          this.tableData = []
        }
      })
      this.$store.dispatch('getCustomerList')
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
        this.customerInfo_body_demand_room.info.tableData = []
        if (res.code === 1000) {
          let data = res
          this.customerInfo_header.title = data.name
          this.customerInfo_body_customer.info = [
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
          this.customerInfo_body_memo.info = data.memo
          let demandRoomList = []
          this.customerInfo_body_demand_room.info.tableData = data.demand_room
        }
      })
      this.$https.post(this.$urls.contract.get_list, {
        park_id: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 999,
        customer_id: this.id
      }).then(res => {
        this.customerInfo_body_rooms.info.tableData = []
        this.customerInfo_body_table.info.tableData = []
        if (res.list.length) {
          let roomList = []
          res.list.forEach(x => {
            x.room.forEach(y => {
              roomList.push(y)
            })
          })
          this.$dictionary.tableData(roomList, ['state'])
          this.customerInfo_body_rooms.info.tableData = roomList
          let contractList = res.list
          this.$utils.getRooms(contractList)
          this.$dictionary.tableData(contractList, ['state'])
          this.customerInfo_body_table.info.tableData = contractList
        }
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
    // this.$utils.dialogHeight()
    // console.log(document.querySelector('.el-drawer__body'))
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
  .drawer-body{
    overflow: auto;
    padding: 0 0 20px 0;
    // border: 1px solid #f00;
  }
</style>
