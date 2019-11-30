<template>
<div class="none">
  <el-image :src="src">
    <div slot="error" class="image-slot">
      <i class="iconfont" style="font-size: 50px">&#xe642;</i>
      <p>暂无数据</p>
    </div>
  </el-image>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>
  .none{
    width: 100%;
    line-height: inherit;
    text-align: center;

    color: #cfd0d5;
  }
</style>
