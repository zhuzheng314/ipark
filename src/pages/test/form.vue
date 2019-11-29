<template>
<div class="form">
  <ParkForm
    ref="parkForm"
    @onSubmit="handleAddPark"
    :formList="$formsLabels.addParkForm"
    :itemList="[]">
  </ParkForm>
</div>
</template>

<script>
export default {
  name: 'form',
  data () {
    return {

    }
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    handleAddPark (data) {
      console.log(data)
      // this.$https.post(this.$urls.park.add, {
      //   ...data
      // }).then(res => {
      //   if (res.code === 1000) {
      //     this.$store.dispatch('getParkList', { page_no: 1,
      //       page_size: 20 }).then(res => {
      //     })
      //     this.$message.success('新增园区成功')
      //     this.addShow = false
      //   }
      // })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
</style>
