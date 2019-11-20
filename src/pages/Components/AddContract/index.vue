<template>
  <div class="add-wrap">
<!--    <div class="cont">-->
<!--      456-->
<!--    </div>-->
    <el-card class="cont">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AddContract'
}
</script>

<style lang="less" scoped>
.add-wrap{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
  .cont{
    margin: 1px auto 0;
    /*border-radius: 2px;*/
    width: 900px;
    height: 99%;
    overflow-y: scroll;
    /*background-color: white;*/
  }
}
</style>
