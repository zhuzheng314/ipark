<template>
  <div class="comparison">
    <div class="name">{{data.name}}</div>
    <div class="value">
      <countTo :startVal='0' :endVal='Number(data.value)' :duration='1000'></countTo>
    </div>
    <el-tooltip content="月环比" placement="top">
      <div v-if="type=='arrow'" class="chart" :class="data.chart<0 ? 'down' : 'up'">
        <span>{{data.chart | Percent(0)}}</span>
        <i v-if="data.chart<0" class="el-icon-bottom"></i>
        <i v-if="data.chart>0" class="el-icon-top"></i>
      </div>
    </el-tooltip>
    <div v-if="type==='chart'" class="chart">
      <el-progress
        type="circle"
        :width="28"
        :stroke-width="3"
        :percentage="Number(data.chart)*100"
        :show-text=false
        >
      </el-progress>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'comparison',
  components: { countTo },
  props: [
    'type', 'data'
  ],
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.comparison{
  min-width: 170px;
  float: left;
  height: 56px;
  border-right: 2px solid #e6e8ee;
  margin: 10px 30px 25px 0;
  position: relative;
  .name{
    font-size: 12px;
    color: rgb(108, 110, 119);
    line-height: 12px;
    margin-bottom: 20px;
  }
  .value{
    font-size: 22px;
    color: rgb(31, 33, 46);
    height: 22px;
  }
  .chart{
    position: absolute;
    right: 25px;
    bottom: 0;
    // transform: translateY(-50%);
    i{
      margin-left: 2px;
    }
    &.down span,&.down i{
      color: #46D2A8 !important;
    }
    &.up span,&.up i{
      color: #FE5B6B !important;
    }
  }
}
</style>
