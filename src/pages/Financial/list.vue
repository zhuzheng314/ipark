<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header">

        <!-- <el-radio-group v-model="listType" size="small">
          <el-radio-button label="top">收款</el-radio-button>
          <el-radio-button label="right">付款</el-radio-button>
        </el-radio-group> -->

        <el-select
          style="width: 220px;"
          size="small"
          v-model="value1"
          clearable
          @change="fetchListSearch"
          placeholder="列支方向">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['cost_log_type']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
          style="width: 220px; margin-left: 15px"
          size="small"
          v-model="value2"
          clearable
          @change="fetchListSearch"
          placeholder="状态">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['cost_state']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          placeholder="搜索"
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
          @click="handleAddContract"
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
        :tableLabel="$tableLabels.financialList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建费用列支"
      v-if="addVisible"
      :visible.sync="addVisible"
      width="600px"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
    >
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="addVisible = false"
        :formList="$formsLabels.financialForm"
        :options="$store.getters.financialListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改费用列支"
      v-if="modifyVisible"
      :visible.sync="modifyVisible"
      width="600px"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
    >
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="modifyVisible = false"
        :formList="$formsLabels.financialForm"
        :options="$store.getters.financialListOptions"
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
    // defaultOption () {
    //   return {
    //     contract_code: this.$store.state.form.contractList,
    //     customer_id: this.$store.state.form.customerList
    //   }
    // }
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
      listType: 'top',
      options: [
        {
          value: 0,
          label: '收款'
        }, {
          value: 1,
          label: '付款'
        }
      ],
      options1: [
        {
          value: 0,
          label: '已缴'
        },
        {
          value: 1,
          label: '未缴'
        }
      ],
      value1: '',
      value2: '',
      value3: '',
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
          { prop: 'cost_type', label: '类型' },
          { prop: 'cost', label: '金额' }
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
    financialState (data) { // 显示列支详情
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
    fetchAdd (data) { // 添加费用列支
      let params = {
        ...data
      }
      this.$https.post(this.$urls.cost.add, params)
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
    fetchRemove (id) { // 删除费用列支
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          id: id
        }
        this.$https.post(this.$urls.cost.remove, params).then((res) => {
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
    fetchModify (data) { // 修改费用列支
      let params = {
        ...data,
        id: this.id
      }
      this.$https.post(this.$urls.cost.modify, params).then((res) => {
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
    fetchInfo () { // 获取费用列支统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.cost.info, params).then((res) => {
        if (res.code === 1000) {
          this.infoData = [
            { typeSelect: 'pay', name: `应付(${res.need_pay_num}笔)`, value: res.need_pay, chart: res.need_pay_rate, type: 'arrow' },
            { typeSelect: 'pay', name: '已付', value: res.pay, chart: res.pay_rate, type: 'arrow' },
            { typeSelect: 'pay', name: `未付(${res.un_pay_num}笔)`, value: res.un_pay, chart: res.un_pay_rate, type: 'arrow' },
            { typeSelect: 'receive', name: `应收(${res.need_receive_num}笔)`, value: res.need_receive, chart: res.need_receive_rate, type: 'arrow' },
            { typeSelect: 'receive', name: '已收', value: res.receive, chart: res.receive_rate, type: 'arrow' },
            { typeSelect: 'receive', name: `未缴(${res.un_receive_num}笔)`, value: res.un_receive, chart: res.un_receive_rate, type: 'arrow' }
          ]
        }
      })
    },
    fetchList () { // 获取费用列支列表
      let search = {
        log_type: this.value1,
        state: this.value2,
        like: this.value3
      }
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        ...search
      }
      this.$https.post(this.$urls.cost.get_list, params).then((res) => {
        // console.log(res)
        this.tableData = []
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['log_type', 'cost_type', 'state']
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
      this.$https.post(this.$urls.cost.get_info, params).then((res) => {
        let data = res
        this.info_body_expense.info = []
        this.info_body_room.info.tableData = []
        data.state = this.$store.getters.getDicById(data.state)
        data.cost_type = this.$store.getters.getDicById(data.cost_type)

        this.info_header.title = '付款方：' + data.payer
        this.info_info.tableData.push({ ...data })
        this.info_body_expense.info = [
          { name: '费用编号', value: data.id },
          { name: '合同编号', value: data.contract_code },
          { name: '费用类型', value: data.cost_type },
          { name: '费用金额', value: data.cost },
          { name: '跟进人', value: data.receiver },
          { name: '状态', value: data.state },
          { name: '周期开始时间', value: data.start_ts },
          { name: '周期结束时间', value: data.end_ts },
          { name: '客户名字', value: data.customer },
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
      this.$https.post(this.$urls.cost.get_back, params).then(res => {
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
  // .simple-item{
    // min-width: 140px;
    // border-right: 2px solid rgb(230, 232, 238);
    // padding-left: 20px;
    // float: left;
    // margin: 20px 30px 20px 0;
    // .title{
    //   font-size: 12px;
    //   color: rgb(152, 154, 163);
    //   line-height: 12px;
    //   margin-bottom: 20px;
    // }
    // .value{
    //   font-size: 22px;
    //   color: rgb(31, 33, 46);
    //   height: 22px;
    // }
  // }
</style>
