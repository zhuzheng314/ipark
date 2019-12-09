<template>
  <div>
    <!--    <el-card style="width: 100%">-->

    <!--    </el-card>-->
    <el-card>
      <div slot="header">

        <el-select  size="small"
                    v-model="value1"
                    clearable
                    @change="fetchChargeList"
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
          v-model="value2"
          clearable
          @change="fetchChargeList">
        </el-input>
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
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新增房租费</el-button>
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
      <GTable
        @row-click="financialState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.roomList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建收付款账单"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
          @onSubmit="fetchAdd"
          v-if="addVisible"
          :formList="$formsLabels.incomeForm"
          :options="$store.getters.incomeListOptions"
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
        { typeSelect: 'receive', name: `应收(${0}笔)`, value: '', chart: '', type: 'arrow' },
        { typeSelect: 'receive', name: `已收(${0}笔)`, value: '', chart: '', type: 'chart' },
        { typeSelect: 'receive', name: `未缴(${0}笔)`, value: '', chart: '', type: 'chart' },
        { typeSelect: 'receive', name: `房租费`, value: '', chart: '', type: 'arrow' }
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
        title: '付款方：-',
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
    financialState (row) {
      this.id = row.id
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
    },
    fetchModify (id) { // 修改财务收入
      let params = {
        id: id
      }
      this.$https.post(this.$urls.charge.modify, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchInfo () { // 获取财务收入统计信息
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
    fetchList () { // 获取财务收入列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        state: this.value1,
        like: this.value2,
        date: this.value3
      }
      // console.log(params)

      this.$https.post(this.$urls.charge.get_list, params).then((res) => {
        // console.log(res)
        this.page.total = res.total
        this.tableData = res.list
      })
    },
    fetchGetInfo (id) { // 获取财务收入信息
      let params = {
        id: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.charge.get_info, params).then((res) => {
        // console.log(res)
      })
    }
  },
  created () {
    this.fetchInfo()
    this.fetchList()
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
