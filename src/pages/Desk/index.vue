<template>
<div class="g-desk">
  <div style="width: 100%">
    <Statistic v-for="(item,i) in statistic" :key="(item,i)" :data="item"></Statistic>
  </div>
  <el-row :gutter="24">
    <el-col :span="9">
      <div class="left">
        <!-- 园区产值 -->
        <ChartBox type=0 :data="chartBox1">
          <template #data>
            <div class="dataBox">
              <div class="name">总产值</div>
              <div class="value">
                365046
                <span class="unit">元</span>
              </div>
            </div>
            <!-- <div class="name">租金</div>
            <div class="value">193868元</div>
            <div class="name">物业</div>
            <div class="value">122503元</div>
            <div class="name">其他</div>
            <div class="value">48675元</div> -->
          </template>
          <template #chart>
            <!-- <g2-column :type="'dodge'" :is-bar="false"
              :height="250"
              :data="[
                { name: '2016', value: 64085, type: '租金' },
                { name: '2017', value: 86085, type: '租金' },
                { name: '2018', value: 144776, type: '租金' },
                { name: '2019', value: 193868, type: '租金' },
                { name: '2016', value: 14085, type: '物业费' },
                { name: '2017', value: 9616, type: '物业费' },
                { name: '2018', value: 35715, type: '物业费' },
                { name: '2019', value: 122503, type: '物业费' },
                { name: '2016', value: 54085, type: '其他' },
                { name: '2017', value: 44122, type: '其他' },
                { name: '2018', value: 45153, type: '其他' },
                { name: '2019', value: 48675, type: '其他' }]"
              :axis-name="{name:'年份', value:'GDP(元)', type:'园区'}">
            </g2-column> -->
            <v-chart :options="columnOptions"></v-chart>
          </template>
        </ChartBox>
        <!-- 入驻企业生长指标 -->
        <ChartBox type=0 :data="chartBox2">
          <template #data>
            <div class="dataBox">
              <div class="name">企业入驻个数</div>
              <div class="value">
                79
                <span class="unit">个</span>
              </div>
            </div>
          </template>
          <template #chart>
            <!-- <g2-custom  :is-smooth="false" :padding="['auto', 100]"
              :height="250"
              :option="lineOption"
              style="width:120%;"
              :data="[{ name: '6月', value: 14 },
                { name: '7月', value: 26 },
                { name: '8月', value: 36 },
                { name: '9月', value: 50 },
                { name: '10月', value: 66 },
                { name: '11月', value: 79 }]"
              :axis-name="{name:'月份', value:'入驻个数'}">
            </g2-custom> -->
            <v-chart :options="lineOptions1"></v-chart>
          </template>
        </ChartBox>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="center">
        <!-- 物业服务指数 -->
        <ChartBox type=1 :data="chartBox3">
          <template #chart>
            <!-- <g2-column :is-bar="true"
              :height="350"
              style="width:100%"

              :option="customOption"
              :data="[
              {name: '投诉', value: 1},
              {name: '维修', value: 21},
              {name: '保洁', value: 42},
              {name: '报事', value: 36}
              ]"
              :axis-name="{name:'数量', value:'数量'}">
            </g2-column> -->
            <v-chart :options="barOptions"></v-chart>
          </template>
          <template #data>
            <!-- <el-row :gutter="20">
              <el-col :span="6">
                <div class="dataBox">
                  <div class="name">本月维修</div>
                  <div class="value">21个</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="dataBox">
                  <div class="name">本月保洁</div>
                  <div class="value">42个</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="dataBox">
                  <div class="name">本月报事</div>
                  <div class="value">36个</div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="dataBox">
                  <div class="name">本月投诉</div>
                  <div class="value">1个</div>
                </div>
              </el-col>
            </el-row> -->
            <div class="data-chart">
              <v-chart :options="gaugeOptions"></v-chart>
            </div>
            <div class="dataBox">
              <div class="name">本月工单总数</div>
              <div class="value">
                100
                <span class="unit">个</span>
              </div>
            </div>
          </template>
        </ChartBox>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="right">
        <!-- 合同及账单 -->
        <ChartBox type=0 :data="chartBox4">
          <template #data>
            <div class="dataBox">
              <div class="name">本月合同</div>
              <div class="value">
                18
                <span class="unit">个</span></div>
            </div>
            <!-- <div class="dataBox">
              <div class="name">本月账单</div>
              <div class="value">33个</div>
            </div>
            <div class="dataBox">
              <div class="name">入住率</div>
              <div class="value">78%</div>
            </div> -->
          </template>
          <template #chart>
            <!-- <g2-line :is-smooth="false" :padding="['auto', 20]"
              :height="250"
              :data="[{ name: '6月', value: 10 },
                { name: '7月', value: 14 },
                { name: '8月', value: 21 },
                { name: '9月', value: 17 },
                { name: '10月', value: 22 },
                { name: '11月', value: 18 },]"
              :axis-name="{name:'月份', value:'本月合同数量'}">
            </g2-line> -->
            <v-chart :options="lineOptions2"></v-chart>
          </template>
        </ChartBox>
        <!-- 税收/坪效 -->
        <ChartBox type=0 :data="chartBox5">
          <template #data>
            <div class="dataBox">
              <div class="name">总税收</div>
              <div class="value">
                68
                <span class="unit">万元</span></div>
            </div>
            <!-- <div class="dataBox">
              <div class="name">5-10万</div>
              <div class="value">21个</div>
            </div>
            <div class="dataBox">
              <div class="name">10-20万</div>
              <div class="value">20个</div>
            </div>
            <div class="dataBox">
              <div class="name">20万以上</div>
              <div class="value">8个</div>
            </div> -->
          </template>
          <template #chart>
            <!-- <g2-pie :type="'nightingale'"
              :height="250"
              :axis-name="{name:'坪效', value:'个数'}"
              :data="[{ name: '5万以下', value: 10 },{ name: '5-10万', value: 21 },{ name: '10-20万', value: 13 },{ name: '20万以上', value: 8 }]"
              :inner-radius="0.2" >
            </g2-pie> -->
            <v-chart :options="doughnutOptions"></v-chart>
          </template>
        </ChartBox>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import Statistic from './Statistic/index.vue'
