<template>
  <div class="base1" >
    <div class="base1-title">房源概览</div>
    <div class="base1-value">20000$</div>
    <el-divider></el-divider>
    <div class="base1-footer">总房源数量：0间</div>
  </div>
</template>

<script>
export default {
  name: 'CardList'
}
</script>

<style lang="less" scoped>
  .base1 {
    width: 160px;
    float: left;
    padding: 0 0 20px;
    margin: 0 5px 0;
  &-title{
     font-size: 12px;
     /*color: #999;*/
     /*color: rgba(0,0,0,0.45);*/
     color: #848fad;
   }
  &-value{
     color: #333;
     line-height: 40px;
     font-size: 20px;
     font-weight: 600;
   }
  &-footer{
     /*line-height: 20px;*/
     color: rgba(0,0,0,0.45);
   }
  .el-divider--horizontal{
    margin: 0 0 10px;
    background-color: rgba(0, 0, 0, 0.1);
  }
  }
</style>
