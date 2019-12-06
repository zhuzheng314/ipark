<template>
<div class="none">
  <div class="image-slot">
    <img style="width: 180px" alt="图片" src="../../assets/img/none/none1.png">
    <p>暂无数据</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .none{
    width: 100%;
    line-height: inherit;
    text-align: center;
    color: #cfd0d5;
    img{
      width: 50px;
      display: inline-block;
      height: auto;
    }
  }
</style>
