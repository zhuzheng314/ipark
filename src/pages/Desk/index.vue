<template>
<div class="g-desk">
  <el-card class="box-card statistic">
    <Statistic v-for="(item,i) in statistic" :key="(item,i)" :data="item"></Statistic>
  </el-card>
  <el-row :gutter="16">
    <el-col :span="9">
      <div class="left">
        <!-- 园区产值 -->
        <ChartBox type=0 :data="chartBox1">
          <template #data>
            <div class="name">总产值</div>
            <div class="value">365046元</div>
            <div class="name">租金</div>
            <div class="value">193868元</div>
            <div class="name">物业</div>
            <div class="value">122503元</div>
            <div class="name">其他</div>
            <div class="value">48675元</div>
          </template>
          <template #chart>
            <g2-column :type="'dodge'" :is-bar="false"
            :height="250"
            :data="[
              { name: '2016', value: 64085, type: '租金' },
              { name: '2017', value: 86085, type: '租金' },
              { name: '2018', value: 144776, type: '租金' },
              { name: '2019', value: 193868, type: '租金' },
              { name: '2016', value: 64085, type: '物业费' },
              { name: '2017', value: 9616, type: '物业费' },
              { name: '2018', value: 35715, type: '物业费' },
              { name: '2019', value: 122503, type: '物业费' },
              { name: '2016', value: 64085, type: '其他' },
              { name: '2017', value: 44122, type: '其他' },
              { name: '2018', value: 45153, type: '其他' },
              { name: '2019', value: 48675, type: '其他' }]"
            :axis-name="{name:'年份', value:'GDP(元)', type:'园区'}">
            </g2-column>
          </template>
        </ChartBox>
        <!-- 入驻企业生长指标 -->
        <ChartBox type=0 :data="chartBox2">
          <template #data>
            <div class="name">企业入驻个数</div>
            <div class="value">79个</div>
            <div class="name">预计入驻</div>
            <div class="value">100个</div>
            <div class="name">本月入驻</div>
            <div class="value">13个</div>
          </template>
          <template #chart>
            <g2-line :is-smooth="false" :padding="['auto', 100]"
            :height="250"
            style="width:120%;"
            :data="[{ name: '6月', value: 14 },
              { name: '7月', value: 26 },
              { name: '8月', value: 36 },
              { name: '9月', value: 50 },
              { name: '10月', value: 66 },
              { name: '11月', value: 79 }]"
            :axis-name="{name:'月份', value:'入驻个数'}">
            </g2-line>
          </template>
        </ChartBox>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="center">
        <!-- 物业服务指数 -->
        <ChartBox type=1 :data="chartBox3">
          <template #chart>
            <g2-column :is-bar="true"
              :height="350"
              style="width:100%"
              :data="[
              {name: '投诉', value: 1},
              {name: '维修', value: 21},
              {name: '保洁', value: 42},
              {name: '报事', value: 36}
              ]"
              :axis-name="{name:'数量', value:'数量'}">
            </g2-column>
          </template>
          <template #data>
            <el-row :gutter="20">
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
            </el-row>

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
              <div class="value">18个</div>
            </div>
            <div class="dataBox">
              <div class="name">本月账单</div>
              <div class="value">33个</div>
            </div>
            <div class="dataBox">
              <div class="name">入住率</div>
              <div class="value">78%</div>
            </div>
          </template>
          <template #chart>
            <g2-line :is-smooth="false" :padding="['auto', 20]"
            :height="250"
            :data="[{ name: '6月', value: 10 },
              { name: '7月', value: 14 },
              { name: '8月', value: 21 },
              { name: '9月', value: 17 },
              { name: '10月', value: 22 },
              { name: '11月', value: 18 },]"
            :axis-name="{name:'月份', value:'本月合同数量'}">
            </g2-line>
          </template>
        </ChartBox>
        <!-- 税收/坪效 -->
        <ChartBox type=0 :data="chartBox5">
          <template #data>
            <div class="dataBox">
              <div class="name">5万以下</div>
              <div class="value">10个</div>
            </div>
            <div class="dataBox">
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
            </div>
          </template>
          <template #chart>
            <g2-pie :type="'nightingale'"
            :height="250"
            :axis-name="{name:'坪效', value:'个数'}"
            :data="[{ name: '5万以下', value: 10 },{ name: '5-10万', value: 21 },{ name: '10-20万', value: 13 },{ name: '20万以上', value: 8 }]"
            :inner-radius="0">
            </g2-pie>
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
        { color: '#A0A7E6', icon: '&#xe656;', title: '园区总览', chart: [{ name: '建筑面积(㎡)', value: 3256 }, { name: '总投资(万元)', value: 3245 }], router: '/overview' },
        { color: '#358DD7', icon: '&#xe620;', title: '入驻企业数量', chart: [{ name: '租赁费(元)', value: 45896 }, { name: '物业费(元)', value: 86542 }], router: '/Entry/apply' },
        { color: '#54bab8', icon: '&#xe67e;', title: '园区产值', chart: [{ name: '税收(元)', value: 654821 }, { name: '坪效(元)', value: 56214 }], router: '/asset-management/park' },
        { color: '#33add0', icon: '&#xe63c;', title: '合同管理', chart: [{ name: '进程', value: 26 }, { name: '入住率', value: '78%' }], router: '/contract/list' },
        { color: '#b671bb', icon: '&#xe625;', title: '物业服务', chart: [{ name: '服务数量', value: 15 }, { name: '平均解决时间(分钟)', value: 48 }], router: '/property/orders' }
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
      }

    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
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
    width: 100px;
  }
  .name{
    color: @blue;
  }
  .value{
    color: @text-color;
    font-size: 18px;
    margin-bottom: 8px;
    margin-top: 4px;
  }
}
</style>
