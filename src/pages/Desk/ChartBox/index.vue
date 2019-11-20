<template>
<div class="chartBox">
  <el-card class="chartBox-card" v-if="type==0" :class="{'transverse':true}">
    <div class="title">{{data.title}}</div>
    <div class="data">
      <slot name="data"></slot>
    </div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
  </el-card>
  <el-card class="chartBox-card" v-if="type==1"  :class="{'vertical':true}">
    <div class="title">{{data.title}}</div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
    <div class="data">
      <slot name="data"></slot>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'chartBox',
  components: {
  },
  props: {
    type: Number,
    data: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/style/index.less';
.chartBox{
/deep/ .chartBox-card{
  height: 100%;
  width: 100%;
  border: none;
  margin-top: 16px;
    .el-card__body{
      padding: 0;
      height: 100%;
    }
    .title{
      .title-style;
    }
  }
  .vertical{
    width: 100%;
    height: 616px;
    .chart{
      height: 70%;
      padding: 18px;
    }
    .data{
      height: 20%;
      padding: 18px;
    }
  }
  .transverse{
    height: 300px;
    width: 100%;
    position: relative;
    .data{
      position: absolute;
      top: 30px;
      left: 0;
      width: 30%;
      padding: 18px;
      box-sizing: border-box;
    }
    .chart{
      position: absolute;
      padding: 18px;
      top: 30px;
      right: 0;
      width: 70%;
    }
  }
}
</style>
