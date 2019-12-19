<template>
<div class="statistic">
  <el-card class="statistic-card" :style="{background:data.color}">
    <div class="content">
      <i class="iconfont" v-html="data.icon"></i>
      <span class="">{{data.title}}</span>
      <!-- <p class="">{{data.chart[0].name}}:{{data.chart[0].value}}</p>
      <p class="">{{data.chart[1].name}}:{{data.chart[1].value}}</p> -->
      <div class="left">
        <div class="value">{{data.chart[0].value}}</div>
        <div class="name">{{data.chart[0].name}}</div>
      </div>
      <div class="right">
        <div class="value">{{data.chart[1].value}}</div>
        <div class="name">{{data.chart[1].name}}</div>
      </div>
    </div>
    <div class="more" @click="$router.push(data.router)">
      <span>查看更多</span>
      <i class="el-icon-arrow-right" :style="{color:data.color}"></i>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'Statistic',
  components: {
  },
  props: {
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
.statistic{
  /deep/ .statistic-card{
    float: left;
    margin-right: 16px;
    width: 234px;
    height: 132px;
    box-shadow:0px 3px 8px rgba(0,0,0,0.1);
    padding: 8px;
    color: @white;
    border: none;
    .el-card__body{
      padding: 0;
    }
    .content{
      height: 104px;
      width: 100%;
      position: relative;
      i{
        display: inline-block;
        width: 32px;
        height: 32px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
        margin: 4px 0 0 8px;
      }
      span{
        display: inline-block;
        margin-left: 12px;
      }
      p{
        margin: 0;
      }
      .left,.right{
        width: 50%;
        height: 80px;
        position: absolute;
        top: 40px;
        padding: 0 8px;
      }
      .left{
        left: 0;
        text-align: left;
      }
      .right{
        right: 0;
        text-align: right;
      }
      .value{
        font-size: 24px;
        font-weight:bold;
        margin-top: 4px;
      }
      .name{
        font-size: 12px;
        margin-top: 8px;
      }
    }
    .more{
      border-top: 1px solid @white;
      height: 28px;
      line-height: 28px;
      padding: 0 8px;
      position: relative;
      cursor: pointer;
      i{
        background: @white;
        border-radius: 50%;
        text-align: center;
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
