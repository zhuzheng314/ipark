<template>
  <div class="g-desk">
    <div style="width: 100%">
      <Statistic v-for="(item,i) in statistic" :key="(item,i)" :data="item"></Statistic>
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-card class="chartBox">
            <v-chart :options="columnOptions"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <v-chart :options="areaOptions1"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="chartBox">
            <v-chart :options="areaOptions2"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
            <v-chart :options="lineOptions"></v-chart>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chartBox">
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
      gaugeOptions: {},
      publicOptions: {
        // 颜色
        color: ['#4a8fcd', '#639ed5', '#8ebde6', '#37add0'],
        grid: {
          // 表距离边框距离
          left: '40px',
          right: '20px',
          top: '40px',
          bottom: '40px'
        },
        legend: {
          // 图例
          right: '40px',
          top: '8px',
          itemWidth: 30,
          height: 12,
          borderRadius: 10,
          textStyle: {
            // 文字
            color: '#999999',
            fontSize: 14
          },
          itemGap: 16
        },
        xAxis: {
          // x轴
          // type: 'category',
          axisLine: {
            // 轴线
            lineStyle: {
              type: 'dashed',
              color: '#C0C4CC'
            }
          },
          axisTick: {
            // 刻度线
            show: false
          }
        },
        yAxis: {
          // y轴
          axisLine: {
            show: false,
            lineStyle: {
              color: '#C0C4CC'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        barWidth: '12' // bar宽度
      }
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
    // 多组柱状图
    setColumnOptions (data) {
      let productData = ['product', '租金', '物业费', '其他']
      let colorList = [
        ['#85C3FE', '#358DD7'],
        ['#A0A7E6', '#977EFE'],
        ['#70DFDC', '#54BAB8']
      ]
      // let options = { ...this.publicOptions }
      let options = JSON.parse(JSON.stringify(this.publicOptions))
      options.tooltip = {
        trigger: 'item',
        formatter: params => {
          let { seriesName, name, value, componentIndex } = params
          return `${name} <br/> ${seriesName}: ${value[componentIndex + 1]}`
        }
      }
      options.dataset = {
        // 数据
        source: [productData, ...data]
      }

      options.xAxis.type = 'category' // 类型
      options.series = []
      for (let i = 0; i < productData.length - 1; i++) {
        options.series.push({
          type: 'bar',
          itemStyle: {
            barBorderRadius: 10,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                // 渐变颜色
                { offset: 0, color: colorList[i][0] },
                { offset: 1, color: colorList[i][1] }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        })
      }
      return options
    },
    // 面积图
    setAreaOptions (data) {
      let axis = []
      let value = []
      data.forEach(v => {
        axis.push(v.name)
        value.push(v.value)
      })
      // let options = { ...this.publicOptions }
      let options = JSON.parse(JSON.stringify(this.publicOptions))
      options.xAxis.type = 'category'
      options.xAxis.data = axis
      options.xAxis.boundaryGap = false
      options.series = {
        name: '合同数',
        data: value,
        type: 'line',
        color: '#7191FE',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#4FB0FD' },
              { offset: 1, color: '#fff' }
            ],
            global: false // 缺省为 false
          }
        }
      }
      return options
    },
    // 曲线图
    setLineOptions (data) {
      let axis = []
      let value = []
      data.forEach(v => {
        axis.push(v.name)
        value.push(v.value)
      })
      // let options = { ...this.publicOptions }
      let options = JSON.parse(JSON.stringify(this.publicOptions))
      options.xAxis.type = 'category'
      options.xAxis.boundaryGap = false
      options.xAxis.data = axis
      options.series = {
        name: '合同数',
        data: value,
        type: 'line',
        color: '#7191FE',
        smooth: true
      }
      return options
    },
    // 仪表盘
    setGaugeOptions (data) {
      // let options = { ...this.publicOptions }
      let options = JSON.parse(JSON.stringify(this.publicOptions))
      let color = {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          // 渐变颜色
          { offset: 0, color: '#358DD7' },
          { offset: 1, color: '#85C3FE' }
        ]
      }
      options.xAxis.show = false
      options.series = [
        {
          type: 'gauge',
          name: '外层辅助',
          radius: '62.5%',
          startAngle: '225',
          endAngle: '-45',
          splitNumber: '120',
          pointer: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: 1
            }
          ],
          // data: [{value: 1, name: 90}],
          title: {
            show: true,
            offsetCenter: [0, 30],
            textStyle: {
              color: '#fff',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 20
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, 'rgba(175, 175, 175, 0.3)']],
              width: 4,
              opacity: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            length: 20,
            lineStyle: {
              color: '#051932',
              width: 0,
              type: 'solid'
            }
          },
          axisLabel: {
            show: false
          }
        },
        {
          type: 'gauge',
          radius: '65%',
          axisTick: { show: false }, // 小刻度
          splitLine: {
            lineStyle: {
              color: '#14B2FF',
              width: 0
            },
            length: 10
          }, // 分隔线
          pointer: { show: false }, // 指针
          axisLabel: { show: false }, // 标签
          axisLine: {
            // 表盘
            show: true,
            lineStyle: {
              width: 10,
              color: [[data.value * 0.01, color], [1, 'rgba(0,0,0,0)']]
            }
          },
          title: {
            // 标题
            offsetCenter: [0, '30%'],
            fontSize: 16,
            color: '#666'
          },
          detail: {
            // 数值
            formatter: '{value}%',
            color: '#358DD7',
            offsetCenter: [0, '0%'],
            fontSize: 32
          },
          data: [{ value: data.value, name: data.name }]
        }
      ]

      return options
    },
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
            this.columnOptions = this.setColumnOptions(columnData)
            let lineData = [
              { name: '7月', value: 3 },
              { name: '8月', value: 5 },
              { name: '9月', value: 1 },
              { name: '10月', value: 6 },
              { name: '11月', value: 5 },
              { name: '12月', value: 2 }
            ]
            this.areaOptions1 = this.setAreaOptions(lineData)
            this.areaOptions2 = this.setAreaOptions(lineData)
            this.lineOptions = this.setLineOptions(lineData)
            this.gaugeOptions = this.setGaugeOptions({
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
    /deep/ .el-card__body {
      padding: 0;
      height: 100%;
    }
  }
}
</style>
