<template>
  <div class="comparison">
    <div class="name">{{data.name}}</div>
    <div class="value">{{data.value}}</div>
    <div v-if="type=='arrow'" class="chart" :class="data.chart<0 ? 'down' : 'up'">
      <span>{{data.chart | Percent(0)}}</span>
      <i v-if="data.chart<0" class="el-icon-bottom"></i>
      <i v-if="data.chart>0" class="el-icon-top"></i>
    </div>
    <div v-if="type=='chart'" class="chart">
      <el-progress
        type="circle"
        :width="28"
        :stroke-width="3"
        :percentage="data.chart*100"
        :show-text=false
        >
      </el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comparison',
  components: {
  },
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
  min-width: 150px;
  float: left;
  height: 56px;
  border-right: 2px solid #e6e8ee;
  margin: 20px 30px 20px 0;
  position: relative;
  .name{
    font-size: 12px;
    color: rgb(152, 154, 163);
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
    right: 10px;
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
