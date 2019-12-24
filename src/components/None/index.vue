<template>
<div class="none">
  <div class="image-slot">
    <img v-if="type === 'message'" style="width: 150px" alt="图片" src="../../assets/img/none/none2.png">
    <img v-if="type === 'pic'" alt="图片" src="../../assets/img/none/none3.png">
    <!-- <i v-if="type === 'pic'" class="iconfont">&#xe642;</i> -->
    <img v-if="type !== 'message' && type !== 'pic'" style="width: 180px" alt="图片" src="../../assets/img/none/none1.png">
    <p v-if="type === 'message'" style="margin-top: -10px">暂无消息</p>
    <p v-if="type === 'pic'" style="margin-top: -5px">暂无图片</p>
    <p v-if="type !== 'message' && type !== 'pic'" style="margin-top: -5px">暂无数据</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  props: ['type'],
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .none {
    width: 100%;
    line-height: inherit;
    text-align: center;
    color: #cfd0d5;
    i {
      display: inline-block;
      font-size: 24px;
      margin: 8px;
    }
    img {
      width: 50px;
      display: inline-block;
      height: auto;
    }
  }
</style>
