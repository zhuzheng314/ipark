<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>进驻监控图</span>
      </div>
      <div class="chart">
        <v-chart style="width:100%;height: 300px;" :options="stackedAreaOptions"></v-chart>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <el-select
          size="small"
          style="width: 180px; margin-right: 15px"
          v-model="approval_type"
          @change="fetchListSearch"
          clearable
          placeholder="审批状态">
          <el-option
            v-for="item in $store.state.dictionary.dictionaryType['approval_type']"
            :key="item && item.value"
            :label="item && item.label"
            :value="item && item.value">
          </el-option>
        </el-select>

        <el-date-picker
          size="small"
          v-model="date"
          @change="fetchListSearch"
          type="daterange"
          style="width: 220px; margin-right: 15px"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input
          placeholder="搜索企业"
          size="small"
          clearable
          style="width: 180px; margin-right: 15px"
          prefix-icon="el-icon-search"
          @change="fetchListSearch"
          v-model="customer_name">
        </el-input>

        <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新增</el-button>
      </div>
      <GTable
        @row-click="tenantsState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.applyList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建进驻"
      v-if="addVisible"
      :visible.sync="addVisible"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="() => {this.addVisible = false}"
        :formList="$formsLabels.applyForm"
        :options="$store.getters.applyListOptions"
        :defaultValue="addDefaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改进驻"
      v-if="modifyVisible"
      :visible.sync="modifyVisible"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="() => {this.modifyVisible = false}"
        :formList="$formsLabels.applyForm"
        :options="$store.getters.applyListOptions"
        :defaultValue="defaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>

