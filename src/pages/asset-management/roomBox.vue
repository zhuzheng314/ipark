<template>
  <div class="roomBox" :style="{width: width}">
    {{count}}/{{total}}
  </div>
</template>

<script>
export default {
  name: 'room',
  components: {
  },
  props: [
    'count', 'total'
  ],
  data () {
    return {
      width: '200px'
    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .roomBox{
    border: 1px solid #f00;
    box-sizing: border-box;
    float: left;
    height: 80px;
    margin-right: 12px;

  }
</style>
