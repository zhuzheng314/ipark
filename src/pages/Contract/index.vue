<template>
  <div>
    <el-card class="box-card">
      <ParkForm></ParkForm>
    </el-card>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
export default {
  name: 'index',
  components: {
    ParkForm
  }
}
</script>

<style scoped>
  .box-card {
    width: 480px;
  }
</style>