<!--      企业详细信息-->
    <el-drawer
      title="企业详细信息"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="info_header">
        <template #headerCardBtns>
          <div v-for="(item,i) in info_header.button" :key="(item,i)">
            <div class="btnBox" v-if="item.name!=='进驻' || (item.name==='进驻' && state==='未进驻')" :style="{display: item.name==='进驻' && state!=='未进驻' ? 'none' : 'block'}" @click="open(item.name)">
              <i class="iconfont" v-html="item.icon"></i>
              <span class="headerCard-btn-name">{{item.name}}</span>
            </div>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="info_info"></HeaderInfo>
      <div class="drawer-body" :style="{height: bodyHeight}">
        <BodyCard type=1 :data="info_body"></BodyCard>
        <BodyCard type=2 :data="info_body_table"></BodyCard>
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
      bodyHeight: 0,
      tableData: [],
      activeName: 'first',
      yearList: [
      ],
      approval_type: '',
      date: [],
      customer_name: '',
      stackedAreaOptions: {},
      addVisible: false,
      InfoState: false,
      modifyVisible: false,
      info_header: {
        title: '-',
        button: [
          {
            name: '进驻',
            icon: '&#xe606;'
          },
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe64a;'
          }
        ],
        data: {}
      },
      info_info: {
        label: [
          { prop: 'state', label: '入驻状态' },
          { prop: 'start_ts', label: '入驻时间' },
          { prop: 'receiver', label: '跟进人' }
        ],
        tableData: []
      },
      info_body: {
        title: '联系人',
        info: []
      },
      info_body_table: {
        title: '合同',
        info: {
          label: [
            { prop: 'contract_code', label: '合同编号' },
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'rent_area', label: '租赁面积' },
            { prop: 'contract_start_ts', label: '开始日' },
            { prop: 'contract_end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'contract_state', label: '状态', renderTags: true },
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
      },
      id: '',
      state: ''
    }
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
  methods: {
    handleAddContract () {
      this.addVisible = true
    },
    tenantsState (data) {
      this.id = data.contract_code
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    handleClose () { },
    open (i) {
      if (i === '进驻') {
        if (this.state) {
          if (this.state === '已进驻') {
            this.$message.error('该企业已进驻')
          } else if (this.state === '已退驻') {
            this.$message.error('该企业已退驻')
          } else {
            this.$confirm('此操作将入驻该企业, 是否继续?', '提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              this.$https.post(this.$urls.enter.modify, {
                contract_code: this.id,
                state: 322
              }).then(res => {
                if (res.code === 1000) {
                  this.fetchList()
                  this.InfoState = false
                  this.$message.success('该企业已成功进驻')
                }
              })
            })
          }
        }
      }
      if (i === '编辑') {
        this.InfoState = false
        this.$utils.timeOut(this.fetchGetBack)
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    // 折线面积图
    stackedAreaChart (data) {
      let stackedAreaChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              // backgroundColor: '#65C6E7'
            }
          }
        },
        grid: {
          top: '5%',
          left: '20px',
          right: '20px',
          bottom: '20px',
          containLabel: true
          // tooltip:{axisPointer:{lineStyle:{color:"#65C6E7"}}},
          // borderColor: '#65C6E7'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {// 坐标轴刻度线
              show: false
            },
            axisLine: {
              show: false
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: false
            },
            axisTick: {// 坐标轴刻度线
              show: false
            },
            axisLabel: {// 刻度颜色
              // color:"#33E9FF",
            },
            splitLine: {
              lineStyle: {// 网格线
                width: 0
                // color: ['rgba(51, 233, 255, 0.6)']
              }
            }
          }
        ],
        // color : ['#00FEFF','#FFFF57'],
        series: [
          {
            type: 'line',
            areaStyle: { normal: {} },
            lineStyle: { width: 2, color: '#5C76EC' },
            symbol: 'none', // 去掉折线图中的节点
            smooth: true,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                // offset: 0, color: 'rgba(54, 172, 254, 0.5)'
                offset: 0, color: 'rgba(69, 94, 236, 0.5)'
              }, {
                // offset: 1, color: 'rgba(67, 144, 250, 0.1)'
                // offset: 1, color: 'rgba(54, 172, 254, 0.1)'
                offset: 1, color: 'rgba(69, 94, 236, 0.2)'
              }],
              global: false
            },
            data: data
          }
        ]
      }
      return stackedAreaChartOption
    },
    fetchInfo () { // 获取进驻监控图
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.enter.info, params).then((res) => {
        if (res.code === 1000) {
          let arr = []
          // let dateArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          // dateArr.forEach(item => {
          //   arr.push(res.list[item])
          // })
          // this.stackedAreaOptions = this.stackedAreaChart(arr)
          let dateArr = Object.keys(res.list)
          dateArr.forEach(item => {
            arr.push(
              {
                name: item,
                value: res.list[item]
              }
            )
          })
          this.stackedAreaOptions = this.$charts.setAreaOptions(arr)
        }
      })
    },
    fetchAdd (data) { // 添加进驻
      let params = {
        ...data,
        state: 322 // 进驻状态
      }
      this.$https.post(this.$urls.enter.add, params)
        .then(res => {
          if (res.code === 1000) {
            this.fetchList()
            this.addVisible = false
            this.$message.success('添加成功')
          } else {
            if (res.code === 1001) {
              this.$message.error('该用户已经入驻')
            } else {
              this.$message.error('添加失败')
            }
          }
        })
    },
    fetchRemove (id) { // 删除进驻
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          contract_code: id
        }
        this.$https.post(this.$urls.enter.remove, params).then((res) => {
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
    fetchModify (data) { // 修改进驻
      let params = {
        ...data,
        contract_code: this.id
      }
      this.$https.post(this.$urls.enter.modify, params).then((res) => {
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
    fetchList () { // 获取进驻列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id,
        state: this.approval_type,
        start_ts: this.date && this.date.length ? this.date[0] : '',
        end_ts: this.date && this.date.length ? this.date[1] : '',
        customer_name: this.customer_name
      }
      this.$https.post(this.$urls.enter.get_list, params).then((res) => {
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['company_type', 'state']
          this.$dictionary.tableData(list, params)
          this.$utils.getRooms(list)
          this.page.total = res.total
          this.tableData = []
          let stateList = {
            state: {
              '已进驻': 'success',
              '已退驻': 'danger'
            }
          }
          this.$utils.tagState(list, stateList)
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
    fetchGetInfo (id) { // 获取进驻信息
      let params = {
        contract_code: id
      }
      this.$https.post(this.$urls.enter.get_info, params).then((res) => {
        this.info_header.title = '-'
        this.info_info.tableData = []
        this.info_body.info = []
        this.info_body_table.info.tableData = []
        if (res.code === 1000) {
          let data = res
          data.state = this.$store.getters.getDicById(data.state)
          data.contract_state = this.$store.getters.getDicById(data.contract_state)
          this.state = data.state
          this.info_header.title = data.customer_name
          this.info_info.tableData.push({ ...data })
          // console.log(this.info_info.tableData)
          this.info_body.info = [
            { name: '联系人', value: data.contacter },
            { name: '电话', value: data.contact },
            { name: '邮箱', value: data.email }
          ]
          let contractList = [{ ...data }]
          this.$utils.getRooms(contractList)
          this.info_body_table.info.tableData = contractList
        }
      })
    },
    fetchGetBack () {
      let params = {
        contract_code: this.id
      }
      this.$https.post(this.$urls.enter.get_back, params).then(res => {
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
    this.$store.dispatch('getCustomerList')
    this.$store.dispatch('getContractList')
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
// .echarts {
//   width: 100%;
//   height: 100%;
// }
  .el-card{
    margin-bottom: 20px;
  }
</style>
