<template>
  <div class="g-desk">
    <div class="clear" style="width: 100%">
      <Statistic v-for="(item,i) in statistic" :key="(item,i)" :data="item"></Statistic>
    </div>
    <div>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">园区总产值<span>197084</span>元</div>
            <v-chart :options="columnOptions"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <div class="title">本月合同<span>18</span>个</div>
            <v-chart :options="areaOptions1"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <div class="title">本月企业入驻<span>85</span>个</div>
            <v-chart :options="areaOptions2"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">本月收入<span>29299</span>元，费用<span>1998</span>元</div>
            <v-chart :options="lineOptions"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
            <div class="title">本月工单总数<span>29299</span>个</div>
            <el-row style="height: 100%;">
              <el-col :span="8" style="height: 100%;">
                <v-chart :options="gaugeOptions"></v-chart>
              </el-col>
              <el-col :span="16" style="height: 100%;">
                <v-chart :options="columnOptions"></v-chart>
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
      statistic: [],
      columnOptions: {},
      areaOptions1: {},
      areaOptions2: {},
      lineOptions: {},
      gaugeOptions: {}
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
            let arr = res.parkValue
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
                  { name: '入驻企业数(个)', value: data.firm[6] },
                  { name: '合同数(个)', value: data.pact_num }
                ],
                router: '/Entry/apply'
              },
              {
                color: '#54bab8',
                icon: '&#xe67e;',
                title: '园区产值',
                chart: [
                  { name: '房租费用(元)', value: data.rent },
                  { name: '总金额(元)', value: this.park_value }
                ],
                router: '/Park/park'
              },
              {
                color: '#33add0',
                icon: '&#xe63c;',
                title: '投诉报修',
                chart: [
                  { name: '投诉(个)', value: data.service[0] },
                  { name: '报修(个)', value: data.service[1] }
                ],
                router: '/property/complaint'
              },
              {
                color: '#b671bb',
                icon: '&#xe625;',
                title: '费用和缴催',
                chart: [
                  { name: '催缴数量(个)', value: data.service[2] },
                  { name: '已结清数量(个)', value: data.service[3] }
                ],
                router: '/property/payment'
              }
            ]
            // 总产值
            let columnData = [
              ['五月', 1, 4, 5],
              ['六月', 3, 6, 1],
              ['七月', 6, 4, 2],
              ['八月', 5, 2, 7],
              ['九月', 8, 4, 1],
              ['十月', 3, 3, 8],
              ['十一月', 8, 2, 7],
              ['十二月', 5, 4, 9]
            ]
            let productData = ['product', '租金', '物业费', '其他']
            this.columnOptions = this.$charts.setColumnOptions(productData, columnData)
            let areaData = [
              { name: '7月', value: 3 },
              { name: '8月', value: 5 },
              { name: '9月', value: 1 },
              { name: '10月', value: 6 },
              { name: '11月', value: 0 },
              { name: '12月', value: 0 }
            ]
            let areaName = '合同数'
            this.areaOptions1 = this.$charts.setAreaOptions(areaData, areaName)
            this.areaOptions2 = this.$charts.setAreaOptions(areaData, areaName)
            let lineData = {
              axis: ['7月', '8月', '9月', '10月', '11月', '12月'],
              data: [
                [3, 4, 6, 3, 7, 5],
                [5, 3, 7, 4, 6, 3]
              ]
            }
            this.lineOptions = this.$charts.setLineOptions(lineData, ['合同数1', '合同数2'])
            this.gaugeOptions = this.$charts.setGaugeOptions({
              name: '完成度',
              value: 55
            })
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
