<template>
  <div class="infoBox">
    <div class="infoBox-title">
      <span>{{infoData.title.name}}</span>
      <div v-if="infoData.title.note!==false" class="note">
        <el-tooltip class="infoBox-tooltip" effect="dark" :content="infoData.title.note" placement="top">
          <el-button><i class="el-icon-info"></i></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="infoBox-value">
      <span><countTo :startVal='0' :endVal='data.value.value' :duration='1000'></countTo>{{infoData.value.unit}}</span>
      <div v-if="type==='num'" class="infoBox-chart" :class="infoData.value.chart<0 ? 'down' : 'up'">
        <span>{{infoData.value.chart | Percent}}</span>
        <i v-if="infoData.value.chart<0" class="el-icon-bottom"></i>
        <i v-if="infoData.value.chart>0" class="el-icon-top"></i>
      </div>
      <div v-if="type==='chart'" class="infoBox-chart">
        <el-progress
        type="circle"
        :width="28"
        :stroke-width="3"
        :percentage="Number(infoData.value.chart)*100"
        :show-text=false
        ></el-progress>
      </div>
      <div v-if="type==='text'" class="infoBox-chart">
        <span>{{infoData.value.chart}}</span>
      </div>
    </div>
    <div class="infoBox-subtitle">
      <span>{{data.subtitle.name}}</span>
      <span>:{{data.subtitle.value | NumOrFalse}}</span>
      <span>{{data.subtitle.unit}}</span>

    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'InfoBox',
  components: { countTo },
  props: [
    'type', 'data'
  ],
  /*
    *type 类型  0：不显示，1：数值、箭头，2：图表，3：文字
    *data{
      title: {
        name: "",//必填
        note: ""//可无
      },
      value: {
        value: number,//必填
        unit: "",//可无
        chart: number//0.89(输入) -> 89%(展示)
      },
      subtitle: {//可无,赋值{}
        name: "",//可无
        value: number,//可无
        unit: ""//可无
      }
    }
  */
  data () {
    return {
      infoData: {
        title: {
          name: this.data.title.name,
          note: !this.data.title.note ? false : this.data.title.note
        },
        value: {
          value: this.data.value.value,
          unit: this.data.value.unit,
          chart: this.data.value.chart
        },
        subtitle: {
          name: !this.data.subtitle.name ? false : this.data.subtitle.name,
          value: !this.data.subtitle.value ? false : this.data.subtitle.value,
          unit: !this.data.subtitle.unit ? false : this.data.subtitle.unit
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.infoBox{
  width: 185px;
  height: 87px;
  position: relative;
  .infoBox-title,.infoBox-value,.infoBox-subtitle{
    width: 100%;
    color: @text-color;
  }
  .infoBox-title{
    font-size: 14px;
    .note{
      display: inline;
    }
    .infoBox-tooltip{
      border: none;
      background: transparent;
      width: 14px;
      height: 14px;
      padding: 0;
      margin-left: 6px;
    }
  }
  .infoBox-value{
    font-size: 18px;
    margin: 10px 0;
    .infoBox-chart{
      display: inline-block;
      position: absolute;
      right: 0;
      span{
        color:  @text-color-light;
        font-size: 14px;
      }
      i{
        margin-left: 5px;
      }
      &.down span,&.down i{
        color: #46D2A8 !important;
      }
      &.up span,&.up i{
        color: #FE5B6B !important;
      }
    }
  }
  .infoBox-subtitle{
    color: @text-color-light;
    font-size: 14px;
    border-top:1px solid rgba(192,196,211,1);
    padding-top: 5px;
  }
}
</style>
