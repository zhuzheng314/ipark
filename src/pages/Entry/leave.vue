<template>
  <div>
<!--    <el-card>-->
<!--      <div>-->
<!--        <el-select  size="small"-->
<!--                    multiple-->
<!--                    style="width: 180px; margin-right: 15px"-->
<!--                    v-model="value2"-->
<!--                    clearable-->
<!--                    placeholder="审批状态">-->
<!--          <el-option-->
<!--            v-for="item in this.$store.state.dictionary.dictionaryType['approval_type']"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->

<!--        <el-date-picker-->
<!--          size="small"-->
<!--          v-model="date"-->
<!--          type="daterange"-->
<!--          style="width: 220px; margin-right: 15px"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期">-->
<!--        </el-date-picker>-->
<!--        <el-input-->
<!--          placeholder="搜索企业"-->
<!--          size="small"-->
<!--          style="width: 180px; margin-right: 15px"-->
<!--          prefix-icon="el-icon-search"-->
<!--          v-model="value3">-->
<!--        </el-input>-->

<!--        &lt;!&ndash; <el-button-->
<!--          style="float: right;"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          @click="handleAddContract"-->
<!--        >新增</el-button> &ndash;&gt;-->
<!--      </div>-->
<!--    </el-card>-->
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>退驻监控图</span>
      </div>
      <div class="chart">
        <v-chart style="width:100%;height: 300px;" :options="stackedAreaOptions"></v-chart>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <el-select  size="small"
                    multiple
                    style="width: 180px; margin-right: 15px"
                    v-model="value2"
                    clearable
                    placeholder="审批状态">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['approval_type']"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          style="width: 220px; margin-right: 15px"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input
          placeholder="搜索企业"
          size="small"
          style="width: 180px; margin-right: 15px"
          prefix-icon="el-icon-search"
          v-model="value3">
        </el-input>

        <!-- <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新增</el-button> -->
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
      title="修改进驻"
      :visible.sync="modifyVisible"
      width="800px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        v-if="modifyVisible"
        :formList="$formsLabels.applyForm"
        :options="$store.getters.applyListOptions"
        :defaultValue="defaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <!--      租客详细信息-->
    <el-drawer
      title="租客详细信息"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="tenantsInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in tenantsInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="tenantsInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="tenantsInfo_body"></BodyCard>
        <BodyCard type=2 :data="tenantsInfo_body_table1"></BodyCard>
        <!-- <BodyCard type=2 :data="tenantsInfo_body_table2"></BodyCard> -->
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
      yearList: [
      ],
      options1: [ ],
      options2: [
        {
          value: '选项1',
          label: '未审批'
        }, {
          value: '选项2',
          label: '审批中'
        }, {
          value: '选项3',
          label: '已通过'
        }, {
          value: '选项4',
          label: '未通过'
        }
      ],
      date: [],
      value1: '',
      value2: '',
      value3: '',
      stackedAreaOptions: {},
      addVisible: false,
      InfoState: false,
      modifyVisible: false,
      tenantsInfo_header: {
        title: '杭州拓源科技有限公司',
        button: [
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
      tenantsInfo_info: {
        label: [
          { prop: 'a', label: '入驻时间' },
          { prop: 'b', label: '法人' },
          { prop: 'c', label: '成立时间' },
          { prop: 'd', label: '行业分类' },
          { prop: 'e', label: '联系人' },
          { prop: 'f', label: '证件号码' },
          { prop: 'g', label: '注册资本' },
          { prop: 'h', label: '企业地址' },
          { prop: 'i', label: '标签' },
          { prop: 'j', label: '最新备注' }
        ],
        tableData: [{
          a: '2018/10/28',
          b: '王秀兰',
          c: '2015/01/25',
          d: '网络科技',
          e: '-',
          f: '313598198015243245',
          g: '200万元人民币',
          h: '杭州经济开发区',
          i: '软件互联网',
          j: '-'

        }]
      },
      tenantsInfo_body: {
        title: '抬头发票',
        info: [
          { name: '纳税人识别号', value: '5465489518XX' },
          { name: '账号', value: '35495448' },
          { name: '开户银行', value: '中国银行股份有限公司杭州大学城支行' },
          { name: '电话', value: '0517-88222222' },
          { name: '开票地址', value: '杭州经济开发区' }

        ]
      },
      tenantsInfo_body_table1: {
        title: '合同',
        info: {
          label: [
            { prop: 'a', label: '租客' },
            { prop: 'b', label: '楼宇/房间号' },
            { prop: 'c', label: '租赁数' },
            { prop: 'd', label: '开始日' },
            { prop: 'e', label: '结束日' },
            { prop: 'f', label: '合同单价' },
            { prop: 'g', label: '状态' }
          ],
          tableData: [
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' }
          ]
        }
      },
      defaultValue: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      },
      id: ''
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
    fetchInfo () {
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.enter.get_leave_info, params).then((res) => {
        if (res.code === 1000) {
          let arr = []
          let dateArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          dateArr.forEach(item => {
            arr.push(res.list[item])
          })
          this.stackedAreaOptions = this.stackedAreaChart(arr)
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
    fetchList () { // 获取退驻列表
      let params = {
        ...this.page,
        state: 0,
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.enter.get_list, params).then((res) => {
        // console.log(res)
        let list = res.list
        let params = ['company_type', 'state']
        this.$dictionary.tableData(list, params)
        this.page.total = res.total
        this.tableData = []
        this.tableData = res.list
      })
    },
    fetchGetInfo (id) { // 获取退驻信息
      let params = {
        contract_code: id
      }
      this.$https.post(this.$urls.enter.get_info, params).then((res) => {
        // console.log(res);
        let data = res
      })
    },
    fetchModify (data) { // 修改退驻
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
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchList()
    for (let i = 0; i < 24; i++) {
      this.yearList.push({
        name: 'yue' + i,
        value: (Math.random() * 100)
      })
    }
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
