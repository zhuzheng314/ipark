<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-page-header @back="goBack" content="新增合同">
      </el-page-header>
    </div>
    <el-steps :active="1">
      <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤 3" description="这段就没那么长了"></el-step>
    </el-steps>
  </el-card>
</template>

<script>
export default {
  name: 'add'
}
</script>

<style scoped>

</style>
