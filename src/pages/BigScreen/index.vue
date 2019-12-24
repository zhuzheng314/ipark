<template>
  <div class="screen" id="screen">
    <div class="inner">
      <top></top>
      <div class="cont">
        <router-view/>
      </div>
      <Bottom></Bottom>
    </div>
  </div>
</template>

<script>
import initScreen from '@/utils/bigScreen'
import Top from './components/Top/index'
import Bottom from './components/Bottom/index'
export default {
  name: 'index',
  components: {
    Top,
    Bottom
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    initScreen(1920, 1080, 'screen')
  }
}
</script>

<style lang="less" scoped>
  .screen{
    width: 100%;
    height: 100%;
    .inner{
      width: 1920px;
      height: 1080px;
      background: black;
    }
  }

</style>