import ChartBox from './ChartBox/index.vue'
export default {
  name: 'desk',
  components: {
    Statistic, ChartBox
  },
  data () {
    return {
      statistic: [
        {
          color: '#A0A7E6',
          icon: '&#xe656;',
          title: '园区总览',
          chart: [
            { name: '建筑面积(㎡)', value: 3256 },
            { name: '总投资(万元)', value: 3245 }
          ],
          router: '/Park/park'
        },
        {
          color: '#358DD7',
          icon: '&#xe620;',
          title: '入驻企业及合同',
          chart: [
            { name: '入驻企业数(个)', value: 65 },
            { name: '合同数(个)', value: 80 }
          ],
          router: '/Entry/apply'
        },
        {
          color: '#54bab8',
          icon: '&#xe67e;',
          title: '园区产值',
          chart: [
            { name: '房租费用(元)', value: 654821 },
            { name: '总金额(元)', value: 865624 }
          ],
          router: '/Park/park'
        },
        {
          color: '#33add0',
          icon: '&#xe63c;',
          title: '投诉报修',
          chart: [
            { name: '投诉(个)', value: 1 },
            { name: '报修(个)', value: 23 }
          ],
          router: '/property/complaint'
        },
        {
          color: '#b671bb',
          icon: '&#xe625;',
          title: '费用和缴催',
          chart: [
            { name: '催缴数量(个)', value: 32 },
            { name: '已结清数量(个)', value: 48 }
          ],
          router: '/property/payment'
        }
      ],
      chartBox1: {
        title: '园区产值'
      },
      chartBox2: {
        title: '入驻企业生长指标'
      },
      chartBox3: {
        title: '物业服务指数'
      },
      chartBox4: {
        title: '合同及账单'
      },
      chartBox5: {
        title: '税收/坪效'
      },
      publicOptions: {
        color: ['#4a8fcd', '#639ed5', '#8ebde6', '#37add0'],
        grid: {
          left: '80px',
          right: '40px'
        },
        barWidth: '20'
      },
      columnOptions: {},
      lineOptions1: {},
      lineOptions2: {},
      barOptions: {},
      // roseDiagramOptions: {},
      doughnutOptions: {},
      gaugeOptions: {}
    }
  },
  mounted () {
    this.columnOptions = {
      color: this.publicOptions.color,
      grid: this.publicOptions.grid,
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '租金', '物业费', '其他'],
          ['2016', 64085, 14085, 54085],
          ['2017', 86085, 9616, 44122],
          ['2018', 144776, 35715, 45153],
          ['2019', 193868, 122503, 48675]
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: [
        { type: 'bar', barWidth: this.publicOptions.barWidth },
        { type: 'bar', barWidth: this.publicOptions.barWidth },
        { type: 'bar', barWidth: this.publicOptions.barWidth }
      ]
    }
    this.lineOptions1 = {
      color: this.publicOptions.color,
      grid: this.publicOptions.grid,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 个'
      },
      xAxis: {
        type: 'category',
        data: ['6月', '7月', '8月', '9月', '10月', '11月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '入驻数',
        data: [14, 26, 36, 50, 66, 79],
        type: 'line'
      }]
    }
    this.lineOptions2 = {
      color: this.publicOptions.color,
      grid: this.publicOptions.grid,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 个'
      },
      xAxis: {
        type: 'category',
        data: ['6月', '7月', '8月', '9月', '10月', '11月']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '合同数',
        data: [10, 14, 21, 17, 22, 18],
        type: 'line'
      }]
    }
    this.barOptions = {
      color: this.publicOptions.color,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 个'
      },
      grid: {
        top: '20px',
        left: '50px',
        right: '20px'
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['已缴', '催缴', '投诉', '维修']
      },
      series: [{
        name: '物业服务',
        data: [48, 32, 1, 23],
        type: 'bar',
        barWidth: this.publicOptions.barWidth
      }]
    }
    this.doughnutOptions = {
      color: this.publicOptions.color,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '70%',
        top: 'center',
        data: ['5万以下', '5-10万', '10-20万', '20万以上']
      },
      series: [
        {
          name: '坪效',
          type: 'pie',
          center: ['25%', 'center'],
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '24',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { name: '5万以下', value: 10 },
            { name: '5-10万', value: 21 },
            { name: '10-20万', value: 13 },
            { name: '20万以上', value: 8 }
          ]
        }
      ]
    }
    let value = 78
    this.gaugeOptions = {
      color: this.publicOptions.color,
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          title: {// 标题
            offsetCenter: [0, '40%'],
            fontSize: 14
          },
          axisTick: { show: false }, // 小刻度
          splitLine: {
            lineStyle: {
              color: '#14B2FF',
              width: 1
            },
            length: 10
          }, // 分隔线
          pointer: { show: false }, // 指针
          axisLabel: {
            show: true
          }, // 标签
          axisLine: {// 表盘
            show: true,
            lineStyle: {
              width: 4,
              color: [
                [value * 0.01, '#4a8fcd'], [1, '#63869e']
              ]
            }
          },
          // radius: ['10%', '20%'],
          name: '完成情况',
          type: 'gauge',
          radius: '90%',
          detail: {// 数值
            formatter: '{value}%',
            // color:'#33E9FF',
            offsetCenter: [0, '-10%'],
            fontSize: 28
          },
          data: [{ value: value, name: '完成率' }]
        }
      ]
    }

    // this.roseDiagramOptions = {
    //   color: this.publicOptions.color,
    //   tooltip : {
    //     trigger: 'item',
    //     formatter: "{b} : {c} ({d}%)"
    //   },
    //   legend: {
    //     left:'70%',
    //     top: 'center',
    //     orient:'vertical',
    //     padding: 5,
    //     itemGap: 12,
    //     itemWidth: 12, // 图例图形宽度
    //     itemHeight: 12,

    //     textStyle: {// 图例文字颜色
    //       // color: '#fff'
    //     },
    //     data: ['5万以下', '5-10万', '10-20万', '20万以上']
    //   },
    //   calculable : true,
    //   series : [
    //     {
    //       name:'半径模式',
    //       type:'pie',
    //       radius : ["30%", "85%"],
    //       center : ['25%', 'center'],
    //       roseType : 'radius',
    //       label: {
    //         normal: {
    //           show: false
    //         },
    //         emphasis: {
    //           show: false
    //         }
    //       },
    //       lableLine: {
    //         normal: {
    //           show: false,
    //         },
    //         emphasis: {
    //           show: false
    //         }
    //       },
    //       data: [
    //         { name: '5万以下', value: 10 },
    //         { name: '5-10万', value: 21 },
    //         { name: '10-20万', value: 13 },
    //         { name: '20万以上', value: 8 }
    //       ]
    //     },
    //   ]
    // }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.echarts {
  width: 100%;
  height: 100%;
}
.g-desk{
  position: relative;
  /deep/ .box-card.statistic{
    width: 100%;
    &>.el-card__body{
      display: flex;
      justify-content: flex-start;
    }
  }
  .left,.right{
    height: 648px;
  }
  .center{
    height: 600px;
  }
  .dataBox{
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: left;
    padding-left: 80px;
    color: @text-color;
  }
  .vertical .dataBox{
    width: 200px;
    left: 75%;
  }
  .data-chart{
    width: ~"calc(100% - 200px)";
    height: 200px;
  }
  .name,.unit{
    font-size: 16px;
  }
  .value{
    font-size: 32px;
    margin-top: 12px;
  }

}
</style>
