<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header">

        <el-select
          style="width: 220px;"
          size="small"
          v-model="value1"
          clearable
          @change="fetchListSearch"
          placeholder="费用类型">
          <el-option
            v-for="item in options"
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
        <el-select
          style="width: 220px; margin-left: 15px"
          size="small"
          v-model="value1"
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
          v-model="value3"
          size="small"
          style="margin-left: 15px"
          type="daterange"
          range-separator="至"
          clearable
          @change="fetchChargeList"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select  size="small"
          style="margin-left: 15px"
                    v-model="value3"
                    clearable
                    @change="fetchChargeList"
                    placeholder="是否逾期">
          <el-option
            v-for="item in stateOptions"
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
        :tableLabel="$tableLabels.otherList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建费用列支"
      :visible.sync="addVisible"
      width="600px"
    >
      <div>
        <ParkForm
          @onSubmit="fetchAdd"
          v-if="addVisible"
          @onCancel="() => {this.addVisible = false}"
          :formList="$formsLabels.otherForm"
          :options="$store.getters.rentListOptions"
          :defaultValue="{}"
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
        <BodyCard type=2 :data="financialInfo_body_table2"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table3"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table4"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table5"></BodyCard>

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
    defaultOption () {
      return {
        contract_code: this.$store.state.form.contractList
      }
    }
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [
      ],
      stateOptions: [
        {
          value: 0,
          label: '是'
        }, {
          value: 1,
          label: '否'
        }
      ],
      infoData: [
      ],
      listType: 'top',
      options: [
        {
          value: 0,
          label: '花卉租赁'
        }, {
          value: 1,
          label: '设备租赁'
        }, {
          value: 2,
          label: '场地租赁'
        }, {
          value: 3,
          label: '人员租赁'
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
      options2: [
        {
          value: 0,
          label: '10000以下'
        },
        {
          value: 1,
          label: '1000-50000'
        },
        {
          value: 2,
          label: '50000以上'
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
      financialInfo_header: {
        title: '收款方：杨',
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
      financialInfo_info: {
        label: [
          { prop: 'a', label: '账单状态' },
          { prop: 'b', label: '应退金额' },
          { prop: 'c', label: '需退金额' },
          { prop: 'd', label: '应退时间' }
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
            { prop: 'c', label: '借贷标' },
            { prop: 'd', label: '发生额' },
            { prop: 'e', label: '匹配金额' },
            { prop: 'f', label: '匹配时间' },
            { prop: 'g', label: '取消匹配时间' },
            { prop: 'h', label: '操作' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table2: {
        title: '付款',
        info: {
          label: [
            { prop: 'a', label: '对方单位名称' },
            { prop: 'b', label: '入账日' },
            { prop: 'c', label: '借贷标' },
            { prop: 'd', label: '发生额' },
            { prop: 'e', label: '匹配金额' },
            { prop: 'f', label: '匹配时间' },
            { prop: 'g', label: '取消匹配时间' },
            { prop: 'h', label: '操作' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table3: {
        title: '结转',
        info: {
          label: [
            { prop: 'a', label: '对方单位' },
            { prop: 'b', label: '转入金额' },
            { prop: 'c', label: '转出金额' },
            { prop: 'd', label: '结转时间' },
            { prop: 'e', label: '作废时间' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table4: {
        title: '开票记录',
        info: {
          label: [
            { prop: 'a', label: '购买方名称' },
            { prop: 'b', label: '发票号码' },
            { prop: 'c', label: '开票金额' },
            { prop: 'd', label: '备注' },
            { prop: 'e', label: '开票时间' },
            { prop: 'f', label: '状态' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table5: {
        title: '调整',
        info: {
          label: [
            { prop: 'a', label: '调整金额' },
            { prop: 'b', label: '调整时间' },
            { prop: 'c', label: '调整类型' },
            { prop: 'd', label: '备注' },
            { prop: 'e', label: '作废调整时间' },
            { prop: 'f', label: '操作' }
          ],
          tableData: []
        }
      },
      defaultValue: { },
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
        // this.modifyShow = true
        // this.fetchModify(this.id)
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
    },
    fetchModify (id) { // 修改费用列支
      let params = {
        id: id
      }
      this.$https.post(this.$urls.cost.modify, params).then((res) => {
        this.$message(`${res.msg}`)
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
        this.page.total = res.total
        this.tableData = []
        // this.tableData = res.list
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取费用列支信息
      let params = {
        customer_id: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.cost.get_info, params).then((res) => {
        // console.log(res)
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
