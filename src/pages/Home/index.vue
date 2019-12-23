<template>
  <div class="g-desk">
    <div class="clear g-desk-header">
      <Statistic v-for="(item,i) in statistic" :key="(item,i)" :data="item"></Statistic>
    </div>
    <div>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">园区总产值<span>{{parkTotal}}</span>元</div>
            <v-chart :options="parkChart"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <div class="title">本月合同<span>{{contractTotal}}</span>个</div>
            <v-chart :options="contractChart"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <div class="title">本月企业入驻<span>{{enterTotal}}</span>个</div>
            <v-chart :options="enterChart"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">本月收入<span>{{financialTotal[0]}}</span>元，费用<span>{{financialTotal[1]}}</span>元</div>
            <v-chart :options="financialChart"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">本月工单总数<span>{{propertyTotal}}</span>个</div>
            <el-row style="height: 100%;">
              <el-col :span="8" style="height: 100%;">
                <v-chart :options="propertyCompletion"></v-chart>
              </el-col>
              <el-col :span="16" style="height: 100%;">
                <v-chart :options="propertyChart"></v-chart>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Statistic from './Statistic/index.vue'
export default {
  name: 'home2',
  components: {
    Statistic
  },
  data () {
    return {
      a: {},
      statistic: [
        {
          color: '#A0A7E6',
          icon: '&#xe656;',
          title: '园区总览',
          chart: [
            { name: '建筑面积(㎡)', value: 0 },
            { name: '总投资(万元)', value: 0 }
          ],
          router: '/Park/park'
        },
        {
          color: '#358DD7',
          icon: '&#xe620;',
          title: '入驻企业及合同',
          chart: [
            { name: '入驻企业数(个)', value: 0 },
            { name: '合同数(个)', value: 0 }
          ],
          router: '/Entry/apply'
        },
        {
          color: '#54bab8',
          icon: '&#xe67e;',
          title: '园区产值',
          chart: [
            { name: '房租费用(元)', value: 0 },
            { name: '总金额(元)', value: 0 }
          ],
          router: '/Park/park'
        },
        {
          color: '#33add0',
          icon: '&#xe63c;',
          title: '投诉报修',
          chart: [
            { name: '投诉(个)', value: 0 },
            { name: '报修(个)', value: 0 }
          ],
          router: '/property/complaint'
        },
        {
          color: '#b671bb',
          icon: '&#xe625;',
          title: '费用和缴催',
          chart: [
            { name: '催缴数量(个)', value: 0 },
            { name: '已结清数量(个)', value: 0 }
          ],
          router: '/property/payment'
        }
      ],
      parkChart: {},
      parkTotal: 0,
      contractChart: {},
      contractTotal: 0,
      enterChart: {},
      enterTotal: 0,
      financialChart: {},
      financialTotal: [0, 0],
      propertyChart: {},
      propertyTotal: 0,
      propertyCompletion: {}
    }
  },
  mounted () {
    this.$store
      .dispatch('getParkList', {
        page_no: 1,
        page_size: 9999
      })
      .then(res => {
        this.fetchGetInfo()
      })
  },
  methods: {
    fetchGetInfo () {
      this.$https
        .post(this.$urls.desk.get_info, {
          park_id: this.$store.state.form.activePark.domain_id
        })
        .then(res => {
          if (res.code === 1000) {
            // console.log(res)
            let data = res
            // 统计卡片
            this.statistic = [
              {
                color: '#A0A7E6',
                icon: '&#xe656;',
                title: '园区总览',
                chart: [
                  { name: '建筑面积(㎡)', value: data.build_area },
                  { name: '总投资(万元)', value: data.total_invest }
                ],
                router: '/Park/park'
              },
              {
                color: '#358DD7',
                icon: '&#xe620;',
                title: '入驻企业及合同',
                chart: [
                  { name: '入驻企业数(个)', value: data.enterprises_number },
                  { name: '合同数(个)', value: data.contracts_number }
                ],
                router: '/Entry/apply'
              },
              {
                color: '#54bab8',
                icon: '&#xe67e;',
                title: '园区产值',
                chart: [
                  { name: '房租费用(元)', value: data.rent_cost },
                  { name: '总金额(元)', value: data.total_amount }
                ],
                router: '/Park/park'
              },
              {
                color: '#33add0',
                icon: '&#xe63c;',
                title: '投诉报修',
                chart: [
                  { name: '投诉(个)', value: data.complaint },
                  { name: '报修(个)', value: data.repair }
                ],
                router: '/property/complaint'
              },
              {
                color: '#b671bb',
                icon: '&#xe625;',
                title: '费用和缴催',
                chart: [
                  { name: '催缴数量(个)', value: data.payment },
                  { name: '已结清数量(个)', value: data.settle }
                ],
                router: '/property/payment'
              }
            ]
            // 总产值
            // this.parkTotal = data.parkTotal.total
            // let parkTotal = data.chart
            let parkTotal = {
              '五月': [1, 4, 5],
              '六月': [3, 6, 1],
              '七月': [6, 4, 2],
              '八月': [5, 2, 7],
              '九月': [8, 4, 1],
              '十月': [3, 3, 8],
              '十一月': [8, 2, 7],
              '十二月': [5, 4, 9]
            }
            let parkChart = []
            let parkProduct = Object.keys(parkTotal)
            parkProduct.forEach(item => {
              parkChart.push([item, ...parkTotal[item]])
            })
            this.parkChart = this.$charts.setColumnOptions(parkChart, ['product', '租金', '物业费', '其他'])
            // 合同
            let contractsChart = []
            let contractsTotal = {
              '7月': 3,
              '8月': 5,
              '9月': 1,
              '10月': 6,
              '11月': 0,
              '12月': 0
            }
            let contractsProduct = Object.keys(contractsTotal)
            contractsProduct.forEach(item => {
              contractsChart.push({
                name: item,
                value: contractsTotal[item]
              })
            })
            this.contractChart = this.$charts.setAreaOptions(contractsChart, '合同数')
            // 进驻
            let enterChart = []
            let enterTotal = {
              '7月': 3,
              '8月': 2,
              '9月': 4,
              '10月': 3,
              '11月': 1,
              '12月': 3
            }
            let enterProduct = Object.keys(enterTotal)
            enterProduct.forEach(item => {
              enterChart.push({
                name: item,
                value: enterTotal[item]
              })
            })
            this.enterChart = this.$charts.setAreaOptions(enterChart, '进驻数')
            let lineData = {
              axis: ['7月', '8月', '9月', '10月', '11月', '12月'],
              data: [
                [3, 4, 6, 3, 7, 5],
                [5, 3, 7, 4, 6, 3]
              ]
            }
            // 收支
            let financialChart = {
              axis: [],
              data: [[], []]
            }
            let financialTotal = {
              '7月': [33233, 31321],
              '8月': [42342, 32144],
              '9月': [42345, 12314],
              '10月': [35255, 12341],
              '11月': [25235, 14244],
              '12月': [73455, 26435]
            }
            financialChart.axis = Object.keys(financialTotal)
            financialChart.axis.forEach(item => {
              financialChart.data[0].push(financialTotal[item][0])
              financialChart.data[1].push(financialTotal[item][1])
            })
            this.financialChart = this.$charts.setLineOptions(financialChart, ['收入', '支出'])
            // 工单
            let propertyTotal = {
              '五月': [1, 4, 5],
              '六月': [3, 6, 1],
              '七月': [6, 4, 2],
              '八月': [5, 2, 7],
              '九月': [8, 4, 1],
              '十月': [3, 3, 8],
              '十一月': [8, 2, 7],
              '十二月': [5, 4, 9]
            }
            let propertyChart = []
            let propertyProduct = Object.keys(propertyTotal)
            propertyProduct.forEach(item => {
              propertyChart.push([item, ...propertyTotal[item]])
            })
            this.propertyCompletion = this.$charts.setGaugeOptions({
              name: '完成度',
              value: 55
            })
            this.propertyChart = this.$charts.setColumnOptions(propertyChart, ['product', '报修', '投诉', '催缴'])
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/index.less";
.echarts {
  width: 100%;
  height: 100%;
}
.g-desk {
  position: relative;
  .g-desk-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  /deep/ .box-card.statistic {
    width: 100%;
    & > .el-card__body {
      display: flex;
      justify-content: flex-start;
    }
  }
  .chartBox {
    height: 300px;
    margin-top: 16px;
    position: relative;
    /deep/ .el-card__body {
      padding: 0;
      height: 100%;
    }
  }
  .title {
    position: absolute;
    top: 6px;
    left: 8px;
    color: @text-color;
    span{
      font-size: 16px;
      color: @green;
      margin: 0 4px;
    }
  }
}
</style>
