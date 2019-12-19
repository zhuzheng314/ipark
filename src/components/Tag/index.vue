<template>
<div>
  <el-tag v-if="data && data.danger" size="mini" type="danger">{{data.value === null || data.value === undefined ? '-' : data.value}}</el-tag>
  <el-tag v-else-if="data && data.warning" size="mini" type="warning">{{data.value === null || data.value === undefined ? '-' : data.value}}</el-tag>
  <el-tag v-else-if="data && data.info" size="mini" type="info">{{data.value === null || data.value === undefined ? '-' : data.value}}</el-tag>
  <el-tag v-else-if="data && data.success" size="mini" type="success">{{data.value === null || data.value === undefined ? '-' : data.value}}</el-tag>
  <el-tag v-else size="mini">{{data === null || data === undefined ? '-' : data}}</el-tag>
</div>
</template>

<script>
export default {
  name: 'index',
  props: ['data']
}
</script>

<style scoped>

</style>
