<template>
<div class="form">
  <ParkForm
    ref="parkForm"
    @onSubmit="handleAddPark"
    :formList="$formsLabels.addParkForm"
    :options="$store.getters.buildListOptions"
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
</style>
