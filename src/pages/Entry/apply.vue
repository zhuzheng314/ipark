<template>
  <div>
    <el-card>
      <div>
        <el-select
        size="small"
        multiple
        style="width: 180px; margin-right: 15px"
        v-model="value1"
        placeholder="所属园区">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select
        size="small"
        style="width: 180px; margin-right: 15px"
        v-model="value2"
        placeholder="审批状态">
          <el-option
            v-for="item in options2"
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

        <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新增</el-button>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>进驻监控图</span>
      </div>
      <div class="chart">
        <v-chart style="width:100%;height: 300px;" :options="stackedAreaOptions"></v-chart>
      </div>
    </el-card>
    <el-card>
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
      :visible.sync="addVisible"
      width="800px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        v-if="addVisible"
        :formList="$formsLabels.applyForm"
        :options="$store.getters.applyListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
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
        <BodyCard type=1 :data="tenantsInfo_body1"></BodyCard>
        <BodyCard type=1 :data="tenantsInfo_body2"></BodyCard>
        <BodyCard type=2 :data="tenantsInfo_body_table1"></BodyCard>
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
          value: 1,
          label: '未审批'
        }, {
          value: 2,
          label: '审批中'
        }, {
          value: 3,
          label: '已通过'
        }, {
          value: 4,
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
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '删除',
            icon: '&#xe64a;',
            function: 'click1'
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
      tenantsInfo_body1: {
        title: '入驻性质',
        info: [
          { name: '入驻性质', value: '企业入驻' }, // 企业入驻、个人入驻、工位租赁、其他
          { name: '跟进人', value: '王秀兰' },
          { name: '备注', value: '-' }

        ]
      },
      tenantsInfo_body2: {
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
            { prop: 'a', label: '合同编号' },
            { prop: 'b', label: '楼宇/房间号/工位' },
            { prop: 'c', label: '租赁数' },
            { prop: 'h', label: '签订日期' },
            { prop: 'd', label: '开始日' },
            { prop: 'e', label: '结束日' },
            { prop: 'f', label: '合同单价' },
            { prop: 'g', label: '状态' },
            { prop: 'i', label: '签订人' }
          ],
          tableData: [
            { a: 'XXXX-XXXXXXX-XXXX', b: '华润中心/701/20', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行', h: '2019-09-15', i: '王秀兰' },
            { a: 'XXXX-XXXXXXX-XXXX', b: '华润中心/701/20', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行', h: '2019-09-15', i: '王秀兰' },
            { a: 'XXXX-XXXXXXX-XXXX', b: '华润中心/701/20', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行', h: '2019-09-15', i: '王秀兰' },
            { a: 'XXXX-XXXXXXX-XXXX', b: '华润中心/701/20', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行', h: '2019-09-15', i: '王秀兰' }
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
    handleClose () { },
    open (i) {
      if (i === '编辑') {
        this.fetchGetBack()
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
              backgroundColor: '#65C6E7'
            }
          }
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
          // tooltip:{axisPointer:{lineStyle:{color:"#65C6E7"}}},
          // borderColor: '#65C6E7'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {// 坐标轴刻度线
              show: true,
              inside: true,
              lineStyle: {
                // color:'#33E9FF',
              }
            },
            axisLine: {
              lineStyle: {
                // color: '#33E9FF',
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                // color: '#33E9FF',
              }
            },
            axisLabel: {// 刻度颜色
              // color:"#33E9FF",
            },
            splitLine: {
              lineStyle: {// 网格线
                width: 0,
                color: ['rgba(51, 233, 255, 0.6)']
              }
            }
          }
        ],
        // color : ['#00FEFF','#FFFF57'],
        series: [
          {
            type: 'line',
            areaStyle: { normal: {} },
            lineStyle: { width: 2 },

            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(54, 172, 254, 0.5)'
              }, {
                offset: 1, color: 'rgba(67, 144, 250, 0.1)'
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
        let data = res
        console.log(data)
      })
    },
    fetchAdd (data) { // 添加进驻
      let params = {
        ...data
      }
      this.$https.post(this.$urls.enter.add, params)
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
    fetchRemove (id) { // 删除进驻
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
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.enter.get_list, params).then((res) => {
        // console.log(res)
        this.page.total = res.total
        this.tableData = res.list
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
        // console.log(res);
        let data = res
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
    for (let i = 0; i < 24; i++) {
      this.yearList.push({
        name: 'yue' + i,
        value: (Math.random() * 100)
      })
    }
    let stackedAreaData = []
    for (let i = 0; i <= 12; i++) {
      stackedAreaData.push(Math.floor(Math.random() * 10))
    }
    this.stackedAreaOptions = this.stackedAreaChart(stackedAreaData)
    this.fetchInfo()
    this.fetchList()
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
