<template>
  <div>
    <el-card style="width: 100%">
      <div>
        <el-select  size="small"
        v-model="value1"
        clearable
        @change="fetchList2"
        placeholder="进度阶段">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  size="small"
        v-model="value2"
        clearable
        @change="fetchList2"
        placeholder="来源渠道">
          <el-option
            v-for="item in options2"
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
          @change="fetchList2"
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
        <div :key="item.name" v-for="item in finData" class="simple-item">
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
        :tableLabel="$tableLabels.businessCustomer"
        :tableData="tableData"
        :page="page">
      </GTable>
    </el-card>

    <el-dialog
      title="新建客户"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
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
        <BodyCard type=1 :data="customerInfo_body_2"></BodyCard>
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
      finData: [
        { name: '初次接触', value: '', chart: '', type: 'arrow' },
        { name: '成交客户', value: '', chart: '', type: 'arrow' },
        { name: '流失客户', value: '', chart: '', type: 'arrow' }
      ],
      options1: [
        {
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '初次来访'
        }, {
          value: 2,
          label: '意向客户'
        }, {
          value: 3,
          label: '成交客户'
        }, {
          value: 4,
          label: '休眠客户'
        }
      ],
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
      id: '',
      customerInfo_header: {
        title: '-',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          // {
          //   name: '删除',
          //   icon: '&#xe7d1;',
          //   function: 'click1'
          // },
          {
            name: '更多',
            icon: '&#xe86d;',
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
        info: [
          { name: '所属园区', value: '西港发展中心' },
          { name: '楼宇/房间号', value: '协力大厦/302' },
          { name: '房源面积', value: '300㎡' },
          { name: '房源状态', value: '空置' }
        ]
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
            { prop: 'start_ts', label: '开始日' },
            { prop: 'end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'state', label: '状态' },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系人电话' }
          ],
          tableData: []
        }
      },
      defaultValue: {
        contact: '15895642356',
        contacter: '金',
        create_ts: '2019-12-30T16:00:00.000Z',
        demand_area: 1,
        demand_ts: '2019-12-30T16:00:00.000Z',
        email: '',
        info_source: 0,
        memo: '',
        name: '客户丙',
        receiver: '金',
        room: [[17, 21, 23]],
        state: 0,
        status: 0,
        work_station: 2
      },
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
        console.log(res.list.length)
        this.customerInfo_body_table.info.tableData = res.list
      })
    },
    handleClose () { },
    open (i) {
      if (i === '编辑') {
        // this.modifyShow = true
        this.fetchModify(this.id)
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
      params.room = [489]
      params.rooms = [489]
      this.$https.post(this.$urls.customer.add, params)
        .then(this.fetchList())
        .then(this.addVisible = false)
    },
    fetchRemove (id) { // 删除客户
      let params = {
        id: id
      }
      this.$https.post(this.$urls.customer.remove, params).then((res) => {
        this.$message(`${res.msg}`)
        if (res.code === 1000) {
          this.fetchList()
          this.InfoState = false
        }
      })
    },
    fetchModify (id) { // 修改客户
      let params = {
        id: id
      }
      this.$https.post(this.$urls.customer.modify, params).then((res) => {
        this.$message(`${res.msg}`)
        if (res.code === 1000) {
          this.fetchList()
        }
      })
    },
    fetchInfo () { // 获取客户管理统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        page_no: 1,
        page_size: 999
      }
      this.$https.post(this.$urls.customer.info, params).then((res) => {
        let data = res.data
        this.finData.forEach(v => {
          v.value = data[v.key]
          v.chart = data[v.key + '_rate']
        })
      })
    },
    fetchList () { // 获取客户列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id,
        state: this.value1,
        info_source: this.value2,
        name: this.value3
      }
      this.$https.post(this.$urls.customer.get_list, params).then((res) => {
        // console.log(res)
        this.page.total = res.total
        this.tableData = res.list
      })
    },
    fetchList2 () {
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
          { name: '客户状态', value: data.state },
          { name: '渠道', value: data.info_source },
          { name: '需求面积段', value: data.demand_area },
          { name: '需求工位段', value: data.work_station },
          { name: '行业', value: data.status },
          { name: '预计签约时间', value: data.demand_ts },
          { name: '跟进人', value: data.receiver }
        ]
        this.customerInfo_body_3.info = data.memo
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
